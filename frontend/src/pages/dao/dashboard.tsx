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
import { members, transfers } from "../../constants";
import { useCallback, useEffect, useState } from "react";
import {
  DaoMember,
  DaoSummary,
  DaoTransfer,
  DaoType,
  ProposalSummary as ProposalSummaryType,
} from "../../types";
import { setIsLoading } from "../../store";
import {
  fetchDaoSummary,
  fetchProposalSummaries,
  fetchTreasuryInfo,
} from "../../services";
import { useParams } from "react-router-dom";

export const BodyEmpty = ({
  members,
  tokenSymbol,
}: {
  members: DaoMember[];
  tokenSymbol?: string;
}) => {
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
        <MembersPanel
          members={members}
          tokenSymbol={tokenSymbol}
          isExtended={true}
        />
      </Bottom>
    </>
  );
};

export const Body = ({
  proposals,
  proposalLength,
  transfers,
  balance,
  members,
  tokenSymbol,
}: {
  proposals: ProposalSummaryType[];
  proposalLength: number;
  transfers: DaoTransfer[];
  balance: number;
  members: DaoMember[];
  tokenSymbol?: string;
}) => {
  return (
    <Container>
      <LeftColumn>
        {proposals.length > 0 ? (
          <ProposalSummary
            proposals={proposals}
            proposalLength={proposalLength}
          />
        ) : (
          <EmptyProposalCard />
        )}
      </LeftColumn>
      <RightColumn>
        <TreasuryPanel
          transfers={transfers}
          balance={balance?.toLocaleString()}
        />
        <MembersPanel
          members={members}
          tokenSymbol={tokenSymbol}
          isExtended={false}
        />
      </RightColumn>
    </Container>
  );
};

export const DashboardPage = () => {
  const { daoAddress } = useParams();
  const [proposals, setProposals] = useState<ProposalSummaryType[]>([]);
  const [dao, setDao] = useState({} as DaoSummary);
  const [proposalLength, setProposalLength] = useState(3);
  const [treasuryInfo, setTreasuryInfo] = useState({} as any);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const tokenSymbol = dao?.daoType === DaoType.SimpleVote ? "PIK" : undefined;

  const fetchDashboardInfo = useCallback(async () => {
    try {
      if (!daoAddress) return;

      setIsLoading({ fetchDashboardInfo: true });

      const [_proposals, _dao, _treasuryInfo] = await Promise.all([
        fetchProposalSummaries(daoAddress!),
        fetchDaoSummary(daoAddress!),
        fetchTreasuryInfo(daoAddress!),
      ]);

      setProposals(_proposals?.enrichedLogs);
      setProposalLength(_proposals?.totalProposals || 3);
      setDao(_dao as DaoSummary);
      setTreasuryInfo(_treasuryInfo);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading({ fetchDashboardInfo: false });
    }
  }, [daoAddress]);

  useEffect(() => {
    fetchDashboardInfo();
  }, []);

  return (
    <>
      <DaoOverview dao={dao} />
      {proposals?.length > 0 || transfers?.length > 0 ? (
        <Body
          proposals={proposals}
          proposalLength={proposalLength}
          transfers={treasuryInfo.transfers}
          members={members}
          tokenSymbol={tokenSymbol}
          balance={treasuryInfo.totalNetWorth}
        />
      ) : (
        <BodyEmpty members={members} tokenSymbol={tokenSymbol} />
      )}
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
