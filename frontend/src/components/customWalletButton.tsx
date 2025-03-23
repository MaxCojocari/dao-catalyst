import { ConnectButton } from "@rainbow-me/rainbowkit";
import styled from "styled-components";
import copyIcon from "../assets/images/copy-icon.svg";
import disconnectIcon from "../assets/images/disconnect-icon.svg";

export const CustomWalletButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, openAccountModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {connected ? (
              <ConnectedWalletButton onClick={openAccountModal}>
                {account.displayName}
                <img src={copyIcon} alt="copy-icon" width="20px" />
                <img src={disconnectIcon} alt="disconnect-icon" width="16px" />
              </ConnectedWalletButton>
            ) : (
              <ConnectWalletButton onClick={openConnectModal}>
                Connect Wallet
              </ConnectWalletButton>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

const ConnectWalletButton = styled.button`
  height: 40px;
  background-color: #6666ff;
  color: white;
  cursor: pointer;
  border: none;
  font-family: Inter, Arial;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.02em;
  padding: 11.5px 16px;
  border-radius: 6px;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.7;
  }
`;

const ConnectedWalletButton = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  gap: 8px;
  height: 40px;
  cursor: pointer;
  background-color: white;
  border-style: solid;
  border-color: #e6e6ff;
  border-radius: 6px;
  border-width: 1px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.03em;
  color: rgba(41, 41, 51, 0.9);
`;
