// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Dao} from "../Dao.sol";
import {SimpleCountingStrategy} from "../extensions/SimpleCountingStrategy.sol";
import {TokenVoting} from "../extensions/TokenVoting.sol";
import {Fraction} from "../utils/Utils.sol";
import {IDaoSimpleVote} from "../interfaces/IDaoSimpleVote.sol";
import {IERC5805} from "@openzeppelin/contracts/interfaces/IERC5805.sol";

contract DaoSimpleVote is IDaoSimpleVote, Dao, SimpleCountingStrategy, TokenVoting {
    function initialize(
        address owner,
        string memory daoURI_,
        uint256 minimalDuration_,
        uint256 proposalCreationMinVotingPower_,
        Fraction memory quorumFraction_,
        Fraction memory minimumParticipationFraction_,
        IERC5805 token_
    ) external {
        if (initialized) revert AlreadyInitialized();

        daoURI = daoURI_;
        minimalDuration = minimalDuration_;
        proposalCreationMinVotingPower = proposalCreationMinVotingPower_;
        quorumFraction = quorumFraction_;
        minimumParticipationFraction = minimumParticipationFraction_;
        token = token_;

        _grantRole(DEFAULT_ADMIN_ROLE, owner);

        initialized = true;
    }
}
