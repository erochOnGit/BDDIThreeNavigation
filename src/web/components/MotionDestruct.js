import React from "react";
import {TweenMax} from "gsap/TweenMax";
import InteractSentence from "src/web/components/InteractSentence";

let MotionDestruct = (sentence, step) => {

    let object = {
        step:step,
        sentence:sentence
    }
    setTimeout(function() {
        let vidElem = document.querySelector('.video-player video');
        let videoContainer = document.querySelector('.video-player');
        let skipIcon = document.querySelector('.skip-icon');
        let nextIcon = document.querySelector('.next-icon');
        let container = document.querySelector('.main-one-container');
        let saveIcon = document.querySelector('.save-icon');

        InteractSentence(object.sentence);

        //console.log('AAAHAHAHAHAHAHA', this.step)
        //console.log('AAAHAHAHAHAHAHA', this, object, object.step)

        if (vidElem) {
            vidElem.addEventListener("ended", () => {
                if(videoContainer.style.opacity == 0) {


                //SIMULATE CLICK
                /*let evObj = document.createEvent('Events');
                evObj.initEvent('click', true, false);
                skipIcon.dispatchEvent(evObj);*/

                //container.classList.add('hola')


                if (this.step) {
                    if (this.step == 4) {
                        //Transition with Interact sound
                        let sound = document.querySelector(".interact-sound")
                        let dataSound = document.querySelector(".data-sound")
                        //WAIT 2sec TO BEGIN DATA SOUND
                        setTimeout(() => {
                            dataSound.play();
                        }, 2000)
                        sound.loop = true;

                        //SOUND INTERACT AT ZERO
                        sound.play();
                        sound.volume = 0;
                        // WAIT 14sec TO BEGIN INTERACT SOUND
                        setTimeout(() => {
                            TweenMax.to(sound, 8, {volume: 1})
                        }, 14000)
                    } else {
                        //Play interact sound
                        let sound = document.querySelector(".interact-sound")
                        sound.play();
                        sound.loop = true;
                        TweenMax.from(sound, 8, {volume: 0})
                        TweenMax.to(sound, 8, {volume: 1})
                    }
                } else {
                    //Play interact sound
                    let sound = document.querySelector(".interact-sound")
                    sound.play();
                    sound.loop = true;
                    TweenMax.from(sound, 8, {volume: 0})
                    TweenMax.to(sound, 8, {volume: 1})
                }


                if (this.step) {
                    if (this.step == 4) {
                        TweenMax.to(skipIcon, 1, {opacity: 0, ease: Sine.easeOut});
                        TweenMax.to(videoContainer, 1, {opacity: 0, ease: Sine.easeOut});
                        TweenMax.to(saveIcon, 1, {opacity: 1, visibility: 'visible', ease: Sine.easeOut});
                    } else {
                        //Remove Motion at end
                        TweenMax.to(skipIcon, 1, {opacity: 0, ease: Sine.easeOut});
                        TweenMax.to(videoContainer, 1, {opacity: 0, ease: Sine.easeOut});
                        TweenMax.to(nextIcon, 1, {opacity: 1, visibility: 'visible', ease: Sine.easeOut});
                    }
                } else {
                    //Remove Motion at end
                    TweenMax.to(skipIcon, 1, {opacity: 0, ease: Sine.easeOut});
                    TweenMax.to(videoContainer, 1, {opacity: 0, ease: Sine.easeOut});
                    TweenMax.to(nextIcon, 1, {opacity: 1, visibility: 'visible', ease: Sine.easeOut});
                }

                //console.log('FIRST:', this.step)
                setTimeout(() => {
                    //console.log('STEP:', this.step)
                    //console.log('SENTENCE:', sentence)
                    vidElem.remove();

                    setTimeout(() => {
                        let sentenceCont = document.querySelector('.interact-sentence');
                        let tl = new TimelineLite();
                        tl.to(sentenceCont, 1, {opacity: 1, ease: Sine.easeOut})
                            .to(sentenceCont, 1, {opacity: 0, ease: Sine.easeOut}, "+=4")
                    }, 1000);
                }, 1000)
            }
            }, false);
        }
    }.bind(object), 2000);
};

export default MotionDestruct;
