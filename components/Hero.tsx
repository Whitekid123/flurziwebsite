"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { PRODUCTS, demoHref } from "@/lib/content";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

type Mode = "pending" | "webgl" | "static";

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<Mode>("pending");
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const small = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMode(!small && !reduced && supportsWebGL() ? "webgl" : "static");
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(".hero-line > span", { yPercent: 110, duration: 1.4, stagger: 0.09 }, 0.15)
        .from(".hero-fade", { opacity: 0, y: 20, duration: 1, stagger: 0.08 }, 0.7)
        .from(".hero-stage", { opacity: 0, scale: 0.92, duration: 2.2 }, 0);

      gsap.to(".hero-stage", {
        yPercent: 18,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-copy", {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root }
  );

  return (
    <section
      id="top"
      ref={root}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden"
      aria-label="Introduction"
    >
      {/* controlled lighting */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -right-[20%] top-[-10%] h-[80vh] w-[80vh] rounded-full bg-violet/25 blur-[140px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[60vh] w-[60vh] rounded-full bg-electric/15 blur-[140px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-obsidian" />
      </div>

      <div aria-hidden className="hero-stage absolute inset-0 -z-10">
        {mode === "webgl" && <HeroScene active={inView} />}
        {mode === "static" && (
          <div className="absolute inset-0 flex items-start justify-center pt-[16vh] md:items-center md:justify-end md:pr-[10vw] md:pt-0">
            <div className="relative h-[62vw] w-[62vw] max-h-[460px] max-w-[460px]">
              <div className="orb-ring inset-[-22%]" />
              <div className="orb-ring inset-[-38%] border-electric/25" />
              <div className="orb inset-0" />
            </div>
          </div>
        )}
      </div>

      <div className="hero-copy mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-end px-5 pb-10 pt-32 sm:px-8 md:pb-14">
        <p className="hero-fade mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-offwhite/60">
          <span className="h-px w-8 bg-violet" />
          Flurzi Mobile App Limited
        </p>

        <h1 className="max-w-[16ch] text-[13vw] font-medium leading-[0.92] tracking-[-0.045em] sm:text-[10vw] lg:text-[8.2vw] 2xl:text-[132px]">
          <span className="hero-line block overflow-hidden pb-[0.06em]">
            <span className="block">We build</span>
          </span>
          <span className="hero-line block overflow-hidden pb-[0.06em]">
            <span className="block">
              digital <em className="font-serif font-normal italic text-gradient pr-[0.06em]">worlds</em>
            </span>
          </span>
        </h1>

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[1fr_auto] md:items-end">
          <p className="hero-fade max-w-xl text-lg leading-relaxed text-offwhite/70 md:text-xl">
            for <span className="text-offwhite">work</span>,{" "}
            <span className="text-offwhite">commitments</span>,{" "}
            <span className="text-offwhite">entertainment</span> and{" "}
            <span className="text-offwhite">reading</span>. Flurzi designs and engineers the
            products people rely on every day.
          </p>
          <div className="hero-fade flex flex-wrap gap-3">
            <motion.a
              href="#products"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-3 rounded-full bg-offwhite px-6 py-3.5 font-medium text-obsidian"
            >
              Explore products
              <span className="transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden>
                ↓
              </span>
            </motion.a>
            <motion.a
              href={demoHref}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 font-medium backdrop-blur-md transition-colors hover:border-white/40"
            >
              Book a demo
            </motion.a>
          </div>
        </div>

        <div className="hero-fade mt-12 hidden border-t border-white/10 pt-5 md:block">
          <ul className="flex flex-wrap gap-x-10 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-offwhite/50">
            {PRODUCTS.map((p) => (
              <li key={p.id} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.accent }} />
                {p.name} <span className="text-offwhite/30">/ {p.world}</span>
              </li>
            ))}
            <li className="ml-auto text-offwhite/40">Scroll to explore</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
