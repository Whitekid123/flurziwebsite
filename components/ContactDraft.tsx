"use client";
import {useCallback, useEffect, useRef, useState} from "react";
import Link from "next/link";
import Script from "next/script";
import {platforms} from "@/lib/site-content";
import {enquiryTopics} from "@/lib/contact-topics";
declare global { interface Window { turnstile?: {
  render: (el: HTMLElement, options: Record<string, unknown>) => string;
  reset: (id: string) => void; remove: (id: string) => void;
}; } }
export default function ContactDraft({enabled, siteKey, initialTopic}: {enabled: boolean; siteKey: string; initialTopic: string}) {
  const [topic, setTopic] = useState(initialTopic), [token, setToken] = useState("");
  const [state, setState] = useState<"idle"|"sending"|"success"|"error">("idle"), [message, setMessage] = useState("");
  const container = useRef<HTMLDivElement>(null), widget = useRef<string|undefined>(undefined);
  const requestId = useRef(""), submitting = useRef(false), status = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    return () => { if (widget.current) { window.turnstile?.remove(widget.current); widget.current = undefined; } };
  }, []);
  useEffect(() => {setTopic(initialTopic);}, [initialTopic]);
  const renderChallenge = useCallback(() => {
    if (!container.current || !window.turnstile || widget.current) return;
    widget.current = window.turnstile.render(container.current, {sitekey: siteKey, action: "contact", size: "flexible",
      callback: (value: string) => {setToken(value);},
      "expired-callback": () => setToken(""),
      "error-callback": () => {setToken(""); setState("error"); setMessage("The security check could not load. Please check your connection and try again.");},
    });
  }, [siteKey]);
  if (!enabled) return <div className="contact-draft contact-unavailable"><span className="section-label">ENQUIRY OPTIONS</span><h2>Online enquiries<br/>are not open yet.</h2><p>Email delivery is being set up. This page cannot currently send an enquiry.</p><p>You can write to our registered postal address, or visit the relevant platform for existing account support.</p><a className="corp-link" href="#registered-office">Registered postal address <span aria-hidden="true">&#8595;</span></a><Link className="corp-link" href="/products">Find your platform <span aria-hidden="true">&#8599;</span></Link></div>;
  return <form className="contact-draft" aria-busy={state === "sending"} onChange={() => {requestId.current = ""; if (state !== "sending") {setState("idle"); setMessage("");}}} onSubmit={async event => {
    event.preventDefault();
    if (submitting.current || !token) return;
    submitting.current = true; setState("sending"); setMessage("");
    const form = event.currentTarget, data = Object.fromEntries(new FormData(form));
    if (!requestId.current) requestId.current = crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({...data, token, requestId: requestId.current}), signal: AbortSignal.timeout(25000)});
      const result = await response.json();
      setMessage(result.message || "We could not confirm delivery. Please try again.");
      if (response.ok) {
        setState("success"); form.reset(); requestId.current = "";
        window.dispatchEvent(new Event("flurzi:enquiry-sent"));
      } else setState("error");
    } catch {setState("error"); setMessage("We could not confirm delivery. Your text is still here; please try again.");}
    finally {
      submitting.current = false; setToken("");
      if (widget.current) window.turnstile?.reset(widget.current);
      requestAnimationFrame(() => status.current?.focus());
    }
  }}>
    <fieldset disabled={state === "sending"}>
      <label htmlFor="contact-topic">What would you like to discuss?<select id="contact-topic" name="topic" value={topic} onChange={e => setTopic(e.target.value)}>{[...Object.values(enquiryTopics), ...platforms.map(p => p.enquiry)].map(t => <option key={t}>{t}</option>)}</select></label>
      <div className="form-row"><label htmlFor="contact-name">Name<input id="contact-name" name="name" autoComplete="name" required maxLength={120}/></label><label htmlFor="contact-email">Email<input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={200}/></label></div>
      <label htmlFor="contact-organisation">Organisation <span>(optional)</span><input id="contact-organisation" name="organisation" autoComplete="organization" maxLength={160}/></label>
      <label htmlFor="contact-message">Your enquiry<textarea id="contact-message" name="message" rows={6} required maxLength={5000} placeholder="Tell us what you would like to discuss."/></label>
      <div className="contact-trap" aria-hidden="true"><label>Leave this blank<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
      <p className="form-explanation">We use your details to respond to this enquiry. Please do not include passwords, payment details or sensitive worker records. <Link href="/privacy-policy">Privacy information</Link></p>
      <div ref={container} className="contact-challenge"/>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onReady={renderChallenge} onError={() => {setState("error"); setMessage("The security check could not load. Please reload this page to try again.");}}/>
      {!token && state !== "success" && <p className="form-explanation">Complete the security check to enable sending.</p>}
      <button type="submit" className="solid-link" disabled={!token || state === "sending"}>{state === "sending" ? "Sending enquiry..." : "Send enquiry"} <span aria-hidden="true">&#8599;</span></button>
    </fieldset>
    {message && <p tabIndex={-1} ref={status} role={state === "error" ? "alert" : "status"} className="draft-status">{message}</p>}
    <noscript><p>JavaScript is needed for the security check. You can write to the registered postal address shown on this page.</p></noscript>
  </form>;
}
