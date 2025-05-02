import { readContract } from "wagmi/actions";
import { erc20Abi } from "viem";
import { wagmiConfig } from "../utils/provider";

export async function fetchTokenSymbol(
  tokenAddress: `0x${string}`
): Promise<string | undefined> {
  if (!tokenAddress) return;
  try {
    const symbol = await readContract(wagmiConfig, {
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "symbol",
    });
    return symbol as string;
  } catch (e) {
    console.error("Error fetching token symbol:", e);
    return;
  }
}
