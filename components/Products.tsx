"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "motion/react";
import { PRODUCTS, COMPANY, type Product } from "@/lib/content";
import SectionLabel from "./SectionLabel";
import { SponsorSafeMock, CommitMock, CinemaMock, EndNovelMock } from "./ProductMocks";

gsap.registerPlugin(ScrollTrigger);

const MOCKS: Record<string, (p: { accent: string }) => React.ReactElement> = {
  sponsorsafe: SponsorSafeMock,
  commit: CommitMock,
  cinema: CinemaMock,
  endnovel: EndNovelMock,
};

export default function Products() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".product-panel").forEach((panel) => {
          const mock = panel.querySelector(".product-mock");
          const title = panel.querySelectorAll(".product-title > span");
          const glow = panel.querySelector(".product-glow");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: panel, start: "top 75%", once: true },
            defaults: { ease: "expo.out" },
          });
          tl.from(title, { yPercent: 105, duration: 1.3, stagger: 0.08 })
            .from(panel.querySelectorAll(".product-fade"), { opacity: 0, y: 24, duration: 1, stagger: 0.06 }, 0.2)
            .from(mock, { opacity: 0, y: 80, rotateX: 12, scale: 0.94, duration: 1.6 }, 0.1);

          if (mock) {
            gsap.to(mock, {
              yPercent: -8,
              ease: "none",
              scrollTrigger: { trigger: panel, start: "top bottom", end: "bottom top", scrub: true },
            });
          }
          if (glow) {
            gsap.fromTo(
              glow,
              { scale: 0.7, opacity: 0.4 },
              {
                scale: 1.1,
                opacity: 1,
                ease: "none",
                scrollTrigger: { trigger: panel, start: "top bottom", end: "center center", scrub: true },
              }
            );
          }
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section id="products" ref={root} className="relative" aria-labelledby="products-title">
      <div className="mx-auto max-w-[1400px] px-5 pt-10 sm:px-8 md:pt-16">
        <SectionLabel index="02">Featured products</SectionLabel>
        <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-end">
          <h2
            id="products-title"
            data-reveal
            className="text-4xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl"
          >
            Four products. <br />
            <span className="font-serif italic font-normal text-offwhite/80">Four distinct worlds.</span>
          </h2>
          <p data-reveal className="max-w-md text-lg leading-relaxed text-offwhite/65 md:justify-self-end">
            Each product has its own personality and its own audience, and each is designed and built
            by Flurzi.
          </p>
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        {PRODUCTS.map((p, i) => (
          <Panel key={p.id} product={p} flip={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function Panel({ product: p, flip }: { product: Product; flip: boolean }) {
  const Mock = MOCKS[p.id];
  return (
    <article
      id={p.id}
      className="product-panel relative isolate flex items-center overflow-hidden border-t border-white/[0.07] py-24 md:min-h-[100svh] md:py-32"
      aria-labelledby={`${p.id}-title`}
      style={{ ["--accent" as string]: p.accent }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div
          className={`product-glow absolute top-1/2 h-[70vmax] w-[70vmax] -translate-y-1/2 rounded-full blur-[120px] ${
            flip ? "-left-[25vmax]" : "-right-[25vmax]"
          }`}
          style={{ background: `radial-gradient(circle, ${p.accent}2e, transparent 65%)` }}
        />
        <span
          className={`absolute bottom-[-0.18em] select-none font-medium leading-none tracking-[-0.06em] text-white/[0.025] text-[38vw] md:text-[26vw] ${
            flip ? "left-[-0.04em]" : "right-[-0.04em]"
          }`}
        >
          {p.index}
        </span>
      </div>

      <div className="mx-auto grid w-full max-w-[1400px] items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className={`lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""}`}>
          <div className="product-fade flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]">
            <span style={{ color: p.accent }}>{p.index}</span>
            <span className="h-px w-8 bg-white/20" />
            <span className="text-offwhite/55">{p.category}</span>
          </div>

          <h3
            id={`${p.id}-title`}
            className="product-title mt-6 text-5xl font-medium leading-[0.95] tracking-[-0.045em] sm:text-6xl xl:text-7xl"
          >
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="block">{p.name}</span>
            </span>
          </h3>
          <p className="product-fade mt-5 font-serif text-2xl italic sm:text-3xl" style={{ color: p.accent }}>
            {p.tagline}
          </p>
          <p className="product-fade mt-6 max-w-lg text-lg leading-relaxed text-offwhite/65">{p.description}</p>

          <ul className="product-fade mt-8 grid max-w-lg grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
            {p.features.map((f) => (
              <li key={f} className="flex items-center gap-3 bg-obsidian/90 px-4 py-3.5 text-sm text-offwhite/85">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.accent }} />
                {f}
              </li>
            ))}
          </ul>

          <motion.a
            href={`mailto:${COMPANY.email}?subject=${encodeURIComponent(`Enquiry about ${p.name}`)}`}
            whileHover={{ x: 4 }}
            className="product-fade mt-8 inline-flex items-center gap-3 text-sm font-medium"
          >
            <span className="border-b pb-0.5" style={{ borderColor: p.accent }}>
              Ask about {p.name}
            </span>
            <span aria-hidden style={{ color: p.accent }}>
              →
            </span>
          </motion.a>
        </div>

        <div
          className={`lg:col-span-6 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`}
          style={{ perspective: "1200px" }}
        >
          <div className="product-mock mx-auto max-w-[560px]">
            <Mock accent={p.accent} />
            <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-offwhite/30">
              Illustrative interface
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
