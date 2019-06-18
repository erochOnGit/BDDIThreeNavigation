import React from "react";
import { compose, withState, lifecycle } from "recompose";

const EnhanceDataInteraction = props =>
  compose(
    withState("dataStep", "setDataStep", -1),
    withState("sizeState", "setSizeState", "small"),
    lifecycle({
      componentDidUpdate(prevProps) {
        if (this.props.rotated !== prevProps.rotated) {
          this.props.rotated
            ? this.props.setSizeState("big")
            : this.props.setSizeState("small");
        }
      }
    })
  );

export default EnhanceDataInteraction;
