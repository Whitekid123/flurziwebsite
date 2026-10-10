import Link from "next/link";
import Brand from "./Brand";
import {COMPANY,SITE_LINKS,LEGAL_LINKS,platforms} from "@/lib/site-content";
export default function SiteFooter(){
 return <footer className="editorial-footer">
  <div className="footer-invite"><p>Products, partnerships or a question.</p><Link href="/contact">Talk to Flurzi <span aria-hidden="true">↗</span></Link></div>
  <div className="footer-columns"><div><Link className="wordmark" href="/" aria-label="Flurzi home"><Brand/></Link><p>Software for work, commitments,<br/>entertainment and reading.</p></div>
   <nav aria-label="Company footer links"><span>Company</span>{SITE_LINKS.map(l=><Link key={l.href} href={l.href}>{l.label}</Link>)}</nav>
   <nav aria-label="Product footer links"><span>Products</span>{platforms.map(p=><Link key={p.slug} href={"/products/"+p.slug}>{p.name}</Link>)}</nav>
   <div><span>Contact</span><a href={"mailto:"+COMPANY.email}>{COMPANY.email}</a><a href={COMPANY.phoneHref}>{COMPANY.phone}</a><span className="footer-location">United Kingdom</span></div>
  </div>
  <div className="footer-legal"><span>© 2026 {COMPANY.name}</span><nav aria-label="Legal">{LEGAL_LINKS.map(l=><Link href={l.href} key={l.href}>{l.label}</Link>)}</nav></div>
 </footer>;
}
