import { useRef, useEffect } from 'react';

const VERT_SRC = `attribute vec2 a_position;void main(){gl_Position=vec4(a_position,0.,1.);}`;

const NOISE_GLSL = `
vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute(vec4 x){return mod289(((x*34.)+1.)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.-g;
  vec3 i1=min(g,l.zxy);vec3 i2=max(g,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.,i1.z,i2.z,1.))+i.y+vec4(0.,i1.y,i2.y,1.))+i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=1./7.;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
float fbm(vec3 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*snoise(p);p*=2.;a*=.5;}return v;}
`;

const PLASMA_BASE = `
  vec2 uv=gl_FragCoord.xy/u_resolution;
  vec2 p=(gl_FragCoord.xy-.5*u_resolution)/min(u_resolution.x,u_resolution.y);
  float t=u_time*.07;
  float w1=fbm(vec3(p*.9,t*.35));
  float w2=fbm(vec3(p*.7+w1*1.4,t*.25+5.));
  float w3=fbm(vec3(p*1.1+w2*1.2,t*.3+12.));
  float plasma=fbm(vec3(p*.6+vec2(w2*1.3,w3*1.3),t*.15));
  float wisps=fbm(vec3(p*1.5+vec2(w1*.5,w3*.5),t*.2+30.));
  float f=plasma*.6+wisps*.4;f=f*.5+.5;
  float mask=smoothstep(.2,.65,f);
  float hl=smoothstep(.45,.8,f);
  float core=smoothstep(.65,.95,f);
`;

const FRAG_LIGHT = `precision highp float;
uniform float u_time;uniform vec2 u_resolution;
${NOISE_GLSL}
void main(){
${PLASMA_BASE}
  vec3 col=vec3(.96,.94,.92);
  col=mix(col,vec3(.93,.86,.80),mask*.6);
  col=mix(col,vec3(.86,.74,.64),smoothstep(.35,.6,f)*.45);
  col=mix(col,vec3(.80,.62,.46),hl*.4);
  col=mix(col,vec3(.74,.50,.34),core*.35);
  col+=vec3(.72,.40,.26)*core*.12;
  col*=1.-.06*length((uv-.5)*1.6);
  gl_FragColor=vec4(col,1.);
}`;

function buildProgram(gl, fragSrc) {
  const mk = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) return null;
    return s;
  };
  const vs = mk(gl.VERTEX_SHADER, VERT_SRC);
  const fs = mk(gl.FRAGMENT_SHADER, fragSrc);
  if (!vs || !fs) return null;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  return prog;
}

export default function PlasmaBackground({ className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const gl = cv.getContext('webgl', { alpha: false, antialias: false, preserveDrawingBuffer: false });
    if (!gl) return;

    const prog = buildProgram(gl, FRAG_LIGHT);
    if (!prog) return;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

    const a = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(a);
    gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      cv.width = cv.clientWidth * dpr;
      cv.height = cv.clientHeight * dpr;
      gl.viewport(0, 0, cv.width, cv.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    const t0 = performance.now();

    const draw = () => {
      gl.useProgram(prog);
      const now = (performance.now() - t0) / 1000;
      gl.uniform1f(gl.getUniformLocation(prog, 'u_time'), now);
      gl.uniform2f(gl.getUniformLocation(prog, 'u_resolution'), cv.width, cv.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      if (!prefersReduced) raf = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  return (
    <div className={`absolute inset-x-0 top-0 h-[480px] pointer-events-none overflow-hidden ${className ?? ''}`} style={{ zIndex: 0 }}>
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: 'block' }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: '80%', background: 'linear-gradient(transparent, #FFFFFF)' }} />
      <div className="absolute top-0 left-0 right-0" style={{ height: '30%', background: 'linear-gradient(#FFFFFF, transparent)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 30%, transparent 0%, #FFFFFF 100%)' }} />
    </div>
  );
}
