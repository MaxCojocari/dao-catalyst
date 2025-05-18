import { ethers } from 'hardhat';
import { Dao__factory, DaoToken__factory } from '../typechain-types';
import { Wallet } from 'ethers';

async function main() {
  const [provider] = await ethers.getSigners();

  const daoToken = DaoToken__factory.connect(
    '0x8042478E61B2eA52878c22499ac0562Fd90E093A',
    provider.provider,
  );

  // for (const pk of pks) {
  //   const wallet = new Wallet(pk, provider.provider);
  //   const tx = await daoToken.connect(wallet).delegate(wallet);
  //   await tx.wait();
  //   console.log(tx.hash);
  // }
}

main().catch(console.error);
