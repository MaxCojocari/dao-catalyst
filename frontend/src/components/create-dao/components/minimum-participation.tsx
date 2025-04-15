import { Box, IconButton, Slider } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import { useUnit } from "effector-react";
import { $daoInfo, setMinimumParticipationNumerator } from "../../../store";

export const MinimumParticipation = () => {
  const daoInfo = useUnit($daoInfo);
  const threshold = daoInfo.minimumParticipation.numerator;

  const handleChange = (_: Event, newValue: number | number[]) => {
    setMinimumParticipationNumerator(
      typeof newValue === "number" ? newValue : newValue[0]
    );
  };

  const increment = () =>
    setMinimumParticipationNumerator(Math.min(threshold + 1, 100));
  const decrement = () =>
    setMinimumParticipationNumerator(Math.max(threshold - 1, 0));

  const totalSupply = daoInfo.token.isDeployed
    ? daoInfo.token.totalSupply
    : daoInfo.token.initialDistribution.reduce(
        (acc, recipient) => acc + Number(recipient.tokens),
        0
      );
  const tokenAmount = ((threshold / 100) * totalSupply).toFixed(1);

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
              <p
                style={{
                  fontWeight: "600",
                  color: "#6666FF",
                  marginRight: "5px",
                }}
              >
                ≥ {tokenAmount.toLocaleString()}
              </p>
              <p>of {totalSupply.toLocaleString()} tokens</p>
            </SliderDetails>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Slider
                value={threshold}
                onChange={handleChange}
                min={0}
                max={100}
                defaultValue={50}
                sx={{ color: "#6666FF", width: "405.03px", marginTop: "-8px" }}
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
  justify-content: flex-end;
  align-contents: center;
  width: 100%;
  box-sizing: border-box;
  padding: 0 14px;
  margin-top: -10px;

  p {
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.03em;
  }
`;
