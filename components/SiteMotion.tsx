"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
export default function SiteMotion(){
 const path=usePathname();
 useEffect(()=>{
  const media=gsap.matchMedia();
  const disposers:(()=>void)[]=[];
  media.add("(prefers-reduced-motion: no-preference)",()=>{
   const ctx=gsap.context(()=>{
    if(document.querySelector(".page-intro"))gsap.from(".page-intro .section-label,.page-intro h1,.page-intro>p,.product-intro-bottom",{y:30,opacity:0,clipPath:"inset(0% 0% 100% 0%)",stagger:.09,duration:.85,ease:"power3.out",clearProps:"all"});
    gsap.utils.toArray<HTMLElement>(".section-heading h2,.home-company h2,.home-next h2,.about-statement h2,.feature-section>h2").forEach(el=>gsap.from(el,{y:35,opacity:0,duration:.9,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 92%",once:true},clearProps:"all"}));
    gsap.utils.toArray<HTMLElement>(".project-image-link").forEach((el,index)=>{
     const image=el.querySelector(".product-preview-media");
     gsap.fromTo(el,{clipPath:"inset(10% 0% 0% 0%)"},{clipPath:"inset(0% 0% 0% 0%)",ease:"none",scrollTrigger:{trigger:el,start:"top 95%",end:"top 35%",scrub:.65}});
     gsap.fromTo(image,{yPercent:5,scale:1.12},{yPercent:0,scale:1,ease:"none",scrollTrigger:{trigger:el,start:"top bottom",end:"bottom 30%",scrub:.8}});
     gsap.from(el.closest("article"),{y:index%2?70:35,rotationX:4,transformPerspective:1200,duration:1,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 95%",once:true},clearProps:"transform"});
    });
    gsap.utils.toArray<HTMLElement>(".feature-list article,.company-principles article,.venture-list article").forEach(el=>gsap.from(el,{y:35,opacity:0,duration:.8,scrollTrigger:{trigger:el,start:"top 94%",once:true},clearProps:"all"}));
    gsap.from(".footer-invite>a",{yPercent:55,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:".footer-invite",start:"top 92%",once:true},clearProps:"all"});
   });
   return()=>ctx.revert();
  });
  media.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",()=>{
   const ctx=gsap.context(()=>{
    document.querySelectorAll<HTMLElement>(".project-image-link").forEach(el=>{
     const badge=el.querySelector<HTMLElement>(".project-view"),plane=el.querySelector<HTMLElement>(".project-image-motion");if(!badge||!plane)return;
     el.classList.add("has-follow-cursor");
     const x=gsap.quickTo(badge,"x",{duration:.3,ease:"power3.out"}),y=gsap.quickTo(badge,"y",{duration:.3,ease:"power3.out"});
     const tiltX=gsap.quickTo(plane,"rotationX",{duration:.5,ease:"power3.out"}),tiltY=gsap.quickTo(plane,"rotationY",{duration:.5,ease:"power3.out"});
     const move=(event:PointerEvent)=>{const r=el.getBoundingClientRect();x(event.clientX-r.left);y(event.clientY-r.top);tiltY((event.clientX-r.left-r.width/2)/r.width*4);tiltX(-(event.clientY-r.top-r.height/2)/r.height*4);};
     const enter=(event:PointerEvent)=>{move(event);gsap.to(badge,{autoAlpha:1,scale:1,duration:.25});};
     const leave=()=>{gsap.to(badge,{autoAlpha:0,scale:.8,duration:.2});tiltX(0);tiltY(0);};
     gsap.set(badge,{xPercent:-50,yPercent:-50,scale:.8,autoAlpha:0});
     el.addEventListener("pointermove",move);el.addEventListener("pointerenter",enter);el.addEventListener("pointerleave",leave);
     disposers.push(()=>{el.classList.remove("has-follow-cursor");el.removeEventListener("pointermove",move);el.removeEventListener("pointerenter",enter);el.removeEventListener("pointerleave",leave);});
    });
   });
   return()=>{disposers.splice(0).forEach(fn=>fn());ctx.revert();};
  });
  let cancelled=false;document.fonts.ready.then(()=>{if(!cancelled){window.__lenis?.resize();ScrollTrigger.refresh();}});
  return()=>{cancelled=true;media.revert();};
 },[path]);
 return null;
}
