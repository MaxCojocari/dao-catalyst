import { decodeFunctionData, getContract } from "viem";
import { getPublicClient } from "wagmi/actions";
import {
  PROPOSAL_CREATION_EVENT,
  DAO_FACTORY_DEPLOY_TIMESTAMP,
  PROPOSAL_EXECUTED_EVENT,
} from "../constants";
import { Dao__factory, TargetContract__factory } from "../typechain-types";
import { wagmiConfig } from "../utils/provider";
import { fetchMetadata } from "./fetch-metadata";
import {
  ProposalAction,
  ProposalState,
  ProposalSummaryExtended,
  StatusTimelineType,
} from "../types";
import { StatusItem } from "../components/proposal-details/status-timeline";
import { buildDecodedActions, generateStatuses } from "../utils";

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

  const proposalLog: any = await client.getLogs({
    address: daoAddress as `0x{string}`,
    event: PROPOSAL_CREATION_EVENT,
    args: { proposalId },
    fromBlock: DAO_FACTORY_DEPLOY_TIMESTAMP,
    toBlock: "latest",
  });

  const proposalExecutedLog: any = await client.getLogs({
    address: daoAddress as `0x{string}`,
    event: PROPOSAL_EXECUTED_EVENT,
    args: { proposalId },
    fromBlock: DAO_FACTORY_DEPLOY_TIMESTAMP,
    toBlock: "latest",
  });

  //   console.log("proposalLog", proposalLog);
  //   console.log("proposalLog args", proposalLog[0].args);
  //   console.log("proposalExecutedLog", proposalExecutedLog);

  const {
    blockNumber: blockNumberProposalCreation,
    blockHash: blockHashProposalCreation,
  } = proposalLog[0] || {};

  const {
    blockNumber: blockNumberProposalExecution,
    blockHash: blockHashProposalExecution,
    transactionHash: txHashExecuted,
  } = proposalExecutedLog[0] || {};

  const { proposer, voteStart, voteEnd, descriptionURI, actions } =
    proposalLog[0]?.args || {};

  const { title, summary, resources } =
    (await fetchMetadata(descriptionURI)) || {};

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

export async function fetchVotingStats(daoAddress: string, proposalId: number) {
  const client = getPublicClient(wagmiConfig)!;

  const contract = getContract({
    address: daoAddress as `0x{string}`,
    abi: Dao__factory.abi,
    client,
  });

  const proposalLog = (await client.getLogs({
    address: daoAddress as `0x{string}`,
    event: PROPOSAL_CREATION_EVENT,
    args: [proposalId],
    fromBlock: DAO_FACTORY_DEPLOY_TIMESTAMP,
    toBlock: "latest",
  })) as any;

  //   console.log("proposalLog", proposalLog);

  //   const { proposer, actions, voteStart, voteEnd } = proposalLog.args;

  //   const [balanceOfResult, hasRoleResult] = await publicClient.multicall({
  //     contracts: [
  //       {
  //         abi: DaoToken__factory.abi,
  //         address: daoToken as `0x{string}`,
  //         functionName: "balanceOf",
  //         args: [caller as `0x{string}`],
  //       },
  //       {
  //         abi: Dao__factory.abi,
  //         address: daoAddress as `0x{string}`,
  //         functionName: "hasRole",
  //         args: [MEMBER_ROLE, caller as `0x{string}`],
  //       },
  //     ],
  //   });
}
