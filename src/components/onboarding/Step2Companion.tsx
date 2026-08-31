"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Check,
  Star,
  Award,
  ArrowRight,
  Shield,
  Heart,
  MessageSquare,
  Compass,
} from "lucide-react";
import PixelCompanion from "@/components/companion/PixelCompanion";
import PixelAvatar from "@/components/avatar/PixelAvatar";
import RetroButton from "@/components/ui/RetroButton";
import { COMPANIONS } from "@/data/companionsData";
import { CompanionId, CompanionEmotion, ExplorerId } from "@/types/player";

interface Step2CompanionProps {
  initialCompanion?: CompanionId;
  playerName?: string;
  explorerId?: ExplorerId;
  onConfirm: (companion: CompanionId) => void;
}

export default function Step2Companion({
  initialCompanion = "nova",
  playerName = "Explorer",
  explorerId = "pathfinder",
  onConfirm,
}: Step2CompanionProps) {
  const [selectedId, setSelectedId] = useState<CompanionId>(initialCompanion);
  const [hoveredId, setHoveredId] = useState<CompanionId | null>(null);
  const [companionEmotion, setCompanionEmotion] = useState<Record<CompanionId, CompanionEmotion>>({
    nova: "idle",
    raya: "idle",
    kai: "idle",
  });
  const [showCelebration, setShowCelebration] = useState(false);

  const selectedCompanion = COMPANIONS[selectedId] || COMPANIONS.nova;
  const companionList = [COMPANIONS.nova, COMPANIONS.raya, COMPANIONS.kai];

  const handleCompanionSelect = (id: CompanionId) => {
    setSelectedId(id);
    setCompanionEmotion((prev) => ({
      ...prev,
      [id]: prev[id] === "happy" ? "celebrate" : "happy",
    }));
    setTimeout(() => {
      setCompanionEmotion((prev) => ({ ...prev, [id]: "idle" }));
    }, 2000);
  };

  const handleConfirm = () => {
    setShowCelebration(true);
  };

  const handleProceed = () => {
    onConfirm(selectedId);
  };

  // Generate personalized greeting
  const personalizedGreeting = selectedCompanion.personalizedGreetingTemplate.replace(
    /\{name\}/g,
    playerName.trim() || "Explorer"
  );

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* ============================================================ */}
      {/* 1. STEP HEADER                                               */}
      {/* ============================================================ */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-regent-maroon text-regent-gold font-pixel text-xs border border-red-950 uppercase tracking-widest mb-2 shadow-md">
          <Sparkles className="w-3.5 h-3.5" /> PROLOGUE • STEP 2
        </div>
        <h1 className="font-pixel text-2xl sm:text-4xl font-bold text-white tracking-wide uppercase">
          CHOOSE YOUR COMPANION
        </h1>
        <p className="font-body text-xs sm:text-sm text-[#B8C0D2] mt-1.5 max-w-xl mx-auto leading-relaxed">
          Every great Explorer needs someone beside them. Choose the companion who will guide you through your Regent Journey.
        </p>
      </div>

      {/* ============================================================ */}
      {/* 2. THREE COMPANION CARDS (COLLECTIBLE RPG CARDS)             */}
      {/* ============================================================ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8 items-stretch">
        {companionList.map((companion) => {
          const isSelected = selectedId === companion.id;
          const isHovered = hoveredId === companion.id;
          const currentEmotion =
            companionEmotion[companion.id] ||
            (isSelected ? "happy" : isHovered ? "thinking" : "idle");

          return (
            <motion.div
              key={companion.id}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCompanionSelect(companion.id)}
              onMouseEnter={() => setHoveredId(companion.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative bg-[#071331] border-2 cursor-pointer transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between select-none shadow-retro-card ${
                isSelected
                  ? "border-regent-gold bg-gradient-to-b from-[#09183E] via-[#061230] to-[#040C24] shadow-[0_0_20px_rgba(255,199,25,0.25)] ring-1 ring-regent-gold/50"
                  : "border-border-card/70 hover:border-border-card bg-[#050F2D]/90 hover:bg-[#071331] opacity-90 hover:opacity-100"
              }`}
            >
              {/* Selected Badge Ribbon */}
              {isSelected && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-regent-gold text-black font-pixel text-[10px] font-bold uppercase tracking-wider border border-white shadow-sm flex items-center gap-1 z-10">
                  <Check className="w-3 h-3 stroke-[3]" /> CHOSEN COMPANION
                </div>
              )}

              {/* Card Main Body */}
              <div>
                {/* Companion Portrait Stage */}
                <div className="relative h-40 sm:h-44 flex items-center justify-center mb-3.5 bg-[#02091F] border border-border-card/60 overflow-hidden">
                  {/* Subtle magical aura glow */}
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none transition-opacity duration-300"
                    style={{
                      background: `radial-gradient(circle at center, ${companion.themeColor}, transparent 70%)`,
                    }}
                  />

                  {/* Corner Rivets */}
                  <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-regent-gold/60" />
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-regent-gold/60" />
                  <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-regent-gold/60" />
                  <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-regent-gold/60" />

                  {/* High Quality Companion Portrait */}
                  <PixelCompanion
                    companionId={companion.id}
                    emotion={currentEmotion}
                    variant="portrait"
                    size="xl"
                    animate={true}
                    showGlow={isSelected}
                  />

                  {/* Interactive reaction badge */}
                  <div className="absolute bottom-1.5 right-1.5 text-[8px] font-pixel text-text-muted bg-[#02091F]/90 px-1.5 py-0.5 border border-border-card/40">
                    TAP TO REACT
                  </div>
                </div>

                {/* Name & Archetype Title */}
                <div className="text-center mb-2.5">
                  <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white tracking-wide">
                    {companion.name}
                  </h2>
                  <div
                    className="inline-block font-pixel text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mt-0.5 px-2 py-0.5 border"
                    style={{
                      color: companion.themeColor,
                      borderColor: `${companion.themeColor}55`,
                      backgroundColor: `${companion.themeColor}15`,
                    }}
                  >
                    {companion.title}
                  </div>
                </div>

                {/* Personality Line (Motto) */}
                <div className="p-2 bg-[#02091F] border border-border-card/60 mb-3 text-center">
                  <p className="font-body text-xs text-[#E2E8F0] italic">
                    {companion.motto}
                  </p>
                </div>

                {/* Key Personality Traits */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3">
                  {companion.keyTraits.map((trait) => (
                    <span
                      key={trait}
                      className="px-2 py-0.5 bg-[#030B24] border border-border-card/70 text-text-secondary font-pixel text-[9px] uppercase tracking-wider"
                    >
                      ✦ {trait}
                    </span>
                  ))}
                </div>

                {/* Role Description */}
                <p className="text-[11px] text-text-muted leading-relaxed text-center mb-4">
                  {companion.role}
                </p>
              </div>

              {/* Card Action Selection Button */}
              <div className="pt-2 border-t border-border-card/40">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCompanionSelect(companion.id);
                  }}
                  className={`w-full py-2 px-3 font-pixel text-xs font-bold uppercase tracking-wider transition-all border-2 flex items-center justify-center gap-1.5 ${
                    isSelected
                      ? "bg-regent-gold text-black border-yellow-300 shadow-[0_3px_0_#997507]"
                      : "bg-[#02091F] text-text-secondary border-border-card hover:text-white hover:border-regent-blue hover:bg-[#071331]"
                  }`}
                >
                  {isSelected ? (
                    <>
                      <Check className="w-4 h-4" /> CHOSEN
                    </>
                  ) : (
                    <>CHOOSE {companion.name}</>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ============================================================ */}
      {/* 3. LARGE DYNAMIC ALLIANCE PREVIEW (THE BOND)                 */}
      {/* ============================================================ */}
      <motion.div
        key={selectedCompanion.id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-b from-[#071331] via-[#05112B] to-[#030A1F] border-2 border-regent-gold p-5 sm:p-6 shadow-retro-card mb-6"
      >
        <div className="flex flex-col md:flex-row items-center md:items-start gap-5 sm:gap-6">
          {/* Dual Character Portraits Stage: Explorer + Companion Standing Together */}
          <div className="flex items-end justify-center gap-3 sm:gap-4 shrink-0">
            {/* Explorer Portrait */}
            <div className="flex flex-col items-center">
              <div className="relative w-18 h-18 sm:w-22 sm:h-22 bg-[#02091F] border-2 border-regent-blue p-1 shadow-[0_0_12px_rgba(32,169,246,0.3)] flex items-center justify-center">
                <PixelAvatar
                  explorerId={explorerId}
                  variant="portrait"
                  size="full"
                  animate={false}
                />
              </div>
              <span className="font-pixel text-[9px] sm:text-[10px] text-white font-bold uppercase mt-1 px-1.5 py-0.2 bg-regent-maroon border border-red-950 max-w-[90px] truncate text-center">
                {playerName || "EXPLORER"}
              </span>
            </div>

            {/* Plus / Alliance Connector */}
            <div className="font-pixel text-xs text-regent-gold font-bold mb-4 sm:mb-5">
              +
            </div>

            {/* Selected Companion Portrait */}
            <div className="flex flex-col items-center">
              <div
                className="relative w-18 h-18 sm:w-22 sm:h-22 bg-[#02091F] border-2 p-1 shadow-md flex items-center justify-center"
                style={{ borderColor: selectedCompanion.themeColor }}
              >
                <PixelCompanion
                  companionId={selectedCompanion.id}
                  emotion="happy"
                  variant="portrait"
                  size="full"
                  animate={true}
                  showGlow={true}
                />
              </div>
              <span
                className="font-pixel text-[9px] sm:text-[10px] font-bold uppercase mt-1 px-1.5 py-0.2 bg-[#02091F] border text-center"
                style={{
                  color: selectedCompanion.themeColor,
                  borderColor: selectedCompanion.themeColor,
                }}
              >
                {selectedCompanion.name}
              </span>
            </div>
          </div>

          {/* Alliance Details & Dynamic Dialogue */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1.5">
              <h3 className="font-pixel text-base sm:text-lg font-bold text-white uppercase tracking-wide">
                {(playerName || "EXPLORER").toUpperCase()} + {selectedCompanion.name}
              </h3>
              <span className="px-2 py-0.5 bg-regent-maroon text-regent-gold font-pixel text-[9px] sm:text-[10px] font-bold border border-red-950 uppercase tracking-wider">
                ALLIANCE: LEVEL 1
              </span>
              <span className="px-2 py-0.5 bg-[#02091F] text-text-secondary font-pixel text-[9px] border border-border-card">
                TRUST: NEW COMPANION
              </span>
            </div>

            {/* Dynamic Companion Speech Bubble */}
            <div className="relative bg-[#02091F] border border-regent-gold/60 p-3 sm:p-3.5 mb-3 text-left">
              <div className="flex items-center gap-1.5 text-regent-gold font-pixel text-[10px] uppercase font-bold mb-1">
                <MessageSquare className="w-3 h-3" />
                <span>{selectedCompanion.name} SAYS:</span>
              </div>
              <p className="font-body text-xs sm:text-sm text-white italic leading-relaxed">
                {personalizedGreeting}
              </p>
            </div>

            {/* Journey Role Summary */}
            <p className="text-xs text-text-secondary leading-relaxed">
              <strong className="text-white">{selectedCompanion.name}</strong> ({selectedCompanion.title}) will guide your decisions, introduce lessons, and highlight opportunities across the Seven Realms.
            </p>
          </div>
        </div>

        {/* Action CTA Button */}
        <div className="mt-5 pt-4 border-t border-border-card/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-text-muted font-body text-center sm:text-left">
            Ready to travel with <strong className="text-white">{selectedCompanion.name}</strong> into Seethawaka?
          </div>

          <div className="w-full sm:w-auto shrink-0">
            <RetroButton
              variant="yellow"
              size="lg"
              onClick={handleConfirm}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              fullWidth
              className="shadow-retro-gold text-xs sm:text-sm py-3 px-6"
            >
              CONTINUE JOURNEY →
            </RetroButton>
          </div>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* 4. CELEBRATION MODAL: COMPANION ALLIANCE FORGED (+25 XP)     */}
      {/* ============================================================ */}
      <AnimatePresence>
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-md bg-gradient-to-b from-[#071331] via-[#05112B] to-[#040D24] border-2 border-regent-gold p-6 text-center shadow-retro-card-lg"
            >
              {/* Companion Mascot Preview */}
              <div className="w-24 h-24 mx-auto mb-3 relative flex items-center justify-center bg-[#02091F] border-2 border-regent-gold p-1 shadow-[0_0_20px_#FFC719]">
                <PixelCompanion
                  companionId={selectedCompanion.id}
                  emotion="celebrate"
                  variant="portrait"
                  size="full"
                  animate={true}
                />
              </div>

              <span className="px-2.5 py-0.5 bg-regent-maroon text-regent-gold font-pixel text-[10px] border border-red-950 font-bold uppercase tracking-widest">
                ALLIANCE FORGED
              </span>

              <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white tracking-wide mt-2 mb-1 uppercase">
                {selectedCompanion.name} JOINS YOUR JOURNEY!
              </h2>

              <p className="font-pixel text-xs text-regent-blue uppercase tracking-wider mb-2">
                {selectedCompanion.title}
              </p>

              <p className="font-body text-xs text-[#B8C0D2] mb-4 max-w-xs mx-auto leading-relaxed">
                <strong className="text-white">{selectedCompanion.name}</strong> will travel beside{" "}
                <strong className="text-white">{playerName || "Explorer"}</strong> as you explore the Seven Realms.
              </p>

              {/* XP Reward Banner */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#02091F] border-2 border-regent-gold text-regent-gold font-pixel text-xs sm:text-sm font-bold mb-5 shadow-sm">
                <Award className="w-4 h-4 text-regent-gold" />
                <span>+25 REGENT XP AWARDED</span>
              </div>

              <RetroButton
                variant="yellow"
                size="md"
                fullWidth
                onClick={handleProceed}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
                className="shadow-retro-gold"
              >
                DISCOVER YOUR INTERESTS →
              </RetroButton>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
