"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trophy, Sparkles, Lock, CheckCircle2, Shield } from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import { usePlayer } from "@/context/PlayerContext";
import { CANONICAL_BADGES } from "@/data/canonicalBadges";

export default function AchievementsPage() {
  const { player, isHydrated } = usePlayer();

  const unlockedBadgesCount = isHydrated
    ? CANONICAL_BADGES.filter((b) => player.badges.some((pb) => pb.id === b.id)).length
    : 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border-card mb-6">
        <Link
          href="/home"
          className="flex items-center gap-2 font-pixel text-xs text-regent-blue hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO REALM MAP
        </Link>
        <span className="font-pixel text-xs text-regent-gold">
          {unlockedBadgesCount} / {CANONICAL_BADGES.length} BADGES UNLOCKED
        </span>
      </div>

      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex p-3 bg-amber-950 border-2 border-regent-gold mb-3 shadow-retro-card">
          <Trophy className="w-7 h-7 text-regent-gold" />
        </div>
        <h1 className="font-pixel text-2xl sm:text-3xl font-bold text-white tracking-wide">
          BADGE VAULT
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
          Collect achievements across your journey to prove your dedication and elevate your Regent rank.
        </p>
      </div>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {CANONICAL_BADGES.map((badge) => {
          const isUnlocked = isHydrated && player.badges.some((b) => b.id === badge.id);

          return (
            <RetroCard
              key={badge.id}
              className={`p-4 sm:p-5 flex items-start gap-3.5 transition-all ${
                isUnlocked
                  ? "border-regent-gold bg-[#08173d] shadow-[0_0_12px_rgba(255,199,25,0.15)]"
                  : "border-border-card bg-[#050e24] opacity-75"
              }`}
            >
              {/* Badge Icon / Image */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-[#02091F] border-2 border-border-card flex items-center justify-center overflow-hidden">
                {isUnlocked && badge.imageUrl ? (
                  <Image
                    src={badge.imageUrl}
                    alt={badge.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <Lock className="w-5 h-5 text-text-muted" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-pixel text-[9px] text-text-muted uppercase">
                    {badge.rarity} • {badge.category}
                  </span>
                  {isUnlocked ? (
                    <span className="flex items-center gap-1 text-[9px] font-pixel text-regent-green font-bold">
                      <CheckCircle2 className="w-3 h-3" /> UNLOCKED
                    </span>
                  ) : (
                    <span className="text-[9px] font-pixel text-text-muted">
                      LOCKED
                    </span>
                  )}
                </div>

                <h3 className="font-pixel text-sm sm:text-base font-bold text-white tracking-wide truncate">
                  {badge.title}
                </h3>

                <p className="font-body text-xs text-text-secondary mt-0.5 line-clamp-2 leading-relaxed">
                  {badge.description}
                </p>

                <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-border-card/40">
                  <div className="text-[9px] sm:text-[10px] font-pixel text-regent-gold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> +{badge.xpAwarded} XP
                  </div>

                  <span className="text-[8px] sm:text-[9px] font-pixel text-text-muted truncate">
                    {badge.unlockCondition}
                  </span>
                </div>
              </div>
            </RetroCard>
          );
        })}
      </div>
    </div>
  );
}
