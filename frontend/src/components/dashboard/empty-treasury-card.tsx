import { EmptyContainer, FilledButtonOverview } from "../common-styles";
import treasuryEmptyImg from "../../assets/images/corporate.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { ErrorModal } from "..";

export const EmptyTreasuryCard = ({ isMember }: { isMember: boolean }) => {
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
        <img
          src={treasuryEmptyImg}
          style={{ width: "238px", margin: "40px 0" }}
        />
        <h2>Make your first deposit</h2>

        <p style={{ margin: "0 20px 20px 20px" }}>
          Every community needs capital to motivate and operate. Get things
          moving by making your first treasury deposit.
        </p>

        <FilledButtonOverview
          style={{ marginBottom: "24px" }}
          onClick={handleClickNewProposal}
        >
          Deposit funds
        </FilledButtonOverview>
      </EmptyContainer>
      <ErrorModal
        open={errorModalOpen}
        setOpen={setErrorModalOpen}
        name={"You can't make deposits"}
        summary={
          "You are not eligible member. To create new proposals, contact DAO admin to grant necessary permissions."
        }
      />
    </>
  );
};
