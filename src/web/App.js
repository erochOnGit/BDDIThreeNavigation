import React from "react";
import ThreeContainer from "./components/ThreeContainer";
import Home from "./components/Home/";
import EnhanceApp from "./EnhanceApp";

const App = props => {
  switch (props.step) {
    case 0:
      return (
        <div
          onClick={() => {
            props.setStep(1);
          }}
        >
          <Home />
        </div>
      );
      break;
    case 1:
      return (
        <div>
          <ThreeContainer />
        </div>
      );
      break;
    default:
      return <div>nothing found for the current step provided</div>;
  }
};
export default EnhanceApp()(App);
