import {
  getDefaultConfig,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { Config, WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { arbitrum, arbitrumSepolia, sepolia } from "viem/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "DAO Catalyst",
  projectId: import.meta.env.VITE_WALLET_CONNECT_ID,
  chains: [arbitrum, arbitrumSepolia, sepolia],
}) as Config;

const queryClient = new QueryClient();

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          modalSize="compact"
          coolMode
          theme={lightTheme({
            accentColor: "#7064F0",
            accentColorForeground: "white",
            borderRadius: "medium",
            fontStack: "system",
          })}
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
