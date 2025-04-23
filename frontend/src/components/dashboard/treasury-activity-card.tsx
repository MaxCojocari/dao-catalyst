import { Badge, Container } from "../common-styles";
import withdrawIcon from "../../assets/images/withdraw.svg";
import depositIcon from "../../assets/images/deposit.svg";
import { TransferType } from "../../types";
import styled from "styled-components";
import { formatWithCommas } from "../../utils";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate, useParams } from "react-router-dom";

export const TreasuryActivityCard = ({ transfer }: { transfer: any }) => {
  const navigate = useNavigate();
  const { daoAddress } = useParams();

  const isWithdrawal = transfer.type === TransferType.Withdrawal;
  const sign = isWithdrawal ? "-" : "+";

  return (
    <ActivityContainer
      onClick={() => {
        navigate(`/daos/${daoAddress}/finance`);
      }}
    >
      {isWithdrawal ? (
        <Badge color="#dc7e28">
          <img src={withdrawIcon} />
        </Badge>
      ) : (
        <Badge color="#76ae08">
          <img src={depositIcon} />
        </Badge>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          justifyContent: "space-between",
          alignContent: "space-between",
        }}
      >
        <Top>
          <p className="top">{TransferType[transfer.type]}</p>
          <p className="top">
            {sign} {formatWithCommas(Number(transfer.amount))}
          </p>
        </Top>
        <Bottom>
          <p>05/02/2025</p>
          <p>${Number(transfer.amount) * 0.99}</p>
        </Bottom>
      </div>
      <KeyboardArrowRightIcon
        width={10}
        sx={{ color: "#8F8FB2", marginLeft: "8px" }}
      />
    </ActivityContainer>
  );
};

export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  p {
    font-weight: 600;
    font-size: 15px;
    line-height: 15px;
    letter-spacing: -0.03em;
    color: #292933;
  }
`;

export const ActivityContainer = styled(Container)`
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  &:hover {
    .top {
      color: #6666ff;
    }
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: space-between;
  align-content: space-between;
`;

export const Bottom = styled(Top)`
  p {
    font-weight: 300;
    font-size: 13px;
    line-height: 13px;
    letter-spacing: -0.02em;
    color: #666680;
  }
`;
