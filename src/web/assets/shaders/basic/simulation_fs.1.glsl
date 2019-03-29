//basic simulation: displays the particles in place.
precision highp float;
uniform sampler2D color;

varying vec2 vUv;
void main() {

    vec3 pos = texture2D( color, vUv ).rgb;
    gl_FragColor = vec4( pos,1.0 );
}