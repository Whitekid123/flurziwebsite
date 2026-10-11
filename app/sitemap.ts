import type {MetadataRoute} from "next";
import {platforms,LEGAL_LINKS} from "@/lib/site-content";
export default function sitemap():MetadataRoute.Sitemap{return ["/","/about","/products","/innovation","/partnerships","/contact","/faq",...platforms.map(p=>"/products/"+p.slug),...LEGAL_LINKS.map(l=>l.href)].map(path=>({url:"https://www.flurzi.com"+path}))}
