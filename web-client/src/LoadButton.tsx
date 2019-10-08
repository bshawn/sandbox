import React, { useState } from "react";
import { Block } from "./data/block";
import BlockElement from "./BlockElement";

interface LoadButtonProps {
  isLoading: boolean;
  onClick?: () => void;
}

const LoadButton: React.FC<LoadButtonProps> = props => {
  let loadButtonCss = "button is-primary";
  if (props.isLoading) loadButtonCss += " is-loading is-disabled";

  return (
    <button className={loadButtonCss} onClick={props.onClick}>
      Load
    </button>
  );
};

export default LoadButton;
