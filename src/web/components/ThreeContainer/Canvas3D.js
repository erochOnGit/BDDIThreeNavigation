import Interaction from "./Interaction";
import InteractionOne from "../InteractionOne";
import InteractionFour from "../InteractionFour/";

export default class Canvas3D {
  constructor({ container, setStep }) {
    this.setStep = setStep;
    this.container = container || document.body;
    this.camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.z = -5;
    this.camera.position.y = 5;
    this.camera.position.x = 5;

    this.camera.lookAt(0, 0, 0);
    var size = 10;
    var divisions = 10;

    var gridHelper = new THREE.GridHelper(size, divisions);

    this.scene = new THREE.Scene();
    this.interactions = [];
    this.interactionsStep = 1;
    this.interactions.push(new InteractionOne());
    this.interactions.push(new InteractionFour());

    this.scene.add(gridHelper);
    this.setInteractionStep(1);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.container.appendChild(this.renderer.domElement);

    window.addEventListener("resize", this.onWindowResize.bind(this), false);
    this.onWindowResize();
    this.clock = new THREE.Clock();
    this.clock.start();
    this.renderer.setAnimationLoop(this.render.bind(this));
  }

  render() {
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
    this.setStep(index);

    //here we sub one because the global step zero is linked to the home screen
    this.AddInteractionMesh(this.interactions[index - 1]);
  }
  removeAllMesh() {
    this.scene.children = this.scene.children.filter(child => {
      return child.type != "Mesh";
    });
  }
  AddInteractionMesh(interaction) {
    interaction.meshes.forEach(mesh => {
      this.scene.add(mesh);
    });
  }
  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
