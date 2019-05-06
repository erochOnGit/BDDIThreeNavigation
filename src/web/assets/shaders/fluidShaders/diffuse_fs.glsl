//basic simulation: displays the particles in place.
precision highp float;

uniform sampler2D initTexture;
uniform sampler2D inputTexture;
varying vec2 vUv;
uniform float diff; 
uniform float dt;
uniform float N;
uniform sampler2D x;
uniform sampler2D x0;

vec4 get(sampler2D tex,float x,float y){
    return  texture2D( tex, (vUv+vec2(x,y)) ).rgba;
}

void main() {
    float a = dt * diff * (N - 2.) * (N - 2.);
   
    gl_FragColor = vec4(a, 1. + 6. * a, 1., 1.);
}
