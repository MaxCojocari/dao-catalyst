import styled from "styled-components";
import {
  ActionsSection,
  ProposalOverview,
  ResourcesSection,
  StatusTimeline,
  Voting,
} from "../../components";
import { DaoMetadata, ProposalSummaryExtended } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { setIsLoading } from "../../store";
import { fetchDaoMetadata, fetchProposal } from "../../services";

export const ProposalDetailsPage = () => {
  const { id, daoAddress } = useParams();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState({} as ProposalSummaryExtended);
  const [daoMetadata, setDaoMetadata] = useState({} as DaoMetadata);

  const fetchProposalDetails = useCallback(async () => {
    try {
      setIsLoading({ fetchProposalMetadata: true });
      setDaoMetadata((await fetchDaoMetadata(daoAddress!)) as DaoMetadata);
      setProposal(await fetchProposal(daoAddress!, BigInt(id!)));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading({ fetchProposalMetadata: false });
    }
  }, [id, daoAddress]);

  useEffect(() => {
    fetchProposalDetails();
  }, []);

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
      <ProposalOverview proposal={proposal} />
      <Container>
        <LeftColumn>
          <Voting proposalState={proposal?.state} />
          <ActionsSection
            txHash={proposal?.txHashExecuted}
            state={proposal?.state}
            actions={proposal?.actions}
            daoName={daoMetadata?.name}
          />
        </LeftColumn>
        <RightColumn>
          <ResourcesSection resources={proposal?.resources} />
          <StatusTimeline statuses={proposal?.statuses} />
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
