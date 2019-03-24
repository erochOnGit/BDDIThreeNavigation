import Interaction from "../ThreeContainer/Interaction";
import RorchachTile from "./Rorchach/RorchachTile";
import Fluid from "./Rorchach/Fluid";

export default class InteractionFour extends Interaction {
  constructor() {
    super();
    /**
     * obj
     */
    this.fluid = new Fluid(128, 8.2, 0, 0.0000001);
    let rorchach = new RorchachTile({
      position: new THREE.Vector3(0, 0, 0.1),
      rotation: new THREE.Vector3(0, 0, 0),
      width: 1,
      height: 1,
      rows: 20,
      columns: 20,
      fluid: this.fluid
    });
    this.objects.push(rorchach);

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

  update(time) {
    this.objects.forEach(object => object.update(time));
  }
}
