//basic simulation: displays the particles in place.
precision highp float;

uniform sampler2D initTexture;
uniform sampler2D inputTexture;
varying vec2 vUv;
uniform sampler2D x;
uniform sampler2D x0;
uniform float N;
uniform float useDiffuse;
uniform sampler2D diffuse;

vec4 get(sampler2D tex,float x,float y){
    return  texture2D( tex, (vUv+vec2(x,y)) ).rgba;
}

void main() {
  float a;
  float c;
  
if(useDiffuse==0.){
  vec2 diffuse = texture2D( diffuse, vUv ).rg;
   a = diffuse.r;
   c = diffuse.g;
  }
  else {
   a = 1.;
   c = 6.;
  }

  float cRecip = 1.0 / c;
  float newX =
              (get(x0,0., 0.).r +
                a *
                  (get(x, 1./N, 0.).r +
                   get(x,- 1./N,0.).r +
                   get(x,0., 1./N).r +
                   get(x,0., -1./N).r
                  )
              ) * cRecip;
    gl_FragColor = vec4(newX, newX, newX, 1.);
}
