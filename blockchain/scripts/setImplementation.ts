import { ethers, network } from 'hardhat';
import { DEPLOY_CONSTANTS } from '../constants';
import { DaoFactory__factory } from '../typechain-types';

async function main() {
  const [signer] = await ethers.getSigners();
  const { factory, daoSimpleVote, daoMultisigVote, daoFractionalVote } =
    DEPLOY_CONSTANTS[network.name];

  const daoFactory = DaoFactory__factory.connect(factory, signer);

  console.log('Start setting new implementations...');
  const tx = await daoFactory.setImplementations(daoSimpleVote, daoFractionalVote, daoMultisigVote);
  await tx.wait();
  console.log(tx.hash);
}

main().catch(console.error);
