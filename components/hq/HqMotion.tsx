"use client";
import {useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/** Choreographed opening and editorial reveals. Reduced-motion
    and no-JS render the finished state. M1 hero assembly · M2 statement line
    scrub · M3 directions contour + rail pin · M4 ecosystem stem draw + branch
    reveal · M5 progress rail draw. The footer invite rise is global (SiteMotion). */
export default function HqMotion(){
 useEffect(()=>{
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle("hq-motion-visible",entry.isIntersecting)),{threshold:.08});
  document.querySelectorAll(".hq-direction-chapter,.hq-rail-stop,.hq-purpose").forEach(el=>observer.observe(el));
  const mm=gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)",()=>{
   const ctx=gsap.context(()=>{
    // M1 — hero assembly.
    gsap.from(".hq-hero-line > span",{yPercent:115,duration:1.25,stagger:.13,ease:"power4.out",clearProps:"all"});
    gsap.from(".hq-hero-copy > p,.hq-hero-actions",{y:22,opacity:0,duration:.85,stagger:.1,delay:.5,ease:"power3.out",clearProps:"all"});
    gsap.from(".hq-hero-meta,.hq-hero-bottom",{opacity:0,duration:1,delay:.3,ease:"power2.out",clearProps:"all"});
    gsap.from(".hq-hero-label,.hq-hero-introduction,.hq-discover-orbit",{y:25,opacity:0,duration:1,stagger:.12,delay:.7,ease:"power3.out",clearProps:"all"});
    // The seven independent pieces resolve into one company mark.
    gsap.from(".hq-manifesto-word",{opacity:.2,stagger:.16,ease:"none",scrollTrigger:{trigger:".hq-manifesto-layout",start:"top 75%",end:"bottom 75%",scrub:.6}});
    gsap.from(".hq-mark-piece",{scale:.25,borderRadius:"50%",stagger:.06,ease:"none",scrollTrigger:{trigger:".hq-manifesto-layout",start:"top 95%",end:"top 35%",scrub:1}});
    gsap.to(".hq-seven-mark",{rotation:51.428,ease:"none",scrollTrigger:{trigger:".hq-manifesto",start:"top bottom",end:"bottom top",scrub:1}});
    // M3 — directions contour draw + rail chapter pin.
    gsap.fromTo(".hq-contours path",{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,stagger:.03,ease:"none",scrollTrigger:{trigger:".hq-directions",start:"top 80%",end:"top 15%",scrub:.8}});
    gsap.utils.toArray<HTMLElement>(".hq-direction-chapter").forEach((chapter,i)=>{
     gsap.from(chapter.querySelector("h3"),{y:45,opacity:.2,ease:"none",scrollTrigger:{trigger:chapter,start:"top 92%",end:"top 48%",scrub:.6}});
     gsap.from(chapter.querySelector(".hq-direction-track i"),{scaleX:0,ease:"none",scrollTrigger:{trigger:chapter,start:"top 75%",end:"bottom 45%",scrub:.5}});
     ScrollTrigger.create({trigger:chapter,start:"top 55%",end:"bottom 55%",toggleClass:{targets:'.hq-directions-index a[href="#hq-direction-'+i+'"]',className:"is-current"}});
    });
    // The portfolio is revealed as three editorial worlds, followed by the next chapters.
    gsap.utils.toArray<HTMLElement>(".hq-world").forEach(world=>{
     gsap.from(world.querySelector(".hq-world-art"),{clipPath:"inset(18% 0 18% 0)",duration:1.3,ease:"power3.out",clearProps:"clipPath",scrollTrigger:{trigger:world,start:"top 85%",once:true}});
     gsap.from(world.querySelector(".platform-artwork"),{scale:1.16,ease:"none",scrollTrigger:{trigger:world,start:"top bottom",end:"bottom top",scrub:1}});
    });
    gsap.utils.toArray<HTMLElement>(".hq-venture").forEach(row=>gsap.from(row,{y:28,opacity:0,duration:.7,ease:"power3.out",clearProps:"all",scrollTrigger:{trigger:row,start:"top 94%",once:true}}));
    // M5 — progress rail draw.
    gsap.from(".hq-rail-stop",{y:34,opacity:0,stagger:.09,duration:.8,ease:"power3.out",clearProps:"all",scrollTrigger:{trigger:".hq-rail",start:"top 88%",once:true}});
   });
   return()=>ctx.revert();
  });
  mm.add("(min-width: 1000px) and (prefers-reduced-motion: no-preference)",()=>{
   const ctx=gsap.context(()=>{
    const worlds=gsap.utils.toArray<HTMLElement>(".hq-world");
    worlds.slice(0,-1).forEach((world,i)=>gsap.to(world,{scale:.97,ease:"none",scrollTrigger:{trigger:worlds[i+1],start:"top 95%",end:"top 115px",scrub:.7}}));
    const opening=gsap.timeline({scrollTrigger:{trigger:".hq-corporate-opening",start:"top top",end:"bottom bottom",scrub:1}});
    opening.to(".hq-hero-line:first-child",{xPercent:-4,y:-35,ease:"none"},0)
     .to(".hq-hero-line:last-child",{xPercent:6,y:-35,ease:"none"},0)
     .to(".hq-hero-introduction,.hq-hero-label",{y:-45,opacity:0,ease:"none"},0)
     .to(".hq-water-field",{scale:1.35,rotation:-5,ease:"none"},0)
     .to(".hq-discover-orbit",{y:-75,rotation:70,ease:"none"},0);

    gsap.to(".hq-contours svg",{y:25,rotation:-8,ease:"none",scrollTrigger:{trigger:".hq-directions",start:"top top",end:"bottom bottom",scrub:1}});
   });
   return()=>ctx.revert();
  });
  return()=>{observer.disconnect();mm.revert();};
 },[]);
 return null;
}
