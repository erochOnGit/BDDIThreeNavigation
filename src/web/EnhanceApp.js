import React from "react";
import { compose, withState, withHandlers } from "recompose";

/**
 * steps :
 * 0 Loading Screen
 */

const EnhanceApp = () =>
  compose(
    withState("step", "setStep", -1),
    withState("muted", "setMuted", true),
    withState("canvas", "setCanvas", {}),
    withHandlers({
      setSceneStep: props => index => {
        console.log(index);
        if (props.canvas && props.canvas.setInteractionStep) {
          props.canvas.setInteractionStep(index);
        }
      },
        updateMuted: props => () => {
         // props.setMuted(!props.muted)$
          props.setMuted(!props.muted)
          //console.log(props)
        }
    })
  );

export default EnhanceApp;
