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

  const allLogs = await publicClient?.getLogs({
    address: daoAddress as `0x{string}`,
    event: PROPOSAL_CREATION_EVENT,
    fromBlock: DAO_FACTORY_DEPLOY_TIMESTAMP,
    toBlock: "latest",
  });

  const logs: Record<string, any>[] = allLogs
    ?.map((log) => log.args)
    .slice(-3)!;

  const states = await Promise.all(
    logs.map((log) => contract.read.state([log.proposalId]))
  );

  const enrichedLogs: ProposalSummary[] = [];

  for (let i = 0; i < logs?.length!; ++i) {
    const { proposalId, proposer, descriptionURI } = logs[i];
    const metadata = await fetchMetadata(descriptionURI);
    const { title, summary } = metadata;
    enrichedLogs.push({
      proposalId: Number(proposalId),
      author: proposer,
      title,
      summary,
      state: states[i],
    });
  }

  console.log(enrichedLogs);

  return enrichedLogs;
}
