import simulation_vs from "src/web/assets/shaders/basic/simulation_vs.1.glsl";
import simulation_fs from "src/web/assets/shaders/basic/simulation_fs.1.glsl";
import density_fs from "src/web/assets/shaders/fluidShaders/density_fs.glsl";
import velocity_fs from "src/web/assets/shaders/fluidShaders/velocity_fs.glsl";
import diffuse_fs from "src/web/assets/shaders/fluidShaders/diffuse_fs.glsl";
import lin_solve_fs from "src/web/assets/shaders/fluidShaders/lin_solve_fs.glsl";
import set_bnd_fs from "src/web/assets/shaders/fluidShaders/set_bnd_fs.glsl";
import stocking_fs from "src/web/assets/shaders/fluidShaders/stocking_fs.glsl";
// import Simplex from "perlin-simplex";
import GPUSim from "./GPUSim";
// import FBOHelper from "three.fbo-helper";

export default class RorchachTile {
  constructor({ renderer, dt, diffusion, viscosity }) {
    this.gl = renderer.getContext();
    this.dt = dt;
    this.diff = diffusion;
    this.visc = viscosity;
    this.previousMouse = new THREE.Vector2();
    this.textureWidth = 56;
    this.textureHeight = 56;
    this.time = 0.0;
    this.geometry = new THREE.PlaneGeometry(1, 1, 10, 10);
    this.vx;
    this.vy;
    this.vx0;
    this.vy0;

    var textureWidth = this.textureWidth;
    var textureHeight = this.textureHeight;
    var data = this.getEmptyData(textureWidth, textureHeight, 256);

    var initTexture = new THREE.DataTexture(
      data,
      textureWidth,
      textureHeight,
      THREE.RGBFormat,
      THREE.FloatType
    );
    initTexture.needsUpdate = true;
    this.vx = new THREE.RawShaderMaterial({
      uniforms: {
        N: { type: "f", value: this.textureWidth },
        initTexture: { type: "t", value: initTexture },
        //inputTexture is the backbuffer
        inputTexture: { type: "t", value: null }
      },
      // side: THREE.DoubleSide,
      vertexShader: simulation_vs,
      fragmentShader: stocking_fs,
      depthTest: false,
      depthWrite: false
    });
    this.vxSim = new GPUSim(
      renderer,
      this.textureWidth,
      this.textureHeight,
      this.vx
    );
    this.vxSim.render();
    this.vx.uniforms.initTexture.value = null;

    this.vx0 = new THREE.RawShaderMaterial({
      uniforms: {
        N: { type: "f", value: this.textureWidth },
        initTexture: { type: "t", value: initTexture },
        //inputTexture is the backbuffer
        inputTexture: { type: "t", value: null }
      },
      // side: THREE.DoubleSide,
      vertexShader: simulation_vs,
      fragmentShader: stocking_fs,
      depthTest: false,
      depthWrite: false
    });
    this.vx0Sim = new GPUSim(
      renderer,
      this.textureWidth,
      this.textureHeight,
      this.vx0
    );
    this.vx0Sim.render();
    this.vx0.uniforms.initTexture.value = null;

    /**
     * vy
     */
    this.vy = new THREE.RawShaderMaterial({
      uniforms: {
        N: { type: "f", value: this.textureWidth },
        initTexture: { type: "t", value: initTexture },
        //inputTexture is the backbuffer
        inputTexture: { type: "t", value: null }
      },
      // side: THREE.DoubleSide,
      vertexShader: simulation_vs,
      fragmentShader: stocking_fs,
      depthTest: false,
      depthWrite: false
    });
    this.vySim = new GPUSim(
      renderer,
      this.textureWidth,
      this.textureHeight,
      this.vy
    );
    this.vySim.render();
    this.vy.uniforms.initTexture.value = null;

    this.vy0 = new THREE.RawShaderMaterial({
      uniforms: {
        N: { type: "f", value: this.textureWidth },
        initTexture: { type: "t", value: initTexture },
        //inputTexture is the backbuffer
        inputTexture: { type: "t", value: null }
      },
      // side: THREE.DoubleSide,
      vertexShader: simulation_vs,
      fragmentShader: stocking_fs,
      depthTest: false,
      depthWrite: false
    });
    this.vy0Sim = new GPUSim(
      renderer,
      this.textureWidth,
      this.textureHeight,
      this.vy0
    );
    this.vy0Sim.render();
    this.vy0.uniforms.initTexture.value = null;

    // console.log(initTexture);
    // this.helper = new FBOHelper(renderer);
    this.densityShaderMaterial = new THREE.RawShaderMaterial({
      uniforms: {
        N: { type: "f", value: this.textureWidth },
        initTexture: { type: "t", value: initTexture },
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
    this.densityShaderMaterial.uniforms.initTexture.value = null;

    this.velocityShaderMaterial = new THREE.RawShaderMaterial({
      uniforms: {
        N: { type: "f", value: this.textureWidth },
        initTexture: { type: "t", value: initTexture },
        pointer: { value: new THREE.Vector2(0.5, 0.5) },
        amount: { value: new THREE.Vector2(0.5, 0.5) },
        time: { type: "f", value: this.time },
        //inputTexture is the backbuffer
        inputTexture: { type: "t", value: null }
      },
      // side: THREE.DoubleSide,
      vertexShader: simulation_vs,
      fragmentShader: velocity_fs,
      depthTest: false,
      depthWrite: false
    });
    this.velocitySim = new GPUSim(
      renderer,
      this.textureWidth,
      this.textureHeight,
      this.velocityShaderMaterial
    );
    this.velocitySim.render();
    this.velocityShaderMaterial.uniforms.initTexture.value = null;

    /**
     * set_bnd straight
     */
    this.setBndShaderMaterial = new THREE.RawShaderMaterial({
      uniforms: {
        N: { type: "f", value: this.textureWidth },
        initTexture: { type: "t", value: initTexture },

        diffuse: { type: "t", value: initTexture },
        inputTexture: { type: "t", value: null },
        x: { type: "t", value: null },
        b: { type: "f", value: null }
      },
      // side: THREE.DoubleSide,
      vertexShader: simulation_vs,
      fragmentShader: set_bnd_fs,
      depthTest: false,
      depthWrite: false
    });
    this.setBndSim = new GPUSim(
      renderer,
      this.textureWidth,
      this.textureHeight,
      this.setBndShaderMaterial
    );
    this.setBndSim.render();
    this.setBndShaderMaterial.uniforms.initTexture.value = null;

    /**
     * lin_solve methode
     */
    this.linSolveShaderMaterial = new THREE.RawShaderMaterial({
      uniforms: {
        N: { type: "f", value: this.textureWidth },
        initTexture: { type: "t", value: initTexture },

        diffuse: { type: "t", value: initTexture },
        inputTexture: { type: "t", value: null },
        x: { type: "t", value: null },
        x0: { type: "t", value: null }
      },
      // side: THREE.DoubleSide,
      vertexShader: simulation_vs,
      fragmentShader: lin_solve_fs,
      depthTest: false,
      depthWrite: false
    });
    this.linSolveSim = new GPUSim(
      renderer,
      this.textureWidth,
      this.textureHeight,
      this.linSolveShaderMaterial
    );
    this.linSolveSim.render();
    this.linSolveShaderMaterial.uniforms.initTexture.value = null;

    /**
     * diffuse methode
     */
    this.diffuseShaderMaterial = new THREE.RawShaderMaterial({
      uniforms: {
        N: { type: "f", value: this.textureWidth },
        initTexture: { type: "t", value: initTexture },
        b: { type: "f", value: 0 },
        x: { type: "t", value: initTexture },
        x0: { type: "t", value: initTexture },
        diff: { type: "f", value: this.visc },
        dt: { type: "f", value: this.dt },
        //inputTexture is the backbuffer
        inputTexture: { type: "t", value: null }
      },
      // side: THREE.DoubleSide,
      vertexShader: simulation_vs,
      fragmentShader: diffuse_fs,
      depthTest: false,
      depthWrite: false
    });
    this.diffuseSim = new GPUSim(
      renderer,
      this.textureWidth,
      this.textureHeight,
      this.diffuseShaderMaterial
    );
    this.diffuseSim.render();
    this.diffuseShaderMaterial.uniforms.initTexture.value = null;

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

    let amtX = x - this.previousMouse.x;
    let amtY = y - this.previousMouse.y;
    this.velocityShaderMaterial.uniforms.pointer.value = new THREE.Vector2(
      x,
      y
    );
    this.velocityShaderMaterial.uniforms.amount.value = new THREE.Vector2(
      amtX,
      amtY
    );
    this.velocitySim.render();
    this.densityShaderMaterial.uniforms.pointer.value = new THREE.Vector2(
      0.5,
      0.5
    );

    this.previousMouse = new THREE.Vector2(x, y);
    // console.log(this.densitySim.fbos[1]);
  }
  // addDensity(dataIndex, amount) {}
  update(time) {
    this.step();
    this.densityShaderMaterial.uniforms.time.value = time;
    this.densitySim.render();
    // this.addDensitySim.render();
  }
  step() {
    let visc = this.visc;
    let diff = this.diff;
    let dt = this.dt;
    // this.vx = new ();
    this.diffuse(1, this.vxSim, this.vx0Sim, tex => {
      this.vx.uniforms.initTexture = tex;
      this.vxSim.render();
    });
    this.diffuse(2, this.vxSim, this.vx0Sim, tex => {
      this.vx.uniforms.initTexture = tex;
      this.vxSim.render();
    });
    this.diffuse(1, this.vySim, this.vy0Sim, tex => {
      this.vy.uniforms.initTexture = tex;
      this.vySim.render();
    });
    this.diffuse(2, this.vySim, this.vy0Sim, tex => {
      this.vy.uniforms.initTexture = tex;
      this.vySim.render();
    });
  }
  diffuse(b, x, x0, success) {
    // this.diffuseShaderMaterial.uniforms.time.value = time;
    this.diffuseSim.render();

    this.linSolveShaderMaterial.uniforms.x.value = x.fbos[1].texture;
    this.linSolveShaderMaterial.uniforms.x0.value = x0.fbos[1].texture;
    this.linSolveShaderMaterial.uniforms.diffuse.value = this.diffuseSim.fbos[1].texture;
    this.linSolveSim.render();

    this.setBndShaderMaterial.uniforms.x.value = this.linSolveSim.fbos[1].texture;
    this.setBndShaderMaterial.uniforms.b.value = b;
    this.setBndSim.render();
    for (let k = 0; k < 3; k++) {
      this.linSolveShaderMaterial.uniforms.x.value = this.setBndSim.fbos[1].texture;
      this.linSolveShaderMaterial.uniforms.x0.value = x0.fbos[1].texture;
      this.linSolveShaderMaterial.uniforms.diffuse.value = this.diffuseSim.fbos[1].texture;
      this.linSolveSim.render();

      this.setBndShaderMaterial.uniforms.x.value = this.linSolveSim.fbos[1].texture;
      this.setBndShaderMaterial.uniforms.b.value = b;
      this.setBndSim.render();
    }
    success(this.setBndSim.fbos[1].texture);
    // this.vx.uniforms.initTexture = this.setBndSim.fbos[1].texture;
    // this.vxSim.render();
    //set_bnd-classic.resolve
  }
}