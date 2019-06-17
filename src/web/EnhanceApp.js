import React from "react";
import { compose, withState, withHandlers } from "recompose";
import { TweenMax, TimelineLite } from "gsap/TweenMax";
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
    withState("muted", "setMuted", true),
    withState("canvas", "setCanvas", {}),
    withState("rotated", "setRotated", false),
    withState("tl","setTl",new TimelineLite()),
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
      },
      //createTimeline(){}
      toggleCamera: props => (success) => {
        props.tl.to(props.canvas.camera.rotation, 2, {
          x: props.rotated ? 0.212: 1.5,
          ease: Power2.easeInOut,

        });
        props.setRotated(!props.rotated)
      }
    })
  );

export default EnhanceApp;
