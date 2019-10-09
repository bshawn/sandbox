import React, { MouseEvent } from "react";
import { Block } from "../data/block";
import BlockElement from "./block-element";

interface BlockListProps {
  blocks: Block[];
  isLoading: boolean;
}

const BlockList: React.FC<BlockListProps> = props => {
  if (props.isLoading) return <div>Loading...</div>;
  if (props.blocks.length === 0) return <div>No data loaded</div>;

  return (
    <div>
      {props.blocks.map(b => (
        <BlockElement block={b} key={b.id} />
      ))}
    </div>
  );
};

export default BlockList;
