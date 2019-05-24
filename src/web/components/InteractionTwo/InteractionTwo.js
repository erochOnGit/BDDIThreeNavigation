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
import Aura from "./Aura/Aura";
import GlowSphere from "./GlowSphere/GlowSphere";

//CAMERA
import diffCamEngine from "./diffCamEngine/diffCamEngine";

//let groupRotation = 2;

export default class InteractionTwo extends Interaction {
  constructor({ camera }) {
    super();

    this.camera = camera;
    this.scoreInteractionOne = 0;
    this.groupPollen = new THREE.Group();
    this.posAuraX = [];
    this.posAuraY = [];
    this.lastMovemento = [];
    let nbParticules = 10;

    /**
     * Objects
     */
    //LANDSCAPE
    this.landscape = new Landscape();
    this.objects.push(this.landscape);

    //AURA
    for (let x = 0; x < nbParticules; x++) {
      for (let y = 0; y < nbParticules; y++) {
        let rand = Math.random() * 0.1;
        let aura = new Aura({
          groupPollen: this.groupPollen,
          posAuraX: this.posAuraX,
          posAuraY: this.posAuraY,
          rayon: 0.7,
          x,
          y,
          rand
        });
        this.objects.push({ mesh: this.groupPollen });
      }
    }
    /*let rayon = 0.7;
        for (let x = 0; x < nbParticules; x++) {
            for (let y = 0; y < nbParticules; y++) {
                let rand = Math.random()*0.1;
                let geometry = new THREE.SphereBufferGeometry(rand, 8, 7 );
                let material = new THREE.MeshPhongMaterial({color:0xfffffff, transparent:true, opacity: 1-(rand*15)});
                this.mesh = new THREE.Mesh( geometry, material );

                this.mesh.position.x = THREE.Math.randFloat(rayon, rayon+ (rand*10) * 2) * Math.cos(y) * Math.sin(x);
                this.mesh.position.y = THREE.Math.randFloat(rayon, rayon+ (rand*10) * 1.1) * Math.sin(y) * Math.sin(x);
                this.mesh.position.z = -rand*10;

                this.posAuraX.push(this.mesh.position.x)
                this.posAuraY.push(this.mesh.position.y)

                let scale = THREE.Math.randFloat(.3, 3)
                let scale2 = THREE.Math.randFloat(.8, 1.2)
                this.mesh.scale.set(scale*(scale2), scale, 0.001)

                //BEGIN ANIMATION
                if(this.mesh.position.x != 0) {
                    this.groupPollen.add(this.mesh);
                }
            }
        }
        this.objects.push({ mesh: this.groupPollen });*/

    //GLOW SPHERE
    this.glowSphere = new GlowSphere({ camera: this.camera });
    this.objects.push(this.glowSphere);

    /**
     * Lights
     */
    this.ambientLight = new THREE.AmbientLight(0x404040); // soft white light
    this.lights.push(this.ambientLight);

    this.pointLight = new THREE.PointLight(0x020202, 1, 100); //0xffeea1
    this.lights.push(this.pointLight);

    /*let sphereSize = 0.1;
    this.pointLightHelper = new THREE.PointLightHelper(
      this.pointLight,
      sphereSize
    );
    this.objects.push({ mesh: this.pointLightHelper });*/

    this.pointLightCircle = new THREE.PointLight(0xdddddd, 1, 100); //0xffeea1
    this.lights.push(this.pointLightCircle);
    this.pointLightCircle.position.z = 1;

    /*this.pointLightCircleHelper = new THREE.PointLightHelper(
      this.pointLightCircle,
      sphereSize
    );
    this.objects.push({ mesh: this.pointLightCircleHelper });*/

    /**
     * Events
     */

    /**
     * Tracking
     */
    this.camCaptor = diffCamEngine();
    this.trackings.push({
      tracker: this.camCaptor,
      start: () => {
        this.score = document.createElement("p");
        this.score.id = "score";

        document.body.appendChild(this.score);

        function initSuccess() {
          this.camCaptor.start();
        }

        function initError(e) {
          console.warn("Something went wrong.");
          console.log(e);
        }

        function capture(payload) {
          this.score.textContent = payload.score;
          //console.log(payload.score)
          this.scoreInteractionOne = payload.score;
        }

        this.camCaptor.init({
          initSuccessCallback: initSuccess.bind(this),
          initErrorCallback: initError,
          captureCallback: capture.bind(this)
        });
      },
      stop: () => {
        this.camCaptor.stop();
        if (this.score) {
          this.score.parentNode.removeChild(this.score);
        }
      }
    });
  }
  update(time, t) {
    let movemento = this.scoreInteractionOne / 10000;

    if (movemento > 0.05) {
      this.lastMovemento.push(movemento);
      //console.log(this.lastMovemento)
    } else {
      this.lastMovemento.push("0");
    }
    //GROUP MOVEMENT
    let scaling = 1 + Math.abs(Math.sin(t / 1000) * 0.05);

    for (let i = 0; i < this.groupPollen.children.length; i++) {
      this.groupPollen.children[i].material.needsUpdate = true;
      //AURA POSITION
      this.groupPollen.position.z = 1.1;
      this.groupPollen.children[i].position.x +=
        Math.cos(t * 0.001 + this.groupPollen.children[i].position.x) * 0.01; //* (scaling*i/2)
      this.groupPollen.children[i].position.y +=
        Math.sin(t * 0.001 + this.groupPollen.children[i].position.y) * 0.02; //* (scaling*i/10)
      this.groupPollen.children[i].position.z +=
        Math.sin(t * 0.001 + this.groupPollen.children[i].position.z) * 0.0005;

      this.groupPollen.children[i].scale.x +=
        Math.sin(t * 0.001 + this.groupPollen.children[i].position.x) *
        (Math.random() * 0.005);
      this.groupPollen.children[i].scale.y +=
        Math.sin(t * 0.002 + this.groupPollen.children[i].position.z) *
        (Math.random() * 0.005);
    }
    //if(movemento > 0.08) {
    if (this.lastMovemento[this.lastMovemento.length - 1] > 0.05) {
      //console.log(movemento)
      //console.log(this.lastMovemento[this.lastMovemento.length - 1]);
      for (let i = 0; i < this.groupPollen.children.length; i++) {
        let tl = new TimelineLite();
        tl.to(this.groupPollen.children[i].position, 2, {
          x:
            this.groupPollen.children[i].position.x *
            (this.lastMovemento[this.lastMovemento.length - 1] *
              (Math.random() * 25)),
          y:
            this.groupPollen.children[i].position.y *
            (this.lastMovemento[this.lastMovemento.length - 1] *
              (Math.random() * 25)),
          ease: Sine.easeOut
        });
      }
    } else {
      for (let i = 0; i < this.groupPollen.children.length; i++) {
        let tl = new TimelineLite();
        tl.to(this.groupPollen.children[i].position, 2, {
          x: this.posAuraX[i],
          y: this.posAuraY[i],
          ease: Sine.easeOut
        });
      }
    }
    //0.1463

    if (this.lastMovemento[this.lastMovemento.length - 1] == 0.1463) {
      //console.log("HOEHO");
    }

    //LIGHT MOVEMENT
    this.pointLight.position.x = Math.cos(t / 752) * 0.1;
    this.pointLight.position.y = Math.sin(t / 438) * 0.1;
    this.pointLight.position.z = Math.sin(t / 678) * 0.1;
    this.pointLightCircle.position.x = Math.cos(t / 678) * 1.6;
    this.pointLightCircle.position.y = Math.sin(t / 678) * 1.6;
    //LANDSCAPE ANIMATION
    this.landscape.update();
  }
}
