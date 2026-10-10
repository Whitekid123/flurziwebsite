"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);
  const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.0-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;
  vec4 s1=floor(b1)*2.0+1.0;
  vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
  m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

const coreVertex = /* glsl */ `
uniform float uTime;
uniform float uPointer;
varying vec3 vNormal;
varying vec3 vViewPos;
varying float vDisp;
${NOISE}
void main(){
  float t = uTime * 0.22;
  float d = snoise(normal * 0.95 + vec3(t)) * 0.15;
  d += snoise(normal * 2.8 - vec3(t * 1.5)) * 0.035;
  d *= 1.0 + uPointer * 0.35;
  vDisp = d;
  vec3 pos = position + normal * d;
  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  vViewPos = mv.xyz;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mv;
}
`;

const coreFragment = /* glsl */ `
uniform float uTime;
uniform vec3 uA;
uniform vec3 uB;
varying vec3 vNormal;
varying vec3 vViewPos;
varying float vDisp;
void main(){
  vec3 n = normalize(vNormal);
  vec3 v = normalize(-vViewPos);
  float fres = pow(1.0 - max(dot(n, v), 0.0), 3.0);
  vec3 deep = vec3(0.002, 0.003, 0.008);
  vec3 base = mix(deep, uA * 0.22, smoothstep(-0.12, 0.22, vDisp));
  float bands = smoothstep(0.965, 1.0, sin(vDisp * 38.0 - uTime * 0.6) * 0.5 + 0.5);
  vec3 col = base;
  col += bands * uB * 0.18;
  col += mix(uA, uB, 0.55) * fres * 0.85;
  col += vec3(0.85, 0.82, 1.0) * pow(fres, 6.0) * 0.6;
  // key light from upper-left
  float key = max(dot(n, normalize(vec3(-0.6, 0.7, 0.6))), 0.0);
  col += vec3(0.95, 0.96, 1.0) * pow(key, 18.0) * 0.55;
  gl_FragColor = vec4(col, 1.0);
  #include <colorspace_fragment>
}
`;

const pointsVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
attribute float aScale;
attribute float aSpeed;
varying float vAlpha;
void main(){
  vec3 p = position;
  float a = uTime * 0.05 * aSpeed;
  float c = cos(a), s = sin(a);
  p.xz = mat2(c, -s, s, c) * p.xz;
  p.y += sin(uTime * 0.4 + aSpeed * 10.0) * 0.04;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aScale * 22.0 * uPixelRatio / -mv.z;
  vAlpha = smoothstep(9.0, 2.5, -mv.z);
}
`;

const pointsFragment = /* glsl */ `
uniform vec3 uColor;
varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(uColor, a * a * vAlpha * 0.9);
  #include <colorspace_fragment>
}
`;

function Core() {
  const group = useRef<THREE.Group>(null!);
  const mesh = useRef<THREE.Mesh>(null!);
  const { viewport } = useThree();
  const energy = useRef(0);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPointer: { value: 0 },
      uA: { value: new THREE.Color("#7357FF") },
      uB: { value: new THREE.Color("#3D8BFF") },
    }),
    []
  );

  const wide = viewport.width > 7;
  const offsetX = wide ? Math.min(viewport.width * 0.22, 2.9) : 0;
  const scale = wide ? 0.92 : 0.8;

  useFrame((state, dt) => {
    const d = Math.min(dt, 0.05);
    uniforms.uTime.value += d;
    const { pointer } = state;
    const target = Math.min(Math.hypot(pointer.x, pointer.y), 1);
    energy.current = THREE.MathUtils.lerp(energy.current, target, 0.03);
    uniforms.uPointer.value = energy.current;
    mesh.current.rotation.y += d * 0.06;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.25, 0.04);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, pointer.x * 0.12, 0.04);
  });

  return (
    <group ref={group} position={[offsetX, wide ? 0.35 : 0.6, 0]} scale={scale}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[1.45, 72]} />
        <shaderMaterial
          vertexShader={coreVertex}
          fragmentShader={coreFragment}
          uniforms={uniforms}
        />
      </mesh>
      <Rings />
      <Particles />
    </group>
  );
}

function Rings() {
  const a = useRef<THREE.Mesh>(null!);
  const b = useRef<THREE.Mesh>(null!);
  useFrame((_, dt) => {
    a.current.rotation.z += dt * 0.05;
    b.current.rotation.z -= dt * 0.035;
  });
  return (
    <>
      <mesh ref={a} rotation={[1.25, 0.2, 0]}>
        <torusGeometry args={[2.25, 0.0035, 8, 256]} />
        <meshBasicMaterial color="#7357FF" transparent opacity={0.55} />
      </mesh>
      <mesh ref={b} rotation={[1.45, -0.5, 0.3]}>
        <torusGeometry args={[2.75, 0.0025, 8, 256]} />
        <meshBasicMaterial color="#3D8BFF" transparent opacity={0.35} />
      </mesh>
    </>
  );
}

function Particles({ count = 1800 }: { count?: number }) {
  const { gl } = useThree();
  const [positions, scales, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    const sp = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const ring = Math.random() < 0.65;
      const r = ring ? 2.1 + Math.random() * 1.1 : 1.8 + Math.random() * 2.6;
      const theta = Math.random() * Math.PI * 2;
      const y = ring ? (Math.random() - 0.5) * 0.25 : (Math.random() - 0.5) * 3.2;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(theta) * r;
      sc[i] = 0.4 + Math.random() * 1.4;
      sp[i] = 0.4 + Math.random() * 1.2;
    }
    return [pos, sc, sp];
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uColor: { value: new THREE.Color("#B9AEFF") },
    }),
    [gl]
  );
  useFrame((_, dt) => {
    uniforms.uTime.value += Math.min(dt, 0.05);
  });

  return (
    <points rotation={[0.35, 0, -0.18]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={pointsVertex}
        fragmentShader={pointsFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <Core />
    </Canvas>
  );
}
