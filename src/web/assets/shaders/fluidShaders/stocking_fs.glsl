//basic simulation: displays the particles in place.
precision highp float;

uniform sampler2D initTexture;
uniform sampler2D inputTexture;
uniform float N;
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
}
