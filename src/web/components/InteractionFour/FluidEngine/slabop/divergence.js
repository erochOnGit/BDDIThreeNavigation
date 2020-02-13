import SlabopBase from "./slabopbase"
var F2D = F2D === undefined ? {} : F2D;

(function(F2D) {
    "use strict";

    F2D.Divergence = function(fs, grid) {
        this.grid = grid;

        this.uniforms = {
            velocity: {
                type: "t"
            },
            gridSize: {
                type: "v2"
            },
            gridScale: {
                type: "f"
            },
        };

        SlabopBase.call(this, fs, this.uniforms, grid);
    };

    F2D.Divergence.prototype = Object.create(SlabopBase.prototype);
    F2D.Divergence.prototype.constructor = F2D.Divergence;

    F2D.Divergence.prototype.compute = function(renderer, velocity, divergence) {
        this.uniforms.velocity.value = velocity.read.texture;
        this.uniforms.gridSize.value = this.grid.size;
        this.uniforms.gridScale.value = this.grid.scale;
        renderer.setRenderTarget(divergence.write);
        renderer.render(this.scene, this.camera);
        renderer.setRenderTarget(null);
        divergence.swap();
    };

}(F2D));

export default F2D.Divergence;
