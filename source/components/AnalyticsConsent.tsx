"use client";
import {useEffect, useRef, useState} from "react";
import {usePathname} from "next/navigation";
import Script from "next/script";
import Link from "next/link";
import {platforms} from "@/lib/site-content";

declare global { interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; } }
const key = "flurzi-analytics-consent";
const id = process.env.NEXT_PUBLIC_GA_ID || "";
const configured = /^G-[A-Z0-9]+$/.test(id);
const canonical = "https://www.flurzi.com";

export default function AnalyticsConsent() {
  const path = usePathname(), previousPage = useRef("");
  const [choice, setChoice] = useState<"accepted"|"declined"|null>(null), [loaded, setLoaded] = useState(false), [show, setShow] = useState(false);
  useEffect(() => {
    if (!configured) return;
    try {
      const saved = localStorage.getItem(key);
      if (saved === "accepted" || saved === "declined") setChoice(saved);
      else setShow(true);
    } catch {setShow(true);}
  }, []);
  const choose = (next: "accepted"|"declined") => {
    (window as unknown as Record<string, unknown>)[`ga-disable-${id}`] = next === "declined";
    try {localStorage.setItem(key, next);} catch { /* The choice still applies for this visit. */ }
    if (next === "declined") {
      window.gtag?.("consent", "update", {analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied"});
      // Remove GA cookies for this host and parent domains on withdrawal.
      const parts = location.hostname.split(".");
      for (const cookie of document.cookie.split(";")) {
        const name = cookie.split("=")[0].trim();
        if (!/^_ga(?:_|$)/.test(name)) continue;
        document.cookie = `${name}=; Max-Age=0; Path=/`;
        for (let i = 0; i < parts.length - 1; i++) document.cookie = `${name}=; Max-Age=0; Path=/; Domain=.${parts.slice(i).join(".")}`;
      }
      previousPage.current = "";
    } else window.gtag?.("consent", "update", {analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied"});
    setChoice(next); setShow(false);
  };
  useEffect(() => {
    if (!configured || choice !== "accepted" || !loaded || previousPage.current === path) return;
    // Only known corporate routes; never send search strings, form content or arbitrary URLs.
    const safe = ["/", "/about", "/products", "/innovation", "/partnerships", "/contact", "/faq", "/privacy-policy", "/terms", "/disclaimer", "/data-protection", ...platforms.map(p => "/products/" + p.slug)].includes(path);
    if (!safe) return;
    window.gtag?.("event", "page_view", {page_location: canonical + path, page_title: document.title, page_referrer: previousPage.current ? canonical + previousPage.current : ""});
    previousPage.current = path;
  }, [path, choice, loaded]);
  useEffect(() => {
    if (!configured || choice !== "accepted" || !loaded) return;
    const click = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-conversion]") : null;
      if (!link || !["app_download", "platform_access", "product_website"].includes(link.dataset.conversion || "") || !platforms.some(p => p.slug === link.dataset.platform)) return;
      window.gtag?.("event", link.dataset.conversion, {platform: link.dataset.platform, page_location: canonical + path});
    };
    const sent = () => window.gtag?.("event", "generate_lead", {method: "contact_form", page_location: canonical + "/contact"});
    document.addEventListener("click", click); window.addEventListener("flurzi:enquiry-sent", sent);
    return () => {document.removeEventListener("click", click); window.removeEventListener("flurzi:enquiry-sent", sent);};
  }, [choice, loaded, path]);
  if (!configured) return null;
  return <>
    {choice === "accepted" && <Script id="flurzi-analytics" src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" onReady={() => {
      window.dataLayer ||= [];
      window.gtag ||= function() {window.dataLayer!.push(arguments);};
      window.gtag("consent", "default", {analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied"});
      window.gtag("js", new Date());
      window.gtag("config", id, {send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false, page_location: canonical + path, page_referrer: "", cookie_flags: "SameSite=Lax;Secure"});
      setLoaded(true);
    }}/>}
    {show ? <section className="analytics-choice" aria-label="Optional analytics"><p>May we use Google Analytics to understand visits and which platform links are useful? It is optional and stays off unless you accept. <Link href="/privacy-policy">Privacy information</Link></p><div><button type="button" onClick={() => choose("declined")}>Decline analytics</button><button type="button" onClick={() => choose("accepted")}>Accept analytics</button></div></section> : <button type="button" className="analytics-settings" onClick={() => setShow(true)}>Analytics preferences</button>}
  </>;
}
