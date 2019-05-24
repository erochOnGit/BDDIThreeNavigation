import stepSettings from "./stepSettings.json";
import InteractionOne from "../InteractionOne";
import InteractionTwo from "../InteractionTwo";
import InteractionThree from "../InteractionThree";
import InteractionFour from "../InteractionFour/";
import InteractionFive from "../InteractionFive/";
import InteractionTest from "../InteractionTest/";
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
// let params = {
//   exposure: 1,
//   bloomStrength: 2.3,
//   bloomThreshold: 0.3,
//   bloomRadius: 0.08
// };
// let params = {
//   exposure: 1, //1
//   bloomStrength: 1.7, //2.3
//   bloomThreshold: 0.33, //0.3
//   bloomRadius: 0.01 //0.08
// };

export default class Canvas3D {
  constructor({ container, setStep }) {
    this.setStep = setStep;
    this.container = container || document.body;
    this.interactionsIndex = -1;

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    let initCamPos = stepSettings[0].camera.position;
    this.camera.position.set(initCamPos[0], initCamPos[1], initCamPos[2]);
    this.camera.lookAt(0, 0, 0);
    // this.controls = new OrbitControls(this.camera);

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

    this.bloom = {
      exposure: 1,
      bloomStrength: 2.3,
      bloomThreshold: 0.3,
      bloomRadius: 0.08
    };

    //BLOOM RENDER
    let renderScene = new THREE.RenderPass(this.scene, this.camera);
    this.bloomPass = new THREE.UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,
      0.4,
      0.85
    );
    // //Gui
    // const gui = new dat.GUI();
    // gui.add(this.bloom, "bloomThreshold", 0.0, 1.0).onChange(function(value) {
    //   this.bloomPass.threshold = Number(value);
    // });
    // gui.add(this.bloom, "bloomStrength", 0.0, 3.0).onChange(function(value) {
    //   this.bloomPass.strength = Number(value);
    // });
    // gui
    //   .add(this.bloom, "bloomRadius", 0.0, 2.0)
    //   .step(0.01)
    //   .onChange(function(value) {
    //     this.bloomPass.radius = Number(value);
    //   });
    //bloomPass.renderToScreen = true;
    this.bloomPass.threshold = this.bloom.bloomThreshold;
    this.bloomPass.strength = this.bloom.bloomStrength;
    this.bloomPass.radius = this.bloom.bloomRadius;
    composer = new THREE.EffectComposer(this.renderer);
    composer.setSize(window.innerWidth, window.innerHeight);
    composer.addPass(renderScene);
    composer.addPass(this.bloomPass);
    //Add to fixe
    let copyPass = new THREE.ShaderPass(THREE.CopyShader);
    copyPass.renderToScreen = true;
    composer.addPass(copyPass);

    this.interactions = [];

    this.createInteraction(() => {
      this.setInteractionStep(0);

      window.addEventListener("resize", this.onWindowResize.bind(this), false);
      this.onWindowResize();
      this.clock = new THREE.Clock();
      this.clock.start();
      this.renderer.setAnimationLoop(this.render.bind(this));
    });
  }

  render(t) {
    this.interactions[this.interactionsIndex].update(
      this.clock.getElapsedTime(),
      t
    );
    // console.log(this.scene);
    // this.renderer.render(this.scene, this.camera);
    composer.render(); //Bloom
  }
  hide() {
    this.container.style.display = "none";
  }
  display() {
    this.container.style.display = "block";
  }
  createInteraction(success) {
    this.interactions.push(new InteractionOne({ camera: this.camera }));
    this.interactions.push(new InteractionTwo({ camera: this.camera }));
    this.interactions.push(new InteractionThree());
    this.interactions.push(
      new InteractionFour({ renderer: this.renderer, camera: this.camera })
    );
    this.interactions.push(
      new InteractionFive({ camera: this.camera, scene: this.scene })
    );
    success();
    // let allMeshsLoaded = false;
    // while (!allMeshsLoaded) {
    //   allMeshsLoaded = true;
    //   this.interactions.forEach(interaction => {
    //     if (interaction.loading != undefined && interaction.loading < 100) {
    //       allMeshsLoaded = false;
    //       console.log("coucou");
    //     }
    //   });
    //   // console.log(allMeshsLoaded);
    //   if (allMeshsLoaded) {
    //     success();
    //   }
    // }
  }
  setInteractionStep(index) {
    if (this.interactionsIndex >= 0) {
      this.removeAllMesh();
      this.removeInteractionEvent(this.interactions[this.interactionsIndex]);
      this.removeInteractionTracking(this.interactions[this.interactionsIndex]);
    }
    this.camera.position.set(
      stepSettings[index].camera.position[0],
      stepSettings[index].camera.position[1],
      stepSettings[index].camera.position[2]
    );
    this.camera.rotation.set(
      stepSettings[index].camera.rotation[0],
      stepSettings[index].camera.rotation[1],
      stepSettings[index].camera.rotation[2]
    );

    this.bloomPass.threshold = stepSettings[index].bloom.bloomThreshold;
    this.bloomPass.strength = stepSettings[index].bloom.bloomStrength;
    this.bloomPass.radius = stepSettings[index].bloom.bloomRadius;

    this.setStep(index);
    this.loadInteractionGltf(this.interactions[index], () => {
      this.addInteractionMesh(this.interactions[index]);
      this.addInteractionEvent(this.interactions[index]);
      this.startInteractionTracking(this.interactions[index]);
      this.interactionsIndex = index;
    });
  }
  removeAllMesh() {
    //console.log("REMOVING ALL MESHES");
    //console.log(this.scene.children);
    this.scene.children = this.scene.children.filter(child => {
      return (
        child.type != "Mesh" &&
        child.type != "Group" &&
        child.type != "DirectionalLight" &&
        child.type != "PointLight" &&
        child.type != "AmbientLight"
      );
    });
    console.log(this.scene.children);
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
  startInteractionTracking(interaction) {
    interaction.trackings.forEach(tracking => {
      tracking.start();
    });
  }
  removeInteractionTracking(interaction) {
    interaction.trackings.forEach(tracking => {
      tracking.stop();
    });
  }
  loadInteractionGltf(interaction, success) {
    if (interaction.loadingGltf.length > 0) {
      interaction.loadingGltf.forEach(gltfObj => {
        gltfObj.loader.load(
          gltfObj.glb,
          gltfObj.success(success),
          gltfObj.pending,
          gltfObj.error
        );
      });
    } else {
      success();
    }
  }
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.interactions[this.interactionsIndex].onResize(this.camera);
  }
}
