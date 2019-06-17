import React from "react";
import './SoundIcon.scss';
import { TweenMax } from "gsap/TweenMax";

//ELEMENT
import soundIcon from './../../assets/Icon/soundIcon.gif';

let divStyle1 = {
    opacity: '1',
};
let divStyle2 = {
    opacity: '0',
};
const SoundSvg = props => (
    <div className="sound-cont">
        <img id="sound-icon1" style={divStyle1} src={soundIcon}/>

        <svg version="1.1" viewBox="0 0 73.7 31.1">

        <g id="sound-icon2" style={divStyle2}>
        <path d="M35.5,14.7c-0.8,0.8-0.8,2,0,2.8c0.8,0.8,2,0.8,2.8,0c0.8-0.8,0.8-2,0-2.8c0,0,0,0,0,0
                C37.5,14,36.2,14,35.5,14.7z
                                   M0.6,14.6c-0.7,0.9-0.6,2.1,0.3,2.8c0.7,0.6,1.8,0.6,2.5,0c0.7-0.9,0.6-2.1-0.3-2.8C2.4,14,1.3,14,0.6,14.6z
                                 M73.1,14.9c-0.8-0.7-2.1-0.6-2.8,0.3c-0.6,0.7-0.6,1.8,0,2.5c0.7,0.9,2,1,2.8,0.3c0.9-0.7,1-2,0.3-2.8
                C73.3,15.1,73.2,15,73.1,14.9z
                                 M64.4,14.9c-0.8-0.7-2.1-0.6-2.8,0.3c-0.6,0.7-0.6,1.8,0,2.5c0.7,0.9,2,1,2.8,0.3c0.9-0.7,1-2,0.3-2.8
                C64.6,15.1,64.5,15,64.4,14.9z
                                 M55.8,14.9c-0.8-0.7-2.1-0.6-2.8,0.3c-0.6,0.7-0.6,1.8,0,2.5c0.7,0.9,2,1,2.8,0.3c0.9-0.7,1-2,0.3-2.8
                C56,15.1,55.9,15,55.8,14.9z
                                 M47.1,14.9c-0.8-0.7-2.1-0.6-2.8,0.3c-0.6,0.7-0.6,1.8,0,2.5c0.7,0.9,2,1,2.8,0.3c0.9-0.7,1-2,0.3-2.8
                C47.3,15.1,47.2,15,47.1,14.9z
                                 M29.6,14.9c-0.8-0.7-2.1-0.6-2.8,0.3c-0.6,0.7-0.6,1.8,0,2.5c0.7,0.9,2,1,2.8,0.3c0.9-0.7,1-2,0.3-2.8
                C29.8,15.1,29.7,15,29.6,14.9z
                                 M20.8,14.9c-0.8-0.7-2.1-0.6-2.8,0.3c-0.6,0.7-0.6,1.8,0,2.5c0.7,0.9,2,1,2.8,0.3c0.9-0.7,1-2,0.3-2.8
                C21,15.1,20.9,15,20.8,14.9z
                                 M12.1,14.9c-0.8-0.7-2.1-0.6-2.8,0.3c-0.6,0.7-0.6,1.8,0,2.5c0.7,0.9,2,1,2.8,0.3c0.9-0.7,1-2,0.3-2.8
                C12.3,15.1,12.2,15,12.1,14.9z"/>
        </g>
</svg>
    </div>
)

const SoundIcon = props => {

    //SOUND STATE
    setTimeout(()=>{
        document.querySelectorAll("video, audio").forEach( (audio) => {
            audio.muted = !props.muted;
        });
    },2000);

    //ICON STATE
    setTimeout(()=>{
        let icon1 = document.querySelector('#sound-icon1');
        let icon2 = document.querySelector('#sound-icon2');
        if(props.muted == false) { // SON
            TweenMax.to(icon1.style, .01, { opacity:0,visibility:'hidden', ease:Sine.easeOut});
            TweenMax.to(icon2.style, .01, { opacity:.5,visibility:'visible', ease:Sine.easeOut});
        } else { // Mute
            TweenMax.to(icon1.style, .01, { opacity:.5,visibility:'visible', ease:Sine.easeOut});
            TweenMax.to(icon2.style, .01, { opacity:0,visibility:'hidden', ease:Sine.easeOut});
        }
    },150)

    //CLICK TRANSITION
    let transition = () => {
        let icon1 = document.querySelector('#sound-icon1');
        let icon2 = document.querySelector('#sound-icon2');

        if(props.muted == true) { // Mute
            TweenMax.to(icon1.style, .3, { opacity:0, ease:Sine.easeOut});
            TweenMax.to(icon2.style, .3, { opacity:1, ease:Sine.easeOut});
            document.querySelectorAll("video, audio").forEach( (audio) => {
                audio.muted = props.muted;
                props.updateMuted()
            });
        } else { // sound
            TweenMax.to(icon1.style, .3, { opacity:1, ease:Sine.easeOut});
            TweenMax.to(icon2.style, .3, { opacity:0, ease:Sine.easeOut});
            document.querySelectorAll("video, audio").forEach( (audio) => {
                audio.muted = props.muted;
                props.updateMuted()
            });
        }
    }

    return (
        <div className="sound-icon" onClick={()=>{transition()}}>
            <SoundSvg />
        </div>);
};

export default SoundIcon;
