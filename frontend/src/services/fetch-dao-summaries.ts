import { gql, request } from "graphql-request";
import { DaoSummary, DaoType } from "../types";
import { getPublicClient } from "wagmi/actions";
import { Dao__factory, DaoToken__factory } from "../typechain-types";
import { MEMBER_ROLE } from "../constants/roles";
import { wagmiConfig } from "../utils/provider";

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
        owner
        daoAddress
        daoToken
      }
    }
  `;

  try {
    const res = (await request(url, query, {}, headers)) as any;

    for (const data of res.daoCreateds) {
      const { daoURI, daoAddress, owner, daoToken, daoType } = data;

      const res = await fetch(daoURI);
      const { name, logo, summary } = await res.json();
      summaries.push({
        daoType,
        name,
        logo,
        summary,
        owner,
        contractAddress: daoAddress,
        daoToken,
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

export async function isCallerMember(
  daoType: DaoType,
  daoAddress: string,
  daoToken: string,
  caller: string
): Promise<boolean> {
  const publicClient = getPublicClient(wagmiConfig);

  const [balanceOfResult, hasRoleResult] = await publicClient!.multicall({
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

// export async function fetchDaoMetadata(uri: string) {
//   try {
//     const response = await fetch(uri);
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//   }
// }
