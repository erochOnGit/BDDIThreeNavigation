import React from "react";
import {compose, withState, withHandlers, lifecycle} from "recompose";
import MotionDestruct from "src/web/components/MotionDestruct";

/**
 * steps :
 * 0 Loading Screen
 */
const EnhanceOne = () =>
  compose(
      lifecycle({
          componentDidMount(){
              MotionDestruct("Blow on your microphone to spread pollen.", this.props.step);
          }
      })
  );

export default EnhanceOne;
