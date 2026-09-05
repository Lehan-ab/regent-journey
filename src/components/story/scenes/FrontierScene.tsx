"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Compass, Sparkles, CheckCircle2, Tent, Footprints, ClipboardList } from "lucide-react";

interface SceneProps {
  variant?: string;
  sceneEvent?: string;
  atmosphereTitle?: string;
}

export default function FrontierScene({
  variant = "expedition-camp",
  sceneEvent,
  atmosphereTitle = "The Open Sky of the Impact Frontier",
}: SceneProps) {
  const isExpeditionCamp = variant === "expedition-camp";
  const isMissionBoard = variant === "mission-board";

  return (
    <div className="relative w-full h-full min-h-[240px] sm:min-h-[300px] bg-gradient-to-b from-[#031810] via-[#05281C] to-[#02100A] overflow-hidden flex flex-col justify-between p-4">
      {/* 1. Forest Canopy & Open Sky Ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-emerald-600/20 via-transparent to-transparent pointer-events-none" />

      {/* Mountain Breeze Wind Motes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [-30, 60, -30],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3.5 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className="absolute w-2 h-1 rounded-full bg-emerald-300/60 blur-[0.5px]"
            style={{
              top: `${20 + i * 9}%`,
              left: `${10 + i * 11}%`,
            }}
          />
        ))}
      </div>

      {/* 2. Visual Staging for 2 Distinct Lessons */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full">
        {/* VARIANT 8-1: EXPEDITION CAMP (FROM REALM TO REALITY) */}
        {isExpeditionCamp && (
          <div className="relative flex flex-col items-center max-w-md w-full">
            <motion.div
              animate={{
                boxShadow: sceneEvent === "field_maps_spread_out"
                  ? "0 0 35px rgba(5, 150, 105, 0.6)"
                  : "0 0 15px rgba(5, 150, 105, 0.2)",
              }}
              className="w-full bg-[#052016] border-2 border-emerald-600/80 p-3 sm:p-4 shadow-2xl relative flex flex-col items-center text-center"
            >
              <div className="absolute -top-3 px-2.5 py-0.5 bg-[#02120C] border border-emerald-400 text-[8px] font-pixel text-emerald-300 uppercase tracking-widest">
                ✦ EXPEDITION BASECAMP ✦
              </div>

              <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center mb-1.5 shadow-[0_0_15px_rgba(5,150,105,0.4)]">
                <Tent className="w-5 h-5 text-emerald-300" />
              </div>

              <div className="font-pixel text-xs text-emerald-100 font-bold uppercase mb-0.5">
                FROM DIGITAL REALM TO REALITY
              </div>
              <p className="font-serif italic text-[10px] sm:text-[11px] text-[#C1E2D4] max-w-xs">
                “The digital guide is merely preparation; real Rotaract lives under the open sky in hands-on community service.”
              </p>

              <div className="mt-2 flex items-center gap-1 text-[8px] font-pixel text-emerald-300">
                <Footprints className="w-3 h-3 text-emerald-400" />
                <span>STEP INTO THE PHYSICAL WORLD</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* VARIANT 8-2: TOP-DOWN MISSION BOARD (THE IMPACT EXPEDITION) */}
        {isMissionBoard && (
          <div className="relative flex flex-col items-center max-w-lg w-full">
            <div className="w-full bg-[#052218] border-2 border-emerald-500/90 p-3 shadow-2xl flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1.5">
                <MapPin className="w-4 h-4 text-emerald-400" />
                <span className="font-pixel text-[11px] text-emerald-200 uppercase tracking-wider">
                  PINNED MISSION BOARD • FIELD SERVICE LIFECYCLE
                </span>
                <MapPin className="w-4 h-4 text-emerald-400" />
              </div>

              <div className="w-full grid grid-cols-4 gap-1.5 my-1 text-center">
                <div className="p-1.5 bg-[#02120C] border border-emerald-800/60">
                  <span className="font-pixel text-[8px] text-emerald-400">1. NEED</span>
                  <p className="text-[9px] font-serif text-[#C1E2D4] mt-0.5">Community voice</p>
                </div>
                <div className="p-1.5 bg-[#02120C] border border-emerald-800/60">
                  <span className="font-pixel text-[8px] text-emerald-400">2. TEAM</span>
                  <p className="text-[9px] font-serif text-[#C1E2D4] mt-0.5">Avenue synergy</p>
                </div>
                <div className="p-1.5 bg-[#02120C] border border-emerald-800/60">
                  <span className="font-pixel text-[8px] text-emerald-400">3. SERVICE</span>
                  <p className="text-[9px] font-serif text-[#C1E2D4] mt-0.5">Hands-on delivery</p>
                </div>
                <div className="p-1.5 bg-[#02120C] border border-emerald-800/60">
                  <span className="font-pixel text-[8px] text-emerald-400">4. OUTCOMES</span>
                  <p className="text-[9px] font-serif text-[#C1E2D4] mt-0.5">Documented results</p>
                </div>
              </div>

              <p className="font-serif italic text-[10px] text-emerald-200/90 text-center mt-1">
                Participate with dedication, document honestly, and reflect on the lasting change created.
              </p>
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
          FRONTIER: {variant.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
