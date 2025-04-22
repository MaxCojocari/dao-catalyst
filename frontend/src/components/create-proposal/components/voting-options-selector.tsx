import styled from "styled-components";
import { GenericProps, VoteCounting } from "../../../types";
import { updateProposalInfo } from "../../../store";

export const VotingOptionsSelector = ({ value, onChange }: GenericProps) => {
  return (
    <RadioGroup>
      <div
        className={`radio-card ${value === "simple" ? "active" : ""}`}
        onClick={() => {
          updateProposalInfo({ votingOption: VoteCounting.SimpleVoting });
          onChange("simple");
        }}
      >
        <RadioHeader>
          <a className="title">Yes, no, or abstain (simple)</a>
          <input
            type="radio"
            name="voting-method"
            value="simple"
            checked={value === "simple"}
            onChange={() => onChange("simple")}
          />
        </RadioHeader>
        <Description>Members choose one: yes, no, or abstain.</Description>
      </div>

      <div
        className={`radio-card ${value === "fractional" ? "active" : ""}`}
        onClick={() => {
          updateProposalInfo({ votingOption: VoteCounting.FractionalVoting });
          onChange("fractional");
        }}
      >
        <RadioHeader>
          <a className="title">Yes, no, or abstain (fractional)</a>
          <input
            type="radio"
            name="voting-method"
            value="fractional"
            checked={value === "fractional"}
            onChange={() => onChange("fractional")}
          />
        </RadioHeader>
        <Description>
          Includes yes, no, abstain, and fractional — split votes across
          options.
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
