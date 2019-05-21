import React from "react";
import './SkipIcon.scss';
import { TweenMax } from "gsap/TweenMax";

const SkipIcon = props => {

    let transition = () => {
        let videoContainer = document.querySelector('.video-container');
        let skipIcon = document.querySelector('.skip-icon');

        console.log(videoContainer);

        TweenMax.to(skipIcon, 1, {opacity:0, ease: Sine.easeOut}, 2);
        TweenMax.to(videoContainer, 1, {opacity:0, ease: Sine.easeOut}, 2);
    }

    return (
        <div className="skip-icon" onClick={()=>{transition()}}>
            <div className="bar"></div>
            <p>SKIP</p>
        </div>);
};

export default SkipIcon;
