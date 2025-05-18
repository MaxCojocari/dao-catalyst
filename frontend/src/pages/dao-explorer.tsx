import styled from "styled-components";
import cubes from "../assets/images/cubes.svg";
import { useCallback, useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";
import { shortenAddress } from "../utils";
import { fetchDaoSummaries } from "../services";
import { setIsLoading } from "../store";
import { DaoSummary, DaoType } from "../types";
import { TEST_DAOS } from "../constants";
import peopleIcon from "../assets/images/people.svg";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";

export const DaoExplorerPage = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const { address } = useAccount();
  const [daos, setDaos] = useState<DaoSummary[]>([]);

  const fetchDaos = useCallback(async () => {
    try {
      setIsLoading({ fetchDaos: true });
      setDaos(await fetchDaoSummaries(address!));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading({ fetchDaos: false });
    }
  }, [daos]);

  const filteredDaos = daos?.filter((dao) => {
    switch (value) {
      case 0: // Featured - show only first 3
        return daos?.indexOf(dao) < 3;
      case 1: // All DAOs
        return true;
      case 2: // Member - if current address is among dao members
        return dao?.isCallerMember;
      default:
        return true;
    }
  });

  useEffect(() => {
    fetchDaos();
    // setDaos(TEST_DAOS);
  }, []);

  return (
    <Container>
      <Header>
        <HeaderText>
          Govern with Clarity and Catalyze Decentralized Progress
        </HeaderText>
        <LearnMoreButton>Learn more</LearnMoreButton>
        <img src={cubes} />
      </Header>
      <Body>
        <Row>
          <h2>Explore DAOs</h2>
          <CreateDaoButton onClick={() => navigate("/create-dao")}>
            Create a DAO
          </CreateDaoButton>
        </Row>
        <Box sx={{ borderBottom: "1px solid #E5E5FF" }}>
          <Tabs
            value={value}
            onChange={(_: any, newValue: number) => {
              setValue(newValue);
            }}
          >
            <Tab label="Featured" disableRipple />
            <Tab label="All DAOs" disableRipple />
            <Tab label="Member" disableRipple />
          </Tabs>
        </Box>
        <Cards>
          {filteredDaos?.map((dao, idx) => (
            <DaoOverviewCard
              key={idx}
              onClick={() => navigate(`/daos/${dao?.contractAddress}`)}
            >
              <Name>
                <img src={dao?.logo} />
                <h3>{dao?.name}</h3>
              </Name>
              <Description>{dao?.summary}</Description>
              <Footer>
                <Fragment>
                  <InsertDriveFileOutlinedIcon
                    sx={{ width: "16px", color: "#6666FF" }}
                  />
                  <p>{shortenAddress(dao?.contractAddress)}</p>
                </Fragment>
                <Fragment>
                  <img src={peopleIcon} width="16px" />
                  {dao?.daoType === DaoType.SimpleVote && <p>Token-based</p>}
                  {dao?.daoType === DaoType.MultisigVote && <p>Wallet-based</p>}
                </Fragment>
              </Footer>
            </DaoOverviewCard>
          ))}
        </Cards>
      </Body>
    </Container>
  );
};

export const Name = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
    margin-right: 18px;
  }

  h3 {
    font-weight: 700;
    font-size: 24px;
    line-height: 140%;
    letter-spacing: -0.03em;
    color: #292933;
  }
`;

export const Description = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: #666680;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  * {
    font-family: "Inter";
    font-style: normal;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: -10px;
  height: 600px;
  background: radial-gradient(
    132.37% 264.75% at 75.5% 8.5%,
    #f5f5fc 0%,
    #ffffff 100%
  );

  img {
    width: 700px;
    margin-right: 80px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h2 {
    font-weight: 700;
    font-size: 32px;
    line-height: 120%;
    letter-spacing: -0.04em;
    color: #292933;
  }
`;

export const CreateDaoButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 17px 24px;
  box-sizing: border-box;

  width: 140px;
  height: 48px;

  border-radius: 6px;
  border: none;

  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
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

export const HeaderText = styled.h1`
  position: absolute;
  width: 626px;
  height: 264px;
  left: calc(50% - 526px / 2 - 331px);
  top: 190px;

  font-weight: 800;
  font-size: 70px;
  line-height: 110%;
  letter-spacing: -0.04em;

  color: #292933;
`;

export const LearnMoreButton = styled.button`
  box-sizing: border-box;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  gap: 1px;

  position: absolute;
  width: 153px;
  height: 47px;
  left: calc(50% - 153px / 2 - 517.5px);
  top: 540px;

  background: #ffffff;
  border: 1px solid #e6e6ff;
  border-radius: 6px;

  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.02em;

  color: #6666ff;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 70px 150px 0 150px;
  gap: 10px;
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 16px;
  column-gap: 16px;
  margin-top: 12px;
`;

export const DaoOverviewCard = styled.div`
  box-sizing: border-box;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 21px;

  background: #ffffff;
  border: 1px solid #e6e6ff;
  border-radius: 8px;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 18px;

  p {
    font-weight: 300;
    font-size: 13px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #666680;
  }
`;

export const Fragment = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 30px;
  gap: 8px;
`;
