// export const TEST_DAO_IMGAGE_URL =
//   "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreibvu277rizhevfpe6bxa46a4tdlyzle3kjtjkuqknd55kieccdyom";

import { DaoType, VotingOption } from "../types";

export const TEST_DAO_IMGAGE_URL =
  "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreib6rurdcxtxil5crchbjpnc76tiuvcifjezzef3cdc57awmk4mhti";
export const TEST_DAO_NAME = "Taiko DAO";
export const TEST_DAO_CONTRACT_ADDRESS =
  "0xF079A5c205B622349A648965c4E5F05969eB0542";

export const TEST_DAO_INFO = {
  type: DaoType.MultisigVote,
  name: "PikaDAO",
  logo: "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreihbik6lvzagahquz52qcyxqhuiaafumepejtsfof56gkmglojkjie",
  summary:
    "PikaDAO ⚡ is a decentralized autonomous organization that fosters collaborative decision-making within a vibrant community, using transparent governance to shape initiatives, fund projects, and drive collective actions. With its Pikachu-inspired emblem, PikaDAO empowers members to propose, debate, and vote on key decisions, ensuring a truly democratic and community-led ecosystem.",
  links: [
    {
      label: "Pikachu X",
      url: "https://twitter.com/Pikachu_",
    },
    {
      label: "⚡ Pikachu Nation ⚡",
      url: "https://discord.com/invite/8JPUrN6GRy",
    },
  ],
  members: [
    "0x03c25c5dd860b021165a127a6553c67c371551b0",
    "0xe35a34773cd39f1768eeb9ef7c25f3bf094801f1",
    "0x329a8a9e8c4d69a288db0f831da9acd9518142bf",
  ],
  minimumDuration: {
    days: 1,
    hours: 0,
    minutes: 0,
  },
  token: {
    isDeployed: false,
    tokenAddress: "0xcc6a02a51b7d1a9f46da946d9b8d6dd358b36b01",
    name: "Pikachu",
    symbol: "PIK",
    recipients: [
      "0x03c25c5dd860b021165a127a6553c67c371551b0",
      "0xe35a34773cd39f1768eeb9ef7c25f3bf094801f1",
      "0x329a8a9e8c4d69a288db0f831da9acd9518142bf",
    ],
    amounts: [10000, 2300, 100],
  },
  // support threshold
  quorum: {
    numerator: 66,
    denominator: 100,
  },
  minimumParticipation: {
    numerator: 15,
    denominator: 100,
  },
  proposalCreationMinVotingPower: 0.1,
};

export const TEST_PROPOSAL = {
  author: "0x03C25c5Dd860B021165A127A6553c67C371551b0",
  title: "Launch Community Grants Program",
  summary:
    "This proposal aims to launch the Taiko DAO Community Grants Program to support developers, researchers, and contributors building within the Taiko ecosystem. The program will allocate a portion of the DAO treasury to fund innovative projects, tools, and educational content that align with Taiko’s mission of building scalable, secure, and decentralized rollup infrastructure. By approving this proposal, Taiko DAO takes a strategic step toward fostering long-term community engagement and ecosystem growth.",
};

export const voters = [
  {
    address: "0x3D08CC653eC3DF0c039C3a1da15eD0CEeA3b0aCC",
    power: "10k",
    vote: VotingOption.Yes,
  },
  {
    address: "0xD3d6aEc7e2AA97F174622d36c5865533Ab69504b",
    power: "2000",
    vote: VotingOption.Yes,
  },
  {
    address: "0xcc6a02a51b7d1a9f46da946d9b8d6dd358b36b01",
    power: "1000",
    vote: VotingOption.No,
  },
  {
    address: "0x5D471d9455D8Ed1cf36e1C94fbC977cD32E5aBD2",
    power: "1500",
    vote: VotingOption.Yes,
  },
];

export const votes = {
  yes: { amount: "12k", percentage: 52.31 },
  no: { amount: "1000", percentage: 7.69 },
  abstain: { amount: "0", percentage: 40 },
};
