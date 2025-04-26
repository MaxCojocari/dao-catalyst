import { CircularProgress } from "@mui/material";
import styled from "styled-components";

interface Props {
  fullScreen?: boolean;
  size?: number;
}

export const Loader = ({ fullScreen = true, size = 48 }: Props) =>
  fullScreen ? (
    <FullScreen>
      <CircularProgress size={size} sx={{ color: "#6666FF" }} />
    </FullScreen>
  ) : (
    <CircularProgress size={size} sx={{ color: "#6666FF" }} />
  );

const FullScreen = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(1, 1, 85, 0.2);
  backdrop-filter: blur(8px);
  z-index: 9999;
`;
