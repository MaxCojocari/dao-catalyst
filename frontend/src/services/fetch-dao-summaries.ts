import { gql, request } from "graphql-request";
import { DaoSummary, DaoType } from "../types";
import { getPublicClient } from "wagmi/actions";
import { Dao__factory, DaoToken__factory } from "../typechain-types";
import { MEMBER_ROLE } from "../constants/roles";
import { wagmiConfig } from "../utils/provider";
import { fetchMetadata } from "./fetch-metadata";

const url = import.meta.env.VITE_SUBGRAPH_URL;

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_SUBGRAPH_API_KEY}`,
};

export async function fetchDaoSummaries(caller: string) {
  const summaries: DaoSummary[] = [];

  const query = gql`
    {
      daoCreateds(orderBy: blockTimestamp, orderDirection: desc) {
        daoType
        daoURI
        daoAddress
        daoToken
      }
    }
  `;

  try {
    const res = (await request(url, query, {}, headers)) as any;

    for (const data of res.daoCreateds) {
      const { daoURI, daoAddress, daoToken, daoType } = data;
      const { name, logo, summary } = await fetchMetadata(daoURI);

      summaries.push({
        daoType,
        daoToken,
        name,
        logo,
        summary,
        contractAddress: daoAddress,
        isCallerMember: await isCallerMember(
          +daoType,
          daoAddress,
          daoToken,
          caller
        ),
      });
    }
  } catch (error) {
    console.error(error);
  }

  return summaries;
}

export async function fetchDaoSummary(
  daoAddress: string
): Promise<DaoSummary | undefined> {
  const query = gql`
    {
      daoCreateds(where: {daoAddress: "${daoAddress}"}) {
        daoType
        daoURI
        owner
        daoAddress
        blockTimestamp
        daoToken
      }
    }
  `;

  try {
    const res_gql = (await request(url, query, {}, headers)) as any;
    const { daoType, daoURI, owner, daoAddress, blockTimestamp, daoToken } =
      res_gql.daoCreateds[0];
    const res = await fetch(daoURI);
    const { name, logo, summary, links } = await res.json();

    return {
      links,
      daoType,
      owner,
      name,
      logo,
      summary,
      contractAddress: daoAddress,
      creationDate: getMonthYear(Number(blockTimestamp)),
      daoToken,
    };
  } catch (error) {
    console.error(error);
  }
}

export async function isCallerMember(
  daoType: DaoType,
  daoAddress: string,
  daoToken: string,
  caller: string
): Promise<boolean> {
  const publicClient = getPublicClient(wagmiConfig)!;

  const [balanceOfResult, hasRoleResult] = await publicClient.multicall({
    contracts: [
      {
        abi: DaoToken__factory.abi,
        address: daoToken as `0x{string}`,
        functionName: "balanceOf",
        args: [caller as `0x{string}`],
      },
      {
        abi: Dao__factory.abi,
        address: daoAddress as `0x{string}`,
        functionName: "hasRole",
        args: [MEMBER_ROLE, caller as `0x{string}`],
      },
    ],
  });

  const balanceOf = balanceOfResult.result;
  const hasRole = hasRoleResult.result;

  if (daoType === DaoType.SimpleVote) {
    return BigInt(balanceOf || 0) > 0n;
  }

  if (daoType === DaoType.MultisigVote) {
    return Boolean(hasRole);
  }

  return false;
}

function getMonthYear(timestamp: number) {
  const date = new Date(timestamp * 1000);

  const monthYear = date.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  return monthYear;
}
