"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type SceneProps={progress:{current:number};onReady:()=>void};
function Portal({progress,onReady}:SceneProps){
 const group=useRef<THREE.Group>(null);
 const rings=useRef<THREE.Mesh[]>([]);
 const painted=useRef(false);
 const geometry=useMemo(()=>new THREE.TorusGeometry(2.05,.075,16,160),[]);
 useFrame(({clock,pointer},delta)=>{
  if(!group.current)return;
  const p=progress.current;
  group.current.rotation.y=THREE.MathUtils.damp(group.current.rotation.y,-.35+pointer.x*.22+p*.8,3,delta);
  group.current.rotation.x=THREE.MathUtils.damp(group.current.rotation.x,.3-pointer.y*.16-p*.55,3,delta);
  group.current.rotation.z=-.5+clock.elapsedTime*.045+p*.9;
  rings.current.forEach((ring,i)=>{
   ring.rotation.x=Math.sin(i*.24+clock.elapsedTime*.14)*.45+p*(i-5)*.1;
   ring.rotation.y=Math.cos(i*.19+clock.elapsedTime*.12)*.32;
   ring.position.z=(i-5)*(.11+p*.24);
   const scale=1+Math.sin(i*.45)*.08;
   ring.scale.set(scale,scale*.79,1);
  });
 });
 return <group ref={group}>
  {Array.from({length:13},(_,i)=><mesh key={i} ref={el=>{if(el)rings.current[i]=el;}} geometry={geometry} onAfterRender={()=>{if(!painted.current){painted.current=true;requestAnimationFrame(onReady);}}}>
   <meshPhysicalMaterial color={i%4===0?"#4cceb0":"#b6d4cc"} metalness={.72} roughness={.2} clearcoat={1} clearcoatRoughness={.15} emissive="#2dd4bf" emissiveIntensity={i%4===0?.14:.01}/>
  </mesh>)}
 </group>;
}
export default function HeroMonogram({active=true,progress,onReady}:SceneProps&{active?:boolean}){
 return <Canvas frameloop={active?"always":"never"} dpr={[1,1.5]} camera={{position:[0,0,7.7],fov:43}} gl={{alpha:true,antialias:true,powerPreference:"low-power"}}>
  <ambientLight intensity={1.1}/>
  <directionalLight position={[-4,4,5]} intensity={7} color="#f0fffa"/>
  <directionalLight position={[5,0,3]} intensity={5} color="#a5ffdf"/>
  <directionalLight position={[0,-4,-2]} intensity={5} color="#21a892"/>
  <pointLight position={[-2,2,1]} intensity={16} color="#ffffff"/>
  <Portal progress={progress} onReady={onReady}/>
 </Canvas>;
}
