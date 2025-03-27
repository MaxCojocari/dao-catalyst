import styled from "styled-components";
import stepIcon from "../assets/images/step1_icon.svg";
import infoIcon from "../assets/images/info-icon.svg";
import backIcon from "../assets/images/back-icon.svg";
import { LogoUploader } from "./logo-uploader";
import { Links } from "./links";
import { InputMetadata } from "./input-metadata";

export const DescribeDao = () => {
  return (
    <>
      <Container>
        <BackButton>
          <img src={backIcon} alt="vector" />
          <a>Back</a>
        </BackButton>
        <Header>
          <img src={stepIcon} alt="step-icon" />
          <h1>Describe your DAO</h1>
        </Header>
        <StepInfo>
          <img src={infoIcon} style={{ width: "20px" }} />
          <h2>
            Give it a name and brief description to guide new contributors. This
            info appears on the Explore page and can be updated by vote.
          </h2>
        </StepInfo>
        <Input>
          <InputMetadata
            inputName="Name"
            inputDescription="Maximum of 128 characters"
          />
          <input type="text" placeholder="Type your DAO's name ..." />
          <a className="input-description">0/128</a>
        </Input>
        <LogoUploader />
        <Input>
          <InputMetadata
            inputName="Description"
            inputDescription="Briefly explain the mission of your DAO. This will appear on the
            Explore page to help others discover you."
          />
          <textarea placeholder="Type your summary ..."></textarea>
        </Input>
        <Links
          inputName="Links"
          inputDescription="Links to your DAO's website, social media profiles, or other you consider relevant."
        />
        <NextStepButton>Next Step</NextStepButton>
      </Container>
    </>
  );
};

export const Container = styled.div`
  position: relative;

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
  input,
  textarea {
    font-family: "Inter";
    font-style: normal;
  }
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
