import { Block } from "./block";
import { GetBlockResult } from "eosjs/dist/eosjs-rpc-interfaces";

interface GetBlockResultWithTransactions extends GetBlockResult {
  transactions?: any[];
}

const blockResult: GetBlockResultWithTransactions = {
  timestamp: "timestamp",
  producer: "producer",
  confirmed: 0,
  previous: "previous",
  transaction_mroot: "transaction_mroot",
  action_mroot: "action_mroot",
  schedule_version: 0,
  producer_signature: "producer_signature",
  id: "id",
  block_num: 0,
  ref_block_prefix: 0,
  transactions: [
    {
      status: "executed",
      cpu_usage_us: 125,
      net_usage_words: 0,
      trx: "de8885b46c04e0ab45ed37da65d9614d0767121e6fa8972880bdca2b95b5d189"
    },
    {
      status: "executed",
      cpu_usage_us: 2579,
      net_usage_words: 44,
      trx: {
        id: "dab8563a9e1aafe906b890ea886991265661496a64b3cc8be9ca8f1321c1aebe",
        signatures: [
          "SIG_K1_K7CxAXbLShcgpr1rF4pFMYqC8XBPzrebyZtnjz27cUD3tH4YN9qSQG8znGaJCrAg45QJbnHS7k4pb8afmjWzkV8fKBv9Bd"
        ],
        compression: "none",
        packed_context_free_data: "",
        context_free_data: [],
        packed_trx:
          "8e1c9c5d86c854ac1ab50000000001000000ec001ca33e0000000080c0cd4d01000000ec001ca33e00000097667355a5fc01625c040000000000655349475f4b315f4b39383763554d466331397033556e366a3539643155414d614e6334614d553451553750716779365651725032644a5844485576685750356964506f564171544c46547936696e6a537163566248377335754a6d38676772654674416e47083833343133313035403034663863383731343766326534393739623261616564313965636637636563633530383936666335366162343865343635343663356432303037323164353005052d16343a05051c17352432051d19110d09052b0a381423050622020c0106010a0102ffffffff02000000ffffffffffffffff000000000a000000000000002200000000",
        transaction: {
          expiration: "2019-10-08T05:20:14",
          ref_block_num: 51334,
          ref_block_prefix: 3038424148,
          max_net_usage_words: 0,
          max_cpu_usage_ms: 0,
          delay_sec: 0,
          context_free_actions: [],
          actions: [
            {
              account: "bulls.bg",
              name: "draw1",
              authorization: [
                {
                  actor: "bulls.bg",
                  permission: "operator"
                }
              ]
            },
            {
              account: "bulls.bg",
              name: "draw2",
              authorization: [
                {
                  actor: "bulls.bg",
                  permission: "operator"
                }
              ]
            }
          ]
        }
      }
    },
    {
      status: "executed",
      cpu_usage_us: 2579,
      net_usage_words: 44,
      trx: {
        id: "dab8563a9e1aafe906b890ea886991265661496a64b3cc8be9ca8f1321c1aebe",
        signatures: [
          "SIG_K1_K7CxAXbLShcgpr1rF4pFMYqC8XBPzrebyZtnjz27cUD3tH4YN9qSQG8znGaJCrAg45QJbnHS7k4pb8afmjWzkV8fKBv9Bd"
        ],
        compression: "none",
        packed_context_free_data: "",
        context_free_data: [],
        packed_trx:
          "8e1c9c5d86c854ac1ab50000000001000000ec001ca33e0000000080c0cd4d01000000ec001ca33e00000097667355a5fc01625c040000000000655349475f4b315f4b39383763554d466331397033556e366a3539643155414d614e6334614d553451553750716779365651725032644a5844485576685750356964506f564171544c46547936696e6a537163566248377335754a6d38676772654674416e47083833343133313035403034663863383731343766326534393739623261616564313965636637636563633530383936666335366162343865343635343663356432303037323164353005052d16343a05051c17352432051d19110d09052b0a381423050622020c0106010a0102ffffffff02000000ffffffffffffffff000000000a000000000000002200000000",
        transaction: {
          expiration: "2019-10-08T05:20:14",
          ref_block_num: 51334,
          ref_block_prefix: 3038424148,
          max_net_usage_words: 0,
          max_cpu_usage_ms: 0,
          delay_sec: 0,
          context_free_actions: [],
          actions: [
            {
              account: "bulls.bg",
              name: "draw1",
              authorization: [
                {
                  actor: "bulls.bg",
                  permission: "operator"
                }
              ]
            },
            {
              account: "bulls.bg",
              name: "draw2",
              authorization: [
                {
                  actor: "bulls.bg",
                  permission: "operator"
                }
              ]
            }
          ]
        }
      }
    }
  ]
};

describe("fromBlockResult", () => {
  it("returns an instance of Block", () => {
    const block = Block.fromBlockResult(blockResult);
    expect(block).toBeInstanceOf(Block);
  });

  it("converts the common properties correctly", () => {
    const block = Block.fromBlockResult(blockResult);
    expect(block.id).toEqual(blockResult.id);
    expect(block.timestamp).toEqual(blockResult.timestamp);
    expect(block.previousId).toEqual(blockResult.previous);
    expect(block.raw).toEqual(JSON.stringify(blockResult, null, 2));
  });

  it("throws if the blockResult argument is null or undefined", () => {
    const errMsg = "blockResult was null or undefined";
    expect(() => Block.fromBlockResult(<any>undefined)).toThrowError(errMsg);
    expect(() => Block.fromBlockResult(<any>null)).toThrowError(errMsg);
  });

  it("calculates the total number of actions", () => {
    const block = Block.fromBlockResult(blockResult);
    expect(block.actionCount).toEqual(4);
  });
});
