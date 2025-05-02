import { parseUnits, ZeroAddress, ethers, AddressLike } from 'ethers';
import {
  ONE_DAY_SECONDS,
  ONE_HOUR_SECONDS,
  ONE_MINUTE_SECONDS,
  ONE_MONTH_SECONDS,
  ONE_WEEK_SECONDS,
} from '../utils/timeUnits';
import { DaoType } from '../utils/types';
import { getCurrentTimestamp } from '../utils/getCurrentTimestamp';
import { Dao__factory, TargetContract__factory } from '../typechain-types';
import { DEPLOY_CONSTANTS } from './deploy';

export const TEST_DAOS = [
  {
    daoType: DaoType.SimpleVote,
    daoURI:
      'https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreietgfl2kayb6o2jqfkatge2jz7jmk2gf7dzqjqxmw7qac7ycdm25y',
    members: [
      '0x03C25c5Dd860B021165A127A6553c67C371551b0',
      '0x987c9600B353a1c54d6E995BEd8A4F24F85e57fF',
      '0xBB7CCc4F133F9F2F593061EEB4a38F86c40c959C',
    ],
    minimalDuration: ONE_HOUR_SECONDS,
    proposalCreationMinVotingPower: parseUnits('0.1'),
    daoToken: {
      isDeployed: false,
      tokenAddress: ZeroAddress,
      name: 'Taiko Token',
      symbol: 'TAI',
      recipients: [
        '0x03C25c5Dd860B021165A127A6553c67C371551b0',
        '0x987c9600B353a1c54d6E995BEd8A4F24F85e57fF',
        '0xBB7CCc4F133F9F2F593061EEB4a38F86c40c959C',
      ],
      amounts: [parseUnits('1000'), parseUnits('500'), parseUnits('200')],
    },
    quorumFraction: { numerator: 60, denominator: 100 },
    minimumParticipationFraction: { numerator: 30, denominator: 100 },
    salt: '0x' + Buffer.from(ethers.randomBytes(32)).toString('hex'),
  },
  {
    daoType: DaoType.MultisigVote,
    daoURI:
      'https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreif53a5vp4bonskuhwwntk3p64a6s4l7hqew6toii5xs3yckpphx44',
    members: [
      '0x03C25c5Dd860B021165A127A6553c67C371551b0',
      '0x987c9600B353a1c54d6E995BEd8A4F24F85e57fF',
      '0xBB7CCc4F133F9F2F593061EEB4a38F86c40c959C',
    ],
    minimalDuration: ONE_HOUR_SECONDS,
    proposalCreationMinVotingPower: 0,
    daoToken: {
      isDeployed: false,
      tokenAddress: ZeroAddress,
      name: '',
      symbol: '',
      recipients: [],
      amounts: [],
    },
    quorumFraction: { numerator: 2, denominator: 3 },
    minimumParticipationFraction: { numerator: 2, denominator: 3 },
    salt: '0x' + Buffer.from(ethers.randomBytes(32)).toString('hex'),
  },
  {
    daoType: DaoType.SimpleVote,
    daoURI:
      'https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreihinhjmpnzz6a2knzxns73azckpb4ijrhx54mdeumvdltt7akqecu',
    members: [
      '0x03C25c5Dd860B021165A127A6553c67C371551b0',
      '0x987c9600B353a1c54d6E995BEd8A4F24F85e57fF',
    ],
    minimalDuration: ONE_HOUR_SECONDS,
    proposalCreationMinVotingPower: parseUnits('0.1'),
    daoToken: {
      isDeployed: false,
      tokenAddress: ZeroAddress,
      name: 'MetaForge Token',
      symbol: 'MFT',
      recipients: [
        '0x03C25c5Dd860B021165A127A6553c67C371551b0',
        '0x987c9600B353a1c54d6E995BEd8A4F24F85e57fF',
      ],
      amounts: [parseUnits('10000'), parseUnits('2345')],
    },
    quorumFraction: { numerator: 70, denominator: 100 },
    minimumParticipationFraction: { numerator: 33, denominator: 100 },
    salt: '0x' + Buffer.from(ethers.randomBytes(32)).toString('hex'),
  },
  {
    daoType: DaoType.SimpleVote,
    daoURI:
      'https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreidmkbw4xhvmlrz5oraxfbj6za7dbapvkmizvrwufoopjenp5k2kpm',
    members: [
      '0x03C25c5Dd860B021165A127A6553c67C371551b0',
      '0x987c9600B353a1c54d6E995BEd8A4F24F85e57fF',
      '0xBB7CCc4F133F9F2F593061EEB4a38F86c40c959C',
      '0x3Ddc7dFC95f348b68C4C42bF523290012e3D3d2a',
    ],
    minimalDuration: ONE_HOUR_SECONDS,
    proposalCreationMinVotingPower: parseUnits('0.1'),
    daoToken: {
      isDeployed: false,
      tokenAddress: ZeroAddress,
      name: 'NovaSphere Token',
      symbol: 'NST',
      recipients: [
        '0x03C25c5Dd860B021165A127A6553c67C371551b0',
        '0x987c9600B353a1c54d6E995BEd8A4F24F85e57fF',
        '0xBB7CCc4F133F9F2F593061EEB4a38F86c40c959C',
        '0x3Ddc7dFC95f348b68C4C42bF523290012e3D3d2a',
      ],
      amounts: [parseUnits('10000'), parseUnits('7300'), parseUnits('2000'), parseUnits('123')],
    },
    quorumFraction: { numerator: 60, denominator: 100 },
    minimumParticipationFraction: { numerator: 50, denominator: 100 },
    salt: '0x' + Buffer.from(ethers.randomBytes(32)).toString('hex'),
  },
  {
    daoType: DaoType.MultisigVote,
    daoURI:
      'https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreigq5tbee2byou6ntsaewzate2vxew5mielejvobn3cgfctn3srqty',
    members: [
      '0x03C25c5Dd860B021165A127A6553c67C371551b0',
      '0x987c9600B353a1c54d6E995BEd8A4F24F85e57fF',
      '0xBB7CCc4F133F9F2F593061EEB4a38F86c40c959C',
      '0x3Ddc7dFC95f348b68C4C42bF523290012e3D3d2a',
    ],
    minimalDuration: ONE_DAY_SECONDS,
    proposalCreationMinVotingPower: 0,
    daoToken: {
      isDeployed: false,
      tokenAddress: ZeroAddress,
      name: '',
      symbol: '',
      recipients: [],
      amounts: [],
    },
    quorumFraction: { numerator: 3, denominator: 4 },
    minimumParticipationFraction: { numerator: 3, denominator: 4 },
    salt: '0x' + Buffer.from(ethers.randomBytes(32)).toString('hex'),
  },
];

