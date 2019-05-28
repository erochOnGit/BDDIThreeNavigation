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
import secVid from "../../assets/Motion/motionintro_intro.mp4";
import SaveIcon from "src/web/components/CTS/SaveIcon";

const Five = props => {
    MotionDestruct('Approach or move your hand away from the camera to attract or reject peoples.');

    return (
        <div className="main-one-container">
            <SaveIcon step={props.step} />
            <SkipIcon step={props.step} instruct={'Ceci est ta fleur prend conscience de ta beauté intérieur.'}/>
            <SoundIcon muted={props.muted} updateMuted={props.updateMuted}/>
            <FullScreenIcon />
            <MenuIcon />
            <MenuContent step={props.step} />
            <div className="video-container">
                <ReactPlayer className="video-player" url={secVid} playing />
            </div>
            <div className="transition-in" />
            <div className="transition-out" />
            <div className="title-container">
                <h1>Desire</h1>
                <p>Chapter II</p>
            </div>
        </div>
    );
};

export default Five;
