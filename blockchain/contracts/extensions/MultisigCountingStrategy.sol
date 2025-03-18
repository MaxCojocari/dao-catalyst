// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Dao} from "../Dao.sol";

/// @dev keccak256("MEMBER_ROLE")
bytes32 constant MEMBER_ROLE = 0x829b824e2329e205435d941c9f13baf578548505283d29261236d8e6596d4636;

abstract contract MultisigCountingStrategy is Dao {
    struct ProposalVote {
        uint256 confirmations;
        mapping(address voter => bool) hasVoted;
    }

    mapping(uint256 proposalId => ProposalVote) internal proposalVotesMap;

    function hasVoted(uint256 proposalId, address account) external view returns (bool) {
        return proposalVotesMap[proposalId].hasVoted[account];
    }

    function confirmations(uint256 proposalId) external view returns (uint256) {
        return proposalVotesMap[proposalId].confirmations;
    }

    function _quorumReached(uint256 proposalId) internal view override returns (bool) {
        return proposalVotesMap[proposalId].confirmations >= quorumFraction.numerator;
    }

    function _voteSucceeded(uint256 proposalId) internal view override returns (bool) {
        return _quorumReached(proposalId);
    }

    function _countVote(
        uint256 proposalId,
        address account,
        uint8,
        uint256,
        bytes memory
    ) internal virtual override onlyRole(MEMBER_ROLE) returns (uint256) {
        ProposalVote storage proposalVote = proposalVotesMap[proposalId];

        if (proposalVote.hasVoted[account]) {
            revert AlreadyCastVote(account);
        }
        proposalVote.hasVoted[account] = true;
        ++proposalVote.confirmations;

        return 1;
    }
}
