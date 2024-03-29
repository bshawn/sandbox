import { EosService } from "./eos-service";
import { Api, JsonRpc, RpcError } from "eosjs";
import {
  SignatureProvider,
  SignatureProviderArgs
} from "eosjs/dist/eosjs-api-interfaces";
import {
  GetBlockResult,
  GetInfoResult,
  PushTransactionArgs
} from "eosjs/dist/eosjs-rpc-interfaces";
import { BlockChainInfo } from "./block-chain-info";

jest.mock("eosjs");

let service: EosService;
let rpc: JsonRpc;
let sigProvider: SignatureProvider;
let api: Api;

beforeEach(() => {
  rpc = new JsonRpc("test");
  rpc.get_info = fakeGetInfo();
  rpc.get_block = fakeGetBlock();
  sigProvider = fakeSignatureProvider();
  api = new Api({
    rpc: rpc,
    signatureProvider: sigProvider
  });

  service = new EosService(rpc);
});

describe("ctor", () => {
  it("returns an instance of EosService", () => {
    expect(service).toBeInstanceOf(EosService);
  });
});

describe("getInfo", () => {
  it("returns an instance of BlockChainInfo", async () => {
    let result = await service.getInfo();
    expect(result).toBeInstanceOf(BlockChainInfo);
  });

  it("calls rpc.get_info()", async () => {
    await service.getInfo();
    expect(rpc.get_info).toHaveBeenCalled();
  });
});

describe("getRecentBlocks", () => {
  it("returns an array of Blocks", () => {
    const result = service.getRecentBlocks(1);
    expect(result).not.toBeNull;
  });

  it("returns the requested number of Blocks", async () => {
    let result = await service.getRecentBlocks(1);
    expect(result.length).toBe(1);
    result = await service.getRecentBlocks(4);
    expect(result.length).toBe(4);
  });

  it("calls rpc.get_block()", async () => {
    await service.getRecentBlocks(1);
    expect(rpc.get_block).toHaveBeenCalledTimes(1);
    await service.getRecentBlocks(5);
    expect(rpc.get_block).toHaveBeenCalledTimes(1 + 5);
  });

  it("returns a unique list of Blocks", async () => {
    let result = await service.getRecentBlocks(2);
    const id1 = result[0].id;
    const id2 = result[1].id;
    expect(id1).not.toEqual(id2);
  });

  it("calls rpc.get_info() to get the first block", async () => {
    await service.getRecentBlocks(5);
    expect(rpc.get_info).toHaveBeenCalledTimes(1);
  });
});

function fakeGetInfo(): jest.Mock<Promise<GetInfoResult>> {
  return jest.fn(
    async (): Promise<GetInfoResult> => {
      return {
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
    }
  );
}

function fakeGetBlock(): jest.Mock<Promise<GetBlockResult>> {
  return jest.fn(
    async (blockNumOrId: number | string): Promise<GetBlockResult> => {
      return {
        timestamp: "timestamp",
        producer: "producer",
        confirmed: 0,
        previous: "previous",
        transaction_mroot: "transaction_mroot",
        action_mroot: "action_mroot",
        schedule_version: 0,
        producer_signature: "producer_signature",
        id: blockNumOrId.toString(),
        block_num: 0,
        ref_block_prefix: 0
      };
    }
  );
}

function fakeSignatureProvider(): SignatureProvider {
  return {
    getAvailableKeys: jest.fn(() => Promise.resolve(["test1", "test2"])),
    sign: jest.fn((args: SignatureProviderArgs) =>
      Promise.resolve(fakePushTxArgs())
    )
  };
}

function fakePushTxArgs(): PushTransactionArgs {
  return {
    signatures: ["test1", "test2"],
    serializedTransaction: new Uint8Array()
  };
}
