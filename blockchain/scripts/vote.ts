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

  // const wallet = new Wallet(pks[2], signer.provider);
  const MEMBER_ROLE = '0x829b824e2329e205435d941c9f13baf578548505283d29261236d8e6596d4636';
  const dao = Dao__factory.connect('0xb1e4498fd67fa4f445e068d104ed563eca8b5650', signer);
  await dao.grantRole(MEMBER_ROLE, signer);

  // try {
  //   const tx = await dao.castVoteEqualWeight(2);
  //   await tx.wait();
  //   console.log(tx.hash);
  // } catch (error: any) {
  //   const itf = Dao__factory.createInterface();

  //   console.log(error.data);
  //   console.log(itf.parseError(error.data));
  // }
}

main().catch(console.error);
