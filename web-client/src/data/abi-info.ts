import { GetAbiResult } from "eosjs/dist/eosjs-rpc-interfaces";

export class AbiInfo {
  accountName: string = "";
  abi: string = "";

  static fromGetAbiResult(abiResult: GetAbiResult): AbiInfo {
    if (!abiResult) throw new Error("abiResult was null or undefined");
    const abi = new AbiInfo();
    abi.accountName = abiResult.account_name;
    abi.abi = JSON.stringify(abiResult.abi, null, 2);
    return abi;
  }
}
