import { CAPABILITIES } from "@/lib/content";
import SectionLabel from "./SectionLabel";

export default function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative bg-offwhite py-28 text-obsidian md:py-40"
      aria-labelledby="cap-title"
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel index="03" tone="light">
              Technology &amp; capabilities
            </SectionLabel>
            <h2
              id="cap-title"
              data-reveal
              className="mt-6 text-4xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-6xl"
            >
              What we design, <br />
              <span className="font-serif italic font-normal text-obsidian/70">engineer and run.</span>
            </h2>
          </div>
          <p data-reveal className="max-w-xl text-lg leading-relaxed text-obsidian/65 lg:col-span-6 lg:col-start-7 lg:self-end">
            The same team builds every Flurzi product. That means the lessons from compliance
            software shape our streaming platforms, and the reverse. The disciplines below are the
            ones we work in every day.
          </p>
        </div>

        <div className="mt-16 grid border-t border-obsidian/10 md:mt-24 md:grid-cols-2">
          {CAPABILITIES.map((c, i) => (
            <article
              key={c.title}
              data-reveal
              className={`group border-b border-obsidian/10 py-10 md:px-10 md:py-14 ${
                i % 2 === 0 ? "md:border-r md:pl-0" : "md:pr-0"
              }`}
            >
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">{c.title}</h3>
                <span className="font-mono text-xs text-obsidian/40">0{i + 1}</span>
              </div>
              <p className="mt-4 max-w-md leading-relaxed text-obsidian/65">{c.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {c.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-full border border-obsidian/10 px-3 py-1.5 text-xs text-obsidian/70 transition-colors group-hover:border-violet/40"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
