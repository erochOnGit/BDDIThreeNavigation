import React from "react";

let ProgressCircle = props => {
  return (
    <div className="progress-circle">
      aaaaaaaaaaaaaaaaaaaaaaaaaaa
      <svg className="progress-ring-dot" width="120" height="120">
        <circle
          className="progress-ring-dot__circle"
          stroke="white"
          stroke-width="4"
          fill="transparent"
          r="52"
          cx="60"
          cy="60"
        />
      </svg>
      <svg className="progress-ring" width="120" height="120">
        <circle
          className="progress-ring__circle"
          stroke="white"
          stroke-width="4"
          fill="transparent"
          r="52"
          cx="60"
          cy="60"
        />
      </svg>
    </div>
  );
};

export default ProgressCircle;
