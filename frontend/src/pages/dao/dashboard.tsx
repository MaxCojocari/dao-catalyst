import styled from "styled-components";
import {
  DaoOverview,
  EmptyProposalCard,
  EmptyTreasuryCard,
  ErrorModal,
  MembersPanel,
  ProposalSummary,
  TreasuryPanel,
} from "../../components";
import { members, proposals, transfers } from "../../constants";
import { useState } from "react";

export const BodyEmpty = () => {
  return (
    <>
      <ContainerEmpty>
        <LeftColumn style={{ flex: 1 }}>
          <EmptyProposalCard />
        </LeftColumn>
        <RightColumn style={{ flex: 1 }}>
          <EmptyTreasuryCard />
        </RightColumn>
      </ContainerEmpty>
      <Bottom>
        <MembersPanel members={members} tokenSymbol="PIK" isExtended={true} />
      </Bottom>
    </>
  );
};

export const Body = () => {
  return (
    <Container>
      <LeftColumn>
        <ProposalSummary proposals={proposals} />
      </LeftColumn>
      <RightColumn>
        <TreasuryPanel transfers={transfers} balance={"123.321"} />
        <MembersPanel members={members} tokenSymbol="PIK" isExtended={false} />
      </RightColumn>
    </Container>
  );
};

export const DashboardPage = () => {
  const hasProposals = proposals.length > 0;
  const hasTransfers = transfers.length > 0;
  const isNotEmpty = hasProposals || hasTransfers;
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  return (
    <>
      <DaoOverview />
      {isNotEmpty ? <Body /> : <BodyEmpty />}
      <ErrorModal
        open={errorModalOpen}
        setOpen={setErrorModalOpen}
        name={"You can't vote"}
        summary={
          "You didn't delegate your voting power before this proposal's snapshot. To vote on future proposals, make sure to delegate your tokens in advance."
        }
      />
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

export const ContainerEmpty = styled.div`
  display: flex;
  flex-direction: row;
  padding: 16px 150px 0 150px;
  gap: 16px;

  * {
    font-family: "Inter";
    font-style: normal;
  }
`;

export const Bottom = styled(Container)`
  grid-template-columns: 3fr 6fr;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RightColumn = styled(LeftColumn)``;
