import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { EosService } from "./data/eos-service";
import { JsonRpc } from "eosjs";
import { BlockChainService } from "./data/block-chain-service";

const rpc = new JsonRpc("https://api.eosnewyork.io");
const eosService: BlockChainService = new EosService(rpc);

ReactDOM.render(<App service={eosService} />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
