precision highp float;

varying vec2 vUv;
uniform float time;
uniform sampler2D inputTexture;
uniform sampler2D initTexture;
uniform vec2 pointer;
uniform vec2 previousPointer;

float distanceToSegment( vec2 a, vec2 b, vec2 p )
{
	vec2 pa = p - a, ba = b - a;
	float h = clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
	return length( pa - ba*h );
}

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){
  return  smoothstep( pct-0.05, pct, st.y) -
          smoothstep( pct, pct+0.05, st.y);
}
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
    

    float sumG=
    get(inputTexture,-1./250.,-1./250.).g*.15+
    get(inputTexture,-1./250.,0./250.).g*.1+
    get(inputTexture,-1./250.,1./250.).g*.15+
    get(inputTexture,0./250.,-1./250.).g*.1+
    get(inputTexture,0./250.,1./250.).g*.1+
    get(inputTexture,1./250.,-1./250.).g*.15+
    get(inputTexture,1./250.,0./250.).g*.1+
    get(inputTexture,1./250.,1./250.).g*.15;
    
    float sumB=
    get(inputTexture,-1./250.,-1./250.).b*.15+
    get(inputTexture,-1./250.,0./250.).b*.1+
    get(inputTexture,-1./250.,1./250.).b*.15+
    get(inputTexture,0./250.,-1./250.).b*.1+
    get(inputTexture,0./250.,1./250.).b*.1+
    get(inputTexture,1./250.,-1./250.).b*.15+
    get(inputTexture,1./250.,0./250.).b*.1+
    get(inputTexture,1./250.,1./250.).b*.15;

           vec3 colorsDensity = vec3(sum,sumG,sumB);
// vec4 toto = vec4( abs(sin((col.r)*0.1)),
//                             abs(cos((col.g)*0.1)),
//                             abs(col.b),
//                             abs(sin(((col.r + col.g + col.b)*0.1)*0.05)));

    float tap=.02;
    float finalSum = (abs(sin(time*0.05)))*sum;
    vec3 color = vec3(0.0)+colorsDensity;
    if(pointer.x!=.5){
        if(distance(pointer.xy,vUv.xy)<tap){
            sum=3.;
        }
        float d = distanceToSegment(pointer.xy,previousPointer.xy,vUv.xy);
        color = mix( color, vec3(1.0,1.0,1.0), 1.0-smoothstep(.002,0.038, d) );
        // color = mix(color,vec3(1.0,1.0,1.0),sum)
    }

    // finalSum=vec3(
    //     (abs(sin(time*0.05)))*sum,
    //     (abs(sin(time*0.05)))*sum,
    //     (abs(sin(time*0.05)))*sum);

    gl_FragColor=vec4(
        color.r+init.r,
        color.g+init.g,
        color.b+init.b,
        1.
    );
    
}