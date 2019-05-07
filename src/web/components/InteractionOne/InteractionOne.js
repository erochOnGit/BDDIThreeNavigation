import Interaction from "../ThreeContainer/Interaction";
import { TweenMax, Power2, TimelineLite } from "gsap/TweenMax";

//TEXTURE
import imgMap from "../../assets/Texture/Leather/Leather_001_NRM.png";
import imgDisp from "../../assets/Texture/Leather/Leather_001_DISP.png";

//SHADER
import landscapeVertexShader from "../../assets/shaders/LandscapeShader/landscapeVertex.glsl";
import landscapeFragmentShader from "../../assets/shaders/LandscapeShader/landscapeFragment.glsl";
import glowVertexShader from "../../assets/shaders/GlowShader/glowVertex.glsl";
import glowFragmentShader from "../../assets/shaders/GlowShader/glowFragment.glsl";

//POST PROC
import "three/examples/js/postprocessing/EffectComposer";
import "three/examples/js/postprocessing/RenderPass";
import "three/examples/js/postprocessing/ShaderPass";
import "three/examples/js/shaders/CopyShader";

import "three/examples/js/shaders/DotScreenShader";
import "three/examples/js/shaders/LuminosityHighPassShader";
import "three/examples/js/postprocessing/UnrealBloomPass";

//OBJECT
import Landscape from "./Landscape/Landscape";

export default class InteractionOne extends Interaction {
  constructor() {
    super();

    /**
     * objects
     */
    // this.objects.push(ring);
    this.landscape = new Landscape();
    this.objects.push(this.landscape);

    /**
     * lights
     */
    // this.lights.push(spotLight);

    /**
     * events
     */
  }
  update(time) {
    //do nothing forthe moment
    this.landscape.update(time);
  }
}
