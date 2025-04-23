import { Badge, Container, FilledButton } from "../common-styles";
import voteIcon from "../../assets/images/vote.svg";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { ProposalOverviewCard } from "./proposal-overview-card";
import { Button } from "../preview-styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export const ProposalSummary = ({ proposals }: { proposals: any[] }) => {
  const navigate = useNavigate();
  const { daoAddress } = useParams();

  const handleClick = () => {
    navigate(`/daos/${daoAddress}/create-proposal`);
  };

  return (
    <>
      <Container
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "12px",
        }}
      >
        <Box>
          <Badge color="#6666FF">
            <img src={voteIcon} />
          </Badge>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: "12px",
            }}
          >
            <Number>{proposals.length}</Number>
            <p>Proposals created</p>
          </div>
        </Box>
        <FilledButton
          onClick={() => {
            navigate(`/daos/${daoAddress}/create-proposal`);
          }}
        >
          New proposal
        </FilledButton>
      </Container>
      {proposals.map((proposal, idx) => (
        <ProposalOverviewCard key={idx} proposal={proposal} />
      ))}
      <Button
        style={{ height: "47px", padding: "12px 20px 12px 28px" }}
        onClick={() => {
          navigate(`/daos/${daoAddress}/governance`);
        }}
      >
        See all <KeyboardArrowRightIcon width={10} sx={{ color: "#6666FF" }} />{" "}
      </Button>
    </>
  );
};

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  gap: 4px;

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #666680;
  }
`;

export const Number = styled.div`
  font-weight: 600;
  font-size: 40px;
  line-height: 40px;
  letter-spacing: -0.02em;
  color: #292933;
`;
