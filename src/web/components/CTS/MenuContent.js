import React from "react";
import './MenuContent.scss';
import { TweenMax } from "gsap/TweenMax";
import animationData from './Json/data.json';
import Lottie from 'react-lottie'

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


const hola = () => {
        // console.log('hola');
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
