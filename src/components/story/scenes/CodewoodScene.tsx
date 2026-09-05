"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Feather, Sparkles, Shield, Clock, Eye, Ban, Bot, UserCheck } from "lucide-react";

interface SceneProps {
  variant?: string;
  sceneEvent?: string;
  atmosphereTitle?: string;
}

interface VoiceRune {
  letter: string;
  label: string;
  principle: string;
}

const VOICE_RUNES: VoiceRune[] = [
  {
    letter: "V",
    label: "Verified",
    principle: "Every claim, project detail, and statistic is accurate and handbook-grounded.",
  },
  {
    letter: "O",
    label: "Open & Inclusive",
    principle: "Welcoming all backgrounds, languages, and communities with dignity.",
  },
  {
    letter: "I",
    label: "Impact-Driven",
    principle: "Focusing on genuine community transformation rather than superficial vanity.",
  },
  {
    letter: "C",
    label: "Consistent",
    principle: "Honoring Rotary visual identity, typography, and professional brand standards.",
  },
  {
    letter: "E",
    label: "Engaging",
    principle: "Inspiring youth to step forward, volunteer, and lead through dynamic storytelling.",
  },
];

export default function CodewoodScene({
  variant = "oath-stones",
  sceneEvent,
  atmosphereTitle = "The Sacred Codewood of Regent Ethics",
}: SceneProps) {
  const [activeRune, setActiveRune] = useState<number | null>(0);

  const isOathStones = variant === "oath-stones";
  const isProtocolPavilion = variant === "protocol-pavilion";
  const isRuneSpire = variant === "rune-spire" || variant === "whispering-runes" || variant === "rotaract-voice";
  const isMirrorOfTruth = variant === "mirror-of-truth";

  return (
    <div className="relative w-full h-full min-h-[240px] sm:min-h-[300px] bg-gradient-to-b from-[#041614] via-[#082220] to-[#030E0D] overflow-hidden flex flex-col justify-between p-3 sm:p-4">
      {/* 1. Teal Mystical Fog & Rune Light Ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-teal-600/20 via-transparent to-transparent pointer-events-none" />

      {/* Floating Teal Rune Glyphs / Motes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, (i % 2 === 0 ? 14 : -14), 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3.5 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-teal-300/80 blur-[0.5px]"
            style={{
              top: `${20 + i * 8}%`,
              left: `${10 + i * 11}%`,
            }}
          />
        ))}
      </div>

      {/* 2. Visual Staging for 4 Distinct Lessons */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full">
        {/* VARIANT 6-1: CIRCULAR OATH-STONE CLEARING */}
        {isOathStones && (
          <div className="relative flex flex-col items-center max-w-md w-full">
            <motion.div
              animate={{
                boxShadow: sceneEvent === "oath_stones_glow_softly"
                  ? "0 0 35px rgba(13, 148, 136, 0.6)"
                  : "0 0 15px rgba(13, 148, 136, 0.25)",
              }}
              className="w-full bg-[#051C1A] border-2 border-teal-600/80 p-3 sm:p-4 shadow-2xl relative flex flex-col items-center text-center"
            >
              <div className="absolute -top-3 px-2.5 py-0.5 bg-[#031110] border border-teal-400 text-[8px] font-pixel text-teal-300 uppercase tracking-widest">
                ✦ CIRCLE OF CONDUCT OATH-STONES ✦
              </div>

              {/* Standing Stones Circle */}
              <div className="relative w-20 h-20 my-1 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-teal-500/50 animate-spin-slow" />
                <div className="w-10 h-10 rounded-full bg-teal-950 border border-teal-400 flex items-center justify-center shadow-[0_0_12px_#0D9488]">
                  <Shield className="w-5 h-5 text-teal-300" />
                </div>
              </div>

              <div className="font-pixel text-xs text-teal-100 font-bold uppercase mb-0.5">
                PERSONAL INTEGRITY & REGENT DECORUM
              </div>
              <p className="font-serif italic text-[10px] sm:text-[11px] text-[#A6DDD8] max-w-xs">
                A Rotaractor represents the club at all times. Punctuality, respect for diversity, and substance-free integrity are non-negotiable standards.
              </p>
            </motion.div>
          </div>
        )}

        {/* VARIANT 6-2: PROTOCOL PAVILION */}
        {isProtocolPavilion && (
          <div className="relative flex flex-col items-center max-w-lg w-full">
            <div className="w-full bg-[#051E1B] border-2 border-teal-600/80 p-3 shadow-2xl flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1.5">
                <Clock className="w-4 h-4 text-teal-400" />
                <span className="font-pixel text-[11px] text-teal-200 uppercase tracking-wider">
                  PROTOCOL PAVILION • DECORUM & ETIQUETTE
                </span>
                <Clock className="w-4 h-4 text-teal-400" />
              </div>

              <div className="w-full grid grid-cols-3 gap-2 my-1 text-center">
                <div className="p-1.5 bg-[#031311] border border-teal-800/60">
                  <span className="font-pixel text-[8px] text-teal-300">PUNCTUALITY</span>
                  <p className="text-[9px] font-serif text-[#BCD6D3] mt-0.5">Arrive 15 min prior to call</p>
                </div>
                <div className="p-1.5 bg-[#031311] border border-teal-800/60">
                  <span className="font-pixel text-[8px] text-teal-300">DRESS CODE</span>
                  <p className="text-[9px] font-serif text-[#BCD6D3] mt-0.5">Smart casual to formal attire</p>
                </div>
                <div className="p-1.5 bg-[#031311] border border-teal-800/60">
                  <span className="font-pixel text-[8px] text-teal-300">SUBSTANCE-FREE</span>
                  <p className="text-[9px] font-serif text-[#BCD6D3] mt-0.5">Substance-free meeting policy</p>
                </div>
              </div>

              <p className="font-serif italic text-[10px] text-teal-200/90 text-center mt-1">
                Meeting decorum reflects the dignity of the organization and builds trusted public goodwill.
              </p>
            </div>
          </div>
        )}

        {/* VARIANT 6-3: THE ROTARACT VOICE (VOICE RUNE-SPIRE) */}
        {isRuneSpire && (
          <div className="relative flex flex-col items-center max-w-lg w-full">
            <div className="text-center mb-2">
              <span className="px-2 py-0.5 bg-[#031412] border border-teal-400 text-[8px] font-pixel text-teal-300 uppercase tracking-widest">
                ✦ THE 5-TIERED V.O.I.C.E. FRAMEWORK ✦
              </span>
            </div>

            {/* Interactive 5-tier buttons */}
            <div className="grid grid-cols-5 gap-1.5 w-full max-w-md mb-2">
              {VOICE_RUNES.map((rune, idx) => (
                <button
                  key={rune.letter}
                  onClick={() => setActiveRune(idx)}
                  className={`p-2 border text-center transition-all ${
                    activeRune === idx
                      ? "bg-teal-900 border-teal-300 shadow-[0_0_12px_#0D9488]"
                      : "bg-[#041614] border-teal-800/60 text-teal-300 hover:border-teal-500"
                  }`}
                >
                  <div className="font-pixel text-base font-bold text-teal-200">
                    {rune.letter}
                  </div>
                  <div className="text-[8px] font-pixel text-teal-400 uppercase truncate">
                    {rune.label.split(" ")[0]}
                  </div>
                </button>
              ))}
            </div>

            {activeRune !== null && (
              <div className="w-full bg-[#041715] border border-teal-700/80 p-2.5 text-center">
                <span className="font-pixel text-xs text-teal-200 font-bold">
                  {VOICE_RUNES[activeRune].letter} — {VOICE_RUNES[activeRune].label}
                </span>
                <p className="font-serif text-[10px] sm:text-[11px] text-[#A6DDD8] mt-0.5">
                  {VOICE_RUNES[activeRune].principle}
                </p>
              </div>
            )}
          </div>
        )}

        {/* VARIANT 6-4: RESPONSIBLE DIGITAL & AI USE (MIRROR OF TRUTH) */}
        {isMirrorOfTruth && (
          <div className="relative flex flex-col items-center max-w-md w-full">
            <motion.div
              animate={{
                boxShadow: sceneEvent === "mirror_shatters_illusions"
                  ? "0 0 35px rgba(13, 148, 136, 0.6)"
                  : "0 0 15px rgba(13, 148, 136, 0.2)",
              }}
              className="w-full bg-[#031816] border-2 border-teal-500/90 p-3 sm:p-4 shadow-2xl relative flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 rounded-full bg-teal-950 border border-teal-400 flex items-center justify-center mb-1.5 shadow-[0_0_15px_rgba(13,148,136,0.5)]">
                <Bot className="w-5 h-5 text-teal-300" />
              </div>

              <div className="font-pixel text-xs text-teal-100 font-bold uppercase mb-1">
                ✦ OBSIDIAN MIRROR: RESPONSIBLE AI ETHICS ✦
              </div>

              <div className="w-full grid grid-cols-2 gap-2 my-1 text-center">
                <div className="p-1.5 bg-[#020D0C] border border-teal-800/60">
                  <div className="flex items-center justify-center gap-1 text-[8px] font-pixel text-teal-300">
                    <UserCheck className="w-3 h-3" /> HUMAN OVERSIGHT
                  </div>
                  <p className="text-[9px] font-serif text-[#A6DDD8] mt-0.5">
                    Never outsource empathy or final decision-making.
                  </p>
                </div>
                <div className="p-1.5 bg-[#020D0C] border border-teal-800/60">
                  <div className="flex items-center justify-center gap-1 text-[8px] font-pixel text-teal-300">
                    <Shield className="w-3 h-3" /> TRUTH & PRIVACY
                  </div>
                  <p className="text-[9px] font-serif text-[#A6DDD8] mt-0.5">
                    Protect member data & check AI drafts against factual sources.
                  </p>
                </div>
              </div>

              <p className="font-serif italic text-[10px] text-teal-200/90 mt-1">
                AI is an accelerator for research and drafting—human leadership ensures integrity and warmth.
              </p>
            </motion.div>
          </div>
        )}
      </div>

      {/* 3. Ground Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-pixel text-teal-300/80 border-t border-teal-900/40 pt-2 mt-auto">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-teal-400" />
          <span>{atmosphereTitle}</span>
        </div>
        <div className="px-2 py-0.5 bg-teal-950/60 border border-teal-800 text-[9px] uppercase tracking-wider">
          CODEWOOD: {variant.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
