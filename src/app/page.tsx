import Header from "./components/Header";
import Hero from "./components/Hero";
import TranslatorTool from "./components/TranslatorTool";

export default function Home() {
  return (
    <>
      {/* Background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="glow-orb w-[500px] h-[500px] bg-amber-500/[0.04] -top-40 -left-40" />
        <div className="glow-orb w-[400px] h-[400px] bg-orange-600/[0.03] top-1/3 -right-32" />
        <div className="glow-orb w-[600px] h-[600px] bg-amber-500/[0.02] -bottom-60 left-1/3" />
      </div>

      <Header />

      <main className="relative z-10 flex-1">
        <Hero />
        <TranslatorTool />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
          <p>&copy; 2026 Bark.ai &mdash; Alle Rechte vorbehalten.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer transition-colors">
              Datenschutz
            </span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">
              Nutzungsbedingungen
            </span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">
              Kontakt
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
