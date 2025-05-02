import { ethers, network } from 'hardhat';
import { Dao__factory, DaoMultisigVote__factory } from '../typechain-types';
import { DEPLOY_CONSTANTS, getTestProposals } from '../constants';

async function main() {
  const [signer] = await ethers.getSigners();

  const {
    daos,
    tokens: { usdc, usdt },
    targetContract,
  } = DEPLOY_CONSTANTS[network.name];

  const dao = DaoMultisigVote__factory.connect(
    '0xf305fda0a2f03e52f8370a2480b81f08ae61a230',
    signer,
  );
  const proposals = getTestProposals(dao, usdt.address, usdc.address, targetContract);

  // const MEMBER_ROLE = '0x829b824e2329e205435d941c9f13baf578548505283d29261236d8e6596d4636';
  // console.log(await dao.revokeRole(MEMBER_ROLE, signer));

  for (const proposal of [proposals[1]]) {
    const { actions, descriptionURI, voteStart, voteDuration } = proposal;
    try {
      const tx = await dao.propose(actions, descriptionURI, voteStart, voteDuration);
      await tx.wait();
      console.log('New proposal:', tx.hash);
    } catch (error: any) {
      console.log(error.data);
    }
  }
}

main().catch(console.error);
