// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {IDaoCatalyst} from "./interfaces/IDaoCatalyst.sol";

abstract contract DaoCatalyst is IDaoCatalyst {
    uint256 public proposalCounter;
    string public metadataURI;
    mapping(uint256 => Proposal) public proposals;

    constructor(string memory metadataURI_) {
        metadataURI = metadataURI_;
    }

    function propose(
        ProposalAction[] calldata actions,
        string memory descriptionURI,
        uint64 voteStart,
        uint64 voteEnd
    ) external {
        address proposer = msg.sender;
        if (!_isValidProposer(proposer)) revert InvalidProposer(proposer);

        if (bytes(descriptionURI).length == 0) revert InvalidProposalLength(0);

        bool validVotingStartAndEnd = block.timestamp <= voteStart && voteStart < voteEnd;
        if (!validVotingStartAndEnd) revert InvalidProposalVotingTimestamps(block.timestamp, voteStart, voteEnd);

        proposals[proposalCounter] = Proposal({
            proposer: proposer,
            voteStart: voteStart,
            voteEnd: voteEnd,
            executed: false,
            canceled: false
        });

        unchecked {
            emit ProposalCreated(proposalCounter++, proposer, actions, voteStart, voteEnd, descriptionURI);
        }
    }

    function castVote(uint256 proposalId) external {
        _castVote(proposalId, msg.sender, "");
    }

    function castVoteWithParams(uint256 proposalId, bytes memory params) external {
        _castVote(proposalId, msg.sender, params);
    }

    function _castVote(uint256 proposalId, address voter, bytes memory params) internal virtual {
        if (_state(proposalId) != ProposalState.Active) revert VotingNotActive(proposalId);

        uint256 weight = _getVotes(voter, proposals[proposalId].voteStart, params);
        _countVote(proposalId, voter, weight, params);

        if (params.length == 0) {
            emit VoteCast(voter, proposalId, weight);
        } else {
            emit VoteCastWithParams(voter, proposalId, weight, params);
        }
    }

    function state(uint256 proposalId) external view returns (ProposalState) {
        return _state(proposalId);
    }

    function _isValidProposer(address proposer) internal view virtual returns (bool);

    function _countVote(
        uint256 proposalId,
        address account,
        uint8 support,
        uint256 weight,
        bytes memory params
    ) internal virtual;

    function _getVotes(address account, uint256 timepoint, bytes memory params) internal view virtual returns (uint256);

    function _countVote(uint256 proposalId, address account, uint256 weight, bytes memory params) internal virtual;

    function _state(uint256 proposalId) internal view returns (ProposalState) {
        Proposal storage proposal = proposals[proposalId];

        if (proposal.executed) {
            return ProposalState.Executed;
        }

        if (proposal.canceled) {
            return ProposalState.Canceled;
        }

        uint256 voteStart = proposals[proposalId].voteStart;

        if (voteStart == 0) {
            revert UnknownProposal(proposalId);
        }

        if (voteStart >= block.timestamp) {
            return ProposalState.Pending;
        }

        if (proposals[proposalId].voteEnd >= block.timestamp) {
            return ProposalState.Active;
        }

        if (_quorumReached(proposalId) && _voteSucceeded(proposalId)) {
            return ProposalState.Succeeded;
        } else {
            return ProposalState.Defeated;
        }
    }

    function _quorumReached(uint256 proposalId) internal view virtual returns (bool);

    function _voteSucceeded(uint256 proposalId) internal view virtual returns (bool);
}
