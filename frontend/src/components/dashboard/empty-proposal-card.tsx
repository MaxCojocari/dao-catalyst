import { EmptyContainer, FilledButtonOverview } from "../common-styles";
import proposalEmptyImg from "../../assets/images/individual.svg";
import { useNavigate, useParams } from "react-router-dom";

export const EmptyProposalCard = () => {
  const navigate = useNavigate();
  const { daoAddress } = useParams();

  return (
    <EmptyContainer>
      <img src={proposalEmptyImg} />
      <h2>Create your first proposal</h2>

      <p>
        What's the first thing your community needs to decide? Get your
        community involved in the decision-making process.
      </p>

      <FilledButtonOverview
        style={{ marginBottom: "24px" }}
        onClick={() => {
          navigate(`/daos/${daoAddress}/create-proposal`);
        }}
      >
        Create proposal
      </FilledButtonOverview>
    </EmptyContainer>
  );
};
