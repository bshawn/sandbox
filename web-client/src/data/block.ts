import { GetBlockResult } from "eosjs/dist/eosjs-rpc-interfaces";

export class Block {
  public id: string = "";
  public timestamp: string = "";
  public actionCount: number = 0;

  public static fromBlockResult(blockResult: GetBlockResult): Block {
    if (!blockResult) throw new Error("blockResult was null or undefined");

    const block = new Block();
    block.id = blockResult.id;
    block.timestamp = blockResult.timestamp;
    return block;
  }
}
