import React from "react";
import {compose, withState, withHandlers, lifecycle} from "recompose";
import MotionDestruct from "src/web/components/MotionDestruct";

/**
 * steps :
 * 0 Loading Screen
 */
const EnhanceTwo = () =>
  compose(
      lifecycle({
          componentDidMount(){
              MotionDestruct("Approach or move your hand away from the camera to attract or reject peoples.", this.props.step);
          }
      })
  );

export default EnhanceTwo;
