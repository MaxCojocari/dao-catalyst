import { Fragment, useState } from "react";
import styled from "styled-components";
import { TOKENS } from "../../../constants";
import { Token } from "../../../types";

export const TokensDropdown = ({
  selectedToken,
  setSelectedToken,
  style,
}: {
  selectedToken: Token;
  setSelectedToken: (v: Token) => void;
  style: any;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: Token) => {
    setSelectedToken(option);
    setIsOpen(false);
  };

  return (
    <Wrapper style={style}>
      <>
        <p>Select token</p>
        <DropdownContainer onClick={() => setIsOpen((prev) => !prev)}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src={selectedToken.icon}
              width="20px"
              style={{ marginRight: "10px" }}
            />
            <SelectedOption>{selectedToken.symbol}</SelectedOption>
          </div>
          <ArrowDown />
        </DropdownContainer>
      </>

      {isOpen && (
        <DropdownList>
          {TOKENS.map((token, index) => (
            <Fragment key={token.symbol}>
              <DropdownItem
                key={token.symbol}
                onClick={() => handleSelect(token)}
              >
                <img
                  src={token.icon}
                  width="20px"
                  style={{ marginRight: "10px" }}
                />
                <span>{token.symbol}</span>
              </DropdownItem>
              {index < TOKENS.length - 1 && <Line />}
            </Fragment>
          ))}
        </DropdownList>
      )}
    </Wrapper>
  );
};

export const Line = styled.hr`
  width: 100%;
  height: 0;
  border: none;
  height: 0.5px;
  background-color: #e6e6ff;
  margin: 0;
`;

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
  margin-top: 12px;

  p {
    margin-top: 12px;
    margin-bottom: 8px;
  }
`;

export const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #fff;
  border: 1px solid #e6e6ff;
  border-radius: 6px;
  cursor: pointer;
  height: 50.4px;
  box-sizing: border-box;
`;

export const SelectedOption = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.03em;
  color: rgba(41, 41, 51, 0.9);
`;

export const ArrowDown = styled.div`
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid #292933;
`;

export const DropdownList = styled.div`
  position: absolute;
  top: 100%;
  margin-top: 4px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e6e6ff;
  border-radius: 6px;
  padding: 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 10;
  box-sizing: border-box;
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.03em;
  color: rgba(41, 41, 51, 0.9);
  cursor: pointer;

  &:hover {
    color: #6666ff;
  }
`;
