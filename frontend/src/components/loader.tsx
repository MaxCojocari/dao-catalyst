import { CircularProgress } from "@mui/material";
import styled from "styled-components";

interface Props {
  fullScreen?: boolean;
  size?: number;
}

export const Loader = ({ fullScreen = true, size = 48 }: Props) =>
  fullScreen ? (
    <FullScreen>
      <CircularProgress size={size} />
    </FullScreen>
  ) : (
    <CircularProgress size={size} />
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
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1301;
`;
