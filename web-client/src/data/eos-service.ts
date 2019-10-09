import { BlockChainService } from "./block-chain-service";
// import { SignatureProvider } from "eosjs/dist/eosjs-api-interfaces";
// import { Api, JsonRpc, RpcError, RpcInterfaces } from "eosjs";
import { JsonRpc } from "eosjs";
import { Block } from "./block";
import { BlockChainInfo } from "./block-chain-info";
import { GetBlockResult } from "eosjs/dist/eosjs-rpc-interfaces";

export class EosService implements BlockChainService {
  // private signatureProvider: SignatureProvider;
  private jsonRpc: JsonRpc;
  // private api: Api;

  constructor(
    //signatureProvider: SignatureProvider,
    //api: Api,
    jsonRpc: JsonRpc
  ) {
    // this.signatureProvider = signatureProvider;
    // this.api = api;
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

      result = await this.jsonRpc.get_block(id);
      blocks.push(Block.fromBlockResult(result));

      i++;
    }
    return blocks;
  }

  async getInfo(): Promise<BlockChainInfo> {
    const result = await this.jsonRpc.get_info();
    return BlockChainInfo.fromInfoResult(result);
  }
}
