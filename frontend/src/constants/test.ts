export const TEST_DAO_IMGAGE_URL =
  "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreibvu277rizhevfpe6bxa46a4tdlyzle3kjtjkuqknd55kieccdyom";
// export const TEST_DAO_IMGAGE_URL =
//   "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreihbik6lvzagahquz52qcyxqhuiaafumepejtsfof56gkmglojkjie";

import { ethers, parseUnits, ZeroAddress } from "ethers";
import { StatusItem } from "../components/proposal-details/status-timeline";
import {
  ActionType,
  DaoType,
  ProposalAction,
  ProposalState,
  StatusTimelineType,
  TransferType,
  VotingOption,
} from "../types";
import { USDC_ADDRESS } from ".";
import { Dao__factory } from "../typechain-types";

// export const TEST_DAO_IMGAGE_URL = "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreib2su7oqwqlmibinhhxc4yfaotq6boltij4dnk6namtcf7zomcpim";
export const TEST_DAO_NAME = "Taiko DAO";
export const TEST_DAO_CONTRACT_ADDRESS =
  "0xF079A5c205B622349A648965c4E5F05969eB0542";

export const TEST_DAO_INFO = {
  owner: "0x329a8a9e8c4d69a288db0f831da9acd9518142bf",
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
    "0xEf5b1AAa5E7D9d53b86413F9E84C413Bd20e3b15",
    "0xe35a34773cd39f1768eeb9ef7c25f3bf094801f1",
    "0x329a8a9e8c4d69a288db0f831da9acd9518142bf",
  ],
  contractAddress: "0x5D471d9455D8Ed1cf36e1C94fbC977cD32E5aBD2",
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
      "0xEf5b1AAa5E7D9d53b86413F9E84C413Bd20e3b15",
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

