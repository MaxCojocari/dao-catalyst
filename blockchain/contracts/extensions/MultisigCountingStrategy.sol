// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Dao} from "../Dao.sol";

abstract contract MultisigCountingStrategy is Dao {
    struct ProposalVote {
        uint256 confirmations;
        mapping(address voter => bool) hasVoted;
    }

    mapping(uint256 proposalId => ProposalVote) private proposalVotesMap;

    function hasVoted(uint256 proposalId, address account) external view returns (bool) {
        return proposalVotesMap[proposalId].hasVoted[account];
    }

    function confirmations(uint256 proposalId) external view returns (uint256) {
        return proposalVotesMap[proposalId].confirmations;
    }

    function _quorumReached(uint256 proposalId) internal view override returns (bool) {
        return proposalVotesMap[proposalId].confirmations > quorumFraction.numerator;
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
    ) internal virtual override returns (uint256) {
        ProposalVote storage proposalVote = proposalVotesMap[proposalId];

        if (proposalVote.hasVoted[account]) {
            revert AlreadyCastVote(account);
        }
        proposalVote.hasVoted[account] = true;
        proposalVote.confirmations++;

        return 1;
    }
}
