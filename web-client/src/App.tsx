import React, { useState } from "react";
import "./App.scss";
import { Block } from "./data/block";
import { BlockChainService } from "./data/block-chain-service";
import BlockList from "./BlockList";
import LoadButton from "./LoadButton";

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

  return (
    <div className="App">
      <section className="hero is-primary is-bold">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">block.one</h1>
            <h2 className="subtitle">Developer Test</h2>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="buttons">
            <LoadButton isLoading={isLoading} onClick={loadBlocks} />
          </div>
          <BlockList isLoading={isLoading} blocks={blocks} />
        </div>
      </section>

      <footer className="footer">
        <div className="content has-text-centered">
          <p>
            Created by{" "}
            <strong>
              <a href="https://github.com/bshawn">Bret Shawn</a>
            </strong>{" "}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
