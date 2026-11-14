"use client";
import {useEffect} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

/** Five choreographed moments. Every tween is `from`-based, so reduced-motion
    and no-JS render the finished state. M1 hero assembly · M2 statement line
    scrub · M3 directions contour + rail pin · M4 ecosystem stem draw + panel
    crossfade · M5 progress rail draw + footer invite rise. */
export default function HqMotion(){
 useEffect(()=>{
  const mm=gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)",()=>{
   const ctx=gsap.context(()=>{
    // M1 — hero assembly.
    gsap.from(".hq-hero-line > span",{yPercent:115,duration:1.25,stagger:.13,ease:"power4.out",clearProps:"all"});
    gsap.from(".hq-hero-copy > p,.hq-hero-actions",{y:22,opacity:0,duration:.85,stagger:.1,delay:.5,ease:"power3.out",clearProps:"all"});
    gsap.from(".hq-hero-meta,.hq-hero-bottom",{opacity:0,duration:1,delay:.3,ease:"power2.out",clearProps:"all"});
    // M2 — statement line scrub.
    gsap.utils.toArray<HTMLElement>(".hq-statement h2 > span").forEach((line,i)=>gsap.from(line,{x:i%2?-60:60,y:30,opacity:.3,ease:"none",scrollTrigger:{trigger:line,start:"top 96%",end:"top 42%",scrub:.7}}));
    gsap.from(".hq-statement-rule",{scaleX:0,ease:"none",scrollTrigger:{trigger:".hq-statement-bottom",start:"top 95%",end:"top 60%",scrub:.6}});
    // M3 — directions contour draw + rail chapter pin.
    gsap.fromTo(".hq-contours path",{strokeDasharray:1,strokeDashoffset:1},{strokeDashoffset:0,stagger:.03,ease:"none",scrollTrigger:{trigger:".hq-directions",start:"top 80%",end:"top 15%",scrub:.8}});
    gsap.utils.toArray<HTMLElement>(".hq-direction-chapter").forEach((chapter,i)=>{
     gsap.from(chapter.querySelector("h3"),{y:45,opacity:.2,ease:"none",scrollTrigger:{trigger:chapter,start:"top 92%",end:"top 48%",scrub:.6}});
     gsap.from(chapter.querySelector(".hq-direction-track i"),{scaleX:0,ease:"none",scrollTrigger:{trigger:chapter,start:"top 75%",end:"bottom 45%",scrub:.5}});
     ScrollTrigger.create({trigger:chapter,start:"top 55%",end:"bottom 55%",toggleClass:{targets:'.hq-directions-index a[href="#hq-direction-'+i+'"]',className:"is-current"}});
    });
    // M4 — ecosystem stem draw + panel crossfade.
    gsap.from(".hq-parent-stem",{scaleY:0,ease:"none",scrollTrigger:{trigger:".hq-portfolio-parent",start:"top 85%",end:"bottom 60%",scrub:.5}});
    gsap.from(".hq-branch",{y:30,opacity:0,stagger:.06,duration:.7,ease:"power3.out",clearProps:"all",scrollTrigger:{trigger:".hq-branches",start:"top 92%",once:true}});
    // M5 — progress rail draw + footer invite rise.
    gsap.from(".hq-rail-stop",{y:34,opacity:0,stagger:.09,duration:.8,ease:"power3.out",clearProps:"all",scrollTrigger:{trigger:".hq-rail",start:"top 88%",once:true}});
    gsap.from(".footer-invite > a",{yPercent:55,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:".footer-invite",start:"top 92%",once:true},clearProps:"all"});
   });
   return()=>ctx.revert();
  });
  mm.add("(min-width: 1000px) and (prefers-reduced-motion: no-preference)",()=>{
   const ctx=gsap.context(()=>{
    gsap.to(".hq-hero-copy",{y:-55,ease:"none",scrollTrigger:{trigger:".hq-hero",start:"top top",end:"bottom top",scrub:.6}});
    gsap.to(".hq-contours svg",{y:25,rotation:-8,ease:"none",scrollTrigger:{trigger:".hq-directions",start:"top top",end:"bottom bottom",scrub:1}});
   });
   return()=>ctx.revert();
  });
  return()=>mm.revert();
 },[]);
 return null;
}
