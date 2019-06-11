import React from "react";
import DataSmall from "./DataSmall";
import DataInteraction from "./DataInteraction";
import EnhanceData from "./EnhanceData";

let Data = props => {
  return props.step === 5 ? (
    <DataInteraction />
  ) : (
    <DataSmall
      step={props.step}
      userData={props.userData}
      setSceneStep={props.setSceneStep}
    />
  );
};

export default EnhanceData()(Data);
