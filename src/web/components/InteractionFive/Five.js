import React from "react";
import ReactPlayer from "react-player";

//COMPONENT
import SoundIcon from "../CTS/SoundIcon";
import FullScreenIcon from "../CTS/FullScreenIcon";
import MenuIcon from "src/web/components/CTS/MenuIcon";
import SkipIcon from "src/web/components/CTS/SkipIcon";
import MenuContent from "src/web/components/CTS/MenuContent";
import MotionDestruct from "src/web/components/MotionDestruct";

//ELEMENT
import secVid from "../../assets/Motion/Chap5_Generation.mp4";
import SaveIcon from "src/web/components/CTS/SaveIcon";
import dataSound from '../../assets/Sound/Voix_Fin.mp3';
import interactSound from "../../assets/Sound/Interaction.wav";

//MOTION DESTRUCT
import EnhanceFive from "./EnhanceFive"


const MenuSvg = props => (
  <div className="menu-icon-cont" onClick={props.onClick}>
    <div className="menu-icon2-cont" style={{ opacity: "1" }}>
      <div className="hidari" />
      <div className="migi" />
    </div>
  </div>
);
const Five = props => {
  MotionDestruct(
    "This generative flower is a reflection of your inner beauty's particularity.",
    props.step
  );

  return (
    <div className="main-one-container">
      <SaveIcon step={props.step} />
      <SkipIcon
        step={props.step}
        instruct={
          "This generative flower is a reflection of your inner beauty's particularity."
        }
      />
      <SoundIcon muted={props.muted} updateMuted={props.updateMuted} />
      <FullScreenIcon />
      {props.rotated ? (
        <MenuSvg
          onClick={() => {
            props.toggleCamera();
          }}
        />
      ) : (
        <MenuIcon />
      )}
      <MenuContent step={props.step} />
      <audio className="interact-sound" src={interactSound} />
    <audio className="data-sound" src={dataSound} ></audio>
    <div className="video-container">
        <ReactPlayer className="video-player" url={secVid} playing />
      </div>
      <div className="transition-in" />
      <div className="transition-out" />
      <div className="title-container">
        <h1></h1>
        <p></p>
      </div>
    </div>
  );
};

export default EnhanceFive()(Five);
