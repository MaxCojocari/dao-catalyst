import {
  Badge,
  Container,
  FilledButtonOverview,
  SeeAllButton,
} from "../common-styles";
import treasuryIcon from "../../assets/images/treasury.svg";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { TreasuryActivityCard } from "./treasury-activity-card";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useState } from "react";
import { ErrorModal } from "..";

export const TreasuryPanel = ({
  transfers,
  balance,
  isMember,
}: {
  transfers: any[];
  balance: string;
  isMember: boolean;
}) => {
  const navigate = useNavigate();
  const { daoAddress } = useParams();
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const displayTransfers = transfers?.slice(0, 3);
  const hasMoreThanTwo = transfers?.length > 3;

  const handleClickNewProposal = () => {
    if (!isMember) {
      setErrorModalOpen(true);
      return;
    }
    navigate(`/daos/${daoAddress}/create-proposal`);
  };

  return (
    <>
      <Container style={{ height: "210px", justifyContent: "space-between" }}>
        <Header>
          <Badge color="#6666FF">
            <img src={treasuryIcon} />
          </Badge>
          <FilledButtonOverview onClick={handleClickNewProposal}>
            New transfer
          </FilledButtonOverview>
        </Header>
        <Footer>
          <p className="balance">${balance}</p>
          <p>Treasury value</p>
        </Footer>
      </Container>

      {displayTransfers?.map((transfer, idx) => (
        <TreasuryActivityCard key={idx} transfer={transfer} />
      ))}

      {hasMoreThanTwo && (
        <SeeAllButton
          onClick={() => {
            navigate(`/daos/${daoAddress}/governance`);
          }}
        >
          See all{" "}
          <KeyboardArrowRightIcon width={10} sx={{ color: "#6666FF" }} />
        </SeeAllButton>
      )}

      <ErrorModal
        open={errorModalOpen}
        setOpen={setErrorModalOpen}
        name={"You can't make transfers"}
        summary={
          "You are not eligible member. To make new transfers, contact DAO admin to grant necessary permissions."
        }
      />
    </>
  );
};

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #666680;
  }

  .balance {
    font-weight: 600;
    font-size: 40px;
    line-height: 40px;
    letter-spacing: -0.02em;
    color: #292933;

    margin-bottom: 10px;
  }
`;
