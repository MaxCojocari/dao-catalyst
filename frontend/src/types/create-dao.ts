import { Duration, Fraction, Link } from ".";

export enum DaoType {
  SimpleVote,
  FractionalVote,
  MultisigVote,
}

export type Recipient = {
  id: number;
  address: string | undefined;
  tokens: string;
};

export type Member = {
  id: number;
  address: string | undefined;
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
  members: Member[];
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
