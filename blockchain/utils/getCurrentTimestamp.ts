import { ethers } from 'hardhat';

export async function getCurrentTimestamp() {
  const block = await ethers.provider.getBlock('latest');
  return BigInt(block?.timestamp!);
}
