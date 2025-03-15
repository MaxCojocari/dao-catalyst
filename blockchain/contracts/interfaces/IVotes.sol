// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

interface IVotes {
    /// @dev Returns the current amount of votes that `account` has.
    function getVotes(address account) external view returns (uint256);

    /// @dev Returns the amount of votes that `account` had at a specific moment in the past.
    function getPastVotes(address account, uint256 timepoint) external view returns (uint256);

    /// @dev Returns the delegate that `account` has chosen.
    function delegates(address account) external view returns (address);

    /// @dev Delegates votes from the sender to `delegatee`.
    function delegate(address delegatee) external;
}
