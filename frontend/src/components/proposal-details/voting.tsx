import styled from "styled-components";
import { Container, NextStepButton } from "../common-styles";
import { useState } from "react";
import { BreakdownSection, InfoSection, ToggleTabs, VotersSection } from "..";
import { DaoType } from "../../types";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";

export enum VotingTab {
  Breakdown = "Breakdown",
  Voters = "Voters",
  Info = "Info",
}

export const Voting = () => {
  const [activeTab, setActiveTab] = useState(VotingTab.Info);

  return (
    <Container>
      <Row>
        <h1>Voting</h1>
        <ToggleTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </Row>
      <VotingStatus>
        <InfoOutlineIcon
          sx={{ color: "#6666FF", width: "18px", marginRight: "4px" }}
        />
        <p>Voting ends in 59 minutes</p>
      </VotingStatus>
      {activeTab === VotingTab.Info && (
        <InfoSection
          daoType={DaoType.SimpleVote}
          support="> 66%"
          quorum="≥ 1950 of 13k PIK (15%)"
          participation="3000 of 13k PIK (23.08%)"
          participationReached={true}
          uniqueVoters={4}
          start="2025/02/05 10:20 PM UTC+2"
          end="2025/02/06 10:20 PM UTC+2"
        />
      )}
      {activeTab === VotingTab.Breakdown && (
        <BreakdownSection
          votes={{
            yes: { amount: "12k PIK", percentage: 52.31 },
            no: { amount: "1000 PIK", percentage: 7.69 },
            abstain: { amount: "0 PIK", percentage: 40 },
          }}
        />
      )}
      {activeTab === VotingTab.Voters && <VotersSection />}
      <VoteButton disabled={false}>Vote Now</VoteButton>
    </Container>
  );
};

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 6px;
`;

export const VotingStatus = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 12px;

  p {
    font-weight: 400;
    font-size: 13px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #6666ff;
  }
`;

export const VoteButton = styled(NextStepButton)`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 32px;
  gap: 8px;

  width: auto;
  height: 47px;

  border-radius: 6px;

  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.02em;
  color: #ffffff;
`;
