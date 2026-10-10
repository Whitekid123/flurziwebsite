import type {Metadata} from "next";
import Link from "next/link";
import ProductGrid from "@/components/ProductGrid";
import {platforms} from "@/lib/site-content";
export const metadata:Metadata={title:"Products",description:"Explore Flurzi's products for UK employer compliance, personal planning, streaming and story reading.",alternates:{canonical:"/products"}};
export default function ProductsPage(){return <>
 <section className="page-intro"><span className="section-label">Our products</span><h1>Four products.<br/>Different everyday needs.</h1><p>Each platform has its own audience, features and identity. Flurzi is the company behind them.</p></section>
 <section className="editorial-section product-directory" aria-label="The Flurzi product family"><ProductGrid/></section>
 <section className="editorial-section compare-section" id="compare"><div className="section-heading"><h2>Find your platform.</h2><p>A quick guide to who each product is for.</p></div><div className="comparison-table" role="region" aria-label="Product comparison" tabIndex={0}><table><thead><tr><th>Product</th><th>Who it’s for</th><th>What it helps with</th></tr></thead><tbody>{platforms.map(p=><tr key={p.slug}><th scope="row"><Link href={"/products/"+p.slug}>{p.name} ↗</Link></th><td>{p.audience}</td><td>{p.summary}</td></tr>)}</tbody></table></div></section>
 </>;}
