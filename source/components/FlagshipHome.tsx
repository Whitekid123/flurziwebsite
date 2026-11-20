"use client";
import {useEffect} from "react";
import {FLAGSHIP_MARKUP} from "@/lib/flagship-markup";
/** Working motion study for FLURZIHQ. Original pages and product routes remain intact.
 * The markup is authored in-repo; it is NOT user-supplied HTML. */
export default function FlagshipHome(){
 useEffect(()=>{
  const previous=document.querySelector('script[data-flagship-motion]'); previous?.remove();
  const script=document.createElement('script');
  script.src='/flagship/motion.js'; script.async=true;script.dataset.flagshipMotion='true';
  document.body.appendChild(script);
  return()=>{script.remove();(window as Window & {__flurziExperienceCleanup?:()=>void}).__flurziExperienceCleanup?.();};
 },[]);
 return <div className="flagship-root" dangerouslySetInnerHTML={{__html:FLAGSHIP_MARKUP}} />;
}
