precision highp float;

varying vec2 vUv;
uniform float time;
uniform sampler2D inputTexture;
uniform sampler2D initTexture;
uniform vec2 pointer;
uniform vec2 previousPointer;

vec4 get(sampler2D tex,float x,float y){
    return texture2D(tex,(vUv+vec2(x,y))).rgba;
}

void main(){
    vec4 backbuffer=get(inputTexture,0.,0.);
    vec4 init=get(initTexture,0.,0.);


    float NX  = gl_FragCoord.x/vUv.x;
    float NY  = gl_FragCoord.y/vUv.y;
    
    float pointX = floor(NX * pointer.x)/NX;
    float currentX = floor(NX * vUv.x)/NX;
    float pointY = floor(NY * pointer.y)/NY;
    float currentY = floor(NY * vUv.y)/NY;

    vec2 amount = vec2(pointer.x - previousPointer.x, pointer.y - previousPointer.y);

     
    float tap=.1;
    vec3 finalSum=vec3(0);
    init = backbuffer;
    if(pointer.x!=.5){
        float distancePointerPixel=distance(pointer.xy,vUv.xy);
        if(distancePointerPixel<tap){

            init = vec4(amount.x, amount.y, 0.5, 0.5);
            if(amount.x<0.){
                // if amount.x is negative we set the value of b to one 
                init.b = 1.;
                init.x *= -1. ;
            }
            if(amount.y<0.){
                // if amount.x is negative we set the value of b to one 
                init.a = 1.;
                init.y *= -1. ;
            }
        }
    }

    gl_FragColor=vec4(
        init.r,
        init.g,
        init.b,
        1.
    );
}
