import styled from "styled-components";
import { Container } from "../common-styles";
import { ProposalState } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import { shortenAddress, truncateText } from "../../utils";
import { useAccount } from "wagmi";

const stateStyles: Record<ProposalState, { bg: string; color: string }> = {
  [ProposalState.Pending]: {
    bg: "#E6E6E6",
    color: "#505050",
  },
  [ProposalState.Active]: {
    bg: "#B7F9FF",
    color: "#045377",
  },
  [ProposalState.Canceled]: {
    bg: "#F6F6F6",
    color: "#666666",
  },
  [ProposalState.Defeated]: {
    bg: "#FFD1CD",
    color: "#A72832",
  },
  [ProposalState.Succeeded]: {
    bg: "#E1FCD6",
    color: "#3C8237",
  },
  [ProposalState.Executed]: {
    bg: "#E1FCD6",
    color: "#3C8237",
  },
};

export const ProposalOverviewCard = ({ proposal }: { proposal: any }) => {
  const navigate = useNavigate();
  const { daoAddress } = useParams();
  const { address } = useAccount();

  const handleClick = () => {
    navigate(`/daos/${daoAddress}/proposals/${proposal.id}`);
  };

  const { bg, color } = stateStyles[proposal.state as ProposalState];
  const label = ProposalState[proposal.state];

  return (
    <Container style={{ cursor: "pointer" }} onClick={handleClick}>
      <Pill $bg={bg} $color={color}>
        {label}
      </Pill>
      <div
        style={{ display: "flex", flexDirection: "column", marginTop: "18px" }}
      >
        <Title>{proposal.title}</Title>
        <SummaryText>{truncateText(proposal.summary)}</SummaryText>
        <Footer>
          <p style={{ marginRight: "3px" }}>Published by</p>
          <p style={{ color: "#6666FF", fontWeight: "500" }}>
            {" "}
            {address?.toLowerCase() === proposal.author.toLowerCase()
              ? "You"
              : shortenAddress(proposal.author)}
          </p>
        </Footer>
      </div>
    </Container>
  );
};

const Pill = styled.span<{ $bg: string; $color: string }>`
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 400;
  font-size: 13px;
  line-height: 13px;
  letter-spacing: -0.02em;
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: inline-block;
`;

export const Title = styled.h2`
  font-weight: 700;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.03em;
  color: #292933;
  margin-bottom: 12px;
`;

export const SummaryText = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: #666680;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 12px;

  p {
    font-weight: 300;
    font-size: 13px;
    line-height: 20px;
    letter-spacing: -0.02em;
    color: #666680;
  }
`;
