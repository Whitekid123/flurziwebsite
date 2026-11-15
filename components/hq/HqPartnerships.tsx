import Link from "next/link";

/** 06 — light editorial closer. */
export default function HqPartnerships(){
 return <section className="hq-partnerships" aria-labelledby="hq-partnerships-heading">
  <div className="hq-kicker"><span>06 / BUSINESS &amp; PARTNERSHIPS</span><span>EXPLORE THE POSSIBILITIES</span></div>
  <div className="hq-invitation"><h2 id="hq-partnerships-heading">Where could we<br/><em>go together?</em></h2><Link href="/contact?topic=business" className="hq-invitation-arrow" aria-label="Start a business conversation"><svg viewBox="0 0 100 100" fill="none" aria-hidden="true"><path d="M18 82 82 18M18 18h64v64" stroke="currentColor" strokeWidth="7"/></svg></Link></div>
  <div className="hq-partnerships-bottom"><p>A business opportunity. A relevant collaboration. A conversation about the future of a platform.</p><div className="hq-opportunity-links"><Link href="/partnerships">Partnership opportunities <span aria-hidden="true">↗</span></Link><Link href="/contact?topic=business">Business enquiries <span aria-hidden="true">↗</span></Link><Link href="/contact?topic=platform">Platform enquiries <span aria-hidden="true">↗</span></Link></div></div>
 </section>;
}
