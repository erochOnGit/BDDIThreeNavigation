import Interaction from "../ThreeContainer/Interaction";
import { TweenMax, Power2, TimelineLite } from "gsap/TweenMax";

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
import Heart from "./Heart/Heart";
import Stem from "./Stem/Stem";
import Curve from "./Curve/Curve";
import GlowSphere from "./GlowSphere/GlowSphere";

//CAMERA
import diffCamEngine from "./diffCamEngine/diffCamEngine";

//VARIABLES
let groupRotation = 2;

export default class InteractionOne extends Interaction {
  constructor({ camera }) {
    super();

    this.camera = camera;
    this.scoreInteractionOne = 0;
    this.groupPollen = new THREE.Group();
    let nbParticules = 15;

    /**
     * Objects
     */

    //LANDSCAPE
    this.landscape = new Landscape();
    this.objects.push(this.landscape);

    //POLLEN GENERATION
    for (let x = 0; x < nbParticules; x++) {
      for (let y = 0; y < nbParticules; y++) {
        let pollen = new SpherePollen({ rayon: 1.05, x, y });
        this.groupPollen.add(pollen.mesh);
        this.objects.push({ mesh: this.groupPollen });
      }
    }
    this.groupPollen.rotation.x = groupRotation;

    //HEART
    this.heart = new Heart();
    // console.log(this.heart)
    this.objects.push(this.heart);

    //STEM
    this.stem = new Stem();
    this.objects.push(this.stem);

    //CURVE CREATE
    this.curve = new Curve({ groupPollen: this.groupPollen });

    //GLOW SPHERE
    this.glowSphere = new GlowSphere({ camera: this.camera });
    this.objects.push(this.glowSphere);

    /**
     * Lights
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
     * Events
     */
    // this.camCaptor = diffCamEngine();
    // let score = document.createElement("p");
    // score.id = "score";

    // document.body.appendChild(score);

    // function initSuccess() {
    //   this.camCaptor.start();
    // }

    // function initError(e) {
    //   console.warn("Something went wrong.");
    //   console.log(e);
    // }

    // function capture(payload) {
    //   score.textContent = payload.score;
    //   //console.log(payload.score)
    //   this.scoreInteractionOne = payload.score;
    // }

    // this.camCaptor.init({
    //   initSuccessCallback: initSuccess.bind(this),
    //   initErrorCallback: initError,
    //   captureCallback: capture.bind(this)
    // });
  }
  update(time) {
    // let random = Math.floor(
    //   Math.random() * (this.groupPollen.children.length - 1)
    // );
    // //console.log(this.scoreInteractionOne);
    // let movemento = this.scoreInteractionOne / 10000;
    // //DANDELION MOVEMENT
    // TweenMax.to(this.groupPollen.position, 0.3, {
    //   z: -movemento * 3,
    //   ease: Sine.easeOut
    // });
    // TweenMax.to(this.groupPollen.rotation, 0.3, {
    //   x:
    //     (groupRotation +
    //       movemento * (Math.random() * 3) -
    //       this.groupPollen.rotation.x) *
    //     0.5,
    //   y:
    //     (groupRotation / 0.5 +
    //       movemento * (Math.random() * 2) -
    //       this.groupPollen.rotation.y) *
    //     0.5
    // });
    // //LANDSCAPE ANIMATION
    // this.landscape.update(time);
    // //LIGHT MOVEMENT
    // this.pointLight.position.x = Math.cos(time * 1.329) * 1;
    // this.pointLight.position.y = Math.sin(time * 2.283) * 1;
    // this.pointLight.position.z = Math.sin(time * 1.474) * 0.1;
    // this.pointLightCircle.position.x = Math.cos(time * -1.474) * 1.6;
    // this.pointLightCircle.position.y = Math.sin(time * -1.474) * 1.6;
    // /*//HEART MOVEMENT
    //     let scaling = 1 + Math.abs(Math.sin(t/1000)*.05)
    //     this.heart.mesh.scale.set(scaling - movemento,scaling - movemento,scaling - movemento)
    //     for ( let i = 0; i < this.groupPollen.children.length; i ++ ) {
    //         //POLLEN POSITION
    //         this.groupPollen.children[i].position.x += Math.cos((t * 0.001) + this.groupPollen.children[i].position.x) * 0.0005;
    //         this.groupPollen.children[i].position.y += Math.sin((t * 0.001) + this.groupPollen.children[i].position.y) * 0.0005;
    //         this.groupPollen.children[i].position.z += Math.sin((t * 0.001) + this.groupPollen.children[i].position.z) * 0.0001;
    //         //LINE POSITION
    //         this.groupLine.children[i].geometry.vertices[1].x += Math.cos((t * 0.001) + this.groupPollen.children[i].position.x) * 0.0005;
    //         this.groupLine.children[i].geometry.vertices[1].y += Math.sin((t * 0.001) + this.groupPollen.children[i].position.y) * 0.0005;
    //         this.groupLine.children[i].geometry.vertices[1].z += Math.sin((t * 0.001) + this.groupPollen.children[i].position.z) * 0.0001;
    //         this.groupLine.children[i].geometry.verticesNeedUpdate = true;
    //     }*/
  }
}
