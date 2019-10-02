import {
  SignatureProvider,
  SignatureProviderArgs
} from "eosjs/dist/eosjs-api-interfaces";
import { PushTransactionArgs } from "eosjs/dist/eosjs-rpc-interfaces";
import { TestPushTxArgs } from "./test-push-tx-args";

export class TestSignatureProvider implements SignatureProvider {
  private signatures: string[] = ["test1"];

  public getAvailableKeys(): Promise<string[]> {
    return Promise.resolve(this.signatures);
  }

  public sign(args: SignatureProviderArgs): Promise<PushTransactionArgs> {
    return Promise.resolve(new TestPushTxArgs());
  }
}
