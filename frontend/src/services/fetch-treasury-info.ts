import { parseAbiItem } from "viem";
import { wagmiConfig } from "../utils/provider";
import { getPublicClient } from "wagmi/actions";
import {
  DAO_FACTORY_DEPLOY_TIMESTAMP,
  USDC_ADDRESS,
  USDT_ADDRESS,
} from "../constants";
import { TransferType } from "../types";

type Transfer = {
  type: TransferType;
  amount: string;
  token: "USDC" | "USDT";
  timestamp: number;
};

const transferEvent = parseAbiItem(
  "event Transfer(address indexed from, address indexed to, uint256 value)"
);

export async function fetchTreasuryInfo(daoAddress: string) {
  const publicClient = getPublicClient(wagmiConfig)!;
  const transfers: Transfer[] = [];
  let totalNetWorth = 0;

  const tokenAddresses = [
    { address: USDC_ADDRESS, symbol: "USDC" },
    { address: USDT_ADDRESS, symbol: "USDT" },
  ];

  for (const token of tokenAddresses) {
    const logs = await publicClient.getLogs({
      address: token.address as `0x{string}`,
      event: transferEvent,
      fromBlock: DAO_FACTORY_DEPLOY_TIMESTAMP,
      toBlock: "latest",
    });

    for (const log of logs) {
      const { from, to, value } = log.args as unknown as {
        from: `0x{string}`;
        to: `0x{string}`;
        value: bigint;
      };

      const adjustedAmount = (Number(value) / 1e6).toFixed(4);
      const block = await publicClient.getBlock({
        blockNumber: log.blockNumber,
      });
      const timestamp = Number(block.timestamp);

      if (to.toLowerCase() === daoAddress.toLowerCase()) {
        transfers.push({
          type: TransferType.Deposit,
          amount: adjustedAmount,
          token: token.symbol as "USDC" | "USDT",
          timestamp,
        });
        totalNetWorth += Number(adjustedAmount);
      }

      if (from.toLowerCase() === daoAddress.toLowerCase()) {
        transfers.push({
          type: TransferType.Withdrawal,
          amount: adjustedAmount,
          token: token.symbol as "USDC" | "USDT",
          timestamp,
        });
        totalNetWorth -= Number(adjustedAmount);
      }
    }
  }

  const sortedTransfers = transfers.sort((a, b) => b.timestamp - a.timestamp);

  return { totalNetWorth, transfers: sortedTransfers };
}
