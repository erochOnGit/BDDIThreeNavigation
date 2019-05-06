import React from "react";
import ThreeContainer from "./components/ThreeContainer";
import Home from "./components/Home/";
import EnhanceApp from "./EnhanceApp";

const App = props => {
  if (props.step === 0) {
    return (
      <div
        onClick={() => {
          props.setStep(2);
        }}
      >
        <Home />
      </div>
    );
  } else if (props.step > 0) {
    return <ThreeContainer setStep={props.setStep} />;
  } else {
    return (
      <div>
        <div>nothing found for the current step provided</div>
      </div>
    );
  }
};
export default EnhanceApp()(App);
