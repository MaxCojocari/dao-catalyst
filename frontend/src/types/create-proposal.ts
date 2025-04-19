import { Dayjs } from "dayjs";
import { Duration, Link, VotingOption } from ".";

export enum ActionType {
  TransferTokens = "Transfer Funds",
  MintDaoToken = "Mint DAO Tokens",
  Other = "Other",
}

export type ProposalAction = {
  id: string;
  target: string;
  value: string;
  type: ActionType;
  functionFragment: string;
  inputs: any[];
};

export enum VoteStartOptions {
  Now,
  SpecificTimestamp,
}

export enum EndDurationOptions {
  Duration,
  SpecificTimestamp,
}

export interface ProposalSettings {
  author: string;
  title: string;
  summary: string;
  votingOption: VotingOption;
  resources: Link[];
  actions: ProposalAction[];
  descriptionURI: string;
  voteStart: {
    optionSelected: VoteStartOptions | boolean;
    date: Dayjs;
    time: Dayjs;
    timezone: string;
  };
  endDuration: {
    optionSelected: EndDurationOptions | boolean;
    duration: Duration;
    date: Dayjs;
    time: Dayjs;
    timezone: string;
  };
}
