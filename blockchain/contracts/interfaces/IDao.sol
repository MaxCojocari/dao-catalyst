// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Fraction} from "../utils/Utils.sol";

interface IDaoErrors {
    error InvalidAddress(address addr);
    error InvalidUint256(uint256 value);
    error InvalidFraction();
    error UnknownProposal(uint256 proposalId);
    error InvalidProposalId();
    error InvalidString(string str);
    error InvalidProposer(address proposer);
    error NoActions();
    error TooManyActions(uint256 length);
    error InvalidVoteDuration(uint256 duration);
    error InvalidVoteStart(uint256 voteStart);
    error VotingNotActive(uint256 proposalId);
    error ProposalNotSuccessful(uint256 proposalId);
    error TooLateToCancel(uint256 proposalId);
    error OnlyProposerCanCancel();
    error ProposalNotActive(uint256 proposalId);
    error NativeTokenDepositAmountMismatch();
    error AlreadyCastVote(address account);
    error InvalidVoteParams();
    error InvalidVoteType();
    error AlreadyInitialized();
}

interface IDao is IDaoErrors {
    enum ProposalState {
        Pending,
        Active,
        Canceled,
        Defeated,
        Succeeded,
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
        uint64 snapshot;
        uint64 voteStart;
        uint64 voteEnd;
        bool executed;
        bool canceled;
    }

    event ProposalCreated(
        uint256 indexed proposalId,
        address indexed proposer,
        ProposalAction[] actions,
        uint64 voteStart,
        uint64 voteEnd,
        string descriptionURI
    );

    event ProposalExecuted(uint256 proposalId);

    event ProposalCanceled(uint256 proposalId);

    event VoteCast(address indexed voter, uint256 indexed proposalId, uint256 weight);

    event VoteCastWithParams(address indexed voter, uint256 indexed proposalId, uint256 weight, bytes params);

    event SetDaoURI(string oldURI, string newURI);

    event SetMinimalDuration(uint256 oldDuration, uint256 newDuration);

    event SetQuorumFraction(Fraction oldFraction, Fraction newFraction);

    event SetMinimumParticipationFraction(Fraction oldFraction, Fraction newFraction);

    event Deposited(address sender, address token, uint256 amount);

    event DaoTransfer(address token, address recipient, uint256 amount);

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

    /// @dev Casts a vote.
    function castVote(uint256 proposalId, uint8 support) external;

    /// @dev Returns the current proposal state.
    function state(uint256 proposalId) external view returns (ProposalState);

    /// @dev Minimum number of cast voted required for a proposal to be successful.
    function quorum() external view returns (uint256);

    /// @dev Minimum number of cast voted required for a proposal to pass.
    function minimumParticipation(uint256 proposalId) external view returns (uint256);

    /// @dev Voting power of an `account` at a specific `timepoint`.
    function getVotes(address account, uint256 timepoint) external view returns (uint256);

    /// @dev Returns whether `account` has cast a vote on `proposalId`.
    function hasVoted(uint256 proposalId, address account) external view returns (bool);
}
