export enum DaoType {
  SimpleVote,
  FractionalVote,
  MultisigVote,
}

export type Fraction = {
  numerator: number;
  denominator: number;
};

export type Duration = {
  days: number;
  hours: number;
  minutes: number;
};

export type DaoLink = {
  label: string;
  url: string;
};

export interface DaoTokenSettings {
  isDeployed: boolean;
  tokenAddress: string;
  name: string;
  symbol: string;
  recipients: string[];
  amounts: bigint[];
}

export interface DaoSettings {
  daoType: DaoType;
  name: string;
  summary: string;
  links: DaoLink;
  daoURI: string;
  members: string[];
  minimalDuration: Duration;
  daoToken: DaoTokenSettings;
  quorumFraction: Fraction;
  minimumParticipationFraction: Fraction;
  proposalCreationMinVotingPower: number;
  salt: string;
}

export enum EligibleVoters {
  TokenHolders = "Token holders",
  MultisigMembers = "Multisig members",
}
