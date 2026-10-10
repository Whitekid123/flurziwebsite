"use client";
import {useFrame} from "@react-three/fiber";
import {useMemo,useRef} from "react";
import * as THREE from "three";

export type LiquidControls={
 pointer:{current:{x:number;y:number}};
 progress:{current:number};
 paused:boolean;
};
const vertexShader=`
 varying vec2 vUv;
 void main(){
  vUv=uv;
  gl_Position=vec4(position.xy,0.999,1.0);
 }
`;
const fragmentShader=`
 precision highp float;
 varying vec2 vUv;
 uniform float uTime;
 uniform float uAspect;
 uniform float uProgress;
 uniform vec4 uRipples[5];


 void main(){
  vec2 p=(vUv-.5)*vec2(uAspect,1.0);
  float t=uTime*.42;
  float a=p.x*9.0+p.y*6.0+t;
  float b=-p.x*6.0+p.y*13.0-t*.8;
  float c=p.x*15.0-p.y*9.0+t*.55;
  float h=sin(a)*.23+sin(b)*.17+sin(c)*.07;
  vec2 slope=cos(a)*vec2(9.0,6.0)*.23+cos(b)*vec2(-6.0,13.0)*.17+cos(c)*vec2(15.0,-9.0)*.07;
  float age=uTime-uRipples[0].z;
  if(age>=0.0&&age<4.0){
   vec2 fromPointer=p-uRipples[0].xy;
   float d=length(fromPointer);
   float ripple=cos(d*32.0-age*7.0)*exp(-d*2.0-age*1.1)*uRipples[0].w;
   h+=ripple*.1;
   slope+=normalize(fromPointer+vec2(.001))*ripple*2.0;
  }
  vec3 n=normalize(vec3(-slope*.28,1.0));
  vec3 light=normalize(vec3(-.35,.6,1.0));
  float shine=pow(max(dot(n,light),0.0),28.0);
  float crest=pow(max(0.0,1.0-abs(sin(h*6.0+p.y*3.0))),15.0);
  float pool=smoothstep(-.5,.6,p.x);
  vec3 navy=vec3(.025,.075,.20);
  vec3 blue=vec3(.015,.19,.44);
  vec3 cyan=vec3(.06,.71,.87);
  vec3 lime=vec3(.49,.66,.06);
  vec3 colour=mix(navy,blue,(h*.4+.4)*pool);
  colour+=cyan*(shine*.44+crest*.13)*pool;
  colour+=lime*pow(shine,2.0)*.13*smoothstep(.1,.85,vUv.y);
  colour*=mix(.7,1.18,pool);
  colour+=cyan*uProgress*.035;
  gl_FragColor=vec4(colour,1.0);
 }
`;

/** Full-screen water shading in the existing WebGL context; no extra canvas. */
export default function LiquidSurface({pointer,progress,paused}:LiquidControls){
 const material=useRef<THREE.ShaderMaterial>(null);
 const last=useRef({x:0,y:0}),lastDrop=useRef(-1);
 const uniforms=useMemo(()=>({
  uTime:{value:0},uAspect:{value:1},uProgress:{value:0},
  uRipples:{value:Array.from({length:5},()=>new THREE.Vector4(0,0,-100,0))}
 }),[]);
 useFrame((state,delta)=>{
  const values=material.current?.uniforms;
  if(paused||!values)return;
  values.uTime.value+=Math.min(delta,.05);
  const aspect=state.size.width/state.size.height;
  values.uAspect.value=aspect;values.uProgress.value=progress.current;
  const {x,y}=pointer.current;
  if(Math.hypot(x-last.current.x,y-last.current.y)>.025&&values.uTime.value-lastDrop.current>.09){
   values.uRipples.value[0].set(x*.5*aspect,y*.5,values.uTime.value,1);
   lastDrop.current=values.uTime.value;last.current={x,y};
  }
 });
 return <mesh frustumCulled={false} renderOrder={-100}>
  <planeGeometry args={[2,2]}/>
  <shaderMaterial ref={material} uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} depthTest={false} depthWrite={false} toneMapped={false}/>
 </mesh>;
}

const screenVertex=`
 varying vec2 vUv;
 void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}
`;
const screenFragment=`
 varying vec2 vUv;
 uniform sampler2D uImage;
 uniform float uTime;
 uniform float uStrength;
 uniform vec2 uPointer;
 void main(){
  vec2 uv=vUv;
  vec2 d=uv-uPointer;
  float radius=length(d);
  float ripple=sin(radius*38.0-uTime*3.3)*exp(-radius*3.0);
  vec2 flow=vec2(
   sin(uv.y*13.0+uTime*.8+sin(uv.x*8.0-uTime*.45)),
   cos(uv.x*14.0-uTime*.7+sin(uv.y*9.0+uTime*.4))
  );
  uv+=flow*uStrength+normalize(d+vec2(.0001))*ripple*uStrength*.65;
  uv=clamp(uv,vec2(.002),vec2(.998));
  gl_FragColor=texture2D(uImage,uv);
  #include <colorspace_fragment>
 }
`;
export function LiquidScreen({image,index,highlighted,pointer,progress,paused,onPaint}:LiquidControls&{
 image:THREE.Texture;index:number;highlighted:number;onPaint?:()=>void;
}){
 const material=useRef<THREE.ShaderMaterial>(null);
 const uniforms=useMemo(()=>({
  uImage:{value:image},uTime:{value:index*.8},uStrength:{value:.004},uPointer:{value:new THREE.Vector2(.5,.5)}
 }),[image,index]);
 useFrame((_,delta)=>{
  const values=material.current?.uniforms;
  if(paused||!values)return;
  values.uTime.value+=Math.min(delta,.05);
  const strength=.004+(highlighted===index?.013:0)+Math.sin(Math.PI*progress.current)*.026;
  values.uStrength.value=THREE.MathUtils.damp(values.uStrength.value,strength,4,delta);
  values.uPointer.value.lerp(new THREE.Vector2(pointer.current.x*.5+.5,pointer.current.y*.5+.5),.06);
 });
 return <mesh position={[0,-.055,.015]} onAfterRender={onPaint}>
  <planeGeometry args={[2.7,1.95]}/>
  <shaderMaterial ref={material} uniforms={uniforms} vertexShader={screenVertex} fragmentShader={screenFragment} toneMapped={false}/>
 </mesh>;
}

