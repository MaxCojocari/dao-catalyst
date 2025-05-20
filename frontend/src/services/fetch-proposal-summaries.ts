import { getPublicClient } from "@wagmi/core";
import { wagmiConfig } from "../utils/provider";
import { Dao__factory } from "../typechain-types";
import { getContract } from "viem";
import {
  DAO_FACTORY_DEPLOY_TIMESTAMP,
  PROPOSAL_CREATION_EVENT,
} from "../constants";
import { ProposalSummary } from "../types";
import { fetchMetadata } from ".";

export async function fetchProposalSummaries(daoAddress: string) {
  const publicClient = getPublicClient(wagmiConfig);

  const contract = getContract({
    address: daoAddress as `0x{string}`,
    abi: Dao__factory.abi,
    client: publicClient!,
  });

  // const allLogs = await publicClient?.getLogs({
  //   address: daoAddress as `0x{string}`,
  //   event: PROPOSAL_CREATION_EVENT,
  //   fromBlock: DAO_FACTORY_DEPLOY_TIMESTAMP,
  //   toBlock: "latest",
  // });
  const resAllLogs = await fetch(
    `http://localhost:5000/proposal-created?daoAddress=${daoAddress}`
  );
  const logs = await resAllLogs.json();

  // const logs: Record<string, any>[] = allLogs
  //   ?.map((log) => log.args)
  //   .slice(-3)!;

  const states = await Promise.all(
    logs.map((log: any) => contract.read.state([log.proposalId]))
  );

  let enrichedLogs: ProposalSummary[] = [];

  for (let i = 0; i < logs?.length!; ++i) {
    const { proposalId, proposer, voteEnd, title, summary } = logs[i];
    enrichedLogs = [
      {
        proposalId: Number(proposalId),
        author: proposer,
        title,
        summary,
        state: states[i],
        voteEnd: Number(voteEnd),
      },
      ...enrichedLogs,
    ];
  }

  return { totalProposals: logs.length, enrichedLogs };
}
