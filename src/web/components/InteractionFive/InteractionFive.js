import Interaction from "../ThreeContainer/Interaction";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//OBJECT
import Landscape from "./Landscape/Landscape";
import fleur4 from "src/web/assets/meshs/fleur4.gltf";

export default class InteractionFive extends Interaction {
  constructor() {
    super();

    /**
     * objects
     */
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var mesh = new THREE.Mesh(geometry, material);
    this.objects.push({ mesh });

    //LANDSCAPE ANIMATION
      this.landscape = new Landscape();
      this.objects.push(this.landscape);

    let mixer;
    const loader = new GLTFLoader();
    loader.load(
      fleur4,
      gltf => {
        // called when the resource is loaded
        const model = gltf.scene;
        mixer = new THREE.AnimationMixer(model);
        gltf.animations.forEach(clip => {
          mixer.clipAction(clip).play();
        });
      },
      xhr => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      error => {
        // called when loading has errors
        console.error("An error happened", error);
      }
    );
    /**
     * lights
     */

    /**
     * events
     */
  }
  update(time) {
      this.landscape.update();
      //do nothing
    mixer.update(time);
  }
}
