import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

export const SUPPORTED_CHAIN = 11155111;

// 1. Get projectId at https://cloud.walletconnect.com
// const projectId = "YOUR_PROJECT_ID";

// 2. Set chains
const sepolia = {
  chainId: SUPPORTED_CHAIN,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: import.meta.env.VITE_rpc_url,
};

// 3. Create modal
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

export const configureWeb3Modal = () =>
  createWeb3Modal({
    ethersConfig: defaultConfig({ metadata }),
    chains: [sepolia],
    projectId: import.meta.env.VITE_projectId,
    enableAnalytics: false, // Optional - defaults to your Cloud configuration
  });