export const getTestProposals = (
  dao: AddressLike,
  usdt: AddressLike,
  usdc: AddressLike,
  targetContract: AddressLike,
) => [
  {
    actions: [
      {
        target: dao,
        value: 0n,
        calldatas: Dao__factory.createInterface().encodeFunctionData('transfer', [
          usdc,
          '0x987c9600B353a1c54d6E995BEd8A4F24F85e57fF',
          parseUnits('150000', 6),
        ]),
      },
    ],
    descriptionURI:
      'https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreihcrjckey5b7nv2mcq2frlkya6eha4k2jvxhhlkqxvy6vzwbhgphe',
    voteStart: Math.floor(Date.now() / 1000) + Number(ONE_MINUTE_SECONDS),
    voteDuration: 6n * ONE_HOUR_SECONDS,
  },
  {
    actions: [
      {
        target: dao,
        value: 0n,
        calldatas: Dao__factory.createInterface().encodeFunctionData('transfer', [
          usdt,
          '0x987c9600B353a1c54d6E995BEd8A4F24F85e57fF',
          parseUnits('52000', 6),
        ]),
      },
    ],
    descriptionURI:
      'https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreigffwhns7ymb2zshnzipuyidmhs2l3xiqkdujeh3q22pigzwfjus4',
    voteStart: Math.floor(Date.now() / 1000) + Number(ONE_MINUTE_SECONDS),
    voteDuration: 2n * ONE_DAY_SECONDS,
  },
  {
    actions: [
      {
        target: targetContract,
        value: 0n,
        calldatas: TargetContract__factory.createInterface().encodeFunctionData('onboard', [
          '0x987c9600B353a1c54d6E995BEd8A4F24F85e57fF',
        ]),
      },
    ],
    descriptionURI:
      'https://maroon-generous-cephalopod-902.mypinata.cloud/ipfs/bafkreibgalomf6yxndmlygoe3pu4imviq5hst37tbq6fbmdhheqpbg5q2u',
    voteStart: Math.floor(Date.now() / 1000) + Number(15n * ONE_MINUTE_SECONDS),
    voteDuration: ONE_WEEK_SECONDS,
  },
];
