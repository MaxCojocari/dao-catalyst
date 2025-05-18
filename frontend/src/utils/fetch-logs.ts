import { PublicClient, Log, AbiEvent } from "viem";

type FetchLogsOptions = {
  publicClient: PublicClient;
  address: `0x${string}`;
  event: AbiEvent;
  args?: Record<string, any>;
  fromBlock: bigint;
  toBlock?: bigint | "latest";
  chunkSize?: number;
};

export async function fetchLogs({
  publicClient,
  address,
  event,
  args,
  fromBlock,
  toBlock = "latest",
  chunkSize = 500,
}: FetchLogsOptions): Promise<Log[]> {
  const logs: Log[] = [];

  const latestBlock =
    toBlock === "latest" ? await publicClient.getBlockNumber() : toBlock;

  let startBlock = fromBlock;

  while (startBlock <= latestBlock) {
    const endBlock = startBlock + BigInt(chunkSize - 1);
    const boundedToBlock = endBlock > latestBlock ? latestBlock : endBlock;

    const chunkLogs = await publicClient.getLogs({
      address,
      event,
      args,
      fromBlock: startBlock,
      toBlock: boundedToBlock,
    });

    logs.push(...chunkLogs);
    startBlock = boundedToBlock + 1n;
  }

  return logs;
}
