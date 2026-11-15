import Link from "next/link";
import PlatformArtwork from "@/components/PlatformArtwork";
import {platforms} from "@/lib/site-content";
export default function HqEcosystem(){
 const featured=["flurzi360","endnovel","commit"].map(slug=>platforms.find(p=>p.slug===slug)!);
 const remaining=platforms.filter(p=>!featured.includes(p));
 return <section className="hq-ecosystem hq-showcase" id="ecosystem" aria-labelledby="hq-ecosystem-heading">
  <div className="hq-kicker"><span>02 / THE FLURZI PORTFOLIO</span><span>INDEPENDENT IDENTITIES. ONE COMPANY.</span></div>
  <div className="hq-showcase-heading"><h2 id="hq-ecosystem-heading">Different worlds.<br/><em>Same ambition.</em></h2><div><span className="hq-showcase-count">07</span><p>Platforms with their own purpose.<br/>Explore the ones already available,<br/>and the ideas taking shape.</p></div></div>
  <div className="hq-featured-worlds">{featured.map((p,i)=><article className={"hq-world hq-world-"+p.slug} key={p.slug} style={{"--world-index":i} as React.CSSProperties}>
   <div className="hq-world-copy"><div className="hq-world-top"><span>0{i+1} / {p.category}</span><span className={"platform-status status-"+p.stage}><i/>{p.status}</span></div><div><h3>{p.name}</h3><p>{p.summary}</p></div><Link className="hq-world-link" href={"/products/"+p.slug}>Explore {p.name}<span aria-hidden="true">↗</span></Link></div>
   <Link className="hq-world-art" href={"/products/"+p.slug} aria-label={"Explore "+p.name}><PlatformArtwork platform={p}/><span className="hq-world-enter" aria-hidden="true">↗</span><span className="hq-art-caption">{p.imageCaption}</span></Link>
  </article>)}</div>
  <div className="hq-ventures-intro"><span>THE NEXT CHAPTERS / 04—07</span><p>New ideas taking shape.<br/>Explore what we’re building.</p></div>
  <div className="hq-venture-list">{remaining.map((p,i)=><Link className="hq-venture" href={"/products/"+p.slug} key={p.slug}><span className="hq-venture-index">0{i+4}</span><div><h3>{p.name}</h3><p className="hq-venture-summary">{p.summary}</p></div><span className="hq-venture-category">{p.category}</span><span className={"platform-status status-"+p.stage}><i/>{p.status}</span><span className="hq-venture-arrow" aria-hidden="true">↗</span></Link>)}</div>
  <div className="hq-showcase-footer"><p>One headquarters. Room for different ideas.</p><Link className="hq-link" href="/products">Explore the complete ecosystem <span aria-hidden="true">↗</span></Link></div>
 </section>;
}
