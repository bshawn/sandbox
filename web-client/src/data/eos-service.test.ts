import { EosService } from "./eos-service";
import { TestSignatureProvider } from "./__mocks__/test-signature-provider";
import { Api, JsonRpc, RpcError } from "eosjs";

jest.mock("eosjs");

describe("constructor", () => {
  it("returns an instance of EosService", () => {
    const service = new EosService(
      new TestSignatureProvider(),
      new Api({
        rpc: new JsonRpc("test"),
        signatureProvider: new TestSignatureProvider()
      }),
      new JsonRpc("test")
    );
    expect(service).toBeInstanceOf(EosService);
  });
});
