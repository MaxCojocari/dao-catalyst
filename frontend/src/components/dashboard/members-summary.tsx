import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { Badge, Container, FilledButtonOverview } from "../common-styles";
import { DaoType } from "../../types";
import { TEST_DAO_INFO as dao } from "../../constants";
import membersIcon from "../../assets/images/people.svg";

export const MembersSummary = ({
  membersLength,
}: {
  membersLength: number;
}) => {
  const navigate = useNavigate();
  const { daoAddress } = useParams();

  return (
    <Container style={{ height: "210px", justifyContent: "space-between" }}>
      <Header>
        <Badge color="#6666FF">
          <img src={membersIcon} />
        </Badge>
        <FilledButtonOverview
          onClick={() => {
            navigate(`/daos/${daoAddress}/create-proposal`);
          }}
        >
          Add members
        </FilledButtonOverview>
      </Header>
      <Footer>
        <p className="members">{membersLength} Members</p>
        {dao.type === DaoType.SimpleVote && <p>Token-based</p>}
        {dao.type === DaoType.MultisigVote && <p>Wallet-based</p>}
      </Footer>
    </Container>
  );
};

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: column;

  p {
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #666680;
  }

  .members {
    font-weight: 600;
    font-size: 40px;
    line-height: 40px;
    letter-spacing: -0.02em;
    color: #292933;

    margin-bottom: 10px;
  }
`;
