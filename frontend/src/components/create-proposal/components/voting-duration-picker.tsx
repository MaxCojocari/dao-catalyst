import { Box, IconButton, InputBase } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "styled-components";
import { $proposalInfo, updateProposalInfo } from "../../../store";
import { useUnit } from "effector-react";

type TimeUnit = "minutes" | "hours" | "days";

export const VotingDurationPicker = () => {
  const proposalInfo = useUnit($proposalInfo);
  const prevEndDuration = proposalInfo.endDuration;
  const prevMinDuration = proposalInfo.endDuration.duration;

  const isClampedUnit = (unit: TimeUnit) =>
    unit === "minutes" || unit === "hours";
  const clampValue = (value: number, unit: TimeUnit) => {
    if (unit === "minutes") {
      return Math.min(59, Math.max(0, value));
    } else if (unit === "hours") {
      return Math.min(23, Math.max(0, value));
    }
    return Math.max(0, value);
  };

  const handleChange = (unit: TimeUnit, value: string) => {
    if (value === "") {
      updateProposalInfo({
        endDuration: {
          ...prevEndDuration,
          duration: {
            ...prevMinDuration,
            [unit]: "",
          },
        },
      });
      return;
    }
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      updateProposalInfo({
        endDuration: {
          ...prevEndDuration,
          duration: {
            ...prevMinDuration,
            [unit]: clampValue(num, unit),
          },
        },
      });
    }
  };

  const handleBlur = (unit: TimeUnit) => {
    updateProposalInfo({
      endDuration: {
        ...prevEndDuration,
        duration: {
          ...prevMinDuration,
          [unit]: prevMinDuration[unit] === "" ? 0 : prevMinDuration[unit],
        },
      },
    });
  };

  const increment = (unit: TimeUnit) => {
    const current =
      typeof prevMinDuration[unit] === "string"
        ? parseInt(prevMinDuration[unit] || "0", 10)
        : prevMinDuration[unit];
    updateProposalInfo({
      endDuration: {
        ...prevEndDuration,
        duration: {
          ...prevMinDuration,
          [unit]: clampValue(current + 1, unit),
        },
      },
    });
  };

  const decrement = (unit: TimeUnit) => {
    const current =
      typeof prevMinDuration[unit] === "string"
        ? parseInt(prevMinDuration[unit] || "0", 10)
        : prevMinDuration[unit];

    updateProposalInfo({
      endDuration: {
        ...prevEndDuration,
        duration: {
          ...prevMinDuration,
          [unit]: clampValue(current - 1, unit),
        },
      },
    });
  };

  return (
    <RowContainer>
      {(["minutes", "hours", "days"] as TimeUnit[]).map((unit) => (
        <Box key={unit} sx={{ flex: 1 }}>
          <Label>{unit.charAt(0).toUpperCase() + unit.slice(1)}</Label>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderRadius: "8px",
              border: "1px solid #e6e6ff",
              padding: "6px",
              marginTop: "6px",
              alignItems: "center",
            }}
          >
            <IconButton onClick={() => decrement(unit)} size="small">
              <RemoveIcon fontSize="small" />
            </IconButton>
            <StyledInput
              type="number"
              value={proposalInfo.endDuration.duration[unit]}
              inputProps={{
                min: 0,
                max: isClampedUnit(unit) ? 59 : undefined,
              }}
              onChange={(e) => handleChange(unit, e.target.value)}
              onBlur={() => handleBlur(unit)}
            />
            <IconButton onClick={() => increment(unit)} size="small">
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      ))}
    </RowContainer>
  );
};

export const RowContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  gap: 12px;

  .css-1eh6zd8 {
    height: 50px;
    box-sizing: border-box;
  }
`;

export const Label = styled.a`
  font-size: 12px;
  font-weight: 600;
  line-height: 15px;
  letter-spacing: -0.03em;
  color: rgba(41, 41, 51, 0.9);
`;

export const StyledInput = styled(InputBase)`
  width: 100%;
  text-align: center;

  input {
    font-family: Inter, Arial;
    text-align: center;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: rgba(41, 41, 51, 0.9);
    padding: 0;
  }

  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
