"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, X } from "lucide-react";
import NPCPortrait from "@/components/story/NPCPortrait";
import PixelCompanion from "@/components/companion/PixelCompanion";
import { getNPC } from "@/data/npcRegistry";
import { audioManager } from "@/lib/audioManager";

interface ChapterIntroCinematicProps {
  chapterId: string;
  chapterNumber: number;
  chapterLabel: string;
  chapterTitle: string;
  worldName: string;
  seethawakaInspiration: string;
  guideNpcId: string;
  companionId: string;
  isOpen: boolean;
  onComplete: () => void;
}

export default function ChapterIntroCinematic({
  chapterId,
  chapterNumber,
  chapterLabel,
  chapterTitle,
  worldName,
  seethawakaInspiration,
  guideNpcId,
  companionId,
  isOpen,
  onComplete,
}: ChapterIntroCinematicProps) {
  const npc = getNPC(guideNpcId) || getNPC("gatekeeper-aaron");

  useEffect(() => {
    if (!isOpen) return;

    audioManager.playWhoosh();

    // Auto-advance after 3.8s if user doesn't skip
    const timer = setTimeout(() => {
      onComplete();
    }, 3800);

    return () => clearTimeout(timer);
  }, [isOpen, onComplete]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: -20 }}
          transition={{ duration: 0.4 }}
          className="relative max-w-lg w-full bg-[#0A0503] border-4 border-regent-gold p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(255,199,25,0.3)] overflow-hidden"
        >
          {/* Filigree Corners */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-regent-gold pointer-events-none" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-regent-gold pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-regent-gold pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-regent-gold pointer-events-none" />

          {/* Skip Button */}
          <button
            onClick={onComplete}
            className="absolute top-3 right-3 px-2.5 py-1 bg-[#1A0C06] border border-[#3D2612] text-[#A48871] hover:text-white font-pixel text-[10px] uppercase flex items-center gap-1 transition-colors"
          >
            <span>SKIP</span> <X className="w-3 h-3" />
          </button>

          {/* World Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#170904] border border-regent-gold/60 text-[9px] font-pixel text-regent-gold uppercase tracking-widest mb-2">
              <Sparkles className="w-3 h-3 text-regent-gold" />
              <span>{chapterLabel} • SEETHAWAKA-INSPIRED REALM</span>
            </div>
            <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white tracking-wide">
              {worldName}
            </h2>
            <p className="font-serif italic text-xs text-[#C9B9A6] mt-1">
              {chapterTitle} — {seethawakaInspiration}
            </p>
          </motion.div>

          {/* Character Actors Reveal: NPC + Companion */}
          <div className="flex items-center justify-center gap-6 my-5">
            {/* Guide NPC */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center"
            >
              <NPCPortrait
                npcId={guideNpcId}
                expression="speaking"
                size="lg"
                isSpeaking={true}
                showBadge={true}
              />
            </motion.div>

            {/* Selected Companion */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#120703] border-2 border-regent-gold p-1 shadow-lg">
                <PixelCompanion
                  companionId={companionId as any}
                  emotion="happy"
                  size="full"
                  animate={true}
                />
              </div>
              <span className="text-[9px] font-pixel text-yellow-300 mt-1 uppercase">
                {companionId.toUpperCase()}
              </span>
            </motion.div>
          </div>

          {/* Guide Voice Quote */}
          {npc && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="p-3 bg-[#140803] border-l-4 border-regent-gold text-xs font-serif italic text-[#F2E8DC] leading-relaxed mb-4 text-left"
            >
              {npc.quote}
            </motion.div>
          )}

          {/* Auto-timer visual progress bar */}
          <div className="w-full h-1 bg-[#1A0C06] overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.8, ease: "linear" }}
              className="h-full bg-regent-gold"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
