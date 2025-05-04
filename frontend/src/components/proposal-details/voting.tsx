import styled from "styled-components";
import { Container, VoteButton } from "../common-styles";
import { useCallback, useEffect, useState } from "react";
import {
  BreakdownSection,
  ErrorModal,
  InfoSection,
  ToggleTabs,
  TransactionModal,
  VotePanel,
  VotersSection,
  VotingStatus,
} from "..";
import {
  DaoType,
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
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const { writeContractAsync } = useWriteContract();

  const fetchVotingInfo = useCallback(
    async (withLoading: boolean) => {
      try {
        if (withLoading) setIsLoading({ fetchVotingInfo: true });

        const res = await fetchVotingStats(daoAddress!, BigInt(id!), address!);
        setVotingStats(res);
        setVoted(res?.hasVoted);
      } catch (e) {
        console.error(e);
      } finally {
        if (withLoading) setIsLoading({ fetchVotingInfo: false });
      }
    },
    [daoAddress, id, address, voted]
  );

  const handleVoteSubmission = async (option: VotingOption) => {
    try {
      const isSimpleVote =
        votingStats?.infoSectionData.daoType === DaoType.SimpleVote;

      if (!isSimpleVote && !votingStats?.isMember) {
        setErrorModalOpen(true);
        return;
      }

      setTxStatus(TxStatus.Waiting);
      const hash = await writeContractAsync({
        address: daoAddress as `0x${string}`,
        abi: Dao__factory.abi,
        functionName: isSimpleVote ? "castVote" : "castVoteEqualWeight",
        args: isSimpleVote ? [BigInt(id!), option] : [BigInt(id!)],
      });
      setTxHash(hash);

      const receipt = await waitForTransactionReceipt(wagmiConfig, { hash });

      if (receipt.status === "success") {
        setTxStatus(TxStatus.Submitted);
        setVoted(true);
        setVotePanelActive(false);
      } else {
        setTxStatus(TxStatus.Failed);
      }
    } catch (err: any) {
      console.error("Transaction failed:", err);
      setTxStatus(TxStatus.Failed);
    }
  };

  useEffect(() => {
    fetchVotingInfo(true);
  }, []);

  useEffect(() => {
    fetchVotingInfo(false);
  }, [voted]);

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
          daoType={votingStats?.infoSectionData.daoType}
        />
      )}
      {activeTab === VotingTab.Voters && (
        <VotersSection
          voters={votingStats?.voters}
          tokenSymbol={votingStats?.tokenSymbol}
        />
      )}
      {!votePanelActive && proposalState === ProposalState.Active && (
        <VoteButton
          disabled={voted}
          onClick={
            votingStats?.infoSectionData.daoType === DaoType.SimpleVote
              ? () => setVotePanelActive(true)
              : () => handleVoteSubmission(0)
          }
        >
          {voted ? "Vote submitted" : "Vote now"}
        </VoteButton>
      )}
      {votePanelActive && !voted && (
        <>
          <br />
          <VotePanel
            onSubmit={handleVoteSubmission}
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
        onCloseSuccess={() => {
          setTxStatus(TxStatus.Idle);
        }}
        titleWaiting="Waiting for Signature"
        descriptionWaiting="Sign vote and confirm transaction in your wallet"
        titleSubmitted="Vote Submitted Successfully!"
        successLabel="Continue to Proposal"
        explorerUrl="https://sepolia.arbiscan.io/tx/"
      />
      <ErrorModal
        open={errorModalOpen}
        setOpen={setErrorModalOpen}
        name={"You can't vote"}
        summary={
          "You are not eligible for voting. To vote on future proposals, contact DAO admin to grant necessary permissions."
        }
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
