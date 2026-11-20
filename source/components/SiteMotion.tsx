"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/** Global motion companion to HqMotion (home-only). Two jobs: secondary-page
    intro assembly + footer invite rise on every page. Everything from-based,
    reduced-motion gated, static end-state fallback. */
export default function SiteMotion(){
 const path=usePathname();
 useEffect(()=>{
  const media=gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)",()=>{
   const ctx=gsap.context(()=>{
    if(!document.querySelector(".cinema-page")&&document.querySelector(".hq-page-intro,.hq-product-intro"))gsap.from(".hq-page-intro .hq-eyebrow,.hq-page-intro h1,.hq-page-intro>p,.hq-product-intro .hq-eyebrow,.hq-product-intro h1,.hq-product-intro-bottom",{y:28,opacity:0,duration:.85,stagger:.09,ease:"power3.out",clearProps:"all"});
    gsap.from(".footer-invite>a",{yPercent:55,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:".footer-invite",start:"top 92%",once:true},clearProps:"all"});
   });
   return()=>ctx.revert();
  });
  let cancelled=false;document.fonts.ready.then(()=>{if(!cancelled){window.__lenis?.resize();ScrollTrigger.refresh();}});
  return()=>{cancelled=true;media.revert();};
 },[path]);
 return null;
}
