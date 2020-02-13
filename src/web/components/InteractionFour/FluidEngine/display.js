var F2D = F2D === undefined ? {} : F2D;

(function(F2D) {
  "use strict";

  F2D.Display = function(quad, vs, fs, bias, scale) {
    this.bias = bias === undefined ? new THREE.Vector3(0, 0, 0) : bias;
    this.scale = scale === undefined ? new THREE.Vector3(1, 1, 1) : scale;

    this.uniforms = {
      read: {
        type: "t",
        value: new THREE.DataTexture(new Uint8Array(256 * 256 * 3), 256, 256)
      },
      scale: {
        type: "v3",
        value: this.scale
      },
      bias: {
        type: "v3",
        value: this.bias
      }
    };

    console.log(quad);
    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vs,
      fragmentShader: fs,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NoBlending
    });
    quad.mesh.material = this.material;
    quad.mesh.name = "quad";
    // this.quad = new THREE.Mesh(
    //   new THREE.PlaneBufferGeometry(2, 2),
    //   this.material
    // );
    // this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    // this.scene = new THREE.Scene();
    // this.scene.add(quad);
  };

  F2D.Display.prototype = {
    constructor: F2D.Display,

    // set bias and scale for including range of negative values
    scaleNegative: function() {
      var v = 0.5;
      this.bias.set(v, v, v);
      this.scale.set(v, v, v);
    },

    render: function(renderer, read) {
      this.uniforms.read.value = read;
      this.uniforms.bias.value = this.bias;
      this.uniforms.scale.value = this.scale;
      //renderer.render(this.scene, this.camera);
    }
  };
})(F2D);

export default F2D.Display;
