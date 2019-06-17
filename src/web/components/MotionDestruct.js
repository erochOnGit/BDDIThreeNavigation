import React from "react";
import {TweenMax} from "gsap/TweenMax";
import InteractSentence from "src/web/components/InteractSentence";

const MotionDestruct = (sentence, step) => {

    setTimeout(()=> {
        let vidElem = document.querySelector('.video-player video');
        let videoContainer = document.querySelector('.video-player');
        let skipIcon = document.querySelector('.skip-icon');
        let nextIcon = document.querySelector('.next-icon');
        let container = document.querySelector('.main-one-container');
        let saveIcon = document.querySelector('.save-icon');


        if(vidElem) {
            vidElem.addEventListener("ended", () => {

                //SIMULATE CLICK
                /*let evObj = document.createEvent('Events');
                evObj.initEvent('click', true, false);
                skipIcon.dispatchEvent(evObj);*/

                //container.classList.add('hola')

                //Play interact sound
                let sound = document.querySelector(".interact-sound")
                sound.play();
                sound.loop = true;
                TweenMax.from(sound,8,{volume:0})
                TweenMax.to(sound,8,{volume:1})

                if(step) {
                    if(step == 4) {
                        TweenMax.to(skipIcon, 1, {opacity: 0, ease: Sine.easeOut});
                        TweenMax.to(videoContainer, 1, {opacity: 0, ease: Sine.easeOut});
                        TweenMax.to(saveIcon, 1, {opacity: 1, visibility: 'visible', ease: Sine.easeOut});
                    }else {
                        //Remove Motion at end
                        TweenMax.to(skipIcon, 1, {opacity: 0, ease: Sine.easeOut});
                        TweenMax.to(videoContainer, 1, {opacity: 0, ease: Sine.easeOut});
                        TweenMax.to(nextIcon, 1, {opacity: 1, visibility: 'visible', ease: Sine.easeOut});
                    }
                }else {
                    //Remove Motion at end
                    TweenMax.to(skipIcon, 1, {opacity: 0, ease: Sine.easeOut});
                    TweenMax.to(videoContainer, 1, {opacity: 0, ease: Sine.easeOut});
                    TweenMax.to(nextIcon, 1, {opacity: 1, visibility: 'visible', ease: Sine.easeOut});
                }

                setTimeout(() => {
                    vidElem.remove();
                    InteractSentence(sentence);

                    setTimeout(() => {
                        let sentence = document.querySelector('.interact-sentence');
                        let tl = new TimelineLite();
                        tl.to(sentence, 1, {opacity: 1, ease: Sine.easeOut})
                            .to(sentence, 1, {opacity: 0, ease: Sine.easeOut}, "+=4")
                    }, 1000);
                }, 1000)
            }, false);
        }
    },2000);

};

export default MotionDestruct;
