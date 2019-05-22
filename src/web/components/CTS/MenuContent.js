import React from "react";
import './MenuContent.scss';
import { TweenMax } from "gsap/TweenMax";
import Naissance from '../CTS/Json/Naissance/data.json'; //wright
import Desir from '../CTS/Json/Desir/data.json';
import Echo from '../CTS/Json/Echo/data.json';
import Reflet from '../CTS/Json/Reflet/data.json';
import Lottie from 'react-lottie'


//ELEMENT
import img0Desir from '../CTS/Json/Desir/img_0.png';
import img0Echo from '../Cts/Json/Echo/img_0.png';
import img0Reflet from '../Cts/Json/Reflet/img_0.png';
import img1Reflet from '../Cts/Json/Reflet/img_1.png';

Desir.assets[0].p = img0Desir;
Echo.assets[0].p = img0Echo;
Reflet.assets[0].p = img0Reflet;
Reflet.assets[1].p = img1Reflet;

const Content = props => {

    console.log('Step: ',props.step)

    let iconInteract;
    let expr = props.step;
    switch (expr) {
        case 0:
            iconInteract = Naissance;
            console.log('This is the scene 0');
            break;
        case 1:
            iconInteract = Desir;
            console.log('This is the scene 1');
            break;
        case 2:
            iconInteract = Echo;
            console.log('This is the scene 2');
            break;
        case 3:
            iconInteract = Reflet;
            console.log('This is the scene 3');
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


const hola = () => {
}
const MenuContent = props => {

    hola()
    let transition = () => {

    }
    return (
        <div className="menu-container" onClick={()=>{}}>
            <Content step={props.step}/>
        </div>);
};

export default MenuContent;
