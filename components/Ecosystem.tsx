"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { PRODUCTS, FUTURE } from "@/lib/content";
import SectionLabel from "./SectionLabel";
import { LogoMark } from "./Logo";

type Node = {
  id: string;
  name: string;
  category: string;
  blurb: string;
  tags: string[];
  accent: string;
  future: boolean;
  angle: number; // degrees
};

const live: Node[] = PRODUCTS.map((p) => ({
  id: p.id,
  name: p.name,
  category: p.category,
  blurb: p.description,
  tags: p.features,
  accent: p.accent,
  future: false,
  angle: 0,
}));

const future: Node[] = FUTURE.map((f) => ({
  id: f.id,
  name: f.name,
  category: f.category,
  blurb: f.description,
  tags: f.points,
  accent: f.accent,
  future: true,
  angle: 0,
}));

// six evenly spaced positions; live products on top/sides, future at the bottom
const ANGLES = [-150, -90, -30, 30, 150, 90];
const NODES: Node[] = [...live, ...future].map((n, i) => ({ ...n, angle: ANGLES[i] }));
// order: sponsorsafe(-150) commit(-90) cinema(-30) endnovel(30) flurzix(150) playvault(90)

const RX = 33; // horizontal radius in % of the container
const RY = 41; // vertical radius

function pos(angle: number) {
  const a = (angle * Math.PI) / 180;
  return { x: 50 + Math.cos(a) * RX, y: 50 + Math.sin(a) * RY };
}

export default function Ecosystem() {
  const [active, setActive] = useState(NODES[0].id);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      setActive((cur) => {
        const i = NODES.findIndex((n) => n.id === cur);
        return NODES[(i + 1) % NODES.length].id;
      });
    }, 3800);
    return () => clearInterval(t);
  }, [touched]);

  const current = NODES.find((n) => n.id === active)!;

  const select = (id: string) => {
    setTouched(true);
    setActive(id);
  };

  return (
    <section id="ecosystem" className="relative py-28 md:py-40" aria-labelledby="eco-title">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="01">The Flurzi ecosystem</SectionLabel>
            <h2
              id="eco-title"
              data-reveal
              className="mt-6 text-4xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl"
            >
              One studio. <br />
              <span className="font-serif italic font-normal text-offwhite/80">Many worlds,</span> one
              standard.
            </h2>
            <p data-reveal className="mt-6 max-w-md text-lg leading-relaxed text-offwhite/65">
              Every Flurzi product is built on the same foundations: careful design, dependable
              engineering and respect for the people using it. Select a product to see where it
              fits.
            </p>

            <div className="mt-10 hidden min-h-[260px] lg:block" aria-live="polite">
              <Detail node={current} />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative mx-auto aspect-square w-full max-w-[640px]" data-reveal>
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
                <defs>
                  <radialGradient id="eco-core" cx="50%" cy="50%" r="50%">
                    <stop offset="0" stopColor="#7357FF" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#7357FF" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="22" fill="url(#eco-core)" />
                <ellipse cx="50" cy="50" rx={RX} ry={RY} fill="none" stroke="rgba(244,245,248,0.08)" strokeWidth="0.2" />
                <ellipse cx="50" cy="50" rx={RX - 12} ry={RY - 14} fill="none" stroke="rgba(244,245,248,0.05)" strokeWidth="0.2" strokeDasharray="0.6 1.2" />
                {NODES.map((n) => {
                  const p = pos(n.angle);
                  const on = n.id === active;
                  return (
                    <g key={n.id}>
                      <line
                        x1="50"
                        y1="50"
                        x2={p.x}
                        y2={p.y}
                        stroke={on ? n.accent : "rgba(244,245,248,0.14)"}
                        strokeWidth={on ? 0.35 : 0.2}
                        strokeDasharray={n.future ? "0.8 1.2" : undefined}
                        style={{ transition: "stroke 400ms, stroke-width 400ms" }}
                      />
                      {on && (
                        <line
                          x1="50"
                          y1="50"
                          x2={p.x}
                          y2={p.y}
                          stroke={n.accent}
                          strokeWidth="0.6"
                          className="flow-line"
                          style={{ strokeDasharray: "1 3" }}
                          opacity="0.9"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* core */}
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-graphite/80 shadow-[0_0_60px_rgba(115,87,255,0.45)] backdrop-blur sm:h-20 sm:w-20">
                  <LogoMark className="h-9 w-9 sm:h-11 sm:w-11" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-offwhite/50">
                  Flurzi
                </span>
              </div>

              {NODES.map((n) => {
                const p = pos(n.angle);
                const on = n.id === active;
                return (
                  <motion.button
                    key={n.id}
                    type="button"
                    onMouseEnter={() => select(n.id)}
                    onFocus={() => select(n.id)}
                    onClick={() => select(n.id)}
                    aria-pressed={on}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.96 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 outline-none"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  >
                    <span
                      className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-2 text-xs font-medium backdrop-blur-md transition-all duration-500 sm:px-4 sm:text-sm ${
                        n.future ? "border-dashed" : ""
                      }`}
                      style={{
                        borderColor: on ? n.accent : "rgba(244,245,248,0.15)",
                        background: on ? `${n.accent}22` : "rgba(23,27,38,0.7)",
                        boxShadow: on ? `0 0 40px ${n.accent}55` : "none",
                      }}
                    >
                      <span
                        className={`relative h-2 w-2 rounded-full ${on ? "pulse-dot" : ""}`}
                        style={{ background: n.accent, color: n.accent }}
                      />
                      {n.name}
                    </span>
                    {n.future && (
                      <span className="mt-1.5 block text-center font-mono text-[9px] uppercase tracking-[0.2em] text-offwhite/45">
                        In development
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-8 min-h-[280px] lg:hidden" aria-live="polite">
              <Detail node={current} />
            </div>

            <div className="mt-6 flex justify-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-offwhite/45">
              <span className="flex items-center gap-2">
                <span className="h-px w-6 bg-offwhite/50" /> Live product
              </span>
              <span className="flex items-center gap-2">
                <span className="h-px w-6 border-t border-dashed border-offwhite/50" /> In development
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Detail({ node }: { node: Node }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={node.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl border border-white/10 bg-graphite/60 p-6 backdrop-blur"
        style={{ boxShadow: `inset 0 1px 0 ${node.accent}33` }}
      >
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: node.accent }}>
            {node.category}
          </p>
          <span
            className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] ${
              node.future ? "border-dashed border-white/25 text-offwhite/60" : "border-white/15 text-offwhite/70"
            }`}
          >
            {node.future ? "In development" : "Live"}
          </span>
        </div>
        <h3 className="mt-3 text-2xl font-medium tracking-tight">{node.name}</h3>
        <p className="mt-3 text-offwhite/65 leading-relaxed">{node.blurb}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {node.tags.map((t) => (
            <li key={t} className="rounded-full bg-white/5 px-3 py-1 text-xs text-offwhite/70">
              {t}
            </li>
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  );
}
