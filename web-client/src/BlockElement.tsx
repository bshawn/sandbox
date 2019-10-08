import React from "react";
import { Block } from "./data/block";

interface BlockElementProps {
  block: Block;
  expanded: boolean;
}

const BlockElement: React.FC<BlockElementProps> = props => {
  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src="./blockchain-128.png" alt="Image" />
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
      </article>
    </div>
  );
};

export default BlockElement;
