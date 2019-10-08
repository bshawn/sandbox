import React, { useState } from "react";
import "./App.scss";
import { Block } from "./data/block";
import { BlockChainService } from "./data/block-chain-service";

interface AppProps {
  service: BlockChainService;
}

const App: React.FC<AppProps> = props => {
  const [blocks, setBlocks] = useState<Array<Block>>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function loadBlocks(): Promise<void> {
    setIsLoading(true);
    const b = await props.service.getRecentBlocks(10);
    setBlocks(b);
    setIsLoading(false);
  }

  let blockList: JSX.Element;
  if (isLoading) {
    blockList = <span>Loading...</span>;
  } else if (blocks.length === 0) {
    blockList = <span>No Data</span>;
  } else {
    blockList = (
      <div>
        {blocks.map(b => (
          <div key={b.id}>{b.id}</div>
        ))}
      </div>
    );
  }

  return (
    <div className="App">
      <h1 className="title">block.one</h1>
      <p className="subtitle">Developer Test</p>
      <div className="buttons">
        <button className="button is-primary" onClick={loadBlocks}>
          Load
        </button>
      </div>
      {blockList}
    </div>
  );
};

export default App;
