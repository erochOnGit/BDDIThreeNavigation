//basic simulation: displays the particles in place.
precision highp float;

uniform sampler2D initTexture;
uniform sampler2D inputTexture;
uniform float time;
uniform vec2 pointer;
uniform vec2 amount;
uniform float N;
varying vec2 vUv;
void main() {
    vec3 init = texture2D( initTexture, vUv ).rgb;
    vec3 backBuffer = texture2D( inputTexture, vUv ).rgb;
    
    gl_FragColor = vec4 ( 
        init.r+backBuffer.r,
        init.g+backBuffer.g,
        init.b+backBuffer.b,
        0.
    );
}
