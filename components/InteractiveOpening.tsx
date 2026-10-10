"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {Component,type ReactNode,useEffect,useRef,useState} from "react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {HERO_MEDIA} from "@/lib/media";
import {platforms} from "@/lib/site-content";
import ScrollMedia from "./ScrollMedia";

gsap.registerPlugin(ScrollTrigger);
const Display=dynamic(()=>import("./ProductDisplay"),{ssr:false});
class DisplayBoundary extends Component<{children:ReactNode},{failed:boolean}>{
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?null:this.props.children;}
}
export default function InteractiveOpening(){
 const root=useRef<HTMLElement>(null),progress=useRef(0),pointer=useRef({x:0,y:0});
 const [available,setAvailable]=useState(false),[ready,setReady]=useState(false),[active,setActive]=useState(true),[highlighted,setHighlighted]=useState(-1),[paused,setPaused]=useState(false);
 useEffect(()=>{
  const preference=matchMedia("(min-width: 901px) and (prefers-reduced-motion: no-preference)");
  const update=()=>{setReady(false);if(!preference.matches||HERO_MEDIA.video){setAvailable(false);return;}try{const canvas=document.createElement("canvas"),gl=canvas.getContext("webgl2");setAvailable(Boolean(gl));gl?.getExtension("WEBGL_lose_context")?.loseContext();}catch{setAvailable(false);}};
  update();preference.addEventListener("change",update);
  const observer=new IntersectionObserver(([entry])=>setActive(entry.isIntersecting));if(root.current)observer.observe(root.current);
  const move=(e:PointerEvent)=>{pointer.current={x:e.clientX/innerWidth*2-1,y:-(e.clientY/innerHeight*2-1)};};
  window.addEventListener("pointermove",move,{passive:true});
  const media=gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)",()=>{
   const ctx=gsap.context(()=>{
    gsap.from(".opening-word>span",{yPercent:110,rotation:3,stagger:.045,duration:1,ease:"power4.out",clearProps:"all"});
    gsap.from(".opening-meta,.home-introduction>p,.home-introduction>.quiet-link,.hero-products,.opening-bottom",{opacity:0,y:15,duration:.8,delay:.4,stagger:.08,clearProps:"all"});
    const intro=root.current?.querySelector<HTMLElement>(".hero-content");
    const tl=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root.current,start:"top top",end:"bottom bottom",scrub:.6,onUpdate:self=>{
     progress.current=self.progress;
     if(intro)intro.inert=self.progress>.35;
    }}});
    tl.to(".hero-content",{y:-65,opacity:0,duration:.3},0)
     .to(".opening-meta,.opening-bottom",{opacity:0,duration:.18},.08)
     .to(".opening-art",{scale:2.5,xPercent:-15,yPercent:8,duration:.75},0)
     .fromTo(".opening-screen-wipe",{clipPath:"inset(25% 20% 25% 20% round 24px)"},{clipPath:"inset(0% 0% 0% 0% round 0px)",duration:.38},.53)
     .fromTo(".opening-screen-wipe",{opacity:0},{opacity:1,duration:.1},.53)
     .fromTo(".opening-destination>span",{yPercent:120,opacity:0},{yPercent:0,opacity:1,duration:.18,stagger:.045},.77);
   },root);return()=>{ctx.revert();const intro=root.current?.querySelector<HTMLElement>(".hero-content");if(intro)intro.inert=false;};
  });
  return()=>{media.revert();observer.disconnect();preference.removeEventListener("change",update);window.removeEventListener("pointermove",move);};
 },[]);
 return <section className={"home-opening cinematic-opening ecosystem-opening "+(ready?"display-ready":"")} id="top" ref={root} aria-labelledby="home-heading" data-highlighted={highlighted}>
  <div className="opening-stage">
   <div className="display-light" aria-hidden="true"/><div className="hero-orbit" aria-hidden="true"/>
   <div className="opening-meta"><span>Flurzi Mobile App Limited</span><span>One company. A growing world of products.</span></div>
   <div className="opening-art ecosystem-art" aria-hidden="true">{HERO_MEDIA.video?<ScrollMedia video={HERO_MEDIA.video} poster={HERO_MEDIA.poster} className="opening-video"/>:platforms.map((p,i)=><div key={p.slug} className={"world-preview world-preview-"+i+(highlighted===i?" is-highlighted":"")}><span><i/>{p.name}</span><img src={p.image} alt="" width="1440" height="1040"/></div>)}</div>
   {available&&<div className="opening-canvas" aria-hidden="true"><DisplayBoundary><Display progress={progress} pointer={pointer} active={active} paused={paused} highlighted={highlighted} onReady={()=>setReady(true)} onLost={()=>{setReady(false);setAvailable(false);}}/></DisplayBoundary></div>}
   <div className="hero-content">
    <div className="home-introduction"><span className="hero-eyebrow"><i/> Meet the Flurzi ecosystem</span><h1 id="home-heading" aria-label="For work. For play. For life.">{["For work.","For play.","For life."].map((line,i)=><span className={"opening-word hero-line hero-line-"+i} aria-hidden="true" key={line}><span>{line}</span></span>)}</h1><p>Technology for the different sides of life. Four independent platforms, brought together by Flurzi.</p><a className="quiet-link" href="#selected-products">Discover your world <span aria-hidden="true">↘</span></a></div>
    <nav className="hero-products" aria-label="Explore the Flurzi products">{platforms.map((p,i)=><Link key={p.slug} href={"/products/"+p.slug} className={"hero-product hero-product-"+i} onPointerEnter={()=>setHighlighted(i)} onPointerLeave={()=>setHighlighted(-1)} onFocus={()=>setHighlighted(i)} onBlur={()=>setHighlighted(-1)}><span className="hero-product-number">0{i+1}</span><span><strong>{p.name}</strong><small>{p.category}</small></span><span aria-hidden="true">↗</span></Link>)}</nav>
   </div>
   <div className="opening-bottom"><span>Independent technology. Based in the UK.</span><span className="hero-motion-control">{ready?<button type="button" onClick={()=>setPaused(value=>!value)} aria-pressed={paused}>{paused?"Resume water motion":"Pause water motion"} <span aria-hidden="true">{paused?"▶":"Ⅱ"}</span></button>:"Work / Plan / Watch / Read"}</span><a href="#ecosystem">Scroll to explore ↓</a></div>
   <div className="opening-screen-wipe" aria-hidden="true"><p className="opening-destination"><span>Different worlds.</span><span>One <em>Flurzi.</em></span></p></div>
  </div>
 </section>;
}
