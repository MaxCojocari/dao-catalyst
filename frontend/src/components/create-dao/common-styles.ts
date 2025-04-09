import styled from "styled-components";

export const Container = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;
  padding: 80px 48px 48px;
  gap: 38px;
  width: 780px;
  background: #ffffff;
  box-shadow: 0px 1px 1px rgba(122, 122, 204, 0.08);
  border-radius: 8px;
  box-sizing: border-box;
`;

export const BackButton = styled.div`
  position: absolute;
  left: 48px;
  top: 41px;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6px;

  cursor: pointer;

  img {
    width: 12.5px;
    height: 12px;
  }

  a {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: #6666ff;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-top: 10px;
    font-weight: 700;
    font-size: 32px;
    line-height: 51px;
    text-align: center;
    letter-spacing: -0.03em;

    color: #292933;
  }

  h2 {
    width: 458px;
    margin-top: 10px;

    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.02em;

    color: #666680;
  }
`;

export const StepInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 32px 70px;
  gap: 8px;
  box-sizing: border-box;
  width: 100%;

  background: rgba(102, 102, 255, 0.05);
  border: 1px solid rgba(102, 102, 255, 0.2);
  border-radius: 6px;

  h2 {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    letter-spacing: -0.02em;
    color: #666680;
  }
`;

export const Input = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .input-description {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.03em;

    color: #8f8fb2;
  }

  input[type="text"],
  textarea,
  .custom-upload {
    margin: 8px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    gap: 8px;
    box-sizing: border-box;
    height: 50px;
    color: rgba(41, 41, 51, 0.9);

    background: #ffffff;
    border: 1px solid #e6e6ff;
    border-radius: 6px;
    transition: border 0.2s ease;

    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.03em;
  }

  input[type="text"]::placeholder,
  textarea::placeholder {
    color: rgba(143, 143, 178, 0.9);
  }

  input[type="text"]:focus,
  textarea:focus {
    outline-color: rgba(102, 102, 255, 0.8);
  }

  textarea {
    min-height: 140px;
    resize: vertical;
  }
`;

export const NextStepButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 17px 24px;
  box-sizing: border-box;

  cursor: pointer;

  width: 100%;
  height: 48px;

  background: #6666ff;
  border-radius: 6px;
  border: none;

  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.02em;

  color: #ffffff;

  transition: opacity 0.15s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.7;
  }
`;
