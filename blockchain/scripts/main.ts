import Moralis from 'moralis';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import 'dotenv/config';
import { ethers } from 'hardhat';
import { Dao__factory } from '../typechain-types';

async function main() {
  const [signer] = await ethers.getSigners();

  const daoAddresses = [
    '0xa74b04e54bcd514050d6e637bab8cd629714996b',
    '0xb1e4498fd67fa4f445e068d104ed563eca8b5650',
  ];
  const MEMBER_ROLE = '0x829b824e2329e205435d941c9f13baf578548505283d29261236d8e6596d4636';

  for (const addr of daoAddresses) {
    const dao = Dao__factory.connect(addr, signer);

    const tx = await dao.revokeRole(MEMBER_ROLE, signer);
    await tx.wait();
    console.log(tx.hash);
  }
}

main().catch(console.error);
