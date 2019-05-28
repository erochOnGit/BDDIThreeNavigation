import React, { forwardRef, useRef, useImperativeHandle } from "react";
import ThreeContainer from "./components/ThreeContainer";
import Home from "./components/Home/";
import One from "./components/InteractionOne/One";
import Two from "./components/InteractionTwo/Two";
import Three from "./components/InteractionThree/Three";
import Four from "./components/InteractionFour/Four";
import Five from "./components/InteractionFive/Five";
import EnhanceApp from "./EnhanceApp";
import Transition from "./components/Transition";
import { MorphSVGPlugin, TweenMax, Power2, TimelineLite } from "gsap/TweenMax";
//<Transition/>

const App = props => {


  if (props.step < 0) {

      return <div>
           <Home setStep={props.setStep} muted={props.muted} updateMuted={props.updateMuted} />
          {/*<div style={{color:"white"}} onClick={()=>{ props.updateMuted()} }>a ? {props.muted} aa?</div>*/}
      </div>
  } else if (props.step >= 0) {
    return (
      <div>
        {(() => {
          switch (props.step) {
            case 0:
              return <One step={props.step} muted={props.muted} updateMuted={props.updateMuted} />;
            case 1:
              return <Two step={props.step} muted={props.muted} updateMuted={props.updateMuted} />;
            case 2:
              return <Three step={props.step} muted={props.muted} updateMuted={props.updateMuted} />;
            case 3:
              return <Four step={props.step} muted={props.muted} updateMuted={props.updateMuted} />;
            case 4:
                return <Five step={props.step} muted={props.muted} updateMuted={props.updateMuted} />;
              default:
              return <div>error</div>;
          }
        })()}
          <div className="next-icon" onClick={()=>{
              let transitionOut = document.querySelector('.transition-out');
              let nextIcon = document.querySelector('.next-icon');

              TweenMax.to(transitionOut, 1, {opacity:1, visibility:'visible', ease: Sine.easeOut});
              TweenMax.to(nextIcon, 1, {opacity:0, visibility:'hidden', ease: Sine.easeOut});

              setTimeout(()=> {
                props.setSceneStep(props.step + 1);
              },1000)
              //console.log(props.step+1)
          }}>
              <div className="bar"></div>
              <p>NEXT</p>
          </div>

        <ThreeContainer
          setStep={props.setStep}
          setCanvas={props.setCanvas}
          setSceneStep={props.setSceneStep}/>;
      </div>
    );
  } else {
    return <div>Nothing found for the current step provided</div>;
  }
};
export default EnhanceApp()(App);
