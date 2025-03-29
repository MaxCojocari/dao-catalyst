import { useState } from "react";
import styled from "styled-components";
import { RadioHeader } from "./voting-method-selector";

export const BinarySelector = () => {
  const [selected, setSelected] = useState("value1");

  return (
    <RadioGroup>
      <label
        className={`radio-card ${selected === "value1" ? "active" : ""}`}
        onClick={() => setSelected("value1")}
      >
        <RadioHeader>
          <span className="title">No</span>
          <input
            type="radio"
            name="binary-selector"
            value="value1"
            checked={selected === "value1"}
            onChange={() => setSelected("value1")}
          />
        </RadioHeader>
      </label>

      <label
        className={`radio-card ${selected === "value2" ? "active" : ""}`}
        onClick={() => setSelected("value2")}
      >
        <RadioHeader>
          <span className="title">Yes</span>
          <input
            type="radio"
            name="binary-selector"
            value="value2"
            checked={selected === "value2"}
            onChange={() => setSelected("value2")}
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
