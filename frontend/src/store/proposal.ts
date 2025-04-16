import { createEvent, createStore } from "effector";
import { ProposalSettings } from "../types/create-proposal";

export const updateProposalInfo = createEvent<Partial<ProposalSettings>>();
export const resetProposalInfo = createEvent();

const defaultProposalInfo: ProposalSettings = {
  author: "",
  title: "",
  summary: "",
  body: "",
  resources: [{ label: "", url: "" }],
  actions: [],
  descriptionURI: "",
  voteStart: 0,
  voteDuration: 0,
};

export const $proposalInfo = createStore<ProposalSettings>(defaultProposalInfo)
  .on(updateProposalInfo, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .reset(resetProposalInfo);
