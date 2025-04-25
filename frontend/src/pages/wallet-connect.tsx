import { CircularProgress } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { injected, useConnect } from "wagmi";

export const WalletConnectPage = () => {
  const { connectAsync } = useConnect();
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const handleConnection = async () => {
    setDisabled(true);
    await connectAsync({ connector: injected() });
    setDisabled(false);

    navigate("/daos");
  };

  return (
    <Container>
      <Box>
        <Text>
          <p>Welcome to DAO Catalyst</p>
          <h1>Please connect your wallet to use DAO Catalyst</h1>
        </Text>
        <ConnectButton onClick={handleConnection} $disabled={disabled}>
          {disabled ? (
            <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
              <CircularProgress
                size={14}
                thickness={5}
                sx={{
                  color: "white",
                  marginTop: "5px",
                  marginRight: "2px",
                }}
              />
              <p>Connecting</p>
            </div>
          ) : (
            "Connect wallet"
          )}
        </ConnectButton>
      </Box>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 75px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 130px 215px;
  gap: 20px;
  background: #ffffff;
  border-radius: 8px;

  * {
    font-family: "Inter";
    font-style: normal;
  }
`;

export const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 8px;
  width: 320px;

  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: #8f8fb2;
    opacity: 0.9;
  }

  h1 {
    font-weight: 800;
    font-size: 32px;
    line-height: 120%;
    text-align: center;
    letter-spacing: -0.03em;
    color: #292933;
  }
`;

export const ConnectButton = styled.button<{ $disabled: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px;
  gap: 1px;
  height: 64px;
  width: 260px;

  box-shadow: 0px 16px 16px rgba(102, 102, 255, 0.13);
  border: none;
  border-radius: 6px;

  box-sizing: border-box;

  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.02em;
  color: #ffffff;

  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};

  background: ${({ $disabled }) => ($disabled ? "#b8b8cc" : "#6666ff")};
  opacity: ${({ $disabled }) => ($disabled ? 1 : 1)};
  transition: opacity 0.15s;

  &:hover {
    opacity: ${({ $disabled }) => ($disabled ? 1 : 0.8)};
  }

  &:active {
    opacity: ${({ $disabled }) => ($disabled ? 1 : 0.7)};
  }
`;
