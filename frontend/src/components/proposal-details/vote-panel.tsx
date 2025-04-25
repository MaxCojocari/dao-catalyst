import styled from "styled-components";
import { useState } from "react";
import { VoteButton } from "../common-styles";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { Button } from "../preview-styles";
import { VotingOption } from "../../types";

interface VotePanelProps {
  onSubmit: (option: string) => void;
  onCancel: () => void;
}

export const VotePanel = ({ onSubmit, onCancel }: VotePanelProps) => {
  const [selected, setSelected] = useState(VotingOption.Yes);

  return (
    <Container>
      <h2>Choose your option</h2>
      <p>
        To vote, you must select one of the following options and confirm in
        your wallet. Once the transaction is completed, your vote will be
        counted and displayed.
      </p>

      <RadioGroup
        value={selected}
        onChange={(e) => setSelected(e.target.value as VotingOption)}
      >
        {[VotingOption.Yes, VotingOption.No, VotingOption.Abstain].map(
          (option) => (
            <RadioCard
              key={option}
              value={option}
              control={<Radio size="small" />}
              label={
                <Label $isSelected={selected === option}>
                  <h3>{option}</h3>
                  <p>Your choice will be counted for "{option}"</p>
                </Label>
              }
              labelPlacement="start"
              $isSelected={selected === option}
            />
          )
        )}
      </RadioGroup>

      <Actions>
        <VoteButton
          disabled={!selected}
          onClick={() => selected && onSubmit(selected)}
        >
          Submit your vote
        </VoteButton>
        <Button onClick={onCancel} style={{ fontSize: "14px" }}>
          Cancel
        </Button>
      </Actions>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  h2 {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.03em;
    color: #292933;
  }

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.03em;
    color: #666680;
    margin: 8px 0;
  }

  label {
    margin: 4px 0;
  }
`;

const RadioCard = styled(FormControlLabel)<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  margin: 6px 0;
  border-radius: 6px;
  cursor: pointer;
  box-sizing: border-box;

  border: 2px solid;
  border-color: ${({ $isSelected }) =>
    $isSelected ? "#6666FF" : "transparent"};
  outline: ${({ $isSelected }) => ($isSelected ? "none" : "1px solid #e6e6ff")};

  span {
    padding: 0;
  }
`;

const Label = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h3 {
    font-weight: 600;
    font-size: 15px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: ${({ $isSelected }) => ($isSelected ? "#6666FF" : "#555566")};
  }

  p {
    margin: 0;

    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.03em;
    color: #666680;
  }
`;

const Actions = styled.div`
  margin-top: 18px;
  display: flex;
  gap: 12px;
`;
