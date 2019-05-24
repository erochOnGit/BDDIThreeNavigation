import React, { forwardRef, useRef, useImperativeHandle } from "react";
import ThreeContainer from "./components/ThreeContainer";
import Home from "./components/Home/";
import One from "./components/InteractionOne/One";
import EnhanceApp from "./EnhanceApp";
import Transition from "./components/Transition";
import { MorphSVGPlugin, TweenMax, Power2, TimelineLite } from "gsap/TweenMax";
import ProgressCircle from "src/web/components/Data/ProgressCircle";

//<Transition/>

const App = props => {
  if (props.step < 0) {
    return <Home setStep={props.setStep} />;
  } else if (props.step >= 0) {
    return (
      <div>
        {(() => {
          switch (props.step) {
            case 0:
              return <One step={props.step} />;
              // return (
              //   <div>
              //     <ProgressCircle />
              //   </div>
              // );
            case 1:
              return <div>Two</div>;
            case 2:
              return <div>three</div>;
            case 3:
              return <div>four</div>;
            case 4:
              return <div>five</div>;
            default:
              return <div>error</div>;
          }
        })()}
        <button
          className="next-scene"
          onClick={() => {
            props.setSceneStep(props.step + 1);
            console.log(props.step + 1);
          }}
        >
          Click
        </button>
        <ThreeContainer
          setStep={props.setStep}
          setCanvas={props.setCanvas}
          setSceneStep={props.setSceneStep}
        />
        ;
      </div>
    );
  } else {
    return <div>Nothing found for the current step provided</div>;
  }
};
export default EnhanceApp()(App);
