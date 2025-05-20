import { formatUnits, getContract } from "viem";
import { getPublicClient } from "wagmi/actions";
import {
  PROPOSAL_CREATION_EVENT,
  DAO_FACTORY_DEPLOY_TIMESTAMP,
  PROPOSAL_EXECUTED_EVENT,
  VOTE_CAST_EVENT,
} from "../constants";
import {
  Dao__factory,
  DaoMultisigVote__factory,
  DaoSimpleVote__factory,
  DaoToken__factory,
} from "../typechain-types";
import { wagmiConfig } from "../utils/provider";
import { fetchMetadata } from "./fetch-metadata";
import { DaoType, ProposalSummaryExtended, VotingStats } from "../types";
import {
  buildDecodedActions,
  formatCompactNumber,
  formatTimestamp,
  generateStatuses,
} from "../utils";
import request, { gql } from "graphql-request";
import { MEMBER_ROLE } from "../constants/roles";

export async function fetchProposal(
  daoAddress: string,
  proposalId: bigint
): Promise<ProposalSummaryExtended> {
  const client = getPublicClient(wagmiConfig)!;

  const contract = getContract({
    address: daoAddress as `0x{string}`,
    abi: Dao__factory.abi,
    client,
  });

  // const proposalLog: any = await client.getLogs({
  //   address: daoAddress as `0x{string}`,
  //   event: PROPOSAL_CREATION_EVENT,
  //   args: { proposalId },
  //   fromBlock: DAO_FACTORY_DEPLOY_TIMESTAMP,
  //   toBlock: "latest",
  // });

  // const proposalExecutedLog: any = await client.getLogs({
  //   address: daoAddress as `0x{string}`,
  //   event: PROPOSAL_EXECUTED_EVENT,
  //   args: { proposalId },
  //   fromBlock: DAO_FACTORY_DEPLOY_TIMESTAMP,
  //   toBlock: "latest",
  // });

  const resProposalLog = await fetch(
    `http://localhost:5000/proposal-created?proposalId=${proposalId}&daoAddress=${daoAddress}`
  );
  const proposalLog = await resProposalLog.json();

  const resProposalExecutedLog = await fetch(
    `http://localhost:5000/proposal-executed?proposalId=${proposalId}&daoAddress=${daoAddress}`
  );
  const proposalExecutedLog = await resProposalExecutedLog.json();

  const {
    blockNumber: blockNumberProposalCreation,
    blockHash: blockHashProposalCreation,
  } = proposalLog[0] || {};

  const {
    blockNumber: blockNumberProposalExecution,
    blockHash: blockHashProposalExecution,
    transactionHash: txHashExecuted,
  } = proposalExecutedLog[0] || {};

  const { title, summary, resources, proposer, voteStart, voteEnd, actions } =
    proposalLog[0] || {};

  // const { title, summary, resources } =
  //   (await fetchMetadata(descriptionURI)) || {};

  const state = await contract.read.state([proposalId]);

  const statuses = await generateStatuses({
    blockHashProposalCreation,
    blockNumberProposalCreation,
    blockHashProposalExecution,
    blockNumberProposalExecution,
    voteStart,
    voteEnd,
    state: Number(state),
    client,
  });

  return {
    title,
    summary,
    resources,
    state,
    statuses,
    author: proposer,
    actions: buildDecodedActions(actions),
    txHashExecuted,
  };
}

export async function fetchVotingStats(
  daoAddress: string,
  proposalId: bigint,
  voter: string
): Promise<VotingStats> {
  const daoType = (await getDaoType(daoAddress)) as DaoType;

  if (daoType === DaoType.SimpleVote) {
    return await _fetchVotingStats(daoAddress, proposalId, voter, daoType);
  }

  if (daoType === DaoType.MultisigVote) {
    return await _fetchVotingStatsMultisig(
      daoAddress,
      proposalId,
      voter,
      daoType
    );
  }

  return {} as VotingStats;
}

