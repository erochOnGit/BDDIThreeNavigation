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
import SpherePollen from "./SpherePollen/SpherePollen";

export default class InteractionOne extends Interaction {
  constructor() {
    super();

    this.groupPollen = new THREE.Group();
    let nbParticules = 15;

    /**
     * objects
     */
    this.landscape = new Landscape();
    this.objects.push(this.landscape);
    for (let x = 0; x < nbParticules; x++) {
      for (let y = 0; y < nbParticules; y++) {
        let pollen = new SpherePollen({ rayon: 1.05, x, y });
        this.groupPollen.add(pollen.mesh);
        this.objects.push({ mesh: this.groupPollen });
      }
    }
    /**
     * lights
     */
    this.ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    this.lights.push(this.ambientLight);

    this.pointLight = new THREE.PointLight(0xffffff, 1, 100); //0xffeea1
    this.lights.push(this.pointLight);

    // let sphereSize = 0.1;
    // this.pointLightHelper = new THREE.PointLightHelper(
    //   this.pointLight,
    //   sphereSize
    // );
    // this.objects.push({ mesh: this.pointLightHelper });

    this.pointLightCircle = new THREE.PointLight(0xffffff, 1, 100); //0xffeea1
    this.lights.push(this.pointLightCircle);

    // this.pointLightCircleHelper = new THREE.PointLightHelper(
    //   this.pointLightCircle,
    //   sphereSize
    // );
    // this.objects.push({ mesh: this.pointLightCircleHelper });

    /**
     * events
     */
  }
  update(time) {
    //do nothing forthe moment
    this.landscape.update(time);

    //LIGHT MOVEMENT
    this.pointLight.position.x = Math.cos(time * 1.329) * 1;
    this.pointLight.position.y = Math.sin(time * 2.283) * 1;
    this.pointLight.position.z = Math.sin(time * 1.474) * 0.1;
    this.pointLightCircle.position.x = Math.cos(time * -1.474) * 1.6;
    this.pointLightCircle.position.y = Math.sin(time * -1.474) * 1.6;
  }
}
