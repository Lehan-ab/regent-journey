"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hammer, Sparkles, Layers, FileText, Flame, Users, Gauge, CheckCircle2 } from "lucide-react";

interface SceneProps {
  variant?: string;
  sceneEvent?: string;
  atmosphereTitle?: string;
}

export default function ForgeScene({
  variant = "drafting-table",
  sceneEvent,
  atmosphereTitle = "The Great Anvil of Project Creation",
}: SceneProps) {
  const isDraftingTable = variant === "drafting-table";
  const isAnvilCrucible = variant === "anvil-crucible" || variant === "active-crucible";
  const isAssemblyYard = variant === "assembly-yard" || variant === "alliance-yard";
  const isImpactChamber = variant === "impact-chamber";

  return (
    <div className="relative w-full h-full min-h-[240px] sm:min-h-[300px] bg-gradient-to-b from-[#1C0D03] via-[#241305] to-[#110702] overflow-hidden flex flex-col justify-between p-4">
      {/* 1. Dynamic Forge Lighting */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
          isAnvilCrucible
            ? "bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-600/35 via-orange-950/25 to-transparent"
            : isImpactChamber
            ? "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/25 via-transparent to-transparent"
            : isAssemblyYard
            ? "bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"
            : "bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-700/20 via-transparent to-transparent"
        }`}
      />

      {/* Floating Sparkles & Embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(isAnvilCrucible ? 12 : 6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -32, 0],
              x: [0, (i % 2 === 0 ? 12 : -12), 0],
              opacity: [0.2, 0.95, 0.2],
            }}
            transition={{
              duration: 2.2 + i * 0.3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.18,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-amber-400/80 blur-[0.5px]"
            style={{
              bottom: `${14 + i * 7}%`,
              left: `${12 + i * 8}%`,
            }}
          />
        ))}
      </div>

      {/* 2. Visual Staging for 4 Distinct Lessons */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full">
        {/* VARIANT 5-1: TOP-DOWN BLUEPRINT DRAFTING TABLE */}
        {isDraftingTable && (
          <div className="relative flex flex-col items-center max-w-lg w-full">
            <motion.div
              animate={{
                boxShadow: sceneEvent === "unroll_community_blueprints"
                  ? "0 0 35px rgba(245, 158, 11, 0.6)"
                  : "0 0 15px rgba(245, 158, 11, 0.2)",
              }}
              className="w-full bg-[#180C03] border-2 border-amber-600/80 p-3 sm:p-4 shadow-2xl relative flex flex-col items-center text-center"
            >
              <div className="absolute -top-3 px-2.5 py-0.5 bg-[#100702] border border-amber-400 text-[8px] font-pixel text-amber-300 uppercase tracking-widest">
                ✦ BLUEPRINT TABLE: COMMUNITY ASSESSMENT ✦
              </div>

              <div className="w-full grid grid-cols-3 gap-2 my-2 text-center">
                <div className="p-1.5 bg-[#0C0501] border border-amber-800/60">
                  <span className="font-pixel text-[8px] text-amber-400">SURVEY</span>
                  <p className="text-[9px] font-serif text-[#DFCDBE] mt-0.5">Listen to grassroots needs</p>
                </div>
                <div className="p-1.5 bg-[#0C0501] border border-amber-800/60">
                  <span className="font-pixel text-[8px] text-amber-400">OBJECTIVES</span>
                  <p className="text-[9px] font-serif text-[#DFCDBE] mt-0.5">Clear measurable goals</p>
                </div>
                <div className="p-1.5 bg-[#0C0501] border border-amber-800/60">
                  <span className="font-pixel text-[8px] text-amber-400">PLAN</span>
                  <p className="text-[9px] font-serif text-[#DFCDBE] mt-0.5">Structured timeline & roles</p>
                </div>
              </div>

              <p className="font-serif italic text-[10px] text-amber-200/90 max-w-xs">
                “Do not ask what project you want to build—ask what the community genuinely needs.”
              </p>
            </motion.div>
          </div>
        )}

        {/* VARIANT 5-2: ACTIVE FORGE & ANVIL (FORGE FOR SUSTAINABILITY) */}
        {isAnvilCrucible && (
          <div className="relative flex flex-col items-center max-w-md w-full">
            <motion.div
              animate={{
                boxShadow: sceneEvent === "anvil_sparks_fly"
                  ? "0 0 40px rgba(245, 158, 11, 0.7)"
                  : "0 0 15px rgba(245, 158, 11, 0.25)",
              }}
              className="w-full bg-[#200D03] border-2 border-amber-500 p-3 sm:p-4 shadow-2xl relative flex flex-col items-center text-center"
            >
              <div className="absolute -top-3 px-2.5 py-0.5 bg-[#120702] border border-amber-400 text-[8px] font-pixel text-amber-300 uppercase tracking-widest">
                ✦ MASTER ANVIL: SUSTAINABILITY ✦
              </div>

              <div className="relative w-16 h-16 my-1 flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-12 h-12 rounded-full bg-orange-600/30 blur-md absolute"
                />
                <Hammer className="w-10 h-10 text-amber-300 relative z-10" />
              </div>

              <div className="font-pixel text-xs text-amber-100 font-bold uppercase mb-0.5">
                TEMPERED FOR LASTING COMMUNITY OWNERSHIP
              </div>
              <p className="font-serif italic text-[10px] text-amber-200/90 max-w-xs">
                True sustainability means equipping the community to carry the initiative long after the final nail is struck.
              </p>
            </motion.div>
          </div>
        )}

        {/* VARIANT 5-3: WIDE ALLIANCE ASSEMBLY YARD */}
        {isAssemblyYard && (
          <div className="relative flex flex-col items-center max-w-lg w-full">
            <div className="w-full bg-[#180E04] border-2 border-amber-700/80 p-3 shadow-2xl flex flex-col items-center">
              <div className="flex items-center gap-2 mb-1.5">
                <Users className="w-4 h-4 text-amber-400" />
                <span className="font-pixel text-[11px] text-amber-200 uppercase tracking-wider">
                  ALLIANCE ASSEMBLY YARD • STRATEGIC PARTNERSHIPS
                </span>
                <Users className="w-4 h-4 text-amber-400" />
              </div>

              <div className="w-full grid grid-cols-3 gap-2 my-1 text-center">
                <div className="p-1.5 bg-[#0D0702] border border-amber-900/60">
                  <span className="font-pixel text-[8px] text-amber-400">SHARED VALUE</span>
                  <p className="text-[9px] font-serif text-[#D6C5B6] mt-0.5">Mutual mission alignment</p>
                </div>
                <div className="p-1.5 bg-[#0D0702] border border-amber-900/60">
                  <span className="font-pixel text-[8px] text-amber-400">RESOURCES</span>
                  <p className="text-[9px] font-serif text-[#D6C5B6] mt-0.5">Complementary expertise</p>
                </div>
                <div className="p-1.5 bg-[#0D0702] border border-amber-900/60">
                  <span className="font-pixel text-[8px] text-amber-400">PARTNERSHIP ACCORD</span>
                  <p className="text-[9px] font-serif text-[#D6C5B6] mt-0.5">Clear signed commitments</p>
                </div>
              </div>

              <p className="font-serif italic text-[10px] text-amber-200/90 text-center mt-1">
                Great projects are rarely built alone. Alliances amplify reach, resources, and credibility.
              </p>
            </div>
          </div>
        )}

        {/* VARIANT 5-4: IMPACT MEASUREMENT CHAMBER (RECORDING MEASURED OUTCOMES) */}
        {/* Adheres strictly to prompt: Use "documented outcomes", "measured results", "impact indicators", NOT "verified"! */}
        {isImpactChamber && (
          <div className="relative flex flex-col items-center max-w-md w-full">
            <motion.div
              animate={{
                boxShadow: sceneEvent === "pressure_gauges_calibrate"
                  ? "0 0 35px rgba(245, 158, 11, 0.6)"
                  : "0 0 15px rgba(245, 158, 11, 0.2)",
              }}
              className="w-full bg-[#180E03] border-2 border-amber-500/90 p-3 sm:p-4 shadow-2xl relative flex flex-col items-center text-center"
            >
              <div className="w-10 h-10 rounded-full bg-amber-950 border border-amber-400 flex items-center justify-center mb-1.5 shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                <Gauge className="w-5 h-5 text-amber-300" />
              </div>

              <div className="font-pixel text-xs text-amber-100 font-bold uppercase mb-1">
                ✦ IMPACT TESTING CHAMBER: MEASURED RESULTS ✦
              </div>

              <div className="w-full bg-[#0A0501] border border-amber-800/80 p-2 text-left space-y-1 my-1">
                <div className="flex items-center justify-between text-[9px] font-pixel text-amber-300">
                  <span>[INDICATOR: BENEFICIARIES SERVED]</span>
                  <span className="text-green-400 font-bold">DOCUMENTED ✓</span>
                </div>
                <div className="flex items-center justify-between text-[9px] font-pixel text-amber-300">
                  <span>[INDICATOR: RESOURCES UTILIZED]</span>
                  <span className="text-green-400 font-bold">ACCOUNTED ✓</span>
                </div>
                <div className="flex items-center justify-between text-[9px] font-pixel text-amber-300">
                  <span>[INDICATOR: SUSTAINABLE OUTCOME]</span>
                  <span className="text-yellow-300 font-bold">MEASURED ✦</span>
                </div>
              </div>

              <p className="font-serif italic text-[10px] text-amber-200/90 max-w-xs mt-1">
                Recording measured outcomes proves the authentic community impact of the project.
              </p>
            </motion.div>
          </div>
        )}
      </div>

      {/* 3. Ground Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-pixel text-amber-300/80 border-t border-amber-900/40 pt-2 mt-auto">
        <div className="flex items-center gap-1.5">
          <Layers className="w-3 h-3 text-amber-400" />
          <span>{atmosphereTitle}</span>
        </div>
        <div className="px-2 py-0.5 bg-amber-950/60 border border-amber-800 text-[9px] uppercase tracking-wider">
          FORGE STAGE: {variant.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
