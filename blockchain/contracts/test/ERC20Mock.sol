// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mock is ERC20 {
    constructor(string memory name, string memory symbol, uint256 supply) ERC20(name, symbol) {
        _mint(msg.sender, supply);
    }

    function decimals() public view virtual override returns (uint8) {
        return 6;
    }

    function mint(address _to, uint256 _amount) public {
        _mint(_to, _amount);
    }
}
