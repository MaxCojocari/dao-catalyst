import { formatTimestamp } from ".";
import { StatusItem } from "../components/proposal-details/status-timeline";
import { ProposalState, StatusTimelineType } from "../types";

export async function generateStatuses({
  blockHashProposalCreation,
  blockNumberProposalCreation,
  blockHashProposalExecution,
  blockNumberProposalExecution,
  voteStart,
  voteEnd,
  state,
  client,
}: {
  blockHashProposalCreation: `0x{string}`;
  blockNumberProposalCreation: bigint;
  blockHashProposalExecution?: `0x{string}`;
  blockNumberProposalExecution?: bigint;
  voteStart: bigint;
  voteEnd: bigint;
  state: ProposalState;
  client: any;
}): Promise<StatusItem[]> {
  const statuses: StatusItem[] = [];

  const creationBlock = await client.getBlock({
    blockHash: blockHashProposalCreation,
  });
  const creationTimestamp = Number(creationBlock.timestamp);

  let executionTimestamp: number | undefined = undefined;
  if (blockHashProposalExecution) {
    const executionBlock = await client.getBlock({
      blockHash: blockHashProposalExecution,
    });
    executionTimestamp = Number(executionBlock.timestamp);
  }

  statuses.push({
    label: StatusTimelineType.Published,
    timestamp: formatTimestamp(creationTimestamp),
    blockNumber: blockNumberProposalCreation.toLocaleString(),
    isCompleted: state !== ProposalState.Pending,
    isCurrent: state === ProposalState.Pending,
  });

  if (state === ProposalState.Active) {
    statuses.push({
      label: StatusTimelineType.Running,
      timestamp: formatTimestamp(Number(voteStart)),
      isCompleted:
        state !== ProposalState.Active && state !== ProposalState.Pending,
      isCurrent: state === ProposalState.Active,
    });
  }

  if (state === ProposalState.Canceled || state === ProposalState.Defeated) {
    statuses.push({
      label: StatusTimelineType.Rejected,
      timestamp: formatTimestamp(Number(voteEnd)),
      isCompleted: true,
      isCurrent: true,
    });
  } else if (state >= ProposalState.Succeeded) {
    statuses.push({
      label: StatusTimelineType.Succeeded,
      timestamp: formatTimestamp(Number(voteEnd)),
      isCompleted: state !== ProposalState.Succeeded,
      isCurrent: state === ProposalState.Succeeded,
    });
  }

  if (
    state === ProposalState.Executed &&
    executionTimestamp &&
    blockNumberProposalExecution
  ) {
    statuses.push({
      label: StatusTimelineType.Executed,
      timestamp: formatTimestamp(executionTimestamp),
      blockNumber: blockNumberProposalExecution.toLocaleString(),
      isCompleted: true,
      isCurrent: true,
    });
  }

  return statuses;
}
