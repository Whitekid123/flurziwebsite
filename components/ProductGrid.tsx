import Link from "next/link";
import ScrollMedia from "./ScrollMedia";
import {PRODUCT_MEDIA} from "@/lib/media";
import {platforms} from "@/lib/site-content";
export default function ProductGrid(){
 return <div className="editorial-product-grid">{platforms.map(p=><article key={p.slug}><Link href={"/products/"+p.slug} className="project-image-link" style={{backgroundColor:p.colour}} aria-label={"Explore "+p.name}><div className="project-image-motion">{PRODUCT_MEDIA[p.slug]?.video?<ScrollMedia video={PRODUCT_MEDIA[p.slug].video!} poster={PRODUCT_MEDIA[p.slug].image} className="product-preview-media"/>:<img className="product-preview-media" src={PRODUCT_MEDIA[p.slug]?.image||p.image} alt={p.name+" website"} width={1440} height={1040} loading="lazy"/>}</div><span className="project-view" aria-hidden="true">View product ↗</span></Link><div className="project-caption"><div><h3><Link href={"/products/"+p.slug}>{p.name}</Link></h3><p>{p.category}</p></div><Link href={"/products/"+p.slug} className="project-arrow" aria-label={"Read about "+p.name}>↗</Link></div><p className="project-summary">{p.summary}</p></article>)}</div>;
}
