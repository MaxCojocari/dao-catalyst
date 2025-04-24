import { ConnectButton } from "@rainbow-me/rainbowkit";
import styled from "styled-components";
import copyIcon from "../assets/images/copy-icon.svg";
import disconnectIcon from "../assets/images/disconnect-icon.svg";

export const CustomWalletButton = () => {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, mounted }) => {
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
            {connected && (
              <ConnectedWalletButton onClick={openAccountModal}>
                {account.displayName}
                <img src={copyIcon} alt="copy-icon" width="20px" />
                <img src={disconnectIcon} alt="disconnect-icon" width="16px" />
              </ConnectedWalletButton>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

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
