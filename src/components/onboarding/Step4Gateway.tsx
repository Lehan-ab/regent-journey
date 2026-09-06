"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Scroll,
  DoorOpen,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import PixelAvatar from "@/components/avatar/PixelAvatar";
import PixelCompanion from "@/components/companion/PixelCompanion";
import NPCPortrait from "@/components/story/NPCPortrait";
import RetroButton from "@/components/ui/RetroButton";
import { COMPANIONS } from "@/data/companionsData";
import { AvatarConfig, CompanionId, CompanionEmotion, ExplorerId } from "@/types/player";

interface Step4GatewayProps {
  name: string;
  explorerId?: ExplorerId;
  avatar: AvatarConfig;
  companionId: CompanionId;
  onEnterRealm: () => void;
}

interface StoryGateBeat {
  speaker: "aaron" | "companion" | "prospect";
  speakerTitle?: string;
  expression?: "neutral" | "speaking" | "reaction";
  emotion?: CompanionEmotion;
  text: string;
}

export default function Step4Gateway({
  name,
  explorerId = "pathfinder",
  avatar,
  companionId,
  onEnterRealm,
}: Step4GatewayProps) {
  const companion = COMPANIONS[companionId] || COMPANIONS.nova;
  const prospectName = name?.trim() || "TRAVELLER";

  // Scripted introduction sequence (concise intro without duplicating lesson 0-1)
  const gateBeats: StoryGateBeat[] = [
    {
      speaker: "aaron",
      speakerTitle: "Gatekeeper Aaron • Portal Guardian",
      expression: "speaking",
      text: `“Halt, aspiring traveler! Before you stand the ancient stone gates of Seethawaka. You carry purpose in your stride, ${prospectName}. Beyond these archways lies the realm of the Rotaract Club of Seethawaka Regent—dedicated to service, leadership, and fellowship.”`,
    },
    {
      speaker: "prospect",
      text: `“I have heard the call of Seethawaka Regent! What path awaits beyond this threshold?”`,
    },
    {
      speaker: "aaron",
      speakerTitle: "Gatekeeper Aaron • Portal Guardian",
      expression: "speaking",
      text: `“A path founded on shared purpose, responsibility, and the timeless Rotary ethos of Service Above Self. Ahead lie the chronicles of our origins, the 11 avenues of action, and the forge where real community impact takes shape.”`,
    },
    {
      speaker: "companion",
      speakerTitle: `${companion.name} • Your Guide`,
      emotion: "happy",
      expression: "reaction",
      text: `“The gate is ready, ${prospectName}! What lies beyond it must be discovered by walking the path yourself. Let us unseal the threshold and enter the Prologue!”`,
    },
  ];

  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [isGateOpen, setIsGateOpen] = useState(false);

  const currentBeat = gateBeats[currentBeatIndex];
  const isFinalDialogue = currentBeatIndex >= gateBeats.length - 1;

  const handleNextBeat = () => {
    if (currentBeatIndex < gateBeats.length - 1) {
      setCurrentBeatIndex((prev) => prev + 1);
    } else {
      setIsGateOpen(true);
    }
  };

  const handlePreviousBeat = () => {
    if (currentBeatIndex > 0) {
      setCurrentBeatIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Title Header with Storybook Framing */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-regent-maroon via-red-900 to-regent-maroon text-regent-gold font-pixel text-xs border border-regent-gold/50 uppercase tracking-widest mb-2 shadow-md">
          <Sparkles className="w-3.5 h-3.5" /> PROLOGUE • THE CHRONICLES OF SEETHAWAKA
        </div>
        <h1 className="font-pixel text-2xl sm:text-4xl font-bold text-white tracking-wide uppercase drop-shadow-lg">
          THE GATEWAY TO SEETHAWAKA
        </h1>
        <p className="font-serif italic text-xs sm:text-sm text-[#D4C3B3] mt-1 max-w-lg mx-auto">
          “Where the ancient valor of the Seethawaka river corridor welcomes the next generation of changemakers.”
        </p>
      </div>

      {/* ============================================================ */}
      {/* CINEMATIC GATEWAY ENVIRONMENT CANVAS                         */}
      {/* ============================================================ */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/10] bg-[#02091F] border-4 border-[#3D2612] overflow-hidden shadow-retro-card-lg mb-6 select-none">
        {/* Base Background Image */}
        <Image
          src="/images/chapter3_realms.jpg"
          alt="The Gateway of Regent"
          fill
          priority
          className={`object-cover object-bottom transition-all duration-1000 ${
            isGateOpen ? "scale-105 brightness-110" : "scale-100 brightness-90"
          }`}
        />

        {/* Ambient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02091F] via-[#02091F]/60 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#02091F]/30 to-[#02091F]/80" />

        {/* Stone Gateway Columns & Maroon Banners */}
        {/* Left Stone Pillar */}
        <div className="absolute left-4 sm:left-14 bottom-14 top-6 w-12 sm:w-16 bg-[#0B1736] border-2 border-border-card flex flex-col justify-between shadow-2xl z-10">
          <div className="h-6 bg-[#162752] border-b-2 border-regent-gold/60 flex items-center justify-center">
            <div className="w-2 h-2 bg-regent-gold" />
          </div>
          <div className="w-8 sm:w-10 mx-auto h-24 bg-regent-maroon border-x border-b border-red-950 flex flex-col items-center justify-end pb-2 shadow-md">
            <span className="font-pixel text-[8px] text-regent-gold font-bold">RAC</span>
            <div className="w-3 h-3 border border-regent-gold rotate-45" />
          </div>
          <div className="h-8 bg-[#07112B] border-t-2 border-border-card" />
        </div>

        {/* Right Stone Pillar */}
        <div className="absolute right-4 sm:right-14 bottom-14 top-6 w-12 sm:w-16 bg-[#0B1736] border-2 border-border-card flex flex-col justify-between shadow-2xl z-10">
          <div className="h-6 bg-[#162752] border-b-2 border-regent-gold/60 flex items-center justify-center">
            <div className="w-2 h-2 bg-regent-gold" />
          </div>
          <div className="w-8 sm:w-10 mx-auto h-24 bg-regent-maroon border-x border-b border-red-950 flex flex-col items-center justify-end pb-2 shadow-md">
            <span className="font-pixel text-[8px] text-regent-gold font-bold">SR</span>
            <div className="w-3 h-3 border border-regent-gold rotate-45" />
          </div>
          <div className="h-8 bg-[#07112B] border-t-2 border-border-card" />
        </div>

        {/* Top Arch Beam */}
        <div className="absolute left-4 right-4 sm:left-14 sm:right-14 top-6 h-8 bg-[#091533] border-2 border-regent-gold/70 flex items-center justify-center z-12 shadow-lg">
          <span className="font-pixel text-[10px] sm:text-xs text-regent-gold font-bold tracking-widest uppercase flex items-center gap-2 drop-shadow">
            <Sparkles className="w-3 h-3 text-regent-gold" /> REALM OF SEETHAWAKA REGENT <Sparkles className="w-3 h-3 text-regent-gold" />
          </span>
        </div>

        {/* Animated Gate Doors */}
        <div className="absolute inset-x-14 sm:inset-x-28 top-14 bottom-14 flex overflow-hidden z-8">
          {/* Left Door Leaf */}
          <motion.div
            animate={{ x: isGateOpen ? "-105%" : "0%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-1/2 h-full bg-[#050D24] border-r-2 border-regent-gold/70 flex items-center justify-end pr-3 shadow-2xl relative"
          >
            <div className="space-y-4 pr-1">
              <div className="w-2.5 h-2.5 bg-regent-gold border border-black" />
              <div className="w-2.5 h-2.5 bg-regent-gold border border-black" />
              <div className="w-2.5 h-2.5 bg-regent-gold border border-black" />
            </div>
          </motion.div>

          {/* Right Door Leaf */}
          <motion.div
            animate={{ x: isGateOpen ? "105%" : "0%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-1/2 h-full bg-[#050D24] border-l-2 border-regent-gold/70 flex items-center justify-start pl-3 shadow-2xl relative"
          >
            <div className="space-y-4 pl-1">
              <div className="w-2.5 h-2.5 bg-regent-gold border border-black" />
              <div className="w-2.5 h-2.5 bg-regent-gold border border-black" />
              <div className="w-2.5 h-2.5 bg-regent-gold border border-black" />
            </div>
          </motion.div>

          {/* Warm Golden Radiant Light Burst when Opened */}
          {isGateOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-full h-full bg-gradient-to-t from-regent-gold/40 via-yellow-200/30 to-transparent blur-md" />
              <div className="absolute font-pixel text-regent-gold text-xs sm:text-sm font-bold uppercase tracking-widest animate-pulse drop-shadow-[0_0_12px_#FFC719]">
                ✦ PROLOGUE PORTAL UNSEALED ✦
              </div>
            </motion.div>
          )}
        </div>

        {/* Ambient Mist */}
        <motion.div
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#02091F] via-[#02091F]/70 to-transparent pointer-events-none z-15"
        />

        {/* Characters Standing on the Threshold Stage */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-end justify-center gap-6 sm:gap-10 z-20 pointer-events-none">
          {/* Gatekeeper Aaron Avatar (Left) */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 shadow-lg">
              <NPCPortrait
                npcId="gatekeeper-aaron"
                expression={currentBeat.speaker === "aaron" ? (currentBeat.expression || "speaking") : "neutral"}
                isSpeaking={currentBeat.speaker === "aaron"}
                size="full"
                showBadge={false}
              />
            </div>
            <div className="px-2 py-0.5 bg-[#050F2D] border border-regent-gold/50 font-pixel text-[9px] text-regent-gold font-bold uppercase mt-1">
              AARON
            </div>
          </motion.div>

          {/* Player Custom Avatar (Center) */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="relative w-18 h-18 sm:w-22 sm:h-22 bg-[#02091F] border-2 border-regent-blue p-1 shadow-[0_0_20px_rgba(32,169,246,0.5)] flex items-center justify-center">
              <PixelAvatar
                explorerId={explorerId}
                config={avatar}
                variant="portrait"
                size="full"
                animate={false}
                showAccessory={true}
              />
            </div>
            <div className="px-2.5 py-0.5 bg-regent-maroon border border-red-950 font-pixel text-[10px] text-white font-bold uppercase mt-1 truncate max-w-[120px] shadow-sm">
              {prospectName}
            </div>
          </motion.div>

          {/* Companion Sprite (Right) */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-14 h-14 sm:w-18 sm:h-18 bg-[#02091F] border-2 border-regent-gold p-1 shadow-[0_0_16px_rgba(255,199,25,0.3)] flex items-center justify-center">
              <PixelCompanion
                companionId={companion.id}
                emotion={currentBeat.emotion || "happy"}
                variant="portrait"
                size="full"
                animate={true}
                showGlow={true}
              />
            </div>
            <div
              className="px-2 py-0.5 bg-[#050F2D] border font-pixel text-[9px] font-bold uppercase mt-1 shadow-sm"
              style={{ borderColor: companion.themeColor, color: companion.themeColor }}
            >
              {companion.name}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* PURE SCRIPTED DIALOGUE PANEL (No prospectChoices)           */}
      {/* ============================================================ */}
      {!isGateOpen ? (
        <div className="bg-[#0C0603] border-4 border-[#3D2612] p-4 sm:p-6 shadow-2xl relative">
          {/* Top Scene Tracker */}
          <div className="flex items-center justify-between border-b border-[#3D2612] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Scroll className="w-4 h-4 text-regent-gold" />
              <span className="font-pixel text-xs text-regent-gold uppercase tracking-wider">
                PROLOGUE CHRONICLE • SCENE {currentBeatIndex + 1} OF {gateBeats.length}
              </span>
            </div>
            <span className="px-2 py-0.5 bg-regent-maroon text-regent-gold font-pixel text-[9px] border border-red-950 font-bold uppercase">
              ✦ GATEWAY THRESHOLD
            </span>
          </div>

          <div className="flex items-start gap-4">
            {/* Active Speaker Portrait */}
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#120703] border-2 border-regent-gold shrink-0 p-1 flex items-center justify-center shadow-md">
              {currentBeat.speaker === "prospect" ? (
                <PixelAvatar
                  explorerId={explorerId}
                  config={avatar}
                  size="full"
                  variant="portrait"
                  animate={false}
                  showAccessory={true}
                />
              ) : currentBeat.speaker === "companion" ? (
                <PixelCompanion
                  companionId={companion.id}
                  emotion={currentBeat.emotion || "happy"}
                  variant="portrait"
                  size="full"
                  animate={true}
                />
              ) : (
                <NPCPortrait
                  npcId="gatekeeper-aaron"
                  expression={currentBeat.expression || "speaking"}
                  size="full"
                  isSpeaking={true}
                  showBadge={false}
                />
              )}
            </div>

            {/* Speech Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span
                  className={`font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider ${
                    currentBeat.speaker === "prospect"
                      ? "text-regent-blue"
                      : "text-regent-gold"
                  }`}
                >
                  {currentBeat.speaker === "prospect"
                    ? `${prospectName} (Aspiring Prospect)`
                    : currentBeat.speakerTitle}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentBeatIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="font-serif text-sm sm:text-base text-[#F4EDE5] leading-relaxed mb-3"
                >
                  {currentBeat.text}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-[#3D2612]">
                <button
                  onClick={handlePreviousBeat}
                  disabled={currentBeatIndex === 0}
                  className="px-3 py-1.5 bg-[#140803] border border-[#3D2612] text-xs font-pixel text-[#A48871] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
                >
                  ◀ PREVIOUS SCENE
                </button>

                {!isFinalDialogue ? (
                  <RetroButton
                    variant="yellow"
                    size="sm"
                    onClick={handleNextBeat}
                    icon={<ChevronRight className="w-4 h-4 text-black" />}
                    iconPosition="right"
                  >
                    CONTINUE ➔
                  </RetroButton>
                ) : (
                  <RetroButton
                    variant="yellow"
                    size="md"
                    onClick={handleNextBeat}
                    icon={<DoorOpen className="w-4 h-4 text-black" />}
                    iconPosition="left"
                    className="shadow-retro-yellow animate-pulse"
                  >
                    UNSEAL THE GATEWAY →
                  </RetroButton>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ============================================================ */
        /* GATEWAY UNSEALED THRESHOLD — ENTER PROLOGUE LESSON 0-1       */
        /* ============================================================ */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-b from-[#140803] via-[#0C0603] to-[#080302] border-4 border-regent-gold p-5 sm:p-7 shadow-2xl text-center relative"
        >
          <div className="w-16 h-16 mx-auto mb-2 bg-regent-maroon border-2 border-regent-gold flex items-center justify-center shadow-lg">
            <DoorOpen className="w-8 h-8 text-regent-gold" />
          </div>

          <span className="px-3 py-0.5 bg-regent-maroon text-regent-gold font-pixel text-[10px] border border-red-950 font-bold uppercase tracking-widest">
            THRESHOLD UNSEALED • PROLOGUE AWAITS
          </span>

          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-white tracking-wide mt-2 mb-1">
            THE GATEWAY STANDS OPEN
          </h2>

          <p className="font-serif italic text-xs sm:text-sm text-[#D4C3B3] max-w-lg mx-auto mb-6">
            “You stand at the threshold of Seethawaka. Complete your first two chronicle lessons to earn the Initiate rank and advance into Rotary Roots.”
          </p>

          {/* Active Prologue Chronicle Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-6 text-left">
            <div className="p-3 bg-[#170B05] border-2 border-regent-gold/80 flex items-center gap-3">
              <div className="w-11 h-11 bg-regent-maroon border border-red-950 flex items-center justify-center shrink-0 shadow-md">
                <BookOpen className="w-6 h-6 text-regent-gold" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-pixel text-xs font-bold text-white">
                    LESSON 0-1
                  </span>
                  <span className="text-[8px] font-pixel text-regent-gold bg-yellow-950 px-1 border border-yellow-800">
                    REQUIRED
                  </span>
                </div>
                <p className="text-[10px] text-[#B8C0D2] leading-tight mt-0.5">
                  The Call Beyond the Gate — Meet Gatekeeper Aaron and discover our purpose.
                </p>
                <span className="text-[10px] font-pixel text-regent-gold font-bold">
                  READY AT THRESHOLD
                </span>
              </div>
            </div>

            <div className="p-3 bg-[#170B05] border-2 border-regent-blue/80 flex items-center gap-3">
              <div className="w-11 h-11 bg-[#071536] border border-blue-900 flex items-center justify-center shrink-0 shadow-md">
                <Scroll className="w-6 h-6 text-regent-blue" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-pixel text-xs font-bold text-white">
                    LESSON 0-2
                  </span>
                  <span className="text-[8px] font-pixel text-regent-blue bg-blue-950 px-1 border border-blue-800">
                    NEXT
                  </span>
                </div>
                <p className="text-[10px] text-[#B8C0D2] leading-tight mt-0.5">
                  The Explorer&apos;s Promise — Align your aspirations with the club creed.
                </p>
                <span className="text-[10px] font-pixel text-regent-blue font-bold">
                  UNLOCKS INITIATE
                </span>
              </div>
            </div>
          </div>

          {/* Final Enter Gateway CTA (Single canonical exit) */}
          <div className="max-w-md mx-auto">
            <RetroButton
              variant="green"
              size="lg"
              fullWidth
              onClick={onEnterRealm}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="shadow-retro-green text-sm sm:text-base py-3.5"
            >
              ENTER THE GATEWAY →
            </RetroButton>
          </div>
        </motion.div>
      )}
    </div>
  );
}
