import { network } from 'hardhat';

export async function increaseTime(amountSec: bigint) {
  await network.provider.send('evm_increaseTime', [Number(amountSec)]);
  await network.provider.send('evm_mine');
}
