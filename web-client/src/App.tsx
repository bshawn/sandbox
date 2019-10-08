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
    blockList = <div>Loading...</div>;
  } else if (blocks.length === 0) {
    blockList = <div>No Data</div>;
  } else {
    blockList = (
      <div>
        {blocks.map(b => (
          <div className="box" key={b.id}>
            <article className="media">
              <div className="media-left">
                <figure className="image is-64x64">
                  <img src="./blockchain-128.png" alt="Image" />
                </figure>
              </div>
              <div className="media-content">
                <div className="content">
                  <p>
                    <strong>{b.id}</strong>
                  </p>
                  <p>
                    <small>{b.timestamp}</small>
                  </p>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>
    );
  }

  let loadButtonCss = "button is-primary";
  if (isLoading) loadButtonCss += " is-loading is-disabled";

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
            <button className={loadButtonCss} onClick={loadBlocks}>
              Load
            </button>
          </div>
          {blockList}
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
