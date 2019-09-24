precision highp float;

varying vec2 vUv;
uniform float time;
uniform sampler2D inputTexture;
uniform sampler2D initTexture;
uniform vec2 pointer;

vec4 get(sampler2D tex,float x,float y){
    return texture2D(tex,(vUv+vec2(x,y))).rgba;
}
void main(){
    vec4 backbuffer=get(inputTexture,0.,0.);
    vec4 init=get(initTexture,0.,0.);
    
    float sum=
    get(inputTexture,-1./250.,-1./250.).r*.15+
    get(inputTexture,-1./250.,0./250.).r*.1+
    get(inputTexture,-1./250.,1./250.).r*.15+
    get(inputTexture,0./250.,-1./250.).r*.1+
    get(inputTexture,0./250.,1./250.).r*.1+
    get(inputTexture,1./250.,-1./250.).r*.15+
    get(inputTexture,1./250.,0./250.).r*.1+
    get(inputTexture,1./250.,1./250.).r*.15;
    
    float tap=.02;
    vec3 finalSum=vec3(0);
    if(pointer.x!=.5){
        if(distance(pointer.xy,vUv.xy)<tap){
            sum=3.;
        }
    }
    finalSum=vec3(
        (abs(sin(time*0.05)))*sum,
        (abs(sin(time*0.05)))*sum,
        (abs(sin(time*0.05)))*sum);
    
    gl_FragColor=vec4(
        finalSum.r+init.r,
        finalSum.g+init.g,
        finalSum.b+init.b,
        1.
    );
    
}