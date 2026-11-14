import Link from "next/link";
import {COMPANY,MISSION} from "@/lib/site-content";

/** 05 — dark typography: shared ambition + the company record. */
export default function HqPurpose(){
 return <section className="hq-purpose" aria-labelledby="hq-purpose-heading">
  <div className="hq-kicker hq-kicker-dark"><span>05 / OUR PURPOSE</span><span>THE AMBITION BEHIND FLURZIHQ</span></div>
  <h2 id="hq-purpose-heading">One headquarters.<br/>Seven platforms.<br/><em>A shared ambition.</em></h2>
  <div className="hq-purpose-body"><span className="hq-eyebrow">OUR MISSION</span><p>{MISSION}</p><Link className="hq-link hq-link-light" href="/about#vision">Explore our vision <span aria-hidden="true">↗</span></Link></div>
  <div className="hq-record"><div><span>INCORPORATED</span><strong>11 August 2025</strong></div><div><span>REGISTERED IN ENGLAND &amp; WALES</span><strong>{COMPANY.legalName} · {COMPANY.number}</strong></div><a href={COMPANY.record} target="_blank" rel="noopener noreferrer">View company record ↗<span className="sr-only"> (opens in a new tab)</span></a></div>
 </section>;
}
