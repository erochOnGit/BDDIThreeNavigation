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
import fourthVid from "../../assets/Motion/Chap4_Reflet.mp4";
import interactSound from '../../assets/Sound/Interaction.wav';

//MOITION DESTRUCT
import EnhanceFour from "./EnhanceFour"

const Four = props => {

    return (
        <div className="main-one-container">
            <SkipIcon instruct={'Make gestures in front of the camera to reveal your reflection.'}/>
            <SoundIcon muted={props.muted} updateMuted={props.updateMuted}/>
            <FullScreenIcon />
            <MenuIcon />
            <MenuContent step={props.step} />
            <audio className="interact-sound" src={interactSound} ></audio>
            <div className="video-container">
                <ReactPlayer className="video-player" url={fourthVid} playing />
            </div>
            <div className="transition-in" />
            <div className="transition-out" />
            <div className="title-container">
                <h1>Reflection</h1>
                <p>Chapter IV</p>
            </div>
        </div>
    );
};

export default EnhanceFour()(Four);
