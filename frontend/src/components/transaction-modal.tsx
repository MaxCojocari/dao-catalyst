import { Modal, CircularProgress } from "@mui/material";
import styled from "styled-components";
import { TxStatus } from "../types";
import modalSuccess from "../assets/images/modal-success.svg";
import modalFailure from "../assets/images/modal-failure.svg";
import closeIcon from "../assets/images/close-icon.svg";

interface TransactionModalProps {
  status: TxStatus;
  txHash?: string | null;
  onClose: () => void;
  titleWaiting?: string;
  titleSubmitted?: string;
  descriptionWaiting?: string;
  descriptionSubmitted?: string;
  successLabel?: string;
  explorerUrl?: string;
}

export const TransactionModal = ({
  status,
  txHash,
  onClose,
  titleWaiting = "Waiting for Confirmation",
  titleSubmitted = "Transaction Submitted",
  descriptionWaiting = "Confirm this transaction in your wallet",
  successLabel = "Close",
  explorerUrl = "https://arbiscan.io/tx/",
}: TransactionModalProps) => {
  return (
    <Modal
      open={status !== TxStatus.Idle}
      onClose={onClose}
      sx={{
        background: "rgba(143, 143, 204, 0.2)",
        backdropFilter: "blur(8px)",
      }}
    >
      <ModalBox>
        <CloseIcon src={closeIcon} width="14px" onClick={onClose} />
        {status === TxStatus.Waiting && (
          <>
            <h2>{titleWaiting}</h2>
            <CircularProgress
              size={80}
              thickness={1}
              sx={{ color: "#6666FF" }}
            />
            <p>{descriptionWaiting}</p>
          </>
        )}
        {status === TxStatus.Submitted && (
          <>
            <h2>{titleSubmitted}</h2>
            <img src={modalSuccess} width="80px" />
            {txHash && (
              <a
                href={`${explorerUrl}${txHash}`}
                target="_blank"
                rel="noreferrer"
              >
                View on Arbiscan
              </a>
            )}
            <ModalCloseButton onClick={onClose}>
              {successLabel}
            </ModalCloseButton>
          </>
        )}
        {status === TxStatus.Failed && (
          <>
            <h2>Transaction Failed</h2>
            <img src={modalFailure} width="80px" />
            <ModalCloseButton onClick={onClose}>Close</ModalCloseButton>
          </>
        )}
      </ModalBox>
    </Modal>
  );
};

export const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 48px 40px;
  background: #ffffff;
  border-radius: 8px;
  isolation: isolate;
  box-sizing: border-box;

  position: absolute;
  width: 380px;
  height: 342px;
  left: calc(50% - 380px / 2);
  top: calc(50% - 342px / 2);

  * {
    font-family: "Inter";
    font-style: normal;
  }

  h2 {
    font-weight: 700;
    font-size: 18px;
    line-height: 140%;
    text-align: center;
    letter-spacing: -0.03em;
    color: #292933;
  }

  p {
    font-weight: 400;
    font-size: 11px;
    line-height: 150%;
    letter-spacing: -0.02em;
    color: #8f8fb2;
  }

  a {
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #6666ff;
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    text-decoration: underline;
  }
`;

export const ModalCloseButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;
  box-sizing: border-box;
  cursor: pointer;

  width: 100%;
  height: 47px;

  background: #ffffff;
  border: 1px solid #e6e6ff;
  border-radius: 6px;

  font-weight: 600;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.02em;

  color: #b8b8cc;
`;

export const CloseIcon = styled.img`
  position: absolute;
  width: 12px;
  height: 12px;
  left: 330px;
  top: 30px;
  cursor: pointer;
`;
