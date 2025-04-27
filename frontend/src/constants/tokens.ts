import usdcIcon from "../assets/images/tokens/usdc.svg";
import usdtIcon from "../assets/images/tokens/usdt.svg";
import ethIcon from "../assets/images/tokens/eth.svg";
import { Token } from "../types";

export const TOKENS: Token[] = [
  {
    symbol: "USDC",
    address: "0x68C169fE6D5233770DdA0FDf5F47F077175517F0",
    decimals: 6,
    icon: usdcIcon,
  },
  {
    symbol: "USDT",
    address: "0x75514BEcF3263054D32b45be7a5dB6C532D9b504",
    decimals: 6,
    icon: usdtIcon,
  },
  {
    symbol: "ETH",
    decimals: 18,
    address: "0x0000000000000000000000000000000000000000",
    icon: ethIcon,
  },
];
