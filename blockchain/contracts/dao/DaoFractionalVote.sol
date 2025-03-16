// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Dao} from "../Dao.sol";
import {FractionalCountingStrategy} from "../extensions/FractionalCountingStrategy.sol";
import {TokenVoting} from "../extensions/TokenVoting.sol";
import {IERC5805} from "@openzeppelin/contracts/interfaces/IERC5805.sol";
import {Fraction} from "../utils/Utils.sol";

contract DaoFractionalVote is Dao, FractionalCountingStrategy, TokenVoting {
    constructor(
        string memory metadataURI_,
        address[] memory members_,
        uint256 minimalDuration_,
        Fraction memory quorumFraction_,
        Fraction memory minimumParticipationFraction_,
        IERC5805 token
    )
        Dao(metadataURI_, members_, minimalDuration_, quorumFraction_, minimumParticipationFraction_)
        TokenVoting(token)
    {}
}
