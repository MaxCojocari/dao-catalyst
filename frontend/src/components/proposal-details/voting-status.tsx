import styled from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { ProposalState } from "../../types";

interface VotingStatusProps {
  state: ProposalState;
  label?: string;
}

export const VotingStatus = ({ state, label }: VotingStatusProps) => {
  const isError = state === ProposalState.Defeated;

  const getIcon = () =>
    isError ? (
      <ErrorOutlineOutlinedIcon
        sx={{ color: "#CC1F1A", width: 18, marginRight: 1 }}
      />
    ) : (
      <InfoOutlinedIcon sx={{ color: "#6666FF", width: 18, marginRight: 1 }} />
    );

  const getLabel = () => {
    switch (state) {
      case ProposalState.Active:
        return label || "Voting ends soon";
      case ProposalState.Succeeded:
        return "Proposal passed";
      case ProposalState.Executed:
        return "Proposal executed";
      case ProposalState.Defeated:
        return "Proposal defeated";
    }
  };

  return (
    <Container $isError={isError}>
      {getIcon()}
      <p>{getLabel()}</p>
    </Container>
  );
};

const Container = styled.div<{ $isError?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: ${({ $isError }) => ($isError ? "#CC1F1A" : "#6666FF")};
  }
`;
