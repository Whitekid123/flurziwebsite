"use client";
import {Canvas,useFrame,useThree} from "@react-three/fiber";
import {useEffect,useRef} from "react";
import LiquidSurface,{type LiquidControls} from "./LiquidSurface";
type Props=LiquidControls&{active:boolean;onReady:()=>void;onLost:()=>void};
function RenderControl({active,paused,onReady,onLost}:Pick<Props,"active"|"paused"|"onReady"|"onLost">){
 const invalidate=useThree(state=>state.invalidate),canvas=useThree(state=>state.gl.domElement),painted=useRef(false);
 useFrame(()=>{if(!painted.current){painted.current=true;requestAnimationFrame(onReady);}});
 useEffect(()=>{const lost=(event:Event)=>{event.preventDefault();onLost();};canvas.addEventListener("webglcontextlost",lost);return()=>canvas.removeEventListener("webglcontextlost",lost);},[canvas,onLost]);
 useEffect(()=>{invalidate();if(!active||paused)return;const timer=window.setInterval(invalidate,1000/30);return()=>window.clearInterval(timer);},[active,paused,invalidate]);
 return null;
}
/** Decorative water only: no product windows, logo geometry or model downloads. */
export default function CorporateWater(props:Props){return <Canvas frameloop="demand" dpr={1} gl={{alpha:true,antialias:false,powerPreference:"low-power"}}><RenderControl {...props}/><LiquidSurface pointer={props.pointer} progress={props.progress} paused={props.paused}/></Canvas>;}
