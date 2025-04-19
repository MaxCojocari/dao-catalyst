import usdcIcon from "../assets/images/tokens/usdc.svg";
import usdtIcon from "../assets/images/tokens/usdt.svg";
import ethIcon from "../assets/images/tokens/eth.svg";
import { Token } from "../types";

export const TOKENS: Token[] = [
  {
    symbol: "USDC",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    decimals: 6,
    icon: usdcIcon,
  },
  {
    symbol: "USDT",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
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
