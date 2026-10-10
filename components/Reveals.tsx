"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/** Calm, consistent fade-up for any element marked with data-reveal. */
export default function Reveals() {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 36,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
    });
    return () => mm.revert();
  });
  return null;
}
