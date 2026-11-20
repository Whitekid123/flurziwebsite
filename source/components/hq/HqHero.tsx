"use client";
import dynamic from "next/dynamic";
import Link from "next/link";
import {Component,type ReactNode,useCallback,useEffect,useRef,useState} from "react";
const Water=dynamic(()=>import("../CorporateWater"),{ssr:false});
class WaterBoundary extends Component<{children:ReactNode;onError:()=>void},{failed:boolean}>{
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 componentDidCatch(){this.props.onError();}
 render(){return this.state.failed?null:this.props.children;}
}
export default function HqHero(){
 const root=useRef<HTMLElement>(null),pointer=useRef({x:0,y:0}),progress=useRef(0);
 const [available,setAvailable]=useState(false),[failed,setFailed]=useState(false),[ready,setReady]=useState(false);
 const [active,setActive]=useState(true),[paused,setPaused]=useState(false),[reduced,setReduced]=useState(true);
 const onReady=useCallback(()=>setReady(true),[]);
 const onLost=useCallback(()=>{setFailed(true);setReady(false);},[]);
 useEffect(()=>{
  const motion=matchMedia("(prefers-reduced-motion: reduce)"),desktop=matchMedia("(min-width: 901px)");
  const update=()=>{setReduced(motion.matches);setReady(false);setAvailable(!motion.matches&&desktop.matches);};
  update();motion.addEventListener("change",update);desktop.addEventListener("change",update);
  let inView=true;
  const visibility=()=>setActive(inView&&!document.hidden);
  const observer=new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;visibility();});
  if(root.current)observer.observe(root.current);
  const scroll=()=>{if(root.current){const rect=root.current.getBoundingClientRect();progress.current=Math.min(1,Math.max(0,-rect.top/rect.height));}};
  window.addEventListener("scroll",scroll,{passive:true});document.addEventListener("visibilitychange",visibility);
  return()=>{observer.disconnect();motion.removeEventListener("change",update);desktop.removeEventListener("change",update);window.removeEventListener("scroll",scroll);document.removeEventListener("visibilitychange",visibility);};
 },[]);
 const stop=paused||reduced;
 useEffect(()=>{document.documentElement.dataset.hqMotionPaused=String(stop);return()=>{delete document.documentElement.dataset.hqMotionPaused;};},[stop]);
 return <section ref={root} id="top" className={`home-opening hq-hero hq-corporate-opening${stop||!active?" is-paused":""}${ready?" is-ready":""}`} aria-labelledby="home-heading" onPointerMove={event=>{const rect=event.currentTarget.getBoundingClientRect();pointer.current={x:(event.clientX-rect.left)/rect.width*2-1,y:1-(event.clientY-rect.top)/Math.min(rect.height,window.innerHeight)*2};}}>
  <div className="hq-hero-stage">
   <div className="hq-water-field" aria-hidden="true">
    <div className="hq-liquid"><span className="hq-sheet hq-sheet-one"/><span className="hq-sheet hq-sheet-two"/><span className="hq-sheet hq-sheet-three"/></div>
    {available&&!failed&&<div className="hq-water-canvas"><WaterBoundary onError={onLost}><Water pointer={pointer} progress={progress} active={active} paused={stop} onReady={onReady} onLost={onLost}/></WaterBoundary></div>}
   </div>
   <div className="hq-kinetic" aria-hidden="true"><div className="hq-kinetic-grid">{Array.from({length:7},(_,i)=><span className={"hq-kinetic-piece kinetic-"+i} key={i}><i/></span>)}</div><span className="hq-kinetic-caption">SEVEN IDEAS. ALWAYS IN MOTION.</span></div>
   <div className="hq-scene-caption" aria-hidden="true"><span>FLURZI / IN CONSTANT EVOLUTION</span><span>SEVEN PLATFORMS / ONE HEADQUARTERS</span></div>
   <div className="hq-hero-shade" aria-hidden="true"/>
   <div className="hq-hero-meta"><span><i/>FLURZIHQ — THE FLURZI HEADQUARTERS</span><span>Independent thinking. Shared ambition.</span></div>
   <div className="hq-hero-copy">
    <div className="hq-hero-label"><span>A COMPANY IN MOTION</span><span aria-hidden="true">↘</span></div>
    <h1 id="home-heading"><span className="hq-hero-line"><span>Many worlds.</span></span><span className="hq-hero-line"><span>One <em>Flurzi.</em></span></span></h1>
    <div className="hq-hero-introduction"><span className="hq-hero-index" aria-hidden="true">01 — 07</span><p>One company. Seven distinct platforms.<br/>Building across business, culture<br className="hq-desktop-break"/> and everyday life.</p><Link className="hq-hero-secondary" href="/about">Meet the company <span aria-hidden="true">↗</span></Link></div>
   </div>
   <div className="hq-hero-side-note"><span>UNITED KINGDOM</span><span>INTERNATIONAL AMBITION</span></div>
   <a className="hq-discover-orbit" href="#ecosystem" aria-label="Discover our seven platforms"><svg viewBox="0 0 140 140" aria-hidden="true"><defs><path id="hq-orbit-text" d="M70,70 m-53,0 a53,53 0 1,1 106,0 a53,53 0 1,1 -106,0"/></defs><text><textPath href="#hq-orbit-text" textLength="327">DISCOVER OUR WORLD · DISCOVER OUR WORLD · </textPath></text></svg><span aria-hidden="true">↘</span></a>
   <div className="hq-hero-bottom"><span>Founded in the UK. Thinking beyond borders.</span><button type="button" onClick={()=>setPaused(value=>!value)} aria-pressed={stop} disabled={reduced}>{reduced?"Reduced motion enabled":paused?"Resume animation":"Pause animation"}<span aria-hidden="true">{stop?"▷":"Ⅱ"}</span></button><a href="#company-introduction">Scroll to explore <span aria-hidden="true">↓</span></a></div>
  </div>
 </section>;
}
