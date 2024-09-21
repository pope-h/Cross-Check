"use client";
import { site } from "../config";
import { IMetadata } from "../interface";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

const projectId = "57c3ed3f7633af987eda789d503edfee";

if (!projectId) throw new Error("project ID not found");

export const ETH_CHAIN_ID: number = 1;

const ETHMainnet = {
  chainId: ETH_CHAIN_ID,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const metadata: IMetadata = {
  name: site.name || "My Website",
  description: site.desc || "My Website description",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

const ethersConfig = defaultConfig({
  metadata,
  enableEIP6963: true,
  enableInjected: true,
  enableCoinbase: true,
});

// 5. Create a Web3Modal instance
export const configureWeb3Modal = () => createWeb3Modal({
  ethersConfig,
  chains: [ETHMainnet],
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
});