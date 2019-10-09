import { EosService } from "./eos-service";
import { JsonRpc } from "eosjs";
import {
  GetBlockResult,
  GetInfoResult,
  GetAbiResult
} from "eosjs/dist/eosjs-rpc-interfaces";
import { BlockChainInfo } from "./block-chain-info";
import { AbiInfo } from "./abi-info";

jest.mock("eosjs");

let service: EosService;
let rpc: JsonRpc;

beforeEach(() => {
  rpc = new JsonRpc("test");
  rpc.get_info = fakeGetInfo();
  rpc.get_block = fakeGetBlock();
  rpc.get_abi = fakeGetAbi();

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

  it("throws an error if the call fails", async () => {
    rpc.get_info = fakeGetInfoWithRejection();
    expect(() => service.getInfo()).toThrow();
  });
});

describe("getAbi", () => {
  it("returns an instance of AbiInfo", async () => {
    let result = await service.getAbi("test");
    expect(result).toBeInstanceOf(AbiInfo);
  });

  it("calls rpc.get_abi()", async () => {
    await service.getAbi("test");
    expect(rpc.get_abi).toHaveBeenCalled();
  });

  it("throws an error if the call fails", async () => {
    rpc.get_abi = fakeGetAbiWithRejection();
    expect(() => service.getAbi("test")).toThrow();
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

  it("throws an error if the call fails", async () => {
    rpc.get_block = fakeGetBlockWithRejection();
    expect(() => service.getRecentBlocks(1)).toThrow();
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

function fakeGetInfoWithRejection(): jest.Mock<Promise<GetInfoResult>> {
  return jest.fn(
    (): Promise<GetInfoResult> => {
      return Promise.reject("This failed");
    }
  );
}

function fakeGetAbi(): jest.Mock<Promise<GetAbiResult>> {
  return jest.fn(
    async (accountName: string): Promise<GetAbiResult> => {
      return {
        account_name: accountName,
        abi: {
          version: "version",
          types: [
            {
              new_type_name: "new_type_name",
              type: "type"
            }
          ],
          structs: [
            {
              name: "name",
              base: "base",
              fields: [
                {
                  name: "name",
                  type: "type"
                }
              ]
            }
          ],
          actions: [
            {
              name: "name",
              type: "type",
              ricardian_contract: "ricardian_contract"
            }
          ],
          tables: [
            {
              name: "name",
              type: "type",
              index_type: "index_type",
              key_names: ["key1", "key2"],
              key_types: ["type1", "type2"]
            }
          ],
          ricardian_clauses: [
            {
              id: "id",
              body: "body"
            }
          ],
          error_messages: [
            {
              error_code: "error_code",
              error_msg: "error_msg"
            }
          ],
          abi_extensions: [
            {
              tag: 0,
              value: "value0"
            },
            {
              tag: 1,
              value: "value1"
            }
          ]
        }
      };
    }
  );
}

function fakeGetAbiWithRejection(): jest.Mock<Promise<GetAbiResult>> {
  return jest.fn(() => Promise.reject("this failed"));
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

function fakeGetBlockWithRejection(): jest.Mock<Promise<GetBlockResult>> {
  return jest.fn(() => Promise.reject("this failed"));
}
