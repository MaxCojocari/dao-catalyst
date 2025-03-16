// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Dao} from "../Dao.sol";
import {SimpleCountingStrategy} from "../extensions/SimpleCountingStrategy.sol";
import {TokenVoting} from "../extensions/TokenVoting.sol";
import {IERC5805} from "@openzeppelin/contracts/interfaces/IERC5805.sol";
import {Fraction} from "../utils/Utils.sol";

contract DaoSimpleVote is Dao, SimpleCountingStrategy, TokenVoting {
    constructor(
        address owner,
        string memory daoURI_,
        uint256 minimalDuration_,
        Fraction memory quorumFraction_,
        Fraction memory minimumParticipationFraction_,
        IERC5805 token_
    ) Dao(owner, daoURI_, minimalDuration_, quorumFraction_, minimumParticipationFraction_) TokenVoting(token_) {}
}
