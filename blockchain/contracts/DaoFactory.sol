// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Fraction} from "./utils/Utils.sol";
import {Dao} from "./Dao.sol";
import {DaoSimpleVote} from "./dao/DaoSimpleVote.sol";
import {DaoFractionalVote} from "./dao/DaoFractionalVote.sol";
import {DaoMultisigVote} from "./dao/DaoMultisigVote.sol";
import {DaoToken} from "./DaoToken.sol";
import {IDaoFractionalVote} from "./interfaces/IDaoFractionalVote.sol";
import {IDaoSimpleVote} from "./interfaces/IDaoSimpleVote.sol";
import {IDaoMultisigVote} from "./interfaces/IDaoMultisigVote.sol";

import {IERC5805} from "@openzeppelin/contracts/interfaces/IERC5805.sol";
import {Context} from "@openzeppelin/contracts/utils/Context.sol";
import {Clones} from "@openzeppelin/contracts/proxy/Clones.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract DaoFactory is Context, Ownable {
    enum DaoType {
        SimpleVote,
        FractionalVote,
        MultisigVote
    }

    struct DaoTokenSettings {
        bool isDeployed;
        address tokenAddress;
        string name;
        string symbol;
        address[] recipients;
        uint256[] amounts;
    }

    struct DaoSettings {
        DaoType daoType;
        string daoURI;
        address[] members;
        uint256 minimalDuration;
        uint256 proposalCreationMinVotingPower;
        DaoTokenSettings daoToken;
        Fraction quorumFraction;
        Fraction minimumParticipationFraction;
        bytes32 salt;
    }

    address public daoSimpleVoteImplementation;
    address public daoFractionalVoteImplementation;
    address public daoMultisigVoteImplementation;

    event DaoCreated(
        address indexed daoAddress,
        DaoType indexed daoType,
        address indexed owner,
        string daoURI,
        address daoToken,
        uint256 minimalDuration,
        Fraction quorumFraction,
        Fraction minimumParticipationFraction
    );

    error InvalidString(string str);

    error InvalidUint256(uint256 value);

    error InvalidFraction();

    error InvalidAddress(address addr);

    constructor(
        address daoSimpleVoteImplementation_,
        address daoFractionalVoteImplementation_,
        address daoMultisigVoteImplementation_
    ) Ownable(_msgSender()) {
        _setImplementations(
            daoSimpleVoteImplementation_,
            daoFractionalVoteImplementation_,
            daoMultisigVoteImplementation_
        );
    }

    function createDao(DaoSettings calldata param) external {
        _validateParams(param);

        address dao;
        IERC5805 daoToken;

        if (param.daoType == DaoType.SimpleVote || param.daoType == DaoType.FractionalVote) {
            DaoTokenSettings calldata tokenSettings = param.daoToken;
            if (!tokenSettings.isDeployed) {
                daoToken = new DaoToken(
                    tokenSettings.name,
                    tokenSettings.symbol,
                    tokenSettings.recipients,
                    tokenSettings.amounts,
                    _msgSender()
                );
            } else {
                daoToken = IERC5805(tokenSettings.tokenAddress);
            }
        }

        if (param.daoType == DaoType.SimpleVote) {
            dao = Clones.cloneDeterministic(daoSimpleVoteImplementation, param.salt);
            IDaoSimpleVote(dao).initialize(
                _msgSender(),
                param.daoURI,
                param.minimalDuration,
                param.proposalCreationMinVotingPower,
                param.quorumFraction,
                param.minimumParticipationFraction,
                daoToken
            );
        } else if (param.daoType == DaoType.FractionalVote) {
            dao = Clones.cloneDeterministic(daoFractionalVoteImplementation, param.salt);
            IDaoFractionalVote(dao).initialize(
                _msgSender(),
                param.daoURI,
                param.minimalDuration,
                param.proposalCreationMinVotingPower,
                param.quorumFraction,
                param.minimumParticipationFraction,
                daoToken
            );
        } else if (param.daoType == DaoType.MultisigVote) {
            dao = Clones.cloneDeterministic(daoMultisigVoteImplementation, param.salt);
            IDaoMultisigVote(dao).initialize(
                _msgSender(),
                param.daoURI,
                param.members,
                param.minimalDuration,
                param.quorumFraction,
                param.minimumParticipationFraction
            );
        }

        emit DaoCreated(
            dao,
            param.daoType,
            _msgSender(),
            param.daoURI,
            address(daoToken),
            param.minimalDuration,
            param.quorumFraction,
            param.minimumParticipationFraction
        );
    }

    function setImplementations(
        address daoSimpleVoteImplementation_,
        address daoFractionalVoteImplementation_,
        address daoMultisigVoteImplementation_
    ) external onlyOwner {
        _setImplementations(
            daoSimpleVoteImplementation_,
            daoFractionalVoteImplementation_,
            daoMultisigVoteImplementation_
        );
    }

    function _setImplementations(
        address daoSimpleVoteImplementation_,
        address daoFractionalVoteImplementation_,
        address daoMultisigVoteImplementation_
    ) internal {
        daoSimpleVoteImplementation = daoSimpleVoteImplementation_;
        daoFractionalVoteImplementation = daoFractionalVoteImplementation_;
        daoMultisigVoteImplementation = daoMultisigVoteImplementation_;
    }

    function _validateParams(DaoSettings calldata param) internal pure {
        if (bytes(param.daoURI).length == 0) revert InvalidString("");
        if (param.minimalDuration == 0) revert InvalidUint256(0);

        _validateFraction(param.quorumFraction);
        _validateFraction(param.minimumParticipationFraction);
    }

    function _validateFraction(Fraction memory fraction) internal pure {
        if (fraction.numerator == 0 || fraction.denominator == 0) revert InvalidUint256(0);
        if (fraction.numerator > fraction.denominator) revert InvalidFraction();
    }
}
