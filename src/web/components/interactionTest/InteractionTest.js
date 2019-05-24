import Interaction from "../ThreeContainer/Interaction";
import RorchachTile from "./RorchachShaderRendering.1.js";
// import Fluid from "./Rorchach/Fluid";
import simulation_vs from "src/web/assets/shaders/basic/simulation_vs.1.glsl";
import simulation_fs from "src/web/assets/shaders/basic/simulation_fs.1.glsl";
import diffCamEngine from "./diffCamEngine/diffCamEngine";

//TRACKING
require("src/tracking.js-master/tracking.js-master");
require("src/tracking.js-master/tracking.js-master/build/data/face");
let mapping = function(value, in_min, in_max, out_min, out_max) {
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
export default class InteractionTest extends Interaction {
  constructor({ renderer, camera }) {
    console.log("test", tracking);
    super();
    this.camera = camera || null;
    /**
     * obj
     */
    this.rorchach = new RorchachTile({ renderer });
    this.objects.push(this.rorchach);
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

  onResize(camera) {}
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

  update(time) {
    this.objects.forEach(object => object.update(time));
  }
}
