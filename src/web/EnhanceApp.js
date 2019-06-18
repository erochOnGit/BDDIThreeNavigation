import React from "react";
import { compose, withState, withHandlers } from "recompose";

/**
 * steps :
 * 0 Loading Screen
 */
const EnhanceApp = () =>
  compose(
    withState("userData", "setUserData", [
      { name: "interaction1" ,movemento:0},
      { name: "interaction2" ,movemento:0},
      { name: "interaction3" ,movemento:0},
      { name: "interaction4" ,movemento:0}
    ]),
    withState("step", "setStep", -1),
    withState("muted", "setMuted", true),
    withState("canvas", "setCanvas", {}),
    withHandlers({
      setSceneStep: props => index => {
        if (props.canvas && props.canvas.setInteractionStep) {
          props.canvas.setInteractionStep(index);
        }
      },
      getUserData: props => () => {
        return props.userData;
      },
      updateMuted: props => () => {
        props.setMuted(!props.muted);
      }
    })
  );

export default EnhanceApp;