export const TEST_DAOS = [
  TEST_DAO_INFO,
  {
    owner: "0x9876543210fedcba9876543210fedcba98765432",
    type: DaoType.FractionalVote,
    name: "NovaSphereDAO",
    logo: "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreifb6tvmvcus44ahrh6olcklyckdu7fqt2rnq7ihqdv7kmfosb4kvy",
    summary:
      "NovaSphere DAO is a decentralized think tank and innovation hub, where members collaboratively shape the future of emerging technologies, open science, and global governance through on-chain decision-making and funding initiatives.",
    links: [
      {
        label: "Nova X",
        url: "https://twitter.com/NovaSphere",
      },
      {
        label: "Nova Discord",
        url: "https://discord.com/invite/novasphere",
      },
    ],
    members: [
      "0x1234567890abcdef1234567890abcdef12345678",
      "0x03c25c5dd860b021165a127a6553c67c371551b0",
      "0x9876543210fedcba9876543210fedcba98765432",
    ],
    contractAddress: "0xeE4BD9FA4eF0AaE436016208FeEFB87F39c4f7EE",
    minimumDuration: {
      days: 2,
      hours: 0,
      minutes: 0,
    },
    token: {
      isDeployed: false,
      tokenAddress: "",
      name: "Nova",
      symbol: "NOVA",
      recipients: [
        "0x1234567890abcdef1234567890abcdef12345678",
        "0x03c25c5dd860b021165a127a6553c67c371551b0",
        "0x9876543210fedcba9876543210fedcba98765432",
      ],
      amounts: [10000, 5000, 2500],
    },
    quorum: {
      numerator: 60,
      denominator: 100,
    },
    minimumParticipation: {
      numerator: 20,
      denominator: 100,
    },
    proposalCreationMinVotingPower: 0.05,
  },
  {
    owner: "0x03c25c5dd860b021165a127a6553c67c371551b0",
    type: DaoType.SimpleVote,
    name: "MetaForgeDAO",
    logo: "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreia6uwf5qgtv3ouw4tnamnou4mognvlrxsis53xtpmm73rjnjrmkmm",
    summary:
      "MetaForge DAO empowers builders and creators to launch experimental projects with community-driven backing. The DAO utilizes transparent voting and collaborative ideation to steer innovation in the metaverse and Web3 ecosystem.",
    links: [
      {
        label: "MetaForge Forum",
        url: "https://forum.metaforge.xyz",
      },
    ],
    members: [
      "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd",
      "0x1234123412341234123412341234123412341234",
      "0x03c25c5dd860b021165a127a6553c67c371551b0",
    ],
    contractAddress: "0x935B3247622491b8A0cFF2ae9dddD83E3174862C",
    minimumDuration: {
      days: 1,
      hours: 12,
      minutes: 0,
    },
    token: {
      isDeployed: true,
      tokenAddress: "0xbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
      name: "ForgeToken",
      symbol: "FORGE",
      recipients: [
        "0xabcdabcdabcdabcdabcdabcdabcdabcdabcdabcd",
        "0x1234123412341234123412341234123412341234",
        "0x03c25c5dd860b021165a127a6553c67c371551b0",
      ],
      amounts: [12000, 6000, 3000],
    },
    quorum: {
      numerator: 65,
      denominator: 100,
    },
    minimumParticipation: {
      numerator: 18,
      denominator: 100,
    },
    proposalCreationMinVotingPower: 0.2,
  },
  {
    owner: "0x99887766554433221100ffeeddccbbaa99887766",
    type: DaoType.SimpleVote,
    name: "EthoraDAO",
    logo: "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreih7jp4ha4ut5iz4y77zny6ivekunyxe3jus5qiy3d73glckfgzicm",
    summary:
      "Ethora Collective is a community-led DAO focused on open-source infrastructure, fostering ecosystem-wide collaboration on tools, protocols, and educational content that advance the Ethereum and Layer 2 networks.",
    links: [],
    members: [
      "0x99887766554433221100ffeeddccbbaa99887766",
      "0x03c25c5dd860b021165a127a6553c67c371551b0",
      "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
    ],
    contractAddress: "0xF50cd534993d1792E992C64Da079Bf750B58B004",
    minimumDuration: {
      days: 3,
      hours: 0,
      minutes: 0,
    },
    token: {
      isDeployed: true,
      tokenAddress: "0xcccccccccccccccccccccccccccccccccccccccc",
      name: "Ethora",
      symbol: "ETHO",
      recipients: [
        "0x99887766554433221100ffeeddccbbaa99887766",
        "0x03c25c5dd860b021165a127a6553c67c371551b0",
        "0xdeadbeefdeadbeefdeadbeefdeadbeefdeadbeef",
      ],
      amounts: [20000, 7000, 3000],
    },
    quorum: {
      numerator: 70,
      denominator: 100,
    },
    minimumParticipation: {
      numerator: 25,
      denominator: 100,
    },
    proposalCreationMinVotingPower: 0.15,
  },
  {
    owner: "0x88ae23a2BC3a4061B5321Fe86BCf3F15A72Fd8CE",
    type: DaoType.MultisigVote,
    name: "ZentauriSyndicate",
    logo: "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreib2su7oqwqlmibinhhxc4yfaotq6boltij4dnk6namtcf7zomcpim",
    summary:
      "Zentauri Syndicate is a decentralized guild driving cross-chain interoperability and governance. It enables members to fund, vote, and implement key cross-protocol initiatives, ensuring resilience and inclusivity in Web3 infrastructure.",
    links: [
      {
        label: "Zentauri Hub",
        url: "https://zentauri.org",
      },
      {
        label: "Zentauri Telegram",
        url: "https://t.me/zentauridao",
      },
    ],
    members: [
      "0x0abc0abc0abc0abc0abc0abc0abc0abc0abc0abc",
      "0x1def1def1def1def1def1def1def1def1def1def",
      "0x2fed2fed2fed2fed2fed2fed2fed2fed2fed2fed",
    ],
    contractAddress: "0xBb804ED243Eb28224Ebb18EaD02369d235203958",
    minimumDuration: {
      days: 1,
      hours: 6,
      minutes: 0,
    },
    token: {
      isDeployed: false,
      tokenAddress: "0xdddddddddddddddddddddddddddddddddddddddd",
      name: "Zentauri",
      symbol: "ZEN",
      recipients: [
        "0x0abc0abc0abc0abc0abc0abc0abc0abc0abc0abc",
        "0x1def1def1def1def1def1def1def1def1def1def",
        "0x2fed2fed2fed2fed2fed2fed2fed2fed2fed2fed",
      ],
      amounts: [15000, 8000, 2000],
    },
    quorum: {
      numerator: 66,
      denominator: 100,
    },
    minimumParticipation: {
      numerator: 30,
      denominator: 100,
    },
    proposalCreationMinVotingPower: 0.05,
  },
];

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
    label: StatusTimelineType.Published,
    timestamp: "2025/02/05 10:20 PM UTC+2",
    blockNumber: "7647095",
    isCompleted: true,
    isCurrent: false,
  },
  {
    label: StatusTimelineType.Running,
    timestamp: "2025/02/05 10:20 PM UTC+2",
    isCompleted: true,
    isCurrent: false,
  },
  {
    label: StatusTimelineType.Succeeded,
    timestamp: "2025/02/05 10:59 PM UTC+2",
    isCompleted: true,
    isCurrent: false,
  },
  {
    label: StatusTimelineType.Executed,
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
    type: TransferType.Deposit,
    amount: "1000",
    token: "USDC",
    timestamp: 1743964200, // 2025-02-04T10:30:00Z
  },
  {
    type: TransferType.Withdrawal,
    amount: "533.5",
    token: "USDC",
    timestamp: 1744050900, // 2025-02-05T12:15:00Z
  },
  {
    type: TransferType.Deposit,
    amount: "2500.12",
    token: "USDT",
    timestamp: 1744142700, // 2025-02-06T14:45:00Z
  },
];

