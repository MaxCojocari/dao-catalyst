// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Fraction} from "../utils/Utils.sol";
import {IERC5805} from "@openzeppelin/contracts/interfaces/IERC5805.sol";

interface IDaoSimpleVote {
    function initialize(
        address owner,
        string memory daoURI,
        uint256 minimalDuration,
        uint256 proposalCreationMinVotingPower,
        Fraction memory quorumFraction,
        Fraction memory minimumParticipationFraction,
        IERC5805 token
    ) external;
}
