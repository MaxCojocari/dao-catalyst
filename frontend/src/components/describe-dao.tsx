import styled from "styled-components";
import stepIcon from "../assets/images/step1_icon.svg";
import { LogoUploader } from "./logo-uploader";

export const DescribeDao = () => {
  return (
    <>
      <Container>
        <Header>
          <img src={stepIcon} alt="step-icon" />
          <h1>Describe your DAO</h1>
          <h2>
            Give it a name and brief description to guide new contributors. This
            info appears on the Explore page and can be updated by vote.
          </h2>
        </Header>
        <Input>
          <a className="input-name">Name</a>
          <a className="input-description">Maximum of 128 characters</a>
          <input type="text" placeholder="Type your DAO's name" />
          <a className="input-description">0/128</a>
        </Input>
        <LogoUploader />
      </Container>
    </>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 80px 48px 48px;
  gap: 24px;
  width: 780px;
  background: #ffffff;
  box-shadow: 0px 1px 1px rgba(122, 122, 204, 0.08);
  border-radius: 8px;
  box-sizing: border-box;

  h1,
  h2,
  a,
  input {
    font-family: "Inter";
    font-style: normal;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;

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

export const Input = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .input-name {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;

    color: #555566;
  }

  .input-description {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.03em;

    color: #8f8fb2;
  }

  input[type="text"],
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

  input[type="text"]::placeholder {
    color: rgba(143, 143, 178, 0.9);
  }

  input[type="text"]:focus {
    outline-color: rgba(102, 102, 255, 0.8);
  }

  .custom-upload {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 149px;
  }
`;
