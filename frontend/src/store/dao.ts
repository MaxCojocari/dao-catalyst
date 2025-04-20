import { createEvent, createStore } from "effector";
import { DaoSettings, DaoType, Recipient } from "../types";

export const updateDaoInfo = createEvent<Partial<DaoSettings>>();
export const resetDaoInfo = createEvent();

export const $daoInfo = createStore<DaoSettings>({
  type: DaoType.SimpleVote,
  name: "",
  summary: "",
  links: [{ label: "", url: "" }],
  daoURI: "",
  members: [""],
  minimumDuration: { days: "1", hours: "0", minutes: "0" },
  token: {
    isDeployed: false,
    tokenAddress: "",
    name: "",
    symbol: "",
    totalSupply: 0,
    initialDistribution: [
      {
        address: "",
        tokens: "1",
      },
    ],
  },
  quorum: { numerator: 50, denominator: 100 },
  minimumParticipation: { numerator: 50, denominator: 100 },
  proposalCreationMinVotingPower: "",
  earlyExecution: false,
  salt: "",
})
  .on(updateDaoInfo, (state, payload) => ({
    ...state,
    ...payload,
  }))
  .reset(resetDaoInfo);

export const setQuorumNumerator = createEvent<number>();
$daoInfo.on(setQuorumNumerator, (state, value) => ({
  ...state,
  quorum: { ...state.quorum, numerator: Math.min(value, 100) },
}));

export const setMinimumParticipationNumerator = createEvent<number>();
$daoInfo.on(setMinimumParticipationNumerator, (state, value) => ({
  ...state,
  minimumParticipation: {
    ...state.minimumParticipation,
    numerator: Math.min(value, 100),
  },
}));

export const setEarlyExecution = createEvent<boolean>();
$daoInfo.on(setEarlyExecution, (state, value) => ({
  ...state,
  earlyExecution: value,
}));

export const setInitialRecipients = createEvent<Recipient[]>();
$daoInfo.on(setInitialRecipients, (state, value) => ({
  ...state,
  token: {
    ...state.token,
    initialDistribution: value,
  },
  members: value.map((wallet) => wallet.address),
}));

////////////////////// Multisig setup //////////////////////
export const addMember = createEvent();
export const removeMember = createEvent<number>();
export const updateMemberAddress = createEvent<{
  id: number;
  address: string | undefined;
}>();

export const $members = createStore<(string | undefined)[]>([""])
  .on(addMember, (state) => [...state, ""])
  .on(removeMember, (state, id) => state.filter((_, index) => index !== id))
  .on(updateMemberAddress, (state, { id, address }) =>
    state.map((member, index) => (index === id ? address : member))
  );
