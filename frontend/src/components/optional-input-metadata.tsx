import styled from "styled-components";
import optionalTagIcon from "../assets/images/optional-tag.svg";

interface OptionalInputProps {
  inputName: string;
  inputDescription: string;
}

export const OptionalInputMetadata = ({
  inputName,
  inputDescription,
}: OptionalInputProps) => {
  return (
    <>
      <Container>
        <a
          className="input-name"
          style={{ display: "flex", alignItems: "center" }}
        >
          {inputName}
          <img
            src={optionalTagIcon}
            style={{
              width: "55px",
              height: "20px",
              marginLeft: "10px",
              marginBottom: "-2px",
            }}
          />
        </a>
        <a className="input-description">{inputDescription}</a>
      </Container>
    </>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

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
`;
