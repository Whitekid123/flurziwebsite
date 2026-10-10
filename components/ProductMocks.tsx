/* Illustrative interface compositions. Not real customer data. */

function Frame({ accent, children, label }: { accent: string; children: React.ReactNode; label: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1018]/90 p-4 shadow-2xl sm:p-5"
      style={{ boxShadow: `0 40px 120px -30px ${accent}55, inset 0 1px 0 rgba(255,255,255,0.06)` }}
      role="img"
      aria-label={label}
    >
      <div className="mb-4 flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="ml-3 h-5 flex-1 rounded-full bg-white/5" />
      </div>
      {children}
    </div>
  );
}

export function SponsorSafeMock({ accent }: { accent: string }) {
  const rows = [
    { name: "Sponsored worker A", doc: "Right to work", status: "Verified", tone: accent },
    { name: "Sponsored worker B", doc: "Visa expiry", status: "Due soon", tone: "#F2B544" },
    { name: "Sponsored worker C", doc: "Records", status: "Complete", tone: accent },
    { name: "Sponsored worker D", doc: "Right to work", status: "Review", tone: "#8A90A2" },
  ];
  return (
    <Frame accent={accent} label="Illustrative SponsorSafe HR compliance dashboard">
      <div className="grid grid-cols-3 gap-3">
        {["Licence records", "Evidence", "Alerts"].map((t, i) => (
          <div key={t} className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
            <p className="text-[10px] uppercase tracking-wider text-offwhite/45">{t}</p>
            <div className="mt-3 h-1.5 rounded-full bg-white/5">
              <div className="h-full rounded-full" style={{ width: `${[86, 64, 40][i]}%`, background: accent }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 space-y-2">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center justify-between rounded-xl bg-white/[0.03] px-3 py-2.5">
            <div className="flex items-center gap-3">
              <span className="h-7 w-7 rounded-full bg-white/10" />
              <div>
                <p className="text-xs text-offwhite/85">{r.name}</p>
                <p className="text-[10px] text-offwhite/40">{r.doc}</p>
              </div>
            </div>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-medium"
              style={{ color: r.tone, background: `${r.tone}1f` }}
            >
              {r.status}
            </span>
          </div>
        ))}
      </div>
      <div
        className="mt-4 flex items-center justify-between rounded-xl border px-3 py-3"
        style={{ borderColor: `${accent}40`, background: `${accent}10` }}
      >
        <span className="text-xs text-offwhite/80">Audit evidence pack</span>
        <span className="text-[10px] font-medium" style={{ color: accent }}>
          Generate ↗
        </span>
      </div>
    </Frame>
  );
}

export function CommitMock({ accent }: { accent: string }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  return (
    <Frame accent={accent} label="Illustrative Flurzi Commit plan view">
      <div className="flex items-center gap-5">
        <svg viewBox="0 0 120 120" className="h-32 w-32 shrink-0 -rotate-90">
          <circle cx="60" cy="60" r={r} stroke="rgba(255,255,255,0.07)" strokeWidth="9" fill="none" />
          <circle
            cx="60"
            cy="60"
            r={r}
            stroke={accent}
            strokeWidth="9"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * 0.38}
          />
        </svg>
        <div>
          <p className="text-[10px] uppercase tracking-wider text-offwhite/45">Maturity progress</p>
          <p className="mt-1 text-xl font-medium">Fixed-term plan</p>
          <p className="mt-1 text-xs text-offwhite/50">On track towards maturity</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
          <p className="text-[10px] uppercase tracking-wider text-offwhite/45">Billing</p>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs text-offwhite/80">Auto-pay</span>
            <span className="relative h-4 w-7 rounded-full" style={{ background: accent }}>
              <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-obsidian" />
            </span>
          </div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3">
          <p className="text-[10px] uppercase tracking-wider text-offwhite/45">Payout</p>
          <p className="mt-2 text-xs text-offwhite/80">Tracked to maturity</p>
        </div>
      </div>
      <div className="mt-4 flex items-end gap-1.5">
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: 10 + i * 4,
              background: i < 8 ? accent : "rgba(255,255,255,0.08)",
              opacity: i < 8 ? 0.35 + i * 0.08 : 1,
            }}
          />
        ))}
      </div>
    </Frame>
  );
}

