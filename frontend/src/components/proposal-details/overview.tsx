import styled from "styled-components";
import { StatusTag } from "..";
import { useAccount } from "wagmi";
import { shortenAddress } from "../../utils";
import { ProposalSummaryExtended } from "../../types";

export const ProposalOverview = ({
  proposal,
}: {
  proposal: ProposalSummaryExtended;
}) => {
  const { address } = useAccount();

  return (
    <Container>
      <h1>{proposal?.title}</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <Author>
          <p className="proposed-by">Proposed by</p>
          <p className="proposer-address">
            {address?.toLowerCase() === proposal?.author?.toLowerCase()
              ? "You"
              : shortenAddress(proposal?.author)}
          </p>
        </Author>
        <p className="delimeter">|</p>
        <StatusTag state={proposal?.state} />
      </div>
      <h2>{proposal?.summary}</h2>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  margin-top: -10px;
  padding: 80px 150px;

  * {
    font-family: "Inter";
    font-style: normal;
  }

  h1 {
    font-weight: 800;
    font-size: 40px;
    line-height: 110%;
    letter-spacing: -0.03em;
    color: #292933;
  }

  h2 {
    font-weight: 400;
    font-size: 16px;
    line-height: 170%;
    letter-spacing: -0.02em;
    color: #666680;
  }

  .delimeter {
    color: #e6e6ff;
  }
`;

export const Author = styled.div`
  display: flex;
  flex-direction: row;
  margin: 12px 0;

  .proposed-by {
    font-weight: 400;
    font-size: 14px;
    line-height: 40px;
    letter-spacing: -0.02em;
    color: #666680;
    margin-right: 4px;
  }

  .proposer-address {
    font-weight: 500;
    font-size: 14px;
    line-height: 40px;
    letter-spacing: -0.02em;
    color: #6666ff;
  }
`;
