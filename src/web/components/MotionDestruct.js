import React from "react";
import {TweenMax} from "gsap/TweenMax";
import InteractSentence from "src/web/components/InteractSentence";

const MotionDestruct = (sentence) => {

    setTimeout(()=> {
        let vidElem = document.querySelector('.video-player video');
        let videoContainer = document.querySelector('.video-player');
        let skipIcon = document.querySelector('.skip-icon');
        let nextIcon = document.querySelector('.next-icon');

        vidElem.addEventListener("ended", () => {
            TweenMax.to(skipIcon, 1, {opacity:0, ease: Sine.easeOut});
            TweenMax.to(videoContainer, 1, {opacity:0, ease: Sine.easeOut});
            TweenMax.to(nextIcon, 1, {opacity:1, visibility:'visible', ease: Sine.easeOut});
            setTimeout(()=> {
                vidElem.remove();
                InteractSentence(sentence);
                setTimeout(()=> {
                    let sentence = document.querySelector('.interact-sentence');
                    let tl = new TimelineLite();
                    tl.to(sentence, 1, {opacity:1, ease: Sine.easeOut})
                        .to(sentence, 1, {opacity:0, ease: Sine.easeOut}, "+=2")
                },1000);
            },1000)
        }, false);
    },2000);

};

export default MotionDestruct;
