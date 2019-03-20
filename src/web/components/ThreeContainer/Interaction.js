export default class Interaction {
  constructor(scene) {
    this.meshes = [];
    this.addSphere(scene);
  }
  addSphere(scene) {
    var geometry = new THREE.SphereGeometry(5, 32, 32);
    var material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    var sphere = new THREE.Mesh(geometry, material);
    this.meshes.push(sphere);
    scene.add(sphere);
  }
}
