import inkSpreading_vs from "src/web/assets/shaders/inkSpreading/inkSpreading_vs.glsl";
import inkSpreading_fs from "src/web/assets/shaders/inkSpreading/inkSpreading_fs.glsl";
import density_fs from "src/web/assets/shaders/fluidShaders/density_fs.glsl";
import simulation_vs from "src/web/assets/shaders/basic/simulation_vs.1.glsl";
// import inkSpreading_fs_inversed from "src/web/assets/shaders/inkSpreading/inkSpreading_fs_inversed.glsl";
import GPUSim from "./GPUSim";

export default class InkSpreading {
  constructor({ renderer, color, seed }) {
    this.time = 0;
    this.seed = seed || 0;
    this.previousPosition;
    this.textureWidth = 2050;
    this.textureHeight = 2050;
    this.geometry = new THREE.PlaneGeometry(2, 2, 10, 10);
    this.material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true
    });
    var textureWidth = this.textureWidth;
    var textureHeight = this.textureHeight;
    var data = this.getEmptyData(textureWidth, textureHeight, 2050);

    var initTexture = new THREE.DataTexture(
      data,
      textureWidth,
      textureHeight,
      THREE.RGBFormat,
      THREE.FloatType
    );
    initTexture.needsUpdate = true;

    this.alphaMaterial = new THREE.RawShaderMaterial({
      uniforms: {
        //inputTexture is the backbuffer
        inputTexture: { type: "t", value: null },
        initTexture: { type: "t", value: initTexture },
        pointer: { value: new THREE.Vector2(0.5, 0.5) },
        time: { type: "f", value: this.time }
      },
      // side: THREE.BackSide,
      transparent: true,
      vertexShader: simulation_vs,
      fragmentShader: inkSpreading_fs
    });
    this.densitySim = new GPUSim(
      renderer,
      this.textureWidth,
      this.textureHeight,
      this.alphaMaterial
    );
    this.densitySim.render();
    this.alphaMaterial.uniforms.initTexture.value = null;
    this.material.alphaMap = this.densitySim.fbos[1].texture;

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(0, 0, 0);
    this.id = this.mesh.uuid;
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
    this.alphaMaterial.uniforms.pointer.value = new THREE.Vector2(x, y);
    this.densitySim.render();
    if (this.previousPosition) {
      let multiplicator =
        (x - this.previousPosition.x) / (y - this.previousPosition.y);
      let pointNeeded = Math.round(
        Math.abs((x - this.previousPosition.x) * 10)
      );
      console.log("pointNeeded",pointNeeded);
      for (let i = 0; i < pointNeeded; i++) {
        console.log(pointNeeded);
        this.alphaMaterial.uniforms.pointer.value = new THREE.Vector2(
          x + i,
          multiplicator * x + i
        );
        this.densitySim.render();
      }
    }
    this.previousPosition = { x, y };
  }
  update(time) {
    this.densitySim.render();
    this.alphaMaterial.uniforms.pointer.value = new THREE.Vector2(0.5, 0.5);
    this.alphaMaterial.uniforms.time.value = time + this.seed;
  }
}
