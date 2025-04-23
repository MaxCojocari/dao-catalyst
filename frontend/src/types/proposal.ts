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
