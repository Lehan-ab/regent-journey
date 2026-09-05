"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Key, Compass, Flame, ArrowUpRight } from "lucide-react";

interface SceneProps {
  variant?: string;
  sceneEvent?: string;
  atmosphereTitle?: string;
}

export default function PortalThresholdScene({
  variant = "gate-mist",
  sceneEvent,
  atmosphereTitle = "Seethawaka-Inspired Valley Threshold",
}: SceneProps) {
  const isUnsealed = variant === "gate-unsealed" || sceneEvent === "gate_stones_illuminate";

  return (
    <div className="relative w-full h-full min-h-[240px] sm:min-h-[300px] bg-gradient-to-b from-[#070302] via-[#140803] to-[#0A0503] overflow-hidden flex flex-col justify-between p-4">
      {/* 1. Atmospheric Mountain & Mist Horizon */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Mountain silhouettes */}
      <div className="absolute bottom-10 inset-x-0 h-28 opacity-40 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-950/60 to-transparent pointer-events-none" />

      {/* Dynamic Animated Fog / Valley Mist */}
      <motion.div
        animate={{ x: [-30, 30, -30], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-200/5 to-transparent pointer-events-none blur-xl"
      />

      {/* Floating Amber Lantern Motes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -35, 0],
              x: [0, i % 2 === 0 ? 12 : -12, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className="absolute w-2 h-2 rounded-full bg-amber-400/70 blur-[0.5px]"
            style={{
              top: `${18 + (i * 9)}%`,
              left: `${10 + (i * 11)}%`,
            }}
          />
        ))}
      </div>

      {/* 2. Visual Staging: Sealed Gate vs Unsealed Threshold */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full">
        {!isUnsealed ? (
          /* SCENE 0-1: EXPLORER OUTSIDE SEALED GATEWAY */
          <div className="relative flex flex-col items-center max-w-lg w-full">
            {/* Towering Stone Arch Lintels */}
            <div className="w-full flex items-center justify-between px-6 sm:px-12 mb-1">
              {/* Left Pillar */}
              <div className="w-10 sm:w-14 h-28 sm:h-36 bg-gradient-to-b from-[#2B170B] via-[#1B0C04] to-[#0D0502] border-2 border-amber-800/70 relative shadow-2xl flex flex-col items-center py-2">
                <div className="w-6 h-1 bg-amber-500/50 mb-2" />
                <div className="text-[7px] font-pixel text-amber-500/60 vertical-lr rotate-180 uppercase tracking-widest">
                  LEARN
                </div>
                {/* Lantern hanging from pillar */}
                <motion.div
                  animate={{ y: [0, -2, 0], rotate: [-2, 2, -2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -left-2 top-6 w-4 h-7 bg-amber-950 border border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.6)] flex items-center justify-center"
                >
                  <Flame className="w-2.5 h-2.5 text-amber-300 animate-pulse" />
                </motion.div>
              </div>

              {/* Center Portal: Sealed Iron-Stone Gate Doors */}
              <motion.div
                animate={{
                  boxShadow: sceneEvent === "portal_lantern_glow"
                    ? "0 0 35px rgba(245, 158, 11, 0.6)"
                    : "0 0 15px rgba(245, 158, 11, 0.2)",
                }}
                className="flex-1 mx-2 sm:mx-4 h-28 sm:h-36 bg-[#0E0603] border-4 border-amber-900/90 relative flex flex-col items-center justify-center p-3 text-center shadow-2xl"
              >
                {/* Keystone Glyph */}
                <div className="absolute -top-3 px-2.5 py-0.5 bg-[#170904] border border-regent-gold text-[8px] font-pixel text-regent-gold uppercase tracking-widest shadow">
                  ✦ ANCIENT SEALED KEYSTONE ✦
                </div>

                <div className="relative mb-1.5 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-amber-500/50 flex items-center justify-center bg-amber-950/40">
                    <Compass className="w-5 h-5 text-amber-400 animate-spin-slow" />
                  </div>
                </div>

                <div className="font-pixel text-[11px] sm:text-xs text-amber-100 font-bold tracking-wide mb-0.5">
                  THE SEALED THRESHOLD
                </div>
                <p className="font-serif italic text-[10px] sm:text-[11px] text-[#C9B9A6] max-w-[220px]">
                  “Curiosity opens the door; integrity and service keep it open.”
                </p>

                {/* Approaching Footstone Path */}
                <div className="absolute -bottom-2 flex gap-1">
                  <div className="w-3 h-1 bg-amber-700/60 rounded-full" />
                  <div className="w-4 h-1 bg-amber-600/70 rounded-full" />
                  <div className="w-3 h-1 bg-amber-700/60 rounded-full" />
                </div>
              </motion.div>

              {/* Right Pillar */}
              <div className="w-10 sm:w-14 h-28 sm:h-36 bg-gradient-to-b from-[#2B170B] via-[#1B0C04] to-[#0D0502] border-2 border-amber-800/70 relative shadow-2xl flex flex-col items-center py-2">
                <div className="w-6 h-1 bg-amber-500/50 mb-2" />
                <div className="text-[7px] font-pixel text-amber-500/60 vertical-lr rotate-180 uppercase tracking-widest">
                  SERVE
                </div>
                {/* Lantern hanging from pillar */}
                <motion.div
                  animate={{ y: [0, -2, 0], rotate: [2, -2, 2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute -right-2 top-6 w-4 h-7 bg-amber-950 border border-amber-400/80 shadow-[0_0_12px_rgba(245,158,11,0.6)] flex items-center justify-center"
                >
                  <Flame className="w-2.5 h-2.5 text-amber-300 animate-pulse" />
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          /* SCENE 0-2: INSIDE THRESHOLD AS GATE OPENS */
          <div className="relative flex flex-col items-center max-w-lg w-full">
            {/* The Unsealed Portal with Radiant Valley Light Beaming In */}
            <div className="w-full flex items-center justify-between px-4 sm:px-8">
              {/* Left Door Slid Open */}
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: -16 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-12 sm:w-16 h-32 sm:h-40 bg-gradient-to-r from-[#200F06] to-[#0E0603] border-2 border-amber-700/70 shadow-2xl relative"
              >
                <div className="absolute inset-y-0 right-0 w-1 bg-amber-500/50" />
              </motion.div>

              {/* Open Gateway revealing Sunlit Valley */}
              <div className="flex-1 mx-2 h-32 sm:h-40 relative overflow-hidden border-y-2 border-amber-500/60 bg-gradient-to-b from-amber-300/20 via-emerald-950/40 to-[#0A0503] flex flex-col items-center justify-center p-2 text-center shadow-[0_0_40px_rgba(245,158,11,0.4)]">
                {/* Radiant Light Shafts */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400/30 via-emerald-600/10 to-transparent pointer-events-none" />

                {/* Central Key Pedestal */}
                <motion.div
                  animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                  transition={{ rotate: { duration: 20, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-regent-gold bg-[#150904] flex items-center justify-center shadow-[0_0_20px_rgba(255,199,25,0.7)] mb-1"
                >
                  <Key className="w-5 h-5 sm:w-6 sm:h-6 text-regent-gold" />
                </motion.div>

                <div className="px-2 py-0.5 bg-[#170904]/90 border border-regent-gold text-[8px] font-pixel text-regent-gold uppercase tracking-widest shadow mb-1">
                  ✦ THRESHOLD UNSEALED ✦
                </div>

                <p className="font-serif text-[10px] sm:text-xs text-amber-100 font-semibold drop-shadow max-w-[240px]">
                  The ancient gates swing wide. The illuminated canopy of Rotary Roots beckons!
                </p>

                <div className="flex items-center gap-1 mt-1 text-[8px] font-pixel text-emerald-300">
                  <span>STEP FORWARD</span> <ArrowUpRight className="w-3 h-3 text-emerald-300" />
                </div>
              </div>

              {/* Right Door Slid Open */}
              <motion.div
                initial={{ x: 0 }}
                animate={{ x: 16 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="w-12 sm:w-16 h-32 sm:h-40 bg-gradient-to-l from-[#200F06] to-[#0E0603] border-2 border-amber-700/70 shadow-2xl relative"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-amber-500/50" />
              </motion.div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Ground Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-pixel text-amber-300/80 border-t border-amber-900/40 pt-2 mt-auto">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{atmosphereTitle}</span>
        </div>
        <div className="px-2 py-0.5 bg-amber-950/60 border border-amber-800 text-[9px] uppercase tracking-wider">
          STAGE: {isUnsealed ? "UNSEALED VALLEY" : "OUTSIDE SEALED PORTAL"}
        </div>
      </div>
    </div>
  );
}
