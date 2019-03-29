//basic simulation: displays the particles in place.
precision highp float;

uniform sampler2D color;
uniform sampler2D inputTexture;
uniform float time;
uniform vec2 pointer;

varying vec2 vUv;
void main() {

    vec3 pos = texture2D( color, vUv ).rgb;
    vec3 backBuffer = texture2D( inputTexture, vUv ).rgb;
    if(pos.r == 0. && pos.g == 0.){
        // pos = vec3(1., 1., 1.);
        // backBuffer = vec3(1., 1., 1.);
    }
    float N = 56.;
    float pointX = floor(N * pointer.x)/N;
    float currentX = floor(N * vUv.x)/N;
    float pointY = floor(N * pointer.y)/N;
    float currentY = floor(N * vUv.y)/N;

    if( 
        pointX == currentX &&
        pointY == currentY &&
        pointer.x != 0.5
    ){
        pos = vec3(1., 0., 0.);
    } 

    gl_FragColor = vec4 ( 
        pos.r+backBuffer.r,
        pos.g+backBuffer.g,
        pos.b+backBuffer.b,
        1.0
    );
}