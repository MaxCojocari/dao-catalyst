import styled from "styled-components";
import { OptionalInputMetadata } from "../../optional-input-metadata";
import plusSign from "../../../assets/images/plus-sign.svg";
import deleteIcon from "../../../assets/images/delete-icon.svg";
import { $proposalInfo, updateProposalInfo } from "../../../store";
import { useUnit } from "effector-react";
import { AddButton } from "../../create-dao/components/distribution-table";

interface ResourcesMetadataProps {
  inputName: string;
  inputDescription: string;
}

export const Resources = ({ inputName, inputDescription }: ResourcesMetadataProps) => {
  const proposalInfo = useUnit($proposalInfo);

  const addRow = () => {
    updateProposalInfo({ resources: [...proposalInfo.resources, { label: "", url: "" }] });
  };

  const handleDelete = (index: number) => {
    const updated = proposalInfo.resources.filter((_, i) => i !== index);
    updateProposalInfo({ resources: updated });
  };

  const handleChange = (
    index: number,
    field: "label" | "url",
    value: string
  ) => {
    const updated = [...proposalInfo.resources];
    updated[index][field] = value;
    updateProposalInfo({ resources: updated });
  };

  return (
    <Container>
      <OptionalInputMetadata
        inputName={inputName}
        inputDescription={inputDescription}
      />
      <Grid>
        {proposalInfo.resources.length > 0 && (
          <>
            <Row>
              <p>Name/Description</p>
              <p>Link</p>
              <div style={{ width: "20px" }}></div>
            </Row>
            {proposalInfo.resources.map((link, index) => (
              <Row key={index}>
                <Input
                  type="text"
                  placeholder="Lens, Discord, etc."
                  value={link.label}
                  onChange={(e) => handleChange(index, "label", e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="https://"
                  value={link.url}
                  onChange={(e) => handleChange(index, "url", e.target.value)}
                />
                <img
                  src={deleteIcon}
                  alt="Delete"
                  onClick={() => handleDelete(index)}
                  style={{ width: "20px", cursor: "pointer" }}
                />
              </Row>
            ))}
          </>
        )}
      </Grid>
      <AddButton onClick={addRow} style={{ margin: "0" }}>
        <img src={plusSign} width="10px" />
        Add link
      </AddButton>
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

export const Grid = styled.div`
  p,
  input {
    flex: 1;
  }

  p {
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #555566;
  }
`;

export const Input = styled.input`
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

  &::placeholder {
    color: rgba(143, 143, 178, 0.9);
  }

  &:focus {
    outline-color: rgba(102, 102, 255, 0.8);
  }
`;
