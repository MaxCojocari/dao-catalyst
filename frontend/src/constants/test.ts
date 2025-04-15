// export const TEST_DAO_IMGAGE_URL =
//   "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreibvu277rizhevfpe6bxa46a4tdlyzle3kjtjkuqknd55kieccdyom";

import { DaoType } from "../types";

export const TEST_DAO_IMGAGE_URL =
  "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreib6rurdcxtxil5crchbjpnc76tiuvcifjezzef3cdc57awmk4mhti";
export const TEST_DAO_NAME = "Taiko DAO";
export const TEST_DAO_CONTRACT_ADDRESS =
  "0xF079A5c205B622349A648965c4E5F05969eB0542";

export const TEST_DAO_INFO = {
  type: DaoType.SimpleVote,
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
    tokenAddress: null,
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
