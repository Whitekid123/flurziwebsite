export default function SectionLabel({
  index,
  children,
  tone = "dark",
}: {
  index: string;
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  return (
    <p
      data-reveal
      className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] ${
        tone === "dark" ? "text-offwhite/55" : "text-obsidian/55"
      }`}
    >
      <span className={tone === "dark" ? "text-violet" : "text-violet"}>{index}</span>
      <span className={`h-px w-8 ${tone === "dark" ? "bg-white/20" : "bg-obsidian/20"}`} />
      {children}
    </p>
  );
}
