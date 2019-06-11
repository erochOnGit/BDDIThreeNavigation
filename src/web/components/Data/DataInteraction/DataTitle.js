import React from "react";
let DataTitle = props => {
  return (
    <div
      onClick={props.onClick}
      className={`titre ${(() => {
        if (props.up) {
          return "naissance";
        } else if (props.right) {
          return "desir";
        } else if (props.down) {
          return "echo";
        } else if (props.left) {
          return "reflect";
        }
      })()}`}
    >
      <h3>{props.main}</h3>
      <span>{props.sub}</span>
    </div>
  );
};
export default DataTitle;
