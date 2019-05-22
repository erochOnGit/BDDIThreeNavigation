import Interaction from "../ThreeContainer/Interaction";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

//OBJECT
import Landscape from "./Landscape/Landscape";
import fleur4 from "src/web/assets/meshs/flower4.glb";

export default class InteractionFive extends Interaction {
  constructor({ camera }) {
    super();

    /**
     * objects
     */
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var mesh = new THREE.Mesh(geometry, material);
    this.objects.push({ mesh });

    this.landscape = new Landscape();
    this.loading = 0;
    this.mixer;
    this.loader = new GLTFLoader();
    // loader.load(
    //   fleur4,
    //   gltf => {
    //     // called when the resource is loaded
    //     const model = gltf.scene;
    //     var material2 = new THREE.MeshLambertMaterial({ color: 0xa65e00 });
    //     for (let i = 0; i < gltf.scene.children.length; i++) {
    //       gltf.scene.children[i].traverse(function(child) {
    //         if (child instanceof THREE.Mesh) {
    //           // apply custom material
    //           child.material = material2;
    //         }
    //       });
    //     }
    //     // gltf.scene.children.foreach(child => {
    //     //   // var material = new THREE.MeshFaceMaterial(materials);
    //     //   child.traverse(function(child) {
    //     //     if (child instanceof THREE.Mesh) {
    //     //       // apply custom material
    //     //       child.material = material2;
    //     //     }
    //     //   });

    //     this.objects.push({ mesh: model });
    //     // this.mixer = new THREE.AnimationMixer(model);
    //     // gltf.animations.forEach(clip => {
    //     //   this.mixer.clipAction(clip).play();
    //     // });
    //     // });
    //   },
    //   xhr => {
    //     // called while loading is progressing
    //     console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
    //     this.loading = (xhr.loaded / xhr.total) * 100;
    //   },
    //   error => {
    //     // called when loading has errors
    //     console.error("An error happened", error);
    //   }
    // );
    /**
     * lights
     */

    /**
     * events
     */

    /**
     * loadingGltf
     */
    this.loadingGltf.push({
      loader: this.loader,
      glb: fleur4,
      success: success => gltf => {
        // called when the resource is loaded
        const model = gltf.scene;
        var material2 = new THREE.MeshLambertMaterial({ color: 0xa65e00 });
        for (let i = 0; i < gltf.scene.children.length; i++) {
          gltf.scene.children[i].traverse(function(child) {
            if (child instanceof THREE.Mesh) {
              child.material = material2;
            }
          });
        }
        this.objects.push({ mesh: model });
        success();
      },
      pending: xhr => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      error: error => {
        // called when loading has errors
        console.error("An error happened", error);
      }
    });
  }
  update(time) {
    //LANDSCAPE ANIMATION
    this.landscape.update();
    if (this.mixer != undefined) this.mixer.update(time);
  }
}
