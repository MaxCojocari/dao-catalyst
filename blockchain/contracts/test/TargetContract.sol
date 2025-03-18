// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

contract TargetContract {
    uint256 public value;

    event ValueChanged(uint256 newValue);

    function getValue() external view returns (uint256) {
        return value;
    }

    function setValue(uint256 _value) external {
        require(_value > 0, "Non-zero value");
        value = _value;
        emit ValueChanged(_value);
    }
}
