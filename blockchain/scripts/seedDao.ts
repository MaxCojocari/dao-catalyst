import { ethers, network } from 'hardhat';
import { DEPLOY_CONSTANTS, TEST_DAOS } from '../constants';
import { DaoFactory__factory } from '../typechain-types';

async function main() {
  const [signer] = await ethers.getSigners();
  const { factory } = DEPLOY_CONSTANTS[network.name];

  const daoFactory = DaoFactory__factory.connect(factory, signer);

  for (const param of TEST_DAOS) {
    const tx = await daoFactory.createDao(param);
    await tx.wait();
    console.log(tx.hash);
  }
}

main().catch(console.error);
