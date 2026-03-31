"use client";

import { motion } from "framer-motion";

const badges = [
  { icon: "🏆", text: "Featured on ProductHunt" },
  { icon: "🌍", text: "500K+ Translations" },
  { icon: "⭐", text: "4.9/5 Bewertung" },
];

export default function Hero() {
  return (
    <section className="relative pt-32 pb-12 px-6 text-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-amber-500/8 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-3xl mx-auto"
      >
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-400 text-sm"
        >
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          BarkEngine v2.1 ist live
        </motion.div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
          Sprich Hund.
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
            Mit KI.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
          Das erste neuronale Text-to-Bark Modell der Welt. Echtzeit-Synthese
          für nahtlose Interspezies-Kommunikation.
        </p>

        {/* Social proof badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          {badges.map((badge) => (
            <div
              key={badge.text}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-sm text-slate-500"
            >
              <span>{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
