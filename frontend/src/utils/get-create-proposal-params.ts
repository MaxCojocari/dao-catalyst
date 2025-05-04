import { parseUnits } from "viem";
import { ActionType, Link, ProposalAction, ProposalSettings } from "../types";
import { predictIpfsUriJson } from "./predict-ipfs-uri";
import { ONE_MINUTE_SECONDS } from "../constants";
import { Dao__factory, TargetContract__factory } from "../typechain-types";
import { Dayjs } from "dayjs";
import { getCurrentBlockTimestamp, resolveTimezone } from ".";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

export async function getCreateProposalParams(
  proposalSettings: ProposalSettings | null
) {
  if (!proposalSettings) return;

  const { title, summary, resources, actions, voteStart, endDuration } =
    proposalSettings;

  let formattedLinks: Link[] = [];
  if (resources.length >= 1 && resources[0].url) {
    formattedLinks = resources;
  }
  const proposalMetadata = {
    title,
    summary,
    resources: formattedLinks,
  };
  const descriptionURI = await predictIpfsUriJson(proposalMetadata);

  const formattedActions = getFormattedActions(actions);

  const { formattedVoteStart, formattedVoteDuration } =
    await getFormattedTimestamps(voteStart, endDuration);

  return {
    params: {
      actions: formattedActions,
      descriptionURI,
      voteStart: formattedVoteStart,
      voteDuration: formattedVoteDuration,
    },
    proposalMetadata,
  };
}

function getFormattedActions(actions: ProposalAction[]) {
  return actions.map((action) => {
    const { type, target, value, inputs, functionFragment } = action;
    if (type === ActionType.TransferTokens) {
      return {
        target,
        value,
        calldatas: Dao__factory.createInterface().encodeFunctionData(
          "transfer",
          [inputs[0], inputs[1], parseUnits(inputs[2], 6)]
        ),
      };
    }

    if (type === ActionType.Other) {
      return {
        target,
        value,
        calldatas: TargetContract__factory.createInterface().encodeFunctionData(
          functionFragment.split("(")[0] as any,
          inputs as any
        ),
      };
    }
  });
}

async function getFormattedTimestamps(voteStart: any, endDuration: any) {
  let formattedVoteStart = 0;
  let formattedVoteDuration = 0;
  const deltaT = 1 * Number(ONE_MINUTE_SECONDS);

  if (!voteStart.optionSelected) {
    formattedVoteStart = (await getCurrentBlockTimestamp()) + deltaT;
  } else {
    const { date, time, timezone } = voteStart;
    formattedVoteStart = getTimestamp(date, time, timezone);
  }

  if (!endDuration.optionSelected) {
    const {
      duration: { days, hours, minutes },
    } = endDuration;
    formattedVoteDuration =
      Number(days) * 24 * 3600 + Number(hours) * 3600 + Number(minutes) * 60;
  } else {
    const { date, time, timezone } = endDuration;
    const voteEnd = getTimestamp(date, time, timezone);
    formattedVoteDuration = voteStart.optionSelected
      ? voteEnd - formattedVoteStart
      : voteEnd - formattedVoteStart + deltaT;
  }

  return { formattedVoteStart, formattedVoteDuration };
}

function getTimestamp(
  date: Dayjs,
  time: Dayjs,
  timezone: string // e.g. "UTC+3"
): number {
  const datePart = date.format("YYYY-MM-DD");
  const timePart = time.format("HH:mm:ss");
  const local = dayjs.tz(`${datePart}T${timePart}`, resolveTimezone(timezone));

  return local.unix();
}
