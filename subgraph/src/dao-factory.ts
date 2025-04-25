import { DaoCreated as DaoCreatedEvent } from "../generated/DaoFactory/DaoFactory";
import { DaoCreated } from "../generated/schema";

export function handleDaoCreated(event: DaoCreatedEvent): void {
  let entity = new DaoCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.daoAddress = event.params.daoAddress;
  entity.daoType = event.params.daoType;
  entity.owner = event.params.owner;
  entity.daoURI = event.params.daoURI;
  entity.daoToken = event.params.daoToken;
  entity.minimalDuration = event.params.minimalDuration;
  entity.quorumFraction_numerator = event.params.quorumFraction.numerator;
  entity.quorumFraction_denominator = event.params.quorumFraction.denominator;
  entity.minimumParticipationFraction_numerator =
    event.params.minimumParticipationFraction.numerator;
  entity.minimumParticipationFraction_denominator =
    event.params.minimumParticipationFraction.denominator;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
