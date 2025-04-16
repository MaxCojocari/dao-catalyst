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
import { $proposalSettings } from "../../store/proposal";

const isNextEnabled = (step: number, proposal: ProposalSettings): boolean => {
  // if (step === 1) {
  //   return dao.name.trim() !== "" && dao.summary.trim() !== "";
  // }

  // if (step === 2) {
  //   const hasAtLeastOneMember = dao.members.some(
  //     (member) => member.address?.trim() !== ""
  //   );

  //   if (dao.type === DaoType.MultisigVote && hasAtLeastOneMember) return true;

  //   if (dao.token.isDeployed) {
  //     return dao.token.tokenAddress.trim() !== "";
  //   } else {
  //     return dao.token.name.trim() !== "" && dao.token.symbol.trim() !== "";
  //   }
  // }

  console.log("step", step);
  console.log("proposal", proposal);

  return true;
};

export const CreateProposalPage = () => {
  const proposal = useUnit($proposalSettings);
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.Idle);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  // const { writeContractAsync } = useWriteContract();

  const handleDeploy = async () => {
    try {
      // Simulate contract deployment
      const tx = await new Promise<{ hash: string }>((resolve) =>
        setTimeout(() => resolve({ hash: "0xabc123fakehash" }), 3000)
      );
      setTxHash(tx.hash as `0x${string}`);
      setTxStatus(TxStatus.Submitted);
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
            <DeployProposal confirmed={confirmed} setConfirmed={setConfirmed} />
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
