import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'solidity-docgen';
import 'dotenv/config';

const config: HardhatUserConfig = {
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545/',
    },
    mainnet: {
      url: `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`${process.env.MAINNET_DEPLOYER_PK}`],
    },
    testnet: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [`${process.env.TESTNET_DEPLOYER_PK}`],
    },
  },
  solidity: {
    compilers: [
      {
        version: '0.8.28',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};

export default config;
