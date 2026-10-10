"use client";
import {useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function HomeMotion(){
 useEffect(()=>{
  const media=gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)",()=>{
   const context=gsap.context(()=>{
    gsap.from(".reveal-statement",{y:70,opacity:.25,duration:1,scrollTrigger:{trigger:".ecosystem-intro",start:"top 75%",end:"center 55%",scrub:1}});
    gsap.to(".ecosystem-symbol",{rotation:140,ease:"none",scrollTrigger:{trigger:".ecosystem-intro",start:"top bottom",end:"bottom top",scrub:1}});
    gsap.utils.toArray<HTMLElement>(".product-chapter").forEach(chapter=>{
     gsap.from(chapter.querySelectorAll(".chapter-brand,h3,.chapter-lead,.chapter-description,.chapter-link"),{y:35,opacity:0,stagger:.07,duration:.8,ease:"power3.out",scrollTrigger:{trigger:chapter,start:"top 65%",once:true},clearProps:"all"});
     gsap.fromTo(chapter.querySelector(".chapter-outline"),{yPercent:12},{yPercent:-12,ease:"none",scrollTrigger:{trigger:chapter,start:"top bottom",end:"bottom top",scrub:1}});
    });
    gsap.from(".company-logo",{y:35,opacity:.2,scale:.94,scrollTrigger:{trigger:".expanded-company",start:"top 80%",end:"center center",scrub:1}});
    gsap.utils.toArray<HTMLElement>(".venture-preview").forEach((card,i)=>gsap.from(card,{y:60+i*30,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:card,start:"top 87%",once:true},clearProps:"all"}));
    gsap.utils.toArray<HTMLElement>(".venture-art").forEach(art=>gsap.to(art,{y:-35,rotation:art.classList.contains("venture-art-0")?-6:8,ease:"none",scrollTrigger:{trigger:art.closest("article"),start:"top bottom",end:"bottom top",scrub:1}}));
   });
   return()=>context.revert();
  });
  return()=>media.revert();
 },[]);
 return null;
}
