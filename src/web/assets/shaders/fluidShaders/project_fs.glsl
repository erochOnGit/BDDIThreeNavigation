//basic simulation: displays the particles in place.
precision highp float;

uniform sampler2D inputTexture;
uniform float N;
uniform sampler2D projectVeloComputed; 
uniform sampler2D p;
uniform sampler2D div;

varying vec2 vUv;

vec4 get(sampler2D tex,float x,float y){
  return texture2D(tex, (vUv+vec2(x,y)) ).rgba;
}

void main() {
    float divResult = texture2D(div, vUv).r;
    float pResult = texture2D(p, vUv).r;
    // for (let j = 1; j < N - 1; j++) {
    //   for (let i = 1; i < N - 1; i++) {
    //     velocX[IX(i, j)] -= 0.5 * (p[IX(i + 1, j)] - p[IX(i - 1, j)]) * N;
    //     velocY[IX(i, j)] -= 0.5 * (p[IX(i, j + 1)] - p[IX(i, j - 1)]) * N;
    //   }
    // }
    float  veloX;
    float  veloY;
    if(vUv.x>1./N && vUv.y>1./N) {
        veloX = get(projectVeloComputed,0.,0.).r - 0.5 * (get(p,0.+1./N,0.).r - get(p,0.-1./N,0.).r);
        veloY = get(projectVeloComputed,0.,0.).g - 0.5 * (get(p,0.,0.+1./N).r - get(p,0.,0.-1./N).r);
    }else{
        veloX = get(projectVeloComputed,0.,0.).r;
        veloY = get(projectVeloComputed,0.,0.).g;
    }

    gl_FragColor = vec4(veloX, veloY, pResult, divResult);
}