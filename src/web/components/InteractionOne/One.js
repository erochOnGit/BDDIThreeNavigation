import React from "react";
import SoundIcon from "../CTS/SoundIcon";
import FullScreenIcon from "../CTS/FullScreenIcon";
import MenuIcon from "src/web/components/CTS/MenuIcon";
import MenuContent from "src/web/components/CTS/MenuContent";

const One = props => {
    return (<div className="main-one-container">
                <SoundIcon/>
                <FullScreenIcon/>
                <MenuIcon/>
                <MenuContent/>
                <div className="transition-in"></div>
                <div className="title-container">
                    <h1>Naissance</h1>
                    <p>Chapitre 1</p>
                </div>
            </div>);
};

export default One;
