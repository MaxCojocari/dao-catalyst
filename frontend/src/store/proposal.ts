import { createEvent, createStore } from "effector";
import {
  ActionType,
  EndDurationOptions,
  ProposalAction,
  ProposalSettings,
  VoteStartOptions,
} from "../types/create-proposal";
import { VoteCounting } from "../types";
import dayjs from "dayjs";
import { nanoid } from "nanoid";

export const updateProposalInfo = createEvent<Partial<ProposalSettings>>();
export const resetProposalInfo = createEvent();

export const setVoteStartOption = createEvent<VoteStartOptions>();
export const setEndDurationOption = createEvent<EndDurationOptions>();

export const updateVoteStart =
  createEvent<Partial<ProposalSettings["voteStart"]>>();
export const updateEndDuration =
  createEvent<Partial<ProposalSettings["endDuration"]>>();

export const updateProposalAction = createEvent<{
  index: number;
  updatedAction: Partial<ProposalAction>;
}>();

export const updateSelectedActionType = createEvent<{
  index: number;
  type: ActionType;
}>();

const defaultProposalInfo: ProposalSettings = {
  author: "",
  title: "",
  summary: "",
  votingOption: VoteCounting.SimpleVoting,
  resources: [{ label: "", url: "" }],
  actions: [
    {
      id: nanoid(),
      target: "",
      value: "0x0",
      type: ActionType.TransferTokens,
      functionFragment: "",
      inputs: [],
    },
  ],
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
  .on(updateProposalAction, (state, { index, updatedAction }) => {
    const updatedActions = [...state.actions];
    const existing = updatedActions[index];

    if (!existing) return state;

    updatedActions[index] = { ...existing, ...updatedAction };

    return {
      ...state,
      actions: updatedActions,
    };
  })
  .on(updateSelectedActionType, (state, { index, type }) => {
    const updatedActions = [...state.actions];
    const existing = updatedActions[index];

    if (!existing) return state;

    updatedActions[index] = { ...existing, type };

    return {
      ...state,
      actions: updatedActions,
    };
  })
  .reset(resetProposalInfo);
