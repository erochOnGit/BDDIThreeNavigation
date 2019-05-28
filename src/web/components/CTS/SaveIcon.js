import React from "react";
import './SaveIcon.scss';
import { TweenMax, TimelineLite} from "gsap/TweenMax";

const SaveIcon = props => {

    //SCREEN
    let saveFlower = () => {
        let saveBtn = document.querySelector('.download-btn');
        let canva = document.querySelector('.threeContainer canvas');

        let dataURL = canva.toDataURL('image/jpeg', .7);
        saveBtn.href = dataURL;
    }

    return (
        <div className="save-icon" onClick={()=>{saveFlower()}}>
            <div className="bar"></div>
            <a className='download-btn' href='#' download='Ode_Flower_experience.png'>SAVE</a>
        </div>);
};

export default SaveIcon;
