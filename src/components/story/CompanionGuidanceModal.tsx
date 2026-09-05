"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Award,
  Star,
  CheckCircle2,
  Pause,
  Play,
  RotateCcw,
  Compass,
  Landmark,
} from "lucide-react";
import PixelCompanion from "@/components/companion/PixelCompanion";
import PixelAvatar from "@/components/avatar/PixelAvatar";
import RetroButton from "@/components/ui/RetroButton";
import { usePlayer } from "@/context/PlayerContext";
import { COMPANIONS } from "@/data/companionsData";
import { audioManager } from "@/lib/audioManager";

interface CompanionGuidanceModalProps {
  isOpen: boolean;
  type: "lesson" | "chapter";
  currentTitle: string;
  nextTitle: string;
  xpAwarded: number;
  badgeUnlockedTitle?: string;
  nextChapterId?: string;
  onAdvance: () => void;
  onClose: () => void;
}

export default function CompanionGuidanceModal({
  isOpen,
  type,
  currentTitle,
  nextTitle,
  xpAwarded,
  badgeUnlockedTitle,
  nextChapterId,
  onAdvance,
  onClose,
}: CompanionGuidanceModalProps) {
  const { player } = usePlayer();
  const companionKey = player.companion || "nova";
  const companion = COMPANIONS[companionKey] || COMPANIONS.nova;

  // Countdown timer in seconds (3 for lesson, 5 for chapter)
  const initialTime = type === "chapter" ? 5 : 3;
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isPaused, setIsPaused] = useState(false);

  // Trigger CoC Victory sound effect when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeLeft(initialTime);
      setIsPaused(false);
      audioManager.playFanfare();
      setTimeout(() => {
        audioManager.playCoinDing();
      }, 400);
    }
  }, [isOpen, initialTime]);

  // Countdown effect with audio tick
  useEffect(() => {
    if (!isOpen || isPaused) return;

    if (timeLeft <= 0) {
      onAdvance();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev > 1) {
          audioManager.playCountdownTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isPaused, timeLeft, onAdvance]);

  if (!isOpen) return null;

  // Companion dialogue lines
  const getCompanionSpeech = () => {
    const name = player.name || "Prospect";
    if (type === "chapter") {
      if (companionKey === "nova") {
        return `“Spectacular achievement, ${name}! The realm of ${currentTitle} is fully documented. The ancient seals on ${nextTitle} have dissolved. Let us calculate our coordinates and journey onward!”`;
      } else if (companionKey === "raya") {
        return `“WE DID IT, ${name}! That whole realm is conquered! Look at that shiny badge! Pack your backpack, we're rushing straight to ${nextTitle}!”`;
      } else {
        return `“A disciplined, honorable triumph, ${name}. Your foundation in Seethawaka grows deeper with every victory. The path to ${nextTitle} stands open before us.”`;
      }
    } else {
      if (companionKey === "nova") {
        return `“Riddle solved and data catalogued with 100% precision! +${xpAwarded} XP credited to your log. Automatically guiding you to the next scroll now, ${name}!”`;
      } else if (companionKey === "raya") {
        return `“BOOM! First-class answer, ${name}! No stopping our momentum now—I'm leading you right into ${nextTitle}!”`;
      } else {
        return `“Well thought through, ${name}. True leadership begins with knowledge. Let us advance to our next study without delay.”`;
      }
    }
  };

  const percentProgress = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg bg-[#0C0603] border-4 border-regent-gold shadow-[0_0_50px_rgba(255,199,25,0.3)] overflow-hidden"
        >
          {/* Ornate Corner Accents */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-regent-gold pointer-events-none z-20" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-regent-gold pointer-events-none z-20" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-regent-gold pointer-events-none z-20" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-regent-gold pointer-events-none z-20" />

          {/* Top Banner */}
          <div className="bg-gradient-to-r from-regent-maroon via-red-900 to-regent-maroon border-b-2 border-regent-gold/70 px-4 py-3 text-center relative z-10">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#0C0603] border border-regent-gold/60 text-[10px] font-pixel text-regent-gold uppercase tracking-widest mb-1 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-regent-gold" />
              {type === "chapter" ? "REALM QUEST CONQUERED!" : "CHRONICLE TRIAL COMPLETE!"}
            </div>
            <h2 className="font-pixel text-lg sm:text-xl text-white font-bold tracking-wide drop-shadow-md">
              {currentTitle}
            </h2>
          </div>

          {/* Main Body */}
          <div className="p-5 sm:p-6 space-y-4">
            {/* Companion Showcase */}
            <div className="flex items-start gap-4 p-3.5 bg-[#170B05] border-2 border-[#4A2610]">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#0C0603] border-2 border-regent-gold p-1 shadow-[0_0_20px_rgba(255,199,25,0.4)] shrink-0 flex items-center justify-center">
                <PixelCompanion
                  companionId={companion.id}
                  emotion={type === "chapter" ? "celebrate" : "happy"}
                  size="full"
                  animate={true}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-pixel text-xs font-bold text-regent-gold uppercase">
                    {companion.name} • YOUR GUIDE
                  </span>
                  <span className="px-2 py-0.5 bg-[#0C0603] border border-yellow-700/60 font-pixel text-[10px] text-regent-gold flex items-center gap-1 font-bold">
                    <Star className="w-3 h-3 fill-regent-gold text-regent-gold" /> +{xpAwarded} XP
                  </span>
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-[#F0E6D8] leading-relaxed">
                  {getCompanionSpeech()}
                </p>
              </div>
            </div>

            {/* If Chapter Unlocked: Badge Display */}
            {type === "chapter" && badgeUnlockedTitle && (
              <div className="p-3 bg-gradient-to-r from-yellow-950/40 via-[#1C0F06] to-yellow-950/40 border-2 border-regent-gold/80 flex items-center gap-3">
                <div className="w-12 h-12 bg-[#0C0603] border-2 border-regent-gold flex items-center justify-center text-regent-gold shrink-0 shadow-md">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <span className="font-pixel text-[9px] text-regent-gold uppercase tracking-wider block">
                    LEGENDARY BADGE CLAIMED
                  </span>
                  <h4 className="font-pixel text-sm text-white font-bold">
                    {badgeUnlockedTitle}
                  </h4>
                  <p className="text-[11px] text-[#B8C0D2]">
                    Recorded in your Regent Codex of Honor.
                  </p>
                </div>
              </div>
            )}

            {/* Automatic Progression Countdown Card */}
            <div className="p-3.5 bg-[#120803] border border-[#3D2612] space-y-2 text-center">
              <div className="flex items-center justify-between text-xs font-pixel">
                <span className="text-regent-gold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 animate-spin" />
                  NEXT DESTINATION:
                </span>
                <span className="text-white font-bold truncate max-w-[200px]">
                  {nextTitle}
                </span>
              </div>

              {/* Progress bar */}
              <div className="relative w-full h-2.5 bg-[#0C0603] border border-[#4A2610] overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-regent-gold to-yellow-300"
                  style={{ width: `${percentProgress}%` }}
                  transition={{ duration: 1, ease: "linear" }}
                />
              </div>

              <div className="flex items-center justify-between text-[10px] font-pixel text-[#A48871]">
                <span>
                  {isPaused
                    ? "AUTOMATIC GUIDANCE PAUSED"
                    : `Advancing with ${companion.name} in ${timeLeft}s...`}
                </span>
                <button
                  onClick={() => {
                    audioManager.playTap();
                    setIsPaused(!isPaused);
                  }}
                  className="text-regent-gold hover:underline flex items-center gap-1"
                >
                  {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
                  {isPaused ? "Resume" : "Pause"}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-2">
              <button
                onClick={() => {
                  audioManager.playTap();
                  onClose();
                }}
                className="px-4 py-2 bg-[#170B05] border border-[#4A2610] font-pixel text-xs text-[#A48871] hover:text-white transition-all"
              >
                STAY ON THIS SCENE
              </button>

              <RetroButton
                variant="yellow"
                size="md"
                onClick={() => {
                  audioManager.playTap();
                  onAdvance();
                }}
                icon={<ArrowRight className="w-4 h-4 text-black" />}
                iconPosition="right"
              >
                {type === "chapter" ? "JOURNEY TO NEXT CHAPTER ➔" : "ADVANCE TO NEXT LESSON ➔"}
              </RetroButton>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
