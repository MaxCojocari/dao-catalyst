// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Dao} from "./Dao.sol";
import {VoteType} from "./DaoCountingSimple.sol";

abstract contract DaoCountingFractional is Dao {
    uint8 internal constant VOTE_TYPE_FRACTIONAL = 255;

    struct ProposalVote {
        uint256 againstVotes;
        uint256 forVotes;
        uint256 abstainVotes;
        mapping(address voter => uint256) usedVotes;
    }

    mapping(uint256 proposalId => ProposalVote) private proposalVotesMap;

    error ExceedRemainingWeight(address voter, uint256 usedVotes, uint256 remainingWeight);

    function hasVoted(uint256 proposalId, address account) public view virtual override returns (bool) {
        return usedVotes(proposalId, account) > 0;
    }

    function usedVotes(uint256 proposalId, address account) public view virtual returns (uint256) {
        return proposalVotesMap[proposalId].usedVotes[account];
    }

    function proposalVotes(
        uint256 proposalId
    ) public view virtual returns (uint256 againstVotes, uint256 forVotes, uint256 abstainVotes) {
        ProposalVote storage proposalVote = proposalVotesMap[proposalId];
        return (proposalVote.againstVotes, proposalVote.forVotes, proposalVote.abstainVotes);
    }

    function _quorumReached(uint256 proposalId) internal view virtual override returns (bool) {
        ProposalVote storage proposalVote = proposalVotesMap[proposalId];
        return _quorum(_proposalSnapshot(proposalId)) <= proposalVote.forVotes + proposalVote.abstainVotes;
    }

    function _voteSucceeded(uint256 proposalId) internal view virtual override returns (bool) {
        ProposalVote storage proposalVote = proposalVotesMap[proposalId];
        return proposalVote.forVotes > proposalVote.againstVotes;
    }

    function _countVote(
        uint256 proposalId,
        address account,
        uint8 support,
        uint256 totalWeight,
        bytes memory params
    ) internal virtual override returns (uint256) {
        uint256 remainingWeight = totalWeight - usedVotes(proposalId, account);
        if (remainingWeight == 0) {
            revert AlreadyCastVote(account);
        }

        uint256 againstVotes = 0;
        uint256 forVotes = 0;
        uint256 abstainVotes = 0;
        uint256 usedWeight = 0;

        // The "support" field must explicitly indicate if fractional voting is used.
        // Accepted `support` values are:
        // - "Full" voting: Use `support = 0` (Against), `1` (For), or `2` (Abstain), with no additional param.
        // - "Fractional" voting: Use `support = 255`, accompanied by 48 bytes of param.
        if (support == uint8(VoteType.Against)) {
            if (params.length != 0) revert InvalidVoteParams();
            usedWeight = againstVotes = remainingWeight;
        } else if (support == uint8(VoteType.For)) {
            if (params.length != 0) revert InvalidVoteParams();
            usedWeight = forVotes = remainingWeight;
        } else if (support == uint8(VoteType.Abstain)) {
            if (params.length != 0) revert InvalidVoteParams();
            usedWeight = abstainVotes = remainingWeight;
        } else if (support == VOTE_TYPE_FRACTIONAL) {
            // The `params` argument is expected to be three packed `uint128`:
            // `abi.encodePacked(uint128(againstVotes), uint128(forVotes), uint128(abstainVotes))`
            if (params.length != 0x30) revert InvalidVoteParams();

            (againstVotes, forVotes, abstainVotes) = abi.decode(params, (uint128, uint128, uint128));

            usedWeight = againstVotes + forVotes + abstainVotes;

            if (usedWeight > remainingWeight) {
                revert ExceedRemainingWeight(account, usedWeight, remainingWeight);
            }
        } else {
            revert InvalidVoteType();
        }

        ProposalVote storage details = proposalVotesMap[proposalId];
        if (againstVotes > 0) details.againstVotes += againstVotes;
        if (forVotes > 0) details.forVotes += forVotes;
        if (abstainVotes > 0) details.abstainVotes += abstainVotes;
        details.usedVotes[account] += usedWeight;

        return usedWeight;
    }
}
