import simulation_vs from "src/web/assets/shaders/basic/simulation_vs.1.glsl";
import simulation_fs from "src/web/assets/shaders/basic/simulation_fs.1.glsl";
import density_fs from "src/web/assets/shaders/fluidShaders/density_fs.glsl";
import add_density_fs from "src/web/assets/shaders/fluidShaders/add_density_fs.glsl";
// import Simplex from "perlin-simplex";
import GPUSim from "./GPUSim";
// import FBOHelper from "three.fbo-helper";

export default class RorchachTile {
  constructor({ renderer }) {
    this.gl = renderer.getContext();
    this.previousMouse = new THREE.Vector2();
    this.textureWidth = 256;
    this.textureHeight = 256;
    this.time = 0.0;
    this.geometry = new THREE.PlaneGeometry(1, 1, 10, 10);

    var textureWidth = 256;
    var textureHeight = 256;
    var data = this.getEmptyData(textureWidth, textureHeight, 256);

    var positions = new THREE.DataTexture(
      data,
      textureWidth,
      textureHeight,
      THREE.RGBFormat,
      THREE.FloatType
    );

    positions.needsUpdate = true;
    console.log(positions);
    // this.helper = new FBOHelper(renderer);
    this.densityShaderMaterial = new THREE.RawShaderMaterial({
      uniforms: {
        resolution: { value: new THREE.Vector2(0.5, 0.5) },
        color: { type: "t", value: positions },
        pointer: { value: new THREE.Vector2(0.5, 0.5) },
        time: { type: "f", value: this.time },
        //inputTexture is the backbuffer
        inputTexture: { type: "t", value: null }
      },
      // side: THREE.DoubleSide,
      vertexShader: simulation_vs,
      fragmentShader: density_fs,
      depthTest: false,
      depthWrite: false
    });

    this.densitySim = new GPUSim(
      renderer,
      this.textureWidth,
      this.textureHeight,
      this.densityShaderMaterial
    );
    this.densitySim.render();
    this.densityShaderMaterial.uniforms.color.value = null;

    this.material = new THREE.MeshPhongMaterial({
      map: this.densitySim.fbos[1].texture
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 0, 0.1);
    this.id = this.mesh.uuid;
  }

  getRandomData(width, height, size) {
    var len = width * height * 3;
    var data = new Float32Array(len);
    while (len--) data[len] = (Math.random() - 0.5) * size;
    return data;
  }
  getEmptyData(width, height, size) {
    var len = width * height * 3;
    var data = new Float32Array(len);
    while (len--) data[len] = 0.0;
    return data;
  }
  updatePointer(pos) {
    let x = pos.x + 0.5;
    let y = pos.y + 0.5;
    // console.log(x, y);
    this.densityShaderMaterial.uniforms.pointer.value = new THREE.Vector2(x, y);
    this.densitySim.render();
    this.densityShaderMaterial.uniforms.pointer.value = new THREE.Vector2(
      0.5,
      0.5
    );
    this.previousMouse = new THREE.Vector2(x, y);
  }
  // addDensity(dataIndex, amount) {}
  update(time) {
    this.densityShaderMaterial.uniforms.time.value = time;
    this.densitySim.render();
    // this.addDensitySim.render();
  }
}
