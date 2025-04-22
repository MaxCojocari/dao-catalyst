import styled from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

type VotingStatusType = "active" | "passed" | "executed" | "defeated";

interface VotingStatusProps {
  type: VotingStatusType;
  label?: string;
}

export const VotingStatus = ({ type, label }: VotingStatusProps) => {
  const isError = type === "defeated";

  const getIcon = () =>
    isError ? (
      <ErrorOutlineOutlinedIcon
        sx={{ color: "#CC1F1A", width: 18, marginRight: 1 }}
      />
    ) : (
      <InfoOutlinedIcon sx={{ color: "#6666FF", width: 18, marginRight: 1 }} />
    );

  const getLabel = () => {
    switch (type) {
      case "active":
        return label || "Voting ends soon";
      case "passed":
        return "Proposal passed";
      case "executed":
        return "Proposal executed";
      case "defeated":
        return "Proposal defeated";
    }
  };

  return (
    <Container isError={isError}>
      {getIcon()}
      <p>{getLabel()}</p>
    </Container>
  );
};

const Container = styled.div<{ isError?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: ${({ isError }) => (isError ? "#CC1F1A" : "#6666FF")};
  }
`;
