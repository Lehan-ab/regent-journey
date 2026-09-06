"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  Sparkles,
  BookOpen,
  Lock,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Landmark,
  ChevronDown,
  ChevronUp,
  Crown,
  CloudFog,
} from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import PixelProgressBar from "@/components/ui/PixelProgressBar";
import { RealmLocation, MapSecret } from "@/data/realmMapLocations";

interface LocationDetailPanelProps {
  location: RealmLocation | null;
  secret?: MapSecret | null;
  onClose: () => void;
}

export default function LocationDetailPanel({
  location,
  secret,
  onClose,
}: LocationDetailPanelProps) {
  const [showLore, setShowLore] = useState(false);

  // If secret landmark is inspected
  if (secret) {
    return (
      <RetroCard className="p-4 bg-gradient-to-b from-[#091a42] via-[#05102A] to-[#03091B] border-2 border-regent-gold shadow-retro-card-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-text-secondary hover:text-white p-1 border border-border-card bg-[#02091F] hover:bg-red-950 transition-colors z-20"
          aria-label="Close inspector"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2 pr-8">
          <span className="px-2 py-0.5 bg-regent-maroon text-white font-pixel text-[10px] uppercase border border-red-950 flex items-center gap-1">
            <Landmark className="w-3 h-3 text-regent-gold" />
            {secret.type === "HERITAGE_LORE"
              ? "HERITAGE LANDMARK"
              : secret.type === "BOTANICAL_NOTE"
              ? "BOTANICAL LANDMARK"
              : "SECRET DISCOVERY"}
          </span>
        </div>

        <h3 className="font-pixel text-base sm:text-lg font-bold text-white tracking-wide mb-1.5">
          {secret.title}
        </h3>

        <p className="font-body text-xs text-text-secondary leading-relaxed mb-3">
          {secret.description}
        </p>

        {secret.rewardXp && (
          <div className="p-2 bg-[#02091F] border border-regent-gold/50 flex items-center justify-between text-xs font-pixel">
            <span className="text-regent-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> DISCOVERY BONUS
            </span>
            <span className="text-white font-bold">+{secret.rewardXp} XP EARNED</span>
          </div>
        )}
      </RetroCard>
    );
  }

  if (!location) return null;

  const isCompleted = location.status === "COMPLETED";
  const isCurrent = location.status === "CURRENT";
  const isLocked = location.status === "LOCKED";

  return (
    <RetroCard
      className={`p-3.5 sm:p-4 bg-gradient-to-b from-[#071331] via-[#05102A] to-[#03091B] border-2 shadow-retro-card-lg relative ${
        isCompleted
          ? "border-regent-gold/90 shadow-[0_0_15px_rgba(255,199,25,0.15)]"
          : isLocked
          ? "border-slate-700/80"
          : "border-regent-blue"
      }`}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2.5 right-2.5 text-text-secondary hover:text-white p-1 border border-border-card bg-[#02091F] hover:bg-red-950 transition-colors z-20"
        aria-label="Close location inspector"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Header Info: Standardized Chapter & Status */}
      <div className="flex items-center gap-2 flex-wrap mb-1.5 pr-7">
        <span className="px-2 py-0.5 bg-regent-maroon text-white font-pixel text-[10px] uppercase border border-red-950 font-bold">
          {location.atlasIndex ? `ATLAS STEP ${location.atlasIndex}` : location.chapterLabel}
        </span>

        {isCompleted ? (
          <span className="px-2 py-0.5 bg-yellow-950/80 text-regent-gold font-pixel text-[10px] border border-regent-gold/70 flex items-center gap-1 font-bold shadow-sm">
            <Crown className="w-3 h-3 text-regent-gold fill-regent-gold" /> MASTERED
          </span>
        ) : isCurrent ? (
          <span className="px-2 py-0.5 bg-blue-950 text-regent-blue font-pixel text-[10px] border border-regent-blue flex items-center gap-1 font-bold animate-pulse">
            <Sparkles className="w-3 h-3 text-regent-gold" /> ACTIVE EXPEDITION
          </span>
        ) : (
          <span className="px-2 py-0.5 bg-slate-900 text-slate-400 font-pixel text-[10px] border border-slate-700 flex items-center gap-1">
            <Lock className="w-3 h-3 text-slate-400" /> FOGBOUND
          </span>
        )}
      </div>

      {/* World Name & Chapter Thematic Title */}
      <div className="mb-1">
        <h3 className="font-pixel text-base sm:text-lg font-bold text-white tracking-wide leading-tight">
          {location.atlasName || location.worldName}
        </h3>
        {location.chapterTitle !== (location.atlasName || location.worldName) && (
          <p className="font-pixel text-xs text-regent-gold tracking-wide">
            {location.chapterTitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-1 text-[10px] font-pixel text-text-muted mb-2">
        <MapPin className="w-3 h-3 text-regent-blue shrink-0" />
        <span className="truncate">{location.regionTitle}</span>
      </div>

      {/* 
        ============================================================
        STATE-AWARE ARTWORK / SILHOUETTE
        ============================================================
      */}
      <div className="relative w-full h-24 sm:h-28 mb-2.5 border-2 border-border-card bg-[#02091F] overflow-hidden">
        <Image
          src={location.image}
          alt={location.worldName}
          fill
          className={`object-cover transition-all ${
            isLocked
              ? "filter grayscale brightness-35 contrast-125"
              : isCompleted
              ? "filter brightness-105 contrast-110"
              : "filter brightness-100 contrast-105"
          }`}
        />

        {/* Locked Fog Overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-[#071331]/80 backdrop-blur-[1.5px] flex flex-col items-center justify-center text-center p-2 z-10">
            <div className="p-1.5 bg-slate-950 border border-slate-700 text-slate-400 mb-1 rounded-none shadow-sm">
              <CloudFog className="w-4 h-4 text-slate-300 animate-pulse" />
            </div>
            <span className="text-[9px] font-pixel text-slate-300 uppercase tracking-wider font-bold">
              CLOAKED IN THE MISTS OF SEETHAWAKA
            </span>
          </div>
        )}

        {/* Completed Golden Laurel Banner */}
        {isCompleted && (
          <div className="absolute top-1.5 left-1.5 px-2 py-0.5 bg-gradient-to-r from-amber-600 to-yellow-500 text-yellow-950 text-[9px] font-pixel font-bold border border-yellow-200 flex items-center gap-1 shadow-md z-10">
            <Crown className="w-2.5 h-2.5 fill-yellow-950" />
            {location.goldenEmblemTitle || "GOLDEN EMBLEM UNLOCKED"}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#071331] via-transparent to-transparent pointer-events-none" />

        {/* XP Reward Chip */}
        <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 bg-[#02091F]/90 text-[9px] font-pixel text-regent-gold border border-yellow-900/50 flex items-center gap-1 z-10">
          <Sparkles className="w-2.5 h-2.5 text-yellow-400" /> +{location.xpReward} XP REWARD
        </div>
      </div>

      {/* Description or Fog Atmospheric Text */}
      <p className="font-body text-xs text-text-secondary leading-relaxed mb-2.5">
        {isLocked && location.fogDescription
          ? location.fogDescription
          : location.description}
      </p>

      {/* Collapsible Realm Inspiration & Lore */}
      {location.seethawakaInspiration && (
        <div className="mb-2.5 border border-border-card/60 bg-[#02091F]/80">
          <button
            onClick={() => setShowLore(!showLore)}
            className="w-full px-2.5 py-1.5 flex items-center justify-between text-[10px] font-pixel text-regent-gold hover:bg-[#071331] transition-colors"
          >
            <span className="flex items-center gap-1.5 truncate">
              <Landmark className="w-3 h-3 text-regent-gold shrink-0" />
              <span>Seethawaka Heritage Lore</span>
            </span>
            {showLore ? (
              <ChevronUp className="w-3.5 h-3.5 shrink-0" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 shrink-0" />
            )}
          </button>

          {showLore && (
            <div className="p-2.5 pt-1 border-t border-border-card/40 text-[11px] font-body text-text-secondary space-y-1.5">
              <p className="font-medium text-white">{location.seethawakaInspiration}</p>
              {location.expandedLore && (
                <p className="text-text-muted leading-relaxed text-[10px]">
                  {location.expandedLore}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Progress & Next Lesson for Active World */}
      {isCurrent && (
        <div className="mb-3 bg-[#02091F] p-2.5 border border-border-card">
          <div className="flex items-center justify-between text-[11px] font-pixel mb-1">
            <span className="text-regent-blue flex items-center gap-1">
              <BookOpen className="w-3 h-3" /> EXPEDITION PROGRESS
            </span>
            <span className="text-white font-bold">
              {location.lessonsCompleted} / {location.lessonsTotal} LESSONS
            </span>
          </div>
          <PixelProgressBar
            progress={(location.lessonsCompleted / location.lessonsTotal) * 100}
            color="blue"
            showLabel={false}
            size="sm"
          />
          {location.nextLesson && (
            <p className="text-[11px] text-text-secondary mt-1.5 truncate">
              Next quest: <strong className="text-white">{location.nextLesson}</strong>
            </p>
          )}
        </div>
      )}

      {/* Locked Requirement Notice */}
      {isLocked && (
        <div className="mb-3 p-2 bg-[#02091F] border border-slate-700/80 flex items-start gap-2 text-[11px] text-slate-300">
          <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <div className="font-pixel text-[9px] text-amber-400 uppercase tracking-wider mb-0.5">
              FOG OF WAR REQUIREMENT
            </div>
            <span>
              {location.unlockRequirement || "Complete previous realms on the expedition path to disperse the mist."}
            </span>
          </div>
        </div>
      )}

      {/* Actions & Badge Tag */}
      <div className="pt-2 border-t border-border-card flex items-center justify-between gap-2">
        {location.badgeReward && (
          <div className="text-[9px] font-pixel text-text-muted flex items-center gap-1 truncate">
            <ShieldCheck className="w-3 h-3 text-regent-gold shrink-0" />
            <span className="truncate">Badge: {location.badgeReward}</span>
          </div>
        )}

        <div className="shrink-0">
          {isCurrent ? (
            <RetroButton
              variant="blue"
              size="sm"
              href={location.routeHref || `/journey/${location.id}`}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              ENTER EXPEDITION
            </RetroButton>
          ) : isCompleted ? (
            <RetroButton
              variant="yellow"
              size="sm"
              href={location.routeHref || `/journey/${location.id}`}
              icon={<Sparkles className="w-3 h-3 text-yellow-950" />}
            >
              REVISIT REALM
            </RetroButton>
          ) : (
            <RetroButton
              variant="outline"
              size="sm"
              disabled
              icon={<Lock className="w-3 h-3 text-slate-500" />}
            >
              FOGBOUND
            </RetroButton>
          )}
        </div>
      </div>
    </RetroCard>
  );
}
