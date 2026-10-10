import type {Metadata} from "next";
import Link from "next/link";
import original from "@/lib/faq-content.json";
export const metadata:Metadata={title:"Frequently asked questions",description:"Answers about Flurzi, our four products, the meaning of the company name, accounts and support.",alternates:{canonical:"/faq"}};
const replacements:Record<string,string>={
 "What is Flurzi Commit?":"Flurzi Commit is a personal workspace for financial planning and commitments. It helps users record costs and timing, review Financial Capacity and understand the impact of a plan before acting.",
 "Can I use it for any saving goal?":"Use Flurzi Commit to organise a defined commitment and review its costs, timing and assumptions. Visit the product website for its current planning features and scope.",
 "Is End Novel only for paid reading?":"No. EndNovel offers free ways to start reading, with supported episode unlocks. Visit the platform for current access options.",
 "Will there be paid plans?":"Pricing and access options vary by product. Check the relevant product website for current trials, subscriptions, unlock options and terms."
};
const items=original.map(q=>({...q,answer:replacements[q.question]||q.answer}));
const groups=[...new Set(items.map(q=>q.group))];
const id=(group:string)=>group.toLowerCase().replace(/[^a-z0-9]+/g,"-");
export default function FAQPage(){return <><section className="page-intro"><span className="section-label">FAQ</span><h1>A few useful answers.</h1><p>About the company, the products, and how to get help.</p></section><div className="faq-layout editorial-section"><aside><nav aria-label="FAQ topics">{groups.map(g=><a href={"#"+id(g)} key={g}>{g}</a>)}</nav><Link href="/contact" className="quiet-link">Ask us a question ↗</Link></aside><div>{groups.map(g=><section className="faq-group" id={id(g)} key={g}><h2>{g}</h2>{items.filter(q=>q.group===g).map(q=><details key={q.question}><summary>{q.question}<span aria-hidden="true">+</span></summary><p>{q.answer}</p></details>)}</section>)}</div></div></>;}
