import React from "react";
import SoundIcon from "../CTS/SoundIcon";

const Home = props => {
    let update = () =>{
            console.log('wait')
        document.querySelector('.main-home-container').classList.add('leave-container');
        let transitionElement = document.createElement("div");
        transitionElement.classList.add('transition-element');
        document.querySelector('.main-home-container').appendChild(transitionElement);
        setTimeout(function() {
            props.setStep(0)
        },500);
    }

  return (
      <div className="main-home-container">
          <SoundIcon/>
        <div className="center-container">
          <h1>Ode</h1>
          <h3>Narcisse & les Métamorphoses</h3>
          <div className="start-btn"><a className="link-btn" onClick={()=>{update()}}>commencer</a></div>
          <p onClick={update}>Pour profiter de l'expérience veuillez autoriser <br></br> l'accès à votre micro et votre webcam</p>
        </div>
     </div>);
};

export default Home;
