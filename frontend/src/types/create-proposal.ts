import { Link } from ".";

export type ProposalAction = {
  target: string;
  value: string;
  calldatas: string;
};

export interface ProposalSettings {
  author: string;
  title: string;
  summary: string;
  body: string;
  resources: Link[];
  actions: ProposalAction[];
  descriptionURI: string;
  voteStart: number;
  voteDuration: number;
}
