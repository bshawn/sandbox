import { GetBlockResult } from "eosjs/dist/eosjs-rpc-interfaces";

interface GetBlockResultWithTransactions extends GetBlockResult {
  transactions?: any[];
}

export class Block {
  public id: string = "";
  public timestamp: string = "";
  public previousId: string = "";
  public actionCount: number = 0;
  public raw: string = "";

  public static fromBlockResult(
    blockResult: GetBlockResultWithTransactions
  ): Block {
    if (!blockResult) throw new Error("blockResult was null or undefined");

    const block = new Block();
    block.id = blockResult.id;
    block.timestamp = blockResult.timestamp;
    block.previousId = blockResult.previous;
    block.raw = JSON.stringify(blockResult, null, 2);
    block.actionCount = this.calculateActions(blockResult);
    return block;
  }

  private static calculateActions(
    blockResult: GetBlockResultWithTransactions
  ): number {
    if (!blockResult.transactions) return 0;

    return blockResult.transactions.reduce<number>((prev, current) => {
      if (current.trx instanceof Object) {
        return current.trx.transaction.actions.length + prev;
      }

      return 0;
    }, 0);
  }
}
