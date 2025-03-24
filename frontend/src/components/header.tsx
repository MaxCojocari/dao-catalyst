import styled from "styled-components";
import logo from "../assets/images/app-logo.svg";
import { CustomWalletButton } from "./custom-wallet-button";
import { CreateDaoButton } from "./create-dao-button";
import { DaoLogo } from "./dao-logo";
import { useAccount } from "wagmi";

interface HeaderProps {
  isDaoMainPage: boolean;
  imageUri: string;
  daoName: string;
}

export const Header = ({ props }: { props: HeaderProps }) => {
  const { isDaoMainPage, imageUri, daoName } = props;
  const { isConnected } = useAccount();

  return (
    <Container>
      {isDaoMainPage ? (
        <LeftSection>
          <DaoLogo imageUri={imageUri} name={daoName} />
          <p>Dashboard</p>
          <p>Governance</p>
          <p>Finance</p>
          <p>Members</p>
          <p>Settings</p>
        </LeftSection>
      ) : (
        <LeftSection>
          <img src={logo} alt="dao-catalyst-logo" width="150px" />
        </LeftSection>
      )}
      <RightSection>
        {isConnected && <CreateDaoButton />}
        <CustomWalletButton />
      </RightSection>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 100;

  height: 80px;
  padding: 0 150px;
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(230, 230, 255, 0.6);
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 32px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.03em;

  color: rgba(41, 41, 51, 0.9);
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
  height: 40px;
`;
