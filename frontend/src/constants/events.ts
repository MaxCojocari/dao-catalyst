import { AbiEvent } from "viem";

export const PROPOSAL_CREATION_EVENT = {
  anonymous: false,
  inputs: [
    {
      indexed: true,
      internalType: "uint256",
      name: "proposalId",
      type: "uint256",
    },
    {
      indexed: true,
      internalType: "address",
      name: "proposer",
      type: "address",
    },
    {
      components: [
        {
          internalType: "address",
          name: "target",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "calldatas",
          type: "bytes",
        },
      ],
      indexed: false,
      internalType: "struct IDao.ProposalAction[]",
      name: "actions",
      type: "tuple[]",
    },
    {
      indexed: false,
      internalType: "uint64",
      name: "voteStart",
      type: "uint64",
    },
    {
      indexed: false,
      internalType: "uint64",
      name: "voteEnd",
      type: "uint64",
    },
    {
      indexed: false,
      internalType: "string",
      name: "descriptionURI",
      type: "string",
    },
  ],
  name: "ProposalCreated",
  type: "event",
} as AbiEvent;

export const PROPOSAL_EXECUTED_EVENT = {
  anonymous: false,
  inputs: [
    {
      indexed: false,
      internalType: "uint256",
      name: "proposalId",
      type: "uint256",
    },
  ],
  name: "ProposalExecuted",
  type: "event",
} as AbiEvent;

export const VOTE_CAST_EVENT = {
  anonymous: false,
  inputs: [
    {
      indexed: true,
      internalType: "address",
      name: "voter",
      type: "address",
    },
    {
      indexed: true,
      internalType: "uint256",
      name: "proposalId",
      type: "uint256",
    },
    {
      indexed: false,
      internalType: "uint256",
      name: "weight",
      type: "uint256",
    },
  ],
  name: "VoteCast",
  type: "event",
} as AbiEvent;
