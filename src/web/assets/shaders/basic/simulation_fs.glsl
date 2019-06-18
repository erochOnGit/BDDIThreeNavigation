//basic simulation: displays the particles in place.
uniform sampler2D color;
uniform float time;
varying vec2 vUv;

void main() {
    
    vec3 col = texture2D( color, vUv ).rgb;
    col = col * vec3(10.,10,10);

       gl_FragColor = vec4( abs(sin((col.r)*0.1)),
                            abs(cos((col.g)*0.1)),
                            abs(col.b),
                            abs(sin(((col.r + col.g + col.b)*0.1)*0.05)));
}