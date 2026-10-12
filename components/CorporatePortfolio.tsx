"use client";

import {useRef, useState} from "react";
import Link from "next/link";
import {platforms} from "@/lib/site-content";

/** A corporate ownership view, not a diagram of technical integrations. */
export default function CorporatePortfolio() {
  const [selected, setSelected] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const p = platforms[selected];
  const selectPlatform = (index: number) => {
    setSelected(index);
    if (!window.matchMedia("(max-width: 600px)").matches) return;
    requestAnimationFrame(() => {
      const panel = document.getElementById("portfolio-panel");
      if (!panel) return;
      if (window.__lenis) {
        window.__lenis.scrollTo(window.scrollY, {immediate: true, force: true});
        window.__lenis.scrollTo(panel, {duration: .65});
      }
      else panel.scrollIntoView({block: "start", behavior: "instant"});
    });
  };
  return <div className="corporate-portfolio">
    <div className="portfolio-parent"><span>THE PARENT COMPANY</span><strong>Flurzi<span>Limited</span></strong><p>Independent platforms. A shared company direction.</p><div className="parent-stem" aria-hidden="true"/></div>
    <div className="portfolio-branches" role="tablist" aria-label="Explore the Flurzi portfolio">
      {platforms.map((platform, i) => <button key={platform.slug} ref={el => {tabs.current[i] = el;}} type="button" role="tab" id={"portfolio-tab-" + platform.slug} aria-controls="portfolio-panel" aria-selected={selected === i} tabIndex={selected === i ? 0 : -1} className="portfolio-branch" onClick={() => selectPlatform(i)} onKeyDown={event => {
        let next = i;
        if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (i + 1) % platforms.length;
        else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (i + platforms.length - 1) % platforms.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = platforms.length - 1;
        else return;
        event.preventDefault(); setSelected(next); tabs.current[next]?.focus();
      }}><span className="branch-index">{String(i + 1).padStart(2, "0")}<span aria-hidden="true">↗</span></span><strong>{platform.name}</strong><span className="branch-category">{platform.category}</span><span className={"platform-status status-" + platform.stage}><i/>{platform.status}</span></button>)}
    </div>
    <div id="portfolio-panel" role="tabpanel" aria-labelledby={"portfolio-tab-" + p.slug} tabIndex={0} className="portfolio-panel">
      <div className="portfolio-preview" key={p.slug} style={{backgroundColor:p.colour}}>{p.image ? <img src={p.image} alt={p.imageCaption} width="1440" height="1040" loading="lazy"/> : <span className="portfolio-in-development"><span>{p.category}</span><strong>{p.name}</strong><span>Under development</span></span>}</div>
      <div className="portfolio-detail" key={"detail-" + p.slug}><span className="section-label">{p.category}</span><h3>{p.name}</h3><p>{p.summary}</p>{p.image && <small>{p.imageCaption}</small>}</div>
      <Link className="corp-link" href={"/products/" + p.slug}>Explore the platform <span aria-hidden="true">↗</span></Link>
    </div>
    <div className="portfolio-footnote"><span>Select a platform to explore its purpose and current stage.</span><Link href="/products">View the complete portfolio <span aria-hidden="true">↗</span></Link></div>
    <noscript><p>Explore all platform details through the <a href="/products">ecosystem directory</a>.</p></noscript>
  </div>;
}
