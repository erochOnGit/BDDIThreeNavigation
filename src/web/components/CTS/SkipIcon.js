import React from "react";
import './SkipIcon.scss';
import { TweenMax, TimelineLite} from "gsap/TweenMax";
import InteractSentence from "src/web/components/InteractSentence";

const SkipIcon = props => {

    if(props.step == 4) {
        setTimeout(()=> {
            document.querySelector('.next-icon').remove();
        }, 1000)
    }

    let transition = () => {

        if(props.step == 4) {
            InteractSentence(props.instruct);

            let videoContainer = document.querySelector('.video-container');
            let skipIcon = document.querySelector('.skip-icon');
            let saveIcon = document.querySelector('.save-icon');

            TweenMax.to(skipIcon, 1, {opacity: 0, ease: Sine.easeOut});
            TweenMax.to(videoContainer, 1, {opacity: 0, ease: Sine.easeOut});
            TweenMax.to(saveIcon, 1, {opacity: 1, visibility: 'visible', ease: Sine.easeOut});

            setTimeout(() => {
                let sentence = document.querySelector('.interact-sentence');
                let tl = new TimelineLite();
                tl.to(sentence, 1, {opacity: 1, ease: Sine.easeOut})
                    .to(sentence, 1, {opacity: 0, ease: Sine.easeOut}, "+=2")
            }, 1000);
        } else {
            InteractSentence(props.instruct);

            let videoContainer = document.querySelector('.video-container');
            let skipIcon = document.querySelector('.skip-icon');

            TweenMax.to(skipIcon, 1, {opacity: 0, ease: Sine.easeOut});
            TweenMax.to(videoContainer, 1, {opacity: 0, ease: Sine.easeOut});

            //NEXT APPEAR
            let nextIcon = document.querySelector('.next-icon');
            TweenMax.to(nextIcon, 1, {opacity: 1, visibility: 'visible', ease: Sine.easeOut});



            setTimeout(() => {
                document.querySelector(".video-player video").remove();
                let sentence = document.querySelector('.interact-sentence');
                let tl = new TimelineLite();
                tl.to(sentence, 1, {opacity: 1, ease: Sine.easeOut})
                    .to(sentence, 1, {opacity: 0, ease: Sine.easeOut}, "+=2")
            }, 1000);
        }
    }

    return (
        <div className="skip-icon" onClick={()=>{transition()}}>
            <div className="bar"></div>
            <p>SKIP</p>
        </div>);
};

export default SkipIcon;
