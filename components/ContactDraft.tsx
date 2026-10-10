"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {COMPANY,platforms} from "@/lib/site-content";
export default function ContactDraft(){
 const [topic,setTopic]=useState("General company enquiry"),[prepared,setPrepared]=useState(false);
 useEffect(()=>{const slug=new URLSearchParams(window.location.search).get("product");const p=platforms.find(p=>p.slug===slug);if(p)setTopic(p.enquiry);},[]);
 return <form className="contact-draft" onSubmit={e=>{e.preventDefault();const data=new FormData(e.currentTarget);const body="Name: "+data.get("name")+"\nReply email: "+data.get("email")+"\n\n"+data.get("message");window.location.href="mailto:"+COMPANY.email+"?subject="+encodeURIComponent(topic)+"&body="+encodeURIComponent(body);setPrepared(true);}}>
  <div className="form-row"><label htmlFor="contact-name">Name<input id="contact-name" name="name" autoComplete="name" required maxLength={120}/></label><label htmlFor="contact-email">Email<input id="contact-email" type="email" name="email" autoComplete="email" required maxLength={200}/></label></div>
  <label htmlFor="contact-topic">What can we help with?<select id="contact-topic" name="topic" value={topic} onChange={e=>setTopic(e.target.value)}>{["General company enquiry",...platforms.map(p=>p.enquiry),"Projects and partnerships","Support request","Privacy and data protection"].map(t=><option key={t}>{t}</option>)}</select></label>
  <label htmlFor="contact-message">Message<textarea id="contact-message" name="message" rows={5} required maxLength={5000}/></label>
  <p className="form-explanation">This opens a draft in your email app. You can review it before sending. <Link href="/privacy-policy">Privacy policy</Link></p>
  <button className="solid-link" type="submit">Open email draft <span aria-hidden="true">↗</span></button>
  {prepared&&<p role="status" className="draft-status">Your email app should open with the draft. If it doesn’t, email <a href={"mailto:"+COMPANY.email}>{COMPANY.email}</a> directly.</p>}
 </form>;
}
