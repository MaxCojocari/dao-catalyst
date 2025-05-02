import {
  Badge,
  Container,
  FilledButtonOverview,
  SeeAllButton,
} from "../common-styles";
import voteIcon from "../../assets/images/vote.svg";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { ProposalOverviewCard } from "./proposal-overview-card";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { ProposalSummary as ProposalSummaryType } from "../../types";
import { ErrorModal } from "../error-modal";
import { useState } from "react";

export const ProposalSummary = ({
  proposals,
  proposalLength,
  isMember,
}: {
  proposals: ProposalSummaryType[];
  proposalLength: number;
  isMember: boolean;
}) => {
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const navigate = useNavigate();
  const { daoAddress } = useParams();

  const displayProposals = proposals.slice(0, 3);
  const hasMoreThanThree = proposals.length >= 3;

  const handleClickNewProposal = () => {
    if (!isMember) {
      setErrorModalOpen(true);
      return;
    }
    navigate(`/daos/${daoAddress}/create-proposal`);
  };

  return (
    <>
      <Container
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <Box>
          <Badge color="#6666FF">
            <img src={voteIcon} />
          </Badge>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "12px",
            }}
          >
            <Number>{proposalLength}</Number>
            <p>Proposals created</p>
          </div>
        </Box>
        <FilledButtonOverview onClick={handleClickNewProposal}>
          New proposal
        </FilledButtonOverview>
      </Container>

      {displayProposals?.map((proposal, idx) => (
        <ProposalOverviewCard key={idx} proposal={proposal} />
      ))}

      {hasMoreThanThree && (
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
        name={"You can't create proposals"}
        summary={
          "You are not eligible member. To create new proposals, contact DAO admin to grant necessary permissions."
        }
      />
    </>
  );
};

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  gap: 4px;

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #666680;
  }
`;

export const Number = styled.div`
  font-weight: 600;
  font-size: 40px;
  line-height: 40px;
  letter-spacing: -0.02em;
  color: #292933;
`;
