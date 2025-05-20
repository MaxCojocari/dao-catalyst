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
import { $daoInfo, resetDaoInfo } from "../store";
import { DaoSettings, DaoType, TxStatus } from "../types";
import { useWriteContract } from "wagmi";
import { DaoFactory__factory } from "../typechain-types";
import { getPublicClient, waitForTransactionReceipt } from "@wagmi/core";
import { wagmiConfig } from "../utils/provider";
import { DAO_CREATED_EVENT, DAO_FACTORY } from "../constants";
import { getCreateDaoParams } from "../utils";
import { uploadJson, uploadLogo } from "../services";
import { decodeEventLog } from "viem";
import { useNavigate } from "react-router-dom";

export interface FileUploadProps {
  setLogo: (file: File | null) => void;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
}

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

  return true;
};

export const CreateDaoPage = () => {
  const dao = useUnit($daoInfo);
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.Idle);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const { writeContractAsync } = useWriteContract();
  const [logo, setLogo] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [daoAddress, setDaoAddress] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDeploy = async () => {
    try {
      setTxStatus(TxStatus.Waiting);

      const deployParams = await getCreateDaoParams(dao, logo)!;
      const publicClient = getPublicClient(wagmiConfig)!;
      const feeData = await publicClient.estimateFeesPerGas();
      const hash = await writeContractAsync({
        address: DAO_FACTORY as `0x${string}`,
        abi: DaoFactory__factory.abi,
        functionName: "createDao",
        args: [deployParams?.params as any],
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      });

      setTxHash(hash);

      const receipt = await waitForTransactionReceipt(wagmiConfig, { hash });

      if (receipt.status === "success") {
        const logs = receipt.logs;
        const daoCreatedLog: any = logs
          .map((log) => {
            try {
              return decodeEventLog({
                abi: [DAO_CREATED_EVENT],
                data: log.data,
                topics: log.topics,
              });
            } catch {
              return null;
            }
          })
          .find((decoded) => decoded?.eventName === "DaoCreated");

        if (daoCreatedLog) setDaoAddress(daoCreatedLog.args?.daoAddress);

        await uploadLogo(logo);
        await uploadJson(deployParams?.daoMetadata!, dao.name);

        resetDaoInfo();

        setTxStatus(TxStatus.Submitted);
      } else {
        setTxStatus(TxStatus.Failed);
      }
    } catch (err: any) {
      console.error("Transaction failed:", err);
      setTxStatus(TxStatus.Failed);
    }
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
          {step === 1 && (
            <DescribeDao
              setLogo={setLogo}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
            />
          )}
          {step === 2 && <DefineMembership />}
          {step === 3 && <SelectGovernanceSettings />}
          {step === 4 && (
            <DeployDao
              confirmed={confirmed}
              setConfirmed={setConfirmed}
              setStep={setStep}
              logoPreviewUrl={previewUrl}
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
          onClose={() => {
            setTxStatus(TxStatus.Idle);
          }}
          onCloseSuccess={() => navigate(`/daos/${daoAddress}`)}
          titleWaiting="Waiting for Confirmation"
          titleSubmitted="DAO Created Successfully!"
          successLabel="Open DAO Page"
          explorerUrl="https://sepolia.arbiscan.io/tx/"
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
