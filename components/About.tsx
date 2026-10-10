"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PRINCIPLES } from "@/lib/content";
import SectionLabel from "./SectionLabel";

gsap.registerPlugin(ScrollTrigger);

const STATEMENT =
  "We believe software should earn its place in someone's day. So we build products that are clear, dependable and quietly ambitious, and we keep improving them long after launch.";

export default function About() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".about-word", {
          opacity: 0.12,
          duration: 0.6,
          stagger: 0.035,
          ease: "power2.out",
          scrollTrigger: { trigger: ".about-statement", start: "top 75%", once: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="about" ref={root} className="relative bg-graphite py-28 md:py-40" aria-labelledby="about-title">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionLabel index="04">About Flurzi</SectionLabel>
        <h2 id="about-title" className="sr-only">
          About Flurzi
        </h2>
        <p className="about-statement mt-10 max-w-[22ch] text-[2.1rem] font-medium leading-[1.08] tracking-[-0.035em] sm:text-5xl lg:max-w-[26ch] lg:text-[4.4rem]">
          {STATEMENT.split(" ").map((w, i) => (
            <span key={i} className="about-word inline-block pr-[0.25em]">
              {w === "quietly" || w === "ambitious," ? (
                <em className="font-serif font-normal italic text-[#b7aaff]">{w}</em>
              ) : (
                w
              )}
            </span>
          ))}
        </p>

        <div className="mt-20 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:mt-28 md:grid-cols-3">
          {PRINCIPLES.map((p, i) => (
            <div key={p.title} data-reveal className="bg-graphite p-8 md:p-10">
              <span className="font-mono text-xs text-violet">0{i + 1}</span>
              <h3 className="mt-6 text-2xl font-medium tracking-tight">{p.title}</h3>
              <p className="mt-3 leading-relaxed text-offwhite/60">{p.body}</p>
            </div>
          ))}
        </div>

        <p data-reveal className="mt-10 max-w-2xl text-offwhite/50">
          Flurzi Mobile App Limited is the company behind SponsorSafe HR, Flurzi Commit,
          FlurziCinema and End Novel, with FlurziX and PlayVault in development.
        </p>
      </div>
    </section>
  );
}
