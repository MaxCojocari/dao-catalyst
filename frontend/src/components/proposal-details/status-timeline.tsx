import { Container } from "../common-styles";
import styled from "styled-components";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { CircularProgress } from "@mui/material";
import CubeIcon from "../../assets/images/cube-icon.svg";
import { StatusTimelineType } from "../../types";

export type StatusItem = {
  label: StatusTimelineType;
  timestamp?: string;
  blockNumber?: string | undefined;
  isCurrent: boolean;
  isCompleted: boolean;
};

interface StatusTimelineProps {
  statuses: StatusItem[];
}

export const StatusTimeline = ({ statuses }: StatusTimelineProps) => {
  return (
    <Container>
      <h1>Status</h1>
      <br /> <br />
      {statuses.map((status, idx) => (
        <Row key={idx}>
          <Left>
            {status.isCompleted &&
              status.label !== StatusTimelineType.Rejected && (
                <CheckCircleOutlineIcon
                  style={{
                    color:
                      status.label === StatusTimelineType.Executed &&
                      status.isCompleted
                        ? "#1FBA66"
                        : "#555566",
                    width: "17px",
                  }}
                />
              )}
            {!status.isCompleted &&
              status.isCurrent &&
              status.label === StatusTimelineType.Running && (
                <CircularProgress
                  size={14}
                  thickness={5}
                  sx={{
                    color: "#6666FF",
                    marginTop: "5px",
                    marginRight: "2px",
                  }}
                />
              )}
            {!status.isCompleted &&
              status.isCurrent &&
              status.label !== StatusTimelineType.Running &&
              status.label !== StatusTimelineType.Rejected && (
                <PanoramaFishEyeIcon sx={{ color: "#6666FF", width: "17px" }} />
              )}
            {status.label === StatusTimelineType.Rejected && (
              <HighlightOffIcon sx={{ color: "#de3c48", width: "17px" }} />
            )}
          </Left>
          <Right>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <Label $highlight={status.isCurrent} status={status}>
                {status.label}
              </Label>
              <Timestamp>{status.timestamp}</Timestamp>
            </div>
            {status.blockNumber && (
              <BlockInfo>
                <p>{status.blockNumber}</p>
                <img
                  src={CubeIcon}
                  alt="block icon"
                  style={{ width: "17px", color: "red" }}
                />
              </BlockInfo>
            )}
          </Right>
        </Row>
      ))}
    </Container>
  );
};

const Row = styled.div<{ rejected?: boolean }>`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  color: ${({ rejected }) => (rejected ? "#de3c48" : "#292933")};
  width: 100%;
`;

const Left = styled.div`
  display: flex;
  margin-right: 10px;
  margin-top: -4px;
`;

const Label = styled.span<{ $highlight?: boolean; status?: StatusItem }>`
  font-weight: 600;
  color: ${({ status, $highlight }) => {
    if (status?.label === StatusTimelineType.Executed && status.isCompleted)
      return "#1FBA66";
    if (status?.label === StatusTimelineType.Rejected) return "#de3c48";
    if ($highlight) return "#6666ff";
    return "#292933";
  }};
  font-size: 16px;
  line-height: 19px;
  letter-spacing: -0.02em;
`;

const Right = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const Timestamp = styled.p`
  color: #8f8fb2;
  font-size: 12px;
  line-height: 19px;
  letter-spacing: -0.02em;
  cursor: pointer;
  display: inline-block;
`;

const BlockInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;

  p {
    margin-top: 2.5px;
    margin-right: 2px;
    font-size: 12px;
    color: #8f8fb2;
  }
`;
