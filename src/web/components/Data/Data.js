import React from "react";
import DataSmall from "./DataSmall";
import DataInteraction from "./DataInteraction";
import EnhanceData from "./EnhanceData";

let Data = props => {
  console.log(props.step);
  if (props.step < 4) {
    return (
      <DataSmall
        step={props.step}
        userData={props.userData}
        setSceneStep={props.setSceneStep}
      />
    );
  } else if (props.step === 4) {
    return <div>datasupersmall</div>;
  } else if (props.step === 5) {
    return <DataInteraction userData={props.userData} />;
  } else if (props.step > 5) {
    return <div> you should not be here </div>;
  }
  // return props.step === 5 ? (
  //   <DataInteraction userData={props.userData} />
  // ) : (
  //   <DataSmall
  //     step={props.step}
  //     userData={props.userData}
  //     setSceneStep={props.setSceneStep}
  //   />
  // );
};

export default EnhanceData()(Data);
