import PageHeroArt from "@/components/PageHeroArt";
import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import policies from "@/lib/legal-content.json";
import {LEGAL_LINKS} from "@/lib/site-content";
type Key=keyof typeof policies;
export function generateStaticParams(){return Object.keys(policies).map(slug=>({slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const entry=LEGAL_LINKS.find(l=>l.href==="/"+slug);return entry?{title:entry.label,description:policies[slug as Key].intro,alternates:{canonical:"/"+slug}}:{};}
export default async function PolicyPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;if(!Object.hasOwn(policies,slug))notFound();const policy=policies[slug as Key];const label=LEGAL_LINKS.find(l=>l.href==="/"+slug)?.label;
 return <div className="cinema-page cinema-page-policy"><section className="hq-page-intro hq-policy-intro"><span className="hq-eyebrow">{label}</span><h1>{policy.title}</h1><p>{policy.intro}</p><PageHeroArt kind="policy"/></section><div className="hq-section hq-policy-content"><div className="hq-policy-review-note">FLURZIHQ is the public identity of Flurzi Limited; company identity and platform descriptions updated on 12 October 2026. Platform availability varies; see the <Link href="/products">ecosystem</Link> for current stages. For privacy or company correspondence, see <Link href="/contact?topic=privacy">Contact</Link>.</div><nav className="cinema-legal-nav" aria-label="On this page"><span>ON THIS PAGE</span>{policy.sections.map((section,i)=><a href={"#section-"+(i+1)} key={section.title}>{section.title}</a>)}</nav><div className="cinema-legal-body">{policy.sections.map((section,i)=><section id={"section-"+(i+1)} key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((p,i)=><p key={i}>{p}</p>)}</section>)}</div></div></div>;
}
