// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IDaoCatalystErrors {
    error UnknownProposal(uint256 proposalId);
    error InvalidProposalLength(uint256 length);
    error InvalidProposer(address proposer);
    error ProposalAlreadyExists(uint256 proposalId);
    error InvalidProposalVotingTimestamps(uint256 currentTime, uint256 voteStart, uint256 voteEnd);
}

interface IDaoCatalyst is IDaoCatalystErrors {
    enum ProposalState {
        Pending,
        Active,
        Canceled,
        Defeated,
        Succeeded,
        Queued,
        Expired,
        Executed
    }

    struct Proposal {
        address proposer;
        uint64 voteStart;
        uint64 voteEnd;
        bool executed;
        bool canceled;
    }

    struct ProposalAction {
        address targets;
        uint256 values;
        bytes calldatas;
    }

    event ProposalCreated(
        uint256 proposalId,
        address proposer,
        ProposalAction[] actions,
        uint256 voteStart,
        uint256 voteEnd,
        string description
    );

    event ProposalCanceled(uint256 proposalId);

    event ProposalExecuted(uint256 proposalId);

    event VoteCast(address indexed voter, uint256 proposalId, uint8 support, uint256 weight);

    function propose(ProposalAction[] calldata actions, string calldata description) external;

    function execute(uint256 proposalId) external payable;

    function cancel(uint256 proposalId) external;

    function state(uint256 proposalId) external view returns (ProposalState);

    function castVote(uint256 proposalId, uint8 support) external;

    function proposalProposer(uint256 proposalId) external view returns (address);

    function votingDelay() external view returns (uint256);

    function votingPeriod() external view returns (uint256);

    function quorum(uint256 timepoint) external view returns (uint256);

    function getVotes(address account, uint256 timepoint) external view returns (uint256);

    function hasVoted(uint256 proposalId, address account) external view returns (bool);
}
