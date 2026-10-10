"use client";
import dynamic from "next/dynamic";
import { Fragment, Component, type ReactNode, type CSSProperties, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { COMPANY } from "@/lib/content";
import { HERO_MEDIA, PRODUCT_MEDIA } from "@/lib/media";
import ScrollMedia from "./ScrollMedia";

gsap.registerPlugin(ScrollTrigger);
const HeroScene = dynamic(() => import("./HeroMonogram"), { ssr: false });
const products = [
  { id:"sponsorsafe",number:"01",name:"SponsorSafe HR",short:"SponsorSafe",domain:"sponsorsafe-hr.com",url:"https://www.sponsorsafe-hr.com/",category:"WORK & COMPLIANCE",title:"A little more order.\nA lot more confidence.",description:"A dedicated workspace for UK sponsor licence records, right-to-work evidence and audit preparation. Built to make the important details easier to keep in view.",tags:["HR technology","Records & evidence","Audit preparation"],color:"#2f5f93",background:"#e7e8e4" },
  { id:"commit",number:"02",name:"Flurzi Commit",short:"Commit",domain:"flurzicommit.com",url:"https://www.flurzicommit.com/landing",category:"FINANCIAL INTELLIGENCE",title:"See the bigger picture.\nMake your next move.",description:"Financial intelligence and decision-support software that helps people understand their commitments. A clearer view of the decisions ahead.",tags:["Decision support","Financial clarity","Personal planning"],color:"#2dd4bf",background:"#10292d" },
  { id:"cinema",number:"03",name:"FlurziCinema",short:"Cinema",domain:"flurzicinema.com",url:"https://flurzicinema.com/",category:"FILM & ENTERTAINMENT",title:"For the moments\nthat pull you in.",description:"A home for screen stories. Explore FlurziCinema and discover an entertainment experience built around what you want to watch next.",tags:["Entertainment","Discovery","Streaming"],color:"#d9b36b",background:"#252016" },
  { id:"endnovel",number:"04",name:"EndNovel",short:"EndNovel",domain:"endnovel-flurzi.com",url:"https://endnovel-flurzi.com/",category:"STORIES & READING",title:"One more chapter.\nA whole new world.",description:"Original serial stories, new discoveries and familiar favourites. Start reading for free, find your next obsession, and take the story with you.",tags:["Original stories","Read & listen","Discovery"],color:"#ff5b22",background:"#eadbba" },
];
const links=[{href:"#products",label:"Our products"},{href:"#about",label:"The company"},{href:"#future",label:"What’s next"}];
class SceneBoundary extends Component<{children:ReactNode},{failed:boolean}> {
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?null:this.props.children;}
}
function Brand({footer=false}:{footer?:boolean}){
 return <a href="#top" className={`brand ${footer?"brand-footer":""}`} aria-label="Flurzi home">flurzi<span aria-hidden="true">✳</span></a>;
}
function Navigation(){
 const [open,setOpen]=useState(false);
 const [scrolled,setScrolled]=useState(false);
 const toggle=useRef<HTMLButtonElement>(null);
 const menu=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const onScroll=()=>setScrolled(window.scrollY>40);
  onScroll();window.addEventListener("scroll",onScroll,{passive:true});
  return ()=>window.removeEventListener("scroll",onScroll);
 },[]);
 useEffect(()=>{
  if(!open)return;
  const previous=document.body.style.overflow;
  document.body.style.overflow="hidden";window.__lenis?.stop();
  menu.current?.querySelector<HTMLAnchorElement>("a")?.focus();
  const keyboard=(event:KeyboardEvent)=>{
   if(event.key==="Escape")setOpen(false);
   if(event.key!=="Tab")return;
   const items=[toggle.current,...(menu.current?.querySelectorAll<HTMLElement>("a")||[])].filter(Boolean) as HTMLElement[];
   const first=items[0],last=items[items.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  };
  const resize=()=>{if(window.innerWidth>900)setOpen(false);};
  window.addEventListener("keydown",keyboard);window.addEventListener("resize",resize);
  return ()=>{
   document.body.style.overflow=previous;window.__lenis?.start();
   window.removeEventListener("keydown",keyboard);window.removeEventListener("resize",resize);
   toggle.current?.focus({preventScroll:true});
  };
 },[open]);
 return <header className={`site-header ${scrolled||open?"is-scrolled":""}`}>
  <div className="nav-inner"><Brand/><nav className="desktop-nav" aria-label="Main navigation">{links.map(l=><a key={l.href} href={l.href}>{l.label}</a>)}</nav>
   <a className="nav-contact" href="#contact">Let’s talk <span className="contact-symbol" aria-hidden="true">↗</span></a>
   <button className="menu-toggle" ref={toggle} type="button" aria-expanded={open} aria-controls="mobile-navigation" onClick={()=>setOpen(!open)}>{open?"Close":"Menu"}<span aria-hidden="true">{open?"−":"+"}</span></button>
  </div>
  {open&&<div id="mobile-navigation" className="mobile-navigation" ref={menu}><nav aria-label="Mobile navigation">{[...links,{href:"#contact",label:"Let’s talk"}].map((l,i)=><a href={l.href} onClick={()=>setOpen(false)} key={l.href}><span>0{i+1}</span>{l.label}</a>)}</nav><p>Different worlds. Built by Flurzi.</p></div>}
 </header>;
}
function Hero(){
 const root=useRef<HTMLElement>(null);
 const progress=useRef(0);
 const [webgl,setWebgl]=useState(false);
 const [sceneReady,setSceneReady]=useState(false);
 const [active,setActive]=useState(true);
 useEffect(()=>{
  const preference=matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)");
  const update=()=>{
   setSceneReady(false);
   try{const canvas=document.createElement("canvas");const context=!preference.matches&&canvas.getContext("webgl2");setWebgl(Boolean(context));if(context)context.getExtension("WEBGL_lose_context")?.loseContext();}
   catch{setWebgl(false);}
  };
  update();preference.addEventListener("change",update);
  const observer=new IntersectionObserver(([entry])=>setActive(entry.isIntersecting));
  if(root.current)observer.observe(root.current);
  const motion=gsap.matchMedia();
  motion.add("(prefers-reduced-motion: no-preference)",()=>{
   const ctx=gsap.context(()=>{
    const timeline=gsap.timeline({defaults:{ease:"none"},scrollTrigger:{trigger:root.current,start:"top top",end:"bottom bottom",scrub:0.65,onUpdate:self=>{progress.current=self.progress;}}});
    timeline.to(".hero-line-one",{xPercent:-65,opacity:0,duration:.45},0)
     .to(".hero-line-two",{xPercent:65,opacity:0,duration:.45},0)
     .to(".hero-byline, .hero-bottom, .hero-eyebrow",{opacity:0,y:-35,duration:.2},0)
     .to(".hero-art",{scale:2.7,rotation:22,duration:1},0)
     .to(".hero-art",{opacity:.22,duration:.2},.3)
     .fromTo(".hero-reveal",{autoAlpha:0,scale:.72},{autoAlpha:1,scale:1,duration:.2},.3)
     .to(".hero-reveal",{autoAlpha:0,scale:1.15,y:-70,duration:.2},.8)
     .to(".hero-stage",{backgroundColor:"#17382f",duration:.3},.7)
     .fromTo(".journey-progress i",{scaleX:0},{scaleX:1,duration:1},0);
   },root);
   return ()=>ctx.revert();
  });
  return ()=>{preference.removeEventListener("change",update);observer.disconnect();motion.revert();};
 },[]);
 return <section className="flagship-hero" id="top" ref={root} aria-labelledby="hero-title">
  <div className="hero-stage">
   <div className="hero-aura" aria-hidden="true"/><div className="hero-grid" aria-hidden="true"/>
   <div className="hero-eyebrow eyebrow"><span>INDEPENDENT THINKING.</span><span>CONNECTED WORLDS.</span></div>
   <div className={"hero-art "+(sceneReady?"scene-ready":"")} aria-hidden="true">
    <div className="portal-fallback">{Array.from({length:9},(_,i)=><i key={i} style={{"--i":i} as CSSProperties}/>)}</div>
    {HERO_MEDIA.video?<ScrollMedia video={HERO_MEDIA.video} poster={HERO_MEDIA.poster} className="hero-video"/>:webgl&&<SceneBoundary><HeroScene active={active} progress={progress} onReady={()=>setSceneReady(true)}/></SceneBoundary>}
   </div>
   <div className="hero-content">
    <h1 id="hero-title"><span className="hero-line hero-line-one">Different</span><span className="hero-line hero-line-two">worlds<span className="mint">.</span></span><span className="hero-byline">Built by Flurzi.</span></h1>
   </div>
   <div className="hero-reveal" aria-hidden="true"><span className="eyebrow">ONE INDEPENDENT MIND</span><p>A world of work.<br/>A world of stories.<br/><em>A world of possibility.</em></p><span className="reveal-cross">✳</span></div>
   <div className="hero-bottom shell"><p>Digital products for the way<br/>we work, live and discover.</p><a href="#products" className="explore-button"><span>Enter our worlds</span><span aria-hidden="true">↓</span></a><span className="hero-side-note">TECHNOLOGY WITH<br/>A HUMAN REASON.</span></div>
   <div className="journey-progress"><span>FL / 001</span><div><i/></div><span>SCROLL TO EXPLORE</span></div>
  </div>
 </section>;
}
function ProductShowcase(){
 return <section id="products" className="worlds-section" aria-labelledby="products-title">
  <div className="worlds-intro shell">
   <div className="eyebrow dark-eyebrow"><span>01 / THE FLURZI UNIVERSE</span><span>FOUR WORLDS. AND COUNTING.</span></div>
   <h2 id="products-title"><span>Built for life.</span><br/><em>In all its forms.</em><span className="intro-asterisk" aria-hidden="true">✳</span></h2>
   <div className="intro-bottom"><p>Work that flows. Decisions that feel clearer.<br/>Stories that stay with you. This is our world.</p><nav aria-label="Choose a product">{products.map(p=><a key={p.id} href={"#"+p.id}><span>{p.number}</span>{p.short}<span aria-hidden="true">↗</span></a>)}</nav></div>
  </div>
  <div className="product-list">{products.map((p,index)=><Fragment key={p.id}><div className="world-trigger" id={p.id} aria-hidden="true"/><article className={"world-card world-"+p.id} data-world={p.id} style={{"--world-accent":p.color,"--world-bg":p.background,zIndex:index+1} as CSSProperties} aria-labelledby={p.id+"-title"}>
   <div className="world-stage">
    <div className="world-atmosphere" aria-hidden="true" style={{backgroundImage:"url("+PRODUCT_MEDIA[p.id].image+")"}}/>
    <div className="world-topline"><span className="eyebrow">{p.number} / {p.category}</span><span className="eyebrow">A FLURZI WORLD</span></div>
    <span className="world-ghost" aria-hidden="true">{p.short}</span>
    <div className="world-copy"><span className="world-number">{p.number}<span> / 04</span></span><h3 id={p.id+"-title"}>{p.name}</h3><p className="world-headline">{p.title.split("\n").map(line=><span key={line}>{line}</span>)}</p><p className="world-description">{p.description}</p><a className="product-cta" href={p.url} target="_blank" rel="noopener noreferrer">Explore {p.short}<span aria-hidden="true">↗</span><span className="sr-only"> (opens in a new tab)</span></a></div>
    <a className="world-visual" href={p.url} target="_blank" rel="noopener noreferrer" aria-label={"Visit "+p.name+" (opens in a new tab)"}>
     <div className="product-window">{PRODUCT_MEDIA[p.id].video?<ScrollMedia video={PRODUCT_MEDIA[p.id].video!} poster={PRODUCT_MEDIA[p.id].image} className="product-image"/>:<img src={PRODUCT_MEDIA[p.id].image} alt={p.name+" website preview"} className="product-image" loading="lazy" width="1440" height="1040"/>}</div>
     <span className="preview-label">{p.domain}<span aria-hidden="true">↗</span></span>
    </a>
    <div className="world-bottomline"><span>{p.tags.join(" / ")}</span><a href={index<products.length-1?"#"+products[index+1].id:"#about"}>{index<products.length-1?"NEXT WORLD":"MEET FLURZI"} <span aria-hidden="true">↓</span></a></div>
   </div>
  </article></Fragment>)}</div>
 </section>;
}
function Company(){
 return <section className="company-section" id="about" aria-labelledby="company-title"><div className="shell">
  <div className="eyebrow"><span>02 / THE COMPANY BEHIND THE PRODUCTS</span><span className="mint">FLURZI MOBILE APP LIMITED</span></div>
  <h2 id="company-title" className="company-statement" data-reveal>Good technology<br/>starts with a<br/><em>human reason.</em></h2>
  <div className="company-detail"><div className="company-mark" aria-hidden="true">f<span>✳</span></div><div><p className="company-lead">A simpler working day. A clearer decision. A story you can’t put down.</p><p>These are the things that move us. Flurzi brings together products for work, personal planning, entertainment and reading. Each begins with a different need. All share a belief that thoughtful software can make a difference.</p><a href={`mailto:${COMPANY.email}`} className="text-link">Get to know Flurzi <span aria-hidden="true">↗</span></a></div></div>
  <div className="disciplines" id="capabilities"><div className="eyebrow">WHAT WE BUILD</div>{[
   ["01","Tools for working","Records, evidence and everyday workflows that help people stay organised."],
   ["02","Tools for deciding","Clear information and planning experiences that help people see their next step."],
   ["03","Places to discover","Experiences for finding films, following stories and exploring something new."],
  ].map(([n,title,body])=><div className="discipline-row" key={n} data-reveal><span className="eyebrow">{n}</span><h3>{title}</h3><p>{body}</p><span className="discipline-cross" aria-hidden="true">✳</span></div>)}</div>
 </div></section>;
}
function Future(){
 return <section id="future" className="future-section" aria-labelledby="future-title"><div className="shell"><div className="eyebrow dark-eyebrow">03 / STILL CURIOUS</div><div className="future-heading"><h2 id="future-title">The next chapter<br/>is <em>taking shape.</em></h2><p>New ideas. New possibilities.<br/>A glimpse at what we’re exploring next.</p></div><div className="future-grid">
  <article className="future-card"><div className="future-meta"><span>COMMERCE</span><span>IN DEVELOPMENT</span></div><h3>Flurzi X<span aria-hidden="true">×</span></h3><p>A marketplace concept connecting product discovery, seller storefronts and the shopping experience.</p><span className="future-foot">DISCOVER / CONNECT / SHOP</span></article>
  <article className="future-card"><div className="future-meta"><span>GAMING</span><span>IN DEVELOPMENT</span></div><h3>PlayVault<span aria-hidden="true">⊞</span></h3><p>A game hub concept bringing discovery, player profiles and a personal library into one place.</p><span className="future-foot">EXPLORE / PLAY / RETURN</span></article>
 </div></div></section>;
}
function Contact(){
 return <><section id="contact" className="contact-section" aria-labelledby="contact-title"><div className="shell"><div className="eyebrow">04 / START A CONVERSATION</div><div className="contact-heading"><h2 id="contact-title">What’s on<br/><em>your mind?</em></h2><a href={`mailto:${COMPANY.email}`} className="contact-orb" aria-label="Email Flurzi"><span>Let’s talk</span><span aria-hidden="true">↗</span></a></div><div className="contact-bottom"><p>A product question, a partnership,<br/>or the start of something new.</p><a className="contact-email" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></div></div></section>
 <footer className="site-footer"><div className="shell"><div className="footer-top"><Brand footer/><nav aria-label="Footer navigation"><a href="#products">Our products</a><a href="#about">The company</a><a href="#future">What’s next</a><a href={COMPANY.phoneHref}>{COMPANY.phone}</a></nav></div><div className="footer-wordmark" aria-hidden="true">flurzi<span>✳</span></div><div className="footer-bottom"><span>© 2026 {COMPANY.name}</span><span>Different worlds. Built by Flurzi.</span><a href="#top">Back to top ↑</a></div></div></footer></>;
}
export default function HomeExperience(){
 const root=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const media=gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)",()=>{
   const context=gsap.context(()=>{
    gsap.from(".hero-content",{opacity:0,y:65,duration:1.5,ease:"power3.out",clearProps:"all"});
    gsap.from(".hero-art",{opacity:0,duration:2,clearProps:"opacity"});
    gsap.from(".hero-bottom, .hero-eyebrow",{opacity:0,duration:1.2,delay:.5,clearProps:"opacity"});
    gsap.from(".worlds-intro h2>span:first-child",{xPercent:-15,opacity:.15,ease:"none",scrollTrigger:{trigger:".worlds-intro",start:"top bottom",end:"top 20%",scrub:1}});
    gsap.from(".worlds-intro h2>em",{xPercent:15,opacity:.15,ease:"none",scrollTrigger:{trigger:".worlds-intro",start:"top bottom",end:"top 20%",scrub:1}});
    gsap.to(".intro-asterisk",{rotation:150,ease:"none",scrollTrigger:{trigger:".worlds-intro",start:"top bottom",end:"bottom top",scrub:1}});
    const cards=gsap.utils.toArray<HTMLElement>(".world-card");
    cards.forEach((card,index)=>{
     const trigger=card.previousElementSibling;
     const stage=card.querySelector(".world-stage");
     const visual=card.querySelector(".world-visual");
     const desktop=window.innerWidth>900;
     gsap.fromTo(stage,{clipPath:"inset(8% 4% 0% 4% round 35px)"},{clipPath:"inset(0% 0% 0% 0% round 0px)",ease:"none",scrollTrigger:{trigger,start:"top 95%",end:"top top",scrub:.7}});
     gsap.fromTo(visual,{rotateY:desktop?-24:0,rotateZ:desktop?9:4,scale:.72,y:100},{rotateY:desktop?-8:0,rotateZ:desktop?-3:0,scale:1,y:0,ease:"none",scrollTrigger:{trigger,start:"top bottom",end:"top top",scrub:.7}});
     gsap.from(card.querySelector(".world-copy"),{y:80,opacity:.1,ease:"none",scrollTrigger:{trigger,start:"top 85%",end:"top 5%",scrub:.5}});
     gsap.fromTo(card.querySelector(".world-ghost"),{xPercent:15},{xPercent:-15,ease:"none",scrollTrigger:{trigger,start:"top bottom",end:"top -100%",scrub:1}});
     if(cards[index+1])gsap.to(stage,{scale:.92,filter:"brightness(0.45)",ease:"none",scrollTrigger:{trigger:cards[index+1].previousElementSibling,start:"top bottom",end:"top top",scrub:.7}});
    });
    gsap.fromTo(".company-statement",{backgroundPosition:"100% 0%"},{backgroundPosition:"0% 0%",ease:"none",scrollTrigger:{trigger:".company-statement",start:"top 85%",end:"bottom 40%",scrub:.8}});
    gsap.to(".company-mark",{rotation:90,ease:"none",scrollTrigger:{trigger:".company-detail",start:"top bottom",end:"bottom top",scrub:1}});
    gsap.utils.toArray<HTMLElement>(".discipline-row, .future-card").forEach((el,i)=>gsap.from(el,{y:65,opacity:0,rotate:i%2?2:-2,duration:1,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 92%",once:true},clearProps:"all"}));
    gsap.from(".footer-wordmark",{yPercent:40,ease:"none",scrollTrigger:{trigger:".site-footer",start:"top bottom",end:"bottom bottom",scrub:1}});
   },root);
   return ()=>context.revert();
  });
  return ()=>media.revert();
 },[]);
 return <div ref={root} className="flurzi-site"><a href="#main" className="skip-link">Skip to content</a><Navigation/><main id="main"><Hero/><ProductShowcase/><Company/><Future/><Contact/></main></div>;
}
