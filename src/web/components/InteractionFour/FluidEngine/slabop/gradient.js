import SlabopBase from "./slabopbase"
var F2D = F2D === undefined ? {} : F2D;

(function(F2D) {
  "use strict";

  F2D.Gradient = function(fs, grid) {
    this.grid = grid;

    this.uniforms = {
      p: {
        type: "t"
      },
      w: {
        type: "t"
      },
      gridSize: {
        type: "v2"
      },
      gridScale: {
        type: "f"
      }
    };

    SlabopBase.call(this, fs, this.uniforms, grid);
  };

  F2D.Gradient.prototype = Object.create(SlabopBase.prototype);
  F2D.Gradient.prototype.constructor = F2D.Gradient;

  F2D.Gradient.prototype.compute = function(renderer, p, w, output) {
    this.uniforms.p.value = p.read.texture;
    this.uniforms.w.value = w.read.texture;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.gridScale.value = this.grid.scale;
    renderer.setRenderTarget(output.write);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
    output.swap();
  };
})(F2D);

export default F2D.Gradient;
