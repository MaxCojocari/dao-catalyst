import styled from "styled-components";
import { OptionalInputMetadata } from "./optional-input-metadata";
import addLinkIcon from "../assets/images/add-link-icon.svg";
import deleteIcon from "../assets/images/delete-icon.svg";
import { useState } from "react";

interface LinksMetadataProps {
  inputName: string;
  inputDescription: string;
}

export const Links = ({ inputName, inputDescription }: LinksMetadataProps) => {
  const [links, setLinks] = useState([{ name: "", url: "" }]);

  const addRow = () => {
    setLinks([...links, { name: "", url: "" }]);
  };

  const handleDelete = (index: number) => {
    const updated = links.filter((_, i) => i !== index);
    setLinks(updated);
  };

  const handleChange = (
    index: number,
    field: "name" | "url",
    value: string
  ) => {
    const updated = [...links];
    updated[index][field] = value;
    setLinks(updated);
  };

  return (
    <Container>
      <OptionalInputMetadata
        inputName={inputName}
        inputDescription={inputDescription}
      />
      <Grid>
        {links.length > 0 && (
          <>
            <Row>
              <a>Name/Description</a>
              <a>Link</a>
              <div style={{ width: "20px" }}></div>
            </Row>
            {links.map((link, index) => (
              <Row key={index}>
                <input
                  type="text"
                  placeholder="Lens, Discord, etc."
                  value={link.name}
                  onChange={(e) => handleChange(index, "name", e.target.value)}
                />
                <input
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
      <img
        src={addLinkIcon}
        onClick={addRow}
        style={{
          width: "72px",
          height: "16px",
          cursor: "pointer",
        }}
      />
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
  a,
  input {
    flex: 1;
  }

  a {
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #555566;
  }

  input {
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

  input::placeholder {
    color: rgba(143, 143, 178, 0.9);
  }

  input:focus {
    outline-color: rgba(102, 102, 255, 0.8);
  }
`;
