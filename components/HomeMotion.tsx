"use client";
import {useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function HomeMotion(){useEffect(()=>{
 const mm=gsap.matchMedia();
 mm.add("(prefers-reduced-motion: no-preference)",()=>{
  const ctx=gsap.context(()=>{
   gsap.utils.toArray<HTMLElement>(".company-statement h2>span").forEach((line,i)=>gsap.from(line,{x:i%2?-65:65,y:35,opacity:.35,ease:"none",scrollTrigger:{trigger:line,start:"top 96%",end:"top 43%",scrub:.7}}));
   gsap.from(".statement-rule",{scaleX:0,ease:"none",scrollTrigger:{trigger:".statement-bottom",start:"top 95%",end:"top 60%",scrub:.6}});
   gsap.fromTo(".direction-contours path",{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,stagger:.03,ease:"none",scrollTrigger:{trigger:".corporate-directions",start:"top 80%",end:"top 15%",scrub:.8}});
   gsap.utils.toArray<HTMLElement>(".direction-chapter").forEach((chapter,i)=>{
    gsap.from(chapter.querySelector("h3"),{y:45,opacity:.2,ease:"none",scrollTrigger:{trigger:chapter,start:"top 92%",end:"top 48%",scrub:.6}});
    gsap.from(chapter.querySelector(".direction-track i"),{scaleX:0,ease:"none",scrollTrigger:{trigger:chapter,start:"top 75%",end:"bottom 45%",scrub:.5}});
    ScrollTrigger.create({trigger:chapter,start:"top 55%",end:"bottom 55%",toggleClass:{targets:'.directions-index a[href="#home-direction-'+i+'"]',className:"is-current"}});
   });
   gsap.from(".parent-stem",{scaleY:0,ease:"none",scrollTrigger:{trigger:".portfolio-parent",start:"top 85%",end:"bottom 60%",scrub:.5}});
   gsap.from(".portfolio-branch",{y:30,opacity:0,stagger:.07,duration:.7,ease:"power3.out",clearProps:"all",scrollTrigger:{trigger:".portfolio-branches",start:"top 92%",once:true}});
  });
  return()=>ctx.revert();
 });
 mm.add("(min-width: 1000px) and (prefers-reduced-motion: no-preference)",()=>{
  const ctx=gsap.context(()=>{
   gsap.to(".corporate-hero-copy",{y:-55,ease:"none",scrollTrigger:{trigger:".corporate-opening",start:"top top",end:"bottom top",scrub:.6}});
   gsap.fromTo(".company-statement",{clipPath:"inset(0% 3% 0% 3%)"},{clipPath:"inset(0% 0% 0% 0%)",ease:"none",scrollTrigger:{trigger:".company-statement",start:"top bottom",end:"top 30%",scrub:.6}});
   gsap.to(".direction-contours svg",{y:25,rotation:-8,ease:"none",scrollTrigger:{trigger:".corporate-directions",start:"top top",end:"bottom bottom",scrub:1}});
  });return()=>ctx.revert();
 });
 return()=>mm.revert();
 },[]);return null}
