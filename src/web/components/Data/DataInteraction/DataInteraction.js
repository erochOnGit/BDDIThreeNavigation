import React from "react";
import EnhanceDataInteraction from "./EnhanceDataInteraction";
import OuterCircle from "../OuterCircle";
import ProgressCircle from "../ProgressCircle";
import DataTitle from "./DataTitle";
import DataScheme from "../DataScheme";
import "./DataInteraction.scss";

let interactionsNames = [
  {
    main: "Birth",
    sub: "heart of the flower",
    dataStep: 0,
    direction: "up"
  },
  {
    main: "Reflect",
    sub: "petals",
    dataStep: 3,
    direction: "left"
  },
  {
    main: "Desir",
    sub: "layers",
    dataStep: 1,
    direction: "right"
  },
  {
    main: "Echo",
    sub: "bending",
    dataStep: 2,
    direction: "down"
  }
];

let toggleSizeState = () =>{
  console.log("yolo")

} 

let DataInteraction = props => {
  
  return (
    <div className="data-interaction" 
         onClick={()=>{
           console.log("tolo")
         }}
    >
      {props.sizeState === "big" &&
        interactionsNames.map(interactionName => (
        <DataTitle
          key={interactionName.main}
          active={interactionName.dataStep === props.dataStep ? true : false}
          up={interactionName.direction === "up" ? true : false}
          left={interactionName.direction === "left" ? true : false}
          right={interactionName.direction === "right" ? true : false}
          down={interactionName.direction === "down" ? true : false}
          onClick={() => {
            if (interactionName.dataStep != props.dataStep) {
              props.setDataStep(interactionName.dataStep);
            } else {
              props.setDataStep(-1);
            }
          }}
          main={interactionName.main}
          sub={interactionName.sub}
        />
      ))}
      <div className={`data scale ${props.sizeState === "big" ? "" : "unscale" }`} 
         onClick={()=>{
          console.log("yolo")

           props.toggleCamera()
         }}> 
        {props.sizeState === "big" &&
          interactionsNames.map(interactionName => (
          <div
            key={`circle-${interactionName.direction}`}
            className={`circle_container 
            ${
              interactionName.direction
                ? "circle_container-" + interactionName.direction
                : ""
            } 
            `}
          >
            <div
              className={`circle ${
                interactionName.dataStep === props.dataStep
                  ? "circle-active"
                  : ""
              }`}
            />
          </div>
        ))}
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
                <DataScheme
                  step={props.sizeState === "big" ? props.dataStep: 4}
                  userData={props.userData}
                  noVideo={true}
                />
              </div>
            );
          }
        })()}
      </div>
    </div>
  );
};

export default EnhanceDataInteraction()(DataInteraction);
