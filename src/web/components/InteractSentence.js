import React from "react";
import {TweenMax} from "gsap/TweenMax";

const InteractSentence = (instruction) => {

        setTimeout(()=> {
            let sentence = document.createElement("p");
            sentence.classList.add('interact-sentence');
            let content = document.createTextNode(instruction);
            sentence.appendChild(content);

            let container = document.querySelector('.main-one-container');
            let element = document.querySelector('.interact-sentence')
            if(!element) {
                container.appendChild(sentence)
            }
        },1000)

};

export default InteractSentence;
