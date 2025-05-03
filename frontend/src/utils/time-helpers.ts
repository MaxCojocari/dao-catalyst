import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";
import { ProposalSettings } from "../types";

dayjs.extend(utc);
dayjs.extend(timezonePlugin);

export function resolveTimezone(tz: string): string {
  if (tz === "UTC" || tz === "UTC+0") return "Etc/UTC";

  const match = tz.match(/^UTC([+-])(\d{1,2})$/);
  if (!match) return "Etc/UTC";

  const sign = match[1] === "+" ? "-" : "+";
  return `Etc/GMT${sign}${match[2]}`;
}

export function isStartDateInFuture(
  settings: ProposalSettings
): boolean | undefined {
  const { date, time, timezone } = settings.voteStart;

  const dateValid = dayjs(date).isValid();
  const timeValid = dayjs(time).isValid();

  if (!dateValid || !timeValid) return undefined;

  const voteStartTime = dayjs.tz(
    `${dayjs(date).format("YYYY-MM-DD")}T${dayjs(time).format("HH:mm")}`,
    resolveTimezone(timezone)
  );

  return voteStartTime.toDate().getTime() >= Date.now();
}

export function isMinimumDurationRespected(
  settings: ProposalSettings,
  minDurationSec: number = 86400 // 1 day
): boolean | undefined {
  const { date: date_start, time: time_start } = settings.voteStart;
  const { date: date_end, time: time_end } = settings.endDuration;

  if (settings.voteStart.optionSelected) {
    if (!dayjs(date_start).isValid() || !dayjs(time_start).isValid())
      return undefined;
  }

  if (settings.endDuration.optionSelected) {
    if (!dayjs(date_end).isValid() || !dayjs(time_end).isValid())
      return undefined;
  }

  const voteStart = settings.voteStart.optionSelected
    ? dayjs.tz(
        `${dayjs(settings.voteStart.date).format("YYYY-MM-DD")}T${dayjs(
          settings.voteStart.time
        ).format("HH:mm")}`,
        resolveTimezone(settings.voteStart.timezone)
      )
    : dayjs(); // Now

  const voteEnd = settings.endDuration.optionSelected
    ? dayjs.tz(
        `${dayjs(settings.endDuration.date).format("YYYY-MM-DD")}T${dayjs(
          settings.endDuration.time
        ).format("HH:mm")}`,
        resolveTimezone(settings.endDuration.timezone)
      )
    : voteStart
        .add(Number(settings.endDuration.duration.days), "day")
        .add(Number(settings.endDuration.duration.hours), "hour")
        .add(Number(settings.endDuration.duration.minutes), "minute");

  return voteEnd.diff(voteStart, "second") >= minDurationSec;
}

export function isVoteEndAfterStart(
  proposal: ProposalSettings
): boolean | undefined {
  const resolveTz = resolveTimezone;

  const { date: date_start, time: time_start } = proposal.voteStart;
  const { date: date_end, time: time_end } = proposal.endDuration;

  if (proposal.voteStart.optionSelected) {
    if (!dayjs(date_start).isValid() || !dayjs(time_start).isValid())
      return undefined;
  }

  if (proposal.endDuration.optionSelected) {
    if (!dayjs(date_end).isValid() || !dayjs(time_end).isValid())
      return undefined;
  }

  const start = proposal.voteStart.optionSelected
    ? dayjs.tz(
        `${dayjs(proposal.voteStart.date).format("YYYY-MM-DD")}T${dayjs(
          proposal.voteStart.time
        ).format("HH:mm")}`,
        resolveTz(proposal.voteStart.timezone)
      )
    : dayjs();

  const end = proposal.endDuration.optionSelected
    ? dayjs.tz(
        `${dayjs(proposal.endDuration.date).format("YYYY-MM-DD")}T${dayjs(
          proposal.endDuration.time
        ).format("HH:mm")}`,
        resolveTz(proposal.endDuration.timezone)
      )
    : start
        .add(Number(proposal.endDuration.duration.days), "day")
        .add(Number(proposal.endDuration.duration.hours), "hour")
        .add(Number(proposal.endDuration.duration.minutes), "minute");

  return end.isAfter(start);
}

export function formatTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return (
    date
      .toLocaleString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Europe/Chisinau",
      })
      .replace(",", "")
      .toUpperCase() + " UTC+3"
  );
}

export function formatTimestampSimple(timestamp: number) {
  const date = new Date(timestamp * 1000);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export function getLocalTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}${month}${day}${hours}${minutes}`;
}
