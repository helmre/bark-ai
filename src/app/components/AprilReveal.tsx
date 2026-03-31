"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

interface AprilRevealProps {
  onReset: () => void;
}

export default function AprilReveal({ onReset }: AprilRevealProps) {
  const hasConfetti = useRef(false);

  const fireConfetti = useCallback(() => {
    if (hasConfetti.current) return;
    hasConfetti.current = true;

    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 60,
        origin: { x: 0, y: 0.7 },
        colors: ["#f59e0b", "#ea580c", "#fbbf24", "#ffffff"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 60,
        origin: { x: 1, y: 0.7 },
        colors: ["#f59e0b", "#ea580c", "#fbbf24", "#ffffff"],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    // Big burst first
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.5 },
      colors: ["#f59e0b", "#ea580c", "#fbbf24", "#ffffff", "#f97316"],
    });

    frame();
  }, []);

  useEffect(() => {
    fireConfetti();
  }, [fireConfetti]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#06080f]/95 backdrop-blur-xl"
    >
      <div className="text-center px-6 max-w-lg">
        {/* Big emoji */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 10, delay: 0.2 }}
          className="text-8xl mb-6"
        >
          🐕
        </motion.div>

        {/* Main text */}
        <motion.h1
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", damping: 12, delay: 0.4 }}
          className="text-6xl sm:text-7xl font-extrabold tracking-tight mb-4"
        >
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            APRIL,
          </span>
          <br />
          <span className="bg-gradient-to-r from-red-400 via-orange-400 to-amber-400 bg-clip-text text-transparent">
            APRIL!
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-xl text-slate-400 mb-2"
        >
          Du dachtest wirklich, AI kann mit Hunden reden?
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-sm text-slate-600 mb-10"
        >
          Es gibt kein BarkEngine. Es gibt keine Dog-Translation-AI.
          <br />
          Aber du hast es ausprobiert. Und das ist alles was zählt. 😄
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={copyLink}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
          >
            Freunde reinlegen 🔗
          </button>
          <button
            onClick={onReset}
            className="px-6 py-3 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all cursor-pointer"
          >
            Nochmal versuchen
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
