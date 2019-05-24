import React from "react";
import animationData from '../CTS/Json/Logo/data.json';
import Lottie from 'react-lottie';
import ReactPlayer from 'react-player';

//COMPONENT
import SoundIcon from "../CTS/SoundIcon";
import FullScreenIcon from "../CTS/FullScreenIcon";

//ELEMENT
import img0 from '../CTS/Json/Logo/img_0.png';
import img1 from '../CTS/Json/Logo/img_1.png';
import img2 from '../CTS/Json/Logo/img_2.png';
import img3 from '../CTS/Json/Logo/img_3.png';
import introVid from '../../assets/Motion/motionintro_intro.mp4';


animationData.assets[0].p = img0;
animationData.assets[1].p = img1;
animationData.assets[2].p = img2;
animationData.assets[3].p = img3;
const Home = props => {

    //VIDEO LOOP
    setTimeout(()=> {
        let vidElem = document.querySelector('.video-player video');
        vidElem.addEventListener("ended", () => {
            vidElem.currentTime = 13;
            vidElem.play();
        }, false);
    },2000);

    //TRANSITION
    let update = () => {
        //console.log('wait')
        let transitionElement = document.createElement("div");
        transitionElement.classList.add('transition-element');
        document.querySelector('.main-home-container').appendChild(transitionElement);
        setTimeout(function() {
            props.setStep(0)
        },500);
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
          <SoundIcon/>
          <FullScreenIcon/>
          <div className="video-container">
            <ReactPlayer className="video-player" url={introVid} playing />
          </div>
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
