import { ethers, network } from 'hardhat';
import { DEPLOY_CONSTANTS } from '../constants';

async function main() {
  const [signer] = await ethers.getSigners();
  const { daoSimpleVote, daoMultisigVote, daoFractionalVote } = DEPLOY_CONSTANTS[network.name];

  console.log('Start deploy DaoFactory');
  const contract = await ethers.deployContract(
    'DaoFactory',
    [daoSimpleVote, daoFractionalVote, daoMultisigVote],
    signer,
  );
  const tx = contract.deploymentTransaction();
  console.log('Deployed:');
  console.log(tx?.hash);
  console.log(await contract.getAddress());
}

main().catch(console.error);
