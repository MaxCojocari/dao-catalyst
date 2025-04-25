export const DEPLOY_CONSTANTS = {
  testnet: {
    daoSimpleVote: '0xf06d6a85Dd7efBB72e8AB77F6fDF5f0c5Df602Ea',
    daoMultisigVote: '0x82a829AAE5C259d02C464BeE8a3295497D694e1b',
    daoFractionalVote: '0x4464Bb9c84Cf3a92c29518a398a234f0ce385b6C',
    factory: '0x74EF17208A595aB8c9375F416984cf0D8A2e260E',
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
      '0xf305fda0a2f03e52f8370a2480b81f08ae61a230', // simple
      '0xb1e4498fd67fa4f445e068d104ed563eca8b5650', // multisig
      '0x939172fe751fe7f439070ce9e36b3e6594d168d0', // simple
      '0x98c065f07051d3e1a9d728522d00ee08fac480cd', // simple
      '0xa74b04e54bcd514050d6e637bab8cd629714996b', // multisig
    ],
  },
} as Record<string, any>;
