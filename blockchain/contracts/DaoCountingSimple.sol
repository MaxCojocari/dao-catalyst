// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Dao} from "./Dao.sol";

abstract contract DaoCountingSimple is Dao {
    enum VoteType {
        Against,
        For,
        Abstain
    }

    struct ProposalVote {
        uint256 againstVotes;
        uint256 forVotes;
        uint256 abstainVotes;
        mapping(address voter => bool) hasVoted;
    }

    error AlreadyCastVote(address account);

    error InvalidVoteType();

    mapping(uint256 proposalId => ProposalVote) proposalVotesMap;

    function hasVoted(uint256 proposalId, address account) external view returns (bool) {
        return proposalVotesMap[proposalId].hasVoted[account];
    }

    function proposalVotes(
        uint256 proposalId
    ) external view returns (uint256 againstVotes, uint256 forVotes, uint256 abstainVotes) {
        ProposalVote storage proposalVote = proposalVotesMap[proposalId];
        return (proposalVote.againstVotes, proposalVote.forVotes, proposalVote.abstainVotes);
    }

    function _quorumReached(uint256 proposalId) internal view override returns (bool) {
        ProposalVote storage proposalVote = proposalVotesMap[proposalId];
        return _quorum(_proposalSnapshot(proposalId)) <= proposalVote.forVotes + proposalVote.abstainVotes;
    }

    function _voteSucceeded(uint256 proposalId) internal view override returns (bool) {
        ProposalVote storage proposalVote = proposalVotesMap[proposalId];
        return proposalVote.forVotes > proposalVote.againstVotes;
    }

    function _countVote(
        uint256 proposalId,
        address account,
        uint8 support,
        uint256 totalWeight,
        bytes memory
    ) internal virtual override returns (uint256) {
        ProposalVote storage proposalVote = proposalVotesMap[proposalId];

        if (proposalVote.hasVoted[account]) {
            revert AlreadyCastVote(account);
        }
        proposalVote.hasVoted[account] = true;

        if (support == uint8(VoteType.Against)) {
            proposalVote.againstVotes += totalWeight;
        } else if (support == uint8(VoteType.For)) {
            proposalVote.forVotes += totalWeight;
        } else if (support == uint8(VoteType.Abstain)) {
            proposalVote.abstainVotes += totalWeight;
        } else {
            revert InvalidVoteType();
        }

        return totalWeight;
    }
}
