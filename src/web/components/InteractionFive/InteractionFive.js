import Interaction from "../ThreeContainer/Interaction";

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

    /**
     * lights
     */

    /**
     * events
     */
  }
  update() {
    //do nothing
  }
}
