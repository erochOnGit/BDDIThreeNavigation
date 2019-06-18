import React from "react";
import {compose, withState, withHandlers, lifecycle} from "recompose";
import MotionDestruct from "src/web/components/MotionDestruct";

/**
 * steps :
 * 0 Loading Screen
 */
const EnhanceFive = () =>
  compose(
      lifecycle({
          componentDidMount(){
              MotionDestruct('This generative flower is a reflection of your inner beauty\'s particularity.', this.props.step);
          }
      })
  );

export default EnhanceFive;
