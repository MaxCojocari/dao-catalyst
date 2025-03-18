// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Dao} from "../Dao.sol";
import {IERC5805} from "@openzeppelin/contracts/interfaces/IERC5805.sol";
import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";

abstract contract TokenVoting is Dao {
    IERC5805 public token;

    function isValidProposer(address proposer) external view returns (bool) {
        return _isValidProposer(proposer);
    }

    function _getVotes(address account, uint256 timepoint, bytes memory) internal view override returns (uint256) {
        return token.getPastVotes(account, timepoint);
    }

    function _minimumParticipation(uint256 timepoint) internal view override returns (uint256) {
        return
            (token.getPastTotalSupply(timepoint) * minimumParticipationFraction.numerator) /
            minimumParticipationFraction.denominator;
    }

    function _isValidProposer(address proposer) internal view override returns (bool) {
        return IERC20(address(token)).balanceOf(proposer) > 0;
    }
}
