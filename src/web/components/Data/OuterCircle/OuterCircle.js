import React from "react";
import { compose, lifecycle, withProps, withState } from "recompose";
import ProgressCircle from "../ProgressCircle";

let OuterCircle = props => compose(withState("outer", "setOuter", true));

export default OuterCircle()(ProgressCircle);
