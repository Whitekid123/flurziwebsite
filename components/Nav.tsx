"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Logo } from "./Logo";
import { NAV_LINKS, demoHref } from "@/lib/content";

export default function Nav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev && !open);
  });

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [open]);

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: hidden ? -96 : 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 sm:px-4"
      >
        <div
          className={`mx-auto mt-3 flex max-w-[1400px] items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 sm:px-5 ${
            scrolled
              ? "border border-white/10 bg-obsidian/70 backdrop-blur-xl"
              : "border border-transparent"
          }`}
        >
          <a href="#top" aria-label="Flurzi home" className="relative z-10">
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="rounded-full px-4 py-2 text-sm text-offwhite/70 transition-colors hover:bg-white/5 hover:text-offwhite"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <motion.a
              href={demoHref}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="hidden rounded-full bg-offwhite px-4 py-2 text-sm font-medium text-obsidian sm:inline-block"
            >
              Book a demo
            </motion.a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <span
                className={`absolute h-px w-4 bg-offwhite transition-transform duration-300 ${
                  open ? "rotate-45" : "-translate-y-1"
                }`}
              />
              <span
                className={`absolute h-px w-4 bg-offwhite transition-transform duration-300 ${
                  open ? "-rotate-45" : "translate-y-1"
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-obsidian/95 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-2">
              {NAV_LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-1 text-5xl font-medium tracking-tight"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={demoHref}
              onClick={() => setOpen(false)}
              className="rounded-full bg-offwhite py-4 text-center font-medium text-obsidian"
            >
              Book a demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
