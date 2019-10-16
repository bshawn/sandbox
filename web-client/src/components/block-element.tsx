import React, { useState } from "react";
import { Block } from "../data/block";
import BlockElementCode from "./block-element-code";
import "./block-element.scss";

interface BlockElementProps {
  block: Block;
}

const BlockElement: React.FC<BlockElementProps> = props => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="card">
      <header
        className="clickable card-header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="card-header-title">
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
                  <small>
                    {props.block.timestamp}
                    <br />
                    {props.block.actionCount} actions
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* eslint-disable-next-line */}
        <a href="#" className="card-header-icon" aria-label="more options">
          <span className="icon">
            <i className="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </a>
      </header>
      <BlockElementCode isExpanded={isExpanded} code={props.block.raw} />
    </div>
  );
};

export default BlockElement;
