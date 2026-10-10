const WORDS = ["Work", "Commitments", "Entertainment", "Reading", "Play", "Trade"];

export default function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {WORDS.map((w, i) => (
        <span key={w} className="flex items-center">
          <span
            className={`px-6 text-[16vw] font-medium leading-none tracking-[-0.05em] md:text-[9vw] ${
              i % 2 ? "font-serif font-normal italic text-offwhite/90" : "text-outline"
            }`}
          >
            {w}
          </span>
          <span className="h-3 w-3 rounded-full bg-violet md:h-4 md:w-4" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative overflow-hidden border-y border-white/[0.07] py-10 md:py-14" role="presentation">
      <div className="marquee-track">
        {row}
        {row}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-obsidian to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-obsidian to-transparent" />
    </div>
  );
}
