import { EmptyContainer, FilledButtonOverview } from "../common-styles";
import proposalEmptyImg from "../../assets/images/individual.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ErrorModal } from "..";

export const EmptyProposalCard = ({ isMember }: { isMember: boolean }) => {
  const navigate = useNavigate();
  const { daoAddress } = useParams();
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  const handleClickNewProposal = () => {
    if (!isMember) {
      setErrorModalOpen(true);
      return;
    }
    navigate(`/daos/${daoAddress}/create-proposal`);
  };

  return (
    <>
      <EmptyContainer>
        <img src={proposalEmptyImg} />
        <h2>Create your first proposal</h2>

        <p>
          What's the first thing your community needs to decide? Get your
          community involved in the decision-making process.
        </p>

        <FilledButtonOverview
          style={{ marginBottom: "24px" }}
          onClick={handleClickNewProposal}
        >
          Create proposal
        </FilledButtonOverview>
      </EmptyContainer>
      <ErrorModal
        open={errorModalOpen}
        setOpen={setErrorModalOpen}
        name={"You can't create proposals"}
        summary={
          "You are not eligible member. To create new proposals, contact DAO admin to grant necessary permissions."
        }
      />
    </>
  );
};
