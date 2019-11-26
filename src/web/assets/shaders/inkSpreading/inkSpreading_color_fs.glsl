precision highp float;

varying vec2 vUv;
uniform float time;
uniform sampler2D inputTexture;
uniform sampler2D initTexture;
uniform vec2 pointer;
//	Simplex 3D Noise
//	by Ian McEwan, Ashima Arts
//
vec4 permute(vec4 x){return mod(((x*34.)+1.)*x,289.);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}

float snoise(vec3 v){
    const vec2 C=vec2(1./6.,1./3.);
    const vec4 D=vec4(0.,.5,1.,2.);
    
    // First corner
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    
    // Other corners
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    
    //  x0 = x0 - 0. + 0.0 * C
    vec3 x1=x0-i1+1.*C.xxx;
    vec3 x2=x0-i2+2.*C.xxx;
    vec3 x3=x0-1.+3.*C.xxx;
    
    // Permutations
    i=mod(i,289.);
    vec4 p=permute(permute(permute(
                i.z+vec4(0.,i1.z,i2.z,1.))
                +i.y+vec4(0.,i1.y,i2.y,1.))
                +i.x+vec4(0.,i1.x,i2.x,1.));
                
                // Gradients
                // ( N*N points uniformly over a square, mapped onto an octahedron.)
                float n_=1./7.;// N=7
                vec3 ns=n_*D.wyz-D.xzx;
                
                vec4 j=p-49.*floor(p*ns.z*ns.z);//  mod(p,N*N)
                
                vec4 x_=floor(j*ns.z);
                vec4 y_=floor(j-7.*x_);// mod(j,N)
                
                vec4 x=x_*ns.x+ns.yyyy;
                vec4 y=y_*ns.x+ns.yyyy;
                vec4 h=1.-abs(x)-abs(y);
                
                vec4 b0=vec4(x.xy,y.xy);
                vec4 b1=vec4(x.zw,y.zw);
                
                vec4 s0=floor(b0)*2.+1.;
                vec4 s1=floor(b1)*2.+1.;
                vec4 sh=-step(h,vec4(0.));
                
                vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
                vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
                
                vec3 p0=vec3(a0.xy,h.x);
                vec3 p1=vec3(a0.zw,h.y);
                vec3 p2=vec3(a1.xy,h.z);
                vec3 p3=vec3(a1.zw,h.w);
                
                //Normalise gradients
                vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
                p0*=norm.x;
                p1*=norm.y;
                p2*=norm.z;
                p3*=norm.w;
                
                // Mix final noise value
                vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
                m=m*m;
                return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),
                dot(p2,x2),dot(p3,x3)));
            }
            vec4 get(sampler2D tex,float x,float y){
                return texture2D(tex,(vUv+vec2(x,y))).rgba;
            }
            void main(){
                vec4 backbuffer=get(inputTexture,0.,0.);
                vec4 init=get(initTexture,0.,0.);
                
                float diffuseR=450.;
                
                float sumR=
                get(inputTexture,-1./diffuseR,-1./diffuseR).r*.15+
                get(inputTexture,-1./diffuseR,0./diffuseR).r*.1+
                get(inputTexture,-1./diffuseR,1./diffuseR).r*.15+
                get(inputTexture,0./diffuseR,-1./diffuseR).r*.1+
                get(inputTexture,0./diffuseR,1./diffuseR).r*.1+
                get(inputTexture,1./diffuseR,-1./diffuseR).r*.15+
                get(inputTexture,1./diffuseR,0./diffuseR).r*.1+
                get(inputTexture,1./diffuseR,1./diffuseR).r*.15;
                
                float diffuseG=250.;
                
                float sumG=
                get(inputTexture,-1./diffuseG,-1./diffuseG).g*.15+
                get(inputTexture,-1./diffuseG,0./diffuseG).g*.1+
                get(inputTexture,-1./diffuseG,1./diffuseG).g*.15+
                get(inputTexture,0./diffuseG,-1./diffuseG).g*.1+
                get(inputTexture,0./diffuseG,1./diffuseG).g*.1+
                get(inputTexture,1./diffuseG,-1./diffuseG).g*.15+
                get(inputTexture,1./diffuseG,0./diffuseG).g*.1+
                get(inputTexture,1./diffuseG,1./diffuseG).g*.15;
                
                float diffuseB=150.;
                
                float sumB=
                get(inputTexture,-1./diffuseB,-1./diffuseB).b*.15+
                get(inputTexture,-1./diffuseB,0./diffuseB).b*.1+
                get(inputTexture,-1./diffuseB,1./diffuseB).b*.15+
                get(inputTexture,0./diffuseB,-1./diffuseB).b*.1+
                get(inputTexture,0./diffuseB,1./diffuseB).b*.1+
                get(inputTexture,1./diffuseB,-1./diffuseB).b*.15+
                get(inputTexture,1./diffuseB,0./diffuseB).b*.1+
                get(inputTexture,1./diffuseB,1./diffuseB).b*.15;
                float tap=.1;
                vec3 finalSum=vec3(0);
                if(pointer.x!=.5){
                    float distancePointerPixel=distance(pointer.xy,vUv.xy);
                    if(distancePointerPixel<tap){

                        sumR=mix(abs(cos(time/2.)*3.)*abs(snoise(vec3(time,vUv.x*10.,vUv.y*10.)+0.5)),sumR,.3);
                        sumG=mix(abs(cos(time/2.)*3.)*abs(snoise(vec3(time,vUv.x*10.,vUv.y*10.)+0.5)),sumG,.5);
                        sumB=mix(abs(cos(time/2.)*3.)*abs(snoise(vec3(time,vUv.x*10.,vUv.y*10.)+0.5)),sumB,.1);
                    }
                }
                finalSum=vec3(
                    sumR,
                    sumG,
                sumB);
                
                gl_FragColor=vec4(
                    finalSum.r+init.r,
                    finalSum.g+init.g,
                    finalSum.b+init.b,
                    1.
                );
            }