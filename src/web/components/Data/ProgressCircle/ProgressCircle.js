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
        <circle
          className={`${
            props.lineStyle == "dotted" ? "progress-ring-dot__circle" : ""
          } ${
            props.lineStyle == "transparent"
              ? "progress-ring-transparent__circle"
              : ""
          }`}
          stroke="white"
          strokeWidth="4"
          fill="transparent"
          r={props.width / 2 - 8}
          cx={props.width / 2}
          cy={props.height / 2}
        />
      </svg>
      <svg className="progress-ring" width={props.width} height={props.height}>
        {props.circle}
      </svg>
    </div>
  );
};

export default EnhanceProgressCircle()(ProgressCircle);
