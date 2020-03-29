import inkSpreading_vs from "src/web/assets/shaders/inkSpreading/inkSpreading_vs.glsl";
import inkSpreading_field_fs from "src/web/assets/shaders/inkSpreading/inkSpreading_field_fs.glsl";
import inkSpreading_alpha_fs from "src/web/assets/shaders/inkSpreading/inkSpreading_alpha_fs.glsl";
import inkSpreading_color_fs from "src/web/assets/shaders/inkSpreading/inkSpreading_color_fs.glsl";
import inkSpreading_fs from "src/web/assets/shaders/inkSpreading/inkSpreading_fs.glsl";
import density_fs from "src/web/assets/shaders/fluidShaders/density_fs.glsl";
import simulation_vs from "src/web/assets/shaders/basic/simulation_vs.1.glsl";
// import inkSpreading_fs_inversed from "src/web/assets/shaders/inkSpreading/inkSpreading_fs_inversed.glsl";
import GPUSim from "./GPUSim";

export default class InkSpreading {
  constructor({ renderer, color, seed }) {
    this.time = 0;
    this.seed = seed || 0;
    this.previousPosition;
    this.textureWidth = 2050;
    this.textureHeight = 2050;
    this.geometry = new THREE.PlaneGeometry(2, 2, 10, 10);
    this.geometryXDoubled = new THREE.PlaneGeometry(4, 2, 10, 10);
    // this.material = new THREE.MeshBasicMaterial({
    //   // color: color,
    //   transparent: true
    // });
    var textureWidth = this.textureWidth;
    var textureHeight = this.textureHeight;
    var data = this.getEmptyData(textureWidth, textureHeight, 2050);

    var initTexture = new THREE.DataTexture(
      data,
      textureWidth,
      textureHeight,
      THREE.RGBFormat,
      THREE.FloatType
    );
    initTexture.needsUpdate = true;

    this.colorMaterial = new THREE.RawShaderMaterial({
      uniforms: {
        //inputTexture is the backbuffer
        inputTexture: { type: "t", value: null },
        initTexture: { type: "t", value: initTexture },
        field: { type: "t", value: null },
        pointer: { value: new THREE.Vector2(0.5, 0.5) },
        time: { type: "f", value: this.time }
      },
      // side: THREE.BackSide,
      transparent: true,
      vertexShader: simulation_vs,
      fragmentShader: inkSpreading_color_fs
    });
    this.colorFBO = new GPUSim(
      renderer,
      this.textureWidth,
      this.textureHeight,
      this.colorMaterial
    );
    this.colorFBO.render();
    this.colorMaterial.uniforms.initTexture.value = null;

    this.alphaMaterial = new THREE.RawShaderMaterial({
      uniforms: {
        //inputTexture is the backbuffer
        inputTexture: { type: "t", value: null },
        initTexture: { type: "t", value: initTexture },
        pointer: { value: new THREE.Vector2(0.5, 0.5) },
        time: { type: "f", value: this.time },
        color: { type: "t", value: null }
      },
      // side: THREE.BackSide,
      transparent: true,
      vertexShader: simulation_vs,
      fragmentShader: inkSpreading_alpha_fs
    });
    this.alphaFBO = new GPUSim(
      renderer,
      this.textureWidth,
      this.textureHeight,
      this.alphaMaterial
    );
    this.alphaFBO.render();

    this.fieldMaterial = new THREE.RawShaderMaterial({
      uniforms: {
        //inputTexture is the backbuffer
        inputTexture: { type: "t", value: null },
        initTexture: { type: "t", value: initTexture },
        pointer: { value: new THREE.Vector2(0.5, 0.5) },
        previousPointer: { value: new THREE.Vector2(0.5, 0.5) },
        time: { type: "f", value: this.time },
      },
      // side: THREE.BackSide,
      transparent: true,
      vertexShader: simulation_vs,
      fragmentShader: inkSpreading_field_fs
    });
    this.fieldFBO = new GPUSim(
      renderer,
      this.textureWidth,
      this.textureHeight,
      this.fieldMaterial
    );
    this.fieldFBO.render();

    this.material = new THREE.RawShaderMaterial({
      uniforms: {
        //inputTexture is the backbuffer
        inputTexture: { type: "t", value: null },
        initTexture: { type: "t", value: initTexture },
        pointer: { value: new THREE.Vector2(0.5, 0.5) },
        time: { type: "f", value: this.time },
        color: { type: "t", value: null },
        alpha: { type: "t", value: null }
      },
      // side: THREE.BackSide,
      transparent: true,
      vertexShader: simulation_vs,
      fragmentShader: inkSpreading_fs
    });

    this.meshField = new THREE.Mesh(this.geometry, this.fieldMaterial);
    this.meshField.position.set(-2.0, -1.2, 0);
    this.meshAlpha = new THREE.Mesh(this.geometry, this.alphaMaterial);
    this.meshAlpha.position.set(2.5, 2, 0);
    this.meshColor = new THREE.Mesh(this.geometry, this.colorMaterial);
    this.meshColor.position.set(2.5, -1.0, 0);
    this.mesh = new THREE.Mesh(this.geometryXDoubled, this.material);
    this.mesh.position.set(0, 1., 0);
    this.id = this.mesh.uuid;
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
    this.colorMaterial.uniforms.pointer.value = new THREE.Vector2(x, y);
    this.fieldMaterial.uniforms.pointer.value = new THREE.Vector2(x, y);
    this.fieldFBO.render();
    this.colorFBO.render();
    if (this.previousPosition) {
      let multiplicator =
        (x - this.previousPosition.x) / (y - this.previousPosition.y);
      let pointNeeded = Math.round(
        Math.abs((x - this.previousPosition.x) * 10)
      );
      for (let i = 0; i < pointNeeded; i++) {
        this.colorMaterial.uniforms.pointer.value = new THREE.Vector2(
          x + i,
          multiplicator * x + i
        );
        this.fieldMaterial.uniforms.pointer.value = new THREE.Vector2(
          x + i,
          multiplicator * x + i
        );
        this.fieldFBO.render();
        this.colorFBO.render();
      }
      this.fieldMaterial.uniforms.previousPointer.value = this.previousPosition;
    }
    this.previousPosition = { x, y };
  }
  update(time) {
    this.fieldFBO.render();
    let field = this.fieldFBO.fbos[this.fieldFBO.current].texture;
    this.colorMaterial.uniforms.field.value = field;
    this.colorFBO.render();
    let color = this.colorFBO.fbos[this.colorFBO.current].texture;
    this.material.uniforms.color.value = color;
    this.alphaFBO.render();
    let alpha = this.alphaFBO.fbos[this.alphaFBO.current].texture;
    this.alphaMaterial.uniforms.color.value = color;
    this.material.uniforms.alpha.value = alpha;
    this.colorMaterial.uniforms.pointer.value = new THREE.Vector2(0.5, 0.5);
    this.colorMaterial.uniforms.time.value = time + this.seed;
  }
}
