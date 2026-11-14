"use client";
import {useRef,useState} from "react";
import Link from "next/link";
import PlatformArtwork from "@/components/PlatformArtwork";
import {platforms} from "@/lib/site-content";

/** 03 — accessible portfolio tablist, reskinned. Ownership view, not a
    diagram of technical integrations. */
export default function HqEcosystem(){
 const [selected,setSelected]=useState(0);
 const tabs=useRef<(HTMLButtonElement|null)[]>([]);
 const p=platforms[selected];
 const selectPlatform=(index:number)=>{
  setSelected(index);
  if(!window.matchMedia("(max-width: 600px)").matches)return;
  requestAnimationFrame(()=>{
   const panel=document.getElementById("hq-panel");
   if(!panel)return;
   if(window.__lenis){window.__lenis.scrollTo(window.scrollY,{immediate:true,force:true});window.__lenis.scrollTo(panel,{duration:.65});}
   else panel.scrollIntoView({block:"start",behavior:"instant"});
  });
 };
 return <section className="hq-ecosystem" id="ecosystem" aria-labelledby="hq-ecosystem-heading">
  <div className="hq-kicker"><span>03 / THE FLURZIHQ ECOSYSTEM</span><span>ONE HEADQUARTERS. SEVEN DISTINCT PLATFORMS.</span></div>
  <div className="hq-section-heading"><h2 id="hq-ecosystem-heading">A company.<br/>An <em>ecosystem.</em></h2><p>Our portfolio brings together platforms with their own purpose, identity and audience. Explore each platform and its current stage of development.</p></div>
  <div className="hq-portfolio">
   <div className="hq-portfolio-parent"><span>THE PARENT COMPANY</span><strong>FLURZI<em>HQ</em></strong><p>Independent platforms. A shared headquarters direction.</p><div className="hq-parent-stem" aria-hidden="true"/></div>
   <div className="hq-branches" role="tablist" aria-label="Explore the FLURZIHQ portfolio">
    {platforms.map((platform,i)=><button key={platform.slug} ref={el=>{tabs.current[i]=el;}} type="button" role="tab" id={"hq-tab-"+platform.slug} aria-controls="hq-panel" aria-selected={selected===i} tabIndex={selected===i?0:-1} className="hq-branch" onClick={()=>selectPlatform(i)} onKeyDown={event=>{
     let next=i;
     if(event.key==="ArrowRight"||event.key==="ArrowDown")next=(i+1)%platforms.length;
     else if(event.key==="ArrowLeft"||event.key==="ArrowUp")next=(i+platforms.length-1)%platforms.length;
     else if(event.key==="Home")next=0;
     else if(event.key==="End")next=platforms.length-1;
     else return;
     event.preventDefault();setSelected(next);tabs.current[next]?.focus();
    }}><span className="hq-branch-index">{String(i+1).padStart(2,"0")}<span aria-hidden="true">↗</span></span><strong>{platform.name}</strong><span className="hq-branch-category">{platform.category}</span><span className={"platform-status status-"+platform.stage}><i/>{platform.status}</span></button>)}
   </div>
   <div id="hq-panel" role="tabpanel" aria-labelledby={"hq-tab-"+p.slug} tabIndex={0} className="hq-panel">
    <div className="hq-preview" key={p.slug} style={{backgroundColor:p.brandArtwork?.background??p.colour}}>{p.image?<PlatformArtwork platform={p} preview/>:<span className="hq-preview-type"><span>{p.category}</span><strong>{p.name}</strong><span>Under development</span></span>}</div>
    <div className="hq-detail" key={"detail-"+p.slug}><span className="hq-eyebrow">{p.category}</span><h3>{p.name}</h3><p>{p.summary}</p>{p.image&&<small>{p.imageCaption}</small>}</div>
    <Link className="hq-link" href={"/products/"+p.slug}>Explore the platform <span aria-hidden="true">↗</span></Link>
   </div>
   <div className="hq-portfolio-footnote"><span>Select a platform to explore its purpose and current stage.</span><Link href="/products">View the complete portfolio <span aria-hidden="true">↗</span></Link></div>
   <noscript><p>Explore all platform details through the <a href="/products">ecosystem directory</a>.</p></noscript>
  </div>
 </section>;
}
