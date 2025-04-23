// export const TEST_DAO_IMGAGE_URL =
//   "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreibvu277rizhevfpe6bxa46a4tdlyzle3kjtjkuqknd55kieccdyom";
// export const TEST_DAO_IMGAGE_URL =
//   "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreib6rurdcxtxil5crchbjpnc76tiuvcifjezzef3cdc57awmk4mhti";

import { StatusItem } from "../components/proposal-details/status-timeline";
import {
  ActionType,
  DaoType,
  ProposalAction,
  ProposalState,
  TransferType,
  VotingOption,
} from "../types";

export const TEST_DAO_IMGAGE_URL =
  "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreib2su7oqwqlmibinhhxc4yfaotq6boltij4dnk6namtcf7zomcpim";
export const TEST_DAO_NAME = "Taiko DAO";
export const TEST_DAO_CONTRACT_ADDRESS =
  "0xF079A5c205B622349A648965c4E5F05969eB0542";

export const TEST_DAO_INFO = {
  type: DaoType.SimpleVote,
  name: "TaikoDAO",
  logo: TEST_DAO_IMGAGE_URL,
  summary:
    "Taiko DAO is a decentralized autonomous organization that fosters collaborative decision-making within a vibrant community, using transparent governance to shape initiatives, fund projects, and drive collective actions. TaikoDAO empowers members to propose, debate, and vote on key decisions, with a truly democratic and community-led ecosystem.",
  links: [
    {
      label: "Taiko X",
      url: "https://twitter.com/Pikachu_",
    },
    {
      label: "⚡ Taiko Nation ⚡",
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
  id: 0,
  author: "0x03C25c5Dd860B021165A127A6553c67C371551b0",
  title: "Launch Community Grants Program",
  summary:
    "This proposal aims to launch the Taiko DAO Community Grants Program to support developers, researchers, and contributors building within the Taiko ecosystem. The program will allocate a portion of the DAO treasury to fund innovative projects, tools, and educational content that align with Taiko’s mission of building scalable, secure, and decentralized rollup infrastructure. By approving this proposal, Taiko DAO takes a strategic step toward fostering long-term community engagement and ecosystem growth.",
  resources: [
    {
      label: "Taiko X",
      url: "https://twitter.com/Pikachu_",
    },
    {
      label: "⚡ Taiko Nation ⚡",
      url: "https://discord.com/invite/8JPUrN6GRy",
    },
  ],
  createdAt: 1742738693,
  voteStart: 1742825093,
  voteEnd: 1743465599,
  state: ProposalState.Succeeded,
};

export const proposals = [
  TEST_PROPOSAL,
  {
    id: 1,
    author: "0x329103cB5CdaAA54219C2B85EDdC40843F42a2bf",
    title: "Fund ZK Research & Development",
    summary:
      "This proposal suggests allocating 150,000 USDC from the Taiko DAO treasury to support research and development efforts in zero-knowledge (ZK) proof technology. The goal is to accelerate innovation in zkRollups, enhance security models, and improve scalability for future Taiko deployments. By funding academic groups, independent researchers, and protocol engineers, the DAO will strategically strengthen its technical foundation.",
    resources: [],
    createdAt: 1742843200,
    voteStart: 1742929600,
    voteEnd: 1743570000,
    state: ProposalState.Defeated,
  },
  {
    id: 2,
    author: "0xe35A48Bd210B5aDF43cA53D3c4E3123bba01F1f1",
    title: "Onboard Strategic Advisors",
    summary:
      "This proposal recommends onboarding a panel of strategic advisors to support the Taiko DAO in governance, protocol evolution, and ecosystem development. Advisors will include experts in L2 scaling, token economics, and regulatory strategy. Their involvement will provide valuable insight and help guide high-impact decisions as Taiko continues to grow.",
    resources: [
      {
        label: "L2Beat",
        url: "https://l2beat.com/",
      },
    ],
    createdAt: 1742950100,
    voteStart: 1743036500,
    voteEnd: 1743676900,
    state: ProposalState.Active,
  },
];

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

export const statuses = [
  {
    label: "Published",
    timestamp: "2025/02/05 10:20 PM UTC+2",
    blockNumber: "7647095",
    isCompleted: true,
    isCurrent: false,
  },
  {
    label: "Running",
    timestamp: "2025/02/05 10:20 PM UTC+2",
    isCompleted: true,
    isCurrent: false,
  },
  {
    label: "Succeeded",
    timestamp: "2025/02/05 10:59 PM UTC+2",
    isCompleted: true,
    isCurrent: false,
  },
  {
    label: "Executed",
    timestamp: "2025/02/05 11:12 PM UTC+2",
    blockNumber: "7647338",
    isCompleted: true,
    isCurrent: true,
  },
  // {
  //   label: "Rejected",
  //   isCompleted: true,
  //   isCurrent: true,
  // },
] as StatusItem[];

export const customAction: ProposalAction = {
  id: "action-1",
  target: "0xD3d6aEc7e2AA97F174622d36c5865533Ab69504b",
  value: "0x0",
  type: ActionType.Other,
  functionFragment: "setValue(uint256,address)",
  inputs: [1000, "0x3D08CC653eC3DF0c039C3a1da15eD0CEeA3b0aCC"],
};

export const transferAction: ProposalAction = {
  id: "action-2",
  target: "0x5D471d9455D8Ed1cf36e1C94fbC977cD32E5aBD2",
  value: "0",
  type: ActionType.TransferTokens,
  functionFragment: "transfer(address,address,uint256)",
  inputs: [
    "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    "0x3D08CC653eC3DF0c039C3a1da15eD0CEeA3b0aCC",
    "5000000",
  ],
};

export const transfers = [
  {
    id: "tx1",
    type: TransferType.Deposit,
    amount: "1000",
    token: "USDC",
    timestamp: 1743964200, // 2025-02-04T10:30:00Z
  },
  {
    id: "tx2",
    type: TransferType.Withdrawal,
    amount: "533.5",
    token: "USDC",
    timestamp: 1744050900, // 2025-02-05T12:15:00Z
  },
  {
    id: "tx3",
    type: TransferType.Deposit,
    amount: "2500.12",
    token: "USDT",
    timestamp: 1744142700, // 2025-02-06T14:45:00Z
  },
];

export const members = [
  {
    address: "0x03C25c5Dd860B021165A127A6553c67C371551b0",
    votingPower: 10000,
    percentage: 76.92,
  },
  {
    address: "0xe35Fa1aDf92F9C948f849e69D5b8eD61Bd3401f1",
    votingPower: 2630,
    percentage: 15.38,
  },
  {
    address: "0x329D5B5CcC46cD933918eF66c8b2F88411C542bf",
    votingPower: 1500,
    percentage: 7.69,
  },
  {
    address: "0xD3d6aEc7e2AA97F174622d36c5865533Ab69504b",
    votingPower: 233,
    percentage: 1.1,
  },
];
