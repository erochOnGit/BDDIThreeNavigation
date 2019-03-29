import stepSettings from "./stepSettings.json";
import InteractionOne from "../InteractionOne";
import InteractionFour from "../InteractionFour/";
import Interaction from "./Interaction.js";
var OrbitControls = require("three-orbit-controls")(THREE);

export default class Canvas3D {
  constructor({ container, setStep }) {
    this.setStep = setStep;
    this.container = container || document.body;
    this.interactionsIndex = 3;

    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    let initCamPos = stepSettings[this.interactionsIndex].camera.position;
    this.camera.position.z = initCamPos[2];
    this.camera.position.y = initCamPos[1];
    this.camera.position.x = initCamPos[0];
    this.camera.lookAt(0, 0, 0);
    // this.controls = new OrbitControls(this.camera);

    this.scene = new THREE.Scene();
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.intersects = [];

    var size = 10;
    var divisions = 10;

    var gridHelper = new THREE.GridHelper(size, divisions);
    this.scene.add(gridHelper);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    this.interactions = [];
    this.interactions.push(new InteractionOne());
    this.interactions.push(new Interaction());
    this.interactions.push(new Interaction());
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
    this.renderer.render(this.scene, this.camera);
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
