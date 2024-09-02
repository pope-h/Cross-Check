import { ethers } from "ethers";
import DigitalStamp from "../contract/DigitalStamp.json";

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";

export const getContract = async () => {
  if (!window.ethereum) throw new Error("MetaMask is not installed");

  await window.ethereum.request({ method: "eth_requestAccounts" });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    DigitalStamp.abi,
    signer
  );

  return contract;
};