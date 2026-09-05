"use client";

import React from "react";
import { motion } from "framer-motion";
import { Anchor, Compass, Globe, Radio, Database, Sparkles, Clock } from "lucide-react";

interface SceneProps {
  variant?: string;
  sceneEvent?: string;
  atmosphereTitle?: string;
}

export default function RiverHarborScene({
  variant = "navigation-dock",
  sceneEvent,
  atmosphereTitle = "Seethawaka River Quay & Maritime Navigation",
}: SceneProps) {
  const isNavigationDock = variant === "navigation-dock";
  const isBeaconTower = variant === "beacon-tower";
  const isDigitalManifest = variant === "digital-manifest";

  return (
    <div className="relative w-full h-full min-h-[240px] sm:min-h-[300px] bg-gradient-to-b from-[#020F18] via-[#051829] to-[#020A12] overflow-hidden flex flex-col justify-between p-4">
      {/* 1. Harbor Mist & Water Reflection Ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-cyan-600/20 via-transparent to-transparent pointer-events-none" />

      {/* Gentle Water Waves on bottom */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-cyan-950/70 to-transparent pointer-events-none" />

      {/* Harbor Water Sparkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -18, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3.2 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-300/70 blur-[0.5px]"
            style={{
              bottom: `${12 + i * 8}%`,
              left: `${10 + i * 12}%`,
            }}
          />
        ))}
      </div>

      {/* 2. Visual Staging for 3 Distinct Lessons */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full">
        {/* VARIANT 2-1: WIDE HARBOR NAVIGATION MAP */}
        {isNavigationDock && (
          <div className="relative flex flex-col items-center max-w-md w-full">
            <motion.div
              animate={{
                boxShadow: sceneEvent === "unroll_harbor_chart"
                  ? "0 0 35px rgba(6, 182, 212, 0.6)"
                  : "0 0 15px rgba(6, 182, 212, 0.2)",
              }}
              className="w-full bg-[#041B2B] border-2 border-cyan-600/80 p-3 sm:p-4 shadow-2xl relative flex flex-col items-center text-center"
            >
              <div className="absolute -top-3 px-2.5 py-0.5 bg-[#03131F] border border-cyan-400 text-[8px] font-pixel text-cyan-300 uppercase tracking-widest">
                ✦ DISTRICT 3220 FLEET CHART ✦
              </div>

              {/* Concentric Circles Visualization: Club -> District -> Global */}
              <div className="relative w-24 h-24 my-2 flex items-center justify-center">
                {/* Outer Ring: Worldwide Network */}
                <div className="absolute inset-0 rounded-full border border-cyan-500/30 animate-spin-slow" />
                {/* Middle Ring: District 3220 Sri Lanka & Maldives */}
                <div className="absolute inset-3 rounded-full border-2 border-dashed border-cyan-400/60" />
                {/* Inner Core: RACSR */}
                <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-300 flex items-center justify-center shadow-[0_0_12px_#06B6D4]">
                  <Anchor className="w-5 h-5 text-cyan-200" />
                </div>
              </div>

              <div className="font-pixel text-[11px] sm:text-xs text-cyan-100 font-bold uppercase mb-0.5">
                CONCENTRIC FLEET ECOSYSTEM
              </div>
              <p className="font-serif italic text-[10px] sm:text-[11px] text-[#A6CADE] max-w-xs">
                Seethawaka Regent sailing in coordinated rhythm with 70+ clubs across District 3220.
              </p>
            </motion.div>
          </div>
        )}

        {/* VARIANT 2-2: THE DISTRICT RHYTHM (BEACON TOWER & TIMETABLE) */}
        {isBeaconTower && (
          <div className="relative flex flex-col items-center max-w-lg w-full">
            <div className="w-full bg-[#041724] border-2 border-cyan-600/80 p-3 shadow-2xl flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="font-pixel text-[11px] text-cyan-200 uppercase tracking-wider">
                  SIGNAL BEACON TOWER • RI YEAR RHYTHM
                </span>
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              </div>

              {/* Quarterly Signal Timeline */}
              <div className="w-full grid grid-cols-4 gap-1.5 text-center my-1">
                <div className="p-1.5 bg-[#020D15] border border-cyan-700/60">
                  <div className="font-pixel text-[8px] text-cyan-300">Q1: JUL–SEP</div>
                  <div className="text-[9px] font-serif text-cyan-100 font-bold mt-0.5">Installation & Launch</div>
                </div>
                <div className="p-1.5 bg-[#020D15] border border-cyan-700/60">
                  <div className="font-pixel text-[8px] text-cyan-300">Q2: OCT–DEC</div>
                  <div className="text-[9px] font-serif text-cyan-100 font-bold mt-0.5">District Projects</div>
                </div>
                <div className="p-1.5 bg-[#020D15] border border-cyan-700/60">
                  <div className="font-pixel text-[8px] text-cyan-300">Q3: JAN–MAR</div>
                  <div className="text-[9px] font-serif text-cyan-100 font-bold mt-0.5">Mid-Year Review</div>
                </div>
                <div className="p-1.5 bg-[#020D15] border border-cyan-700/60">
                  <div className="font-pixel text-[8px] text-cyan-300">Q4: APR–JUN</div>
                  <div className="text-[9px] font-serif text-cyan-100 font-bold mt-0.5">Conference & Citation</div>
                </div>
              </div>

              <p className="font-serif italic text-[10px] text-cyan-200/90 text-center mt-1">
                A fleet sails on synchronized time. The beacon keeps every club aligned with District milestones.
              </p>
            </div>
          </div>
        )}

        {/* VARIANT 2-3: THE DIGITAL HARBOR (RMIS MANIFEST LEDGER) */}
        {isDigitalManifest && (
          <div className="relative flex flex-col items-center max-w-md w-full">
            <motion.div
              animate={{
                boxShadow: sceneEvent === "ledger_entries_glow"
                  ? "0 0 35px rgba(6, 182, 212, 0.6)"
                  : "0 0 15px rgba(6, 182, 212, 0.2)",
              }}
              className="w-full bg-[#031522] border-2 border-cyan-500/90 p-3 sm:p-4 shadow-2xl relative flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 rounded-full bg-cyan-950 border border-cyan-400 flex items-center justify-center mb-1.5 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                <Database className="w-5 h-5 text-cyan-300" />
              </div>

              <div className="font-pixel text-xs text-cyan-100 font-bold uppercase mb-1">
                ✦ DIGITAL HARBOR: RMIS PLATFORM ✦
              </div>

              <div className="w-full bg-[#020C14] border border-cyan-800/80 p-2 text-left space-y-1 my-1">
                <div className="flex items-center justify-between text-[9px] font-pixel text-cyan-300">
                  <span>[RECORD: MONTHLY REPORT]</span>
                  <span className="text-green-400 font-bold">SUBMITTED ✓</span>
                </div>
                <div className="flex items-center justify-between text-[9px] font-pixel text-cyan-300">
                  <span>[RECORD: EVENT ATTENDANCE]</span>
                  <span className="text-green-400 font-bold">LOGGED ✓</span>
                </div>
                <div className="flex items-center justify-between text-[9px] font-pixel text-cyan-300">
                  <span>[RECORD: CITATION ELIGIBILITY]</span>
                  <span className="text-yellow-300 font-bold">TRACKED ✦</span>
                </div>
              </div>

              <p className="font-serif italic text-[10px] text-cyan-200/90 max-w-xs mt-1">
                Why records matter: transparent reporting protects club continuity and member recognition.
              </p>
            </motion.div>
          </div>
        )}
      </div>

      {/* 3. Ground Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-pixel text-cyan-300/80 border-t border-cyan-900/40 pt-2 mt-auto">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-cyan-400" />
          <span>{atmosphereTitle}</span>
        </div>
        <div className="px-2 py-0.5 bg-cyan-950/60 border border-cyan-800 text-[9px] uppercase tracking-wider">
          HARBOR DOCK: {variant.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
