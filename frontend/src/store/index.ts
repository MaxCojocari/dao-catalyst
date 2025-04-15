import { createEvent, createStore } from "effector";
import { DaoSettings, DaoType, Recipient } from "../types";

export const setIsLoading = createEvent<Record<string, boolean>>();
export const $isLoadingObj = createStore<Record<string, boolean>>({}).on(
  setIsLoading,
  (state, data) => ({ ...state, ...data })
);

export const $isLoading = createStore<boolean>(false).on(
  $isLoadingObj,
  (_, data) => Object.values(data).some((loading) => loading)
);

export const updateDaoInfo = createEvent<Partial<DaoSettings>>();
export const resetDaoInfo = createEvent();

export const $daoInfo = createStore<DaoSettings>({
  type: DaoType.SimpleVote,
  name: "",
  summary: "",
  links: [{ label: "", url: "" }],
  daoURI: "",
  members: [
    {
      id: 1,
      address: "",
    },
  ],
  minimumDuration: { days: "0", hours: "0", minutes: "0" },
  token: {
    isDeployed: false,
    tokenAddress: "",
    name: "",
    symbol: "",
    initialDistribution: [
      {
        id: 1,
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
  members: value.map((wallet) => {
    return { id: wallet.id, address: wallet.address };
  }),
}));
