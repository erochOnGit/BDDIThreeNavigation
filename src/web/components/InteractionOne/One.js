import React from "react";
import ReactPlayer from "react-player";

//COMPONENT
import SoundIcon from "../CTS/SoundIcon";
import FullScreenIcon from "../CTS/FullScreenIcon";
import MenuIcon from "src/web/components/CTS/MenuIcon";
import SkipIcon from "src/web/components/CTS/SkipIcon";
import MenuContent from "src/web/components/CTS/MenuContent";
import MotionDestruct from "src/web/components/MotionDestruct";
import InteractSentence from "src/web/components/InteractSentence";
import EnhanceOne from "./EnhanceOne"
//ELEMENT
import oneVid from "../../assets/Motion/Chap1_Naissance.mp4";
import interactSound from '../../assets/Sound/Interaction.wav';

const One = props => {
 // MotionDestruct("Blow on your microphone to spread pollen.", props.step);

  return (
    <div className="main-one-container">
      <SkipIcon instruct={"Blow on your microphone to spread pollen."} />
      <SoundIcon muted={props.muted} updateMuted={props.updateMuted} />
      <FullScreenIcon />
      <MenuIcon />
      <MenuContent step={props.step} />
        <audio className="interact-sound" src={interactSound} ></audio>
        <div className="video-container">
        <ReactPlayer className="video-player" url={oneVid} playing />
      </div>
      <div className="transition-in" />
      <div className="transition-out" />
      <div className="title-container">
        <h1>The birth</h1>
        <p>Chapter I</p>
      </div>
    </div>
  );
};

export default EnhanceOne()(One);
