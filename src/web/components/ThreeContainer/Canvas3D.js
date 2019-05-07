import stepSettings from "./stepSettings.json";
import InteractionOne from "../InteractionOne";
import InteractionThree from "../InteractionThree";
import InteractionFour from "../InteractionFour/";
import Interaction from "./Interaction.js";
import dat from "dat.gui";
var OrbitControls = require("three-orbit-controls")(THREE);

//POST PROC
import "three/examples/js/postprocessing/EffectComposer";
import "three/examples/js/postprocessing/RenderPass";
import "three/examples/js/postprocessing/ShaderPass";
import "three/examples/js/shaders/CopyShader";

import "three/examples/js/shaders/DotScreenShader";
import "three/examples/js/shaders/LuminosityHighPassShader";
import "three/examples/js/postprocessing/UnrealBloomPass";
let composer;
let params = {
  exposure: 1,
  bloomStrength: 2.3,
  bloomThreshold: 0.3,
  bloomRadius: 0.08
};

export default class Canvas3D {
  constructor({ container, setStep }) {
    this.setStep = setStep;
    this.container = container || document.body;
    this.interactionsIndex = 0;

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    let initCamPos = stepSettings[this.interactionsIndex].camera.position;
    this.camera.position.set(initCamPos[0], initCamPos[1], initCamPos[2]);
    this.camera.lookAt(0, 0, 0);
    this.controls = new OrbitControls(this.camera);

    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.intersects = [];

    var size = 10;
    var divisions = 10;

    // var gridHelper = new THREE.GridHelper(size, divisions);
    // this.scene.add(gridHelper);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    //Gui
    const gui = new dat.GUI();
    gui.add(params, "bloomThreshold", 0.0, 1.0).onChange(function(value) {
      bloomPass.threshold = Number(value);
    });
    gui.add(params, "bloomStrength", 0.0, 3.0).onChange(function(value) {
      bloomPass.strength = Number(value);
    });
    gui
      .add(params, "bloomRadius", 0.0, 2.0)
      .step(0.01)
      .onChange(function(value) {
        bloomPass.radius = Number(value);
      });
    //BLOOM RENDER
    let renderScene = new THREE.RenderPass(this.scene, this.camera);
    let bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    //bloomPass.renderToScreen = true;
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;
    composer = new THREE.EffectComposer(this.renderer);
    composer.setSize(window.innerWidth, window.innerHeight);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);
    //Add to fixe
    let copyPass = new THREE.ShaderPass(THREE.CopyShader);
    copyPass.renderToScreen = true;
    composer.addPass(copyPass);

    this.interactions = [];
    this.interactions.push(new InteractionOne({ camera: this.camera }));
    this.interactions.push(new Interaction());
    this.interactions.push(new InteractionThree());
    this.interactions.push(new InteractionFour({ renderer: this.renderer }));
    this.setInteractionStep(this.interactionsIndex);

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    this.onWindowResize();
    this.clock = new THREE.Clock();
    this.clock.start();
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  render() {
    this.interactions[this.interactionsIndex].update(
      this.clock.getElapsedTime()
    );
    // this.renderer.render(this.scene, this.camera);
    composer.render(); //Bloom
  }
  hide() {
    this.container.style.display = "none";
  }
  display() {
    this.container.style.display = "block";
  }
  setInteractionStep(index) {
    this.removeAllMesh();
    this.removeInteractionEvent(this.interactions[this.interactionsIndex]);
    //here we add one because the global step zero is linked to the home screen
    this.setStep(index + 1);
    this.addInteractionMesh(this.interactions[index]);
    this.addInteractionEvent(this.interactions[index]);
  }
  removeAllMesh() {
    this.scene.children = this.scene.children.filter(child => {
      return child.type != "Mesh" && child.type != "DirectionalLight";
    });
  }

  addInteractionMesh(interaction) {
    interaction.objects.forEach(object => {
      this.scene.add(object.mesh);
    });
    interaction.lights.forEach(light => {
      this.scene.add(light);
    });
  }
  removeInteractionEvent(interaction) {
    interaction.events.forEach(event => {
      event.target.removeEventListener(
        event.eventName,
        event.handler(),
        event.option
      );
    });
  }
  addInteractionEvent(interaction) {
    interaction.events.forEach(event => {
      // event.target.addEventListener(event.eventName, event.fctn, event.option);
      event.target.addEventListener(
        event.eventName,
        event.handler(this),
        event.option
      );
    });
  }
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
