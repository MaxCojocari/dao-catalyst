import { ethers } from 'hardhat';
import { Dao__factory } from '../typechain-types';
import { Wallet } from 'ethers';

enum VoteType {
  For,
  Against,
  Abstain,
}

async function main() {
  const [signer] = await ethers.getSigners();

  //   const wallet = new Wallet(pks[2], signer.provider);
  //   const dao = Dao__factory.connect('0xf305fda0a2f03e52f8370a2480b81f08ae61a230', wallet);

  //   try {
  //     const tx = await dao.castVote(6, VoteType.Against);
  //     await tx.wait();
  //     console.log(tx.hash);
  //   } catch (error: any) {
  //     console.log(error.data);
  //   }
}

main().catch(console.error);
