"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Scroll, Award, Shield, CheckCircle2, Sunrise, Compass } from "lucide-react";

interface SceneProps {
  variant?: string;
  sceneEvent?: string;
  atmosphereTitle?: string;
}

export default function CitadelScene({
  variant = "ceremonial-hall",
  sceneEvent,
  atmosphereTitle = "The Summit Chamber of the Membership Citadel",
}: SceneProps) {
  const isCeremonialHall = variant === "ceremonial-hall";
  const isTwoScrolls = variant === "two-scrolls" || variant === "commitment-pedestal" || variant === "induction-dais";

  return (
    <div className="relative w-full h-full min-h-[240px] sm:min-h-[300px] bg-gradient-to-b from-[#221703] via-[#302105] to-[#140D02] overflow-hidden flex flex-col justify-between p-4">
      {/* 1. Golden Sunrise Citadel Sunlight & Aura */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/35 via-yellow-600/15 to-transparent pointer-events-none" />

      {/* Floating Golden Motes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -35, 0],
              opacity: [0.3, 0.95, 0.3],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
            className="absolute w-2 h-2 rounded-full bg-yellow-300/80 blur-[0.5px]"
            style={{
              top: `${14 + i * 8}%`,
              left: `${10 + i * 9}%`,
            }}
          />
        ))}
      </div>

      {/* 2. Visual Staging for 2 Distinct Lessons */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full">
        {/* VARIANT 9-1: CEREMONIAL HALL (THREE MEMBERSHIP STAGES) */}
        {isCeremonialHall && (
          <div className="relative flex flex-col items-center max-w-lg w-full">
            <motion.div
              animate={{
                boxShadow: sceneEvent === "citadel_pillars_glow_gold"
                  ? "0 0 45px rgba(234, 179, 8, 0.6)"
                  : "0 0 15px rgba(234, 179, 8, 0.25)",
              }}
              className="w-full bg-[#1E1404] border-2 border-yellow-500/80 p-3 sm:p-4 shadow-2xl relative flex flex-col items-center text-center"
            >
              <div className="absolute -top-3 px-2.5 py-0.5 bg-[#140D02] border border-yellow-400 text-[8px] font-pixel text-yellow-300 uppercase tracking-widest">
                ✦ THE THREE ASCENT STAGES ✦
              </div>

              <div className="w-full grid grid-cols-3 gap-2 my-2 text-center">
                <div className="p-2 bg-[#0E0902] border border-yellow-700/60">
                  <span className="font-pixel text-[8px] text-yellow-400">STAGE 1</span>
                  <div className="font-pixel text-[9px] text-white font-bold mt-0.5">PROSPECT</div>
                  <p className="text-[8px] font-serif text-[#DFCDBE] mt-0.5">Learning values & attending meetings</p>
                </div>
                <div className="p-2 bg-[#0E0902] border border-yellow-700/60">
                  <span className="font-pixel text-[8px] text-yellow-400">STAGE 2</span>
                  <div className="font-pixel text-[9px] text-white font-bold mt-0.5">ACTIVE MEMBER</div>
                  <p className="text-[8px] font-serif text-[#DFCDBE] mt-0.5">Hands-on project & avenue service</p>
                </div>
                <div className="p-2 bg-[#0E0902] border border-yellow-700/60">
                  <span className="font-pixel text-[8px] text-yellow-400">STAGE 3</span>
                  <div className="font-pixel text-[9px] text-white font-bold mt-0.5">GOOD STANDING</div>
                  <p className="text-[8px] font-serif text-[#DFCDBE] mt-0.5">Dues, attendance & leadership trust</p>
                </div>
              </div>

              <p className="font-serif italic text-[10px] text-amber-200/90 max-w-xs">
                Each stage reflects deeper commitment and active fellowship within Seethawaka Regent.
              </p>
            </motion.div>
          </div>
        )}

        {/* VARIANT 9-2: TWO SCROLLS AT SUNRISE (THE REGENT PATH TO INDUCTION) */}
        {/* Strictly adheres to prompt: Uses ceremonial Regent emblem / fictional Regent insignia (NO presidential seal!) */}
        {isTwoScrolls && (
          <div className="relative flex flex-col items-center max-w-lg w-full">
            <motion.div
              animate={{
                boxShadow: sceneEvent === "two_scrolls_unroll_glow"
                  ? "0 0 45px rgba(234, 179, 8, 0.7)"
                  : "0 0 20px rgba(234, 179, 8, 0.3)",
              }}
              className="w-full bg-[#201504] border-2 border-yellow-400 p-3 sm:p-4 shadow-2xl relative flex flex-col items-center text-center"
            >
              <div className="absolute -top-3 px-2.5 py-0.5 bg-[#140D02] border border-yellow-400 text-[8px] font-pixel text-yellow-300 uppercase tracking-widest">
                ✦ THE TWIN SCROLLS OF INDUCTION ✦
              </div>

              <div className="w-full grid grid-cols-2 gap-2 my-2 text-center">
                {/* Left Scroll: District Principles */}
                <div className="p-2 bg-[#0E0902] border border-yellow-600/70">
                  <Scroll className="w-4 h-4 text-yellow-300 mx-auto mb-1" />
                  <div className="font-pixel text-[9px] text-yellow-200 font-bold uppercase">
                    DISTRICT 3220 PRINCIPLES
                  </div>
                  <p className="text-[8px] font-serif text-[#DFCDBE] mt-0.5">
                    Service Above Self, Youth Leadership, Global Citizenship & Ethical Conduct.
                  </p>
                </div>

                {/* Right Scroll: RACSR Club Pathway */}
                <div className="p-2 bg-[#0E0902] border border-yellow-600/70">
                  <Compass className="w-4 h-4 text-yellow-300 mx-auto mb-1" />
                  <div className="font-pixel text-[9px] text-yellow-200 font-bold uppercase">
                    RACSR CLUB COMMITMENT
                  </div>
                  <p className="text-[8px] font-serif text-[#DFCDBE] mt-0.5">
                    Seethawaka valley community impact, leadership & fellowship.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[9px] font-pixel text-yellow-300 font-bold uppercase">
                <Sparkles className="w-3 h-3 text-yellow-400" />
                <span>CEREMONIAL REGENT EMBLEM UNSEALED</span>
                <Sparkles className="w-3 h-3 text-yellow-400" />
              </div>

              <p className="font-serif italic text-[10px] text-amber-200/90 max-w-xs mt-1">
                “Membership is not a trophy of completion—it is an unsealed gateway to lifelong leadership.”
              </p>
            </motion.div>
          </div>
        )}
      </div>

      {/* 3. Ground Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-pixel text-yellow-300/80 border-t border-yellow-900/40 pt-2 mt-auto">
        <div className="flex items-center gap-1.5">
          <Sunrise className="w-3 h-3 text-yellow-400" />
          <span>{atmosphereTitle}</span>
        </div>
        <div className="px-2 py-0.5 bg-yellow-950/60 border border-yellow-800 text-[9px] uppercase tracking-wider">
          CITADEL: {variant.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
