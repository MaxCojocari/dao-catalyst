// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {IDaoCatalyst} from "./interfaces/IDaoCatalyst.sol";

abstract contract DaoCatalyst is IDaoCatalyst {
    uint256 public proposalCounter;
    uint256 public proposalThreshold;
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
        if (bytes(descriptionURI).length == 0) revert InvalidProposalLength(0);

        bool validVotingStartAndEnd = block.timestamp <= voteStart && voteStart < voteEnd;
        if (!validVotingStartAndEnd) revert InvalidProposalVotingTimestamps(block.timestamp, voteStart, voteEnd);

        address proposer = msg.sender;
        if (!_isValidProposer(proposer)) revert InvalidProposer(proposer);

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

    function getVotes(address account, uint256 timepoint) public view virtual override returns (uint256) {
        return _getVotes(account, timepoint);
    }

    function state(uint256 proposalId) external view returns (ProposalState) {
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

    function _isValidProposer(address proposer) internal view virtual returns (bool);

    function _getVotes(address account, uint256 timepoint) internal view virtual returns (uint256);

    function _quorumReached(uint256 proposalId) internal view virtual returns (bool);

    function _voteSucceeded(uint256 proposalId) internal view virtual returns (bool);
}
