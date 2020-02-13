import SlabopBase from "./slabopbase"
var F2D = F2D === undefined ? {} : F2D;

(function(F2D) {
  "use strict";

  F2D.Splat = function(fs, grid, radius) {
    this.grid = grid;
    this.radius = radius === undefined ? 0.01 : radius;

    this.uniforms = {
      read: {
        type: "t"
      },
      gridSize: {
        type: "v2"
      },
      color: {
        type: "v3"
      },
      point: {
        type: "v2"
      },
      radius: {
        type: "f"
      }
    };

    SlabopBase.call(this, fs, this.uniforms, grid);
  };

  F2D.Splat.prototype = Object.create(SlabopBase.prototype);
  F2D.Splat.prototype.constructor = F2D.Splat;

  F2D.Splat.prototype.compute = function(
    renderer,
    input,
    color,
    point,
    output
  ) {
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.read.value = input.read.texture;
    this.uniforms.color.value = color;
    this.uniforms.point.value = point;
    this.uniforms.radius.value = this.radius;
    renderer.setRenderTarget(output.write);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
    output.swap();
  };
})(F2D);

export default F2D.Splat;