export const members = [
  {
    address: "0x03C25c5Dd860B021165A127A6553c67C371551b0",
    votingPower: 1000,
    percentage: 76.92,
  },
  {
    address: "0xe35Fa1aDf92F9C948f849e69D5b8eD61Bd3401f1",
    votingPower: 500,
    percentage: 15.38,
  },
  {
    address: "0x329D5B5CcC46cD933918eF66c8b2F88411C542bf",
    votingPower: 200,
    percentage: 7.69,
  },
  // {
  //   address: "0xD3d6aEc7e2AA97F174622d36c5865533Ab69504b",
  //   votingPower: 233,
  //   percentage: 1.1,
  // },
];

export const ONE_MINUTE_SECONDS = 60n;
export const ONE_HOUR_SECONDS = 3600n;
export const ONE_DAY_SECONDS = 86400n;
export const ONE_WEEK_SECONDS = 604800n;
export const ONE_MONTH_SECONDS = 2592000n;
export const ONE_YEAR_SECONDS = 31557600n;

export const test_dao_params = {
  daoType: DaoType.SimpleVote,
  daoURI:
    "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreig75xvix7zocnxty2lndugitd7cikwqzp4oneg3sokbvodumkyzze",
  members: [
    "0x03C25c5Dd860B021165A127A6553c67C371551b0",
    "0x987c9600B353a1c54d6E995BEd8A4F24F85e57fF",
    "0xBB7CCc4F133F9F2F593061EEB4a38F86c40c959C",
  ],
  minimalDuration: ONE_HOUR_SECONDS,
  proposalCreationMinVotingPower: parseUnits("0.1"),
  daoToken: {
    isDeployed: false,
    tokenAddress: ZeroAddress,
    name: "Pika Token",
    symbol: "PIK",
    recipients: [
      "0x03C25c5Dd860B021165A127A6553c67C371551b0",
      "0x987c9600B353a1c54d6E995BEd8A4F24F85e57fF",
      "0xBB7CCc4F133F9F2F593061EEB4a38F86c40c959C",
    ],
    amounts: [parseUnits("10000"), parseUnits("7300"), parseUnits("2000")],
  },
  quorumFraction: { numerator: 60, denominator: 100 },
  minimumParticipationFraction: { numerator: 50, denominator: 100 },
  salt: "0x3c0386a8d51c23777bea191d3fa1b611ab3778e90741db79a617b53ad76900e6",
};

export const test_proposal = (dao: string) => {
  return {
    actions: [
      {
        target: dao,
        value: 0n,
        calldatas: Dao__factory.createInterface().encodeFunctionData(
          "transfer",
          [
            USDC_ADDRESS,
            "0x987c9600B353a1c54d6E995BEd8A4F24F85e57fF",
            parseUnits("150000", 6),
          ]
        ),
      },
    ],
    descriptionURI:
      "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreihcrjckey5b7nv2mcq2frlkya6eha4k2jvxhhlkqxvy6vzwbhgphe",
    voteStart: Math.floor(Date.now() / 1000) + Number(ONE_MINUTE_SECONDS),
    voteDuration: 6n * ONE_HOUR_SECONDS,
  };
};

export const DEFAULT_LOGOS = [
  "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreifb6tvmvcus44ahrh6olcklyckdu7fqt2rnq7ihqdv7kmfosb4kvy",
  "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreia6uwf5qgtv3ouw4tnamnou4mognvlrxsis53xtpmm73rjnjrmkmm",
  "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreihyw7gfc62bgi2unlqsv7jzfojbie6ix7sjbc376frvx2s6twkk7q",
  "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreib2su7oqwqlmibinhhxc4yfaotq6boltij4dnk6namtcf7zomcpim",
  "https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreih7jp4ha4ut5iz4y77zny6ivekunyxe3jus5qiy3d73glckfgzicm",
];
