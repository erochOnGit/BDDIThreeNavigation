import React from "react";
import ThreeContainer from "./components/ThreeContainer";
import Home from "./components/Home/";
import One from "./components/InteractionOne/One";
import EnhanceApp from "./EnhanceApp";
import Transition from "./components/Transition"
//<Transition/>

const App = props => {
  if (props.step < 0) {
    return (
          <Home setStep={props.setStep}/>
  );
  } else if (props.step >= 0) {
    return (<div>
        {(() => {
            switch (props.step) {
                case 1:  return <One/>;
                case 2:  return <div>Two</div>;
                case 3:  return <div>three</div>;
                default: return <div>error</div>;
            }
        })()}
        <ThreeContainer setStep={props.setStep} />;
        </div>)
  } else {
    return (
        <div>Nothing found for the current step provided</div>
    );
  }
};
export default EnhanceApp()(App);
