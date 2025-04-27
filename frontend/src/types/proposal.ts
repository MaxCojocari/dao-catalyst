import { Dayjs } from "dayjs";
import { Duration, Link, VoteCounting } from ".";
import { StatusItem } from "../components/proposal-details/status-timeline";

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
  inputs: any[] | readonly any[];
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
  votingOption: VoteCounting;
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

export type StatusType = "success" | "pending" | "error" | "active";

export enum StatusTimelineType {
  Published = "Published",
  Running = "Running",
  Succeeded = "Succeeded",
  Executed = "Executed",
  Rejected = "Rejected",
}

export enum ProposalState {
  Pending,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Executed,
}

export interface ProposalSummary {
  proposalId: number;
  author: string;
  title: string;
  summary: string;
  state: ProposalState;
}

export type ProposalMetadata = {
  title: string;
  summary: string;
  resources: Link[];
};

export interface ProposalSummaryExtended {
  author: string;
  title: string;
  summary: string;
  state: ProposalState;
  resources: Link[];
  statuses: StatusItem[];
  actions: ProposalAction[];
  txHashExecuted: string | undefined;
}
