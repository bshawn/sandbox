import { EosService } from "./eos-service";
import { TestSignatureProvider } from "./__mocks__/test-signature-provider";
import { Api, JsonRpc, RpcError } from "eosjs";
import { SignatureProvider } from "eosjs/dist/eosjs-api-interfaces";

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

  service = new EosService(sigProvider, api, rpc);
});

describe("ctor", () => {
  it("returns an instance of EosService", () => {
    expect(service).toBeInstanceOf(EosService);
  });
});

describe("getRecentBlocks", () => {
  it("returns an array of Blocks", () => {
    const result = service.getRecentBlocks(1);
    expect(result).not.toBeNull;
  });

  it("returns the requested number of blocks", () => {
    let result = service.getRecentBlocks(1);
    expect(result.length).toBe(1);
    result = service.getRecentBlocks(4);
    expect(result.length).toBe(4);
  });

  it("calls rpc.get_block()", () => {
    service.getRecentBlocks(1);
    expect(rpc.get_block).toHaveBeenCalledTimes(1);
    service.getRecentBlocks(4);
    expect(rpc.get_block).toHaveBeenCalledTimes(4);
  });
});
