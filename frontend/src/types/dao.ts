import { Duration, Fraction, Link, TransferType } from ".";

export enum DaoType {
  SimpleVote,
  FractionalVote,
  MultisigVote,
}

export type Recipient = {
  address: string | undefined;
  tokens: string;
};

export interface DaoTokenSettings {
  isDeployed: boolean;
  tokenAddress: string;
  name: string;
  symbol: string;
  initialDistribution: Recipient[];
  totalSupply: number;
}

export interface DaoSettings {
  type: DaoType;
  name: string;
  summary: string;
  links: Link[];
  daoURI: string;
  members: (string | undefined)[];
  minimumDuration: Duration;
  token: DaoTokenSettings;
  quorum: Fraction; // support threshold
  minimumParticipation: Fraction;
  proposalCreationMinVotingPower: number | string;
  earlyExecution: boolean;
  salt: string;
}

export enum EligibleVoters {
  TokenHolders = "Token holders",
  MultisigMembers = "Multisig members",
}

export interface DaoSummary {
  daoType: DaoType;
  name: string;
  logo: string;
  summary: string;
  owner: string;
  contractAddress: string;
  daoToken?: string;
  isCallerMember?: boolean;
  creationDate?: string;
  links?: Link[];
}

export type DaoMember = {
  address: string;
  votingPower: number;
  percentage: number;
};

export type DaoTransfer = {
  type: TransferType;
  amount: string;
  token: string;
  timestamp: number;
};

export type DaoMetadata = {
  name: string;
  logo: string;
  summary: string;
  links: Link[];
};