export function CinemaMock({ accent }: { accent: string }) {
  const tiles = [
    "linear-gradient(160deg,#3a1022,#0d1018)",
    "linear-gradient(160deg,#1d1f4a,#0d1018)",
    "linear-gradient(160deg,#4a2a10,#0d1018)",
    "linear-gradient(160deg,#10333a,#0d1018)",
  ];
  return (
    <Frame accent={accent} label="Illustrative FlurziCinema streaming interface">
      <div
        className="relative h-36 overflow-hidden rounded-2xl sm:h-44"
        style={{ background: `radial-gradient(120% 120% at 80% 10%, ${accent}66, #12060b 55%, #0d1018)` }}
      >
        <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-1 text-[10px] font-semibold tracking-wider">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} /> LIVE
        </span>
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-sm font-medium">Live viewing</p>
          <div className="mt-2 h-1 rounded-full bg-white/15">
            <div className="h-full w-2/3 rounded-full" style={{ background: accent }} />
          </div>
        </div>
      </div>
      <p className="mt-4 text-[10px] uppercase tracking-wider text-offwhite/45">Continue watching</p>
      <div className="mt-2 grid grid-cols-4 gap-2">
        {tiles.map((t, i) => (
          <div key={i} className="relative aspect-[2/3] overflow-hidden rounded-lg" style={{ background: t }}>
            <div className="absolute inset-x-1.5 bottom-1.5 h-0.5 rounded-full bg-white/15">
              <div className="h-full rounded-full" style={{ width: `${[70, 30, 85, 50][i]}%`, background: accent }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        {["Movies", "Series", "Reels", "Discover"].map((c, i) => (
          <span
            key={c}
            className="rounded-full px-2.5 py-1 text-[10px]"
            style={i === 0 ? { background: accent, color: "#0d1018" } : { background: "rgba(255,255,255,0.06)" }}
          >
            {c}
          </span>
        ))}
      </div>
    </Frame>
  );
}

export function EndNovelMock({ accent }: { accent: string }) {
  return (
    <Frame accent={accent} label="Illustrative End Novel reading interface">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 rounded-2xl bg-[#f3ead9] p-4 text-[#2a2118]">
          <p className="font-serif text-lg italic leading-none">Chapter twelve</p>
          <div className="mt-3 space-y-1.5">
            {[100, 92, 97, 88, 95, 60].map((w, i) => (
              <span key={i} className="block h-1.5 rounded-full bg-[#2a2118]/15" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="mt-4 h-1 rounded-full bg-[#2a2118]/10">
            <div className="h-full w-[58%] rounded-full bg-[#2a2118]/70" />
          </div>
          <p className="mt-1.5 text-[9px] uppercase tracking-wider text-[#2a2118]/60">Reading progress</p>
        </div>
        <div className="col-span-2 space-y-2">
          <p className="text-[10px] uppercase tracking-wider text-offwhite/45">Rankings</p>
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="flex items-center gap-2 rounded-lg bg-white/[0.03] p-1.5">
              <span className="w-3 text-[10px] font-semibold" style={{ color: n === 1 ? accent : "rgba(244,245,248,0.5)" }}>
                {n}
              </span>
              <span className="h-7 w-5 rounded-sm" style={{ background: `${accent}${["66", "44", "33", "22"][n - 1]}` }} />
              <span className="h-1.5 flex-1 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between rounded-xl border border-white/10 px-3 py-3">
        <span className="text-xs text-offwhite/80">Saved library</span>
        <span className="rounded-full px-2.5 py-1 text-[10px] font-medium text-obsidian" style={{ background: accent }}>
          Unlock next episode
        </span>
      </div>
    </Frame>
  );
}
