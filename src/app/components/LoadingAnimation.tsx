"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  "Stimmungsmuster werden analysiert...",
  "Phonem-Strukturen werden kartiert...",
  "Rasse-spezifischer Stimmumfang wird kalibriert...",
  "Bell-Wellenform wird generiert...",
  "Übersetzung wird finalisiert...",
];

interface LoadingAnimationProps {
  isLoading: boolean;
}

export default function LoadingAnimation({ isLoading }: LoadingAnimationProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setStepIndex(0);
      setProgress(0);
      return;
    }

    // Step through processing messages
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
    }, 700);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 2, 100));
    }, 60);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="p-6 rounded-xl border border-white/5 bg-white/[0.02]"
    >
      {/* Waveform animation */}
      <div className="flex items-center justify-center gap-1 h-12 mb-4">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-gradient-to-t from-amber-600 to-amber-400"
            animate={{
              height: [4, Math.random() * 32 + 8, 4],
            }}
            transition={{
              duration: 0.6 + Math.random() * 0.4,
              repeat: Infinity,
              delay: i * 0.05,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-1 rounded-full bg-white/5 overflow-hidden mb-3">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-500"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Step text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={stepIndex}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 10 }}
          className="text-sm text-slate-500 font-mono"
        >
          {steps[stepIndex]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  );
}
