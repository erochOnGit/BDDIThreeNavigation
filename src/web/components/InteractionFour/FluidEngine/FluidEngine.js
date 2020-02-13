import Stats from "stats-js";
import Mouse from "./mouse";
import Solver from "./solver";
import Display from "./display";
import FileLoader from "./fileloader";
import Slab from "./slab";
//SHADERS
import advect from "src/web/assets/shaders/FluidEngine/advect.fs";
import basic from "src/web/assets/shaders/FluidEngine/basic.vs";
import boundary from "src/web/assets/shaders/FluidEngine/boundary.fs";
import gradient from "src/web/assets/shaders/FluidEngine/gradient.fs";
import jacobiscalar from "src/web/assets/shaders/FluidEngine/jacobiscalar.fs";
import jacobivector from "src/web/assets/shaders/FluidEngine/jacobivector.fs";
import displayscalar from "src/web/assets/shaders/FluidEngine/displayscalar.fs";
import displayvector from "src/web/assets/shaders/FluidEngine/displayvector.fs";
import divergence from "src/web/assets/shaders/FluidEngine/divergence.fs";
import splat from "src/web/assets/shaders/FluidEngine/splat.fs";
import vorticity from "src/web/assets/shaders/FluidEngine/vorticity.fs";
import vorticityforce from "src/web/assets/shaders/FluidEngine/vorticityforce.fs";

import dat from "dat.gui";

export default class FluidEngine {
  constructor({ renderer, quad }) {
    var stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = "absolute";
    stats.domElement.style.left = "0px";
    stats.domElement.style.top = "0px";
    document.body.appendChild(stats.domElement);
    this.renderer = renderer;
    this.quad = quad;
    this.grid = {
      size: new THREE.Vector2(512, 256),
      scale: 1,
      applyBoundaries: true
    };
    this.time = {
      step: 1
    };
    this.displayScalar;
    this.displayVector;
    this.displaySettings = {
      slab: "density"
    };
    this.solver;
    this.gui;
    this.mouse = new Mouse(this.grid);
    this.windowSize = new THREE.Vector2(window.innerWidth, window.innerHeight);

    window.onresize = this.resize;

    // this.loader = new FileLoader("", );
    // this.loader.run(
    //   function(files) {
    //     // remove file extension before passing shaders to init
    //     var shaders = {};
    //     console.log(files);
    //     for (var name in files) {
    //       console.log("0", name.split(".")[0]);
    //       console.log("1", name.split(".")[1]);
    //       shaders[name.split(".")[0]] = files[name];
    //     }
    //     // console.log(shaders)
    this.init({
      advect: advect,
      basic: basic,
      gradient: gradient,
      jacobiscalar: jacobiscalar,
      jacobivector: jacobivector,
      displayscalar: displayscalar,
      displayvector: displayvector,
      divergence: divergence,
      splat: splat,
      vorticity: vorticity,
      vorticityforce: vorticityforce,
      boundary: boundary
    });
  }

  init(shaders) {
    this.solver = Solver.make(this.grid, this.time, this.windowSize, shaders);
    this.displayScalar = new Display(
      this.quad,
      shaders.basic,
      shaders.displayscalar
    );
    this.displayVector = new Display(
      this.quad,
      shaders.basic,
      shaders.displayvector
    );

    this.gui = new dat.GUI();
    this.gui.add(this.displaySettings, "slab", [
      "density",
      "velocity",
      "divergence",
      "pressure"
    ]);
    this.gui
      .add(this.time, "step")
      .min(0)
      .step(0.01);

    var advectFolder = this.gui.addFolder("Advect");
    advectFolder.add(this.solver.advect, "dissipation", {
      none: 1,
      slow: 0.998,
      fast: 0.992,
      "very fast": 0.9
    });

    var viscosityFolder = this.gui.addFolder("Viscosity");
    viscosityFolder.add(this.solver, "applyViscosity");
    viscosityFolder
      .add(this.solver, "viscosity")
      .min(0)
      .step(0.01);

    var vorticityFolder = this.gui.addFolder("Vorticity");
    vorticityFolder.add(this.solver, "applyVorticity");
    vorticityFolder
      .add(this.solver.vorticityConfinement, "curl")
      .min(0)
      .step(0.01);

    var poissonPressureEqFolder = this.gui.addFolder(
      "Poisson Pressure Equation"
    );
    poissonPressureEqFolder.add(
      this.solver.poissonPressureEq,
      "iterations",
      0,
      500,
      1
    );

    // we need a splat color "adapter" since we want values between 0 and
    // 1 but also since dat.this.GUI requires a JavaScript array over a Three.js
    // vector
    var splatSettings = {
      color: [
        this.solver.ink.x * 255,
        this.solver.ink.y * 255,
        this.solver.ink.z * 255
      ]
    };
    var splatFolder = this.gui.addFolder("Splat");
    splatFolder.add(this.solver.splat, "radius").min(0);
    splatFolder.addColor(splatSettings, "color").onChange(function(value) {
      this.solver.ink.set(value[0] / 255, value[1] / 255, value[2] / 255);
    });

    var gridFolder = this.gui.addFolder("Grid");
    gridFolder.add(this.grid, "applyBoundaries");
    gridFolder.add(this.grid, "scale");
  }

  render() {
    var display, read;
    switch (this.displaySettings.slab) {
      case "velocity":
        display = this.displayVector;
        display.scaleNegative();
        read = this.solver.velocity.read;
        break;
      case "density":
        display = this.displayScalar;
        display.scale.copy(this.solver.ink);
        display.bias.set(0, 0, 0);
        read = this.solver.density.read;
        break;
      case "divergence":
        display = this.displayScalar;
        display.scaleNegative();
        read = this.solver.velocityDivergence.read;
        break;
      case "pressure":
        display = this.displayScalar;
        display.scaleNegative();
        read = this.solver.pressure.read;
        break;
    }
    display.render(this.renderer, read);
  }
  resize() {
    this.windowSize.set(window.innerWidth, window.innerHeight);
    this.renderer.setSize(this.windowSize.x, this.windowSize.y);
  }
  update(renderer) {
    // console.log("nie", renderer);
    this.solver.step(this.renderer || renderer, this.mouse);
    this.render();
  }
}
