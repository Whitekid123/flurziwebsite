"use client";
import {useEffect} from "react";
import Lenis from "lenis";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
declare global{interface Window{__lenis?:Lenis;}}
export default function SmoothScroll(){
 useEffect(()=>{
  const preference=matchMedia("(prefers-reduced-motion: reduce)");
  let lenis:Lenis|undefined;
  const tick=(time:number)=>lenis?.raf(time*1000);
  const stop=()=>{gsap.ticker.remove(tick);lenis?.destroy();if(window.__lenis===lenis)delete window.__lenis;lenis=undefined;};
  const update=()=>{stop();if(preference.matches)return;lenis=new Lenis({lerp:.1,anchors:false,smoothWheel:true});window.__lenis=lenis;lenis.on("scroll",ScrollTrigger.update);gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0);};
  // Native anchor jumps can race Lenis when a held section or viewport changes.
  // Sync to the real scroll position, then let Lenis honour CSS scroll margins.
  const onAnchor = (event: MouseEvent) => {
   if (!lenis || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
   const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
   if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return;
   const url = new URL(link.href);
   if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return;
   let id: string;
   try { id = decodeURIComponent(url.hash.slice(1)); } catch { return; }
   const target = document.getElementById(id);
   if (!target) return;
   event.preventDefault();
   lenis.scrollTo(window.scrollY, {immediate: true, force: true});
   lenis.scrollTo(target, {duration: .8});
   if (location.hash !== url.hash) history.pushState(history.state, "", url.hash);
   const hadTabIndex = target.hasAttribute("tabindex");
   if (!hadTabIndex) target.setAttribute("tabindex", "-1");
   target.focus({preventScroll: true});
   if (!hadTabIndex) target.addEventListener("blur", () => target.removeAttribute("tabindex"), {once: true});
  };
  document.addEventListener("click", onAnchor);
  update();preference.addEventListener("change",update);
  let cancelled=false;document.fonts.ready.then(()=>{if(!cancelled)ScrollTrigger.refresh();});
  return()=>{document.removeEventListener("click",onAnchor);cancelled=true;preference.removeEventListener("change",update);stop();};
 },[]);
 return null;
}
