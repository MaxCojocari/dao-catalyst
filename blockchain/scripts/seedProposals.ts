import { ethers, network } from 'hardhat';
import { Dao__factory } from '../typechain-types';
import { DEPLOY_CONSTANTS, getTestProposals } from '../constants';

async function main() {
  const [signer] = await ethers.getSigners();

  const {
    daos,
    tokens: { usdc, usdt },
    targetContract,
  } = DEPLOY_CONSTANTS[network.name];

  const dao = Dao__factory.connect(daos[0], signer);
  const proposals = getTestProposals(dao, usdt.address, usdc.address, targetContract);

  for (const proposal of proposals) {
    const { actions, descriptionURI, voteStart, voteDuration } = proposal;
    const tx = await dao.propose(actions, descriptionURI, voteStart, voteDuration);
    await tx.wait();
    console.log('New proposal:', tx.hash);
  }
}

main().catch(console.error);
