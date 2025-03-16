// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Dao} from "../Dao.sol";
import {MultisigCountingStrategy} from "../extensions/MultisigCountingStrategy.sol";
import {MultisigVoting} from "../extensions/MultisigVoting.sol";
import {IERC5805} from "@openzeppelin/contracts/interfaces/IERC5805.sol";
import {Fraction} from "../utils/Utils.sol";

contract DaoMultisigVote is Dao, MultisigCountingStrategy, MultisigVoting {
    constructor(
        address owner,
        string memory daoURI_,
        address[] memory members_,
        uint256 minimalDuration_,
        Fraction memory quorumFraction_,
        Fraction memory minimumParticipationFraction_,
        IERC5805 token
    ) Dao(owner, daoURI_, minimalDuration_, quorumFraction_, minimumParticipationFraction_) MultisigVoting(members_) {}

    function _getVotes(address account, uint256, bytes memory param) internal view override returns (uint256) {
        uint256 proposalId = abi.decode(param, (uint256));
        return proposalVotesMap[proposalId].hasVoted[account] ? 1 : 0;
    }
}
