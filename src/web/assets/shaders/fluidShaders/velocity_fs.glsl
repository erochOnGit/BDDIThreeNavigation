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
   
    float pointX = floor(N * pointer.x)/N;
    float currentX = floor(N * vUv.x)/N;
    float pointY = floor(N * pointer.y)/N;
    float currentY = floor(N * vUv.y)/N;

    if( 
        pointX == currentX &&
        pointY == currentY &&
        pointer.x != 0.5
    ){
        init = vec3(amount.x, amount.y, 0.5);
        if(amount.x<0.){
            // if amount.x is negative we set the value of b to one 
            init.b = 1.;
        }
    }  
    //if amount.y is negative we set the value of a to one
    float rPositiveness = 0.5;
    if(amount.y < 0.){
        float rPositiveness = 1.; 
    } 
    gl_FragColor = vec4 ( 
        init.r+backBuffer.r,
        init.g+backBuffer.g,
        init.b+backBuffer.b,
        rPositiveness
    );
}
