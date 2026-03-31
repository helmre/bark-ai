"use client";

import { motion } from "framer-motion";
import type { Breed } from "./barkGenerator";
import { Sparkles, Zap, AudioLines, Shield } from "lucide-react";

const breeds: {
  id: Breed;
  name: string;
  desc: string;
  Icon: React.ElementType;
  color: string;
}[] = [
  {
    id: "golden-retriever",
    name: "Aura",
    desc: "Warm & melodisch",
    Icon: Sparkles,
    color: "text-amber-400 bg-amber-400/10",
  },
  {
    id: "chihuahua",
    name: "Spark",
    desc: "Scharf & energisch",
    Icon: Zap,
    color: "text-orange-400 bg-orange-400/10",
  },
  {
    id: "husky",
    name: "Echo",
    desc: "Tief & ausladend",
    Icon: AudioLines,
    color: "text-blue-400 bg-blue-400/10",
  },
  {
    id: "german-shepherd",
    name: "Apex",
    desc: "Klar & bestimmt",
    Icon: Shield,
    color: "text-emerald-400 bg-emerald-400/10",
  },
];

interface VoiceSelectorProps {
  selected: Breed;
  onSelect: (breed: Breed) => void;
}

export default function VoiceSelector({
  selected,
  onSelect,
}: VoiceSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-400 mb-3">
        Stimm-Modell
      </label>
      <div className="grid grid-cols-2 gap-2">
        {breeds.map((breed) => {
          const isActive = selected === breed.id;
          return (
            <motion.button
              key={breed.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(breed.id)}
              className={`relative p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isActive
                  ? "border-amber-500/40 bg-amber-500/10"
                  : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="voice-selector"
                  className="absolute inset-0 rounded-xl border border-amber-500/40 bg-amber-500/10"
                  transition={{ type: "spring", duration: 0.3 }}
                />
              )}
              <div className="relative z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${breed.color}`}>
                    <breed.Icon className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white block leading-tight">
                      {breed.name}
                    </span>
                    <p className="text-xs text-slate-500 mt-0.5">{breed.desc}</p>
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
