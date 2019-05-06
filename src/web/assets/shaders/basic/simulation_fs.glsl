//basic simulation: displays the particles in place.
uniform sampler2D color;
uniform float time;
varying vec2 vUv;

void main() {
    
    vec3 col = texture2D( color, vUv ).rgb;
    col = col * vec3(10.,10,10);

    gl_FragColor = vec4( abs(cos(col.r*0.1))*col.r*0.05,
                         abs(cos(col.g*0.1))*col.g*0.01,
                         abs(sin(col.b*0.1))*col.b*0.05,
                         col.r + col.g + col.b );
}