import { useState } from "react";
import { Box, IconButton, InputBase } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "styled-components";

type TimeUnit = "minutes" | "hours" | "days";

interface DurationState {
  minutes: string | number;
  hours: string | number;
  days: string | number;
}

export const DurationPicker = () => {
  const [duration, setDuration] = useState<DurationState>({
    minutes: "0",
    hours: "0",
    days: "1",
  });

  const isClampedUnit = (unit: TimeUnit) =>
    unit === "minutes" || unit === "hours";
  const clampValue = (value: number, unit: TimeUnit) =>
    isClampedUnit(unit) ? Math.min(59, Math.max(0, value)) : Math.max(0, value);

  const handleChange = (unit: TimeUnit, value: string) => {
    if (value === "") {
      setDuration((prev) => ({ ...prev, [unit]: "" }));
      return;
    }

    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      setDuration((prev) => ({ ...prev, [unit]: clampValue(num, unit) }));
    }
  };

  const handleBlur = (unit: TimeUnit) => {
    setDuration((prev) => ({
      ...prev,
      [unit]: prev[unit] === "" ? 0 : prev[unit],
    }));
  };

  const increment = (unit: TimeUnit) => {
    setDuration((prev) => {
      const current =
        typeof prev[unit] === "string"
          ? parseInt(prev[unit] || "0", 10)
          : prev[unit];
      return { ...prev, [unit]: clampValue(current + 1, unit) };
    });
  };

  const decrement = (unit: TimeUnit) => {
    setDuration((prev) => {
      const current =
        typeof prev[unit] === "string"
          ? parseInt(prev[unit] || "0", 10)
          : prev[unit];
      return { ...prev, [unit]: clampValue(current - 1, unit) };
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
              value={duration[unit]}
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
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border: 1px solid #e6e6ff;
  margin-top: 8px;
  gap: 12px;
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
