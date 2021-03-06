precision highp float;

varying vec2 vUv;
uniform float time;
uniform sampler2D inputTexture;
uniform sampler2D initTexture;
uniform sampler2D color;
uniform sampler2D alpha;
uniform vec2 pointer;

vec4 get(sampler2D tex,float x,float y){
    return texture2D(tex,(vUv+vec2(x,y))).rgba;
}
void main(){
    vec4 backbuffer=get(inputTexture,0.,0.);
    vec4 init=get(initTexture,0.,0.);
    
    vec4 paint=get(color,0.,0.);
    float a=get(alpha,0.,0.).r;
    
    gl_FragColor=vec4(
        paint.r+init.r,
        paint.g+init.g,
        paint.b+init.b,
        a
    );
}