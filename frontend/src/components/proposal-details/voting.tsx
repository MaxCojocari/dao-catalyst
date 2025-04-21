import styled from "styled-components";
import { Container, NextStepButton } from "../common-styles";
import { useState } from "react";
import { InfoSection, ToggleTabs } from "..";
import { DaoType } from "../../types";

export const Voting = () => {
  const [activeTab, setActiveTab] = useState("Info");

  return (
    <Container>
      <Row>
        <h1>Voting</h1>
        <ToggleTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </Row>
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
      <VoteButton disabled={false}>Vote Now</VoteButton>
    </Container>
  );
};

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 12px;
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
