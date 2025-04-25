import { ethers } from 'hardhat';

async function main() {
  const [signer] = await ethers.getSigners();

  const contract = await ethers.deployContract('TargetContract', signer);
  const tx = contract.deploymentTransaction();
  await tx?.wait();
  console.log(await contract.getAddress());
  console.log(tx?.hash);
}

main().catch(console.error);
