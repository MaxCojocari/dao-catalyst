import styled from "styled-components";
import delegateIcon from "../assets/images/delegate.svg";

export const DelegateButton = () => {
  return (
    <Button>
      <img src={delegateIcon} style={{ color: "#6666FF", width: "20px" }} />
      Delegate
    </Button>
  );
};

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 12px;
  gap: 8px;
  height: 40px;

  background: #ffffff;
  border: 1px solid #e6e6ff;
  border-radius: 6px;

  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.03em;

  color: #6666ff;

  cursor: pointer;
`;
