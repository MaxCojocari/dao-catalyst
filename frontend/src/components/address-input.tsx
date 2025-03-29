import { useState } from "react";
import copyIcon from "../assets/images/copy-icon.svg";
import { isAddress } from "viem";
import styled from "styled-components";

export const AddressInput = ({ address }: { address: string }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState(address);

  const formatAddress = (addr: string) => {
    if (!isAddress(addr)) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
  };

  return (
    <Container>
      <Input
        value={isFocused ? inputValue.trim() : formatAddress(inputValue.trim())}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <img
        src={copyIcon}
        alt="copy-icon"
        width="20px"
        onClick={handleCopy}
        style={{ cursor: "pointer" }}
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
`;
