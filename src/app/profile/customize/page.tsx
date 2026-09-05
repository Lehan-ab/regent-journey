"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Sparkles,
  Shield,
  Award,
  Lock,
  Check,
  Crown,
  Palette,
  Layers,
  Shirt,
  BookOpen,
  Compass,
  Zap,
  Info,
  CheckCircle2,
} from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import PixelAvatar from "@/components/avatar/PixelAvatar";
import { usePlayer } from "@/context/PlayerContext";
import { EXPLORERS } from "@/data/explorersData";
import {
  COSMETIC_ITEMS,
  PROJECT_PATCHES,
  APPROVED_HAIR_COLORS,
  ARCHETYPE_HAIRSTYLES,
  DEFAULT_EXPLORER_CUSTOMIZATION,
} from "@/data/customizationsData";
import { CosmeticCategory, ExplorerCustomizationState } from "@/types/player";

type TabType = "outfits" | "hair" | "accessories" | "patches" | "progression";

export default function CustomizeExplorerPage() {
  const { player, updateExplorerCustomization, unlockCosmetic, isChapterCompleted, isLessonCompleted } = usePlayer();
  const currentExplorer = EXPLORERS[player.explorerId] || EXPLORERS.pathfinder;

  // Local active customization state initialized from player state
  const [customization, setCustomization] = useState<ExplorerCustomizationState>({
    ...DEFAULT_EXPLORER_CUSTOMIZATION,
    ...(player.explorerCustomization || {}),
  });

  const [activeTab, setActiveTab] = useState<TabType>("outfits");
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const availableHairstyles =
    ARCHETYPE_HAIRSTYLES[player.explorerId] || ARCHETYPE_HAIRSTYLES.pathfinder;

  // Check if a cosmetic item is unlocked
  const isCosmeticUnlocked = (itemId: string, requirementType?: string) => {
    if (requirementType === "starter") return true;
    return player.unlockedCosmetics?.includes(itemId);
  };

  // Check if a project patch is unlocked
  const isPatchUnlocked = (patchId: string) => {
    return player.projectPatches?.includes(patchId);
  };

  // Handler for equipping an item
  const handleEquip = (category: keyof ExplorerCustomizationState, value: string) => {
    if (category === "patches") {
      setCustomization((prev) => {
        const currentPatches = prev.patches || [];
        const exists = currentPatches.includes(value);
        return {
          ...prev,
          patches: exists
            ? currentPatches.filter((p) => p !== value)
            : [...currentPatches, value],
        };
      });
    } else {
      setCustomization((prev) => ({
        ...prev,
        [category]: value,
      }));
    }
  };

  // Save changes
  const handleSave = () => {
    updateExplorerCustomization(customization);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  // Reset to archetype defaults
  const handleReset = () => {
    setCustomization(DEFAULT_EXPLORER_CUSTOMIZATION);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-16">
      {/* Top Breadcrumb Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border-card mb-6">
        <Link
          href="/profile"
          className="flex items-center gap-2 font-pixel text-xs text-regent-blue hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO PROFILE</span>
        </Link>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-regent-maroon text-regent-gold font-pixel text-[10px] sm:text-xs border border-red-950 uppercase font-bold">
            <Sparkles className="w-3 h-3" /> CUSTOMIZATION STUDIO
          </span>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ============================================================ */}
        {/* LEFT COLUMN: LIVE EXPLORER PREVIEW STAGE (5 cols)            */}
        {/* ============================================================ */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <RetroCard className="w-full p-5 sm:p-6 bg-gradient-to-b from-[#071331] via-[#05112B] to-[#040D24] border-2 border-regent-gold shadow-retro-card text-center relative overflow-hidden">
            {/* Top Badge */}
            <div className="flex items-center justify-between pb-3 border-b border-border-card mb-4">
              <span
                className="font-pixel text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                style={{ color: currentExplorer.accentColor }}
              >
                <Compass className="w-3.5 h-3.5" /> {currentExplorer.title}
              </span>
              <span className="text-[10px] font-pixel text-regent-gold bg-[#02091F] px-2 py-0.5 border border-border-card">
                LVL {player.level} {player.rank.toUpperCase()}
              </span>
            </div>

            {/* Character Stage */}
            <div className="relative w-52 h-52 sm:w-64 sm:h-64 mx-auto mb-4 bg-[#02091F] border-2 border-regent-gold p-1 shadow-[0_0_24px_rgba(255,199,25,0.25)] flex items-center justify-center">
              {/* Radial Magic Glow */}
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${currentExplorer.accentColor}, transparent 70%)`,
                }}
              />

              {/* Corner Rivets */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-regent-gold" />
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-regent-gold" />
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-regent-gold" />
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-regent-gold" />

              <PixelAvatar
                explorerId={player.explorerId}
                variant="portrait"
                size="full"
                animate={false}
              />

              {/* Mantle / Cloak Prestige Overlay Indicator */}
              {customization.cloak === "regent_mantle" && (
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-gradient-to-r from-amber-600 to-yellow-500 text-black font-pixel text-[9px] font-bold border border-yellow-300 shadow-md flex items-center gap-1">
                  <Crown className="w-2.5 h-2.5" /> REGENT MANTLE
                </div>
              )}
            </div>

            {/* Explorer Preferred Name */}
            <div className="mb-4">
              <div className="inline-block px-3 py-1 bg-regent-maroon text-white font-pixel text-sm font-bold uppercase tracking-wider border border-red-950 shadow-sm max-w-[260px] truncate">
                {(player.name || "TRAVELLER").toUpperCase()}
              </div>
            </div>

            {/* Currently Equipped Gear Summary */}
            <div className="bg-[#02091F] border border-border-card p-3 text-left mb-4 space-y-1.5">
              <div className="text-[10px] font-pixel text-regent-gold uppercase font-bold tracking-wider mb-1 flex items-center justify-between">
                <span>EQUIPPED LOADOUT</span>
                <span className="text-text-muted">CONTROLLED ART</span>
              </div>

              <div className="flex items-center justify-between text-xs font-body">
                <span className="text-text-muted text-[11px]">Outfit:</span>
                <span className="text-white font-pixel text-[10px]">
                  {customization.outfit === "field_jacket"
                    ? "Regent Field Jacket"
                    : "Base Explorer Garb"}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-body">
                <span className="text-text-muted text-[11px]">Cloak:</span>
                <span className="text-white font-pixel text-[10px]">
                  {customization.cloak === "regent_mantle"
                    ? "✨ The Regent Mantle"
                    : customization.cloak === "pathfinder_cloak"
                    ? "Pathfinder Cloak"
                    : "None"}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-body">
                <span className="text-text-muted text-[11px]">Accessory:</span>
                <span className="text-white font-pixel text-[10px]">
                  {customization.accessory === "scholar_pin"
                    ? "Scholar Gold Pin"
                    : customization.accessory === "root_seeker_accessory"
                    ? "Root Seeker Talisman"
                    : customization.accessory === "explorer_satchel"
                    ? "Leather Satchel"
                    : customization.accessory === "notebook_accessory"
                    ? "Historian Notebook"
                    : customization.accessory === "lantern_accessory"
                    ? "Wayfarer Lantern"
                    : "None"}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-body">
                <span className="text-text-muted text-[11px]">Hair Styling:</span>
                <span className="text-white font-pixel text-[10px]">
                  {availableHairstyles.find((h) => h.id === customization.hairVariant)?.name ||
                    "Signature Look"}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-body">
                <span className="text-text-muted text-[11px]">Project Patches:</span>
                <span className="text-regent-blue font-pixel text-[10px]">
                  {customization.patches?.length || 0} Equipped
                </span>
              </div>
            </div>

            {/* Save & Reset Actions */}
            <div className="flex items-center gap-2">
              <RetroButton
                variant="yellow"
                size="md"
                fullWidth
                onClick={handleSave}
                icon={<Check className="w-4 h-4" />}
                className="shadow-retro-gold text-xs font-pixel"
              >
                APPLY COSMETICS
              </RetroButton>

              <button
                type="button"
                onClick={handleReset}
                className="px-3 py-2 bg-[#02091F] border border-border-card text-text-muted hover:text-white font-pixel text-xs transition-colors"
                title="Reset to default"
              >
                RESET
              </button>
            </div>

            {/* Save Confirmation Alert */}
            <AnimatePresence>
              {saveSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-3 p-2 bg-emerald-950/90 border border-emerald-500 text-emerald-300 font-pixel text-xs flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> LOADOUT SAVED SUCCESSFULLY
                </motion.div>
              )}
            </AnimatePresence>
          </RetroCard>
        </div>

        {/* ============================================================ */}
        {/* RIGHT COLUMN: CATEGORY TABS & COSMETIC SLOTS (7 cols)        */}
        {/* ============================================================ */}
        <div className="lg:col-span-7 space-y-5">
          {/* Navigation Category Tabs */}
          <div className="bg-[#071331] border-2 border-border-card p-1.5 flex flex-wrap gap-1 shadow-retro-card">
            {[
              { id: "outfits", label: "OUTFITS & CLOAKS", icon: Shirt },
              { id: "hair", label: "HAIR & COLOR", icon: Palette },
              { id: "accessories", label: "ACCESSORIES", icon: Compass },
              { id: "patches", label: "PROJECT PATCHES", icon: Award },
              { id: "progression", label: "PROGRESSION TIERS", icon: Crown },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`flex-1 min-w-[120px] py-2 px-2.5 font-pixel text-[10px] sm:text-xs flex items-center justify-center gap-1.5 transition-all ${
                    isActive
                      ? "bg-regent-maroon text-regent-gold border border-red-950 font-bold shadow-sm"
                      : "bg-[#02091F] text-text-secondary hover:text-white border border-border-card/60 hover:bg-[#081538]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: OUTFITS & CLOAKS */}
          {activeTab === "outfits" && (
            <div className="space-y-4">
              {/* Outfits Sub-section */}
              <div className="bg-[#071331] border-2 border-border-card p-4 sm:p-5 shadow-retro-card">
                <h3 className="font-pixel text-xs sm:text-sm font-bold text-white uppercase mb-1 flex items-center gap-2">
                  <Shirt className="w-4 h-4 text-regent-gold" /> EXPLORER OUTFITS
                </h3>
                <p className="text-xs text-text-muted mb-4 font-body">
                  Select your core Regent adventurer ensemble.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {COSMETIC_ITEMS.filter((item) => item.category === "outfit").map((item) => {
                    const isUnlocked = isCosmeticUnlocked(item.id, item.unlockRequirement.type);
                    const isEquipped = customization.outfit === item.id;

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (isUnlocked) handleEquip("outfit", item.id);
                        }}
                        className={`p-3 border-2 transition-all cursor-pointer ${
                          isEquipped
                            ? "bg-[#0A1F4D] border-regent-gold shadow-[0_0_10px_rgba(255,199,25,0.25)]"
                            : isUnlocked
                            ? "bg-[#02091F] border-border-card hover:border-border-cardHighlight hover:bg-[#071638]"
                            : "bg-[#02091F]/60 border-border-card/40 opacity-70 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-pixel text-xs font-bold text-white">
                            {item.name}
                          </span>
                          {isEquipped ? (
                            <span className="px-1.5 py-0.5 bg-regent-gold text-black font-pixel text-[9px] font-bold">
                              EQUIPPED
                            </span>
                          ) : isUnlocked ? (
                            <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 font-pixel text-[9px]">
                              UNLOCKED
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 bg-red-950 text-red-300 border border-red-800 font-pixel text-[9px] flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" /> LOCKED
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-text-secondary font-body mb-2">
                          {item.description}
                        </p>

                        <div className="text-[10px] font-pixel text-regent-gold/90 border-t border-border-card/50 pt-1.5">
                          {item.unlockRequirement.description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cloaks & Mantles Sub-section */}
              <div className="bg-[#071331] border-2 border-border-card p-4 sm:p-5 shadow-retro-card">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-pixel text-xs sm:text-sm font-bold text-white uppercase flex items-center gap-2">
                    <Shield className="w-4 h-4 text-regent-blue" /> CLOAKS & CEREMONIAL MANTLES
                  </h3>
                  <span className="px-2 py-0.5 bg-regent-maroon text-regent-gold font-pixel text-[9px] border border-red-950">
                    PRESTIGE COSMETICS
                  </span>
                </div>
                <p className="text-xs text-text-muted mb-4 font-body">
                  Outer cosmetic layers unlocked through realm mastery and club membership.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* None Option */}
                  <div
                    onClick={() => handleEquip("cloak", "none")}
                    className={`p-3 border-2 transition-all cursor-pointer ${
                      customization.cloak === "none"
                        ? "bg-[#0A1F4D] border-regent-gold"
                        : "bg-[#02091F] border-border-card hover:bg-[#071638]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-pixel text-xs font-bold text-white">No Cloak</span>
                      {customization.cloak === "none" && (
                        <span className="px-1.5 py-0.5 bg-regent-gold text-black font-pixel text-[9px] font-bold">
                          EQUIPPED
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-text-muted font-body">
                      Standard adventurer profile without heavy outerwear.
                    </p>
                  </div>

                  {COSMETIC_ITEMS.filter((item) => item.category === "cloak").map((item) => {
                    const isUnlocked = isCosmeticUnlocked(item.id, item.unlockRequirement.type);
                    const isEquipped = customization.cloak === item.id;
                    const isLegendary = item.rarity === "LEGENDARY";

                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          if (isUnlocked) handleEquip("cloak", item.id);
                        }}
                        className={`p-3 border-2 transition-all cursor-pointer relative ${
                          isLegendary
                            ? "border-amber-500/80 bg-gradient-to-br from-[#120F29] to-[#080718]"
                            : ""
                        } ${
                          isEquipped
                            ? "bg-[#0A1F4D] border-regent-gold shadow-[0_0_12px_rgba(255,199,25,0.3)]"
                            : isUnlocked
                            ? "bg-[#02091F] border-border-card hover:border-border-cardHighlight hover:bg-[#071638]"
                            : "bg-[#02091F]/60 border-border-card/40 opacity-75 cursor-not-allowed"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span
                            className={`font-pixel text-xs font-bold ${
                              isLegendary ? "text-regent-gold" : "text-white"
                            }`}
                          >
                            {item.name}
                          </span>
                          {isEquipped ? (
                            <span className="px-1.5 py-0.5 bg-regent-gold text-black font-pixel text-[9px] font-bold">
                              EQUIPPED
                            </span>
                          ) : isUnlocked ? (
                            <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 font-pixel text-[9px]">
                              UNLOCKED
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 bg-red-950 text-red-300 border border-red-800 font-pixel text-[9px] flex items-center gap-1">
                              <Lock className="w-2.5 h-2.5" /> LOCKED
                            </span>
                          )}
                        </div>

                        <p className="text-[11px] text-text-secondary font-body mb-2">
                          {item.description}
                        </p>

                        <div className="text-[10px] font-pixel text-amber-300/90 border-t border-border-card/50 pt-1.5 flex items-center gap-1">
                          {isLegendary && <Crown className="w-3 h-3 text-regent-gold" />}
                          {item.unlockRequirement.description}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: HAIR & COLOR PALETTE */}
          {activeTab === "hair" && (
            <div className="bg-[#071331] border-2 border-border-card p-4 sm:p-5 shadow-retro-card space-y-6">
              <div>
                <h3 className="font-pixel text-xs sm:text-sm font-bold text-white uppercase mb-1 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-regent-gold" /> ARCHETYPE HAIRSTYLE VARIANTS
                </h3>
                <p className="text-xs text-text-muted mb-3 font-body">
                  Art-directed hairstyles crafted specifically for the {currentExplorer.title} archetype.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {availableHairstyles.map((style) => {
                    const isSelected = customization.hairVariant === style.id;
                    return (
                      <div
                        key={style.id}
                        onClick={() => handleEquip("hairVariant", style.id)}
                        className={`p-3 border-2 text-left cursor-pointer transition-all ${
                          isSelected
                            ? "bg-[#0A1F4D] border-regent-gold shadow-[0_0_10px_rgba(255,199,25,0.25)]"
                            : "bg-[#02091F] border-border-card hover:border-border-cardHighlight hover:bg-[#071638]"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-pixel text-xs font-bold text-white">
                            {style.name}
                          </span>
                          {isSelected && <Check className="w-3 h-3 text-regent-gold" />}
                        </div>
                        <p className="text-[11px] text-text-muted font-body">
                          {style.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Hair Color Palette */}
              <div className="pt-4 border-t border-border-card">
                <h4 className="font-pixel text-xs font-bold text-white uppercase mb-1">
                  APPROVED COLOR PALETTE
                </h4>
                <p className="text-xs text-text-muted mb-3 font-body">
                  Harmonious natural and club tone swatches matching the game aesthetics.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {APPROVED_HAIR_COLORS.map((color) => {
                    const isSelected = customization.hairColor === color.id;
                    return (
                      <div
                        key={color.id}
                        onClick={() => handleEquip("hairColor", color.id)}
                        className={`p-2.5 border-2 flex items-center gap-3 cursor-pointer transition-all ${
                          isSelected
                            ? "bg-[#0A1F4D] border-regent-gold"
                            : "bg-[#02091F] border-border-card hover:bg-[#071638]"
                        }`}
                      >
                        <div
                          className="w-6 h-6 border-2 shrink-0 shadow-sm"
                          style={{
                            backgroundColor: color.hex,
                            borderColor: color.borderHex,
                          }}
                        />
                        <div className="min-w-0">
                          <div className="font-pixel text-[11px] font-bold text-white truncate">
                            {color.name}
                          </div>
                          <div className="text-[9px] font-pixel text-text-muted">
                            {color.id.replace("_", " ").toUpperCase()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ACCESSORIES */}
          {activeTab === "accessories" && (
            <div className="bg-[#071331] border-2 border-border-card p-4 sm:p-5 shadow-retro-card">
              <h3 className="font-pixel text-xs sm:text-sm font-bold text-white uppercase mb-1 flex items-center gap-2">
                <Compass className="w-4 h-4 text-regent-gold" /> EXPLORER ACCESSORIES & TOKENS
              </h3>
              <p className="text-xs text-text-muted mb-4 font-body">
                Equip tools, pins, and satchels earned through chapter milestones.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* None Option */}
                <div
                  onClick={() => handleEquip("accessory", "none")}
                  className={`p-3 border-2 transition-all cursor-pointer ${
                    customization.accessory === "none"
                      ? "bg-[#0A1F4D] border-regent-gold"
                      : "bg-[#02091F] border-border-card hover:bg-[#071638]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-pixel text-xs font-bold text-white">None</span>
                    {customization.accessory === "none" && (
                      <span className="px-1.5 py-0.5 bg-regent-gold text-black font-pixel text-[9px] font-bold">
                        EQUIPPED
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-text-muted font-body">
                    Travel without an accessory token equipped.
                  </p>
                </div>

                {COSMETIC_ITEMS.filter((item) => item.category === "accessory").map((item) => {
                  const isUnlocked = isCosmeticUnlocked(item.id, item.unlockRequirement.type);
                  const isEquipped = customization.accessory === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        if (isUnlocked) handleEquip("accessory", item.id);
                      }}
                      className={`p-3 border-2 transition-all cursor-pointer ${
                        isEquipped
                          ? "bg-[#0A1F4D] border-regent-gold shadow-[0_0_10px_rgba(255,199,25,0.25)]"
                          : isUnlocked
                          ? "bg-[#02091F] border-border-card hover:border-border-cardHighlight hover:bg-[#071638]"
                          : "bg-[#02091F]/60 border-border-card/40 opacity-75 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-pixel text-xs font-bold text-white">
                          {item.name}
                        </span>
                        {isEquipped ? (
                          <span className="px-1.5 py-0.5 bg-regent-gold text-black font-pixel text-[9px] font-bold">
                            EQUIPPED
                          </span>
                        ) : isUnlocked ? (
                          <span className="px-1.5 py-0.5 bg-emerald-950 text-emerald-300 border border-emerald-800 font-pixel text-[9px]">
                            UNLOCKED
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 bg-red-950 text-red-300 border border-red-800 font-pixel text-[9px] flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5" /> LOCKED
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-text-secondary font-body mb-2">
                        {item.description}
                      </p>

                      <div className="text-[10px] font-pixel text-sky-300/90 border-t border-border-card/50 pt-1.5">
                        {item.unlockRequirement.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECT PATCHES */}
          {activeTab === "patches" && (
            <div className="bg-[#071331] border-2 border-border-card p-4 sm:p-5 shadow-retro-card space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-pixel text-xs sm:text-sm font-bold text-white uppercase flex items-center gap-2">
                    <Award className="w-4 h-4 text-regent-gold" /> PROJECT & SERVICE PATCHES
                  </h3>
                  <p className="text-xs text-text-muted mt-0.5 font-body">
                    Badges earned through verified project participation across Seethawaka.
                  </p>
                </div>
                <span className="px-2 py-0.5 bg-[#02091F] border border-border-card text-regent-gold font-pixel text-[10px]">
                  {customization.patches?.length || 0} DISPLAYED
                </span>
              </div>

              <div className="p-3 bg-[#02091F] border border-border-card flex items-start gap-2.5 text-xs text-text-secondary">
                <Info className="w-4 h-4 text-regent-blue shrink-0 mt-0.5" />
                <p>
                  Patches are rendered on your Field Jacket, Satchel, and Profile Card. Complete
                  project missions in the <strong>Missions Hub</strong> to unlock official patches!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PROJECT_PATCHES.map((patch) => {
                  const isUnlocked = isPatchUnlocked(patch.id);
                  const isSelected = customization.patches?.includes(patch.id);

                  return (
                    <div
                      key={patch.id}
                      onClick={() => {
                        // Allow toggling for unlocked patches (or preview testing)
                        handleEquip("patches", patch.id);
                      }}
                      className={`p-3 border-2 transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#0A1F4D] border-regent-gold shadow-[0_0_10px_rgba(255,199,25,0.25)]"
                          : "bg-[#02091F] border-border-card hover:bg-[#071638]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: patch.accentColor }}
                          />
                          <span className="font-pixel text-xs font-bold text-white">
                            {patch.title}
                          </span>
                        </div>
                        {isSelected ? (
                          <span className="px-1.5 py-0.5 bg-regent-gold text-black font-pixel text-[9px] font-bold">
                            DISPLAYED
                          </span>
                        ) : (
                          <span className="px-1.5 py-0.5 bg-[#071331] text-text-muted font-pixel text-[9px] border border-border-card">
                            TAP TO EQUIP
                          </span>
                        )}
                      </div>

                      <div className="font-pixel text-[9px] text-regent-blue mb-1 uppercase">
                        {patch.avenue}
                      </div>

                      <p className="text-[11px] text-text-secondary font-body">
                        {patch.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 5: PROGRESSION MILESTONES ROADMAP */}
          {activeTab === "progression" && (
            <div className="bg-[#071331] border-2 border-border-card p-4 sm:p-5 shadow-retro-card space-y-4">
              <div>
                <h3 className="font-pixel text-xs sm:text-sm font-bold text-white uppercase flex items-center gap-2">
                  <Crown className="w-4 h-4 text-regent-gold" /> REGENT COSMETIC PROGRESSION
                </h3>
                <p className="text-xs text-text-muted mt-0.5 font-body">
                  Cosmetic rewards in Regent Journey are earned through milestone achievement and dedication.
                </p>
              </div>

              {/* Milestones Flow */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    tier: "STARTER",
                    title: "Base Explorer Garb",
                    reward: "Base Outfit + Leather Satchel",
                    condition: "Join Regent Journey (Prologue)",
                    status: "UNLOCKED",
                    color: "text-amber-300",
                    border: "border-amber-900/60",
                  },
                  {
                    tier: "CHAPTER 1",
                    title: "Rotary Roots Completion",
                    reward: "Root Seeker Talisman",
                    condition: "Complete the Rotary Roots world and historical quiz.",
                    status: isChapterCompleted("loc-rotary-roots") ? "UNLOCKED" : "IN PROGRESS",
                    color: "text-sky-300",
                    border: "border-sky-900/60",
                  },
                  {
                    tier: "KNOWLEDGE",
                    title: "Rota 101 Graduate",
                    reward: "Scholar Gold Pin",
                    condition: "Complete Rota 101 constitutional fundamentals.",
                    status: isChapterCompleted("loc-grand-archive") || isLessonCompleted("lesson-7-1") ? "UNLOCKED" : "LOCKED",
                    color: "text-yellow-300",
                    border: "border-yellow-900/60",
                  },
                  {
                    tier: "JOURNEY",
                    title: "Seven Realms Traverser",
                    reward: "Pathfinder Cloak",
                    condition: "Visit and complete tasks across all Seven Realms.",
                    status: isChapterCompleted("loc-seven-realms") ? "UNLOCKED" : "LOCKED",
                    color: "text-indigo-300",
                    border: "border-indigo-900/60",
                  },
                  {
                    tier: "ACTION",
                    title: "First Verified Project",
                    reward: "Impact Patch (Woven Emblem)",
                    condition: "Participate and verify 1 community or club project.",
                    status: "LOCKED",
                    color: "text-emerald-300",
                    border: "border-emerald-900/60",
                  },
                  {
                    tier: "VETERAN",
                    title: "2 Verified Projects",
                    reward: "Regent Field Jacket",
                    condition: "Lead or coordinate 2 verified projects.",
                    status: "LOCKED",
                    color: "text-orange-300",
                    border: "border-orange-900/60",
                  },
                  {
                    tier: "HIGHEST HONOR",
                    title: "Official Membership Approval",
                    reward: "THE REGENT MANTLE",
                    condition: "Pass formal board review and become an Official Member of RAC Seethawaka.",
                    status: player.membershipStatus === "OFFICIAL_MEMBER" ? "UNLOCKED" : "LOCKED",
                    color: "text-regent-gold font-bold",
                    border: "border-regent-gold",
                  },
                ].map((step, idx) => (
                  <div
                    key={idx}
                    className={`p-3 bg-[#02091F] border-2 ${step.border} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-pixel text-[9px] px-2 py-0.5 bg-regent-maroon text-white font-bold border border-red-950">
                          {step.tier}
                        </span>
                        <h4 className={`font-pixel text-xs ${step.color}`}>{step.title}</h4>
                      </div>
                      <p className="font-body text-xs text-white">
                        <strong className="text-regent-gold">Reward:</strong> {step.reward}
                      </p>
                      <p className="font-body text-[11px] text-text-muted">{step.condition}</p>
                    </div>

                    <div className="shrink-0">
                      {step.status === "UNLOCKED" ? (
                        <span className="px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-800 font-pixel text-[10px] flex items-center gap-1">
                          <Check className="w-3 h-3" /> UNLOCKED
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-[#071331] text-text-muted border border-border-card font-pixel text-[10px] flex items-center gap-1">
                          <Lock className="w-3 h-3" /> {step.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
