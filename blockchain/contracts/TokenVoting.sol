// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Dao} from "./Dao.sol";
import {IERC5805} from "@openzeppelin/contracts/interfaces/IERC5805.sol";
import {IVotes} from "./interfaces/IVotes.sol";

abstract contract TokenVoting is Dao {
    IERC5805 public immutable token;

    constructor(IERC5805 token_) {
        token = token_;
    }

    function _getVotes(address account, uint256 timepoint, bytes memory) internal view override returns (uint256) {
        return token.getPastVotes(account, timepoint);
    }
}
