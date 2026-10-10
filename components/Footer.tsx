import { Logo } from "./Logo";
import { COMPANY, PRODUCTS, FUTURE, demoHref } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 bg-obsidian pt-20" aria-label="Footer">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 max-w-xs leading-relaxed text-offwhite/55">
              Digital worlds for work, commitments, entertainment and reading.
            </p>
            <a
              href={demoHref}
              className="mt-8 inline-block rounded-full border border-white/20 px-5 py-2.5 text-sm transition-colors hover:border-white/50"
            >
              Book a demo
            </a>
          </div>

          <nav aria-label="Products" className="md:col-span-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-offwhite/40">Products</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {PRODUCTS.map((p) => (
                <li key={p.id}>
                  <a href={`#${p.id}`} className="text-offwhite/75 hover:text-offwhite">
                    {p.name}
                  </a>
                </li>
              ))}
              {FUTURE.map((f) => (
                <li key={f.id} className="flex items-center gap-2 text-offwhite/45">
                  {f.name}
                  <span className="rounded-full border border-dashed border-white/20 px-2 py-0.5 text-[10px]">Coming soon</span>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="md:col-span-2">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-offwhite/40">Company</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href="#ecosystem" className="text-offwhite/75 hover:text-offwhite">Ecosystem</a></li>
              <li><a href="#capabilities" className="text-offwhite/75 hover:text-offwhite">Capabilities</a></li>
              <li><a href="#about" className="text-offwhite/75 hover:text-offwhite">About</a></li>
              <li><a href="#future" className="text-offwhite/75 hover:text-offwhite">Future ventures</a></li>
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-offwhite/40">Contact</h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li><a href={`mailto:${COMPANY.email}`} className="break-all text-offwhite/75 hover:text-offwhite">{COMPANY.email}</a></li>
              <li><a href={COMPANY.phoneHref} className="text-offwhite/75 hover:text-offwhite">{COMPANY.phone}</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 select-none overflow-hidden" aria-hidden>
          <p className="text-center text-[27vw] font-semibold leading-[0.75] tracking-[-0.07em] text-white/[0.04] 2xl:text-[380px]">
            flurzi
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-xs text-offwhite/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {COMPANY.name}. All rights reserved.</p>
          <a href="#top" className="hover:text-offwhite">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
