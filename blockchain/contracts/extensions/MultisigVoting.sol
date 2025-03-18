// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Dao} from "../Dao.sol";
import {IERC5805} from "@openzeppelin/contracts/interfaces/IERC5805.sol";
import {MEMBER_ROLE} from "./MultisigCountingStrategy.sol";

abstract contract MultisigVoting is Dao {
    function isValidProposer(address proposer) external view returns (bool) {
        return _isValidProposer(proposer);
    }

    function _minimumParticipation(uint256) internal view override returns (uint256) {
        return minimumParticipationFraction.numerator;
    }

    function _isValidProposer(address proposer) internal view override returns (bool) {
        return hasRole(MEMBER_ROLE, proposer);
    }
}
