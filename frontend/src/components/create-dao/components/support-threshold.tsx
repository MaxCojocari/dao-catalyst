import { Box, IconButton, Slider } from "@mui/material";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import successIcon from "../../../assets/images/done.svg";
import warningIcon from "../../../assets/images/warning.svg";
import { ConfirmationSuccess, Warning } from "../../common-styles";
import { useUnit } from "effector-react";
import { $daoInfo, setQuorumNumerator } from "../../../store";

export const SupportThreshold = () => {
  const daoInfo = useUnit($daoInfo);
  const threshold = daoInfo.quorum.numerator;

  const handleChange = (e: any) => {
    setQuorumNumerator(Number(e.target.value));
  };

  const increment = () => setQuorumNumerator(Math.min(threshold + 1, 100));
  const decrement = () => setQuorumNumerator(Math.max(threshold - 1, 0));

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
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              gap: "0",
              margin: "0 10px",
            }}
          >
            <p className="vote-label">Yes</p>
            <Slider
              value={threshold}
              onChange={handleChange}
              min={0}
              max={100}
              defaultValue={50}
              sx={{ color: "#6666FF", margin: "0 18px" }}
              valueLabelDisplay="auto"
            />
            <p className="vote-label">No</p>
          </div>
        </Box>
      </Controls>
      {threshold > 50 && (
        <ConfirmationSuccess>
          <img src={successIcon} width="14px" style={{ marginRight: "8px" }} />
          <p>Proposal will be approved by majority</p>
        </ConfirmationSuccess>
      )}
      {threshold < 50 && (
        <Warning>
          <img
            src={warningIcon}
            width="14px"
            style={{ marginRight: "8px", marginTop: "3px" }}
          />
          <p>Proposal could be approved by a minority rather than a majority</p>
        </Warning>
      )}
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
