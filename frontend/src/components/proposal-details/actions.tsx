import { TOKENS } from "../../constants";
import {
  ActionType,
  ProposalAction,
  ProposalState,
  TxStatus,
} from "../../types";
import { Container, FilledButton, Success } from "../common-styles";
import { Line } from "../create-proposal/components/actions";
import styled from "styled-components";
import { shortenAddress } from "../../utils";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { formatUnits } from "viem";
import successIcon from "../../assets/images/done.svg";
import { Button } from "../preview-styles";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import { useState } from "react";
import { useWriteContract } from "wagmi";
import { Dao__factory } from "../../typechain-types";
import { getPublicClient, waitForTransactionReceipt } from "@wagmi/core";
import { wagmiConfig } from "../../utils/provider";
import { TransactionModal } from "..";
import { useParams } from "react-router-dom";

const CustomAction = ({ action }: { action: ProposalAction }) => {
  const functionName = action.functionFragment.split("(")[0].trim();
  const vars = action.functionFragment.match(/^\w+\((.*)\)$/);
  const paramTypes = vars![1].split(",").map((p) => p.trim());

  return (
    <Box>
      <Header>
        <Row>
          <h2>{functionName}</h2>
          <p className="target-address">{shortenAddress(action.target)}</p>
        </Row>
      </Header>
      <Line />
      {paramTypes.map((type, index) => (
        <InputContainer key={index}>
          <p>{type}</p>
          <Input>{action.inputs[index]}</Input>
        </InputContainer>
      ))}
    </Box>
  );
};

const TransferTokenAction = ({
  action,
  daoName,
}: {
  action: ProposalAction;
  daoName: string;
}) => {
  const token = TOKENS.find(
    (t) => t.address.toLowerCase() === action.inputs[0].toLowerCase()
  );
  const amount = Number(formatUnits(action.inputs[2], token?.decimals!));

  return (
    <Box>
      <Header>
        <Row>
          <h2>Transfer assets</h2>
          <Token>
            <p className="target-address">
              {shortenAddress(action?.inputs[0])}
            </p>
            <CheckCircleOutlineIcon
              style={{
                color: "#6666ff",
                width: "17px",
                marginRight: "5px",
              }}
            />
            <p className="token-symbol">{token?.symbol}</p>
          </Token>
        </Row>
        <p>Withdraw assets from the DAO treasury</p>
      </Header>
      <Line />
      <Recipient>
        <Address>
          <p className="name">From</p>
          <p className="address">{daoName}</p>
        </Address>
        <KeyboardArrowRightIcon
          width={10}
          sx={{ color: "#8F8FB2", margin: "0 8px" }}
        />
        <Address>
          <p className="name">To</p>
          <a
            href={`https://sepolia.etherscan.io/address/${action?.inputs[1]}`}
            target="_blank"
            rel="noreferrer"
          >
            {shortenAddress(action?.inputs[1])}
          </a>
        </Address>
      </Recipient>
      <AssetInfo>
        <div className="left">
          <img
            src={token?.icon}
            style={{ width: "40px", marginRight: "8px" }}
          />
          <div style={{ display: "flex", alignItems: "center" }}>
            <p>{token?.symbol}</p>
          </div>
        </div>
        <div className="right">
          <p
            style={{
              fontWeight: "400",
            }}
          >
            {amount.toLocaleString()} {token?.symbol}
          </p>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <p
              style={{
                color: "#8f8fb2",
                fontSize: "12px",
                lineHeight: "19px",
                letterSpacing: "-0.02em",
              }}
            >
              ${(amount * 0.98).toLocaleString()}
            </p>
          </div>
        </div>
      </AssetInfo>
    </Box>
  );
};

