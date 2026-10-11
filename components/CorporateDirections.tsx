import Link from "next/link";
import {directions, platforms} from "@/lib/site-content";

export default function CorporateDirections() {
  return <section className="corporate-directions" aria-labelledby="directions-heading">
    <div className="corp-kicker"><span>02 / TECHNOLOGY &amp; INNOVATION</span><span>FOUR AREAS. A WIDER AMBITION.</span></div>
    <div className="directions-layout">
      <div className="directions-anchor">
        <span className="section-label">OUR DIRECTION OF TRAVEL</span>
        <h2 id="directions-heading">Technology.<br/>Across <em>life.</em></h2>
        <p>From the way organisations work to the experiences people return to. Our portfolio explores different possibilities for technology.</p>
        <div className="direction-contours" aria-hidden="true"><svg viewBox="0 0 520 260" fill="none">{Array.from({length:10},(_,i)=><path key={i} d={`M -30 ${65+i*11} C 100 ${-80+i*18}, 200 ${340-i*10}, 550 ${70+i*12}`} pathLength="1"/>)}</svg></div>
        <nav className="directions-index" aria-label="Technology areas">{directions.map((d,i)=><a href={"#home-direction-"+i} key={d.title}><span>0{i+1}</span>{d.title}<span aria-hidden="true">↘</span></a>)}</nav>
      </div>
      <div className="direction-chapters">{directions.map((d,i)=><article className="direction-chapter" id={"home-direction-"+i} key={d.title}>
        <div className="direction-chapter-top"><span>0{i+1} / EXPLORING THE POSSIBILITIES</span><span className="direction-track" aria-hidden="true"><i/></span></div>
        <h3>{d.title}</h3><p>{d.body}</p>
        <div className="direction-platform-names">{d.slugs.map(slug=>{const p=platforms.find(p=>p.slug===slug)!;return <Link href={"/products/"+slug} key={slug}>{p.name}<span>{p.status}</span><span aria-hidden="true">↗</span></Link>})}</div>
        <Link className="corp-link" href={"/innovation#direction-"+i}>Explore the technology direction <span aria-hidden="true">↗</span></Link>
      </article>)}</div>
    </div>
    <div className="directions-end"><span>Distinct audiences. Different stages of development.</span><Link href="/innovation">Our innovation direction <span aria-hidden="true">↗</span></Link></div>
  </section>;
}
