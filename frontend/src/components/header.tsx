import styled from "styled-components";
import logo from "../assets/images/app-logo.svg";
import { CustomWalletButton } from "./custom-wallet-button";
import { DaoLogo } from "./dao-logo";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { CreateDaoButton, DelegateButton } from ".";

interface HeaderProps {
  imageUri: string;
  daoName: string;
}

export const Header = ({ props }: { props: HeaderProps }) => {
  const { imageUri, daoName } = props;
  const { daoAddress } = useParams();
  const { pathname } = useLocation();

  const links = [
    { label: "Dashboard", path: "dashboard" },
    { label: "Governance", path: "governance" },
    { label: "Finance", path: "finance" },
    { label: "Members", path: "members" },
    { label: "Settings", path: "settings" },
  ];

  const isDaoSubPage = /^\/daos\/0x[a-fA-F0-9]{40}(\/[^/]*)?$/.test(pathname);

  return (
    <Container>
      {daoAddress ? (
        <LeftSection>
          <DaoLogo imageUri={imageUri} name={daoName} />
          {links.map(({ label, path }) => (
            <NavLink key={path} to={`/daos/${daoAddress}/${path}`}>
              {label}
            </NavLink>
          ))}
        </LeftSection>
      ) : (
        <LeftSection>
          <img src={logo} alt="dao-catalyst-logo" width="150px" />
        </LeftSection>
      )}
      <RightSection>
        {pathname === "/daos" && <CreateDaoButton />}
        {isDaoSubPage && <DelegateButton />}
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

  a {
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.03em;
    text-decoration: none;
    color: rgba(41, 41, 51, 0.9);
  }
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 12px;
  height: 40px;
`;
