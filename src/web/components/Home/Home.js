import React from "react";
import animationData from '../CTS/Json/Logos/data.json';
import Lottie from 'react-lottie';
import ReactPlayer from 'react-player';
import { TweenMax, TimelineLite } from "gsap/TweenMax";

//COMPONENT
import SoundIcon from "../CTS/SoundIcon";
import FullScreenIcon from "../CTS/FullScreenIcon";

//ELEMENT
import img0 from '../CTS/Json/Logos/img_0.png';
import img1 from '../CTS/Json/Logos/img_1.png';
import img2 from '../CTS/Json/Logos/img_2.png';
import img3 from '../CTS/Json/Logos/img_3.png';
import introVid from '../../assets/Motion/0_Intro.mp4';
import introSound from '../../assets/Sound/Chap1.wav';


animationData.assets[0].p = img0;
animationData.assets[1].p = img1;
animationData.assets[2].p = img2;
animationData.assets[3].p = img3;
const Home = props => {

    //LOOP
    setTimeout(()=> {
        //Sound
        let audioElem = document.querySelector('audio');
        audioElem.addEventListener("ended", () => {
            audioElem.currentTime = 17;
            audioElem.play();
        }, false);
        //Video
        let vidElem = document.querySelector('.video-player video');
        vidElem.addEventListener("ended", () => {
            vidElem.currentTime = 13;
            vidElem.play();
        }, false);
    },2000);


    //TRANSITION
    let update = () => {
        //Page
        let transitionElement = document.createElement("div");
        transitionElement.classList.add('transition-element');
        document.querySelector('.main-home-container').appendChild(transitionElement);
        setTimeout(function() {
            props.setStep(0)
        },500);
        setTimeout(function() {
            console.log("nié?")
            let data = document.querySelector('.data');
            TweenMax.to(data,1,{opacity: 0,zIndex:0,visibility: 'hidden', ease: Sine.easeOut})
        },600)

        //Sound Transition
        let audioElem = document.querySelector('audio');
        TweenMax.to(audioElem, .6, {volume:0, ease:Circ.easeInOut})
    }

    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
  return (
      <div className="main-home-container">
          <SoundIcon muted={props.muted} updateMuted={props.updateMuted}/>
          <FullScreenIcon/>
          <div className="video-container">
            <ReactPlayer className="video-player" url={introVid} playing />
          </div>
          <audio src={introSound} autoPlay></audio>
          <div className="black-attenuation"></div>
        <div className="center-container">
            <div>
                <Lottie id="lottie" options={defaultOptions}/>
            </div>
          <h3>Narcissus and his metamorphosis</h3>
          <div className="start-btn"><a className="link-btn" onClick={()=>{update()}}>Begin</a></div>
          <p>To enjoy the experience,please allow<br></br>access to your microphone and your camera</p>
        </div>
     </div>);
};

export default Home;
