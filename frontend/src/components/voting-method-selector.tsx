import { useState } from "react";
import styled from "styled-components";

export const VotingMethodSelector = () => {
  const [selected, setSelected] = useState("token");

  return (
    <RadioGroup>
      <div
        className={`radio-card ${selected === "token" ? "active" : ""}`}
        onClick={() => setSelected("token")}
      >
        <RadioHeader>
          <a className="title">Token holders</a>
          <input
            type="radio"
            name="voting-method"
            value="token"
            checked={selected === "token"}
            onChange={() => setSelected("token")}
          />
        </RadioHeader>
        <Description>
          Tokens act as voting chips. The more tokens you hold, the more weight
          your vote has. 1 token equals 1 vote.
        </Description>
      </div>

      <label
        className={`radio-card ${selected === "multisig" ? "active" : ""}`}
        onClick={() => setSelected("multisig")}
      >
        <RadioHeader>
          <a className="title">Multisig members</a>
          <input
            type="radio"
            name="voting-method"
            value="multisig"
            checked={selected === "multisig"}
            onChange={() => setSelected("multisig")}
          />
        </RadioHeader>
        <Description>
          Only multisig members can vote. 1 wallet address equals 1 approval.
        </Description>
      </label>
    </RadioGroup>
  );
};

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
  box-sizing: border-box;

  input[type="radio"] {
    accent-color: rgba(102, 102, 255, 0.8); /* your custom color */
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

  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.03em;
  color: #8f8fb2;
`;
