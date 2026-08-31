"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  MessageSquare,
  Award,
  Star,
  Compass,
  CheckCircle2,
  Lock,
  DoorOpen,
} from "lucide-react";
import PixelAvatar from "@/components/avatar/PixelAvatar";
import PixelCompanion from "@/components/companion/PixelCompanion";
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

export default function Step4Gateway({
  name,
  explorerId = "pathfinder",
  avatar,
  companionId,
  onEnterRealm,
}: Step4GatewayProps) {
  const companion = COMPANIONS[companionId] || COMPANIONS.nova;

  // Dialogue progression state: 0 -> 1 -> 2 -> 3 (Gate Opening Sequence) -> 4 (World Unlocked)
  const [dialogueStep, setDialogueStep] = useState(0);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [companionEmotion, setCompanionEmotion] = useState<CompanionEmotion>("idle");

  const handleNextDialogue = () => {
    if (dialogueStep === 0) {
      setDialogueStep(1);
      setCompanionEmotion("thinking");
    } else if (dialogueStep === 1) {
      setDialogueStep(2);
      setCompanionEmotion("happy");
    } else if (dialogueStep === 2) {
      // Trigger Gate Opening Animation Sequence
      setIsGateOpen(true);
      setCompanionEmotion("celebrate");
      setDialogueStep(3);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Title Header */}
      <div className="text-center mb-5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-regent-maroon text-regent-gold font-pixel text-xs border border-red-950 uppercase tracking-widest mb-2 shadow-md">
          <Sparkles className="w-3.5 h-3.5" /> PROLOGUE • STEP 4
        </div>
        <h1 className="font-pixel text-2xl sm:text-4xl font-bold text-white tracking-wide uppercase">
          THE GATEWAY TO SEETHAWAKA
        </h1>
        <p className="font-body text-xs sm:text-sm text-[#B8C0D2] mt-1 max-w-lg mx-auto">
          The threshold between the ordinary world and the Realm of Regent.
        </p>
      </div>

      {/* ============================================================ */}
      {/* CINEMATIC GATEWAY ENVIRONMENT CANVAS                         */}
      {/* ============================================================ */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/10] bg-[#02091F] border-2 border-border-card overflow-hidden shadow-retro-card-lg mb-6 select-none">
        {/* 1. Base Overworld Background: Mountains & Forest Mist */}
        <Image
          src="/images/chapter3_realms.jpg"
          alt="The Gateway of Regent"
          fill
          priority
          className={`object-cover object-bottom transition-all duration-1000 ${
            isGateOpen ? "scale-105 brightness-110" : "scale-100 brightness-90"
          }`}
        />

        {/* Ambient Dark Atmospheric Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02091F] via-[#02091F]/60 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#02091F]/30 to-[#02091F]/80" />

        {/* 2. Stone Gateway Columns & Maroon Banners */}
        {/* Left Stone Pillar */}
        <div className="absolute left-6 sm:left-14 bottom-16 top-6 w-12 sm:w-16 bg-[#0B1736] border-2 border-border-card flex flex-col justify-between shadow-2xl z-10">
          {/* Top Stone Capital */}
          <div className="h-6 bg-[#162752] border-b-2 border-regent-gold/60 flex items-center justify-center">
            <div className="w-2 h-2 bg-regent-gold" />
          </div>
          {/* Maroon Banner hanging from pillar */}
          <div className="w-8 sm:w-10 mx-auto h-24 bg-regent-maroon border-x border-b border-red-950 flex flex-col items-center justify-end pb-2">
            <span className="font-pixel text-[8px] text-regent-gold font-bold">RAC</span>
            <div className="w-3 h-3 border border-regent-gold rotate-45" />
          </div>
          {/* Bottom Stone Base */}
          <div className="h-8 bg-[#07112B] border-t-2 border-border-card" />
        </div>

        {/* Right Stone Pillar */}
        <div className="absolute right-6 sm:right-14 bottom-16 top-6 w-12 sm:w-16 bg-[#0B1736] border-2 border-border-card flex flex-col justify-between shadow-2xl z-10">
          {/* Top Stone Capital */}
          <div className="h-6 bg-[#162752] border-b-2 border-regent-gold/60 flex items-center justify-center">
            <div className="w-2 h-2 bg-regent-gold" />
          </div>
          {/* Maroon Banner hanging from pillar */}
          <div className="w-8 sm:w-10 mx-auto h-24 bg-regent-maroon border-x border-b border-red-950 flex flex-col items-center justify-end pb-2">
            <span className="font-pixel text-[8px] text-regent-gold font-bold">SR</span>
            <div className="w-3 h-3 border border-regent-gold rotate-45" />
          </div>
          {/* Bottom Stone Base */}
          <div className="h-8 bg-[#07112B] border-t-2 border-border-card" />
        </div>

        {/* Top Arch Beam */}
        <div className="absolute left-6 right-6 sm:left-14 sm:right-14 top-6 h-7 bg-[#091533] border-2 border-border-card flex items-center justify-center z-12 shadow-lg">
          <span className="font-pixel text-[10px] sm:text-xs text-regent-gold font-bold tracking-widest uppercase flex items-center gap-2">
            <Sparkles className="w-3 h-3" /> THE REALM OF SEETHAWAKA REGENT <Sparkles className="w-3 h-3" />
          </span>
        </div>

        {/* 3. The Animated Gate Doors */}
        <div className="absolute inset-x-16 sm:inset-x-28 top-12 bottom-16 flex overflow-hidden z-8">
          {/* Left Door Leaf */}
          <motion.div
            animate={{ x: isGateOpen ? "-105%" : "0%" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="w-1/2 h-full bg-[#050D24] border-r-2 border-regent-gold/70 flex items-center justify-end pr-2 shadow-2xl relative"
          >
            {/* Iron Rivets */}
            <div className="space-y-4 pr-1">
              <div className="w-2 h-2 bg-regent-gold border border-black" />
              <div className="w-2 h-2 bg-regent-gold border border-black" />
              <div className="w-2 h-2 bg-regent-gold border border-black" />
            </div>
          </motion.div>

          {/* Right Door Leaf */}
          <motion.div
            animate={{ x: isGateOpen ? "105%" : "0%" }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="w-1/2 h-full bg-[#050D24] border-l-2 border-regent-gold/70 flex items-center justify-start pl-2 shadow-2xl relative"
          >
            {/* Iron Rivets */}
            <div className="space-y-4 pl-1">
              <div className="w-2 h-2 bg-regent-gold border border-black" />
              <div className="w-2 h-2 bg-regent-gold border border-black" />
              <div className="w-2 h-2 bg-regent-gold border border-black" />
            </div>
          </motion.div>

          {/* Warm Golden Light Ray Revealed when Open */}
          {isGateOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="w-full h-full bg-gradient-to-t from-regent-gold/30 via-yellow-200/20 to-transparent blur-md" />
              <div className="absolute font-pixel text-regent-gold text-xs font-bold uppercase tracking-widest animate-pulse">
                PATH TO ROTARY ROOTS REVEALED
              </div>
            </motion.div>
          )}
        </div>

        {/* 4. Ambient Drifting Mist Particles */}
        <motion.div
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
          className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#02091F] via-[#02091F]/80 to-transparent pointer-events-none z-15"
        />

        {/* Ambient Fireflies */}
        <div className="absolute inset-0 pointer-events-none z-16 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: `${20 + i * 12}%`, y: `${40 + (i % 3) * 15}%`, opacity: 0.2 }}
              animate={{
                y: [`${40 + (i % 3) * 15}%`, `${30 + (i % 3) * 12}%`, `${40 + (i % 3) * 15}%`],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{ repeat: Infinity, duration: 3 + i, ease: "easeInOut", delay: i * 0.4 }}
              className="absolute w-1.5 h-1.5 rounded-full bg-regent-gold shadow-[0_0_6px_#FFC719]"
            />
          ))}
        </div>

        {/* 5. FOREGROUND CHARACTERS: CUSTOM EXPLORER AVATAR + CHOSEN COMPANION */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex items-end justify-center gap-5 sm:gap-8 z-20 pointer-events-none">
          {/* Player Avatar */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="relative w-18 h-18 sm:w-24 sm:h-24 bg-[#02091F] border-2 border-regent-gold p-1 shadow-[0_0_20px_#FFC719] flex items-center justify-center">
              <PixelAvatar
                explorerId={explorerId}
                config={avatar}
                variant="portrait"
                size="full"
                animate={false}
                showAccessory={true}
              />
            </div>
            <div className="px-2.5 py-0.5 bg-regent-maroon border border-red-950 font-pixel text-[10px] sm:text-xs text-white font-bold uppercase mt-1 truncate max-w-[120px] shadow-sm">
              {name || "TRAVELLER"}
            </div>
          </motion.div>

          {/* Selected Companion Sprite */}
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-16 h-16 sm:w-22 sm:h-22 bg-[#02091F] border-2 border-regent-gold p-1 shadow-[0_0_16px_rgba(255,199,25,0.3)] flex items-center justify-center">
              <PixelCompanion
                companionId={companion.id}
                emotion={companionEmotion}
                variant="portrait"
                size="full"
                animate={true}
                showGlow={true}
              />
            </div>
            <div
              className="px-2.5 py-0.5 bg-[#050F2D] border font-pixel text-[10px] sm:text-xs font-bold uppercase mt-1 shadow-sm"
              style={{ borderColor: companion.themeColor, color: companion.themeColor }}
            >
              {companion.name}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* INTERACTIVE STORYTELLING DIALOGUE & PROGRESSION PANEL        */}
      {/* ============================================================ */}
      {!isGateOpen ? (
        <div className="bg-[#071331] border-2 border-border-card p-4 sm:p-5 shadow-retro-card">
          <div className="flex items-start gap-3 sm:gap-4">
            {/* Companion Portrait Avatar */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#02091F] border-2 border-regent-gold shrink-0 p-1 flex items-center justify-center">
              <PixelCompanion
                companionId={companion.id}
                emotion={companionEmotion}
                variant="portrait"
                size="full"
                animate={false}
              />
            </div>

            {/* Speech Bubble / Script */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-pixel text-xs sm:text-sm font-bold text-regent-gold uppercase tracking-wider">
                  {companion.name}
                </span>
                <span className="text-[10px] text-text-muted hidden sm:inline">
                  • {companion.tagline}
                </span>
              </div>

              {/* Dialogue Lines according to Companion & Step */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={dialogueStep}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="font-body text-xs sm:text-sm text-white leading-relaxed mb-3"
                >
                  {companionId === "nova" && (
                    <>
                      {dialogueStep === 0 && (
                        <p>
                          “Explorer profile complete. Companion selected. Interests recorded. Everything is catalogued with 100% precision.”
                        </p>
                      )}
                      {dialogueStep === 1 && (
                        <p>
                          “There’s only one problem: you still don’t know what Rotaract actually is.”
                        </p>
                      )}
                      {dialogueStep === 2 && (
                        <p>
                          “Fortunately… the first road starts with the roots. Are you ready to open the Gateway to Rotary Roots?”
                        </p>
                      )}
                    </>
                  )}

                  {companionId === "raya" && (
                    <>
                      {dialogueStep === 0 && (
                        <p>
                          “Ready? We’ve got the compass calibrated and the whole realm ahead of us!”
                        </p>
                      )}
                      {dialogueStep === 1 && (
                        <p>
                          “No idea where every secret trail goes yet… but that’s the fun part!”
                        </p>
                      )}
                      {dialogueStep === 2 && (
                        <p>
                          “Come on, {name}! Rotary Roots is just beyond these ancient doors. Let’s crack them open!”
                        </p>
                      )}
                    </>
                  )}

                  {companionId === "kai" && (
                    <>
                      {dialogueStep === 0 && (
                        <p>
                          “Before you decide where you belong among the Seven Realms…”
                        </p>
                      )}
                      {dialogueStep === 1 && (
                        <p>
                          “…it helps to understand where the journey began. History gives us our foundation.”
                        </p>
                      )}
                      {dialogueStep === 2 && (
                        <p>
                          “Your first path leads to Rotary Roots. Breathe deep, {name}, and let us open the gate.”
                        </p>
                      )}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                {dialogueStep < 2 ? (
                  <RetroButton
                    variant="blue"
                    size="sm"
                    onClick={handleNextDialogue}
                    icon={<MessageSquare className="w-3.5 h-3.5" />}
                    iconPosition="right"
                  >
                    {dialogueStep === 0
                      ? companionId === "nova"
                        ? "“What problem?”"
                        : companionId === "raya"
                        ? "“For what?”"
                        : "“Where do we start?”"
                      : "CONTINUE"}
                  </RetroButton>
                ) : (
                  <RetroButton
                    variant="yellow"
                    size="md"
                    onClick={handleNextDialogue}
                    icon={<DoorOpen className="w-4 h-4 text-black" />}
                    iconPosition="left"
                    className="shadow-retro-yellow animate-pulse"
                  >
                    OPEN THE GATEWAY →
                  </RetroButton>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ============================================================ */
        /* GATEWAY UNLOCKED REWARDS & COMPLETION BANNER                  */
        /* ============================================================ */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-b from-[#071331] via-[#05112B] to-[#040D24] border-2 border-regent-gold p-5 sm:p-6 shadow-retro-card text-center"
        >
          {/* Trophy Emblem */}
          <div className="w-14 h-14 mx-auto mb-2 bg-regent-maroon border-2 border-regent-gold flex items-center justify-center shadow-md">
            <Award className="w-7 h-7 text-regent-gold" />
          </div>

          <span className="px-2.5 py-0.5 bg-regent-maroon text-regent-gold font-pixel text-[10px] border border-red-950 font-bold uppercase tracking-widest">
            PROLOGUE COMPLETED
          </span>

          <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-white tracking-wide mt-1.5 mb-1">
            THE GATEWAY COMPLETE
          </h2>

          <p className="font-body text-xs sm:text-sm text-[#B8C0D2] max-w-md mx-auto mb-5">
            You have crossed the threshold into Seethawaka. The first chapter of your Regent Journey is now open.
          </p>

          {/* Reward Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto mb-6 text-left">
            {/* Badge Earned Card */}
            <div className="p-3 bg-[#02091F] border border-regent-gold/80 flex items-center gap-3">
              <div className="w-10 h-10 bg-regent-maroon border border-red-950 flex items-center justify-center shrink-0">
                <Award className="w-5 h-5 text-regent-gold" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-pixel text-xs font-bold text-white">
                    FIRST STEP
                  </span>
                  <span className="text-[8px] font-pixel text-regent-gold bg-yellow-950 px-1 border border-yellow-800">
                    BADGE
                  </span>
                </div>
                <p className="text-[10px] text-text-secondary leading-tight mt-0.5">
                  Every Regent starts somewhere.
                </p>
                <span className="text-[10px] font-pixel text-regent-gold font-bold">
                  +50 XP AWARDED
                </span>
              </div>
            </div>

            {/* World Unlocked Card */}
            <div className="p-3 bg-[#02091F] border border-regent-green/80 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-950 border border-green-800 flex items-center justify-center shrink-0">
                <Compass className="w-5 h-5 text-regent-green" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-pixel text-xs font-bold text-white">
                    ROTARY ROOTS
                  </span>
                  <span className="text-[8px] font-pixel text-regent-green bg-green-950 px-1 border border-green-800">
                    UNLOCKED
                  </span>
                </div>
                <p className="text-[10px] text-text-secondary leading-tight mt-0.5">
                  Discover the origin of Rotary & Rotaract.
                </p>
                <span className="text-[10px] font-pixel text-regent-green font-bold">
                  CHAPTER 1 READY
                </span>
              </div>
            </div>
          </div>

          {/* Final Enter Realm CTA */}
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
              ENTER THE REALM →
            </RetroButton>
          </div>
        </motion.div>
      )}
    </div>
  );
}
