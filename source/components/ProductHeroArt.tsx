import type {Platform} from "@/lib/site-content";

const visualBySlug:Record<string,string>={
  endnovel:"/flagship/assets/endnovel-art.webp",
  flurzi360:"/flagship/assets/sponsorsafe.webp",
  commit:"/flagship/assets/commit-brand.webp",
  flurzirush:"/flagship/assets/flurzirush-art.webp",
  cinema:"/flagship/assets/cinema-art.webp",
};
/** Product-led rather than decorative sci-fi imagery; existing brand assets only. */
export default function ProductHeroArt({platform,number}:{platform:Platform;number:number}){
  const src=visualBySlug[platform.slug];
  return <div className={"cinema-product-art cinema-product-art--"+platform.slug} aria-hidden="true">
    <div className="cinema-product-art-frame" data-cinema-image>
      {src?<img src={src} alt="" loading="eager"/>:
        <div className="cinema-product-typeset"><small>{platform.category}</small><strong>{platform.slug==="flurzix"?"X.":"CORTEX."}</strong><span>IN DEVELOPMENT</span></div>}
      <div className="cinema-product-art-meta"><span>{String(number).padStart(2,"0")} / 07</span><span>{platform.name}</span></div>
    </div>
  </div>;
}
