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
