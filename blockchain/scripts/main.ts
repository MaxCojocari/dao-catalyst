import { ethers } from 'hardhat';
import { DaoToken__factory } from '../typechain-types';
import { IVotes__factory } from '../typechain-types/factories/contracts/interfaces';

async function main() {
  const [signer] = await ethers.getSigners();
  const address = '0xcc6a02a51b7d1a9f46da946d9b8d6dd358b36b01';
  const token = DaoToken__factory.connect(address, signer);
  const interfaceId = '0xe90fb3f6';
  console.log(await token.supportsInterface(interfaceId));
}

main().catch(console.error);
