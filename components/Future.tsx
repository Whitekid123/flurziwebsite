"use client";

import { motion } from "motion/react";
import { FUTURE } from "@/lib/content";
import SectionLabel from "./SectionLabel";

export default function Future() {
  return (
    <section id="future" className="relative py-28 md:py-40" aria-labelledby="future-title">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <SectionLabel index="05">Future ventures</SectionLabel>
        <div className="mt-6 grid gap-6 md:grid-cols-2 md:items-end">
          <h2
            id="future-title"
            data-reveal
            className="text-4xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl"
          >
            What we&apos;re <span className="font-serif italic font-normal text-offwhite/80">building next.</span>
          </h2>
          <p data-reveal className="max-w-md text-lg leading-relaxed text-offwhite/65 md:justify-self-end">
            Two new worlds are in development. They are not available yet; we&apos;ll share more
            when they are ready.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {FUTURE.map((f) => (
            <motion.article
              key={f.id}
              data-reveal
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="relative overflow-hidden rounded-[28px] border border-dashed border-white/15 bg-graphite/50 p-8 md:p-10"
            >
              <div
                aria-hidden
                className="absolute -right-24 -top-24 h-72 w-72 rounded-full blur-[90px]"
                style={{ background: `${f.accent}40` }}
              />
              <div className="relative flex flex-wrap items-center justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-offwhite/55">{f.category}</span>
                <span className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/15 bg-obsidian/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-offwhite/80">
                  <span className="pulse-dot relative h-1.5 w-1.5 rounded-full" style={{ background: f.accent, color: f.accent }} />
                  In development · Coming soon
                </span>
              </div>
              <h3 className="relative mt-16 text-5xl font-medium tracking-[-0.04em] md:text-6xl">{f.name}</h3>
              <p className="relative mt-4 max-w-md leading-relaxed text-offwhite/65">{f.description}</p>
              <ul className="relative mt-8 flex flex-wrap gap-2">
                {f.points.map((p) => (
                  <li key={p} className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-offwhite/70">
                    {p}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
