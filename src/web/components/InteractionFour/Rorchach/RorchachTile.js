import simulation_vs from "src/web/assets/shaders/basic/simulation_vs.glsl";
import simulation_fs from "src/web/assets/shaders/basic/simulation_fs.glsl";
import simulation_fs_inversed from "src/web/assets/shaders/basic/simulation_fs_inversed.glsl";
import Simplex from "perlin-simplex";

export default class RorchachTile {
  constructor({
    position,
    rotation,
    width,
    height,
    rows,
    columns,
    fluid,
    inversed,
    renderer
  }) {
    var gl = renderer.getContext();

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
        pointer: { value: new THREE.Vector2(0.5, 0.5) },
        time: { type: "f", value: this.time }
      },
      // side: THREE.BackSide,
      transparent: true,
      vertexShader: simulation_vs,
      fragmentShader: inversed ? simulation_fs : simulation_fs_inversed
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(this.pos.x, this.pos.y, this.pos.z);
    this.id = this.mesh.uuid;
    this.simplex = new Simplex();
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
  updateMotion(payload) {
    // console.log(payload.imageData.data.length);
    // console.log(this.data.length);
    // for(let i; i<payload.imageData.data.length)
  }
  update(time) {
    // //auto drag
    // let simplex = this.simplex.noise(time, 0) * 0.15;
    // let simpley = this.simplex.noise(-time, 0) * 0.15;
    // this.updatePointer(new THREE.Vector2(simplex, simpley));

    //apply fluid
    this.fluid.step({
      success: density => {
        density.forEach((dst, index) => {
          this.data[index * 3] = dst;
          this.data[index * 3 + 1] = dst;
          this.data[index * 3 + 2] = dst;
        });
        this.mesh.material.uniforms.time.value = time;
      }
    });
    this.fluid.renderD(this.mesh, this.colors);
  }
}
