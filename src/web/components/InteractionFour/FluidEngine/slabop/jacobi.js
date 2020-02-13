import SlabopBase from "./slabopbase";
var F2D = F2D === undefined ? {} : F2D;

(function(F2D) {
  "use strict";

  F2D.Jacobi = function(fs, grid, iterations, alpha, beta) {
    this.grid = grid;
    this.iterations = iterations === undefined ? 50 : iterations;
    this.alpha = alpha === undefined ? -1 : alpha;
    this.beta = beta === undefined ? 4 : beta;

    this.uniforms = {
      x: {
        type: "t"
      },
      b: {
        type: "t"
      },
      gridSize: {
        type: "v2"
      },
      alpha: {
        type: "f"
      },
      beta: {
        type: "f"
      }
    };

    SlabopBase.call(this, fs, this.uniforms, grid);
  };

  F2D.Jacobi.prototype = Object.create(SlabopBase.prototype);
  F2D.Jacobi.prototype.constructor = F2D.Jacobi;

  F2D.Jacobi.prototype.compute = function(
    renderer,
    x,
    b,
    output,
    boundary,
    scale
  ) {
    for (var i = 0; i < this.iterations; i++) {
      this.step(renderer, x, b, output);
      boundary.compute(renderer, output, scale, output);
    }
  };

  F2D.Jacobi.prototype.step = function(renderer, x, b, output) {
    this.uniforms.x.value = x.read.texture;
    this.uniforms.b.value = b.read.texture;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.alpha.value = this.alpha;
    this.uniforms.beta.value = this.beta;
    renderer.setRenderTarget(output.write);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
    output.swap();
  };
})(F2D);

export default F2D.Jacobi;
