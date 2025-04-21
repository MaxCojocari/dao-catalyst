import styled from "styled-components";
import {
  ActionsSection,
  ProposalOverview,
  ResourcesSection,
  StatusTimeline,
  Voting,
} from "../../components";

export const ProposalDetailsPage = () => {
  return (
    <>
      <ProposalOverview />
      <Container>
        <LeftColumn>
          <Voting />
          <ActionsSection />
        </LeftColumn>
        <RightColumn>
          <ResourcesSection />
          <StatusTimeline />
        </RightColumn>
      </Container>
    </>
  );
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: 4fr 3fr;
  padding: 10px 150px;
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
