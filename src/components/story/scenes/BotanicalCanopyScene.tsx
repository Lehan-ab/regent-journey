"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, TreePine, Sparkles, Heart, Droplets, Shield, Clock, Ban } from "lucide-react";

interface SceneProps {
  variant?: string;
  sceneEvent?: string;
  atmosphereTitle?: string;
}

export default function BotanicalCanopyScene({
  variant = "living-codex",
  sceneEvent,
  atmosphereTitle = "The Sacred Banyan Canopy of Seethawaka",
}: SceneProps) {
  const isLivingCodex = variant === "living-codex";
  const isRejuvenation = variant === "grove-rejuvenation";
  const isActionGrove = variant === "action-grove";
  const isConductGateways = variant === "conduct-gateways";

  return (
    <div className="relative w-full h-full min-h-[240px] sm:min-h-[300px] bg-gradient-to-b from-[#021308] via-[#052212] to-[#030E07] overflow-hidden flex flex-col justify-between p-4">
      {/* 1. Bioluminescent Canopy Ambient Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-600/25 via-transparent to-transparent pointer-events-none" />

      {/* Floating Emerald Leaf & Pollen Motes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              x: [0, i % 2 === 0 ? 16 : -16, 0],
              opacity: [0.2, 0.75, 0.2],
            }}
            transition={{
              duration: 4.2 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/80 blur-[0.5px]"
            style={{
              top: `${14 + i * 9}%`,
              left: `${8 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* 2. Visual Staging for 4 Distinct Lessons */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full">
        {/* VARIANT 1-1: THE LIVING BOTANICAL CODEX */}
        {isLivingCodex && (
          <div className="relative flex flex-col items-center max-w-md w-full">
            {/* Curving Root Canopy Arch Overhead */}
            <div className="w-full flex items-center justify-between px-4 mb-2">
              <div className="w-12 h-6 border-t-2 border-l-2 border-emerald-500/60 rounded-tl-full" />
              <div className="px-2.5 py-0.5 bg-[#03150B] border border-emerald-400/60 text-[8px] font-pixel text-emerald-300 uppercase tracking-widest">
                ✦ LIVING BANYAN CODEX ✦
              </div>
              <div className="w-12 h-6 border-t-2 border-r-2 border-emerald-500/60 rounded-tr-full" />
            </div>

            {/* Central Unrolled Codex Pedestal */}
            <motion.div
              animate={{
                boxShadow: sceneEvent === "roots_pulse_green"
                  ? "0 0 35px rgba(16, 185, 129, 0.6)"
                  : "0 0 15px rgba(16, 185, 129, 0.25)",
              }}
              className="w-full bg-[#041B0E] border-2 border-emerald-700/80 p-3 sm:p-4 shadow-2xl relative flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-950/80 border border-emerald-400 flex items-center justify-center mb-1.5 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                <BookOpen className="w-5 h-5 text-emerald-300" />
              </div>

              <h4 className="font-pixel text-xs sm:text-sm text-emerald-100 font-bold mb-0.5">
                ROOTS OF SERVICE & FELLOWSHIP
              </h4>
              <p className="font-serif italic text-[10px] sm:text-[11px] text-[#C0DEC8] max-w-xs">
                “A tree stands firm not because of its branches, but because its roots run deep in selfless service.”
              </p>

              {/* Glowing Root Veins flowing beneath */}
              <div className="mt-2.5 flex items-center gap-1">
                <div className="w-8 h-0.5 bg-emerald-400/80 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_8px_#10B981]" />
                <div className="w-12 h-0.5 bg-emerald-400/80 animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-emerald-300 shadow-[0_0_8px_#10B981]" />
                <div className="w-8 h-0.5 bg-emerald-400/80 animate-pulse" />
              </div>
            </motion.div>
          </div>
        )}

        {/* VARIANT 1-2: ENVIRONMENTAL TRANSFORMATION (BEFORE / AFTER REJUVENATION) */}
        {isRejuvenation && (
          <div className="relative flex flex-col items-center max-w-lg w-full">
            <div className="w-full grid grid-cols-2 gap-2 sm:gap-3">
              {/* Left: Parched Field */}
              <div className="p-3 bg-[#170E06]/90 border border-amber-900/60 flex flex-col items-center justify-center text-center">
                <div className="text-[8px] font-pixel text-amber-500 uppercase tracking-wider mb-1">
                  WITHOUT SERVICE
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-950/60 border border-amber-800 flex items-center justify-center mb-1 text-amber-600">
                  <TreePine className="w-4 h-4 opacity-50" />
                </div>
                <span className="font-serif text-[10px] text-amber-200/70">
                  Parched Soil & Temporary Charity
                </span>
              </div>

              {/* Right: Thriving Rejuvenated Grove */}
              <motion.div
                animate={{
                  boxShadow: sceneEvent === "grove_flowers_bloom"
                    ? "0 0 30px rgba(16, 185, 129, 0.6)"
                    : "0 0 10px rgba(16, 185, 129, 0.2)",
                }}
                className="p-3 bg-[#032010] border-2 border-emerald-500/80 flex flex-col items-center justify-center text-center shadow-lg"
              >
                <div className="text-[8px] font-pixel text-emerald-300 uppercase tracking-wider mb-1">
                  ✦ SUSTAINABLE ACTION ✦
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center mb-1 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.5)]">
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                </div>
                <span className="font-serif text-[10px] text-emerald-100 font-bold">
                  Living Grove & Lasting Community Ownership
                </span>
              </motion.div>
            </div>

            <div className="mt-2 text-center text-[10px] font-serif italic text-emerald-200/90">
              Service Above Self: Transforming community needs into sustainable living outcomes.
            </div>
          </div>
        )}

        {/* VARIANT 1-3: PEOPLE OF ACTION (COLLABORATIVE CONSTRUCTION SCENE) */}
        {isActionGrove && (
          <div className="relative flex flex-col items-center max-w-lg w-full">
            <div className="w-full bg-[#051C0F] border-2 border-emerald-700/80 p-3 shadow-2xl flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1.5">
                <Droplets className="w-4 h-4 text-cyan-400" />
                <span className="font-pixel text-[11px] text-cyan-200 uppercase tracking-wider">
                  STONE WATER CONDUIT PROJECT
                </span>
                <Droplets className="w-4 h-4 text-cyan-400" />
              </div>

              {/* Active Conduit Visual Flow */}
              <div className="w-full h-8 bg-[#020B06] border border-cyan-800/80 rounded-none relative overflow-hidden flex items-center px-2 my-1">
                <motion.div
                  animate={{ x: [-100, 300] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-4 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent blur-sm"
                />
                <span className="relative z-10 text-[9px] font-pixel text-cyan-300 mx-auto">
                  IDEA ➔ COLLABORATION ➔ SERVICE ➔ MEASURABLE IMPACT
                </span>
              </div>

              <p className="font-serif text-[10px] sm:text-[11px] text-emerald-100/90 italic text-center mt-1">
                Rotaractors in action: youth teams working side-by-side to build lasting clean water channels.
              </p>
            </div>
          </div>
        )}

        {/* VARIANT 1-4: THE STANDARD WE CARRY (TRIPLE CONDUCT ARCHWAYS) */}
        {isConductGateways && (
          <div className="relative flex flex-col items-center max-w-lg w-full">
            <div className="w-full grid grid-cols-3 gap-2">
              {/* Archway 1: Punctuality */}
              <div className="p-2 sm:p-3 bg-[#041A0E] border-2 border-emerald-600/70 flex flex-col items-center text-center">
                <Clock className="w-4 h-4 text-emerald-300 mb-1" />
                <span className="font-pixel text-[9px] text-emerald-200 font-bold uppercase">
                  PUNCTUALITY
                </span>
                <span className="text-[8px] font-serif text-[#A4C4AC] mt-0.5">
                  Respect for others&apos; time
                </span>
              </div>

              {/* Archway 2: Respect & Inclusion */}
              <div className="p-2 sm:p-3 bg-[#041A0E] border-2 border-emerald-600/70 flex flex-col items-center text-center">
                <Shield className="w-4 h-4 text-emerald-300 mb-1" />
                <span className="font-pixel text-[9px] text-emerald-200 font-bold uppercase">
                  RESPECT
                </span>
                <span className="text-[8px] font-serif text-[#A4C4AC] mt-0.5">
                  Universal dignity
                </span>
              </div>

              {/* Archway 3: Substance-Free Integrity */}
              <div className="p-2 sm:p-3 bg-[#041A0E] border-2 border-emerald-600/70 flex flex-col items-center text-center">
                <Ban className="w-4 h-4 text-amber-400 mb-1" />
                <span className="font-pixel text-[9px] text-amber-200 font-bold uppercase">
                  INTEGRITY
                </span>
                <span className="text-[8px] font-serif text-[#A4C4AC] mt-0.5">
                  Substance-free policy
                </span>
              </div>
            </div>

            <div className="mt-2 text-center text-[10px] font-serif italic text-emerald-200/90">
              Three pillars of conduct defining the standard of a Rotaractor.
            </div>
          </div>
        )}
      </div>

      {/* 3. Ground Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-pixel text-emerald-300/80 border-t border-emerald-900/40 pt-2 mt-auto">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-emerald-400" />
          <span>{atmosphereTitle}</span>
        </div>
        <div className="px-2 py-0.5 bg-emerald-950/60 border border-emerald-800 text-[9px] uppercase tracking-wider">
          SCENE: {variant.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
