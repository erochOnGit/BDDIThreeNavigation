precision highp float;

varying vec2 vUv;
uniform float time;
uniform sampler2D inputTexture;
uniform sampler2D initTexture;
uniform sampler2D color;
uniform vec2 pointer;

vec4 get(sampler2D tex,float x,float y){
    return texture2D(tex,(vUv+vec2(x,y))).rgba;
}
void main(){
    vec4 backbuffer=get(inputTexture,0.,0.);
    vec4 init=get(initTexture,0.,0.);
    
    vec3 gris=get(color,0.,0.).rgb;
    float alpha=(gris.b+gris.r+gris.g);
    
    gl_FragColor=vec4(
        alpha+init.r,
        alpha+init.g,
        alpha+init.b,
        1.
    );
}