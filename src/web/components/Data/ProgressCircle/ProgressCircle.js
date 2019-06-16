import React from "react";
import EnhanceProgressCircle from "./EnhanceProgressCircle";
import "./ProgressCircle.scss";

let ProgressCircle = props => {
  return (
    <div className="progress-circle">
      <svg
        className="progress-ring-dot"
        width={props.width}
        height={props.height}
      >
        {props.baseCircle}
      </svg>
      <svg className="progress-ring" width={props.width} height={props.height}>
        {props.circle}
      </svg>
    </div>
  );
};

export default EnhanceProgressCircle()(ProgressCircle);
