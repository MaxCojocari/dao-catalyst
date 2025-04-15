import styled from "styled-components";
import { OptionalInputMetadata } from "../../optional-input-metadata";
import plusSign from "../../../assets/images/plus-sign.svg";
import deleteIcon from "../../../assets/images/delete-icon.svg";
import { AddWalletButton } from "./distribution-table";
import { $daoInfo, updateDaoInfo } from "../../../store";
import { useUnit } from "effector-react";

interface LinksMetadataProps {
  inputName: string;
  inputDescription: string;
}

export const Links = ({ inputName, inputDescription }: LinksMetadataProps) => {
  const daoInfo = useUnit($daoInfo);

  const addRow = () => {
    updateDaoInfo({ links: [...daoInfo.links, { label: "", url: "" }] });
  };

  const handleDelete = (index: number) => {
    const updated = daoInfo.links.filter((_, i) => i !== index);
    updateDaoInfo({ links: updated });
  };

  const handleChange = (
    index: number,
    field: "label" | "url",
    value: string
  ) => {
    const updated = [...daoInfo.links];
    updated[index][field] = value;
    updateDaoInfo({ links: updated });
  };

  return (
    <Container>
      <OptionalInputMetadata
        inputName={inputName}
        inputDescription={inputDescription}
      />
      <Grid>
        {daoInfo.links.length > 0 && (
          <>
            <Row>
              <p>Name/Description</p>
              <p>Link</p>
              <div style={{ width: "20px" }}></div>
            </Row>
            {daoInfo.links.map((link, index) => (
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
      <AddWalletButton onClick={addRow} style={{ margin: "0" }}>
        <img src={plusSign} width="10px" />
        Add link
      </AddWalletButton>
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
