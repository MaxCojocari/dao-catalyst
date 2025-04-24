import styled from "styled-components";
import { injected, useConnect } from "wagmi";

export const WalletConnectPage = () => {
  const { connect } = useConnect();

  return (
    <Container>
      <Box>
        <Text>
          <p>Welcome to DAO Catalyst</p>
          <h1>Please connect your wallet to use DAO Catalyst</h1>
        </Text>
        <ConnectButton onClick={() => connect({ connector: injected() })}>
          Connect wallet
        </ConnectButton>
      </Box>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
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

export const ConnectButton = styled.button`
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

  cursor: pointer;

  background: #6666ff;
  opacity: 1;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.7;
  }
`;
