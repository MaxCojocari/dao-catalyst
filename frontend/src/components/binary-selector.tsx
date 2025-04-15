import styled from "styled-components";
import { RadioHeader } from "./voting-method-selector";
import { GenericProps } from "../types";

export const BinarySelector = ({ value, onChange }: GenericProps) => {
  return (
    <RadioGroup>
      <label
        className={`radio-card ${!value ? "active" : ""}`}
        onClick={() => onChange(false)}
      >
        <RadioHeader>
          <span className="title">No</span>
          <input
            type="radio"
            name="binary-selector"
            value={value}
            checked={!value}
            onChange={() => onChange(false)}
          />
        </RadioHeader>
      </label>

      <label
        className={`radio-card ${value ? "active" : ""}`}
        onClick={() => onChange(true)}
      >
        <RadioHeader>
          <span className="title">Yes</span>
          <input
            type="radio"
            name="binary-selector"
            value={value}
            checked={value}
            onChange={() => onChange(value)}
          />
        </RadioHeader>
      </label>
    </RadioGroup>
  );
};

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  margin-top: 8px;
  box-sizing: border-box;

  input[type="radio"] {
    accent-color: rgba(102, 102, 255, 0.8);
  }

  .radio-card {
    display: flex;
    flex-direction: column;
    flex: 1;
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
