"use client";
import {useEffect, type MouseEvent} from "react";
import {useRouter} from "next/navigation";
import {FLAGSHIP_MARKUP} from "@/lib/flagship-markup";
/** Working motion study for FLURZIHQ. Original pages and product routes remain intact.
 * The markup is authored in-repo; it is NOT user-supplied HTML. */
export default function FlagshipHome(){
 const router=useRouter();
 useEffect(()=>{
 const previous=document.querySelector('script[data-flagship-motion]'); previous?.remove();
 const script=document.createElement('script');
 script.src='/flagship/motion.js'; script.async=true;script.dataset.flagshipMotion='true';
 document.body.appendChild(script);
 return()=>{script.remove();(window as Window & {__flurziExperienceCleanup?:()=>void}).__flurziExperienceCleanup?.();};
 },[]);
 /** Raw anchors would force a full page reload; route them through Next instead. */
 const go=(event:MouseEvent<HTMLDivElement>)=>{
  if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
  const el=event.target instanceof Element?event.target.closest("a[href]"):null;
  if(!(el instanceof HTMLAnchorElement))return;
  const href=el.getAttribute("href")??"";
  if(!href.startsWith("/")||href.startsWith("//")||(el.target&&el.target!=="_self"))return;
  event.preventDefault();
  router.push(href);
 };
 return <div className="flagship-root" onClick={go} dangerouslySetInnerHTML={{__html:FLAGSHIP_MARKUP}} />;
}
