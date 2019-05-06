//basic simulation: displays the particles in place.
precision highp float;

uniform sampler2D initTexture;
uniform sampler2D inputTexture;
varying vec2 vUv;
uniform sampler2D x;
uniform float b;
uniform float N;
uniform sampler2D diffuse;


//test necessaire sur l'appel de la texture : 
//voir si il est possible de donner 
//des valeur avec beaucoup de valeur apreès la virgule a x ou y
//sinon les 1./N ne vont pas marcher.
// je me suis trompé sur les 1/N qui sont
// les bonne valeur dans les vérification mais pas dans les get... 
//0 dans un get equivaut à -vUv.x
//current fragment value is 0.
//maximum value is 1.-vUv.x 
vec4 get(tex,x,y){
  return texture2D(tex, (vUv+vec2(x,y)) ).rgba;
}

void main() {
  vec2 diffuse = texture2D( diffuse, vUv ).rg;
  float a = diffuse.r;
  float value = 0.;
  //ici on passe positiveness mais on considère
  // que toute les valeurs entrante sont positives... 
  //a doublecheck
  float positiveness=0.;
  //do the two next for together
  // this is set_bnd-cycle
  // for (let i = 1; i < N - 1; i++) {
    if(vUv.y < 1/N){
      if(b==2){
        positiveness = 1.;
        value = get(x,0.,-vUv.y+1./N);
      }else{
        positiveness = 0.;
        value = get(x,0.,-vUv.y+1./N)
      }
    }
    // x[IX(i, 0)] = b == 2. ? -x[IX(i, 1)] : x[IX(i, 1)];
    if(vUv.y > N-1/N){
      if(b==2){
        positiveness = 1.;
        value = get(x,0.,1.-vUv.y+(-2./N));
      }else{
        positiveness = 0.;
        value = get(x,0.,1.-vUv.y+(-2./N))
      }
    }
    // x[IX(i, N - 1)] = b == 2. ? -x[IX(i, N - 2)] : x[IX(i, N - 2)];
//   }
//   for (let j = 1; j < N - 1; j++) {
    if(vUv.x < 1./N){
      if(b==2){
        positiveness = 1.;
        value = get(x,-vUv.x+1./N,0.);
      }else{
        positiveness = 0.;
        value = get(x,-vUv.x+1./N,0.)
      }
    }
    // x[IX(0, j)] = b == 1 ? -x[IX(1, j)] : x[IX(1, j)];
    if(vUv.x < N-1./N){
      if(b==2){
        positiveness = 1.;
        value = get(x,1.-vUv.x+(-2./N),0.);
      }else{
        positiveness = 0.;
        value = get(x,1.-vUv.x+(-2./N),0.)
      }
    }
    // x[IX(N - 1, j)] = b == 1 ? -x[IX(N - 2, j)] : x[IX(N - 2, j)];
//   }
// this is set_bnd-classic
  value = 0.5 * (get(x,-vUv.x+2./N,-vUv.y+1./N).r + get(x,-vUv.x+1./N,-vUv.y+2./N).r) 
  // x[IX(0, 0)] = 0.5 * (x[IX(1, 0)] + x[IX(0, 1)]);
  // if(vUv.x <N-1./N && vUv.y > N-1/N){
  //   value = 0.5 * (get(x,-vUv.x+1./N,N-1/N).r + get(x,0.,-vUv.y+1./N).r)
  // } 
  // x[IX(0, N - 1)] = 0.5 * (x[IX(1, N - 1)] + x[IX(0, N - 2)]);
//   x[IX(N - 1, 0)] = 0.5 * (x[IX(N - 2, 0)] + x[IX(N - 1, 1)]);
//   x[IX(N - 1, N - 1)] = 0.5 * (x[IX(N - 2, N - 1)] + x[IX(N - 1, N - 2)]);
}
    gl_FragColor = vec4(value, positiveness, 1., 1.);
}
