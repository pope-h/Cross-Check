import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: "0.8.23",
  networks: {
    // for testnet
    'lisk-sepolia': {
      url: 'https://rpc.sepolia-api.lisk.com',
      accounts: [process.env.DEPLOYER_PRIVATE_KEY as string],
      gasPrice: 1000000000,
    },
  },

  // Hardhat expects etherscan here, even if you're using Blockscout.
  etherscan: {
    // Use "123" as a placeholder, because Blockscout doesn't need a real API key, and Hardhat will complain if this property isn't set.
    apiKey: {
      "lisk-sepolia": "123"
    },
    customChains: [
      {
          network: "lisk-sepolia",
          chainId: 4202,
          urls: {
              apiURL: "https://sepolia-blockscout.lisk.com/api",
              browserURL: "https://sepolia-blockscout.lisk.com"
          }
      }
    ]
  },
  sourcify: {
    enabled: false
  },
};

export default config;