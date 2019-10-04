import { GetBlockResult } from "eosjs/dist/eosjs-rpc-interfaces";

export class Block {
  public id: string = "";
  public timestamp: string = "";
  public actionCount: number = 0;

  public static fromBlockResult(dto: GetBlockResult): Block {
    const block = new Block();
    block.id = dto.id;
    block.timestamp = dto.timestamp;
    return block;
  }
}
