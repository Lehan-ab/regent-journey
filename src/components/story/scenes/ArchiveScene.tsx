"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Scale, Sparkles, Layers, ShieldCheck, Database, FolderArchive } from "lucide-react";

interface SceneProps {
  variant?: string;
  sceneEvent?: string;
  atmosphereTitle?: string;
}

export default function ArchiveScene({
  variant = "mountain-library",
  sceneEvent,
  atmosphereTitle = "The Mountain Archives of Seethawaka",
}: SceneProps) {
  const isMountainLibrary = variant === "mountain-library";
  const isTreasuryVault = variant === "treasury-vault";
  const isRotatingVault = variant === "rotating-vault";

  const [activeArchiveCategory, setActiveArchiveCategory] = useState<string>("DISTRICT 3220 HANDBOOK");

  const SUPPORTED_ARCHIVES = [
    { title: "DISTRICT 3220 HANDBOOK", desc: "Official Information Handbook RI Year 2026–27 (RID 3220)." },
    { title: "SECRETARIAT", desc: "Club meeting minutes, attendance logs, and charter continuity records." },
    { title: "RMIS PROTOCOL", desc: "District digital reporting platform submissions and recognition tracking." },
    { title: "TREASURY", desc: "Transparent dual-ledger accounting, verified receipts, and approved budgets." },
    { title: "AVENUES ARCHIVE", desc: "Project documentation across the 4 Primary and 7 Secondary avenues." },
    { title: "MEMBERSHIP", desc: "Prospect onboarding pathways, active rosters, and induction criteria." },
  ];

  return (
    <div className="relative w-full h-full min-h-[240px] sm:min-h-[300px] bg-gradient-to-b from-[#14061A] via-[#1E0926] to-[#0D0412] overflow-hidden flex flex-col justify-between p-3 sm:p-4">
      {/* 1. Purple & Amber Library Ambient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-700/20 via-transparent to-transparent pointer-events-none" />

      {/* Floating Library Dust Motes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -28, 0],
              opacity: [0.2, 0.75, 0.2],
            }}
            transition={{
              duration: 3.2 + i * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-purple-300/70 blur-[0.5px]"
            style={{
              top: `${16 + i * 9}%`,
              left: `${12 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* 2. Visual Staging for 3 Distinct Lessons */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto w-full">
        {/* VARIANT 7-1: MOUNTAIN LIBRARY (RECORDS THAT PROTECT THE CLUB) */}
        {isMountainLibrary && (
          <div className="relative flex flex-col items-center max-w-lg w-full">
            <motion.div
              animate={{
                boxShadow: sceneEvent === "library_scrolls_reorganize"
                  ? "0 0 35px rgba(168, 85, 247, 0.6)"
                  : "0 0 15px rgba(168, 85, 247, 0.2)",
              }}
              className="w-full bg-[#180922] border-2 border-purple-600/80 p-3 sm:p-4 shadow-2xl relative flex flex-col items-center text-center"
            >
              <div className="absolute -top-3 px-2.5 py-0.5 bg-[#0F0417] border border-purple-400 text-[8px] font-pixel text-purple-300 uppercase tracking-widest">
                ✦ GRAND SECRETARIAT REPOSITORIES ✦
              </div>

              <div className="w-10 h-10 rounded-full bg-purple-950 border border-purple-400 flex items-center justify-center mb-1.5 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                <BookOpen className="w-5 h-5 text-purple-300" />
              </div>

              <div className="font-pixel text-xs text-purple-100 font-bold uppercase mb-0.5">
                RECORDS THAT PROTECT CLUB CONTINUITY
              </div>
              <p className="font-serif italic text-[10px] sm:text-[11px] text-[#D8BFEC] max-w-xs">
                “Clear records protect public trust; organized minutes ensure that today&apos;s achievements endure for tomorrow&apos;s leaders.”
              </p>
            </motion.div>
          </div>
        )}

        {/* VARIANT 7-2: TREASURY OF TRUST (FORTIFIED VAULT & BALANCE SCALES) */}
        {isTreasuryVault && (
          <div className="relative flex flex-col items-center max-w-md w-full">
            <motion.div
              animate={{
                boxShadow: sceneEvent === "balance_scales_weigh_receipts"
                  ? "0 0 35px rgba(245, 158, 11, 0.6)"
                  : "0 0 15px rgba(245, 158, 11, 0.2)",
              }}
              className="w-full bg-[#1B0F04] border-2 border-amber-500/90 p-3 sm:p-4 shadow-2xl relative flex flex-col items-center text-center"
            >
              <div className="absolute -top-3 px-2.5 py-0.5 bg-[#120702] border border-amber-400 text-[8px] font-pixel text-amber-300 uppercase tracking-widest">
                ✦ TREASURY QUARTER: SCALES OF TRUST ✦
              </div>

              <div className="relative w-16 h-16 my-1 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: [-4, 4, -4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Scale className="w-10 h-10 text-amber-400" />
                </motion.div>
              </div>

              <div className="font-pixel text-xs text-amber-100 font-bold uppercase mb-0.5">
                FISCAL STEWARDSHIP & TRANSPARENCY
              </div>
              <p className="font-serif italic text-[10px] text-amber-200/90 max-w-xs">
                Every rupee entrusted to Rotaract is accounted for with approved budgets, verified receipts, and dual-signatory reporting.
              </p>
            </motion.div>
          </div>
        )}

        {/* VARIANT 7-3: CIRCULAR ROTATING REFERENCE CHAMBER */}
        {/* Strictly adheres to prompt: Uses supported handbook archives, NO unsupported RI Code! */}
        {isRotatingVault && (
          <div className="relative flex flex-col items-center max-w-lg w-full">
            <div className="text-center mb-1.5">
              <span className="px-2 py-0.5 bg-[#100518] border border-purple-400 text-[8px] font-pixel text-purple-300 uppercase tracking-widest">
                ✦ REVOLVING BRASS REFERENCE CYLINDERS ✦
              </span>
            </div>

            {/* Cylinder Selection Grid */}
            <div className="grid grid-cols-3 gap-1.5 w-full max-w-md mb-2">
              {SUPPORTED_ARCHIVES.map((item) => (
                <button
                  key={item.title}
                  onClick={() => setActiveArchiveCategory(item.title)}
                  className={`p-1.5 border text-center transition-all ${
                    activeArchiveCategory === item.title
                      ? "bg-purple-900 border-purple-300 shadow-[0_0_10px_#A855F7]"
                      : "bg-[#14081E] border-purple-900/60 text-purple-300 hover:border-purple-600"
                  }`}
                >
                  <div className="font-pixel text-[8px] font-bold text-purple-200 truncate">
                    {item.title}
                  </div>
                </button>
              ))}
            </div>

            {/* Display Active Cylinder Content */}
            <div className="w-full bg-[#160822] border border-purple-700/80 p-2.5 text-center">
              <span className="font-pixel text-xs text-purple-200 font-bold">
                {activeArchiveCategory}
              </span>
              <p className="font-serif text-[10px] text-[#D8BFEC] mt-0.5">
                {SUPPORTED_ARCHIVES.find((a) => a.title === activeArchiveCategory)?.desc}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 3. Ground Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-pixel text-purple-300/80 border-t border-purple-900/40 pt-2 mt-auto">
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span>{atmosphereTitle}</span>
        </div>
        <div className="px-2 py-0.5 bg-purple-950/60 border border-purple-800 text-[9px] uppercase tracking-wider">
          VAULT: {variant.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
