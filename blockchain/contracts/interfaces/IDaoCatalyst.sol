// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IDaoCatalystErrors {
    error UnknownProposal(uint256 proposalId);
    error InvalidProposalLength(uint256 length);
    error InvalidProposer(address proposer);
    error ProposalAlreadyExists(uint256 proposalId);
    error InvalidProposalVotingTimestamps(uint256 currentTime, uint256 voteStart, uint256 voteEnd);
    error VotingNotActive(uint256 proposalId);
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
        uint256 indexed proposalId,
        address indexed proposer,
        ProposalAction[] actions,
        uint256 voteStart,
        uint256 voteEnd,
        string description
    );

    event ProposalCanceled(uint256 proposalId);

    event ProposalExecuted(uint256 proposalId);

    event VoteCast(address indexed voter, uint256 indexed proposalId, uint256 weight);

    event VoteCastWithParams(address indexed voter, uint256 indexed proposalId, uint256 weight, bytes params);

    function propose(ProposalAction[] calldata actions, string calldata description) external;

    function execute(uint256 proposalId) external payable;

    function cancel(uint256 proposalId) external;

    function state(uint256 proposalId) external view returns (ProposalState);

    function castVote(uint256 proposalId, uint8 support) external;

    function proposal(uint256 proposalId) external view returns (Proposal calldata);

    function quorum(uint256 timepoint) external view returns (uint256);

    function getVotes(address account, uint256 timepoint) external view returns (uint256);

    function hasVoted(uint256 proposalId, address account) external view returns (bool);
}
