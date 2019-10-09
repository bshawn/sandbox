import React, { MouseEvent } from "react";
import { Block } from "./data/block";

interface BlockElementProps {
  block: Block;
  isExpanded: boolean;
  onClick?: (e: MouseEvent) => void;
}

const BlockElement: React.FC<BlockElementProps> = props => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">
          <div className="media">
            <div className="media-left">
              <figure className="image is-64x64">
                <img src="./blockchain-128.png" alt="Block Chain Icon" />
              </figure>
            </div>
            <div className="media-content">
              <div className="content">
                <p>
                  <strong>{props.block.id}</strong>
                </p>
                <p>
                  <small>{props.block.timestamp}</small>
                </p>
              </div>
            </div>
          </div>
        </p>
        <a href="#" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <div className="card-content">
        <div className="content">
          <pre>{props.block.raw}</pre>
        </div>
      </div>
    </div>
  );
};

export default BlockElement;
