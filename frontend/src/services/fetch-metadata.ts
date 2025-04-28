import request, { gql } from "graphql-request";
import { getPublicClient } from "@wagmi/core";
import { wagmiConfig } from "../utils/provider";
import {
  DAO_FACTORY_DEPLOY_TIMESTAMP,
  PROPOSAL_CREATION_EVENT,
} from "../constants";
import { DaoMetadata, ProposalMetadata } from "../types";

const url = import.meta.env.VITE_SUBGRAPH_URL;

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_SUBGRAPH_API_KEY}`,
};

export async function fetchMetadata(uri: string): Promise<any> {
  try {
    if (!uri) return;
    const response = await fetch(uri);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}

export async function fetchDaoMetadata(
  daoAddress: string | undefined
): Promise<DaoMetadata | undefined> {
  if (!daoAddress) return;

  const query = gql`
    {
      daoCreateds(where: {daoAddress: "${daoAddress}"}) {
        daoURI
        daoType
      }
    }
  `;

  try {
    const res_gql = (await request(url, query, {}, headers)) as any;
    const { daoURI, daoType } = res_gql.daoCreateds[0];
    const res = await fetchMetadata(daoURI);
    return { daoType, ...res } as DaoMetadata;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchProposalMetadata(
  daoAddress: string,
  proposalId: number
): Promise<ProposalMetadata | undefined> {
  const publicClient = getPublicClient(wagmiConfig);

  const log: any = await publicClient?.getLogs({
    address: daoAddress as `0x{string}`,
    event: PROPOSAL_CREATION_EVENT,
    args: {
      proposalId,
    },
    fromBlock: DAO_FACTORY_DEPLOY_TIMESTAMP,
    toBlock: "latest",
  });

  const uri = log[0].args.descriptionURI;

  return (await fetchMetadata(uri)) as ProposalMetadata;
}
