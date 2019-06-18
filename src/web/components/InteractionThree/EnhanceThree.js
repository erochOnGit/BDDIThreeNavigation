import React from "react";
import {compose, withState, withHandlers, lifecycle} from "recompose";
import MotionDestruct from "src/web/components/MotionDestruct";

/**
 * steps :
 * 0 Loading Screen
 */
const EnhanceThree = () =>
  compose(
      lifecycle({
          componentDidMount(){
              MotionDestruct('Talk to Echo to communicate with her.', this.props.step);
          }
      })
  );

export default EnhanceThree;
