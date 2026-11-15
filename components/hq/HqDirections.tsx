import Link from "next/link";
import {directions,platforms} from "@/lib/site-content";

/** 02 — dark sticky directions rail with contour draw. Server-rendered;
    the rail highlight and draw are driven by HqMotion. */
export default function HqDirections(){
 return <section className="hq-directions" aria-labelledby="hq-directions-heading">
  <div className="hq-kicker hq-kicker-dark"><span>03 / TECHNOLOGY &amp; INNOVATION</span><span>FOUR AREAS. A WIDER AMBITION.</span></div>
  <div className="hq-directions-layout">
   <div className="hq-directions-anchor">
    <span className="hq-eyebrow">OUR DIRECTION OF TRAVEL</span>
    <h2 id="hq-directions-heading">Technology.<br/>Across <em>life.</em></h2>
    <p>From the way organisations work to the experiences people return to. Our portfolio explores different possibilities for technology.</p>
    <div className="hq-contours" aria-hidden="true"><svg viewBox="0 0 520 260" fill="none">{Array.from({length:10},(_,i)=><path key={i} d={`M -30 ${65+i*11} C 100 ${-80+i*18}, 200 ${340-i*10}, 550 ${70+i*12}`} pathLength="1"/>)}</svg></div>
    <nav className="hq-directions-index" aria-label="Technology areas">{directions.map((d,i)=><a href={"#hq-direction-"+i} key={d.title}><span>0{i+1}</span>{d.title}<span aria-hidden="true">↘</span></a>)}</nav>
   </div>
   <div className="hq-direction-chapters">{directions.map((d,i)=><article className="hq-direction-chapter" id={"hq-direction-"+i} key={d.title}>
    <div className="hq-direction-top"><span>0{i+1} / EXPLORING THE POSSIBILITIES</span><span className="hq-direction-track" aria-hidden="true"><i/></span></div>
    <div className={"hq-direction-visual direction-visual-"+i} aria-hidden="true">{Array.from({length:8},(_,j)=><i key={j} style={{"--j":j} as React.CSSProperties}/>)}</div><h3>{d.title}</h3><p>{d.body}</p>
    <div className="hq-direction-platforms">{d.slugs.map(slug=>{const p=platforms.find(p=>p.slug===slug)!;return <Link href={"/products/"+slug} key={slug}>{p.name}<span>{p.status}</span><span aria-hidden="true">↗</span></Link>})}</div>
    <Link className="hq-link hq-link-light" href={"/innovation#direction-"+i}>Explore the technology direction <span aria-hidden="true">↗</span></Link>
   </article>)}</div>
  </div>
  <div className="hq-directions-end"><span>Distinct audiences. Different stages of development.</span><Link href="/innovation">Our innovation direction <span aria-hidden="true">↗</span></Link></div>
 </section>;
}
