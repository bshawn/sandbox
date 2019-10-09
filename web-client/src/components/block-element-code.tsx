import React from "react";

interface BlockElementCodeProps {
  isExpanded: boolean;
  code: string;
}

const BlockElementCode: React.FC<BlockElementCodeProps> = props => {
  if (props.isExpanded) {
    return (
      <div className="card-content">
        <div className="content">
          <pre>
            <code>{props.code}</code>
          </pre>
        </div>
      </div>
    );
  }

  return null;
};

export default BlockElementCode;
