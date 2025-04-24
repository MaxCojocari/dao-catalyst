import { EmptyContainer, FilledButtonOverview } from "../common-styles";
import treasuryEmptyImg from "../../assets/images/corporate.svg";
import { useNavigate, useParams } from "react-router-dom";

export const EmptyTreasuryCard = () => {
  const navigate = useNavigate();
  const { daoAddress } = useParams();

  return (
    <EmptyContainer>
      <img
        src={treasuryEmptyImg}
        style={{ width: "238px", margin: "40px 0" }}
      />
      <h2>Make your first deposit</h2>

      <p style={{ margin: "0 20px 20px 20px" }}>
        Every community needs capital to motivate and operate. Get things moving
        by making your first treasury deposit.
      </p>

      <FilledButtonOverview
        style={{ marginBottom: "24px" }}
        onClick={() => {
          navigate(`/daos/${daoAddress}/create-proposal`);
        }}
      >
        Deposit funds
      </FilledButtonOverview>
    </EmptyContainer>
  );
};
