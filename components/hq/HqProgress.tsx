import Link from "next/link";
import {platforms} from "@/lib/site-content";

/** 04 — honest stage rail. Every platform placed by its real stage;
    no metrics, no invented claims. */
const RAIL=[
 {stage:"operational",label:"Operational",note:"Available release",blurb:"Live platforms serving their audiences today."},
 {stage:"expansion",label:"Expanding",note:"V1 live · wider platform underway",blurb:"An available release with a broader programme in development."},
 {stage:"launch",label:"Preparing",note:"Integrations pending",blurb:"Launch preparation continues; availability is not announced yet."},
 {stage:"development",label:"Developing",note:"Direction taking shape",blurb:"Product directions in development; scope and timing unconfirmed."},
] as const;
export default function HqProgress(){
 return <section className="hq-progress" aria-labelledby="hq-progress-heading">
  <div className="hq-kicker"><span>04 / IN PROGRESS</span><span>THE NEXT CHAPTERS</span></div>
  <div className="hq-section-heading"><h2 id="hq-progress-heading">Progress takes<br/><em>many forms.</em></h2><p>From a wider workforce remit to new commerce and entertainment platforms, the ecosystem sits at different stages of development.</p></div>
  <ol className="hq-rail">{RAIL.map((r,i)=>{
   const members=platforms.filter(p=>p.stage===r.stage);
   return <li className="hq-rail-stop" key={r.stage}>
    <span className="hq-rail-node" aria-hidden="true"><i>{String(i+1).padStart(2,"0")}</i></span>
    <span className="hq-eyebrow">{r.label.toUpperCase()} · {r.note.toUpperCase()}</span>
    <h3>{r.label}</h3>
    <p>{r.blurb}</p>
    <ul>{members.map(p=><li key={p.slug}><Link href={"/products/"+p.slug}>{p.name}<span>{p.status}</span><span aria-hidden="true">↗</span></Link></li>)}</ul>
   </li>;
  })}</ol>
  <Link className="hq-link" href="/innovation">See what is taking shape <span aria-hidden="true">↗</span></Link>
 </section>;
}
