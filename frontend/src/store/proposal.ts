import { createEvent, createStore } from "effector";
import { ProposalSettings } from "../types/create-proposal";

export const updateProposalSettings = createEvent<Partial<ProposalSettings>>();
export const resetProposalSettings = createEvent();

const defaultProposalSettings: ProposalSettings = {
  actions: [],
  descriptionURI: "",
  voteStart: 0,
  voteDuration: 0,
};

export const $proposalSettings = createStore<ProposalSettings>(
  defaultProposalSettings
)
  .on(updateProposalSettings, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .reset(resetProposalSettings);
