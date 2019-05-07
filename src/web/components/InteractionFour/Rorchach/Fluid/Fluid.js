import { diffuse, advect, project } from "./FluidMethod";

export default class Fluid {
  constructor(N, dt, diffusion, viscosity) {
    this.N = N;
    this.dt = dt;
    this.diff = diffusion;
    this.visc = viscosity;
    this.s = [];
    this.density = [];
    this.vx = [];
    this.vy = [];
    this.vx0 = [];
    this.vy0 = [];

    for (let i = 0; i < this.N * this.N; i++) {
      this.s[i] = 0;
      this.density[i] = 0;
      this.vx[i] = 0;
      this.vy[i] = 0;
      this.vx0[i] = 0;
      this.vy0[i] = 0;
    }
  }

  step({ success }) {
    let visc = this.visc;
    let diff = this.diff;
    let dt = this.dt;
    let vx = this.vx;
    let vy = this.vy;
    let vx0 = this.vx0;
    let vy0 = this.vy0;
    let s = this.s;
    let density = this.density;

    diffuse(1, vx0, vx, visc, dt);
    diffuse(2, vx0, vx, visc, dt);
    diffuse(1, vy0, vy, visc, dt);
    diffuse(2, vy0, vy, visc, dt);
    project(vx0, vy0, vx, vy);
    advect(1, vx, vx0, vx0, vy0, dt);
    advect(2, vy, vy0, vx0, vy0, dt);
    project(vx, vy, vx0, vy0);
    diffuse(0, s, density, diff, dt);
    advect(0, density, s, vx, vy, dt);

    success(this.density);
  }

  /**
   * @param {int} x
   * @param {int} y
   * @param {float} amount
   */
  addDensity(dataIndex, amount) {
    if (isNaN(amount)) {
      console.log("\n\n\n\naddDensity\n\n\n\n");
    }
    this.density[dataIndex] += amount;
  }

  /**
   * @param {int} x
   * @param {int} y
   * @param {float} amountX
   * @param {float} amountY
   */
  addVelocity(dataIndex, velo, amountX, amountY) {
    this.vx[dataIndex] += amountX;
    this.vy[dataIndex] += amountY;

    velo[dataIndex * 3] = this.vx[dataIndex];
    velo[dataIndex * 3 + 1] = this.vy[dataIndex];
    velo[dataIndex * 3 + 2] = this.vx[dataIndex] + this.vy[dataIndex];
  }

  renderD(mesh, density) {
    density.needsUpdate = true;
    mesh.material.uniforms.color.value = density;
  }
}