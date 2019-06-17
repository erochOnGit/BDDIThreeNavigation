import React from "react";
import './MenuContent.scss';
import { TweenMax } from "gsap/TweenMax";
import Naissance from '../CTS/Json/Naissance/data.json'; //wright
import Desir from '../CTS/Json/Desir/data.json';
import Echo from '../CTS/Json/Echo/data.json';
import Reflet from '../CTS/Json/Reflet/data.json';
import Flower from '../CTS/Json/Flower/data.json'
import Lottie from 'react-lottie'


//ELEMENT
import img0Desir from '../CTS/Json/Desir/img_0.png';
import img0Echo from '../CTS/Json/Echo/img_0.png';
import img0Reflet from '../CTS/Json/Reflet/img_0.png';
import img1Reflet from '../CTS/Json/Reflet/img_1.png';
import echoGif from '../CTS/Echos.gif';
import img1Flower from '../CTS/Json/Flower/img_0.png';

Desir.assets[0].p = img0Desir;
Echo.assets[0].p = img0Echo;
Reflet.assets[0].p = img0Reflet;
Reflet.assets[1].p = img1Reflet;
Flower.assets[0].p = img1Flower;

const Content = props => {
    //console.log('Step: ',props.step)
    let iconInteract;
    let sentence;
    let expr = props.step;
    switch (expr) {
        case 0:
            iconInteract = Naissance;
            sentence = 'Blow on your microphone to spread pollen.';
            break;
        case 1:
            iconInteract = Desir;
            sentence = 'Approach or move your hand away from the camera to attract or reject peoples.';
            break;
        case 2:
            //iconInteract = Echo;
            sentence = 'Talk to Echo to communicate with her.';
            setTimeout(()=>{
                document.querySelector('.interaction .echo-gif').style.display = 'flex';
            },250);
            break;
        case 3:
            iconInteract = Reflet;
            sentence = 'Make gestures in front of the camera to reveal your reflection.';
            setTimeout(()=>{
                document.querySelector('.interaction .echo-gif').style.display = 'none';
            },250);
            break;
        case 4:
            iconInteract = Flower;
            sentence = 'This flower is the result of your actions during the experience, it represents your inner beauty.';
            setTimeout(()=> {
                //document.querySelector('.center-cont .help-txt').innerHTML = '';
                //After center-cont <p className="help-txt">Help</p>
                //After bottom-cont <p className="credits-txt">Credits</p>
            document.querySelector('.interaction-container .interaction').classList.add('interact-five');
            },250);
            break;
        default:
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: iconInteract,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
    <div className="menu-cont">
        <div className="center-cont">
            <div className="interaction-container">
                <div className="interaction">
                    <img className="echo-gif" src={echoGif}/>
                    <Lottie options={defaultOptions}/>
                </div>
                <p>{sentence}</p>
            </div>
        </div>
        <div className="bottom-cont">
            <div className="credits-container">
                <div className="category">
                    <p className="title">Development</p>
                    <p>Émile Roch</p>
                    <p>Loïc Belaïd-Remesal</p>
                </div>
                <div className="category">
                    <p className="title">Artistic direction</p>
                    <p>Charlotte Mandinaud</p>
                    <p>Solène Robichon</p>
                </div>
                <div className="category">
                    <p className="title">Sound</p>
                    <p>Sydney Dyens</p>
                </div>
                <div className="category">
                    <p className="title">Voice</p>
                    <p>Zohra Mrad</p>
                </div>
            </div>
        </div>
    </div>)
}


const MenuContent = props => {

    return (
        <div className="menu-container" onClick={()=>{}}>
            <Content step={props.step}/>
        </div>);
};

export default MenuContent;
