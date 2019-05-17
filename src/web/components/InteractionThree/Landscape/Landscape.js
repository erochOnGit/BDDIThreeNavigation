//SHADER
import landscapeVertexShader from "../../../assets/shaders/LandscapeShader/landscapeVertex.glsl";
import landscapeFragmentShader from "../../../assets/shaders/LandscapeShader/landscapeFragment.glsl";

export default class Landscape {
  constructor() {
    this.landscapeGeometry = new THREE.SphereBufferGeometry(5, 20, 20);

    this.uniforms = {
      uTime: { type: "f", value: 0 },
      uAmp: { type: "f", value: 2 }
    };
    this.landscapeMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: this.uniforms,
      vertexShader: landscapeVertexShader,
      fragmentShader: landscapeFragmentShader,
      side: THREE.BackSide
    });

    this.mesh = new THREE.Mesh(this.landscapeGeometry, this.landscapeMaterial);
  }
  update() {
    let time = Date.now() / 1000;
    this.landscapeMaterial.uniforms.uTime.value += time / 100000000000;
  }
}
