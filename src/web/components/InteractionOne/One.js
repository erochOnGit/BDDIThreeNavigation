import React from "react";
import ReactPlayer from 'react-player';

//COMPONENT
import SoundIcon from "../CTS/SoundIcon";
import FullScreenIcon from "../CTS/FullScreenIcon";
import MenuIcon from "src/web/components/CTS/MenuIcon";
import SkipIcon from "src/web/components/CTS/SkipIcon";
import MenuContent from "src/web/components/CTS/MenuContent";

//ELEMENT
import oneVid from '../../assets/Motion/motionintro_intro.mp4';

const One = props => {
    console.log('step',props.step)

    return (<div className="main-one-container">
                <SkipIcon/>
                <SoundIcon/>
                <FullScreenIcon/>
                <MenuIcon/>
                <MenuContent step={props.step}/>
                <div className="video-container">
                    <ReactPlayer className="video-player" url={oneVid} playing />
                </div>
                <div className="transition-in"></div>
                <div className="title-container">
                    <h1>Naissance</h1>
                    <p>Chapitre 1</p>
                </div>
            </div>);
};

export default One;
