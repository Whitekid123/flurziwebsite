"use client";
import Link from "next/link";
import {useRef,useState} from "react";
import {platforms} from "@/lib/site-content";
const tasks=["Manage my HR records","Plan my commitments","Find something to watch","Discover my next story"];
export default function ProductFinder(){
 const [selected,setSelected]=useState(0),buttons=useRef<(HTMLButtonElement|null)[]>([]);
 const p=platforms[selected];
 return <section className={"product-finder finder-"+selected+" editorial-section"} aria-labelledby="finder-heading">
  <div className="finder-intro"><span className="section-label">04 / Find your starting point</span><h2 id="finder-heading">What brings<br/>you here?</h2><p>Start with what you want to do.<br/>We’ll point you to the right product.</p></div>
  <div className="finder-tool"><div className="finder-tabs" role="tablist" aria-label="What would you like to do?" aria-orientation="vertical">{tasks.map((task,i)=><button key={task} ref={el=>{buttons.current[i]=el;}} type="button" id={"finder-tab-"+i} role="tab" aria-selected={selected===i} aria-controls="finder-panel" tabIndex={selected===i?0:-1} onClick={()=>setSelected(i)} onKeyDown={event=>{
   let next=i;if(event.key==="ArrowDown")next=(i+1)%4;else if(event.key==="ArrowUp")next=(i+3)%4;else if(event.key==="Home")next=0;else if(event.key==="End")next=3;else return;
   event.preventDefault();setSelected(next);buttons.current[next]?.focus();
  }}><span>0{i+1}</span>{task}<span aria-hidden="true">↗</span></button>)}</div>
  <div className="finder-result" role="tabpanel" id="finder-panel" aria-labelledby={"finder-tab-"+selected} tabIndex={0} key={p.slug}><span className="section-label">{p.category}</span><h3>{p.name}</h3><p>{p.summary}</p><ul>{p.features.slice(0,3).map(f=><li key={f.title}>{f.title}</li>)}</ul><Link href={"/products/"+p.slug} className="quiet-link">Take a closer look <span aria-hidden="true">↗</span></Link></div></div>
 </section>;
}
