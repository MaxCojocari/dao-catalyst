import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import {
  DefineMembership,
  DeployDao,
  DescribeDao,
  ProgressBar,
  SelectGovernanceSettings,
  TransactionModal,
} from "../components";
import styled from "styled-components";
import { BackButton, Box, NextStepButton } from "../components/common-styles";
import backIcon from "../assets/images/back-icon.svg";
import { ProgressBarPosition } from "../components/progress-bar";
import { $daoInfo } from "../store";
import { DaoSettings, DaoType, TxStatus } from "../types";
import { useWriteContract } from "wagmi";
import { ERC20__factory } from "../typechain-types";
import { parseUnits } from "viem";
import { waitForTransactionReceipt } from "@wagmi/core";
import { wagmiConfig } from "../utils/provider";

const isNextEnabled = (step: number, dao: DaoSettings): boolean => {
  if (step === 1) {
    return dao.name.trim() !== "" && dao.summary.trim() !== "";
  }

  if (step === 2) {
    const hasAtLeastOneMember = dao.members.some(
      (member) => member?.trim() !== ""
    );

    if (dao.type === DaoType.MultisigVote && hasAtLeastOneMember) return true;

    if (dao.token.isDeployed) {
      return dao.token.tokenAddress.trim() !== "";
    } else {
      return dao.token.name.trim() !== "" && dao.token.symbol.trim() !== "";
    }
  }

  console.log("dao", dao);

  return true;
};

export const CreateDaoPage = () => {
  const dao = useUnit($daoInfo);
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
          firstStep="Describe DAO"
          secondStep="Define Membership"
          thirdStep="Select Governance Settings"
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
          {step === 1 && <DescribeDao />}
          {step === 2 && <DefineMembership />}
          {step === 3 && <SelectGovernanceSettings />}
          {step === 4 && (
            <DeployDao
              confirmed={confirmed}
              setConfirmed={setConfirmed}
              setStep={setStep}
            />
          )}
          {step >= 1 && step < 4 && (
            <NextStepButton
              disabled={!isNextEnabled(step, dao)}
              onClick={() => {
                if (!isNextEnabled(step, dao)) return;
                setStep((prev) => Math.min(4, prev + 1));
              }}
            >
              Next Step
            </NextStepButton>
          )}
          {step === 4 && (
            <NextStepButton disabled={!confirmed} onClick={handleDeploy}>
              Deploy DAO
            </NextStepButton>
          )}
        </Box>
        <TransactionModal
          status={txStatus}
          txHash={txHash}
          onClose={handleClose}
          titleWaiting="Waiting for Confirmation"
          titleSubmitted="DAO Created Successfully!"
          successLabel="Open DAO Page"
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
