"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

const fakePhrases = [
  "Wer ist ein braver Hund? Ja, du bist es!",
  "Willst du Gassi gehen?",
  "Essenszeit! Komm her!",
  "Ich hab dich so lieb, mein Guter!",
  "Lass uns im Park spielen!",
];

export default function TextInput({
  value,
  onChange,
  disabled,
}: TextInputProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const streamRef = useRef<MediaStream | null>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      setIsRecording(true);

      // Fake recording for 2.5 seconds, then "transcribe"
      setTimeout(() => {
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
        setIsRecording(false);
        setIsTranscribing(true);

        // Fake transcription delay
        setTimeout(() => {
          const phrase =
            fakePhrases[Math.floor(Math.random() * fakePhrases.length)];
          onChange(phrase);
          setIsTranscribing(false);
        }, 1200);
      }, 2500);
    } catch {
      // Mic permission denied - just set a fake phrase
      const phrase =
        fakePhrases[Math.floor(Math.random() * fakePhrases.length)];
      onChange(phrase);
    }
  }, [onChange]);

  return (
    <div>
      <label className="block text-sm font-medium text-slate-400 mb-3">
        Input Sequence
      </label>
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled || isRecording || isTranscribing}
          placeholder="Was möchtest du übersetzen? (z.B. 'Wer ist ein braver Hund?')"
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-white/5 bg-white/[0.02] text-white placeholder-slate-500 resize-none focus:outline-none focus:border-amber-500/30 focus:ring-1 focus:ring-amber-500/20 transition-all disabled:opacity-50 font-[family-name:var(--font-outfit)]"
        />

        {/* Mic button */}
        <button
          onClick={startRecording}
          disabled={disabled || isRecording || isTranscribing}
          className="absolute bottom-3 right-3 p-2.5 rounded-lg border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-amber-500/20 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
          title="Spracheingabe aufnehmen"
        >
          <AnimatePresence mode="wait">
            {isRecording ? (
              <motion.div
                key="recording"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 flex items-center justify-center"
              >
                <div className="w-3 h-3 rounded-full bg-red-500 pulse-record" />
              </motion.div>
            ) : isTranscribing ? (
              <motion.div
                key="transcribing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-5 h-5 flex items-center justify-center"
              >
                <div className="flex gap-0.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-1 h-3 bg-amber-500 rounded-full waveform-bar"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.svg
                key="mic"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-5 h-5 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Recording indicator */}
      <AnimatePresence>
        {isRecording && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-red-400 flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 pulse-record" />
            Aufnahme läuft... Bitte deutlich sprechen
          </motion.p>
        )}
        {isTranscribing && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-2 text-xs text-amber-400"
          >
            Audio wird transkribiert...
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
