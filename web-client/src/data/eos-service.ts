import { BlockChainService } from "./block-chain-service";
import { JsonRpc } from "eosjs";
import { Block } from "./block";
import { BlockChainInfo } from "./block-chain-info";
import { GetBlockResult, GetAbiResult } from "eosjs/dist/eosjs-rpc-interfaces";
import { AbiInfo } from "./abi-info";

export class EosService implements BlockChainService {
  private jsonRpc: JsonRpc;

  constructor(jsonRpc: JsonRpc) {
    this.jsonRpc = jsonRpc;
  }

  async getRecentBlocks(count: number): Promise<Block[]> {
    const info = await this.getInfo();
    const blocks: Array<Block> = [];
    let i = 0;
    while (i < count) {
      let result: GetBlockResult;
      let id = info.headBlockId;

      if (i > 0) {
        id = blocks[i - 1].previousId;
      }

      try {
        result = await this.jsonRpc.get_block(id);
      } catch {
        throw new Error("call to get_block failed");
      }
      blocks.push(Block.fromBlockResult(result));

      i++;
    }
    return blocks;
  }

  async getInfo(): Promise<BlockChainInfo> {
    const result = await this.jsonRpc.get_info();
    return BlockChainInfo.fromInfoResult(result);
  }

  async getAbi(accountName: string): Promise<AbiInfo> {
    const result = await this.jsonRpc.get_abi(accountName);
    return AbiInfo.fromGetAbiResult(result);
  }
}
