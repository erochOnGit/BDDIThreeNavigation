import React from "react";
let DataTitle = props => {
  let spanClass = `${props.active ? "active" : ""}`;
  return (
    <div
      className={`data-title ${spanClass} ${(() => {
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
      {props.down ? (
        <React.Fragment>
          <span className={spanClass}>{props.sub}</span>
          <h3 onClick={props.onClick}>{props.main}</h3>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h3 onClick={props.onClick}>{props.main}</h3>
          <span className={spanClass}>{props.sub}</span>
        </React.Fragment>
      )}
    </div>
  );
};
export default DataTitle;
