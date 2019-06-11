import React from "react";
import { compose, withState } from "recompose";

const EnhanceDataInteraction = props =>
  compose(withState("dataStep", "setDataStep", -1));

export default EnhanceDataInteraction;
