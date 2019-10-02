import { EosService } from "./eos-service";
import { TestSignatureProvider } from "./__mocks__/test-signature-provider";
import { Api, JsonRpc, RpcError } from "eosjs";

jest.mock("eosjs");

let service: EosService;

beforeEach(() => {
  service = new EosService(
    new TestSignatureProvider(),
    new Api({
      rpc: new JsonRpc("test"),
      signatureProvider: new TestSignatureProvider()
    }),
    new JsonRpc("test")
  );
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
});
