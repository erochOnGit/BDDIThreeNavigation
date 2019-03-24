//basic simulation: displays the particles in place.
uniform sampler2D color;
varying vec2 vUv;
void main() {

    vec3 col = texture2D( color, vUv ).rgb;
   
    gl_FragColor = vec4( col,1.0 );
}