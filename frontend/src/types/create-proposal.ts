export type ProposalAction = {
  target: string;
  value: string;
  calldatas: string;
};

export interface ProposalSettings {
  actions: ProposalAction[];
  descriptionURI: string;
  voteStart: number;
  voteDuration: number;
}
