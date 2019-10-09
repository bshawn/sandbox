import { Block } from "./block";

export interface BlockChainService {
  getRecentBlocks(count: number): Promise<Block[]>;
}
