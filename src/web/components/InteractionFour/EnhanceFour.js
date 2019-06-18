import React from "react";
import {compose, withState, withHandlers, lifecycle} from "recompose";
import MotionDestruct from "src/web/components/MotionDestruct";

/**
 * steps :
 * 0 Loading Screen
 */
const EnhanceFour = () =>
  compose(
      lifecycle({
          componentDidMount(){
              MotionDestruct('Move your face in front of the camera to reveal your reflection.', this.props.step);
          }
      })
  );

export default EnhanceFour;
