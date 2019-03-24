import simulation_vs from "src/web/assets/shaders/basic/simulation_vs.glsl";
import simulation_fs from "src/web/assets/shaders/basic/simulation_fs.glsl";

export default class RorchachTile {
  constructor({ position, rotation, width, height, rows, columns, fluid }) {
    this.previousMouse = new THREE.Vector2();
    this.pos = position;
    this.rows = rows || 10;
    this.columns = columns || 10;
    this.geometry = new THREE.PlaneGeometry(width, height, rows, columns);
    // this.material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    this.fluid = fluid;
    this.textureWidth = this.fluid.N;
    this.textureHeight = this.fluid.N;
    this.data = this.getEmptyData(this.textureWidth, this.textureHeight, 256);
    this.velo = this.getEmptyData(this.textureWidth, this.textureHeight, 256);
    this.colors = new THREE.DataTexture(
      this.data,
      this.textureWidth,
      this.textureHeight,
      THREE.RGBFormat,
      THREE.FloatType
    );
    this.colors.needsUpdate = true;

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        color: { type: "t", value: this.colors },
        pointer: { value: new THREE.Vector2(0.5, 0.5) }
      },
      // side: THREE.BackSide,
      vertexShader: simulation_vs,
      fragmentShader: simulation_fs
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
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
  IX(x, y) {
    let index =
      Math.trunc(x * this.textureWidth) +
      Math.trunc(y * this.textureWidth) * this.textureWidth;
    return Math.trunc(index);
  }

  updatePointer(pos) {
    // console.log("pos", pos.x + 0.5, pos.y + 0.5);
    let x = pos.x + 0.5;
    let y = pos.y + 0.5;
    this.mesh.material.uniforms.pointer.value = new THREE.Vector2(x, y);

    let dataIndex = this.IX(x, y);

    this.fluid.addDensity(dataIndex, 0.25);

    let amtX = x - this.previousMouse.x;
    let amtY = y - this.previousMouse.y;
    this.fluid.addVelocity(dataIndex, this.velo, amtX, amtY);
    this.previousMouse = new THREE.Vector2(x, y);
  }

  update(time) {
    this.fluid.step({
      success: density => {
        density.forEach((dst, index) => {
          this.data[index * 3] = dst * 0.6;
          this.data[index * 3 + 1] = dst * 0.6;
          this.data[index * 3 + 2] = dst * 1.8;
        });
      }
    });
    this.fluid.renderD(this.mesh, this.colors);
  }
}
