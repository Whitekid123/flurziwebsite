import PageHeroArt from "@/components/PageHeroArt";
import type {Metadata} from "next";
import Link from "next/link";
import HqDirectory from "@/components/hq/HqDirectory";
export const metadata:Metadata={title:"Our ecosystem",description:"Seven distinct platforms under FLURZIHQ, across workforce technology, commerce, financial commitments, entertainment and intelligent systems.",alternates:{canonical:"/products"}};
export default function ProductsPage(){return <div className="hq-products cinema-page cinema-page-products">
 <section className="hq-page-intro"><span className="hq-eyebrow">OUR ECOSYSTEM</span><h1>Distinct platforms.<br/><em>Shared ambition.</em></h1><p>Seven platforms. Different audiences and stages of development. One technology company behind them.</p><PageHeroArt kind="products"/></section>
 <section className="hq-directory-section" aria-label="Explore FLURZIHQ platforms"><HqDirectory/></section>
 <section className="hq-stage-guide"><div><span className="hq-eyebrow">UNDERSTANDING THE ECOSYSTEM</span><h2>Clear about<br/>where we are.</h2><p>A website or product name alone does not indicate a launched service.</p></div><dl><div><dt>Version 1 available</dt><dd>An available release. Product pages distinguish its current capabilities from future development.</dd></div><div><dt>Expansion underway</dt><dd>Version 1 is available while the broader platform is being developed.</dd></div><div><dt>Preparing for launch</dt><dd>Launch work continues, including required integrations. Availability is not being announced yet.</dd></div><div><dt>In / under development</dt><dd>The product direction is taking shape. Features, pricing and launch timing are not confirmed.</dd></div></dl></section>
 <section className="hq-inline-invite"><h2>Interested in what comes next?</h2><Link className="hq-link" href="/innovation">Technology &amp; innovation <span aria-hidden="true">↗</span></Link></section></div>}
