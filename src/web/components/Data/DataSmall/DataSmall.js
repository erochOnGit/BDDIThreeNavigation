import React from "react";
import OuterCircle from "../OuterCircle";
import ProgressCircle from "../ProgressCircle";
import DataScheme from "../DataScheme";
import "./data.scss";

let openInteractionSix = props => {
  return () => {
    props.setSceneStep(5);
  };
};

let DataSmall = props => {
  return (
    <div
      className="data"
      onClick={
        // props.step < 2 ?
        openInteractionSix(props)
        //  : null
      }
    >
      {(() => {
        if (props.step === 0) {
          return <div className="title">Birth</div>;
        } else if (props.step === 1) {
          return <div className="title">Desir</div>;
        } else if (props.step === 2) {
          return <div className="title">Echo</div>;
        } else if (props.step === 3) {
          return <div className="title">Reflection</div>;
        }
      })()}
      {(() => {
        if (props.step >= 0) {
          return (
            <div className="container">
              <div className="outer">
                <OuterCircle
                  lineStyle="dotted"
                  width={150}
                  height={150}
                  step={props.step}
                />
              </div>
              <DataScheme
                step={props.step}
                userData={props.userData}
                noVideo={false}
              />
            </div>
          );
        }
      })()}
    </div>
  );
};

export default DataSmall;
