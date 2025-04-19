import { Fragment, useState } from "react";
import styled from "styled-components";
import { ACTION_OPTIONS } from "../../../constants";
import { ActionType } from "../../../types";

export const ActionsDropdown = ({
  selectedOption,
  setSelectedOption,
}: {
  selectedOption: ActionType;
  setSelectedOption: (v: any) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <DropdownContainer onClick={() => setIsOpen((prev) => !prev)}>
        <SelectedOption>{String(selectedOption)}</SelectedOption>
        <ArrowDown />
      </DropdownContainer>

      {isOpen && (
        <DropdownList>
          {ACTION_OPTIONS.map((option, index) => (
            <Fragment key={option}>
              <DropdownItem key={option} onClick={() => handleSelect(option)}>
                <span key={`option-${index}`}>{option}</span>
              </DropdownItem>
              {index < ACTION_OPTIONS.length - 1 && <Line key={index} />}
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
  margin: 12px 0;
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
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  z-index: 10;
  box-sizing: border-box;
`;

export const DropdownItem = styled.div`
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
