import React from "react";
import { compose, withState, withHandlers } from "recompose";

/**
 * steps :
 * 0 Loading Screen
 */
const EnhanceApp = () =>
  compose(
    withState("userData", "setUserData", [
      { name: "interaction1" },
      { name: "interaction2" },
      { name: "interaction3" },
      { name: "interaction4" }
    ]),
    withState("step", "setStep", -1),
    withState("canvas", "setCanvas", {}),
    withHandlers({
      setSceneStep: props => index => {
        console.log(index);
        if (props.canvas && props.canvas.setInteractionStep) {
          props.canvas.setInteractionStep(index);
        }
      },
      getUserData: props => () => {
        return props.userData;
      }
    })
  );

export default EnhanceApp;
