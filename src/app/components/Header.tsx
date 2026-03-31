"use client";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[var(--bg-primary)]/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
              <rect x="2" y="12" width="3" height="8" rx="1.5" fill="url(#amber-grad)" />
              <rect x="7" y="8" width="3" height="16" rx="1.5" fill="url(#amber-grad)" />
              <rect x="12" y="4" width="3" height="24" rx="1.5" fill="url(#amber-grad)" />
              <rect x="17" y="9" width="3" height="14" rx="1.5" fill="url(#amber-grad)" />
              <rect x="22" y="6" width="3" height="20" rx="1.5" fill="url(#amber-grad)" />
              <rect x="27" y="11" width="3" height="10" rx="1.5" fill="url(#amber-grad)" />
              <defs>
                <linearGradient id="amber-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">
            Bark<span className="text-amber-500">.ai</span>
          </span>
          <span className="hidden sm:inline-block ml-2 px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-widest text-amber-500/80 border border-amber-500/20 rounded-full bg-amber-500/5">
            Beta
          </span>
        </div>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400">
          <button className="hover:text-white transition-colors cursor-pointer">
            Features
          </button>
          <button className="hover:text-white transition-colors cursor-pointer">
            Preise
          </button>
          <button className="hover:text-white transition-colors cursor-pointer">
            API Docs
          </button>
          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-medium hover:brightness-110 transition-all cursor-pointer">
            Jetzt starten
          </button>
        </nav>
      </div>
    </header>
  );
}
