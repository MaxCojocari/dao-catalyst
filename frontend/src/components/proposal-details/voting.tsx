import styled from "styled-components";
import { Container, VoteButton } from "../common-styles";
import { useState } from "react";
import {
  BreakdownSection,
  InfoSection,
  ToggleTabs,
  TransactionModal,
  VotePanel,
  VotersSection,
  VotingStatus,
} from "..";
import { DaoType, TxStatus } from "../../types";
import { ERC20__factory } from "../../typechain-types";
import { parseUnits } from "viem";
import { useWriteContract } from "wagmi";
import { wagmiConfig } from "../../utils/provider";
import { waitForTransactionReceipt } from "@wagmi/core";
import { votes, voters } from "../../constants";

export enum VotingTab {
  Breakdown = "Breakdown",
  Voters = "Voters",
  Info = "Info",
}

export const Voting = () => {
  const [activeTab, setActiveTab] = useState(VotingTab.Info);
  const [votePanelActive, setVotePanelActive] = useState(false);
  const [voted, setVoted] = useState(false);
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.Idle);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const { writeContractAsync } = useWriteContract();

  const handleVoteSubmission = async () => {
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

  return (
    <Container>
      <Row>
        <h1>Voting</h1>
        <ToggleTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </Row>
      <VotingStatus type={"active"} />
      <br />
      <br />
      {activeTab === VotingTab.Info && (
        <InfoSection
          daoType={DaoType.SimpleVote}
          support="> 66%"
          quorum="≥ 1950 of 13k PIK (15%)"
          participation="3000 of 13k PIK (23.08%)"
          participationReached={true}
          uniqueVoters={4}
          start="2025/02/05 10:20 PM UTC+2"
          end="2025/02/06 10:20 PM UTC+2"
        />
      )}
      {activeTab === VotingTab.Breakdown && (
        <BreakdownSection votes={votes} tokenSymbol="PIK" />
      )}
      {activeTab === VotingTab.Voters && (
        <VotersSection voters={voters} tokenSymbol="PIK" />
      )}
      {!votePanelActive && (
        <VoteButton disabled={voted} onClick={() => setVotePanelActive(true)}>
          {!voted ? "Vote now" : "Vote submitted"}
        </VoteButton>
      )}
      {votePanelActive && !voted && (
        <>
          <br />
          <VotePanel
            onSubmit={async (option) => {
              await handleVoteSubmission();
              setVoted(true);
              setVotePanelActive(false);
            }}
            onCancel={() => setVotePanelActive(false)}
          />
        </>
      )}
      <TransactionModal
        status={txStatus}
        txHash={txHash}
        onClose={handleClose}
        titleWaiting="Waiting for Signature"
        descriptionWaiting="Sign vote and confirm transaction in your wallet"
        titleSubmitted="Vote Submitted Successfully!"
        successLabel="Continue to Proposal"
        explorerUrl="https://sepolia.etherscan.io/tx/"
      />
    </Container>
  );
};

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 6px;
`;
