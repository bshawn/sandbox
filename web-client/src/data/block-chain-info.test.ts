import { BlockChainInfo } from "./block-chain-info";
import { GetInfoResult } from "eosjs/dist/eosjs-rpc-interfaces";

const infoResult: GetInfoResult = {
  server_version: "server_version",
  chain_id: "chain_id",
  head_block_num: 0,
  last_irreversible_block_num: 0,
  last_irreversible_block_id: "last_irreversible_block_id",
  head_block_id: "head_block_id",
  head_block_time: "head_block_time",
  head_block_producer: "head_block_producer",
  virtual_block_cpu_limit: 0,
  virtual_block_net_limit: 0,
  block_cpu_limit: 0,
  block_net_limit: 0
};

describe("fromInfoResult", () => {
  it("returns an instance of BlockChainInfo", () => {
    const info = BlockChainInfo.fromInfoResult(infoResult);
    expect(info).toBeInstanceOf(BlockChainInfo);
  });

  it("converts the common properties correctly", () => {
    const info = BlockChainInfo.fromInfoResult(infoResult);
    expect(info.chainId).toEqual(infoResult.chain_id);
    expect(info.headBlockId).toEqual(infoResult.head_block_id);
  });

  it("throws if the infoResult argument is null or undefined", () => {
    const errMsg = "infoResult was null or undefined";
    expect(() => BlockChainInfo.fromInfoResult(<any>undefined)).toThrowError(
      errMsg
    );
    expect(() => BlockChainInfo.fromInfoResult(<any>null)).toThrowError(errMsg);
  });
});
