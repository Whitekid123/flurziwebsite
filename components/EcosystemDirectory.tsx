"use client";
import {useState} from "react";
import Link from "next/link";
import {platforms} from "@/lib/site-content";
export default function EcosystemDirectory({filterable=false}:{filterable?:boolean}){
 const [sector,setSector]=useState("All platforms");const visible=platforms.filter(p=>sector==="All platforms"||p.sector===sector);
 return <div className="ecosystem-directory">
 {filterable&&<div className="ecosystem-filters" aria-label="Filter platforms by area" role="group">{["All platforms","Business","Finance","Entertainment","Technology"].map(item=><button key={item} type="button" aria-pressed={sector===item} onClick={()=>setSector(item)}>{item}</button>)}</div>}
 {filterable&&<p className="filter-count" role="status">{visible.length} {visible.length===1?"platform":"platforms"}{sector!=="All platforms"?" in "+sector.toLowerCase():" across the Flurzi ecosystem"}</p>}
 <div className="platform-rows">{visible.map(p=><Link className="platform-row" href={"/products/"+p.slug} key={p.slug} style={{"--platform-accent":p.accent} as React.CSSProperties}><span className="platform-number">{String(platforms.indexOf(p)+1).padStart(2,"0")}</span><div className="platform-identity"><h3>{p.name}</h3><span>{p.category}</span></div><p>{p.summary}</p><span className={"platform-status status-"+p.stage}><i/>{p.status}</span><span className="row-arrow" aria-hidden="true">↗</span></Link>)}</div>
 </div>;
}
