"use client";
import Link from "next/link";
import Brand from "./Brand";
import {usePathname} from "next/navigation";
import {useCallback,useEffect,useRef,useState} from "react";
import {gsap} from "gsap";
import {SITE_LINKS,platforms} from "@/lib/site-content";
export default function SiteHeader(){
 const path=usePathname();
 const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false);
 const button=useRef<HTMLButtonElement>(null),panel=useRef<HTMLDivElement>(null),backdrop=useRef<HTMLDivElement>(null),closing=useRef(false);
 const close=useCallback((immediate=false)=>{
  if(closing.current)return;
  if(immediate||matchMedia("(prefers-reduced-motion: reduce)").matches){setOpen(false);return;}
  closing.current=true;
  gsap.to(backdrop.current,{opacity:0,duration:.25});
  gsap.to(panel.current,{clipPath:"inset(0% 0% 100% 0%)",y:-15,duration:.35,ease:"power3.inOut",onComplete:()=>{closing.current=false;setOpen(false);}});
 },[]);
 const dark=path==="/"&&!scrolled&&!open;
 useEffect(()=>{
  const update=()=>{const hero=document.querySelector<HTMLElement>(".home-opening");const distance=hero?Math.max(45,hero.offsetHeight-100):45;setScrolled(scrollY>distance);};
  update();window.addEventListener("scroll",update,{passive:true});window.addEventListener("resize",update);
  return()=>{window.removeEventListener("scroll",update);window.removeEventListener("resize",update);};
 },[path]);
 useEffect(()=>{
  if(!open)return;
  const old=document.body.style.overflow;document.body.style.overflow="hidden";window.__lenis?.stop();
  const outside=Array.from(document.querySelectorAll<HTMLElement>("#main,.editorial-footer,.primary-links,.analytics-choice,.analytics-settings"));const previous=outside.map(el=>el.inert);outside.forEach(el=>{el.inert=true;});
  const ctx=gsap.context(()=>{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
   gsap.fromTo(panel.current,{clipPath:"inset(0% 0% 100% 0%)",y:-15},{clipPath:"inset(0% 0% 0% 0%)",y:0,duration:.65,ease:"power4.inOut"});
   gsap.fromTo(backdrop.current,{opacity:0},{opacity:1,duration:.4});
   gsap.from(".menu-link-label",{yPercent:115,rotation:3,duration:.65,stagger:.045,delay:.15,ease:"power4.out",clearProps:"all"});
   gsap.from(".menu-secondary",{opacity:0,y:15,duration:.5,delay:.4,clearProps:"all"});
  }});
  panel.current?.querySelector<HTMLAnchorElement>("a")?.focus({preventScroll:true});
  const key=(e:KeyboardEvent)=>{if(e.key==="Escape")close();if(e.key!=="Tab")return;const items=[button.current,...Array.from(panel.current?.querySelectorAll<HTMLElement>("a")||[])].filter(Boolean) as HTMLElement[];const first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}};
  window.addEventListener("keydown",key);
  return()=>{ctx.revert();gsap.killTweensOf([panel.current,backdrop.current]);closing.current=false;outside.forEach((el,i)=>{el.inert=previous[i];});document.body.style.overflow=old;window.__lenis?.start();window.removeEventListener("keydown",key);button.current?.focus({preventScroll:true});};
 },[open,close]);
 return <header className={"editorial-header "+(dark?"on-dark":"")+(open?" menu-open":"")} style={open?{backdropFilter:"none",WebkitBackdropFilter:"none"}:undefined}>
  <Link href="/" className="wordmark" aria-label="Flurzi home" tabIndex={open?-1:0} onClick={()=>close(true)}><Brand/></Link>
  <nav className="primary-links" aria-label="Main navigation">{SITE_LINKS.map(l=><Link href={l.href} key={l.href} aria-current={path===l.href||path.startsWith(l.href+"/")?"page":undefined}>{l.label}</Link>)}</nav>
  <button type="button" className="editorial-menu-button" ref={button} aria-expanded={open} aria-controls="site-menu" onClick={()=>open?close():setOpen(true)}><span>{open?"Close":"Menu"}</span><span className={open?"menu-bars expanded":"menu-bars"} aria-hidden="true"><i/><i/></span></button>
  {open&&<><div ref={backdrop} className="menu-backdrop" aria-hidden="true" onClick={()=>close()}/><div className="editorial-menu" id="site-menu" ref={panel} data-lenis-prevent>
   <nav aria-label="Expanded navigation">{[{href:"/",label:"Home"},...SITE_LINKS].map(l=><Link key={l.href} href={l.href} onClick={()=>close(true)} aria-current={path===l.href?"page":undefined}><span className="menu-link-label">{l.label}</span><span className="menu-link-arrow" aria-hidden="true">↗</span></Link>)}</nav>
   <div className="menu-secondary"><div><p>Our ecosystem</p>{platforms.map(p=><Link href={"/products/"+p.slug} key={p.slug} onClick={()=>close(true)}>{p.name}</Link>)}</div><div><p>Contact</p><Link href="/contact" onClick={()=>close(true)}>Enquiry options ↗</Link><Link href="/faq" onClick={()=>close(true)}>FAQs ↗</Link></div></div>
  </div></>}
 </header>;
}