async function _fetchVotingStats(
  daoAddress: string,
  proposalId: bigint,
  voter: string,
  daoType: DaoType
): Promise<VotingStats> {
  const client = getPublicClient(wagmiConfig)!;

  const contract = getContract({
    address: daoAddress as `0x{string}`,
    abi: DaoSimpleVote__factory.abi,
    client,
  });

  // const votingLogs: any = await client.getLogs({
  //   address: daoAddress as `0x{string}`,
  //   event: VOTE_CAST_EVENT,
  //   args: { proposalId },
  //   fromBlock: DAO_FACTORY_DEPLOY_TIMESTAMP,
  //   toBlock: "latest",
  // });

  const resVotingLogs = await fetch(
    `http://localhost:5000/vote-cast?proposalId=${proposalId}&daoAddress=${daoAddress}`
  );
  const votingLogs = await resVotingLogs.json();

  const [
    quorum,
    minParticipation,
    token,
    proposal,
    accVotes,
    hasVoted,
    isMember,
  ] = await Promise.all([
    contract.read.quorumFraction(),
    contract.read.minimumParticipationFraction(),
    contract.read.token(),
    contract.read.proposals([proposalId]),
    contract.read.proposalVotes([proposalId]),
    contract.read.hasVoted([proposalId, voter as `0x{string}`]),
    contract.read.hasRole([MEMBER_ROLE, voter as `0x{string}`]),
  ]);

  const tokenContract = getContract({
    address: token as `0x{string}`,
    abi: DaoToken__factory.abi,
    client,
  });

  const support = ((Number(quorum[0]) / Number(quorum[1])) * 100)
    .toFixed(2)
    .replace(/\.00$/, "");
  const quorumPercentage =
    (Number(minParticipation[0]) / Number(minParticipation[1])) * 100;
  const quorumPercentageFormated = quorumPercentage
    .toFixed(2)
    .replace(/\.00$/, "");

  const [symbol, totalSupply] = await Promise.all([
    tokenContract.read.symbol(),
    tokenContract.read.totalSupply(),
  ]);
  const formatedTotalSupply = formatCompactNumber(
    Number(formatUnits(totalSupply, 18))
  );

  const quorumAsAmount = (Number(totalSupply) * quorumPercentage) / 100;
  const quorumFormated = formatCompactNumber(
    Number(formatUnits(BigInt(quorumAsAmount), 18))
  );

  const totalParticipation = votingLogs.reduce(
    (acc: any, log: any) => acc + BigInt(log.weight),
    0n
  );

  const participationPercentage =
    (Number(formatUnits(totalParticipation, 18)) /
      Number(formatUnits(totalSupply, 18))) *
    100;
  const participationFormated = formatCompactNumber(
    Number(formatUnits(BigInt(totalParticipation), 18))
  );

  const infoSectionData = {
    daoType,
    support: `> ${support}%`,
    quorum: `≥ ${quorumFormated} of ${formatedTotalSupply} ${symbol} (${quorumPercentageFormated}%)`,
    participation: `${participationFormated} of ${formatedTotalSupply} ${symbol} (${participationPercentage
      .toFixed(2)
      .replace(/\.00$/, "")}%)`,
    participationReached: participationPercentage > quorumPercentage,
    uniqueVoters: votingLogs.length,
    start: formatTimestamp(Number(proposal[2])),
    end: formatTimestamp(Number(proposal[3])),
  };

  const votes = await calculateVotingStats(accVotes);

  const voters = votingLogs.map((log: any) => {
    const { voter, weight } = log;
    return {
      address: voter,
      power: formatCompactNumber(Number(formatUnits(weight, 18))),
    };
  });

  return {
    infoSectionData,
    votes,
    voters,
    hasVoted,
    tokenSymbol: symbol,
    isMember,
  };
}

