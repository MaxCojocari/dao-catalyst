// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {Fraction} from "../utils/Utils.sol";

interface IDaoMultisigVote {
    function initialize(
        address owner,
        string memory daoURI_,
        address[] memory members_,
        uint256 minimalDuration_,
        Fraction memory quorumFraction_,
        Fraction memory minimumParticipationFraction_
    ) external;
}
