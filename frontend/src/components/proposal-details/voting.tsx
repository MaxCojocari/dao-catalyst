import styled from "styled-components";
import { Container, VoteButton } from "../common-styles";
import { useCallback, useEffect, useState } from "react";
import {
  BreakdownSection,
  InfoSection,
  ToggleTabs,
  TransactionModal,
  VotePanel,
  VotersSection,
  VotingStatus,
} from "..";
import {
  ProposalState,
  TxStatus,
  VotingOption,
  VotingStats,
} from "../../types";
import { Dao__factory } from "../../typechain-types";
import { useAccount, useWriteContract } from "wagmi";
import { wagmiConfig } from "../../utils/provider";
import { waitForTransactionReceipt } from "@wagmi/core";
import { fetchVotingStats } from "../../services";
import { setIsLoading } from "../../store";
import { useParams } from "react-router-dom";

export enum VotingTab {
  Breakdown = "Breakdown",
  Voters = "Voters",
  Info = "Info",
}

export const Voting = ({ proposalState }: { proposalState: ProposalState }) => {
  const { id, daoAddress } = useParams();
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState(VotingTab.Info);
  const [votePanelActive, setVotePanelActive] = useState(false);
  const [voted, setVoted] = useState(false);
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.Idle);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [votingStats, setVotingStats] = useState({} as VotingStats);
  const { writeContractAsync } = useWriteContract();

  const fetchVotingInfo = useCallback(async () => {
    try {
      setIsLoading({ fetchVotingInfo: true });
      const res = await fetchVotingStats(daoAddress!, BigInt(id!), address!);
      setVotingStats(res);
      setVoted(res?.hasVoted);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading({ fetchVotingInfo: false });
    }
  }, [daoAddress, id, address, voted]);

  const handleVoteSubmission = async (option: VotingOption) => {
    try {
      setTxStatus(TxStatus.Waiting);
      const hash = await writeContractAsync({
        address: daoAddress as `0x${string}`,
        abi: Dao__factory.abi,
        functionName: "castVote",
        args: [BigInt(id!), option],
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

  useEffect(() => {
    fetchVotingInfo();
  }, []);

  return (
    <Container>
      <Row>
        <h1>Voting</h1>
        <ToggleTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      </Row>
      <VotingStatus state={proposalState} />
      <br />
      <br />
      {activeTab === VotingTab.Info && (
        <InfoSection {...votingStats?.infoSectionData} />
      )}
      {activeTab === VotingTab.Breakdown && (
        <BreakdownSection
          votes={votingStats?.votes}
          tokenSymbol={votingStats?.tokenSymbol}
        />
      )}
      {activeTab === VotingTab.Voters && (
        <VotersSection
          voters={votingStats?.voters}
          tokenSymbol={votingStats?.tokenSymbol}
        />
      )}
      {!votePanelActive && proposalState === ProposalState.Active && (
        <VoteButton disabled={voted} onClick={() => setVotePanelActive(true)}>
          {voted ? "Vote submitted" : "Vote now"}
        </VoteButton>
      )}
      {votePanelActive && !voted && (
        <>
          <br />
          <VotePanel
            onSubmit={async (option: VotingOption) => {
              await handleVoteSubmission(option);
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
        onClose={() => {
          setTxStatus(TxStatus.Idle);
        }}
        titleWaiting="Waiting for Signature"
        descriptionWaiting="Sign vote and confirm transaction in your wallet"
        titleSubmitted="Vote Submitted Successfully!"
        successLabel="Continue to Proposal"
        explorerUrl="https://sepolia.arbiscan.io/tx/"
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
