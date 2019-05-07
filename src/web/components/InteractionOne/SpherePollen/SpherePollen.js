export default class SpherePollen {
  constructor({ rayon, x, y }) {
    this.geometry = new THREE.SphereBufferGeometry(0.03, 20, 20);
    this.geometry.rotateX(Math.PI / 2);
    this.material = new THREE.MeshPhongMaterial();
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.mesh.position.x =
      THREE.Math.randFloat(rayon, rayon * 1.1) * Math.cos(y) * Math.sin(x);
    this.mesh.position.y =
      THREE.Math.randFloat(rayon, rayon * 1.1) * Math.sin(y) * Math.sin(x);
    this.mesh.position.z =
      THREE.Math.randFloat(rayon, rayon * 1.1) * Math.cos(x);

    let scale = THREE.Math.randFloat(0.3, 1.5);
    this.mesh.scale.set(scale, scale, scale);
  }
}
