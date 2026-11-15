import Link from "next/link";
import {platforms} from "@/lib/site-content";
const words="Independent ideas. A shared direction. Technology with a place in everyday life.".split(" ");
export default function HqStatement(){
 return <section className="hq-statement hq-manifesto" id="company-introduction" aria-labelledby="hq-statement-heading">
  <div className="hq-manifesto-top"><span className="hq-eyebrow">01 / THE COMPANY</span><span className="hq-eyebrow">A FAMILY OF DISTINCT PLATFORMS</span></div>
  <div className="hq-manifesto-layout"><div className="hq-seven-mark" aria-hidden="true">{platforms.map((p,i)=><span key={p.slug} className={"hq-mark-piece hq-piece-"+i} style={{"--piece":i} as React.CSSProperties}/>)}<span className="hq-mark-centre">HQ</span></div>
  <div><h2 id="hq-statement-heading" aria-label={words.join(" ")}>{words.map((word,i)=><span className="hq-manifesto-word" aria-hidden="true" key={i}>{word} </span>)}</h2><div className="hq-manifesto-note"><p>FLURZIHQ develops and manages platforms across workforce technology, commerce, financial commitments, entertainment and intelligent systems.</p><Link className="hq-link" href="/about">The company behind it all <span aria-hidden="true">↗</span></Link></div></div></div>
  <div className="hq-brand-index" aria-label="Our seven platforms">{platforms.map((p,i)=><Link key={p.slug} href={"/products/"+p.slug}><span>0{i+1}</span>{p.name}<span aria-hidden="true">↗</span></Link>)}</div>
 </section>;
}
