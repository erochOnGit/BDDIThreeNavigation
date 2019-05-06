//basic simulation: displays the particles in place.
precision highp float;

uniform sampler2D initTexture;
uniform sampler2D inputTexture;
varying vec2 vUv;
uniform sampler2D x;
uniform sampler2D x0;
uniform sampler2D diffuse;

vec4 get(tex,x,y){
    return  texture2D( tex, (vUv+vec2(x,y)) ).rgba;
}

void main() {
  vec2 diffuse = texture2D( diffuse, vUv ).rg;
  float a = diffuse.r;
  //do the two next for together
  // this is set_bnd-cycle
  // for (let i = 1; i < N - 1; i++) {
//     x[IX(i, 0)] = b == 2 ? -x[IX(i, 1)] : x[IX(i, 1)];
//     x[IX(i, N - 1)] = b == 2 ? -x[IX(i, N - 2)] : x[IX(i, N - 2)];
//   }
//   for (let j = 1; j < N - 1; j++) {
//     x[IX(0, j)] = b == 1 ? -x[IX(1, j)] : x[IX(1, j)];
//     x[IX(N - 1, j)] = b == 1 ? -x[IX(N - 2, j)] : x[IX(N - 2, j)];
//   }
// this is set_bnd-classic
//   x[IX(0, 0)] = 0.5 * (x[IX(1, 0)] + x[IX(0, 1)]);
//   x[IX(0, N - 1)] = 0.5 * (x[IX(1, N - 1)] + x[IX(0, N - 2)]);
//   x[IX(N - 1, 0)] = 0.5 * (x[IX(N - 2, 0)] + x[IX(N - 1, 1)]);
//   x[IX(N - 1, N - 1)] = 0.5 * (x[IX(N - 2, N - 1)] + x[IX(N - 1, N - 2)]);
}
    gl_FragColor = vec4(1., 1., 1., 1.);
}