async function _fetchVotingStatsMultisig(
  daoAddress: string,
  proposalId: bigint,
  voter: string,
  daoType: DaoType
): Promise<VotingStats> {
  const client = getPublicClient(wagmiConfig)!;

  const contract = getContract({
    address: daoAddress as `0x{string}`,
    abi: DaoMultisigVote__factory.abi,
    client,
  });

  // const votingLogs: any = await client.getLogs({
  //   address: daoAddress as `0x{string}`,
  //   event: VOTE_CAST_EVENT,
  //   args: { proposalId },
  //   fromBlock: DAO_FACTORY_DEPLOY_TIMESTAMP,
  //   toBlock: "latest",
  // });.
  const resVotingLogs = await fetch(
    `http://localhost:5000/vote-cast?proposalId=${proposalId}&daoAddress=${daoAddress}`
  );
  const votingLogs = await resVotingLogs.json();
  const [
    quorum,
    minParticipation,
    proposal,
    confirmations,
    hasVoted,
    isMember,
  ] = await Promise.all([
    contract.read.quorumFraction(),
    contract.read.minimumParticipationFraction(),
    contract.read.proposals([proposalId]),
    contract.read.confirmations([proposalId]),
    contract.read.hasVoted([proposalId, voter as `0x{string}`]),
    contract.read.hasRole([MEMBER_ROLE, voter as `0x{string}`]),
  ]);

  const support = ((Number(quorum[0]) / Number(quorum[1])) * 100)
    .toFixed(2)
    .replace(/\.00$/, "");
  const quorumPercentage =
    (Number(minParticipation[0]) / Number(minParticipation[1])) * 100;
  const quorumPercentageFormated = quorumPercentage
    .toFixed(2)
    .replace(/\.00$/, "");

  const quorumAsAmount = Number(quorum[0]);
  const participationPercentage =
    (Number(confirmations) / Number(quorum[1])) * 100;

  const infoSectionData = {
    daoType,
    support: `> ${support}%`,
    quorum: `≥ ${quorumAsAmount} out of ${Number(
      quorum[1]
    )} (${quorumPercentageFormated}%)`,
    participation: `${Number(confirmations)} out of ${Number(
      quorum[1]
    )} (${participationPercentage.toFixed(2).replace(/\.00$/, "")}%)`,
    participationReached: participationPercentage >= quorumPercentage,
    uniqueVoters: votingLogs.length,
    start: formatTimestamp(Number(proposal[2])),
    end: formatTimestamp(Number(proposal[3])),
  };

  const voters = votingLogs.map((log: any) => {
    const { voter, weight } = log;
    return {
      address: voter,
      power: Number(weight),
    };
  });

  return {
    infoSectionData,
    voters,
    hasVoted,
    votes: {
      confirmations: {
        amount: Number(confirmations),
        percentage: participationPercentage,
      },
    },
    isMember,
  };
}

export async function getDaoType(daoAddress: string) {
  const url = import.meta.env.VITE_SUBGRAPH_URL;

  const headers = {
    Authorization: `Bearer ${import.meta.env.VITE_SUBGRAPH_API_KEY}`,
  };

  const query = gql`
      {
        daoCreateds(where: {daoAddress: "${daoAddress}"}) {
          daoType
        }
      }
    `;

  try {
    const res_gql = (await request(url, query, {}, headers)) as any;
    const { daoType } = res_gql.daoCreateds[0];

    return Number(daoType) as DaoType;
  } catch (error) {
    console.error(error);
  }
}

async function calculateVotingStats(votingStats: readonly bigint[]) {
  const [againstVotes, forVotes, abstainVotes] = votingStats;

  const totalVotes = againstVotes + forVotes + abstainVotes;

  const formatPercentage = (count: bigint) => {
    if (totalVotes === 0n) return 0;
    return Number(
      (
        (Number(formatUnits(count, 18)) / Number(formatUnits(totalVotes, 18))) *
        100
      )
        .toFixed(2)
        .replace(/\.00$/, "")
    );
  };

  const votes = {
    yes: {
      amount: formatCompactNumber(Number(formatUnits(forVotes, 18))),
      percentage: formatPercentage(forVotes) as number,
    },
    no: {
      amount: formatCompactNumber(Number(formatUnits(againstVotes, 18))),
      percentage: formatPercentage(againstVotes),
    },
    abstain: {
      amount: formatCompactNumber(Number(formatUnits(abstainVotes, 18))),
      percentage: formatPercentage(abstainVotes),
    },
  };

  return votes;
}
