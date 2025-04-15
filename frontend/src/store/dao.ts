import { combine, createEvent, createStore } from "effector";
import { DaoSettings, DaoType, Recipient } from "../types";

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
  minimumDuration: { days: "1", hours: "0", minutes: "0" },
  token: {
    isDeployed: false,
    tokenAddress: "",
    name: "",
    symbol: "",
    totalSupply: 0,
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

////////////////////// Multisig setup //////////////////////
export interface MemberEntry {
  id: number;
  address: string;
}

export const addMember = createEvent();
export const removeMember = createEvent<number>();
export const updateMemberAddress = createEvent<{
  id: number;
  address: string;
}>();

export const $members = createStore<MemberEntry[]>([{ id: 1, address: "" }])
  .on(addMember, (state) => {
    const newId = state.length ? state[state.length - 1].id + 1 : 1;
    return [...state, { id: newId, address: "" }];
  })
  .on(removeMember, (state, id) => state.filter((m) => m.id !== id))
  .on(updateMemberAddress, (state, { id, address }) =>
    state.map((m) => (m.id === id ? { ...m, address } : m))
  );

// Sync to daoInfo members + update quorum/participation
combine($members, $daoInfo, (members, daoInfo) => ({ members, daoInfo })).watch(
  ({ members, daoInfo }) => {
    if (daoInfo.type !== DaoType.MultisigVote) return;

    const denominator = members.length || 1;
    const quorum = {
      numerator: Math.floor((denominator * 2) / 3),
      denominator,
    };

    updateDaoInfo({
      members,
      quorum,
      minimumParticipation: quorum,
    });
  }
);