export const ActionsSection = ({
  state,
  txHash,
  actions,
  daoName,
}: {
  state: ProposalState;
  txHash?: string;
  actions: ProposalAction[];
  daoName: string;
}) => {
  const { daoAddress, id } = useParams();
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.Idle);
  const [_, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const { writeContractAsync } = useWriteContract();

  const handleExecute = async () => {
    try {
      setTxStatus(TxStatus.Waiting);
      const publicClient = getPublicClient(wagmiConfig)!;
      const feeData = await publicClient.estimateFeesPerGas();
      const hash = await writeContractAsync({
        address: daoAddress as `0x${string}`,
        abi: Dao__factory.abi,
        functionName: "execute",
        args: [BigInt(id!)],
        maxFeePerGas: feeData.maxFeePerGas,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      });
      setTxHash(hash);

      txHash = hash;

      const receipt = await waitForTransactionReceipt(wagmiConfig, { hash });

      if (receipt.status === "success") {
        setTxStatus(TxStatus.Submitted);
        state = ProposalState.Executed;
      } else {
        setTxStatus(TxStatus.Failed);
      }
    } catch (err: any) {
      console.error("Transaction failed:", err);
      setTxStatus(TxStatus.Failed);
    }
  };

  const handleClose = () => {
    if (txStatus === TxStatus.Submitted) {
      window.location.reload();
    }

    setTxStatus(TxStatus.Idle);
  };

  const redirectToScan = () => {
    if (!txHash) return;

    const scanUrl = `https://sepolia.arbiscan.io/tx/${txHash}`;
    window.open(scanUrl, "_blank", "noopener,noreferrer");
  };

  const renderFooter = () => {
    if (state === ProposalState.Executed) {
      return (
        <>
          {txHash && (
            <Button
              onClick={() => redirectToScan()}
              style={{ fontSize: "14px", marginRight: "16px", height: "47px" }}
            >
              See transaction
            </Button>
          )}
          <Success style={{ margin: 0 }}>
            <img
              src={successIcon}
              width="14px"
              style={{ marginRight: "8px" }}
            />
            <p style={{ fontSize: "14px" }}>Actions executed</p>
          </Success>
        </>
      );
    }

    if (state === ProposalState.Succeeded) {
      return (
        <>
          <FilledButton
            onClick={() => handleExecute()}
            style={{ fontSize: "14px", marginRight: "16px", height: "47px" }}
          >
            Execute now
          </FilledButton>
          <InfoText>
            <InfoOutlineIcon
              sx={{ width: 18, marginRight: "6px", color: "#6666FF" }}
            />
            <p>Proposal has passed and is ready to be executed</p>
          </InfoText>
          <TransactionModal
            status={txStatus}
            txHash={txHash}
            onClose={handleClose}
            onCloseSuccess={handleClose}
            titleWaiting="Waiting for Confirmation"
            titleSubmitted="Proposal Executed Successfully!"
            successLabel="Continue to proposal"
            explorerUrl="https://sepolia.etherscan.io/tx/"
          />
        </>
      );
    }

    if (state === ProposalState.Canceled || state === ProposalState.Defeated) {
      return (
        <>
          <ErrorText>
            <InfoOutlineIcon
              sx={{ width: 18, marginRight: "6px", color: "#de3c48" }}
            />
            <p>Proposal defeated</p>
          </ErrorText>
        </>
      );
    }

    return null;
  };

  return (
    <Container>
      <h1>Actions</h1>
      <Summary>
        These actions can be executed only once the governance parameters are
        met.
      </Summary>
      {actions?.map((action, _) => {
        if (action.type === ActionType.TransferTokens)
          return (
            <TransferTokenAction
              key={action.id}
              action={action}
              daoName={daoName}
            />
          );
        if (action.type === ActionType.Other)
          return <CustomAction key={action.id} action={action} />;
      })}
      {<Footer>{renderFooter()}</Footer>}
    </Container>
  );
};

export const Summary = styled.p`
  font-size: 14px;
  line-height: 22px;
  font-weight: 400;
  letter-spacing: -0.03em;
  color: #666680;
  margin: 8px 0;
`;

export const Box = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px;
  width: 100%;
  margin-top: 16px;

  background: #f7f7fa;
  border: 1px solid #e6e6ff;
  border-radius: 8px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;

  p {
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #52606d;
  }
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
`;

export const InfoText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #555566;
  }
`;

export const ErrorText = styled(InfoText)`
  p {
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: -0.02em;
    color: #cc1f1a;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  h2 {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    letter-spacing: -0.03em;
    color: #292933;
  }

  .target-address {
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #52606d;

    margin-right: 10px;
  }

  .token-symbol {
    font-weight: 600;
    font-size: 13px;
    line-height: 32px;
    letter-spacing: -0.02em;
    color: #6666ff;
  }
`;

export const Token = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Recipient = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const Address = styled.div`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  background: #ffffff;
  border-radius: 8px;
  width: 100%;
  gap: 6px;

  .name {
    font-weight: 400;
    font-size: 13px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #52606d;
  }

  a {
    font-weight: 500;
    font-size: 15px;
    line-height: 17px;
    letter-spacing: -0.03em;
    color: rgba(41, 41, 51, 0.9);
    cursor: pointer;
    display: inline-block;
    text-decoration: none;
  }
`;

export const AssetInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 16px;
  margin-top: 24px;
  background: #ffffff;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;

  p {
    font-weight: 500;
    font-size: 15px;
    line-height: 17px;
    letter-spacing: -0.03em;
    color: rgba(41, 41, 51, 0.9);
  }

  .left {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: center;
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    gap: 8px;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  p {
    font-weight: 500;
    font-size: 15px;
    line-height: 16px;
    letter-spacing: -0.02em;
    color: #292933;
  }
`;

export const Input = styled.div`
  margin: 10px 0 16px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px;
  box-sizing: border-box;
  height: 45px;
  color: #52606d;
  width: 100%;

  background: #e1e1eb;
  border-radius: 6px;

  font-weight: 450;
  font-size: 14px;
  line-height: 18px;
  letter-spacing: -0.03em;
`;
