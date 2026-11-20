import Link from "next/link";

/** Short, one-off editorial transitions. These don't make new product claims. */
export default function PageInterlude({variant}:{variant:"about"|"innovation"|"partnerships"}) {
  if(variant==="about")return <section className="cinema-interlude cinema-interlude--about" aria-label="Our shared ambition" data-cinema-chapter>
    <div className="cinema-interlude-meta"><span>THE THOUGHT BEHIND FLURZIHQ</span><span>01 — 07</span></div>
    <div className="cinema-interlude-lines"><span>Independent</span><span>by <em>design.</em></span><span>Connected</span><span>by <em>ambition.</em></span></div>
    <div className="cinema-interlude-foot"><span>SEVEN PLATFORMS / ONE HEADQUARTERS</span><Link href="/products">Discover the ecosystem ↗</Link></div>
  </section>;
  if(variant==="innovation")return <section className="cinema-interlude cinema-interlude--innovation" aria-label="Technology direction" data-cinema-chapter>
    <div className="cinema-interlude-meta"><span>TECHNOLOGY / DIRECTION</span><span>THE WAY FORWARD</span></div>
    <div className="cinema-interlude-lines"><span>Different</span><span>problems.</span><span><em>Thoughtful</em></span><span>possibilities.</span></div>
    <div className="cinema-interlude-foot"><span>BUILDING A PORTFOLIO, NOT A PROMISE</span><Link href="/products">See the platforms ↗</Link></div>
  </section>;
  return <section className="cinema-interlude cinema-interlude--partnerships" aria-label="Start a conversation" data-cinema-chapter>
    <div className="cinema-interlude-meta"><span>STARTING POINT / A CONVERSATION</span><span>FLURZIHQ</span></div>
    <div className="cinema-interlude-lines"><span>A shared</span><span><em>idea</em> starts</span><span>with hello.</span></div>
    <div className="cinema-interlude-foot"><span>BUSINESS AND COLLABORATION ENQUIRIES</span><Link href="/contact">Get in touch ↗</Link></div>
  </section>;
}
