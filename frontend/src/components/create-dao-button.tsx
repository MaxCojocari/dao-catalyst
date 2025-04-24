import styled from "styled-components";
import createIcon from "../assets/images/create-icon.svg";
import { useNavigate } from "react-router-dom";

export const CreateDaoButton = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate("/create-dao")}>
      <img src={createIcon} alt="create-icon" width="20px" />
      Create DAO
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
