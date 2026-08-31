"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Shield,
  Star,
  Flame,
  Award,
  Sparkles,
  Check,
  RotateCcw,
  Target,
  Compass,
  Crown,
  Palette,
  Layers,
  Shirt,
  ChevronRight,
} from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import PixelAvatar from "@/components/avatar/PixelAvatar";
import PixelCompanion from "@/components/companion/PixelCompanion";
import PixelProgressBar from "@/components/ui/PixelProgressBar";
import { usePlayer } from "@/context/PlayerContext";
import { COMPANIONS, INTEREST_OPTIONS } from "@/data/companionsData";
import { EXPLORERS } from "@/data/explorersData";
import { ARCHETYPE_HAIRSTYLES } from "@/data/customizationsData";

export default function ProfilePage() {
  const { player, resetJourney, addXp } = usePlayer();
  const [resetConfirm, setResetConfirm] = useState(false);

  const companion = COMPANIONS[player.companion] || COMPANIONS.nova;
  const currentExplorer = EXPLORERS[player.explorerId] || EXPLORERS.pathfinder;
  const currentCustomization = player.explorerCustomization || {
    hairVariant: "signature",
    hairColor: "natural",
    outfit: "base_explorer",
    accessory: "none",
    cloak: "none",
    patches: [],
  };

  const hairstyles = ARCHETYPE_HAIRSTYLES[player.explorerId] || ARCHETYPE_HAIRSTYLES.pathfinder;
  const currentHairName =
    hairstyles.find((h) => h.id === currentCustomization.hairVariant)?.name || "Signature Look";

  const progressToNextLevel =
    player.xpToNextLevel > 0
      ? Math.min(100, Math.round((player.xp / player.xpToNextLevel) * 100))
      : 100;

  const playerInterestItems = INTEREST_OPTIONS.filter((item) =>
    player.interests.includes(item.id)
  );

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border-card mb-6">
        <Link
          href="/home"
          className="flex items-center gap-2 font-pixel text-xs text-regent-blue hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>BACK TO REALM MAP</span>
        </Link>
        <span className="font-pixel text-xs text-regent-gold uppercase tracking-wider">
          EXPLORER PROFILE
        </span>
      </div>

      {/* Main Profile Header Card */}
      <RetroCard className="p-5 sm:p-7 mb-6 bg-gradient-to-b from-[#071331] to-[#040C24] border-2 border-regent-blue">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          {/* Custom Avatar Sprite Stage */}
          <div className="relative group shrink-0">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#02091F] border-2 border-regent-blue p-1 shadow-[0_0_16px_rgba(32,169,246,0.3)] flex items-center justify-center">
              <PixelAvatar
                explorerId={player.explorerId}
                config={player.avatar}
                size="full"
                animate={false}
              />
              {/* Corner Rivets */}
              <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-regent-gold" />
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-regent-gold" />
              <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-regent-gold" />
              <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-regent-gold" />
            </div>

            <Link
              href="/profile/customize"
              className="mt-2 inline-flex items-center justify-center gap-1 w-full px-2 py-1 bg-[#02091F] hover:bg-regent-maroon border border-border-card text-regent-gold hover:text-white font-pixel text-[10px] uppercase transition-colors"
            >
              <Palette className="w-3 h-3" /> CUSTOMIZE
            </Link>
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 bg-regent-maroon text-white font-pixel text-xs font-bold border border-red-950">
                LEVEL {player.level}
              </span>
              <span className="px-2.5 py-0.5 bg-regent-blue/20 text-regent-blue font-pixel text-xs border border-regent-blue/50 font-bold">
                {player.rank.toUpperCase()}
              </span>
              <span
                className="px-2.5 py-0.5 font-pixel text-xs font-bold border"
                style={{
                  color: currentExplorer.accentColor,
                  borderColor: currentExplorer.accentColor,
                  backgroundColor: "#02091F",
                }}
              >
                {currentExplorer.title}
              </span>
            </div>

            <h1 className="font-pixel text-2xl sm:text-3xl font-bold text-white tracking-wide truncate">
              {(player.name || "TRAVELLER").toUpperCase()}
            </h1>

            <p className="font-body text-xs sm:text-sm text-text-secondary leading-relaxed">
              Prospect Explorer progressing through Regent Journey. Currently navigating{" "}
              <strong className="text-white">{player.currentWorld}</strong>.
            </p>

            {/* Level XP Progress */}
            <div className="pt-2 max-w-md mx-auto sm:mx-0">
              <PixelProgressBar
                progress={progressToNextLevel}
                color="yellow"
                label={`XP TO LEVEL ${player.level + 1}`}
              />
              <p className="text-right text-[10px] font-pixel text-text-muted mt-1">
                {player.xp} / {player.xpToNextLevel} XP
              </p>
            </div>
          </div>
        </div>
      </RetroCard>

      {/* Stats Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <RetroCard className="p-3.5 text-center">
          <Star className="w-5 h-5 text-regent-gold mx-auto mb-1 fill-regent-gold" />
          <div className="font-pixel text-base sm:text-lg font-bold text-white">{player.xp}</div>
          <div className="font-pixel text-[9px] text-text-muted">TOTAL XP</div>
        </RetroCard>

        <RetroCard className="p-3.5 text-center">
          <Shield className="w-5 h-5 text-regent-blue mx-auto mb-1" />
          <div className="font-pixel text-base sm:text-lg font-bold text-white">{player.rank}</div>
          <div className="font-pixel text-[9px] text-text-muted">CURRENT RANK</div>
        </RetroCard>

        <RetroCard className="p-3.5 text-center">
          <Award className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <div className="font-pixel text-base sm:text-lg font-bold text-white">{player.badges.length}</div>
          <div className="font-pixel text-[9px] text-text-muted">BADGES EARNED</div>
        </RetroCard>

        <RetroCard className="p-3.5 text-center">
          <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1 fill-orange-400" />
          <div className="font-pixel text-base sm:text-lg font-bold text-white">{player.streak} DAY</div>
          <div className="font-pixel text-[9px] text-text-muted">DAILY STREAK</div>
        </RetroCard>
      </div>

      {/* EXPLORER CUSTOMIZATION & LOADOUT BANNER */}
      <RetroCard className="p-5 mb-6 bg-gradient-to-r from-[#06112E] via-[#08173D] to-[#050E28] border-2 border-regent-gold">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-regent-gold" />
              <h3 className="font-pixel text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                CUSTOMIZE EXPLORER
              </h3>
              <span className="px-2 py-0.2 bg-regent-maroon text-regent-gold font-pixel text-[9px] border border-red-950">
                STUDIO OPEN
              </span>
            </div>
            <p className="font-body text-xs text-[#B8C0D2] leading-relaxed max-w-xl">
              Personalize your preset archetype with milestone cloaks, field outfits, hair variants,
              accessories, and verified project patches.
            </p>

            {/* Quick Loadout Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-2 py-0.5 bg-[#02091F] border border-border-card text-[10px] font-pixel text-text-secondary">
                Hair: <strong className="text-white">{currentHairName}</strong>
              </span>
              <span className="px-2 py-0.5 bg-[#02091F] border border-border-card text-[10px] font-pixel text-text-secondary">
                Outfit: <strong className="text-white">{currentCustomization.outfit === "field_jacket" ? "Field Jacket" : "Base Garb"}</strong>
              </span>
              <span className="px-2 py-0.5 bg-[#02091F] border border-border-card text-[10px] font-pixel text-text-secondary">
                Cloak: <strong className="text-white">{currentCustomization.cloak === "regent_mantle" ? "Regent Mantle" : currentCustomization.cloak === "pathfinder_cloak" ? "Pathfinder Cloak" : "None"}</strong>
              </span>
              <span className="px-2 py-0.5 bg-[#02091F] border border-border-card text-[10px] font-pixel text-text-secondary">
                Patches: <strong className="text-regent-blue">{currentCustomization.patches?.length || 0} Equipped</strong>
              </span>
            </div>
          </div>

          <Link
            href="/profile/customize"
            className="w-full md:w-auto px-5 py-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-black font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider border-2 border-yellow-200 shadow-retro-gold flex items-center justify-center gap-2 shrink-0 transition-transform active:scale-95"
          >
            <Palette className="w-4 h-4" />
            <span>CUSTOMIZE EXPLORER →</span>
          </Link>
        </div>
      </RetroCard>

      {/* Selected Companion Card */}
      <RetroCard className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 min-w-0">
          <div className="relative w-18 h-18 sm:w-20 sm:h-20 bg-[#02091F] border-2 border-regent-gold shrink-0 p-1 flex items-center justify-center shadow-md">
            <PixelCompanion
              companionId={companion.id}
              emotion="happy"
              variant="portrait"
              size="full"
              animate={true}
              showGlow={true}
            />
          </div>
          <div className="min-w-0 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
              <h3 className="font-pixel text-base font-bold text-white truncate">
                {companion.name}
              </h3>
              <span
                className="text-[9px] font-pixel px-2 py-0.5 border font-bold"
                style={{
                  color: companion.themeColor,
                  borderColor: companion.themeColor,
                  backgroundColor: "#02091F",
                }}
              >
                {companion.title}
              </span>
              <span className="text-[9px] font-pixel text-regent-gold bg-regent-maroon px-1.5 py-0.2 border border-red-950 shrink-0">
                ALLIANCE LVL {player.companionRelationship?.relationshipLevel || 1}
              </span>
            </div>
            <p className="font-body text-xs text-[#E2E8F0] italic mb-1.5">
              {companion.motto}
            </p>
            <p className="text-xs text-text-secondary line-clamp-2 mb-2">
              {companion.role}
            </p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
              {companion.keyTraits.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.2 bg-[#02091F] border border-border-card text-[9px] font-pixel text-text-secondary"
                >
                  ✦ {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <Link
          href="/onboarding?step=companion&test=1"
          className="px-3 py-1.5 bg-[#02091F] border border-border-card text-regent-gold hover:text-white font-pixel text-xs shrink-0 transition-colors"
        >
          CHANGE COMPANION
        </Link>
      </RetroCard>

      {/* Discovered Interests & Primary Goal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Interests */}
        <RetroCard className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-regent-gold" />
            <h3 className="font-pixel text-xs sm:text-sm font-bold text-white uppercase">
              DISCOVERED INTERESTS
            </h3>
          </div>

          {playerInterestItems.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {playerInterestItems.map((item) => (
                <span
                  key={item.id}
                  className="px-2.5 py-1 bg-[#02091F] border border-regent-blue/60 text-white font-pixel text-[10px] sm:text-xs flex items-center gap-1.5"
                >
                  <Check className="w-3 h-3 text-regent-blue" />
                  {item.title}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-text-muted font-body">
              No interests recorded yet. Complete onboarding discovery to map your avenue preferences.
            </p>
          )}
        </RetroCard>

        {/* Primary Goal */}
        <RetroCard className="p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-regent-blue" />
            <h3 className="font-pixel text-xs sm:text-sm font-bold text-white uppercase">
              PRIMARY ASPIRATION
            </h3>
          </div>

          <div className="p-3 bg-[#02091F] border border-border-card">
            <p className="font-pixel text-xs text-regent-gold font-bold">
              {player.primaryGoal || "Leadership experience & community impact"}
            </p>
            <p className="font-body text-[11px] text-text-muted mt-1">
              Your guided lessons and mentor connections will prioritize opportunities aligned with this goal.
            </p>
          </div>
        </RetroCard>
      </div>

      {/* Developer Options Card (Reset / Re-run Onboarding) */}
      <div className="p-4 bg-[#050F2D] border border-border-card/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-pixel text-[11px] text-text-muted font-bold uppercase">
            EXPLORER MANAGEMENT (DEV TOOLS)
          </span>
          <p className="text-[10px] text-text-muted">
            Switch your preset archetype or reset prospect onboarding progress to test the experience.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/onboarding?step=explorer&test=1"
            className="px-3 py-1 bg-[#071331] border border-border-card text-text-secondary hover:text-white font-pixel text-[11px] transition-colors"
          >
            CHANGE ARCHETYPE
          </Link>
          <button
            onClick={() => {
              if (confirm("Reset player progress to brand new prospect state?")) {
                resetJourney();
                alert("Progress reset. You can now re-experience the onboarding journey from the start page!");
              }
            }}
            className="px-3 py-1 bg-red-950/60 border border-red-800 text-red-300 hover:text-white font-pixel text-[11px] transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" /> RESET PROGRESS
          </button>
        </div>
      </div>
    </div>
  );
}

