import Simplex from "perlin-simplex";
import dat from "dat.gui";

export default class Ring {
  constructor({
    innerRadius,
    radius,
    segment,
    wireframe,
    ondulaire,
    tubulaire,
    opacity,
    simplex
  }) {
    this.rows = segment ? Math.trunc(Math.sqrt(segment)) : 5;
    this.columns = segment ? segment / Math.trunc(Math.sqrt(segment)) : 5;
    this.radius = radius || 1;
    this.innerRadius = innerRadius || 0.5;
    this.ondulaire = ondulaire || 0;
    this.tubulaire = tubulaire || 0;
    this.opacity = opacity || 0.8;
    this.index = 0;
    this.speed = 0;
    this.simplex = simplex;

    this.geometry = new THREE.BufferGeometry();
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.
    let vert = [];
    let innerVert = [];

    vert = this.setVertices(this.radius);
    innerVert = this.setVertices(this.innerRadius);
    this.verticesCircleCount = vert.length / 3;
    this.vertices = new Float32Array(vert.concat(innerVert));

    // itemSize = 3 because there are 3 values (components) per vertex
    this.geometry.addAttribute(
      "position",
      new THREE.BufferAttribute(this.vertices, 3)
    );
    let indice = this.setIndices(this.vertices, vert);
    this.indices = new Uint32Array(indice);

    this.geometry.setIndex(new THREE.BufferAttribute(this.indices, 1));

    this.geometry.computeVertexNormals();
    var drawCount = 50; // draw the first 2 points, only
    this.geometry.setDrawRange(0, this.indices.length);

    this.material = new THREE.MeshStandardMaterial({
      transparent: true,
      opacity: this.opacity,
      wireframe: wireframe
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
  }

  setVertices(radius) {
    let vertices = [];
    // vertices.push(0, 0, 0);
    let z = 0;
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.columns; y++) {
        let theta =
          (Math.PI *
            ((360 / (this.rows * this.columns)) * (x * this.columns + y))) /
          180;
        vertices.push(radius * Math.cos(theta), radius * Math.sin(theta), z);
      }
    }
    return vertices;
  }

  setIndices(vertices, vert) {
    let indices = [];
    for (let i = 0; i < vert.length / 3 - 1; i++) {
      indices.push(i + vert.length / 3, i, i + 1);
    }
    indices.push(vertices.length / 3 - 1, vert.length / 3 - 1, 0);
    for (let i = 0; i < vert.length / 3 - 1; i++) {
      indices.push(i + vert.length / 3, i + 1, i + vert.length / 3 + 1);
    }
    indices.push(vertices.length / 3 - 1, 0, vert.length / 3);

    return indices;
  }

  update(time, frequence, volume) {
    //o shit
    // var positions = this.mesh.geometry.attributes.position.array;

    // var index, indiceIndex, indiceInnerIndex;
    // indiceIndex = 0;
    // indiceInnerIndex = this.verticesCircleCount * 3;
    // indiceIndex = 0;
    // index = this.verticesCircleCount * 3;
    // let a = 0;

    // for (var i = 0, l = this.verticesCircleCount; i < l; i++) {
    //   // (Math.PI * 2)/this.verticesCircleCount ;

    //   a += (Math.PI * 2) / this.verticesCircleCount;
    //   let xOffest = Math.abs(Math.cos(a + time * frequence * 0.1) * 0.2) + 1;
    //   let yOffest =
    //     Math.abs(Math.sin(a + Math.sin(time * frequence * 0.1)) * 0.2) + 1;
    //   let value2d =
    //     Math.abs(this.simplex.noise3d(xOffest, yOffest, this.seed)) * 0.5;

    //   let theta =
    //     (Math.PI *
    //       ((360 / this.verticesCircleCount) * (i + this.verticesCircleCount))) /
    //     180;
    //   positions[indiceInnerIndex++] =
    //     (value2d + this.innerRadius) * Math.cos(theta);
    //   positions[indiceInnerIndex++] =
    //     (value2d + this.innerRadius) * Math.sin(theta);
    //   indiceInnerIndex++;

    //   positions[indiceIndex++] =
    //     (frequence * 0.1 + value2d + this.radius) * Math.cos(theta);
    //   positions[indiceIndex++] =
    //     (frequence * 0.1 + value2d + this.radius) * Math.sin(theta);
    //   indiceIndex++;
    //   // positions[index++] += z;

    //   // z += Math.random() * 0.001;
    // }
    // this.mesh.geometry.attributes.position.needsUpdate = true; // required after the first render

    var positions = this.mesh.geometry.attributes.position.array;
    var indiceIndex, indiceInnerIndex;
    indiceIndex = 0;
    indiceInnerIndex = this.verticesCircleCount * 3;

    let a = 0;

    // console.log(frequence, this.radius);
    for (var i = 0, l = this.verticesCircleCount; i < l; i++) {
      a += Math.abs(Math.PI / this.verticesCircleCount);

      let xOffest = Math.abs(Math.cos(a + this.ondulaire + this.speed));
      let yOffest = Math.abs(Math.sin(a + this.ondulaire + this.speed));
      let value2d =
        (this.simplex.noise3d(
          xOffest,
          yOffest,
          this.index + this.ondulaire + this.tubulaire
        ) +
          1) *
        0.3;
      0.3;
      let theta =
        (Math.PI *
          ((360 / this.verticesCircleCount) * (i + this.verticesCircleCount))) /
        180;

      positions[indiceInnerIndex++] =
        value2d + this.innerRadius * Math.cos(theta);
      positions[indiceInnerIndex++] =
        value2d + this.innerRadius * Math.sin(theta);
      indiceInnerIndex++;

      positions[indiceIndex++] = value2d + this.radius * Math.cos(theta);
      positions[indiceIndex++] = value2d + this.radius * Math.sin(theta);
      indiceIndex++;

      // positions[index++] += z;
    }
    this.speed += volume * 0.00025 + 0.005;
    this.index += volume * 0.001 + 0.001;

    this.mesh.geometry.attributes.position.needsUpdate = true;
  }
}
