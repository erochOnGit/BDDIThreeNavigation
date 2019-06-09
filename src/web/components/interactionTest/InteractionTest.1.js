import Interaction from "../ThreeContainer/Interaction";
import RorchachTile from "./RorchachShaderRendering.1.js";
// import Fluid from "./Rorchach/Fluid";
import simulation_vs from "src/web/assets/shaders/basic/simulation_vs.1.glsl";
import simulation_fs from "src/web/assets/shaders/basic/simulation_fs.1.glsl";
import diffCamEngine from "./diffCamEngine/diffCamEngine";

//TRACKING
import tracking from "src/tracking.js-master/tracking.js-master/build/tracking";
require("src/tracking.js-master/tracking.js-master/build/data/face");

export default class InteractionTest extends Interaction {
  constructor({ renderer, camera }) {
    // console.log("test", tracking);
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
    this.canvas = document.createElement("canvas");
    this.canvas.width = 320;
    this.canvas.height = 240;
    document.body.appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
    this.video.id = "video";

    this.tracker = new tracking.ObjectTracker("face");
    this.tracker.setInitialScale(4);
    this.tracker.setStepSize(2);
    this.tracker.setEdgesDensity(0.1);

    // this.context = this.canvas.getContext("2d");

    this.trackings.push({
      tracker: this.tracker,
      start: () => {
        this.tracker.track(this.video, this.tracker, {
          camera: true
        });
        this.tracker.on("track", event => {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
          event.data.forEach(function(rect) {
            this.context.strokeStyle = "#a64ceb";
            this.context.strokeRect(rect.x, rect.y, rect.width, rect.height);
            this.context.font = "11px Helvetica";
            this.context.fillStyle = "#fff";
            this.context.fillText(
              "x: " + rect.x + "px",
              rect.x + rect.width + 5,
              rect.y + 11
            );
            this.context.fillText(
              "y: " + rect.y + "px",
              rect.x + rect.width + 5,
              rect.y + 22
            );
          });
        });
      },
      stop: () => {}
    });

    // this.camCaptor = diffCamEngine();
    // this.trackings.push({
    //   tracker: this.camCaptor,
    //   start: () => {
    //     this.score = document.createElement("p");
    //     this.score.id = "score";

    //     document.body.appendChild(this.score);

    //     function initSuccess() {
    //       this.camCaptor.start();
    //     }

    //     function initError(e) {
    //       console.warn("Something went wrong.");
    //       console.log(e);
    //     }

    //     function capture(payload) {
    //       this.score.textContent = payload.score;
    //       // console.log(payload);
    //       //   this.rorchach.updateMotion(payload);
    //       this.scoreInteractionOne = payload.score;
    //     }

    //     this.camCaptor.init({
    //       initSuccessCallback: initSuccess.bind(this),
    //       initErrorCallback: initError,
    //       captureCallback: capture.bind(this)
    //       // 443
    //       // captureWidth: this.fluid.N,
    //       // captureHeight: this.fluid.N
    //     });
    //   },
    //   stop: () => {
    //     this.camCaptor.stop();
    //     if (this.score) {
    //       this.score.parentNode.removeChild(this.score);
    //     }
    //   }
    // });
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
