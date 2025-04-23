import styled from "styled-components";
import {
  DaoOverview,
  EmptyProposalCard,
  EmptyTreasuryCard,
  MembersPanel,
  ProposalSummary,
  TreasuryPanel,
} from "../../components";
import { proposals, transfers } from "../../constants";

export const DashboardPage = () => {
  const hasProposals = proposals.length > 0;
  const hasTransfers = transfers.length > 0;
  const isNotEmpty = hasProposals || hasTransfers;

  return (
    <>
      <DaoOverview />
      <Container>
        <LeftColumn>
          {isNotEmpty ? (
            <ProposalSummary proposals={proposals} />
          ) : (
            <EmptyProposalCard />
          )}
        </LeftColumn>
        <RightColumn>
          {isNotEmpty ? (
            <TreasuryPanel transfers={transfers} balance={"123.321"} />
          ) : (
            <EmptyTreasuryCard />
          )}
          <MembersPanel members={[]} />
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
