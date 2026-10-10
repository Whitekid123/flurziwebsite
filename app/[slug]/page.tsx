import type {Metadata} from "next";
import {notFound} from "next/navigation";
import policies from "@/lib/legal-content.json";
import {LEGAL_LINKS} from "@/lib/site-content";
type Key=keyof typeof policies;
export function generateStaticParams(){return Object.keys(policies).map(slug=>({slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const entry=LEGAL_LINKS.find(l=>l.href==="/"+slug);return entry?{title:entry.label,alternates:{canonical:"/"+slug}}:{};}
export default async function PolicyPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;if(!Object.hasOwn(policies,slug))notFound();const policy=policies[slug as Key];const label=LEGAL_LINKS.find(l=>l.href==="/"+slug)?.label;
 return <><section className="page-intro policy-intro"><span className="section-label">{label}</span><h1>{policy.title}</h1><p>{policy.intro}</p></section><div className="editorial-section policy-content">{policy.sections.map(section=><section key={section.title}><h2>{section.title}</h2>{section.paragraphs.map((p,i)=><p key={i}>{p}</p>)}</section>)}</div></>;
}
