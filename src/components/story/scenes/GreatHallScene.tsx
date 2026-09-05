"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, Users, Gavel, Sunrise, Sparkles, Scroll, Compass } from "lucide-react";

interface SceneProps {
  variant?: string;
  sceneEvent?: string;
  atmosphereTitle?: string;
}

export default function GreatHallScene({
  variant = "hearth-hall",
  sceneEvent,
  atmosphereTitle = "The Great Hearth of Regent Keep",
}: SceneProps) {
  const isHearthHall = variant === "hearth-hall";
  const isCouncilTable = variant === "council-table";
  const isFellowshipFire = variant === "fellowship-fire";
  const isHighParapet = variant === "high-parapet";

  return (
    <div className="relative w-full h-full min-h-[240px] sm:min-h-[300px] bg-gradient-to-b from-[#1A0702] via-[#220B04] to-[#110502] overflow-hidden flex flex-col justify-between p-4">
      {/* 1. Hearth Fireplace Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-orange-600/25 via-amber-900/15 to-transparent pointer-events-none" />

      {/* Floating Hearth Embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(9)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -35, 0],
              x: [0, i % 2 === 0 ? 10 : -10, 0],
              opacity: [0.2, 0.85, 0.2],
            }}
            transition={{
              duration: 2.8 + i * 0.35,
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.25,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-orange-400/80 blur-[0.5px]"
            style={{
              bottom: `${14 + i * 8}%`,
              left: `${15 + i * 9}%`,
            }}
          />
        ))}
      </div>

      {/* 2. Visual Staging for 4 Distinct Lessons */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full">
        {/* VARIANT 3-1: BUSTLING GREAT HALL */}
        {isHearthHall && (
          <div className="relative flex flex-col items-center max-w-md w-full">
            <motion.div
              animate={{
                boxShadow: sceneEvent === "hearth_fire_flares_warm"
                  ? "0 0 40px rgba(249, 115, 22, 0.7)"
                  : "0 0 15px rgba(249, 115, 22, 0.3)",
              }}
              className="w-full bg-[#200A03] border-2 border-orange-700/80 p-3 sm:p-4 shadow-2xl relative flex flex-col items-center text-center"
            >
              <div className="absolute -top-3 px-2.5 py-0.5 bg-[#140602] border border-orange-500 text-[8px] font-pixel text-orange-300 uppercase tracking-widest">
                ✦ THE GREAT HEARTHFIRE ✦
              </div>

              {/* Roaring Hearthfire Visual */}
              <div className="relative w-16 h-16 my-1.5 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], y: [0, -3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-12 h-12 rounded-full bg-orange-500/30 blur-md absolute"
                />
                <Flame className="w-10 h-10 text-orange-400 relative z-10 animate-pulse" />
              </div>

              <div className="font-pixel text-[11px] sm:text-xs text-orange-100 font-bold uppercase mb-0.5">
                CLUB SERVICE: THE HEART OF ROTARACT
              </div>
              <p className="font-serif italic text-[10px] sm:text-[11px] text-[#E0C3B5] max-w-xs">
                “Fellowship is not an afterthought—it is the hearthfire that warms and sustains all of our service.”
              </p>
            </motion.div>
          </div>
        )}

        {/* VARIANT 3-2: ROUND-TABLE MEETING */}
        {isCouncilTable && (
          <div className="relative flex flex-col items-center max-w-lg w-full">
            <div className="w-full bg-[#1C0904] border-2 border-amber-700/80 p-3 shadow-2xl flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1.5">
                <Gavel className="w-4 h-4 text-amber-400" />
                <span className="font-pixel text-[11px] text-amber-200 uppercase tracking-wider">
                  COUNCIL TABLE • MEETINGS THAT MOVE PEOPLE
                </span>
                <Gavel className="w-4 h-4 text-amber-400" />
              </div>

              {/* Meeting Agenda & Member Seating Layout */}
              <div className="w-full grid grid-cols-3 gap-2 my-1 text-center">
                <div className="p-1.5 bg-[#0F0402] border border-amber-900/60">
                  <span className="font-pixel text-[8px] text-amber-400">STRUCTURE</span>
                  <p className="text-[9px] font-serif text-[#C4B3A8] mt-0.5">Clear agenda & focused time</p>
                </div>
                <div className="p-1.5 bg-[#0F0402] border border-amber-900/60">
                  <span className="font-pixel text-[8px] text-amber-400">FELLOWSHIP</span>
                  <p className="text-[9px] font-serif text-[#C4B3A8] mt-0.5">Camaraderie & open voice</p>
                </div>
                <div className="p-1.5 bg-[#0F0402] border border-amber-900/60">
                  <span className="font-pixel text-[8px] text-amber-400">ACTION</span>
                  <p className="text-[9px] font-serif text-[#C4B3A8] mt-0.5">Decisions that drive impact</p>
                </div>
              </div>

              <p className="font-serif italic text-[10px] text-amber-200/90 text-center mt-1">
                A good meeting respects time, inspires participation, and leaves members energized to serve.
              </p>
            </div>
          </div>
        )}

        {/* VARIANT 3-3: BELONGING (INTIMATE FIRESIDE TAPESTRY) */}
        {isFellowshipFire && (
          <div className="relative flex flex-col items-center max-w-md w-full">
            <motion.div
              animate={{
                boxShadow: sceneEvent === "banners_ripple_warmly"
                  ? "0 0 30px rgba(225, 29, 72, 0.5)"
                  : "0 0 12px rgba(225, 29, 72, 0.2)",
              }}
              className="w-full bg-[#1F0806] border-2 border-rose-800/80 p-3 sm:p-4 shadow-2xl relative flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 rounded-full bg-rose-950 border border-rose-500/70 flex items-center justify-center mb-1.5 shadow-[0_0_15px_rgba(225,29,72,0.4)]">
                <Users className="w-5 h-5 text-rose-300" />
              </div>

              <div className="font-pixel text-xs text-rose-100 font-bold uppercase mb-0.5">
                ✦ BELONGING & CLUB CAMARADERIE ✦
              </div>
              <p className="font-serif italic text-[10px] sm:text-[11px] text-[#ECCECE] max-w-xs">
                Seethawaka Regent is a community where every prospect finds a voice, mentors who guide, and bonds that outlast any single project.
              </p>
            </motion.div>
          </div>
        )}

        {/* VARIANT 3-4: LEADERSHIP GROWS THROUGH RESPONSIBILITY (HIGH BALCONY PANORAMA) */}
        {isHighParapet && (
          <div className="relative flex flex-col items-center max-w-lg w-full">
            <div className="w-full bg-[#180A04] border-2 border-amber-600/80 p-3 shadow-2xl flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1.5">
                <Sunrise className="w-4 h-4 text-amber-400" />
                <span className="font-pixel text-[11px] text-amber-200 uppercase tracking-wider">
                  HIGH BALCONY OVERVIEW • SUNRISE AT THE PARAPET
                </span>
                <Sunrise className="w-4 h-4 text-amber-400" />
              </div>

              {/* Panorama Horizon Visual */}
              <div className="w-full h-12 bg-gradient-to-t from-[#150702] via-[#2A1105] to-[#451B06] border border-amber-700/60 flex items-center justify-between px-3 my-1">
                <span className="text-[9px] font-pixel text-amber-300">EXPLORER</span>
                <div className="flex items-center gap-1 text-[8px] font-pixel text-yellow-300">
                  <span>RESPONSIBILITY</span> ➔ <span>INITIATIVE</span> ➔ <span>LEADERSHIP</span>
                </div>
                <span className="text-[9px] font-pixel text-amber-300">THE VALLEY</span>
              </div>

              <p className="font-serif italic text-[10px] text-amber-200/90 text-center mt-1">
                Leadership is not awarded with a title—it is forged step-by-step through taking responsibility.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 3. Ground Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-pixel text-orange-300/80 border-t border-orange-900/40 pt-2 mt-auto">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-orange-400" />
          <span>{atmosphereTitle}</span>
        </div>
        <div className="px-2 py-0.5 bg-orange-950/60 border border-orange-800 text-[9px] uppercase tracking-wider">
          KEEP HALL: {variant.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
