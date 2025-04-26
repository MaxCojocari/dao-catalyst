import { gql, request } from "graphql-request";

const url =
  "https://api.studio.thegraph.com/query/82040/dao-catalyst/version/latest";

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_SUBGRAPH_API_KEY}`,
};

const query = gql`
  {
    daoCreateds(orderBy: blockTimestamp, orderDirection: desc) {
      daoAddress
      daoType
      owner
      daoURI
      daoToken
      minimalDuration
      quorumFraction_numerator
      quorumFraction_denominator
      minimumParticipationFraction_numerator
      minimumParticipationFraction_denominator
      blockTimestamp
    }
  }
`;

export async function fetchDaosSubgraph() {
  try {
    const res = (await request(url, query, {}, headers)) as any;
    return res.daoCreateds;
  } catch (error) {
    console.error(error);
  }
}
