"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface OutputPanelProps {
  transcript: string;
  isPlaying: boolean;
  onPlayToggle: () => void;
}

export default function OutputPanel({
  transcript,
  isPlaying,
  onPlayToggle,
}: OutputPanelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    const width = canvas.width;
    const height = canvas.height;

    let phase = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const barCount = 64;
      const barWidth = width / barCount - 1;

      for (let i = 0; i < barCount; i++) {
        const x = i * (barWidth + 1);
        let barHeight: number;

        if (isPlaying) {
          barHeight =
            (Math.sin(i * 0.3 + phase) * 0.5 + 0.5) *
              height *
              0.7 *
              (0.5 + Math.random() * 0.5) +
            4;
        } else {
          barHeight = 2 + Math.sin(i * 0.2) * 2;
        }

        const gradient = ctx.createLinearGradient(0, height, 0, height - barHeight);
        gradient.addColorStop(0, "rgba(234, 88, 12, 0.6)");
        gradient.addColorStop(1, "rgba(245, 158, 11, 0.8)");

        ctx.fillStyle = gradient;
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
      }

      phase += 0.15;
      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isPlaying]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 rounded-xl border border-white/5 bg-white/[0.02]"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-400">Ausgabe</span>
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-slate-600">BarkEngine v2.1</span>
        </div>
      </div>

      {/* Waveform canvas */}
      <div className="relative h-20 mb-4 rounded-lg overflow-hidden bg-white/[0.02] border border-white/5">
        <canvas
          ref={canvasRef}
          width={512}
          height={80}
          className="w-full h-full"
        />
        {/* Play button overlay */}
        <button
          onClick={onPlayToggle}
          className="absolute inset-0 flex items-center justify-center bg-transparent hover:bg-white/[0.02] transition-colors cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity shadow-lg shadow-amber-500/20">
            {isPlaying ? (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>
        </button>
      </div>

      {/* Transcript */}
      <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5">
        <p className="text-xs text-slate-600 mb-1 font-mono">Hunde-Transkript:</p>
        <p className="text-sm text-amber-400/80 italic">{transcript}</p>
      </div>

      {/* Fake action buttons */}
      <div className="flex gap-2 mt-4">
        <button className="flex-1 px-3 py-2 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-slate-500 hover:text-white hover:border-white/10 transition-all cursor-pointer">
          <span className="flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Herunterladen .wav
          </span>
        </button>
        <button className="flex-1 px-3 py-2 rounded-lg border border-white/5 bg-white/[0.02] text-xs text-slate-500 hover:text-white hover:border-white/10 transition-all cursor-pointer">
          <span className="flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
            Teilen
          </span>
        </button>
      </div>
    </motion.div>
  );
}
