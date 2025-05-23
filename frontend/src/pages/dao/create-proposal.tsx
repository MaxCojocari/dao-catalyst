import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import {
  ConfigureVoting,
  DeployProposal,
  DescribeProposal,
  ProgressBar,
  SetActions,
  TransactionModal,
} from "../../components";
import styled from "styled-components";
import {
  BackButton,
  Box,
  NextStepButton,
} from "../../components/common-styles";
import backIcon from "../../assets/images/back-icon.svg";
import { ProgressBarPosition } from "../../components/progress-bar";
import { ProposalSettings, TxStatus } from "../../types";
import { $proposalInfo } from "../../store/proposal";
import { useWriteContract } from "wagmi";
import { ERC20__factory } from "../../typechain-types";
import { parseUnits } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { wagmiConfig } from "../../utils/provider";

const isNextEnabled = (step: number, proposal: ProposalSettings): boolean => {
  if (step === 1) {
    return proposal.title.trim() !== "" && proposal.summary.trim() !== "";
  }

  if (step === 3) {
    if (proposal.actions.length === 0) return false;

    for (const action of proposal.actions) {
      const hasTarget = action.target?.trim() !== "";
      const hasFunction = action.functionFragment?.trim() !== "";
      const allInputsFilled =
        Array.isArray(action.inputs) &&
        action.inputs.length > 0 &&
        action.inputs.every((input) => input !== "" && input !== undefined);

      if (!hasTarget || !hasFunction || !allInputsFilled) {
        return false;
      }
    }
    return true;
  }

  return true;
};

export const CreateProposalPage = () => {
  const proposal = useUnit($proposalInfo);
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.Idle);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const { writeContractAsync } = useWriteContract();

  const handleDeploy = async () => {
    try {
      setTxStatus(TxStatus.Waiting);
      const hash = await writeContractAsync({
        address: "0x34f2c50DBA5e998690C1b5047A74405c2FF2C54F" as `0x${string}`,
        abi: ERC20__factory.abi,
        functionName: "transfer",
        args: [
          "0x03C25c5Dd860B021165A127A6553c67C371551b0",
          parseUnits("0.01", 6),
        ],
      });
      setTxHash(hash);

      const receipt = await waitForTransactionReceipt(wagmiConfig, { hash });

      if (receipt.status === "success") {
        setTxStatus(TxStatus.Submitted);
      } else {
        setTxStatus(TxStatus.Failed);
      }
    } catch (err: any) {
      console.error("Transaction failed:", err);
      setTxStatus(TxStatus.Failed);
    }
  };

  const handleClose = () => {
    setTxStatus(TxStatus.Idle);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  return (
    <>
      <Container>
        <ProgressBar
          position={Math.min(step, 3) as ProgressBarPosition}
          finished={step < 4 ? false : true}
          firstStep="Describe Proposal"
          secondStep="Configure Voting"
          thirdStep="Set Actions"
        />
        <Box>
          {step > 1 && (
            <BackButton
              onClick={() => setStep((prev) => Math.max(1, prev - 1))}
            >
              <img src={backIcon} alt="back-icon" />
              <a>Back</a>
            </BackButton>
          )}
          {step === 1 && <DescribeProposal />}
          {step === 2 && <ConfigureVoting />}
          {step === 3 && <SetActions />}
          {step === 4 && (
            <DeployProposal
              confirmed={confirmed}
              setConfirmed={setConfirmed}
              setStep={setStep}
            />
          )}
          {step >= 1 && step < 4 && (
            <NextStepButton
              disabled={!isNextEnabled(step, proposal)}
              onClick={() => {
                if (!isNextEnabled(step, proposal)) return;
                setStep((prev) => Math.min(4, prev + 1));
              }}
            >
              Next Step
            </NextStepButton>
          )}
          {step === 4 && (
            <NextStepButton disabled={!confirmed} onClick={handleDeploy}>
              Create Proposal
            </NextStepButton>
          )}
        </Box>
        <TransactionModal
          status={txStatus}
          txHash={txHash}
          onClose={handleClose}
          titleWaiting="Waiting for Confirmation"
          titleSubmitted="Proposal Created Successfully!"
          successLabel="Open Proposal Page"
          explorerUrl="https://sepolia.etherscan.io/tx/"
        />
      </Container>
    </>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;

  * {
    font-family: "Inter";
    font-style: normal;
  }
`;
