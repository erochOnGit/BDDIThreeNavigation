import Interaction from "../ThreeContainer/Interaction";

export default class InteractionOne extends Interaction {
  constructor() {
    super();
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    this.meshes.push(cube);
  }
}
