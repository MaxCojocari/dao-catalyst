import 'dotenv/config';
import { ethers, network } from 'hardhat';
import {
  Dao__factory,
  DaoToken__factory,
  ERC20__factory,
  ERC20Mock__factory,
  MockFundToken__factory,
} from '../typechain-types';
import { DEPLOY_CONSTANTS } from '../constants';
import { parseUnits } from 'ethers';

async function main() {
  const [signer] = await ethers.getSigners();
  const {
    daos,
    tokens: { usdt, usdc },
  } = DEPLOY_CONSTANTS[network.name];

  // const govTokenAddr = '0x3b08846e23c3fbdc7e0b5567a4359307015cfef9';
  // const govToken = DaoToken__factory.connect(govTokenAddr, signer);

  // console.log(await govToken.supportsInterface('0xe90fb3f6'));

  const amountUsdt = parseUnits('32450.22', 6);
  const amountUsdc = parseUnits('150000', 6);
  const takeAmount = parseUnits('8991.1', 6);
  const usdtContract = ERC20Mock__factory.connect(usdt.address, signer);
  const usdcContract = ERC20Mock__factory.connect(usdc.address, signer);

  for (const dao of [daos[0]]) {
    const daoContract = Dao__factory.connect(dao, signer);

    let tx = await usdcContract.transfer(dao, amountUsdc);
    await tx.wait();
    console.log('Transfer 1', tx.hash);

    tx = await daoContract.transfer(usdc.address, signer, takeAmount);
    await tx.wait();
    console.log('Withdraw', tx.hash);

    tx = await usdtContract.mint(dao, amountUsdt);
    await tx.wait();
    console.log('Transfer 2', tx.hash);
  }
}

main().catch(console.error);
