"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Shuffle,
  Check,
  Award,
  ArrowRight,
  User,
  Star,
  Compass,
} from "lucide-react";
import PixelAvatar from "@/components/avatar/PixelAvatar";
import RetroButton from "@/components/ui/RetroButton";
import {
  EXPLORER_LIST,
  EXPLORERS,
  getRandomExplorerId,
} from "@/data/explorersData";
import { ExplorerId, AvatarConfig } from "@/types/player";
import { DEFAULT_AVATAR } from "@/data/avatarOptions";

interface Step1ExplorerProps {
  initialName?: string;
  initialExplorerId?: ExplorerId;
  initialAvatar?: AvatarConfig;
  onConfirm: (name: string, avatar: AvatarConfig, explorerId: ExplorerId) => void;
}

export default function Step1Explorer({
  initialName = "Traveller",
  initialExplorerId = "pathfinder",
  initialAvatar = DEFAULT_AVATAR,
  onConfirm,
}: Step1ExplorerProps) {
  const [name, setName] = useState<string>(
    initialName === "Traveller" ? "" : initialName
  );
  const [selectedId, setSelectedId] = useState<ExplorerId>(
    initialExplorerId || "pathfinder"
  );
  const [nameError, setNameError] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);

  const selectedExplorer = EXPLORERS[selectedId] || EXPLORERS.pathfinder;

  // Handle Randomization of Explorer Preset
  const handleRandomize = () => {
    let nextId = getRandomExplorerId();
    while (nextId === selectedId && EXPLORER_LIST.length > 1) {
      nextId = getRandomExplorerId();
    }
    setSelectedId(nextId);
  };

  // Handle Name Changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (val.trim().length > 0) {
      setNameError(null);
    }
  };

  // Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = name.trim() || "Traveller";
    if (finalName.length < 2) {
      setNameError("Please enter a name with at least 2 characters.");
      return;
    }
    setShowCelebration(true);
  };

  // Proceed to Step 2
  const handleProceedToCompanion = () => {
    setShowCelebration(false);
    const finalName = name.trim() || "Traveller";
    onConfirm(finalName, initialAvatar, selectedId);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Step Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-regent-maroon text-regent-gold font-pixel text-xs border border-red-950 uppercase tracking-widest mb-2 shadow-md">
          <Sparkles className="w-3.5 h-3.5" /> PROLOGUE • STEP 1
        </div>
        <h1 className="font-pixel text-2xl sm:text-4xl font-bold text-white tracking-wide uppercase">
          CHOOSE YOUR EXPLORER
        </h1>
        <p className="font-body text-xs sm:text-sm text-[#B8C0D2] mt-1 max-w-lg mx-auto">
          Every journey begins with a face and a name. Select the adventurer who represents you across the Seven Realms.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* ============================================================ */}
        {/* LEFT COLUMN: YOUR EXPLORER STAGE & LORE (5 cols)             */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full bg-[#071331] border-2 border-border-card p-5 shadow-retro-card text-center relative overflow-hidden">
            {/* Top Stage Header */}
            <div className="flex items-center justify-between pb-3 border-b border-border-card mb-4">
              <span className="font-pixel text-xs text-regent-gold uppercase tracking-wider flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" /> YOUR EXPLORER
              </span>
              <button
                type="button"
                onClick={handleRandomize}
                className="px-2.5 py-1 bg-[#02091F] hover:bg-[#0A1A40] text-regent-gold hover:text-white border border-border-card font-pixel text-[10px] uppercase flex items-center gap-1 transition-colors"
                title="Randomize explorer selection"
              >
                <Shuffle className="w-3 h-3" /> RANDOMIZE
              </button>
            </div>

            {/* Large Character Portrait Stage */}
            <div className="relative w-52 h-52 sm:w-60 sm:h-60 mx-auto mb-4 bg-[#02091F] border-2 border-regent-gold p-1 shadow-[0_0_24px_rgba(255,199,25,0.25)] flex items-center justify-center">
              {/* Radial Magic Glow */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${selectedExplorer.accentColor}, transparent 70%)`,
                }}
              />

              {/* Ornate Corner Rivets */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-regent-gold" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-regent-gold" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-regent-gold" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-regent-gold" />

              {/* Authentic High-Resolution RPG Portrait */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedId}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full"
                >
                  <PixelAvatar
                    explorerId={selectedId}
                    variant="portrait"
                    size="full"
                    animate={false}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Preferred Name Ribbon */}
            <div className="mb-3">
              <div className="inline-block px-3 py-1 bg-regent-maroon text-white font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider border border-red-950 shadow-sm max-w-[240px] truncate">
                {name.trim() ? name.toUpperCase() : "TRAVELLER"}
              </div>
            </div>

            {/* Selected Explorer Archetype & Lore */}
            <div className="bg-[#050F2D] border border-border-card p-3 text-left">
              <div className="flex items-center justify-between mb-1">
                <span
                  className="font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider"
                  style={{ color: selectedExplorer.accentColor }}
                >
                  {selectedExplorer.title}
                </span>
                <span className="text-[9px] font-pixel text-text-muted">
                  ARCHETYPE
                </span>
              </div>
              <p className="font-body text-xs text-[#E2E8F0] italic mb-2">
                {selectedExplorer.quote}
              </p>
              <p className="text-[11px] text-text-muted leading-tight">
                {selectedExplorer.description}
              </p>

              {/* Traits */}
              <div className="flex flex-wrap gap-1.5 mt-2.5 pt-2 border-t border-border-card/50">
                {selectedExplorer.traits.map((trait) => (
                  <span
                    key={trait}
                    className="px-2 py-0.5 bg-[#02091F] border border-border-card/60 text-[9px] font-pixel text-text-secondary"
                  >
                    ★ {trait}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: NAME INPUT & EXPLORER GRID (7 cols)            */}
        {/* ============================================================ */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Preferred Name Section */}
            <div className="bg-[#071331] border-2 border-border-card p-5 shadow-retro-card">
              <label
                htmlFor="explorer-name"
                className="block font-pixel text-xs sm:text-sm font-bold text-regent-gold uppercase tracking-wide mb-1"
              >
                PREFERRED NAME <span className="text-red-400">*</span>
              </label>
              <p className="text-xs text-text-secondary mb-3">
                How fellow Regents and companions will address you throughout your journey.
              </p>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-text-muted">
                  <User className="w-4 h-4 text-regent-gold/70" />
                </div>
                <input
                  id="explorer-name"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Enter your name (e.g., Lehan, Kasun, Ama)"
                  maxLength={20}
                  className="w-full pl-9 pr-3 py-2.5 bg-[#02091F] border-2 border-border-card focus:border-regent-gold focus:outline-none text-white font-body text-sm placeholder:text-text-muted transition-colors shadow-inner"
                />
              </div>
              {nameError && (
                <p className="text-xs text-red-400 font-pixel mt-1.5">
                  {nameError}
                </p>
              )}
            </div>

            {/* Explorer Preset Selection Grid */}
            <div className="bg-[#071331] border-2 border-border-card p-5 shadow-retro-card">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-pixel text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                    CHOOSE YOUR EXPLORER
                  </h2>
                  <p className="text-xs text-text-secondary">
                    Select an original Regent adventurer archetype that speaks to you.
                  </p>
                </div>
                <span className="text-[10px] font-pixel text-regent-gold bg-[#02091F] px-2 py-1 border border-border-card">
                  {EXPLORER_LIST.length} PRESETS
                </span>
              </div>

              {/* 4x2 Desktop / 2-column Mobile Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {EXPLORER_LIST.map((exp) => {
                  const isSelected = selectedId === exp.id;

                  return (
                    <motion.button
                      type="button"
                      key={exp.id}
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setSelectedId(exp.id)}
                      className={`relative bg-[#050F2D] border-2 text-left p-2 transition-all flex flex-col items-center group cursor-pointer ${
                        isSelected
                          ? "border-regent-gold bg-[#081840] shadow-[0_0_12px_rgba(255,199,25,0.3)]"
                          : "border-border-card/70 hover:border-border-card hover:bg-[#071331]"
                      }`}
                    >
                      {/* Active Checkmark Badge */}
                      {isSelected && (
                        <div className="absolute top-1 right-1 w-4 h-4 bg-regent-gold text-black flex items-center justify-center z-10 shadow-sm">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                      )}

                      {/* Thumbnail Portrait */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#02091F] border border-border-card/80 mb-2 overflow-hidden flex items-center justify-center">
                        <Image
                          src={exp.portraitUrl}
                          alt={exp.title}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover select-none pointer-events-none group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Archetype Title */}
                      <span
                        className="font-pixel text-[10px] sm:text-[11px] font-bold text-center uppercase tracking-wide truncate w-full"
                        style={{
                          color: isSelected ? exp.accentColor : "#FFFFFF",
                        }}
                      >
                        {exp.archetype}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Main Action Button */}
            <div className="pt-1">
              <RetroButton
                variant="yellow"
                size="lg"
                type="submit"
                fullWidth
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="shadow-retro-gold text-sm sm:text-base py-3.5"
              >
                THIS IS ME →
              </RetroButton>
            </div>
          </form>
        </div>
      </div>

      {/* ============================================================ */}
      {/* CELEBRATION MODAL: EXPLORER CONFIRMED                         */}
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
              {/* Confirmed Explorer Portrait */}
              <div className="relative w-28 h-28 mx-auto mb-3 bg-[#02091F] border-2 border-regent-gold p-1 shadow-[0_0_20px_#FFC719] flex items-center justify-center">
                <PixelAvatar
                  explorerId={selectedId}
                  variant="portrait"
                  size="full"
                  animate={false}
                />
              </div>

              {/* Badges & XP Awarded */}
              <div className="inline-flex items-center gap-1 px-3 py-0.5 bg-regent-maroon text-regent-gold font-pixel text-xs border border-red-950 font-bold uppercase tracking-wider mb-2">
                <Award className="w-3.5 h-3.5" /> +25 XP EARNED
              </div>

              <h2 className="font-pixel text-2xl font-bold text-white tracking-wide uppercase mb-1">
                WELCOME, {name.trim() ? name.toUpperCase() : "TRAVELLER"}!
              </h2>

              <p className="font-pixel text-xs text-regent-blue uppercase tracking-wider mb-2">
                {selectedExplorer.title}
              </p>

              <p className="font-body text-xs text-[#B8C0D2] mb-6 max-w-xs mx-auto">
                Your explorer profile is established. Now, choose the companion who will accompany you across Seethawaka.
              </p>

              <RetroButton
                variant="yellow"
                size="lg"
                fullWidth
                onClick={handleProceedToCompanion}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="shadow-retro-gold"
              >
                CHOOSE YOUR COMPANION →
              </RetroButton>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
