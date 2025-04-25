// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ERC20, ERC20Votes} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {IVotes} from "@openzeppelin/contracts/governance/utils/IVotes.sol";

contract DaoToken is ERC20Votes, AccessControl {
    error InvalidOwner(address owner);

    error InvalidInitialRecipientData(address recipient, uint256 amount);

    constructor(
        string memory _name,
        string memory _symbol,
        address[] memory recipients,
        uint256[] memory amounts,
        address owner
    ) ERC20(_name, _symbol) EIP712(_name, "1") {
        if (owner == address(0)) revert InvalidOwner(address(0));
        _grantRole(DEFAULT_ADMIN_ROLE, owner);

        uint256 length = recipients.length;
        for (uint256 i = 0; i < length; ++i) {
            if (recipients[i] == address(0) || amounts[i] == 0)
                revert InvalidInitialRecipientData(recipients[i], amounts[i]);

            _mint(recipients[i], amounts[i]);
        }
    }

    function mint(address to, uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _mint(to, amount);
    }

    function burn(address account, uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _burn(account, amount);
    }

    function clock() public view override returns (uint48) {
        return uint48(block.timestamp);
    }

    function CLOCK_MODE() public pure override returns (string memory) {
        return "mode=blocktimestamp";
    }
}
