"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import {Component,type ReactNode,useEffect,useRef,useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {HERO_MEDIA} from "@/lib/media";
gsap.registerPlugin(ScrollTrigger);
const Water=dynamic(()=>import("./CorporateWater"),{ssr:false});
class WaterBoundary extends Component<{children:ReactNode;onError:()=>void},{failed:boolean}>{
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 componentDidCatch(){this.props.onError();}
 render(){return this.state.failed?null:this.props.children;}
}
export default function InteractiveOpening(){
 const root=useRef<HTMLElement>(null),pointer=useRef({x:0,y:0}),progress=useRef(0);
 const video=useRef<HTMLVideoElement>(null);
 const [videoFailed,setVideoFailed]=useState(false);
 const [available,setAvailable]=useState(false),[failed,setFailed]=useState(false),[ready,setReady]=useState(false),[active,setActive]=useState(true),[paused,setPaused]=useState(false),[reduced,setReduced]=useState(true);
 useEffect(()=>{
  const motion=matchMedia("(prefers-reduced-motion: reduce)"),desktop=matchMedia("(min-width: 901px)");
  const update=()=>{
   setReduced(motion.matches);setReady(false);
   if(motion.matches||!desktop.matches||HERO_MEDIA.video){setAvailable(false);return;}
   try{const canvas=document.createElement("canvas"),gl=canvas.getContext("webgl2");setAvailable(Boolean(gl));gl?.getExtension("WEBGL_lose_context")?.loseContext();}catch{setAvailable(false);}
  };
  update();motion.addEventListener("change",update);desktop.addEventListener("change",update);
  let inView=true;
  const visibility=()=>setActive(inView&&!document.hidden);
  const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;visibility();});
  if(root.current)observer.observe(root.current);
  document.addEventListener("visibilitychange",visibility);
  const media=gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)",()=>{
   const context=gsap.context(()=>{
    gsap.from(".hero-line > span",{yPercent:115,rotation:3,duration:1.3,stagger:.13,ease:"power4.out",clearProps:"all"});
    gsap.from(".corporate-hero-copy > p,.corporate-hero-actions",{y:20,opacity:0,duration:.8,stagger:.1,delay:.45,ease:"power3.out",clearProps:"all"});
    gsap.to(".corporate-water-field",{yPercent:10,ease:"none",scrollTrigger:{trigger:root.current,start:"top top",end:"bottom top",scrub:.5,onUpdate:self=>{progress.current=self.progress;}}});
   },root);
   return()=>{context.revert();progress.current=0;};
  });
  return()=>{observer.disconnect();media.revert();motion.removeEventListener("change",update);desktop.removeEventListener("change",update);document.removeEventListener("visibilitychange",visibility);};
 },[]);
 const stop=paused||reduced;
 useEffect(()=>{const element=video.current;if(!element)return;if(stop||!active)element.pause();else void element.play().catch(()=>setVideoFailed(true));},[stop,active,videoFailed]);
 const loseWater=()=>{setFailed(true);setReady(false);};
 return <section ref={root} id="top" className={`home-opening corporate-opening${stop||!active?" motion-paused":""}${ready?" water-ready":""}`} aria-labelledby="home-heading" onPointerMove={event=>{const rect=event.currentTarget.getBoundingClientRect();pointer.current={x:(event.clientX-rect.left)/rect.width*2-1,y:1-(event.clientY-rect.top)/rect.height*2};}}>
  <div className="corporate-water-field" aria-hidden="true">
   <div className="liquid-light"><span className="liquid-sheet sheet-one"/><span className="liquid-sheet sheet-two"/><span className="liquid-sheet sheet-three"/></div>
   {HERO_MEDIA.video&&!videoFailed&&!reduced&&<video ref={video} className="corporate-hero-video" src={HERO_MEDIA.video} poster={HERO_MEDIA.poster} muted loop playsInline preload="metadata" onError={()=>setVideoFailed(true)}/>}
   {HERO_MEDIA.video&&reduced&&HERO_MEDIA.poster&&<img className="corporate-hero-video" src={HERO_MEDIA.poster} alt=""/>}
   {available&&!failed&&<div className="corporate-water-canvas"><WaterBoundary onError={loseWater}><Water pointer={pointer} progress={progress} active={active} paused={stop} onReady={()=>setReady(true)} onLost={loseWater}/></WaterBoundary></div>}
  </div>
  <div className="corporate-hero-shade" aria-hidden="true"/>
  <div className="corporate-hero-meta"><span><i/> Independent thinking. Shared ambition.</span><span>Flurzi Limited / Technology company</span></div>
  <div className="corporate-hero-copy"><h1 id="home-heading"><span className="hero-line"><span>Technology for</span></span><span className="hero-line"><span>what comes <em>next.</em></span></span></h1><p>We develop and operate digital platforms for business and everyday life. Different possibilities. One company behind them.</p><div className="corporate-hero-actions"><Link className="corporate-primary" href="/products">Explore our ecosystem <span aria-hidden="true">↗</span></Link><Link className="corporate-secondary" href="/about">Meet Flurzi <span aria-hidden="true">↗</span></Link></div></div>
  <div className="hero-company-signature" aria-hidden="true"><span>THE COMPANY BEHIND THE POSSIBILITIES</span><strong>FLURZI</strong></div>
  <div className="corporate-hero-bottom"><span>Business · Culture · Everyday life</span><button type="button" onClick={()=>setPaused(value=>!value)} aria-pressed={stop} disabled={reduced}>{reduced?"Reduced motion enabled":paused?"Resume water motion":"Pause water motion"}<span aria-hidden="true">{stop?"▷":"Ⅱ"}</span></button><a href="#company-introduction">Scroll to discover <span aria-hidden="true">↓</span></a></div>
 </section>;
}
