import { Modal } from "@mui/material";
import styled from "styled-components";
import closeIcon from "../assets/images/close-icon.svg";
import rejectIcon from "../assets/images/reject.svg";

interface ErrorModalProps {
  name: string;
  summary: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ErrorModal = ({
  name,
  summary,
  open,
  setOpen,
}: ErrorModalProps) => {
  return (
    <Modal
      open={open}
      sx={{
        background: "rgba(143, 143, 204, 0.2)",
        backdropFilter: "blur(8px)",
      }}
    >
      <ModalBox>
        <CloseIcon
          src={closeIcon}
          width="14px"
          onClick={() => setOpen(false)}
        />
        <Body>
          <img src={rejectIcon} width="80px" />
          <h3>{name}</h3>
          <p>{summary}</p>
        </Body>
        <ButtonGroup>
          <CancelButton onClick={() => setOpen(false)}>Learn more</CancelButton>
          <TryAgainButton onClick={() => setOpen(false)}>
            Ok, understood
          </TryAgainButton>
        </ButtonGroup>
      </ModalBox>
    </Modal>
  );
};

export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 48px 32px 32px;
  isolation: isolate;
  box-sizing: border-box;

  position: absolute;
  width: 419px;
  height: 360px;
  left: calc(50% - 419px / 2);
  top: calc(50% - 360px / 2);

  background: rgba(143, 143, 204, 0.2);
  backdrop-filter: blur(8px);

  background: #ffffff;
  border-radius: 16px;

  * {
    font-family: "Inter";
    font-style: normal;
  }
`;

export const CloseIcon = styled.img`
  position: absolute;
  width: 12px;
  height: 12px;
  left: 375px;
  top: 30px;
  cursor: pointer;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;

  h3 {
    font-weight: 600;
    font-size: 18px;
    line-height: 130%;
    letter-spacing: -0.03em;
    color: #292933;
  }

  p {
    font-weight: 400;
    font-size: 13px;
    line-height: 150%;
    letter-spacing: -0.02em;
    color: #666680;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  width: 100%;

  .try-again {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #6666ff;
    border-radius: 6px;
    height: 48px;
    width: 100%;

    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: #ffffff;
  }
`;

export const CancelButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 48px;
  flex: 1;

  cursor: pointer;

  background: #ffffff;
  border: 1px solid rgba(102, 102, 255, 0.2);
  border-radius: 6px;

  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.02em;
  color: #6666ff;
`;

export const TryAgainButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: #6666ff;
  border-radius: 6px;
  border: none;
  height: 48px;

  flex: 1;

  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.02em;
  color: #ffffff;

  cursor: pointer;

  opacity: 1;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.7;
  }
`;
