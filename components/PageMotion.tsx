"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
/** Separate cinematic motion vocabulary for secondary pages. Homepage remains untouched. */
export default function PageMotion(){
  const pathname=usePathname();
  useEffect(()=>{
    const root=document.querySelector<HTMLElement>(".cinema-page");
    if(!root)return;
    const media=gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)",()=>{
      const ctx=gsap.context(()=>{
        const intro=root.querySelector<HTMLElement>(".hq-page-intro,.hq-product-intro");
        if(intro){
          const targets=intro.querySelectorAll<HTMLElement>(".hq-eyebrow,h1,:scope > p,.hq-product-intro-bottom,.hq-detail-actions,.hq-back-link");
          gsap.fromTo(targets,{y:45,opacity:0,filter:"blur(4px)"},{y:0,opacity:1,filter:"blur(0px)",duration:1.15,stagger:.13,ease:"power4.out",clearProps:"all",delay:.12});
        }
        root.querySelectorAll<HTMLElement>("[data-cinema-image]").forEach((el,index)=>{
          const img=el.querySelector<HTMLElement>("img");
          gsap.fromTo(el,{clipPath:"inset(0 0 100% 0)",y:60},{clipPath:"inset(0 0 0% 0)",y:0,duration:1.45,delay:.24+index*.17,ease:"power4.inOut",clearProps:"clipPath,transform"});
          if(img)gsap.fromTo(img,{scale:1.17},{scale:1,delay:.24+index*.17,duration:1.65,ease:"power3.out",clearProps:"transform"});
        });
        const art=root.querySelector<HTMLElement>(".cinema-art");
        if(art && window.matchMedia("(min-width: 901px)").matches){
          gsap.fromTo(art,{yPercent:0},{yPercent:15,ease:"none",scrollTrigger:{trigger:root.querySelector(".hq-page-intro")||art,start:"top top",end:"bottom top",scrub:true}});
        }
        root.querySelectorAll<HTMLElement>("[data-cinema-chapter]").forEach(chapter=>{
          const lines=chapter.querySelectorAll<HTMLElement>(".cinema-interlude-lines > span");
          gsap.fromTo(lines,{yPercent:100,opacity:.1},{yPercent:0,opacity:1,stagger:.12,ease:"none",scrollTrigger:{trigger:chapter,start:"top 83%",end:"center 40%",scrub:true}});
        });
        root.querySelectorAll<HTMLElement>(".hq-platform-row,.hq-scope-grid article,.hq-opportunity-grid article,.hq-company-person,.hq-company-timeline li,.hq-stage-guide dl>div,.hq-direction-platforms article,.hq-faq-group,.hq-policy-content section,.hq-innovation-direction,.hq-mission-grid article").forEach(item=>{
          gsap.fromTo(item,{y:46,opacity:.5},{y:0,opacity:1,duration:.95,ease:"power3.out",clearProps:"all",scrollTrigger:{trigger:item,start:"top 92%",once:true}});
        });
        root.querySelectorAll<HTMLElement>("[data-cinema-photo]").forEach(item=>{
          const image=item.querySelector<HTMLElement>("img");
          if(image && window.matchMedia("(min-width: 700px)").matches){
            gsap.fromTo(image,{yPercent:-6,scale:1.08},{yPercent:6,scale:1.08,ease:"none",scrollTrigger:{trigger:item,start:"top bottom",end:"bottom top",scrub:true}});
          }
        });
      },root);
      return()=>ctx.revert();
    });
    let cancelled=false;
    document.fonts.ready.then(()=>{if(!cancelled)ScrollTrigger.refresh();});
    return()=>{cancelled=true;media.revert();};
  },[pathname]);
  return null;
}
