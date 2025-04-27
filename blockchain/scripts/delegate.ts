import { ethers } from 'hardhat';
import { Dao__factory, DaoToken__factory } from '../typechain-types';
import { Wallet } from 'ethers';

async function main() {
  const [provider] = await ethers.getSigners();

  const daoToken = DaoToken__factory.connect(
    '0x3b08846e23c3fbdc7e0b5567a4359307015cfef9',
    provider.provider,
  );

  //   for (const pk of pks) {
  //     const wallet = new Wallet(pk, provider.provider);
  //     const tx = await daoToken.connect(wallet).delegate(wallet);
  //     await tx.wait();
  //     console.log(tx.hash);
  //   }
}

main().catch(console.error);
