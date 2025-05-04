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

export const DAO_CREATED_EVENT = {
  anonymous: false,
  inputs: [
    {
      indexed: true,
      internalType: "address",
      name: "daoAddress",
      type: "address",
    },
    {
      indexed: true,
      internalType: "enum DaoFactory.DaoType",
      name: "daoType",
      type: "uint8",
    },
    {
      indexed: true,
      internalType: "address",
      name: "owner",
      type: "address",
    },
    {
      indexed: false,
      internalType: "string",
      name: "daoURI",
      type: "string",
    },
    {
      indexed: false,
      internalType: "address",
      name: "daoToken",
      type: "address",
    },
    {
      indexed: false,
      internalType: "uint256",
      name: "minimalDuration",
      type: "uint256",
    },
    {
      components: [
        {
          internalType: "uint16",
          name: "numerator",
          type: "uint16",
        },
        {
          internalType: "uint16",
          name: "denominator",
          type: "uint16",
        },
      ],
      indexed: false,
      internalType: "struct Fraction",
      name: "quorumFraction",
      type: "tuple",
    },
    {
      components: [
        {
          internalType: "uint16",
          name: "numerator",
          type: "uint16",
        },
        {
          internalType: "uint16",
          name: "denominator",
          type: "uint16",
        },
      ],
      indexed: false,
      internalType: "struct Fraction",
      name: "minimumParticipationFraction",
      type: "tuple",
    },
  ],
  name: "DaoCreated",
  type: "event",
};
