// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {IDao} from "./interfaces/IDao.sol";
import {Fraction} from "./utils/Utils.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Multicall} from "@openzeppelin/contracts/utils/Multicall.sol";

abstract contract Dao is IDao, AccessControl, Multicall {
    using SafeERC20 for IERC20;

    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCounter;
    uint256 public minimalDuration;
    string public daoURI;

    Fraction public quorumFraction;
    Fraction public minimumParticipationFraction;

    uint256 public constant MAX_ACTIONS = 32;

    modifier validProposalId(uint256 proposalId) {
        if (proposalId >= proposalCounter) revert InvalidProposalId();
        _;
    }

    modifier validURI(string memory str) {
        if (bytes(str).length == 0) revert InvalidString("");
        _;
    }

    modifier validUint256(uint256 value) {
        if (value == 0) revert InvalidUint256(0);
        _;
    }

    modifier validFraction(Fraction calldata fraction) {
        if (fraction.numerator == 0 || fraction.denominator == 0) revert InvalidUint256(0);
        if (fraction.numerator > fraction.denominator) revert InvalidFraction();
        _;
    }

    constructor(
        address owner,
        string memory daoURI_,
        uint256 minimalDuration_,
        Fraction memory quorumFraction_,
        Fraction memory minimumParticipationFraction_
    ) {
        daoURI = daoURI_;
        minimalDuration = minimalDuration_;
        quorumFraction = quorumFraction_;
        minimumParticipationFraction = minimumParticipationFraction_;

        _grantRole(DEFAULT_ADMIN_ROLE, owner);
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function setDaoURI(string calldata daoURI_) external onlyRole(DEFAULT_ADMIN_ROLE) validURI(daoURI_) {
        emit SetDaoURI(daoURI, daoURI_);
        daoURI = daoURI_;
    }

    function setMinimalDuration(
        uint256 minimalDuration_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) validUint256(minimalDuration_) {
        emit SetMinimalDuration(minimalDuration, minimalDuration_);
        minimalDuration = minimalDuration_;
    }

    function setQuorumFraction(
        Fraction calldata quorumFraction_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) validFraction(quorumFraction_) {
        emit SetQuorumFraction(quorumFraction, quorumFraction_);
        quorumFraction = quorumFraction_;
    }

    function setMinimumParticipationFraction(
        Fraction calldata minimumParticipationFraction_
    ) external onlyRole(DEFAULT_ADMIN_ROLE) validFraction(minimumParticipationFraction_) {
        emit SetMinimumParticipationFraction(minimumParticipationFraction, minimumParticipationFraction_);
        minimumParticipationFraction = minimumParticipationFraction_;
    }

    function propose(
        ProposalAction[] calldata actions,
        string calldata descriptionURI,
        uint64 voteStart,
        uint64 voteDuration
    ) external validURI(descriptionURI) {
        address proposer = _msgSender();
        if (!_isValidProposer(proposer, block.timestamp)) revert InvalidProposer(proposer);

        if (actions.length == 0) revert NoActions();
        if (actions.length > MAX_ACTIONS) revert TooManyActions(actions.length);

        if (voteDuration < minimalDuration) revert InvalidVoteDuration(voteDuration);
        if (block.timestamp > voteStart) revert InvalidVoteStart(voteStart);

        uint64 voteEnd = voteStart + voteDuration;
        Proposal storage proposal = proposals[proposalCounter];

        proposal.proposer = _msgSender();
        proposal.snapshot = uint64(block.timestamp);
        proposal.voteStart = voteStart;
        proposal.voteEnd = voteEnd;

        uint256 length = actions.length;
        for (uint256 i = 0; i < length; ++i) {
            proposal.actions.push(actions[i]);
        }

        unchecked {
            emit ProposalCreated(proposalCounter++, proposer, actions, voteStart, voteEnd, descriptionURI);
        }
    }

    function castVote(uint256 proposalId, uint8 support) external validProposalId(proposalId) {
        address voter = _msgSender();
        uint256 weight = _getVotes(voter, proposals[proposalId].snapshot, "");
        _castVote(proposalId, voter, support, weight, "");
    }

    function castVoteEqualWeight(uint256 proposalId) external validProposalId(proposalId) {
        _castVote(proposalId, _msgSender(), 0, 1, "");
    }

    function castVoteWithParams(
        uint256 proposalId,
        uint8 support,
        bytes memory params
    ) external validProposalId(proposalId) {
        address voter = _msgSender();
        uint256 weight = _getVotes(voter, proposals[proposalId].snapshot, "");
        _castVote(proposalId, _msgSender(), support, weight, params);
    }

    function execute(uint256 proposalId) external payable validProposalId(proposalId) {
        ProposalState currentState = _state(proposalId);

        if (currentState != ProposalState.Succeeded) revert ProposalNotSuccessful(proposalId);

        proposals[proposalId].executed = true;

        ProposalAction[] storage actions = proposals[proposalId].actions;

        uint256 length = actions.length;
        for (uint256 i = 0; i < length; ++i) {
            (bool success, bytes memory returndata) = actions[i].target.call{value: actions[i].value}(
                actions[i].calldatas
            );
            Address.verifyCallResult(success, returndata);
        }

        emit ProposalExecuted(proposalId);
    }

    function cancel(uint256 proposalId) external validProposalId(proposalId) {
        ProposalState currentState = _state(proposalId);

        if (currentState != ProposalState.Pending) revert TooLateToCancel(proposalId);
        if (_msgSender() != proposals[proposalId].proposer) revert OnlyProposerCanCancel();
        if (
            currentState == ProposalState.Canceled ||
            currentState == ProposalState.Expired ||
            currentState == ProposalState.Executed
        ) revert ProposalNotActive(proposalId);

        proposals[proposalId].canceled = true;

        emit ProposalCanceled(proposalId);
    }

    function deposit(address token, uint256 amount) external payable {
        if (amount == 0) revert InvalidUint256(0);

        if (token == address(0)) {
            if (msg.value != amount) revert NativeTokenDepositAmountMismatch();
        } else {
            if (msg.value != 0) revert NativeTokenDepositAmountMismatch();
            IERC20(token).safeTransferFrom(_msgSender(), address(this), amount);
        }

        emit Deposited(msg.sender, token, amount);
    }

    function getVotes(address account, uint256 timepoint) external view returns (uint256) {
        return _getVotes(account, timepoint, "");
    }

    function state(uint256 proposalId) external view returns (ProposalState) {
        return _state(proposalId);
    }

    function proposalSnapshot(uint256 proposalId) external view returns (uint256) {
        return _proposalSnapshot(proposalId);
    }

    function quorum() external view returns (uint256) {
        return (quorumFraction.numerator * 100) / quorumFraction.denominator;
    }

    function minimumParticipation(uint256 proposalId) external view returns (uint256) {
        return _minimumParticipation(_proposalSnapshot(proposalId));
    }

    function _castVote(uint256 proposalId, address voter, uint8 support, uint256 weight, bytes memory params) internal {
        if (_state(proposalId) != ProposalState.Active) revert VotingNotActive(proposalId);

        _countVote(proposalId, voter, support, weight, params);

        if (params.length == 0) {
            emit VoteCast(voter, proposalId, weight);
        } else {
            emit VoteCastWithParams(voter, proposalId, weight, params);
        }
    }

    function _state(uint256 proposalId) internal view returns (ProposalState) {
        Proposal storage proposal = proposals[proposalId];

        if (proposal.executed) {
            return ProposalState.Executed;
        }

        if (proposal.canceled) {
            return ProposalState.Canceled;
        }

        uint256 voteStart = proposal.voteStart;

        if (voteStart == 0) {
            revert UnknownProposal(proposalId);
        }

        if (voteStart >= block.timestamp) {
            return ProposalState.Pending;
        }

        if (proposal.voteEnd >= block.timestamp) {
            return ProposalState.Active;
        }

        if (_quorumReached(proposalId) && _voteSucceeded(proposalId)) {
            return ProposalState.Succeeded;
        } else {
            return ProposalState.Defeated;
        }
    }

    function _proposalSnapshot(uint256 proposalId) internal view returns (uint256) {
        return proposals[proposalId].snapshot;
    }

    function _minimumParticipation(uint256 timepoint) internal view virtual returns (uint256);

    function _isValidProposer(address proposer, uint256 timepoint) internal view virtual returns (bool);

    function _quorumReached(uint256 proposalId) internal view virtual returns (bool);

    function _voteSucceeded(uint256 proposalId) internal view virtual returns (bool);

    function _countVote(
        uint256 proposalId,
        address account,
        uint8 support,
        uint256 totalWeight,
        bytes memory params
    ) internal virtual returns (uint256);

    function _getVotes(address account, uint256 timepoint, bytes memory params) internal view virtual returns (uint256);
}
