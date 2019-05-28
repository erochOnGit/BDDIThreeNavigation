import React from "react";
import { compose, lifecycle } from "recompose";

const EnhanceProgressCircle = props =>
  compose(
    lifecycle({
      componentDidMount() {
        console.log(this.props.step);
      }
    })
  );

export default EnhanceProgressCircle;
