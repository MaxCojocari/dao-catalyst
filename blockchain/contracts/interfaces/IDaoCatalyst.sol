// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IDaoCatalystErrors {
    error AddressZero();
    error UnknownProposal(uint256 proposalId);
    error InvalidProposalId();
    error InvalidString(string str);
    error InvalidProposer(address proposer);
    error InvalidProposalVotingTimestamps(uint256 currentTime, uint256 voteStart, uint256 voteEnd);
    error VotingNotActive(uint256 proposalId);
    error ProposalNotSuccessful(uint256 proposalId);
    error TooLateToCancel(uint256 proposalId);
    error OnlyProposerCanCancel();
    error ProposalNotActive(uint256 proposalId);
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

    struct ProposalAction {
        address target;
        uint256 value;
        bytes calldatas;
    }

    struct Proposal {
        address proposer;
        ProposalAction[] actions;
        uint64 voteStart;
        uint64 voteEnd;
        bool executed;
        bool canceled;
    }

    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        ProposalAction[] actions,
        uint256 voteStart,
        uint256 voteEnd,
        string description
    );

    event ProposalExecuted(uint256 proposalId);

    event ProposalCanceled(uint256 proposalId);

    event VoteCast(address indexed voter, uint256 indexed proposalId, uint256 weight);

    event VoteCastWithParams(address indexed voter, uint256 indexed proposalId, uint256 weight, bytes params);

    event SetMetadataURI(string oldURI, string newURI);

    /// @dev Create a new proposal.
    function propose(
        ProposalAction[] calldata actions,
        string memory descriptionURI,
        uint64 voteStart,
        uint64 voteEnd
    ) external;

    /// @dev Execute a successful proposal. This requires the quorum to be reached,
    /// the vote to be successful, and the deadline to be reached.
    function execute(uint256 proposalId) external payable;

    /// @dev Cancel a proposal. A proposal is cancellable by the proposer, but only while it is Pending state, i.e.
    /// before the vote starts.
    function cancel(uint256 proposalId) external;

    /// @dev Casts a vote
    function castVote(uint256 proposalId, uint8 support) external;

    function state(uint256 proposalId) external view returns (ProposalState);

    /// @dev Returns the proposal details.
    function proposal(uint256 proposalId) external view returns (Proposal calldata);

    /// @dev Minimum number of cast voted required for a proposal to be successful.
    function quorum(uint256 timepoint) external view returns (uint256);

    /// @dev Voting power of an `account` at a specific `timepoint`.
    function getVotes(address account, uint256 timepoint) external view returns (uint256);

    /// @dev Returns whether `account` has cast a vote on `proposalId`.
    function hasVoted(uint256 proposalId, address account) external view returns (bool);
}
