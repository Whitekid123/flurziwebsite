import Link from "next/link";
import InteractiveOpening from "./InteractiveOpening";
import ProductFinder from "./ProductFinder";
import HomeMotion from "./HomeMotion";
import ScrollMedia from "./ScrollMedia";
import {platforms,ventures} from "@/lib/site-content";
import {PRODUCT_MEDIA} from "@/lib/media";

const stories=[
 {verb:"Work, with clarity.",lead:"A clearer view of your sponsor responsibilities.",body:"People, records, evidence and the dates that matter. Give your HR team a dedicated place to keep the moving parts together.",link:"Explore SponsorSafe HR"},
 {verb:"Plan what comes next.",lead:"Make room for the commitments that matter.",body:"See your finances, consider the timing and understand the impact of a commitment before you take the next step.",link:"Explore Flurzi Commit"},
 {verb:"Press play.",lead:"Your next watch starts here.",body:"From films and series to reels and live entertainment. Discover something new, or return to a story you have already started.",link:"Explore FlurziCinema"},
 {verb:"One more chapter.",lead:"Find a world you want to return to.",body:"Discover a story, make it part of your library and follow it episode by episode. There is always another chapter to explore.",link:"Explore EndNovel"}
];
const questions=[
 {q:"What is Flurzi?",a:"Flurzi Mobile App Limited is a UK technology company building focused digital products for compliance, personal planning, streaming and story reading."},
 {q:"Are these all part of the same platform?",a:"SponsorSafe HR, Flurzi Commit, FlurziCinema and EndNovel are separate products under the Flurzi company. Each has its own website, purpose and audience."},
 {q:"Which product is designed for UK employers?",a:"SponsorSafe HR supports UK sponsor licence and right to work workflows, with tools for worker records, supporting documents, important dates and audit preparation."},
 {q:"What is Flurzi working on next?",a:"Flurzi X and PlayVault are in development. Flurzi X explores a buyer and seller marketplace; PlayVault explores game discovery and a personal game library."}
];
export default function EditorialHome(){
 return <div className="expanded-home">
  <InteractiveOpening/>
  <div className="ecosystem-ribbon" aria-label="The four Flurzi platforms">{platforms.map((p,i)=><Link key={p.slug} href={"/products/"+p.slug}><i className={"product-dot dot-"+i}/>{p.name}<span aria-hidden="true">↗</span></Link>)}</div>
  <section className="ecosystem-intro editorial-section" id="ecosystem" aria-labelledby="ecosystem-title">
   <div className="intro-kicker"><span className="section-label">01 / Our ecosystem</span><span>Built for different needs.<br/>Connected by one company.</span></div>
   <h2 id="ecosystem-title" className="reveal-statement">Life doesn’t fit into<br/>one category.<br/><em>Neither do we.</em></h2>
   <div className="ecosystem-intro-bottom"><span className="ecosystem-symbol" aria-hidden="true">✳</span><p>Running a team. Making a plan. Finding your next film. Getting lost in a story. We build focused products for these different moments, giving each one its own space to grow.</p><Link className="quiet-link" href="/about">Meet Flurzi <span aria-hidden="true">↗</span></Link></div>
  </section>
  <section className="product-stories" id="selected-products" aria-labelledby="selected-title">
   <div className="stories-heading editorial-section section-heading"><div><span className="section-label">02 / Explore our products</span><h2 id="selected-title">Four ways in.<br/>A world to explore.</h2></div><p>Different ambitions.<br/>Distinct identities.<br/>Find your place in the Flurzi ecosystem.</p></div>
   {platforms.map((p,i)=><article className={"product-chapter chapter-"+p.slug} key={p.slug} aria-labelledby={"chapter-"+p.slug}>
    <div className="chapter-topline"><span>0{i+1} / 04</span><span>{p.category}</span><span>{p.name}</span></div>
    <div className="chapter-layout">
     <div className="chapter-copy"><span className="chapter-brand">{p.name}</span><h3 id={"chapter-"+p.slug}>{stories[i].verb}</h3><p className="chapter-lead">{stories[i].lead}</p><p className="chapter-description">{stories[i].body}</p><Link className="chapter-link" href={"/products/"+p.slug}>{stories[i].link}<span aria-hidden="true">↗</span></Link></div>
     <div className="chapter-visual"><span className="chapter-outline" aria-hidden="true">0{i+1}</span><Link href={"/products/"+p.slug} className="project-image-link" aria-label={"Explore "+p.name}><div className="project-image-motion">{PRODUCT_MEDIA[p.slug]?.video?<ScrollMedia video={PRODUCT_MEDIA[p.slug].video!} poster={PRODUCT_MEDIA[p.slug].image} className="product-preview-media"/>:<img className="product-preview-media" src={PRODUCT_MEDIA[p.slug]?.image||p.image} alt={p.name+" website preview"} width="1440" height="1040" loading="lazy"/>}</div><span className="project-view" aria-hidden="true">View product ↗</span></Link><span className="chapter-image-caption">A look inside {p.name} <span aria-hidden="true">↗</span></span></div>
    </div>
    <div className="chapter-features"><span>Made for<br/><strong>{p.audience}</strong></span>{p.features.slice(0,3).map((f,j)=><span key={f.title}><small>0{j+1}</small>{f.title}</span>)}</div>
   </article>)}
   <div className="compare-bar"><span>Not sure where to start?</span><Link href="/products" className="quiet-link">Compare all four products <span aria-hidden="true">↗</span></Link></div>
  </section>
  <section className="home-company expanded-company editorial-section" aria-labelledby="company-heading">
   <div className="company-copy"><span className="section-label">03 / The company behind it all</span><h2 id="company-heading">Independent<br/>products.<br/><em>Shared ambition.</em></h2><p>Flurzi brings employer tools and consumer experiences under one roof. Each platform has its own purpose, with shared thinking around design, accounts, operations and support.</p><Link className="quiet-link" href="/about">Get to know Flurzi <span aria-hidden="true">↗</span></Link></div>
   <div className="company-sculpture" aria-hidden="true"><div className="company-brand-halo"/><img className="company-logo" src="/media/flurzi-icon.png" width="512" height="512" alt=""/><small>One company.<br/>Many possibilities.</small></div>
   <div className="company-footnote"><span>UK-based technology company</span><span>Business tools + everyday experiences</span></div>
  </section>
  <ProductFinder/>
  <section className="home-next expanded-next editorial-section" aria-labelledby="next-heading">
   <div className="section-heading"><div><span className="section-label">05 / Looking ahead</span><h2 id="next-heading">There’s more<br/>on the horizon.</h2></div><p>Two ideas taking shape.<br/>A new chapter for the Flurzi ecosystem.</p></div>
   <div className="venture-previews">{ventures.map((v,i)=><article key={v.name} className={"venture-preview venture-preview-"+i}><div className="venture-preview-top"><span>{v.category}</span><span className="development-label"><i/>In development</span></div><div className={"venture-art venture-art-"+i} aria-hidden="true">{i===0?<><span/><span/><span/><b>X</b></>:<><span/><span/><b>+</b></>}</div><div className="venture-preview-copy"><h3>{v.name}</h3><p>{v.description}</p><Link href="/projects" className="quiet-link">Discover the direction <span aria-hidden="true">↗</span></Link></div></article>)}</div>
  </section>
  <section className="home-questions editorial-section" aria-labelledby="questions-heading"><div><span className="section-label">06 / A few useful answers</span><h2 id="questions-heading">Curious about<br/>Flurzi?</h2><Link href="/faq" className="quiet-link">More questions, answered <span aria-hidden="true">↗</span></Link></div><div className="home-question-list">{questions.map(item=><details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div></section>
  <HomeMotion/>
 </div>;
}
