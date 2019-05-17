import React from "react";
import SoundIcon from "../CTS/SoundIcon";
import FullScreenIcon from "../CTS/FullScreenIcon";
import MenuContent from "src/web/components/CTS/MenuContent";
import MenuIcon from "src/web/components/CTS/MenuIcon";
import animationData from '../CTS/Json/data.json';
import Lottie from 'react-lottie'
import img0 from '../CTS/Json/images/img_0.png';
import img1 from '../CTS/Json/images/img_1.png';
import img2 from '../CTS/Json/images/img_2.png';
import img3 from '../CTS/Json/images/img_3.png';


animationData.assets[0].p = img0;
animationData.assets[1].p = img1;
animationData.assets[2].p = img2;
animationData.assets[3].p = img3;
const Home = props => {

    console.log(animationData)

    let update = () => {
        console.log('wait')
        let transitionElement = document.createElement("div");
        transitionElement.classList.add('transition-element');
        document.querySelector('.main-home-container').appendChild(transitionElement);
        setTimeout(function() {
            props.setStep(0)
        },500);
    }

        setTimeout(()=> {
            document.querySelectorAll('img').forEach((img)=>{
            console.log('iezjjdijeizdjizj')
                console.log(document.querySelectorAll('img'))
                img.onerror = function(){this.style.display='none';};
            },2000)
        })

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

  return (
      <div className="main-home-container">
          <SoundIcon/>
          <FullScreenIcon/>
          <MenuIcon/>
          <MenuContent/>
        <div className="center-container">
            <div>
                <Lottie id="lottie" options={defaultOptions}/>
            </div>
          <h3>Narcissus and his metamorphosis</h3>
          <div className="start-btn"><a className="link-btn" onClick={()=>{update()}}>Begin</a></div>
          <p>To enjoy the experience,please allow<br></br>access to your microphone and to your webcamera</p>
        </div>
     </div>);
};

export default Home;
