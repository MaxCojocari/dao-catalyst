import styled from "styled-components";
import { NextStepButton } from "../common-styles";

export const VoteButton = ({ text }: { text: string }) => {
  return <Container>{text}</Container>;
};

export const Container = styled(NextStepButton)`
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 32px;
  gap: 8px;

  width: auto;
  height: 47px;

  border-radius: 6px;

  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.02em;
  color: #ffffff;
`;
