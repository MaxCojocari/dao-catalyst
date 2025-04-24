import styled from "styled-components";
import {
  ActionsSection,
  ProposalOverview,
  ResourcesSection,
  StatusTimeline,
  Voting,
} from "../../components";
import {
  customAction,
  TEST_PROPOSAL as proposal,
  statuses,
  transferAction,
} from "../../constants";
import { ProposalState } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export const ProposalDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/404-page", { replace: true });
    }
    const isStrictInteger = /^([1-9]\d*|0)$/.test(id!);
    if (!isStrictInteger) {
      navigate("/404-page", { replace: true });
    }
  }, [id]);

  return (
    <>
      <ProposalOverview />
      <Container>
        <LeftColumn>
          <Voting />
          <ActionsSection
            txHash="0x0"
            state={ProposalState.Executed}
            actions={[transferAction]}
          />
        </LeftColumn>
        <RightColumn>
          <ResourcesSection resources={proposal.resources} />
          <StatusTimeline statuses={statuses} />
        </RightColumn>
      </Container>
    </>
  );
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 3fr;
  padding: 16px 150px;
  column-gap: 16px;
  row-gap: 16px;

  * {
    font-family: "Inter";
    font-style: normal;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
