import styled from "styled-components";
import closeIcon from "../assets/images/close-icon.svg";
import delegateIcon from "../assets/images/delegate-icon.svg";
import {
  CircularProgress,
  Divider,
  FormControlLabel,
  Modal,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AddressInput } from ".";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { wagmiConfig } from "../utils/provider";
import { DaoSimpleVote__factory, DaoToken__factory } from "../typechain-types";
import { useParams } from "react-router-dom";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { Success } from "./common-styles";
import successIcon from "../assets/images/done.svg";

enum DelegateOption {
  HimSelf = "Claim your voting power",
  ToSomebody = "Delegate to someone else",
}

interface DelegateModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const DelegateModal = ({ open, setOpen }: DelegateModalProps) => {
  const [disabled, setDisabled] = useState(false);
  const [selected, setSelected] = useState(DelegateOption.ToSomebody);
  const [delegatee, setDelegatee] = useState<string>("");
  const [status, setStatus] = useState<"success" | "error" | null>(null);
  const { writeContractAsync } = useWriteContract();
  const { address } = useAccount();
  const { daoAddress } = useParams();
  const { data: token } = useReadContract({
    address: daoAddress as `0x{string}`,
    abi: DaoSimpleVote__factory.abi,
    functionName: "token",
  });

  const handleDelegation = async () => {
    if (selected === DelegateOption.ToSomebody && !delegatee) return;

    try {
      setDisabled(true);
      const hash = await writeContractAsync({
        address: token?.toString() as `0x${string}`,
        abi: DaoToken__factory.abi,
        functionName: "delegate",
        args: [
          selected === DelegateOption.ToSomebody
            ? (delegatee as `0x{string}`)
            : (address as `0x{string}`),
        ],
      });

      const receipt = await waitForTransactionReceipt(wagmiConfig, { hash });
      setStatus(receipt.status === "success" ? "success" : "error");
      setDisabled(false);
    } catch (error) {
      setStatus("error");
      console.error("Transaction failed:", error);
    } finally {
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 9000);
      return () => clearTimeout(timer);
    }
  }, [status]);

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
        <Header>
          <img src={delegateIcon} width="80px" />
          <h2>Delegation</h2>
          <p>
            Tokens determine voting power. They must be delegated before the
            start of the next proposal to be considered.
          </p>
        </Header>
        <Divider
          sx={{
            borderColor: "rgba(102, 102, 255, 0.1)",
            borderBottomWidth: "1px",
            my: "10px",
            width: "100%",
          }}
        />
        <Body>
          <Input>
            <h3 style={{ marginBottom: "6px" }}>
              What do you want to do with your delegation?
            </h3>
            <RadioGroup
              value={selected}
              onChange={(e) => setSelected(e.target.value as DelegateOption)}
            >
              {[DelegateOption.HimSelf, DelegateOption.ToSomebody].map(
                (option) => (
                  <RadioCard
                    key={option}
                    value={option}
                    control={<Radio size="small" />}
                    label={
                      <Label $isSelected={selected === option}>
                        <p>{option}</p>
                      </Label>
                    }
                    labelPlacement="start"
                    $isSelected={selected === option}
                  />
                )
              )}
            </RadioGroup>
          </Input>
          {selected === DelegateOption.ToSomebody && (
            <Input>
              <h3>Your delegation</h3>
              <p>Enter a wallet address to delegate your votes to.</p>
              <AddressInput
                address={delegatee}
                onChange={(val) => setDelegatee(val)}
              />
            </Input>
          )}
        </Body>
        <ButtonGroup>
          <CancelButton onClick={() => setOpen(false)}>Cancel</CancelButton>
          <Button onClick={handleDelegation} $disabled={disabled}>
            {disabled ? (
              <div
                style={{ display: "flex", flexDirection: "row", gap: "12px" }}
              >
                <CircularProgress
                  size={14}
                  thickness={5}
                  sx={{
                    color: "white",
                    marginTop: "2px",
                    marginRight: "2px",
                  }}
                />
                <p>Delegating</p>
              </div>
            ) : (
              "Delegate"
            )}
          </Button>
        </ButtonGroup>

        {status === "success" && (
          <Success style={{ margin: 0 }}>
            <img
              src={successIcon}
              width="14px"
              style={{ marginRight: "8px" }}
            />
            <p style={{ fontSize: "14px" }}>Delegated successfully!</p>
          </Success>
        )}

        {status === "error" && (
          <ErrorText>
            <InfoOutlineIcon
              sx={{ width: 18, marginRight: "6px", color: "#de3c48" }}
            />
            <p>Transaction failed, try again.</p>
          </ErrorText>
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
  padding: 48px 32px 32px;
  isolation: isolate;
  box-sizing: border-box;

  position: absolute;
  width: 419px;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;

  background: rgba(143, 143, 204, 0.2);
  backdrop-filter: blur(8px);

  background: #ffffff;
  border-radius: 16px;

  * {
    font-family: "Inter";
    font-style: normal;
  }

  gap: 20px;
`;

export const CloseIcon = styled.img`
  position: absolute;
  width: 12px;
  height: 12px;
  left: 375px;
  top: 30px;
  cursor: pointer;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;

  h2 {
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
    text-align: center;
    letter-spacing: -0.02em;
    color: #666680;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
`;

export const Input = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  h3 {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;
    color: #555566;
  }

  p {
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.03em;
    color: #8f8fb2;
    margin-bottom: 12px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
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

export const Button = styled.button<{ $disabled: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  height: 48px;
  width: 100%;
  border: none;
  flex: 1;

  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.02em;
  color: #ffffff;

  cursor: ${({ $disabled }) => ($disabled ? "default" : "pointer")};

  background: ${({ $disabled }) => ($disabled ? "#b8b8cc" : "#6666ff")};
  opacity: ${({ $disabled }) => ($disabled ? 1 : 1)};
  transition: opacity 0.15s;

  &:hover {
    opacity: ${({ $disabled }) => ($disabled ? 1 : 0.8)};
  }

  &:active {
    opacity: ${({ $disabled }) => ($disabled ? 1 : 0.7)};
  }
`;

const RadioCard = styled(FormControlLabel)<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 14px;
  margin: 6px 0 !important;
  border-radius: 6px;
  cursor: pointer;
  box-sizing: border-box;

  border: 2px solid;
  border-color: ${({ $isSelected }) =>
    $isSelected ? "#6666FF" : "transparent"};
  outline: ${({ $isSelected }) => ($isSelected ? "none" : "1px solid #e6e6ff")};

  span {
    padding: 0;
  }

  p {
    margin: 0;
  }
`;

const Label = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: -0.02em;

    color: ${({ $isSelected }) => ($isSelected ? "#6666FF" : "#555566")};
  }
`;

export const ErrorText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #cc1f1a;
  }
`;
