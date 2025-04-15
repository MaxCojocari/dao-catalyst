import styled from "styled-components";
import { Description, RadioGroup, RadioHeader } from "./voting-method-selector";
import { GenericProps } from "../../../types";
import { ANY_WALLET, TOKEN_HOLDERS } from "../../../constants";
import { Box, IconButton } from "@mui/material";
import { StyledInput } from "./duration-picker";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { $daoInfo, updateDaoInfo } from "../../../store";
import { useUnit } from "effector-react";
import { Warning } from "../../common-styles";
import warningIcon from "../../../assets/images/warning.svg";

export const ProposalCreationSettings = ({ value, onChange }: GenericProps) => {
  const daoInfo = useUnit($daoInfo);
  const prevValue = daoInfo.proposalCreationMinVotingPower;

  const handleChange = (val: string) => {
    if (val === "") {
      updateDaoInfo({ proposalCreationMinVotingPower: "" });
      return;
    }
    updateDaoInfo({ proposalCreationMinVotingPower: Math.max(0, Number(val)) });
  };

  const handleBlur = () => {
    if (prevValue === "") updateDaoInfo({ proposalCreationMinVotingPower: "" });
  };

  const increment = () =>
    updateDaoInfo({
      proposalCreationMinVotingPower: Math.min(999999, Number(prevValue) + 1),
    });
  const decrement = () =>
    updateDaoInfo({
      proposalCreationMinVotingPower: Math.max(0, Number(prevValue) - 1),
    });

  return (
    <>
      <Container>
        <Requirement>
          <p>Who is eligible?</p>
          <RadioGroup>
            <p
              style={{
                fontWeight: "500",
                fontSize: "14px",
                lineHeight: "17px",
                letterSpacing: "-0.02em",
                color: "#555566",
              }}
            ></p>
            <div
              className={`radio-card ${
                value === TOKEN_HOLDERS ? "active" : ""
              }`}
              onClick={() => onChange(TOKEN_HOLDERS)}
            >
              <RadioHeader>
                <p className="title">Token holders</p>
                <input
                  type="radio"
                  value={TOKEN_HOLDERS}
                  checked={value === TOKEN_HOLDERS}
                  onChange={() => onChange(TOKEN_HOLDERS)}
                />
              </RadioHeader>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Description>
                  Only token holders with at least the minimum required balance
                  or delegates minimum required voting power can create
                  proposals.
                </Description>
                <div style={{ width: "35px" }}></div>
              </div>
            </div>

            <div
              className={`radio-card ${value === ANY_WALLET ? "active" : ""}`}
              onClick={() => onChange(ANY_WALLET)}
            >
              <RadioHeader>
                <p className="title">Any wallet</p>
                <input
                  type="radio"
                  value={ANY_WALLET}
                  checked={value === ANY_WALLET}
                  onChange={() => onChange(ANY_WALLET)}
                />
              </RadioHeader>
              <Description>
                Any connected wallet can create proposals.
              </Description>
            </div>
          </RadioGroup>
        </Requirement>
        <Requirement>
          <p>Minimum requirement</p>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "12px",
              border: "1px solid #e6e6ef",
              padding: "8px 16px",
              marginTop: "12px",
              width: "270px",
              height: "44px",
              backgroundColor: "#fff",
              boxSizing: "border-box",
              gap: 4,
            }}
          >
            <IconButton
              onClick={() => decrement()}
              size="small"
              sx={{ p: 0.5 }}
              disabled={value === ANY_WALLET}
            >
              <RemoveIcon fontSize="small" />
            </IconButton>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <p>≥</p>
              <StyledInput
                type="number"
                placeholder="0"
                value={daoInfo.proposalCreationMinVotingPower}
                onChange={(e) => handleChange(e.target.value)}
                onBlur={handleBlur}
                disabled={value === ANY_WALLET}
              />
            </Box>

            <IconButton
              onClick={() => increment()}
              size="small"
              sx={{ p: 0.5 }}
              disabled={value === ANY_WALLET}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Requirement>
      </Container>
      {value === ANY_WALLET && (
        <Warning>
          <img
            src={warningIcon}
            width="14px"
            style={{ marginRight: "8px", marginTop: "3px" }}
          />
          <p>
            With anyone being able to propose, there is a risk of proposal spam.
            Consider having a minimum token threshold.
          </p>
        </Warning>
      )}
    </>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

export const Requirement = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 12px;

  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: #555566;
  }
`;
