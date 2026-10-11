"use client";

import {Canvas,useFrame,useLoader,useThree} from "@react-three/fiber";
import {Suspense,useEffect,useRef} from "react";
import * as THREE from "three";
import LiquidSurface,{LiquidScreen} from "./LiquidSurface";
import {platforms as ecosystem} from "@/lib/site-content";
const platforms=ecosystem.filter(p=>p.image).slice(0,4);

type Props={progress:{current:number};pointer:{current:{x:number;y:number}};active:boolean;paused:boolean;highlighted:number;onReady:()=>void;onLost:()=>void};
const accents=["#71bcff","#49e5bd","#ff8273","#edbd68"];
const positions=[[-1.5,1.25,.1],[1.4,1.1,-.15],[-1.35,-1.12,.25],[1.55,-1.25,0]];

function Worlds({progress,pointer,highlighted,paused,onReady}:Pick<Props,"progress"|"pointer"|"highlighted"|"paused"|"onReady">){
 const assembly=useRef<THREE.Group>(null),cards=useRef<(THREE.Group|null)[]>([]),painted=useRef(false),time=useRef(0);
 const images=useLoader(THREE.TextureLoader,platforms.map(p=>p.image));
 useEffect(()=>{images.forEach(image=>{image.colorSpace=THREE.SRGBColorSpace;image.needsUpdate=true;});},[images]);
 useFrame(({camera},dt)=>{
  if(!assembly.current)return;
  if(!paused)time.current+=Math.min(dt,.05);
  const align=THREE.MathUtils.smoothstep(progress.current,0,.6),dive=THREE.MathUtils.smoothstep(progress.current,.22,1);
  assembly.current.position.x=THREE.MathUtils.lerp(2.25,0,align);
  assembly.current.rotation.y=THREE.MathUtils.damp(assembly.current.rotation.y,(-.12+pointer.current.x*.13)*(1-align),4,dt);
  assembly.current.rotation.x=THREE.MathUtils.damp(assembly.current.rotation.x,-pointer.current.y*.08*(1-align),4,dt);
  camera.position.z=THREE.MathUtils.lerp(10,3.6,dive);
  cards.current.forEach((card,i)=>{
   if(!card)return;
   const selected=highlighted===i;
   card.position.y=THREE.MathUtils.damp(card.position.y,positions[i][1]+Math.sin(time.current*.55+i)*.06,4,dt);
   card.position.z=THREE.MathUtils.damp(card.position.z,positions[i][2]+(selected?.65:0),4,dt);
   const scale=THREE.MathUtils.damp(card.scale.x,selected?1.09:1,4,dt);
   card.scale.setScalar(scale);
  });
 });
 return <group ref={assembly} position={[2.25,.15,0]}>
  <mesh position={[0,0,-1.1]} rotation={[.2,.18,-.4]}><torusGeometry args={[3.05,.018,12,100]}/><meshBasicMaterial color="#597ddd" transparent opacity={.45}/></mesh>
  <mesh position={[0,0,-1.2]} rotation={[-.3,.5,.25]}><torusGeometry args={[3.25,.009,8,100]}/><meshBasicMaterial color="#73e3d0" transparent opacity={.3}/></mesh>
  {platforms.map((product,i)=><group key={product.slug} ref={el=>{cards.current[i]=el;}} position={positions[i] as [number,number,number]} rotation={[i<2?.07:-.06,i%2?-.15:.12,i%2?-.05:.045]}>
   <mesh position={[0,0,-.07]}><boxGeometry args={[2.88,2.2,.13]}/><meshPhysicalMaterial color={accents[i]} metalness={.55} roughness={.25} clearcoat={1}/></mesh>
   <mesh position={[0,.015,.005]}><planeGeometry args={[2.8,2.12]}/><meshBasicMaterial color="#151d2a"/></mesh>
   <LiquidScreen image={images[i]} index={i} highlighted={highlighted} pointer={pointer} progress={progress} paused={paused} onPaint={()=>{if(i===3&&!painted.current){painted.current=true;requestAnimationFrame(onReady);}}}/>
   {[0,1,2].map(dot=><mesh key={dot} position={[-1.27+dot*.085,1.005,.022]}><circleGeometry args={[.022,12]}/><meshBasicMaterial color={dot===0?accents[i]:"#6c7583"} toneMapped={false}/></mesh>)}
  </group>)}
 </group>;
}
function FramePump({active}:{active:boolean}){
 const invalidate=useThree(state=>state.invalidate);
 useEffect(()=>{
  if(!active)return;
  const timer=window.setInterval(()=>invalidate(),1000/30);
  invalidate();
  return()=>window.clearInterval(timer);
 },[active,invalidate]);
 return null;
}
export default function ProductDisplay(props:Props){
 return <Canvas frameloop="demand" dpr={1} camera={{position:[0,0,10],fov:43}} gl={{alpha:true,antialias:true,powerPreference:"low-power"}} onCreated={({gl})=>gl.domElement.addEventListener("webglcontextlost",props.onLost,{once:true})}>
  <FramePump active={props.active}/><LiquidSurface pointer={props.pointer} progress={props.progress} paused={props.paused}/><ambientLight intensity={1.8}/><directionalLight position={[-4,5,6]} intensity={5} color="#c2d4ff"/><directionalLight position={[5,2,3]} intensity={4} color="#72efcf"/>
  <Suspense fallback={null}><Worlds {...props}/></Suspense>
 </Canvas>;
}
