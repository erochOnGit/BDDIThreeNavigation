import Interaction from "../ThreeContainer/Interaction";
import RorchachTile from "./Rorchach/RorchachTile";
// import RorchachTile from "./Rorchach/RorchachShaderRendering";
import Fluid from "./Rorchach/Fluid";
import simulation_vs from "src/web/assets/shaders/basic/simulation_vs.1.glsl";
import simulation_fs from "src/web/assets/shaders/basic/simulation_fs.1.glsl";

import diffCamEngine from "./diffCamEngine/diffCamEngine";
import fitCameraToObject from "./fitCameraToObject";

require("src/tracking.js-master/tracking.js-master");
require("src/tracking.js-master/tracking.js-master/build/data/face");

let mapping = function(value, in_min, in_max, out_min, out_max) {
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

//OBJECT
import Landscape from "./Landscape/Landscape";

export default class InteractionFour extends Interaction {
  constructor({
    renderer,
    camera,
    getUserData,
    updateUserData,
    getInteractionIndex
  }) {
    super();
    this.camera = camera || null;
    this.getUserData =
      getUserData || console.warning("can't get userdata in interaction 4");
    this.updateUserData =
      updateUserData ||
      console.warning("can't update userdata in interaction 4");
    this.getInteractionIndex =
      getInteractionIndex ||
      console.warning("can't find the current index in interaction 4");
    /**
     * obj
     */
    this.fluid = new Fluid(112, 8.2, 0, 0.00000005);
    this.rorchach = new RorchachTile({
      inversed: true,
      position: new THREE.Vector3(-0.5, 0, 0.1),
      rotation: new THREE.Vector3(0, 0, 0),
      width: 1,
      height: 1,
      rows: 20,
      columns: 20,
      fluid: this.fluid,
      renderer
    });
    this.objects.push(this.rorchach);
    // this.rorchach2 = new RorchachTile({
    //   inversed: false,
    //   position: new THREE.Vector3(0.5, 0, 0.1),
    //   rotation: new THREE.Vector3(0, 0, 0),
    //   width: 1,
    //   height: 1,
    //   rows: 20,
    //   columns: 20,
    //   fluid: this.fluid,
    //   renderer
    // });
    // this.objects.push(this.rorchach2);
    //LANDSCAPE
    this.landscape = new Landscape();
    this.objects.push(this.landscape);
    // let rorchach = new RorchachTile({
    //   renderer,
    //   dt: 8.2,
    //   diffusion: 0,
    //   viscosity: 0.0000001
    // });
    // this.objects.push(rorchach);

    /**
     * lights
     */
    var spotLight = new THREE.DirectionalLight(0xffffff, 0.1);
    spotLight.position.set(200, 200, 200);
    this.lights.push(spotLight);

    var spotLight2 = new THREE.DirectionalLight(0xff88ff, 0.3);
    spotLight2.position.set(-200, 200, 200);
    this.lights.push(spotLight2);

    /**
     * events
     */
    this.events.push({
      target: window,
      eventName: "mousedown",
      // fctn: this.onMouseClick.bind(this),
      handler: this.mouseClickHandler.bind(this),
      // handler: this.mouseClickHandler,
      option: false
    });
    this.events.push({
      target: window,
      eventName: "mouseup",
      handler: e => {
        return () => (window.onmousemove = null);
      },
      option: false
    });

    /**
     * tracking
     */
    this.trackings.push({
      start: () => {
        let dist = camera.position.z - this.rorchach.mesh.position.z;
        let height = 1; // desired height to fit
        camera.fov = 2 * Math.atan(height / (2 * dist)) * (180 / Math.PI);
        camera.updateProjectionMatrix();
        // fitCameraToObject(camera, this.rorchach.mesh, 0);
      },
      stop: () => {}
    });
    this.video = document.createElement("video");
    document.body.appendChild(this.video);
    this.video.id = "video";
    this.video.width = 320;
    this.video.height = 240;
    this.video.preload = true;
    this.video.autoplay = true;
    this.video.loop = true;
    this.video.muted = true;
    this.video.style.opacity = 0;
    this.video.style.position = "fixed";
    this.video.style.top = 0;

    this.tracker = new window.tracking.ObjectTracker("face");
    this.tracker.setInitialScale(4);
    this.tracker.setStepSize(2);
    this.tracker.setEdgesDensity(0.1);

    this.trackings.push({
      tracker: this.tracker,
      start: () => {
        window.tracking.track(this.video, this.tracker, {
          camera: true
        });
        this.tracker.on("track", event => {
          event.data.forEach(
            function(rect) {
              if (
                document.querySelector(".video-container").style.opacity === "0"
              ) {
                // update the userdata state
                let userDataUpdate = this.getUserData();
                let interactionIndex = this.getInteractionIndex();
                Object.assign(userDataUpdate[interactionIndex], {
                  movemento: userDataUpdate[interactionIndex].movemento
                    ? userDataUpdate[interactionIndex].movemento + 0.025
                    : 0.025
                });
                this.updateUserData(userDataUpdate);
              }
              //update pointer
              this.rorchach.updatePointer({
                x: mapping(rect.x, 0, 230, 0.5, -0.5),
                y: mapping(rect.y, 0, 140, 0.5, -0.5)
              });
            }.bind(this)
          );
        });
      },
      stop: () => {
        this.tracker.removeAllListeners();
      }
    });
  }
  onResize(camera) {
    let cam = this.camera || camera;
    let dist = cam.position.z - this.rorchach.mesh.position.z;
    let height = 1; // desired height to fit
    cam.fov = 2 * Math.atan(height / (2 * dist)) * (180 / Math.PI);
    cam.updateProjectionMatrix();
  }
  mouseClickHandler(canvasThis) {
    let onMouseClick = event => {
      window.onmousemove = this.mouseClickHandler(canvasThis).bind(canvasThis);
      canvasThis.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      canvasThis.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      canvasThis.raycaster.setFromCamera(canvasThis.mouse, canvasThis.camera);
      canvasThis.intersects = canvasThis.raycaster.intersectObjects(
        canvasThis.scene.children
      );
      let rorchachTiles = this.objects.filter(obj => {
        return obj instanceof RorchachTile;
      });
      for (var i = 0; i < canvasThis.intersects.length; i++) {
        for (let j = 0; j < rorchachTiles.length; j++) {
          if (
            rorchachTiles[j] &&
            canvasThis.intersects[i].object.uuid == rorchachTiles[j].id
          ) {
            rorchachTiles[j].updatePointer(canvasThis.intersects[i].point);
          }
        }
      }
      canvasThis.intersects = [];
    };
    return onMouseClick;
  }

  update(time, t) {
    //LANDSCAPE ANIMATION
    this.landscape.update();
    this.objects.forEach(object => object.update(time));
  }
}
