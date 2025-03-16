// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ERC20, ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract DaoToken is ERC20Votes, AccessControl {
    struct InitialRecipients {
        address recipient;
        uint256 amount;
    }

    error InvalidInitialRecipientData(address recipient, uint256 amount);

    constructor(
        string memory _name,
        string memory _symbol,
        InitialRecipients[] memory initialRecipients
    ) ERC20(_name, _symbol) EIP712(_name, "1") {
        uint256 length = initialRecipients.length;
        for (uint256 i = 0; i < length; ++i) {
            address recipient = initialRecipients[i].recipient;
            uint256 amount = initialRecipients[i].amount;
            if (recipient == address(0) || amount == 0) revert InvalidInitialRecipientData(recipient, amount);
            _mint(initialRecipients[i].recipient, initialRecipients[i].amount);
        }
    }

    function mint(address to, uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _mint(to, amount);
    }

    function burn(address account, uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _burn(account, amount);
    }
}
