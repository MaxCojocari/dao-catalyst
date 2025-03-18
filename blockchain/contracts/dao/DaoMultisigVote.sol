// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Dao} from "../Dao.sol";
import {MultisigCountingStrategy} from "../extensions/MultisigCountingStrategy.sol";
import {MultisigVoting} from "../extensions/MultisigVoting.sol";
import {Fraction} from "../utils/Utils.sol";
import {IDaoMultisigVote} from "../interfaces/IDaoMultisigVote.sol";
import {IERC5805} from "@openzeppelin/contracts/interfaces/IERC5805.sol";
import {MEMBER_ROLE} from "../extensions/MultisigCountingStrategy.sol";

contract DaoMultisigVote is IDaoMultisigVote, Dao, MultisigCountingStrategy, MultisigVoting {
    function initialize(
        address owner,
        string memory daoURI_,
        address[] memory members_,
        uint256 minimalDuration_,
        Fraction memory quorumFraction_,
        Fraction memory minimumParticipationFraction_
    ) external {
        if (initialized) revert AlreadyInitialized();

        daoURI = daoURI_;
        minimalDuration = minimalDuration_;
        quorumFraction = quorumFraction_;
        minimumParticipationFraction = minimumParticipationFraction_;

        uint256 length = members_.length;
        for (uint256 i = 0; i < length; ++i) {
            if (members_[0] == address(0)) revert InvalidAddress(address(0));
            _grantRole(MEMBER_ROLE, members_[i]);
        }

        _grantRole(DEFAULT_ADMIN_ROLE, owner);

        initialized = true;
    }

    function _getVotes(address account, uint256, bytes memory param) internal view override returns (uint256) {
        uint256 proposalId = abi.decode(param, (uint256));
        return proposalVotesMap[proposalId].hasVoted[account] ? 1 : 0;
    }
}
