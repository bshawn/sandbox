import { Block } from "./block";
import { GetBlockResult } from "eosjs/dist/eosjs-rpc-interfaces";

const blockResult: GetBlockResult = {
  timestamp: "timestamp",
  producer: "producer",
  confirmed: 0,
  previous: "previous",
  transaction_mroot: "transaction_mroot",
  action_mroot: "action_mroot",
  schedule_version: 0,
  producer_signature: "producer_signature",
  id: "id",
  block_num: 0,
  ref_block_prefix: 0
};

describe("fromBlockResult", () => {
  it("returns an instance of Block", () => {
    const block = Block.fromBlockResult(blockResult);
    expect(block).toBeInstanceOf(Block);
  });

  it("converts the common properties correctly", () => {
    const block = Block.fromBlockResult(blockResult);
    expect(block.id).toEqual(blockResult.id);
    expect(block.timestamp).toEqual(blockResult.timestamp);
  });

  it("throws if the blockResult argument is null or undefined", () => {
    expect(() => Block.fromBlockResult(<any>undefined)).toThrowError(
      "blockResult was null or undefined"
    );
    expect(() => Block.fromBlockResult(<any>null)).toThrowError(
      "blockResult was null or undefined"
    );
  });
});
