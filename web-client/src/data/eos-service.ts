import { SignatureProvider } from "eosjs/dist/eosjs-api-interfaces";
import { Api, JsonRpc, RpcError } from "eosjs";
import { Block } from "./block";

export class EosService {
  private signatureProvider: SignatureProvider;
  private jsonRpc: JsonRpc;
  private api: Api;

  constructor(
    signatureProvider: SignatureProvider,
    api: Api,
    jsonRpc: JsonRpc
  ) {
    this.signatureProvider = signatureProvider;
    this.api = api;
    this.jsonRpc = jsonRpc;
  }

  getRecentBlocks(count: number): Block[] {
    const retVal = [];
    for (let i = 0; i < count; i++) {
      this.jsonRpc.get_block(i);
      retVal.push(new Block());
    }
    return retVal;
  }
}
