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
import thirdVid from "../../assets/Motion/motionintro_intro.mp4";

const Three = props => {
    MotionDestruct('Talk to Echo to communicate with her.');

    return (
        <div className="main-one-container">
            <SkipIcon instruct={'Talk to Echo to communicate with her.'}/>
            <SoundIcon />
            <FullScreenIcon />
            <MenuIcon />
            <MenuContent step={props.step} />
            <div className="video-container">
                <ReactPlayer className="video-player" url={thirdVid} playing />
            </div>
            <div className="transition-in" />
            <div className="transition-out" />
            <div className="title-container">
                <h1>Echo</h1>
                <p>Chapter III</p>
            </div>
        </div>
    );
};

export default Three;
