import { PushTransactionArgs } from "eosjs/dist/eosjs-rpc-interfaces";

export class TestPushTxArgs implements PushTransactionArgs {
  signatures: string[] = ["test"];
  serializedTransaction: Uint8Array = new Uint8Array();
}
