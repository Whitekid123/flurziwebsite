"use client";

import { motion } from "motion/react";
import { COMPANY, demoHref } from "@/lib/content";

export default function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden py-28 md:py-44" aria-labelledby="contact-title">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-full h-[110vmax] w-[110vmax] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,rgba(115,87,255,0.45),rgba(61,139,255,0.12)_40%,transparent_65%)]" />
      </div>
      <div className="mx-auto max-w-[1400px] px-5 text-center sm:px-8">
        <p data-reveal className="font-mono text-[11px] uppercase tracking-[0.25em] text-offwhite/55">
          06 · Contact
        </p>
        <h2
          id="contact-title"
          data-reveal
          className="mx-auto mt-8 max-w-[14ch] text-[13vw] font-medium leading-[0.92] tracking-[-0.05em] sm:text-[9vw] lg:text-[7.5vw] 2xl:text-[120px]"
        >
          Let&apos;s build <span className="font-serif font-normal italic text-gradient">what&apos;s next.</span>
        </h2>
        <p data-reveal className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-offwhite/65">
          See a product in action, ask about working with us, or just say hello.
        </p>

        <div data-reveal className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <motion.a
            href={demoHref}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 rounded-full bg-offwhite px-8 py-4 text-lg font-medium text-obsidian shadow-[0_0_60px_rgba(115,87,255,0.45)]"
          >
            Book a demo <span aria-hidden>→</span>
          </motion.a>
        </div>

        <div data-reveal className="mx-auto mt-16 grid max-w-3xl gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 text-left sm:grid-cols-2">
          <a href={`mailto:${COMPANY.email}`} className="group bg-obsidian/80 p-6 backdrop-blur transition-colors hover:bg-graphite">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-offwhite/45">Email</span>
            <span className="mt-2 block break-all text-lg group-hover:text-[#b7aaff] sm:text-xl">{COMPANY.email}</span>
          </a>
          <a href={COMPANY.phoneHref} className="group bg-obsidian/80 p-6 backdrop-blur transition-colors hover:bg-graphite">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-offwhite/45">Phone</span>
            <span className="mt-2 block text-lg group-hover:text-[#b7aaff] sm:text-xl">{COMPANY.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
