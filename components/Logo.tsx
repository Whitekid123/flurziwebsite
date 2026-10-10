export function LogoMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <linearGradient id="fl-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7357FF" />
          <stop offset="1" stopColor="#3D8BFF" />
        </linearGradient>
      </defs>
      <rect x="1" y="1" width="30" height="30" rx="9" fill="url(#fl-g)" />
      <path d="M11 23V9.5h11" stroke="#F4F5F8" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M11 16h7.5" stroke="#F4F5F8" strokeWidth="3" strokeLinecap="round" />
      <circle cx="22.5" cy="22" r="2.2" fill="#F4F5F8" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark />
      <span className="text-lg font-semibold tracking-tight">flurzi</span>
    </span>
  );
}
