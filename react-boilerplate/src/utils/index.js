import { SUPPORTED_CHAIN } from "../connection";

export const isSupportedChain = (chainId) =>
  Number(chainId) === SUPPORTED_CHAIN;