// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Dao} from "../Dao.sol";
import {IERC5805} from "@openzeppelin/contracts/interfaces/IERC5805.sol";

abstract contract TokenVoting is Dao {
    IERC5805 public immutable token;

    constructor(IERC5805 token_) {
        token = token_;
    }

    function isValidProposer(address proposer) external view returns (bool) {
        return _isValidProposer(proposer, block.timestamp);
    }

    function _getVotes(address account, uint256 timepoint, bytes memory) internal view override returns (uint256) {
        return token.getPastVotes(account, timepoint);
    }

    function _minimumParticipation(uint256 timepoint) internal view override returns (uint256) {
        return
            (token.getPastTotalSupply(timepoint) * minimumParticipationFraction.numerator) /
            minimumParticipationFraction.denominator;
    }

    function _isValidProposer(address proposer, uint256 timepoint) internal view override returns (bool) {
        return token.getPastVotes(proposer, timepoint) > 0;
    }
}
