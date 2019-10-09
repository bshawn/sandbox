import { GetInfoResult } from "eosjs/dist/eosjs-rpc-interfaces";

export class BlockChainInfo {
  public chainId: string = "";
  public headBlockId: string = "";

  public static fromInfoResult(infoResult: GetInfoResult): BlockChainInfo {
    if (!infoResult) throw new Error("infoResult was null or undefined");
    let info = new BlockChainInfo();
    info.chainId = infoResult.chain_id;
    info.headBlockId = infoResult.head_block_id;
    return info;
  }
}
