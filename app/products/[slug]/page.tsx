import type {Metadata} from "next";
import Link from "next/link";
import {notFound} from "next/navigation";
import {platforms} from "@/lib/site-content";
export function generateStaticParams(){return platforms.map(p=>({slug:p.slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const p=platforms.find(p=>p.slug===slug);return p?{title:p.name,description:p.summary,alternates:{canonical:"/products/"+slug}}:{};}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const index=platforms.findIndex(p=>p.slug===slug);if(index<0)notFound();const p=platforms[index],next=platforms[(index+1)%platforms.length];
 return <><section className="page-intro product-intro"><Link href="/products" className="back-link">← All products</Link><span className="section-label">{p.category}</span><h1>{p.name}</h1><div className="product-intro-bottom"><p>{p.summary}</p><a className="solid-link" href={p.url} target="_blank" rel="noopener noreferrer">Visit {p.name} ↗<span className="sr-only"> (opens in a new tab)</span></a></div></section>
 <div className="product-full-image" style={{backgroundColor:p.colour}}><img src={p.image} alt={p.name+" current website preview"} width="1440" height="1040"/></div>
 <section className="editorial-section product-overview"><div><span className="section-label">Who it’s for</span><h2>{p.audience}.</h2></div><p>{p.description}</p></section>
 <section className="editorial-section feature-section"><h2>What you can do.</h2><div className="feature-list">{p.features.map(f=><article key={f.title}><h3>{f.title}</h3><p>{f.body}</p></article>)}</div><p className="product-note">{p.note}</p></section>
 <section className="editorial-section product-enquiry"><h2>Questions about {p.name}?</h2><Link className="quiet-link" href={"/contact?product="+p.slug}>Contact the team ↗</Link></section>
 <Link className="next-product" href={"/products/"+next.slug}><span>Next product</span><strong>{next.name}</strong><span aria-hidden="true">↗</span></Link></>;
}
