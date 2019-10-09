import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BlockChainService } from "./data/block-chain-service";
import { Block } from "./data/block";
import { BlockChainInfo } from "./data/block-chain-info";

let blockChainService: BlockChainService;

beforeEach(() => {
  blockChainService = fakeBlockChainService();
});

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App service={blockChainService} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

function fakeBlockChainService(): BlockChainService {
  return {
    getRecentBlocks: jest.fn((count: number) =>
      Promise.resolve([new Block(), new Block()])
    ),
    getInfo: jest.fn(() => Promise.resolve(new BlockChainInfo()))
  };
}
