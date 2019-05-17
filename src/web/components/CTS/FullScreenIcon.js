import React from "react";
import './FullScreenIcon.scss';
import { TweenMax } from "gsap/TweenMax";


let divStyle1 = {
    opacity: '1',
};
let divStyle2 = {
    opacity: '0',
};
const FullScreenSvg = props => (
    <svg version="1.1" className="full-screen-cont" viewBox="0 0 54 44">
        <g id="screen-icon1" style={divStyle1}>
            <path d="M52,0H42c-1.1,0-2,0.9-2,2s0.9,2,2,2h8v8c0,1.1,0.9,2,2,2s2-0.9,2-2V2C54,0.9,53.1,0,52,0z
            M12,0H2C0.9,0,0,0.9,0,2v10c0,1.1,0.9,2,2,2s2-0.9,2-2V4h8c1.1,0,2-0.9,2-2S13.1,0,12,0z
            M52,30c-1.1,0-2,0.9-2,2v8h-8c-1.1,0-2,0.9-2,2s0.9,2,2,2h10c1.1,0,2-0.9,2-2V32C54,30.9,53.1,30,52,30z
            M12,40H4v-8c0-1.1-0.9-2-2-2s-2,0.9-2,2v10c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2S13.1,40,12,40z"/>
        </g>
        <g id="screen-icon2" style={divStyle2}>
            <path d="M42,14h10c1.1,0,2-0.9,2-2s-0.9-2-2-2h-8V2c0-1.1-0.9-2-2-2s-2,0.9-2,2v10C40,13.1,40.9,14,42,14z
            M12,0c-1.1,0-2,0.9-2,2v8H2c-1.1,0-2,0.9-2,2s0.9,2,2,2h10c1.1,0,2-0.9,2-2V2C14,0.9,13.1,0,12,0z
            M52,30H42c-1.1,0-2,0.9-2,2v10c0,1.1,0.9,2,2,2s2-0.9,2-2v-8h8c1.1,0,2-0.9,2-2C54,30.9,53.1,30,52,30z
            M12,30H2c-1.1,0-2,0.9-2,2c0,1.1,0.9,2,2,2h8v8c0,1.1,0.9,2,2,2s2-0.9,2-2V32C14,30.9,13.1,30,12,30z"/>
        </g>
    </svg>
);

let full = false;
let toggleFullScreen = () => {
    let all = document.querySelector("body");
    if (!document.mozFullScreen && !document.webkitFullScreen && full == false) {
        if (all.mozRequestFullScreen) {
            all.mozRequestFullScreen();
            full = true;
        } else {
            all.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            full = true;
        }
    } else {
        if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
            full = false;
        } else {
            document.webkitCancelFullScreen();
            full = false;
        }
    }
};

let visible = true;

const FullScreenIcon = props => {

    let transition = () => {
        let icon1 = document.querySelector('#screen-icon1');
        let icon2 = document.querySelector('#screen-icon2');

        if(visible == true) {
            visible = false
            TweenMax.to(icon1.style, .3, { opacity:0, ease:Sine.easeOut});
            TweenMax.to(icon2.style, .3, { opacity:1, ease:Sine.easeOut});
            //console.log('FullScreen');
        } else {
            visible= true
            TweenMax.to(icon1.style, .3, { opacity:1, ease:Sine.easeOut});
            TweenMax.to(icon2.style, .3, { opacity:0, ease:Sine.easeOut});
            //console.log('NormalScreen');
        }
    }

    return (
        <div className="full-screen-icon" onClick={()=>{transition(), toggleFullScreen()}}>
            <FullScreenSvg />
        </div>);
};

export default FullScreenIcon;
