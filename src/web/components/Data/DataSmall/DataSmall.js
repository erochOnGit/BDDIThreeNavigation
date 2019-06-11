import React from "react";
import OuterCircle from "../OuterCircle";
import ProgressCircle from "../ProgressCircle";
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
      onClick={props.step < 2 ? openInteractionSix(props) : null}
    >
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
                {/* <ProgressCircle width={150} height={150} /> */}
              </div>
              <div className="up">
                <ProgressCircle
                  lineStyle="transparent"
                  width={80}
                  height={80}
                  step={props.step} //in order to handle the color once the step is finish
                  finishState={1} //in order to handle the color once the step is finish
                  userData={props.userData}
                />
              </div>
              <div className="down">
                <ProgressCircle
                  lineStyle="transparent"
                  width={80}
                  height={80}
                  step={props.step} //in order to handle the color once the step is finish
                  finishState={1}
                  userData={props.userData}
                />
              </div>
              {(() => {
                if (props.step >= 1) {
                  return (
                    <div>
                      <div className="left">
                        <ProgressCircle
                          lineStyle="transparent"
                          width={80}
                          height={80}
                          step={props.step} //in order to handle the color once the step is finish
                          finishState={2} //in order to handle the color once the step is finish
                          userData={props.userData}
                        />
                      </div>
                      <div className="right">
                        <ProgressCircle
                          lineStyle="transparent"
                          width={80}
                          height={80}
                          step={props.step} //in order to handle the color once the step is finish
                          finishState={2} //in order to handle the color once the step is finish
                          userData={props.userData}
                        />
                      </div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (props.step >= 2) {
                  return (
                    <div className="rotated">
                      <div className="container">
                        <div className="up">
                          <ProgressCircle
                            lineStyle="dotted"
                            width={80}
                            height={80}
                            step={props.step} //in order to handle the color once the step is finish
                            finishState={3} //in order to handle the color once the step is finish
                            userData={props.userData}
                          />
                        </div>
                        <div className="down">
                          <ProgressCircle
                            lineStyle="dotted"
                            width={80}
                            height={80}
                            step={props.step} //in order to handle the color once the step is finish
                            finishState={3} //in order to handle the color once the step is finish
                            userData={props.userData}
                          />
                        </div>
                        <div className="left">
                          <ProgressCircle
                            lineStyle="dotted"
                            width={80}
                            height={80}
                            step={props.step} //in order to handle the color once the step is finish
                            finishState={3} //in order to handle the color once the step is finish
                            userData={props.userData}
                          />
                        </div>
                        <div className="right">
                          <ProgressCircle
                            lineStyle="dotted"
                            width={80}
                            height={80}
                            step={props.step} //in order to handle the color once the step is finish
                            finishState={3} //in order to handle the color once the step is finish
                            userData={props.userData}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              })()}
              {(() => {
                if (props.step >= 3) {
                  return (
                    <div className="contained">
                      <div className="container">
                        <div className="up">
                          <ProgressCircle
                            lineStyle="transparent"
                            width={20}
                            height={20}
                            step={props.step} //in order to handle the color once the step is finish
                            finishState={4} //in order to handle the color once the step is finish
                            userData={props.userData}
                          />
                          <ProgressCircle
                            lineStyle="transparent"
                            width={10}
                            height={10}
                            step={props.step} //in order to handle the color once the step is finish
                            finishState={4} //in order to handle the color once the step is finish
                            userData={props.userData}
                          />
                        </div>
                        <div className="up up-right-small">
                          <ProgressCircle
                            lineStyle="transparent"
                            width={20}
                            height={20}
                            step={props.step} //in order to handle the color once the step is finish
                            finishState={4} //in order to handle the color once the step is finish
                            userData={props.userData}
                          />
                        </div>
                        <div className="up right-small">
                          <ProgressCircle
                            lineStyle="transparent"
                            width={20}
                            height={20}
                            step={props.step} //in order to handle the color once the step is finish
                            finishState={4} //in order to handle the color once the step is finish
                            userData={props.userData}
                          />
                        </div>
                        <div className="up bottom-right-small">
                          <ProgressCircle
                            lineStyle="transparent"
                            width={20}
                            height={20}
                            step={props.step} //in order to handle the color once the step is finish
                            finishState={4} //in order to handle the color once the step is finish
                            userData={props.userData}
                          />
                        </div>
                        <div className="up bottom-small">
                          <ProgressCircle
                            lineStyle="transparent"
                            width={20}
                            height={20}
                            step={props.step} //in order to handle the color once the step is finish
                            finishState={4} //in order to handle the color once the step is finish
                            userData={props.userData}
                          />
                        </div>
                        <div className="up bottom-left-small">
                          <ProgressCircle
                            lineStyle="transparent"
                            width={20}
                            height={20}
                            step={props.step} //in order to handle the color once the step is finish
                            finishState={4} //in order to handle the color once the step is finish
                            userData={props.userData}
                          />
                        </div>
                        <div className="up left-small">
                          <ProgressCircle
                            lineStyle="transparent"
                            width={20}
                            height={20}
                            step={props.step} //in order to handle the color once the step is finish
                            finishState={4} //in order to handle the color once the step is finish
                            userData={props.userData}
                          />
                        </div>
                        <div className="up up-left-small">
                          <ProgressCircle
                            lineStyle="transparent"
                            width={20}
                            height={20}
                            step={props.step} //in order to handle the color once the step is finish
                            finishState={4} //in order to handle the color once the step is finish
                            userData={props.userData}
                          />
                        </div>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>
          );
        }
      })()}
    </div>
  );
};

export default DataSmall;
