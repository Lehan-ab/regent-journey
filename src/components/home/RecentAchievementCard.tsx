"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Sparkles, Trophy, Star, Lock } from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import { usePlayer } from "@/context/PlayerContext";

export default function RecentAchievementCard() {
  const { player, isHydrated } = usePlayer();

  const recentBadge =
    isHydrated && player.badges.length > 0
      ? player.badges[player.badges.length - 1]
      : null;

  return (
    <section className="w-full mb-8">
      {/* Section Heading */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-pixel text-base sm:text-lg font-bold text-white tracking-wider flex items-center gap-2">
          <Trophy className="w-4 h-4 text-regent-gold" />
          RECENT ACHIEVEMENT
        </h2>
        {recentBadge ? (
          <span className="text-[10px] font-pixel text-regent-gold bg-regent-maroon px-2 py-0.5 border border-red-950 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> UNLOCKED
          </span>
        ) : (
          <span className="text-[10px] font-pixel text-text-muted bg-[#02091F] px-2 py-0.5 border border-border-card">
            AWAITING FIRST BADGE
          </span>
        )}
      </div>

      <RetroCard className="p-4 sm:p-5 bg-gradient-to-r from-[#071331] via-[#0a1b47] to-[#071331] border-regent-gold/60">
        <div className="flex items-center gap-4">
          {/* Collectible Badge Art with Golden Shimmer Aura */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-[#02091F] border-2 border-regent-gold p-1 shadow-[0_0_16px_rgba(255,199,25,0.4)] group flex items-center justify-center">
            {recentBadge?.imageUrl ? (
              <Image
                src={recentBadge.imageUrl}
                alt={recentBadge.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            ) : (
              <Lock className="w-8 h-8 text-text-muted" />
            )}
            {/* Sparkle star in corner */}
            {recentBadge && (
              <div className="absolute -top-1.5 -right-1.5 p-0.5 bg-[#02091F] border border-regent-gold text-regent-gold">
                <Star className="w-2.5 h-2.5 fill-regent-gold" />
              </div>
            )}
          </div>

          {/* Achievement Info */}
          <div className="flex-1 min-w-0">
            {recentBadge ? (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-pixel text-[9px] text-regent-gold uppercase tracking-wider bg-[#02091F] px-2 py-0.5 border border-yellow-900/60 font-bold">
                    {recentBadge.rarity} BADGE
                  </span>
                  <span className="font-pixel text-[10px] text-regent-blue font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-regent-gold" /> +{recentBadge.xpAwarded || 50} XP
                  </span>
                </div>

                <h3 className="font-pixel text-base sm:text-lg font-bold text-white tracking-wide truncate">
                  {recentBadge.title}
                </h3>

                <p className="font-body text-xs sm:text-sm text-text-secondary mt-0.5 line-clamp-2">
                  &ldquo;{recentBadge.description}&rdquo;
                </p>
              </>
            ) : (
              <>
                <h3 className="font-pixel text-base sm:text-lg font-bold text-white tracking-wide truncate">
                  NO BADGES UNLOCKED YET
                </h3>
                <p className="font-body text-xs sm:text-sm text-text-secondary mt-0.5 line-clamp-2">
                  Complete Chapter 0: The Gateway to earn your first official Initiate badge.
                </p>
              </>
            )}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-4 pt-3 border-t border-border-card/60 flex items-center justify-between">
          <span className="font-pixel text-[10px] text-text-muted">
            COLLECTION: {player.badges.length} BADGES
          </span>
          <Link
            href="/achievements"
            className="font-pixel text-xs text-regent-gold hover:underline flex items-center gap-1"
          >
            VIEW ALL IN VAULT &rarr;
          </Link>
        </div>
      </RetroCard>
    </section>
  );
}
