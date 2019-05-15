import React from "react";
import { compose, withState } from "recompose";

/**
 * steps :
 * 0 Loading Screen
 */

const EnhanceApp = () => compose(withState("step", "setStep", -1));

export default EnhanceApp;
