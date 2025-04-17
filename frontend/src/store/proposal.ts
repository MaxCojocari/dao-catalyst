import { createEvent, createStore } from "effector";
import {
  EndDurationOptions,
  ProposalSettings,
  VoteStartOptions,
} from "../types/create-proposal";
import { VotingOption } from "../types";
import dayjs from "dayjs";

export const updateProposalInfo = createEvent<Partial<ProposalSettings>>();
export const resetProposalInfo = createEvent();

export const setVoteStartOption = createEvent<VoteStartOptions>();
export const setEndDurationOption = createEvent<EndDurationOptions>();
export const updateVoteStart =
  createEvent<Partial<ProposalSettings["voteStart"]>>();
export const updateEndDuration =
  createEvent<Partial<ProposalSettings["endDuration"]>>();

const defaultProposalInfo: ProposalSettings = {
  author: "",
  title: "",
  summary: "",
  votingOption: VotingOption.SimpleVoting,
  resources: [{ label: "", url: "" }],
  actions: [],
  descriptionURI: "",
  voteStart: {
    optionSelected: false,
    date: dayjs(),
    time: dayjs(),
    timezone: "UTC+3",
  },
  endDuration: {
    optionSelected: false,
    duration: { days: "1", hours: "0", minutes: "0" },
    date: dayjs(),
    time: dayjs(),
    timezone: "UTC+3",
  },
};

export const $proposalInfo = createStore<ProposalSettings>(defaultProposalInfo)
  .on(updateProposalInfo, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .on(setVoteStartOption, (state, optionSelected) => ({
    ...state,
    voteStart: {
      ...state.voteStart,
      optionSelected,
    },
  }))
  .on(setEndDurationOption, (state, optionSelected) => ({
    ...state,
    endDuration: {
      ...state.endDuration,
      optionSelected,
    },
  }))
  .on(updateVoteStart, (state, payload) => ({
    ...state,
    voteStart: {
      ...state.voteStart,
      ...payload,
    },
  }))
  .on(updateEndDuration, (state, payload) => ({
    ...state,
    endDuration: {
      ...state.endDuration,
      ...payload,
    },
  }))
  .reset(resetProposalInfo);
