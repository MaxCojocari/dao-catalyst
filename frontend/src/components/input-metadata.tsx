import styled from "styled-components";

interface InputProps {
  inputName: string;
  inputDescription: string;
}

export const InputMetadata = ({ inputName, inputDescription }: InputProps) => {
  return (
    <>
      <Container>
        <a className="input-name">{inputName}</a>
        <a className="input-description">{inputDescription}</a>
      </Container>
    </>
  );
};

export const Container = styled.div`
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
`;
