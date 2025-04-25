import { ethers, network } from 'hardhat';
import { DEPLOY_CONSTANTS } from '../constants';
import { parseUnits } from 'ethers';

async function main() {
  const [signer] = await ethers.getSigners();

  const { tokens } = DEPLOY_CONSTANTS[network.name];

  for (const token of tokens) {
    const { name, symbol } = token;

    console.log(`Start deploy ${symbol}...`);

    const contract = await ethers.deployContract(
      'ERC20Mock',
      [name, symbol, parseUnits('1000000', 6)],
      signer,
    );
    const tx = contract.deploymentTransaction();
    await tx?.wait();

    console.log('Deployed:');
    console.log(await contract.getAddress());
    console.log(tx?.hash);
    console.log('\n');
  }
}

main().catch(console.error);
