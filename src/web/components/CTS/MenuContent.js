import React from "react";
import './MenuContent.scss';
import { TweenMax } from "gsap/TweenMax";
import animationData from './Json/data.json';
import Lottie from 'react-lottie'

let divStyle1 = {
    opacity: '1',
};
let divStyle2 = {
    opacity: '0',
};


const Content = props => {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
    <div className="menu-cont">
        <div className="center-cont">
            <p className="help-txt">Help</p>
            <div className="interaction-container">
                <div className="interaction">
                    <Lottie options={defaultOptions}/>
                </div>
                <p>Blow on your microphone to spread pollen</p>
            </div>
        </div>
        <div className="bottom-cont">
            <p className="credits-txt">Credits</p>
            <div className="credits-container">
                <div className="category">
                    <p className="title">Development</p>
                    <p>Emile Roch</p>
                    <p>Loïc Belaïd Remesal</p>
                </div>
                <div className="category">
                    <p className="title">Artistic direction</p>
                    <p>Charlotte Mandinaud</p>
                    <p>Solène Robichon</p>
                </div>
                <div className="category">
                    <p className="title">Sound</p>
                    <p>Lorem ipsum dolor sit amet</p>
                    <p>Consect</p>
                </div>
                <div className="category">
                    <p className="title">Voice</p>
                    <p>Name of girl</p>
                </div>
            </div>
        </div>
    </div>)
}

const hola = props => {
    console.log('hola');
    console.log(bodymovin)
}

const animateSvg = props => {
    bodymovin.loadAnimation({
        container: document.querySelector('.interaction'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationData
    });
    let anim;

    anim = bodymovin.loadAnimation(params);
};

let visible = true;

const MenuContent = props => {

    let transition = () => {
        let icon1 = document.querySelector('#sound-icon1');
        let icon2 = document.querySelector('#sound-icon2');

        if(visible == true) {
            visible = false
            //TweenMax.to(soundCont.style, .3, { transform: 'scaleY(1)', ease:Sine.easeOut});
            TweenMax.to(icon1.style, .3, { opacity:0, ease:Sine.easeOut});
            TweenMax.to(icon2.style, .3, { opacity:1, ease:Sine.easeOut});
            console.log('SoundOf')
        } else {
            visible= true
            //TweenMax.to(soundCont.style, .3, { transform: 'scaleY(0)', ease:Sine.easeOut});
            TweenMax.to(icon1.style, .3, { opacity:1, ease:Sine.easeOut});
            TweenMax.to(icon2.style, .3, { opacity:0, ease:Sine.easeOut});
            console.log('SoundOn')
        }
    }

    return (
        <div className="menu-container" onClick={()=>{}}>
            <Content/>
        </div>);
};

export default MenuContent;
