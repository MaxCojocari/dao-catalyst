export enum DaoType {
  SimpleVote,
  FractionalVote,
  MultisigVote,
}

export enum ProposalState {
  Pending,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Expired,
  Executed,
}

export enum VoteType {
  For,
  Against,
  Abstain,
}
