// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Dao} from "../Dao.sol";
import {IERC5805} from "@openzeppelin/contracts/interfaces/IERC5805.sol";

abstract contract MultisigVoting is Dao {
    /// @dev keccak256("MEMBER_ROLE")
    bytes32 public constant MEMBER_ROLE = 0x829b824e2329e205435d941c9f13baf578548505283d29261236d8e6596d4636;

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
