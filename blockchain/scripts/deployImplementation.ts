import { ethers } from 'hardhat';

async function main() {
  const [signer] = await ethers.getSigners();

  const implementations = ['DaoSimpleVote', 'DaoMultisigVote', 'DaoFractionalVote'];

  for (const impl of implementations) {
    console.log(`Deploy ${impl}...`);
    const contract = await ethers.deployContract(impl, signer);
    const tx = contract.deploymentTransaction();
    await tx?.wait();
    console.log('Deployed:');
    console.log(tx?.hash);
    console.log(await contract.getAddress());
    console.log('\n');
  }
}

main().catch(console.error);
