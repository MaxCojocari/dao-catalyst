import { wagmiConfig } from "./provider";
import { getPublicClient } from "@wagmi/core";

export async function getCurrentBlockTimestamp() {
  const client = getPublicClient(wagmiConfig)!;
  const block = await client.getBlock();
  return Number(block.timestamp);
}
