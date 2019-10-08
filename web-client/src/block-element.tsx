import React, { MouseEvent } from "react";
import { Block } from "./data/block";

interface BlockElementProps {
  block: Block;
  isExpanded: boolean;
  onClick?: (e: MouseEvent) => void;
}

const BlockElement: React.FC<BlockElementProps> = props => {
  return (
    <div className="box" onClick={props.onClick}>
      <article className="media">
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
            <p>
              <pre>
                <code>{props.block.raw}</code>
              </pre>
            </p>
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlockElement;
