"use client";
import {useState} from "react";
import Link from "next/link";
import {platforms} from "@/lib/site-content";

/** Filterable ecosystem directory, reskinned. Same honest stages,
    new hq namespace so P6 can cull the legacy directory styles. */
export default function HqDirectory(){
 const [sector,setSector]=useState("All platforms");
 const visible=platforms.filter(p=>sector==="All platforms"||p.sector===sector);
 return <div className="hq-directory">
  <div className="hq-directory-filters" aria-label="Filter platforms by area" role="group">{["All platforms","Business","Finance","Entertainment","Technology"].map(item=><button key={item} type="button" aria-pressed={sector===item} onClick={()=>setSector(item)}>{item}</button>)}</div>
  <p className="hq-directory-count" role="status">{visible.length} {visible.length===1?"platform":"platforms"}{sector!=="All platforms"?" in "+sector.toLowerCase():" across the FLURZIHQ ecosystem"}</p>
  <div className="hq-platform-rows">{visible.map(p=><Link className="hq-platform-row" href={"/products/"+p.slug} key={p.slug}><span className="hq-platform-number">{String(platforms.indexOf(p)+1).padStart(2,"0")}</span><div className="hq-platform-identity"><h3>{p.name}</h3><span>{p.category}</span></div><p>{p.summary}</p><span className={"platform-status status-"+p.stage}><i/>{p.status}</span><span className="hq-row-arrow" aria-hidden="true">↗</span></Link>)}</div>
 </div>;
}
