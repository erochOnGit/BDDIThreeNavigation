import Interaction from "../ThreeContainer/Interaction";
import Landscape from "./Landscape/Landscape";
export default class InteractionSix extends Interaction {
  constructor() {
    super();
    /**
     * Objects
     */
    //LANDSCAPE
    this.landscape = new Landscape();
    this.objects.push(this.landscape);
    /**
     *lights
     */
    /**
     * events
     */
    /**
     * trackings
     */
    /**
     *  loadingGltf
     */
  }
  onResize() {}
  update() {
    //LANDSCAPE ANIMATION
    this.landscape.update();
  }
}
