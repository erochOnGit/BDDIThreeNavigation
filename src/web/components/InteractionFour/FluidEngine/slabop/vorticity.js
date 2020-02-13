import SlabopBase from "./slabopbase";
var F2D = F2D === undefined ? {} : F2D;

(function(F2D) {
    "use strict";

    F2D.Vorticity = function(fs, grid) {
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

    F2D.Vorticity.prototype = Object.create(SlabopBase.prototype);
    F2D.Vorticity.prototype.constructor = F2D.Vorticity;

    F2D.Vorticity.prototype.compute = function(renderer, velocity, output) {
        this.uniforms.velocity.value = velocity.read.texture;
        this.uniforms.gridSize.value = this.grid.size;
        this.uniforms.gridScale.value = this.grid.scale;
        renderer.setRenderTarget(output.write);
        renderer.render(this.scene, this.camera);
        renderer.setRenderTarget(null);
        output.swap();
    };

}(F2D));

export default F2D.Vorticity;