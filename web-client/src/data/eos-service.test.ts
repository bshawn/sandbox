import { EosService } from "./eos-service";
import { TestSignatureProvider } from "./__mocks__/test-signature-provider";
import { Api, JsonRpc, RpcError } from "eosjs";
import { SignatureProvider } from "eosjs/dist/eosjs-api-interfaces";
import { GetBlockResult } from "eosjs/dist/eosjs-rpc-interfaces";

jest.mock("eosjs");

let service: EosService;
let rpc: JsonRpc;
let sigProvider: SignatureProvider;
let api: Api;

beforeEach(() => {
  rpc = new JsonRpc("test");
  sigProvider = new TestSignatureProvider();
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

describe("getRecentBlocks", () => {
  beforeEach(() => {
    rpc.get_block = jest.fn(
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
  });

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
});
