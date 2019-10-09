import React, { MouseEvent } from "react";

interface LoadButtonProps {
  isLoading: boolean;
  onClick?: (e: MouseEvent) => void;
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
