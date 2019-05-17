//basic simulation: displays the particles in place.
precision highp float;

uniform sampler2D initTexture;
uniform sampler2D inputTexture;
uniform float N;
uniform vec4 providedLetter;
varying vec2 vUv;
void main() {
    vec4 init = texture2D( initTexture, vUv ).rgba;
    vec4 backBuffer = texture2D( inputTexture, vUv ).rgba;
     gl_FragColor = vec4 ( 
        init.r,
        init.g,
        init.b,
        init.a
    );
    if(providedLetter.r>0.){
        gl_FragColor = vec4 ( 
            init.r,
            init.r,
            init.r,
            init.r
        );
    }
    if(providedLetter.r<0. && providedLetter.g<0. && providedLetter.b<0. && providedLetter.a<0.){
        gl_FragColor = vec4 ( 
            init.r,
            init.g,
            init.b,
            init.a
        );
    }
    if(providedLetter.g>0.){
    gl_FragColor = vec4 ( 
            init.g,
            init.g,
            init.g,
            init.g
        );
    }
    if(providedLetter.b>0.){
    gl_FragColor = vec4 ( 
            init.b,
            init.b,
            init.b,
            init.b
        );
    }
    if(providedLetter.a>0.){
    gl_FragColor = vec4 ( 
            init.a,
            init.a,
            init.a,
            init.a
        );
    }
}
