import { useState } from "react";
import copyIcon from "../assets/images/copy-icon.svg";
import { isAddress } from "viem";
import styled from "styled-components";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";

interface AddressInputProps {
  address: string;
  onChange: (val: string) => void;
}

export const AddressInput = ({ address, onChange }: AddressInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const formatAddress = (addr: string) => {
    if (!isAddress(addr)) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
  };

  const openInExplorer = (addr: string) => {
    if (isAddress(address)) {
      const url = `https://arbiscan.io/address/${addr}`;
      window.open(url, "_blank");
    }
  };

  return (
    <Container>
      <Input
        value={isFocused ? address.trim() : formatAddress(address.trim())}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Enter address..."
      />
      <img
        src={copyIcon}
        alt="copy-icon"
        width="20px"
        onClick={handleCopy}
        style={{ cursor: "pointer" }}
      />
      <OpenInNewRoundedIcon
        onClick={() => openInExplorer(address)}
        sx={{ cursor: "pointer", width: "20px", color: "#B8B8CC" }}
      />
    </Container>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  gap: 8px;
  box-sizing: border-box;
  height: 50px;

  background: #ffffff;
  border: 1px solid #e6e6ff;
  border-radius: 6px;

  &:focus-within {
    border: 2px solid rgba(102, 102, 255, 0.8);
  }
`;

export const Input = styled.input`
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  height: auto;
  width: 100%;

  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.03em;
  color: rgba(41, 41, 51, 0.9);

  &::placeholder {
    color: #8f8fb2;
  }
`;
