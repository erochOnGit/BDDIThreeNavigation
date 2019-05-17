import React from "react";
import './MenuIcon.scss';
import { TweenMax } from "gsap/TweenMax";

let divStyle1 = {
    opacity: '1',
};
let divStyle2 = {
    opacity: '0',
};
const MenuSvg = props => (
    <div className="menu-icon-cont">
        <div className="menu-icon1-cont" style={divStyle1}>
            <div className="hidari"></div>
            <div className="migi"></div>
        </div>
        <div className="menu-icon2-cont" style={divStyle2}>
            <div className="hidari"></div>
            <div className="migi"></div>
        </div>
    </div>
);

let visible = true;

const MenuIcon = props => {

    let transition = () => {
        let icon1 = document.querySelector('.menu-icon1-cont');
        let icon2 = document.querySelector('.menu-icon2-cont');

        if(visible == true) {
            visible = false
            //TweenMax.to(soundCont.style, .3, { transform: 'scaleY(1)', ease:Sine.easeOut});
            TweenMax.to(icon1.style, .3, { opacity:0, ease:Sine.easeOut});
            TweenMax.to(icon2.style, .3, { opacity:1, ease:Sine.easeOut});
            console.log('MenuOn')

            //Open Menu a déplacer
            /*let menuElement = document.createElement("div");
            menuElement.classList.add('menu-container');
            document.querySelector('#app').appendChild(menuElement);*/
            document.querySelector('.menu-container').classList.remove('leave-menu');
            document.querySelector('.menu-container').style.display = 'block';
        } else {
            visible= true
            //TweenMax.to(soundCont.style, .3, { transform: 'scaleY(0)', ease:Sine.easeOut});
            TweenMax.to(icon1.style, .3, { opacity:1, ease:Sine.easeOut});
            TweenMax.to(icon2.style, .3, { opacity:0, ease:Sine.easeOut});
            console.log('MenudOf')

            //Close Menu a déplacer
            /*document.querySelector('.menu-container').classList.add('leave-menu');
            setTimeout(()=>{
                document.querySelector('.menu-container').remove();
            },750);*/
            document.querySelector('.menu-container').classList.add('leave-menu');
            setTimeout(()=>{
                document.querySelector('.menu-container').style.display = 'none';
            },750)
        }
    }

    return (
        <div className="menu-icon" onClick={()=>{transition()}}>
            <MenuSvg />
        </div>);
};

export default MenuIcon;
