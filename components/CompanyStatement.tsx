import Link from "next/link";

export default function CompanyStatement() {
  return <section className="company-statement" id="company-introduction" aria-labelledby="company-statement-heading">
    <div className="company-statement-stage">
      <div className="corp-kicker"><span>01 / FLURZI LIMITED</span><span>THE COMPANY BEHIND THE PLATFORMS</span></div>
      <h2 id="company-statement-heading"><span>One company.</span><span>Many directions.</span><span>A shared <em>ambition.</em></span></h2>
      <div className="statement-bottom"><span className="statement-rule" aria-hidden="true"/><p>We develop and manage digital platforms across workforce technology, commerce, financial commitments, entertainment and intelligent systems.</p><div><p>Founded in the United Kingdom.<br/>Building with international ambition.</p><Link className="corp-link" href="/about">Meet Flurzi Limited <span aria-hidden="true">↗</span></Link></div></div>
    </div>
  </section>;
}
