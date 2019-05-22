import React from "react";
import './SkipIcon.scss';
import { TweenMax } from "gsap/TweenMax";

const SkipIcon = props => {

    let transition = () => {
        let videoContainer = document.querySelector('.video-container');
        let skipIcon = document.querySelector('.skip-icon');
        let transition = document.querySelector('.transition-in');

        console.log(videoContainer);

        TweenMax.to(skipIcon, 1, {opacity:0, ease: Sine.easeOut});
        TweenMax.to(videoContainer, 1, {opacity:0, ease: Sine.easeOut});

    }

    return (
        <div className="skip-icon" onClick={()=>{transition()}}>
            <div className="bar"></div>
            <p>SKIP</p>
        </div>);
};

export default SkipIcon;
