"use client";
import {useEffect} from "react";
import Lenis from "lenis";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
declare global{interface Window{__lenis?:Lenis;}}
export default function SmoothScroll(){
 useEffect(()=>{
  const preference=matchMedia("(prefers-reduced-motion: reduce)");
  let lenis:Lenis|undefined;
  const tick=(time:number)=>lenis?.raf(time*1000);
  const stop=()=>{gsap.ticker.remove(tick);lenis?.destroy();if(window.__lenis===lenis)delete window.__lenis;lenis=undefined;};
  const update=()=>{stop();if(preference.matches)return;lenis=new Lenis({lerp:.1,anchors:true,smoothWheel:true});window.__lenis=lenis;lenis.on("scroll",ScrollTrigger.update);gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0);};
  update();preference.addEventListener("change",update);
  let cancelled=false;document.fonts.ready.then(()=>{if(!cancelled)ScrollTrigger.refresh();});
  return()=>{cancelled=true;preference.removeEventListener("change",update);stop();};
 },[]);
 return null;
}
