import Link from "next/link";

/** 01 — light typography-led statement. Ends on the anchor the hero scrolls to. */
export default function HqStatement(){
 return <section className="hq-statement" id="company-introduction" aria-labelledby="hq-statement-heading">
  <div className="hq-kicker"><span>01 / FLURZIHQ</span><span>THE COMPANY BEHIND THE PLATFORMS</span></div>
  <h2 id="hq-statement-heading"><span>One company.</span><span>Many directions.</span><span>A shared <em>ambition.</em></span></h2>
  <div className="hq-statement-bottom"><span className="hq-statement-rule" aria-hidden="true"/><p>We develop and manage digital platforms across workforce technology, commerce, financial commitments, entertainment and intelligent systems.</p><div><p>Founded in the United Kingdom.<br/>Building with international ambition.</p><Link className="hq-link" href="/about">Meet FLURZIHQ <span aria-hidden="true">↗</span></Link></div></div>
 </section>;
}
