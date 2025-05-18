export const DEPLOY_CONSTANTS = {
  testnet: {
    daoSimpleVote: '0xdE71511eE2B04144f05cCEADE750a052Aa833462',
    daoMultisigVote: '0x1fe7f5979c6a5F623cceED028c2Ba7C44611b800',
    daoFractionalVote: '0x382c3Bf7Bfd03B9c32659540313a192d985a91fF',
    factory: '0x762ACE01adcC984E116Ae5404d7ba4b4Bb3588fB',
    tokens: {
      usdt: {
        name: 'Test USDT',
        symbol: 'USDT',
        address: '0x75514BEcF3263054D32b45be7a5dB6C532D9b504',
      },
      usdc: {
        name: 'Test USDC',
        symbol: 'USDC',
        address: '0x68C169fE6D5233770DdA0FDf5F47F077175517F0',
      },
    },
    targetContract: '0xF209E6a7e3E31409C9b30D96050D9Bf75C26C1F3',
    daos: [
      '0x63e33db3f27324bda7b043811e04788ca33c449f', // simple
      '0x1844eeb4d73b2ca272073fb4a9be27d8e5cba593', // multisig
      '0xbb03f8545068cb0ce443d0810c5770a26696fb27', // simple
      '0xb8f30d9e118c2e3a0d940466510bb9a4827e973e', // simple
      '0x516d4a902e221b7bd4a34a9bc712f61a892a5e8f', // multisig
    ],
  },
} as Record<string, any>;
