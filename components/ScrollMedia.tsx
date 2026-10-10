"use client";
import { useEffect, useRef, useState } from "react";

/** Media stays independent of the layout and always has a still-image fallback. */
export default function ScrollMedia({ video, poster, className = "" }: {
  video: string;
  poster?: string;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => setFailed(false), [video]);

  useEffect(() => {
    const element = ref.current;
    if (!element || reduced || failed) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!Number.isFinite(element.duration)) return;
      const host = (element.closest("section, article") || element) as HTMLElement;
      // A zero-height marker preserves the chapter's original flow position.
      const marker = host.previousElementSibling;
      const origin = marker?.classList.contains("world-trigger") ? marker : host;
      const start = origin.getBoundingClientRect().top + window.scrollY;
      const height = host.offsetHeight;
      const localScroll = window.scrollY - start;
      if (localScroll < -innerHeight || localScroll > height + innerHeight) return;
      const progress = Math.max(0, Math.min(1, host.id === "top"
        ? localScroll / Math.max(1, height - innerHeight)
        : (innerHeight + localScroll) / (innerHeight + height)));
      const target = progress * Math.max(0, element.duration - 0.05);
      if (Math.abs(element.currentTime - target) > 0.04 && !element.seeking) element.currentTime = target;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    element.addEventListener("loadedmetadata", schedule);
    element.addEventListener("seeked", schedule);
    schedule();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      element.removeEventListener("loadedmetadata", schedule);
      element.removeEventListener("seeked", schedule);
    };
  }, [video, reduced, failed]);

  if ((failed || reduced) && poster) return <img className={className} src={poster} alt="" />;
  return <video ref={ref} className={className} src={failed ? undefined : video}
    poster={poster} muted playsInline preload="metadata"
    onError={() => setFailed(true)} aria-hidden="true" />;
}
