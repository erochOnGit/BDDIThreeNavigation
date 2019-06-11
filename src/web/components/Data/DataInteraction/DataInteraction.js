import React from "react";
import EnhanceDataInteraction from "./EnhanceDataInteraction";
import OuterCircle from "../OuterCircle";
import ProgressCircle from "../ProgressCircle";
import DataTitle from "./DataTitle";
import DataScheme from "../DataScheme";
import "./DataInteraction.scss";

let interactionsNames = [
  {
    main: "Naissance",
    sub: "heart of the flower",
    dataStep: 0,
    direction: "up"
  },
  {
    main: "Reflet",
    sub: "heart of the flower",
    dataStep: 3,
    direction: "left"
  },
  {
    main: "Desir",
    sub: "heart of the flower",
    dataStep: 1,
    direction: "right"
  },
  {
    main: "Echo",
    sub: "heart of the flower",
    dataStep: 2,
    direction: "down"
  }
];

let DataInteraction = props => {
  console.log(props);
  return (
    <div className="data-interaction">
      {interactionsNames.map(interactionName => (
        <DataTitle
          key={interactionName.main}
          up={interactionName.direction === "up" ? true : false}
          left={interactionName.direction === "left" ? true : false}
          right={interactionName.direction === "right" ? true : false}
          down={interactionName.direction === "down" ? true : false}
          onClick={() => {
            props.setDataStep(interactionName.dataStep);
          }}
          main={interactionName.main}
          sub={interactionName.sub}
        />
      ))}

      <div className="data scale">
        {(() => {
          if (props.dataStep >= -1) {
            return (
              <div className="container">
                <div className="step-progress">
                  <ProgressCircle
                    lineStyle="transparent"
                    width={170}
                    height={170}
                    step={props.step} //in order to handle the color once the step is finish
                    finishState={1} //in order to handle the color once the step is finish
                    userData={props.userData}
                    baseStep={props.dataStep}
                    outer
                  />
                </div>
                <div className="outer">
                  <OuterCircle
                    lineStyle="dotted"
                    width={150}
                    height={150}
                    step={props.step}
                  />
                </div>
                <DataScheme step={props.dataStep} dataUser={props.dataUser} />
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default EnhanceDataInteraction()(DataInteraction);
