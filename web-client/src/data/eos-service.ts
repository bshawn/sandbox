import { BlockChainService } from "./block-chain-service";
// import { SignatureProvider } from "eosjs/dist/eosjs-api-interfaces";
// import { Api, JsonRpc, RpcError, RpcInterfaces } from "eosjs";
import { JsonRpc } from "eosjs";
import { Block } from "./block";
import { BlockChainInfo } from "./block-chain-info";

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
    const blocks: Array<Block> = [];
    let i = 1;
    while (i <= count) {
      const result = await this.jsonRpc.get_block(i);
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
