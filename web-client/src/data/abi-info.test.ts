import { AbiInfo } from "./abi-info";
import { GetAbiResult } from "eosjs/dist/eosjs-rpc-interfaces";

describe("fromGetAbiResult", () => {
  let abiResult: GetAbiResult;

  beforeEach(() => {
    abiResult = fakeGetAbiResult();
  });

  it("returns an instance of AbiInfo", () => {
    const info = AbiInfo.fromGetAbiResult(abiResult);
    expect(info).toBeInstanceOf(AbiInfo);
  });

  it("converts the common properties correctly", () => {
    const info = AbiInfo.fromGetAbiResult(abiResult);
    expect(info.accountName).toEqual(abiResult.account_name);
    expect(info.abi).toEqual(JSON.stringify(abiResult.abi, null, 2));
  });

  it("throws if the abiResult argument is null or undefined", () => {
    const errMsg = "abiResult was null or undefined";
    expect(() => AbiInfo.fromGetAbiResult(<any>undefined)).toThrowError(errMsg);
    expect(() => AbiInfo.fromGetAbiResult(<any>null)).toThrowError(errMsg);
  });
});

function fakeGetAbiResult(): GetAbiResult {
  return {
    account_name: "account_name",
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
