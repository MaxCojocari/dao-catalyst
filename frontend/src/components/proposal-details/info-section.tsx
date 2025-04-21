import styled from "styled-components";
import { DaoType } from "../../types";
import { Content, InfoBox, InfoBoxHeader } from "../preview-styles";
import { Line } from "../create-proposal/components/actions";

interface InfoSectionProps {
  daoType: DaoType;
  support: string;
  quorum: string;
  participation: string;
  participationReached: boolean;
  uniqueVoters: number;
  start: string;
  end: string;
}

export const InfoSection = ({
  daoType,
  support,
  quorum,
  participation,
  participationReached,
  uniqueVoters,
  start,
  end,
}: InfoSectionProps) => {
  return (
    <Container>
      <Box>
        <InfoBoxHeader>
          <h2>Rules of decision</h2>
        </InfoBoxHeader>
        <SectionContent>
          <Row>
            <h3>Options</h3>
            <p>Yes, no, or abstain</p>
          </Row>
          <Row>
            <h3>Strategy</h3>
            {daoType === DaoType.SimpleVote && <p>1 token → 1 vote</p>}
            {daoType === DaoType.MultisigVote && <p>1 wallet → 1 vote</p>}
          </Row>
          <Row>
            <h3>Minimum support</h3>
            <p>{support}</p>
          </Row>
          {daoType === DaoType.SimpleVote && (
            <Row>
              <h3>Minimum participation</h3>
              <p>{quorum}</p>
            </Row>
          )}
        </SectionContent>
      </Box>
      <SectionLine />
      <Box>
        <InfoBoxHeader>
          <h2>Voting activity</h2>
        </InfoBoxHeader>
        <SectionContent>
          <Row>
            <h3>Current participation</h3>
            <Value
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {participation}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-around",
                  width: "100%",
                }}
              >
                {participationReached ? (
                  <Pill color="#D2F4C6">Reached</Pill>
                ) : (
                  <Pill color="#FFE9A3">Missing</Pill>
                )}
                <span style={{ color: "#8f8fb2", fontSize: "12px" }}>
                  {participationReached ? "No votes missing" : "Votes missing"}
                </span>
              </div>
            </Value>
          </Row>
          <Row>
            <h3>Unique voters</h3>
            <p>{uniqueVoters}</p>
          </Row>
        </SectionContent>
      </Box>
      <SectionLine />
      <Box>
        <InfoBoxHeader>
          <h2>Duration</h2>
        </InfoBoxHeader>
        <SectionContent>
          <Row>
            <h3>Start</h3>
            <p>{start}</p>
          </Row>
          <Row>
            <h3>End</h3>
            <p>{end}</p>
          </Row>
        </SectionContent>
      </Box>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;

export const Box = styled(InfoBox)`
  h2 {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.03em;
    color: #292933;
  }
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SectionContent = styled(Content)`
  margin-top: 20px;
`;

export const SectionLine = styled(Line)`
  margin: 20px 0;
`;

export const Value = styled.p`
  font-size: 14px;
  color: #292933;
  font-weight: 500;
`;

export const Pill = styled.span<{ color: string }>`
  padding: 2px 8px;
  background-color: ${({ color }) => color};
  color: #292933;
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  margin-right: 4px;
`;
