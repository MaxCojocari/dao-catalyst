import { useState } from "react";
import { Box, IconButton, Slider } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import styled from "styled-components";
import { TEST_DAO_INFO as dao } from "../constants";
import { Container, Controls } from "./minimum-participation";
import { ConfirmationSuccess, Warning } from "./create-dao/common-styles";
import successIcon from "../assets/images/done.svg";
import warningIcon from "../assets/images/warning.svg";

export const MinimumParticipationMultisig = () => {
  const minParticipation = Math.ceil((dao.members.length * 2) / 3);
  const [threshold, setThreshold] = useState(minParticipation);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setThreshold(typeof newValue === "number" ? newValue : newValue[0]);
  };

  const increment = () =>
    setThreshold((prev) => Math.min(prev + 1, dao.members.length));
  const decrement = () => setThreshold((prev) => Math.max(prev - 1, 0));

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
            <p className="percentage-display">{threshold}</p>
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
                  marginRight: "4px",
                }}
              >
                {threshold}
              </p>
              <p>out of {dao.members.length} addresses</p>
            </SliderDetails>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Slider
                value={threshold}
                onChange={handleChange}
                min={0}
                max={dao.members.length}
                defaultValue={minParticipation}
                sx={{ color: "#6666FF", width: "405.03px" }}
                valueLabelDisplay="auto"
              />
            </div>
          </Box>
        </Box>
      </Controls>
      {threshold >= minParticipation && (
        <ConfirmationSuccess>
          <img src={successIcon} width="14px" style={{ marginRight: "8px" }} />
          <p>Proposal will be approved by majority</p>
        </ConfirmationSuccess>
      )}
      {threshold < minParticipation && (
        <Warning>
          <img src={warningIcon} width="14px" style={{ marginRight: "8px" }} />
          <p>Proposal could be approved by a minority rather than a majority</p>
        </Warning>
      )}
    </Container>
  );
};

export const SliderDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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
