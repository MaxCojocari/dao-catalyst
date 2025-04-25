import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { DaoCreated } from "../generated/schema"
import { DaoCreated as DaoCreatedEvent } from "../generated/DaoFactory/DaoFactory"
import { handleDaoCreated } from "../src/dao-factory"
import { createDaoCreatedEvent } from "./dao-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let daoAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let daoType = 123
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let daoURI = "Example string value"
    let daoToken = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let minimalDuration = BigInt.fromI32(234)
    let quorumFraction = "ethereum.Tuple Not implemented"
    let minimumParticipationFraction = "ethereum.Tuple Not implemented"
    let newDaoCreatedEvent = createDaoCreatedEvent(
      daoAddress,
      daoType,
      owner,
      daoURI,
      daoToken,
      minimalDuration,
      quorumFraction,
      minimumParticipationFraction
    )
    handleDaoCreated(newDaoCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("DaoCreated created and stored", () => {
    assert.entityCount("DaoCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "DaoCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "daoAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DaoCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "daoType",
      "123"
    )
    assert.fieldEquals(
      "DaoCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DaoCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "daoURI",
      "Example string value"
    )
    assert.fieldEquals(
      "DaoCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "daoToken",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "DaoCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "minimalDuration",
      "234"
    )
    assert.fieldEquals(
      "DaoCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "quorumFraction",
      "ethereum.Tuple Not implemented"
    )
    assert.fieldEquals(
      "DaoCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "minimumParticipationFraction",
      "ethereum.Tuple Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
