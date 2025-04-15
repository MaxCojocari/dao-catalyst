import { useRef, useState } from "react";
import uploadFileIcon from "../../../assets/images/upload-file.svg";
import styled from "styled-components";
import deleteIcon from "../../../assets/images/delete-icon.svg";
import { OptionalInputMetadata } from "../../optional-input-metadata";

export const LogoUploader = () => {
  const [, setLogo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [, setIsDragging] = useState(false);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      setLogo(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDelete = () => {
    setLogo(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Container>
        <OptionalInputMetadata
          inputName="Logo"
          inputDescription="JPG, PNG or GIF of no more than 3MB. We recommend 1024x1024px."
        />

        {previewUrl && (
          <UploadedPreview>
            <img
              src={previewUrl}
              className="upload-preview"
              alt="uploaded-preview"
            />
            <img
              src={deleteIcon}
              onClick={handleDelete}
              style={{ marginLeft: "8px", width: "20px", cursor: "pointer" }}
            />
          </UploadedPreview>
        )}

        <input
          type="file"
          id="file-upload"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleUpload}
        />
        <label
          htmlFor="file-upload"
          className="custom-upload"
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
        >
          <img
            src={uploadFileIcon}
            style={{ width: "73px", height: "61px" }}
            alt="upload"
          />
        </label>
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

  .custom-upload {
    margin-top: 8px;
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

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 149px;
  }
`;

export const UploadedPreview = styled.div`
  .upload-preview {
    margin-top: 12px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center;
  }
`;

export const DeleteIcon = styled.img`
  margin-left: 8px;
  width: 20px;
  cursor: pointer;
`;
