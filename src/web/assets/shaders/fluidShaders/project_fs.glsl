//basic simulation: displays the particles in place.
precision highp float;

uniform sampler2D inputTexture;
uniform float N;
uniform sampler2D velocY; 
uniform sampler2D velocX; 
uniform sampler2D p;
uniform sampler2D div;

varying vec2 vUv;

vec4 get(sampler2D tex,float x,float y){
  return texture2D(tex, (vUv+vec2(x,y)) ).rgba;
}

void main() {

    //   div[IX(i, j)] =
    //     (-0.5 *
    //       (velocX[IX(i + 1, j)] -
    //         velocX[IX(i - 1, j)] +
    //         velocY[IX(i, j + 1)] -
    //         velocY[IX(i, j - 1)])) /
    //     N;
        float veloMerge = 
            (-0.5 * 
                (get(velocX,0.+1./N,0.).r -
                 get(velocX,0.-1./N,0.).r +
                 get(velocY,0.,0.+1./N).r -
                 get(velocY,0.,0.-1./N).r)
            )/N;
    //   p[IX(i, j)] = 0; p = 0

    gl_FragColor = vec4( veloMerge,0.,0.,1.0 );
}