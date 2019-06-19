import React from "react";
import './SkipIcon.scss';
import { TweenMax, TimelineLite} from "gsap/TweenMax";
import InteractSentence from "src/web/components/InteractSentence";

const SkipIcon = props => {

    if(props.step == 4) {
        setTimeout(()=> {
            document.querySelector('.next-icon') && document.querySelector('.next-icon').remove();
        }, 1000)
    }

    let transition = () => {

        if(props.step == 4) {

                InteractSentence(props.instruct);

            let videoContainer = document.querySelector('.video-container');
            let skipIcon = document.querySelector('.skip-icon');
            let saveIcon = document.querySelector('.save-icon');
            let data = document.querySelector('.data');

            TweenMax.to(skipIcon, 1, {opacity: 0, ease: Sine.easeOut});
            TweenMax.to(videoContainer, 1, {opacity: 0, ease: Sine.easeOut});
            TweenMax.to(saveIcon, 1, {opacity: 1, visibility: 'visible', ease: Sine.easeOut});
            
            setTimeout(()=> {
                TweenMax.to(data,2,{opacity:1,zIndex:30,visibility: 'visible', ease: Sine.easeOut})
            },3000)
            
            data.classList.add('skipped')
            data.classList.remove("unscale")
            data.classList.add("megarescale")
            //TIME SPEAK DATA
            setTimeout(()=>{
                data.classList.remove("megarescale")
                data.classList.add("end")
                setTimeout(()=>{
                    data.classList.add("unscale")
                    setTimeout(()=> {
                        data.classList.remove('end')
                    },1000)
                },1000)
            },17000)
            
            /*TweenMax.to(data, 1, { opacity: 0.8, bottom: '50%', y: '50%', scale: 8, ease: Power2.easeOut});
                setTimeout(()=>{
                let tl = new TimelineLite()
                tl.to(data, 1, {opacity: '0', ease: Power2.easeOut})
                .to(data, .2, {opacity: '0', scale: 0.8, bottom: '100px',y: '0', ease: Power2.easeOut})
                .to(data, 1, {opacity: '1', ease: Power2.easeOut},'+=1').addPause().pause()
                tl.play()
            },17000)*/

        //    let tl = new TimelineLite()
        //    tl.to(data, 1, { opacity: 0.8, bottom: '50%', y: '50%', ease: Power2.easeOut, onComplete:()=>{
        //        data.style.transform = "scale(8)"
   //    }})
//  .to(data, 5, { opacity: 0.8, bottom: '50%', y: '50%', ease: Power2.easeOut})
//  .from(data, 1, { opacity: 0.8, bottom: '50%', y: '50%', ease: Power2.easeOut, onChange:()=>{
// data.style.transform = "scale(0.8)"
//  }}).addPause().pause()
//  tl.play()

    //        setTimeout(()=> {
  //              console.log('tl',tl)
   //             tl.reverse()
   //         },5000)



            setTimeout(() => {
                //Baisse volume motion
                TweenMax.to(document.querySelector(".video-player video"),4,{volume:0})
                //document.querySelector(".video-player video").remove();

                //Transition with Interact sound
                let sound = document.querySelector(".interact-sound")
                let dataSound = document.querySelector(".data-sound")
                //WAIT 2sec TO BEGIN DATA SOUND
                setTimeout(()=>{
                    dataSound.play();
                },2000)
                sound.loop = true;

                //SOUND INTERACT AT ZERO
                sound.play();
                sound.volume = 0;
                // WAIT 14sec TO BEGIN INTERACT SOUND
                setTimeout(()=> {
                    TweenMax.to(sound,8,{volume:1})
                },14000)

                let sentence = document.querySelector('.interact-sentence');
                let tl = new TimelineLite();
                tl.to(sentence, 1, {opacity: 1, ease: Sine.easeOut})
                    .to(sentence, 1, {opacity: 0, ease: Sine.easeOut}, "+=4")
            }, 1000);
        } else {
            let data = document.querySelector('.data');
            TweenMax.to(data,1,{opacity: 1,zIndex:30,visibility: 'visible', ease: Sine.easeOut})
            InteractSentence(props.instruct);

            let videoContainer = document.querySelector('.video-container');
            let skipIcon = document.querySelector('.skip-icon');

            TweenMax.to(skipIcon, 1, {opacity: 0, ease: Sine.easeOut});
            TweenMax.to(videoContainer, 1, {opacity: 0, ease: Sine.easeOut});

            //NEXT APPEAR
            let nextIcon = document.querySelector('.next-icon');
            TweenMax.to(nextIcon, 1, {opacity: 1, visibility: 'visible', ease: Sine.easeOut});

            setTimeout(() => {
                //Baisse volume motion
                TweenMax.to(document.querySelector(".video-player video"),8,{volume:0})
                //document.querySelector(".video-player video").remove();

                //Transition with Interact sound
                let sound = document.querySelector(".interact-sound")
                sound.play();
                sound.loop = true;
                TweenMax.from(sound,8,{volume:0})

                let sentence = document.querySelector('.interact-sentence');
                let tl = new TimelineLite();
                tl.to(sentence, 1, {opacity: 1, ease: Sine.easeOut})
                    .to(sentence, 1, {opacity: 0, ease: Sine.easeOut}, "+=4")
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
