"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import {Component,type ReactNode,useEffect,useRef,useState} from "react";
const Water=dynamic(()=>import("../CorporateWater"),{ssr:false});
class WaterBoundary extends Component<{children:ReactNode;onError:()=>void},{failed:boolean}>{
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 componentDidCatch(){this.props.onError();}
 render(){return this.state.failed?null:this.props.children;}
}
/** Dark cinematic hero: real WebGL water on capable desktops, pine-tinted
    CSS sheets everywhere else. No video branch, no watermark. */
export default function HqHero(){
 const root=useRef<HTMLElement>(null),pointer=useRef({x:0,y:0}),progress=useRef(0);
 const [available,setAvailable]=useState(false),[failed,setFailed]=useState(false),[ready,setReady]=useState(false),[active,setActive]=useState(true),[paused,setPaused]=useState(false),[reduced,setReduced]=useState(true);
 useEffect(()=>{
  const motion=matchMedia("(prefers-reduced-motion: reduce)"),desktop=matchMedia("(min-width: 901px)");
  const update=()=>{
   setReduced(motion.matches);setReady(false);
   if(motion.matches||!desktop.matches){setAvailable(false);return;}
   try{const canvas=document.createElement("canvas"),gl=canvas.getContext("webgl2");setAvailable(Boolean(gl));}catch{setAvailable(false);}
  };
  update();motion.addEventListener("change",update);desktop.addEventListener("change",update);
  let inView=true;
  const visibility=()=>setActive(inView&&!document.hidden);
  const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;visibility();});
  if(root.current)observer.observe(root.current);
  document.addEventListener("visibilitychange",visibility);
  return()=>{observer.disconnect();motion.removeEventListener("change",update);desktop.removeEventListener("change",update);document.removeEventListener("visibilitychange",visibility);};
 },[]);
 const stop=paused||reduced;
 const loseWater=()=>{setFailed(true);setReady(false);};
 return <section ref={root} id="top" className={`home-opening hq-hero${stop||!active?" is-paused":""}${ready?" is-ready":""}`} aria-labelledby="home-heading" onPointerMove={event=>{const rect=event.currentTarget.getBoundingClientRect();pointer.current={x:(event.clientX-rect.left)/rect.width*2-1,y:1-(event.clientY-rect.top)/rect.height*2};}}>
  <div className="hq-water-field" aria-hidden="true">
   <div className="hq-liquid"><span className="hq-sheet hq-sheet-one"/><span className="hq-sheet hq-sheet-two"/><span className="hq-sheet hq-sheet-three"/></div>
   {available&&!failed&&<div className="hq-water-canvas"><WaterBoundary onError={loseWater}><Water pointer={pointer} progress={progress} active={active} paused={stop} onReady={()=>setReady(true)} onLost={loseWater}/></WaterBoundary></div>}
  </div>
  <div className="hq-hero-shade" aria-hidden="true"/>
  <div className="hq-hero-meta"><span><i/>One headquarters. Seven platforms.</span><span>FLURZIHQ / The Flurzi headquarters</span></div>
  <div className="hq-hero-copy"><h1 id="home-heading"><span className="hq-hero-line"><span>One company.</span></span><span className="hq-hero-line"><span>Seven <em>platforms.</em></span></span></h1><p>FLURZIHQ is the headquarters behind seven distinct digital platforms — for business, culture and everyday life.</p><div className="hq-hero-actions"><Link className="hq-hero-primary" href="/products">Explore the ecosystem <span aria-hidden="true">↗</span></Link><Link className="hq-hero-secondary" href="/about">Meet FLURZIHQ <span aria-hidden="true">↗</span></Link></div></div>
  <div className="hq-hero-bottom"><span>Business · Culture · Everyday life</span><button type="button" onClick={()=>setPaused(value=>!value)} aria-pressed={stop} disabled={reduced}>{reduced?"Reduced motion enabled":paused?"Resume water motion":"Pause water motion"}<span aria-hidden="true">{stop?"▷":"Ⅱ"}</span></button><a href="#company-introduction">Scroll to discover <span aria-hidden="true">↓</span></a></div>
 </section>;
}
