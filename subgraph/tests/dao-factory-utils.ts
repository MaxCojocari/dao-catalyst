import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  DaoCreated,
  OwnershipTransferred
} from "../generated/DaoFactory/DaoFactory"

export function createDaoCreatedEvent(
  daoAddress: Address,
  daoType: i32,
  owner: Address,
  daoURI: string,
  daoToken: Address,
  minimalDuration: BigInt,
  quorumFraction: ethereum.Tuple,
  minimumParticipationFraction: ethereum.Tuple
): DaoCreated {
  let daoCreatedEvent = changetype<DaoCreated>(newMockEvent())

  daoCreatedEvent.parameters = new Array()

  daoCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "daoAddress",
      ethereum.Value.fromAddress(daoAddress)
    )
  )
  daoCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "daoType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(daoType))
    )
  )
  daoCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  daoCreatedEvent.parameters.push(
    new ethereum.EventParam("daoURI", ethereum.Value.fromString(daoURI))
  )
  daoCreatedEvent.parameters.push(
    new ethereum.EventParam("daoToken", ethereum.Value.fromAddress(daoToken))
  )
  daoCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "minimalDuration",
      ethereum.Value.fromUnsignedBigInt(minimalDuration)
    )
  )
  daoCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "quorumFraction",
      ethereum.Value.fromTuple(quorumFraction)
    )
  )
  daoCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "minimumParticipationFraction",
      ethereum.Value.fromTuple(minimumParticipationFraction)
    )
  )

  return daoCreatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent =
    changetype<OwnershipTransferred>(newMockEvent())

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}
