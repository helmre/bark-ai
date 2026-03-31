"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TextInput from "./TextInput";
import VoiceSelector from "./VoiceSelector";
import LoadingAnimation from "./LoadingAnimation";
import OutputPanel from "./OutputPanel";
import AprilReveal from "./AprilReveal";
import { playBark, getTranscript, type Breed } from "./barkGenerator";

const REVEAL_THRESHOLD = 3;

export default function TranslatorTool() {
  const [text, setText] = useState("");
  const [breed, setBreed] = useState<Breed>("golden-retriever");
  const [isLoading, setIsLoading] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getAttemptCount = (): number => {
    if (typeof window === "undefined") return 0;
    return parseInt(localStorage.getItem("bark-attempts") || "0", 10);
  };

  const incrementAttempts = (): number => {
    const next = getAttemptCount() + 1;
    localStorage.setItem("bark-attempts", String(next));
    return next;
  };

  const handleTranslate = useCallback(() => {
    if (!text.trim() || isLoading) return;

    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setIsLoading(true);
    setHasResult(false);
    setIsPlaying(false);

    const delay = 3000 + Math.random() * 1000;

    setTimeout(() => {
      const attempts = incrementAttempts();
      const revealAt =
        REVEAL_THRESHOLD +
        Math.floor(Math.random() * 2) -
        (Math.random() > 0.5 ? 1 : 0);

      if (attempts >= revealAt) {
        setIsLoading(false);
        setShowReveal(true);
        return;
      }

      // Play real bark audio
      const audio = playBark(breed);
      audioRef.current = audio;
      setTranscript(getTranscript(breed));
      setIsLoading(false);
      setHasResult(true);
      setIsPlaying(true);

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }, delay);
  }, [text, breed, isLoading]);

  const handlePlayToggle = () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const audio = playBark(breed);
      audioRef.current = audio;
      setIsPlaying(true);
      audio.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
  };

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setShowReveal(false);
    setHasResult(false);
    setText("");
    setTranscript("");
    setIsPlaying(false);
    localStorage.setItem("bark-attempts", "0");
  };

  return (
    <>
      <section className="relative px-6 pb-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-white/5 bg-[var(--bg-secondary)] p-6 sm:p-8 shadow-2xl shadow-black/30"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <span className="text-xs font-mono text-slate-600">
                bark-translator v2.1.0
              </span>
            </div>

            <div className="space-y-6">
              <TextInput value={text} onChange={setText} disabled={isLoading} />
              <VoiceSelector selected={breed} onSelect={setBreed} />

              <button
                onClick={handleTranslate}
                disabled={!text.trim() || isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold text-base hover:brightness-110 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-lg shadow-amber-500/15 active:scale-[0.99]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="flex gap-0.5">
                      {[0, 1, 2].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-4 bg-white/80 rounded-full waveform-bar"
                          style={{ animationDelay: `${i * 0.12}s` }}
                        />
                      ))}
                    </div>
                    Wird übersetzt...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Audio generieren
                    <svg className="w-5 h-5 -mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                )}
              </button>
            </div>

            <div className="mt-6">
              <AnimatePresence mode="wait">
                {isLoading && (
                  <LoadingAnimation key="loading" isLoading={isLoading} />
                )}
                {hasResult && !isLoading && (
                  <OutputPanel
                    key="output"
                    transcript={transcript}
                    isPlaying={isPlaying}
                    onPlayToggle={handlePlayToggle}
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <p className="mt-6 text-center text-xs text-slate-700">
            BarkEngine v2.1 nutzt proprietäre neuronale Netze, trainiert mit
            über 10 Mio. Hunde-Vokalisierungen. Ergebnisse können je nach Rasse
            und Dialekt variieren.
          </p>
        </div>
      </section>

      <AnimatePresence>
        {showReveal && <AprilReveal onReset={handleReset} />}
      </AnimatePresence>
    </>
  );
}
