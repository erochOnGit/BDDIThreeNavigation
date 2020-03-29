precision highp float;

#define PI 3.14159265358979323846

varying vec2 vUv;
uniform float time;
uniform sampler2D inputTexture;
uniform sampler2D initTexture;
uniform sampler2D color;
uniform sampler2D alpha;
uniform vec2 pointer;
vec2 rotate2D (vec2 _st, float _angle) {
    _st -= 0.5;
    _st =  mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle)) * _st;
    _st += 0.5;
    return _st;
}
vec2 rotateTilePattern(vec2 _st){

    //  Scale the coordinate system by 2x2
    _st.x *= 2.0;

    
    //  Give each cell an index number
    //  according to its position
    float index = 0.0;
    index += step(1., mod(_st.x,2.0));

    // Rotate each cell according to the index
    if(index == 1.0){
        //  flip cell on x axis
        _st = _st * vec2(-1.0,1.0);
    }

    // Make each cell between 0.0 - 1.0
    _st = fract(_st);

    return _st;
}

vec4 get(sampler2D tex,float x,float y){
    vec2 st = vUv;
    st = rotateTilePattern(st);
    return texture2D(tex,(st+vec2(x,y))).rgba;
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