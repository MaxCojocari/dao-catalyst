// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {IDaoCatalyst} from "./interfaces/IDaoCatalyst.sol";

abstract contract DaoCatalyst is IDaoCatalyst {
    string public metadataURI;
    mapping(uint256 => Proposal) public proposals;

    constructor(string memory metadataURI_) {
        metadataURI = metadataURI_;
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

    function _quorumReached(uint256 proposalId) internal view virtual returns (bool);

    function _voteSucceeded(uint256 proposalId) internal view virtual returns (bool);
}
