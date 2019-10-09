import { Block } from "./block";
import { BlockChainInfo } from "./block-chain-info";

export interface BlockChainService {
  getRecentBlocks(count: number): Promise<Block[]>;
  getInfo(): Promise<BlockChainInfo>;
}
