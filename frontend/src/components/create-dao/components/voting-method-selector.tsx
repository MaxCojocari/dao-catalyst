import styled from "styled-components";
import { DaoType, GenericProps } from "../../../types";
import { updateDaoInfo } from "../../../store";

export const VotingMethodSelector = ({ value, onChange }: GenericProps) => {
  return (
    <RadioGroup>
      <div
        className={`radio-card ${value === "token" ? "active" : ""}`}
        onClick={() => {
          updateDaoInfo({ type: DaoType.SimpleVote });
          onChange("token");
        }}
      >
        <RadioHeader>
          <a className="title">Token holders</a>
          <input
            type="radio"
            name="voting-method"
            value="token"
            checked={value === "token"}
            onChange={() => onChange("token")}
          />
        </RadioHeader>
        <Description>
          Tokens act as voting chips. The more tokens you hold, the more weight
          your vote has. 1 token equals 1 vote.
        </Description>
      </div>

      <div
        className={`radio-card ${value === "multisig" ? "active" : ""}`}
        onClick={() => {
          updateDaoInfo({ type: DaoType.MultisigVote });
          onChange("multisig");
        }}
      >
        <RadioHeader>
          <a className="title">Multisig members</a>
          <input
            type="radio"
            name="voting-method"
            value="multisig"
            checked={value === "multisig"}
            onChange={() => onChange("multisig")}
          />
        </RadioHeader>
        <Description>
          Only multisig members can vote. 1 wallet address equals 1 approval.
        </Description>
      </div>
    </RadioGroup>
  );
};

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
  box-sizing: "border-box";

  input[type="radio"] {
    accent-color: rgba(102, 102, 255, 0.8);
  }

  .radio-card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    gap: 4px;
    background: #ffffff;
    border: 1px solid #e6e6ff;
    border-radius: 6px;
    cursor: pointer;
  }

  .radio-card input {
    margin-right: 10px;
  }

  .radio-card.active {
    border: 2px solid rgba(102, 102, 255, 0.8);
  }
`;

export const RadioHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  .title {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: #555566;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  boxSizing: "border-box",

  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.03em;
  color: #8f8fb2;
`;
