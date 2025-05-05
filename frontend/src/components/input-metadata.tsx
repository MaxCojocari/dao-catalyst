import styled from "styled-components";

interface InputProps {
  inputName: string;
  inputDescription?: string;
  inputNameStyle?: any;
}

export const InputMetadata = ({
  inputName,
  inputDescription,
  inputNameStyle,
}: InputProps) => {
  return (
    <>
      <Container>
        <InputName style={inputNameStyle}>{inputName}</InputName>
        {inputDescription && (
          <InputDescription>{inputDescription}</InputDescription>
        )}
      </Container>
    </>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InputName = styled.h2`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.02em;
  color: #555566;
`;

export const InputDescription = styled.p`
  font-weight: 400;
  font-size: 12px;
  line-height: 15px;
  letter-spacing: -0.03em;
  color: #8f8fb2;
`;
