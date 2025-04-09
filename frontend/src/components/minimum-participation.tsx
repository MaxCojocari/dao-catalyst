import { useState } from "react";
import { Box, IconButton, Slider } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";

const TOTAL_SUPPLY = 13000;

export const MinimumParticipation = () => {
  const [threshold, setThreshold] = useState(50);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setThreshold(typeof newValue === "number" ? newValue : newValue[0]);
  };

  const increment = () => setThreshold((prev) => Math.min(prev + 1, 100));
  const decrement = () => setThreshold((prev) => Math.max(prev - 1, 0));

  const tokenAmount = Math.round((threshold / 100) * TOTAL_SUPPLY);

  return (
    <Container>
      <Controls>
        <Box
          sx={{
            backgroundColor: "white",
            border: "1px solid #E6E6FF",
            borderRadius: "8px",
            p: 2,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "170px",
            }}
          >
            <IconButton onClick={decrement} size="small">
              <RemoveIcon />
            </IconButton>
            <p className="percentage-display">{threshold}%</p>
            <IconButton onClick={increment} size="small">
              <AddIcon />
            </IconButton>
          </div>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-between",
              mb: "-6px",
            }}
          >
            <SliderDetails>
              <p style={{ fontWeight: "600", color: "#6666FF" }}>
                ≥ {tokenAmount.toLocaleString()}
              </p>
              <p>of {TOTAL_SUPPLY.toLocaleString()} tokens</p>
            </SliderDetails>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Slider
                value={threshold}
                onChange={handleChange}
                min={0}
                max={100}
                defaultValue={50}
                sx={{ color: "#6666FF", width: "405.03px" }}
              />
            </div>
          </Box>
        </Box>
      </Controls>
    </Container>
  );
};

export const Container = styled.div`
  margin-top: 8px;
`;

export const Controls = styled.div`
  p {
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: rgba(41, 41, 51, 0.9);
  }
`;

export const SliderDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-contents: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 14px;

  p {
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.03em;
  }
`;
