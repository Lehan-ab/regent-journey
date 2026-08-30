"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Trophy, Sparkles, Lock, CheckCircle2 } from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";

export default function AchievementsPage() {
  const allAchievements = [
    {
      id: "root-seeker",
      title: "ROOT SEEKER",
      description: "Discovered the origins and core values of the Rotary movement.",
      xp: 150,
      unlocked: true,
      image: "/images/root_seeker_badge.jpg",
      rarity: "RARE",
    },
    {
      id: "four-way-champion",
      title: "FOUR-WAY CHAMPION",
      description: "Mastered the Four-Way Test in personal and professional ethics.",
      xp: 200,
      unlocked: false,
      rarity: "EPIC",
    },
    {
      id: "fellowship-first",
      title: "FIRST FELLOWSHIP",
      description: "Attended your first official Rotaract Seethawaka Regent general assembly.",
      xp: 100,
      unlocked: false,
      rarity: "COMMON",
    },
    {
      id: "community-hero",
      title: "HANDS ON DECK",
      description: "Contributed 10+ hours to a community impact initiative.",
      xp: 300,
      unlocked: false,
      rarity: "LEGENDARY",
    },
  ];

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
          1 / 4 BADGES UNLOCKED
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
        {allAchievements.map((badge) => (
          <RetroCard
            key={badge.id}
            className={`p-4 sm:p-5 flex items-start gap-3.5 ${
              badge.unlocked
                ? "border-regent-gold bg-[#08173d]"
                : "border-border-card bg-[#050e24] opacity-80"
            }`}
          >
            {/* Badge Icon / Image */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-[#02091F] border-2 border-border-card flex items-center justify-center overflow-hidden">
              {badge.unlocked && badge.image ? (
                <Image
                  src={badge.image}
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
                  {badge.rarity}
                </span>
                {badge.unlocked ? (
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

              <div className="mt-2 text-[9px] sm:text-[10px] font-pixel text-regent-gold flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> +{badge.xp} XP REWARD
              </div>
            </div>
          </RetroCard>
        ))}
      </div>
    </div>
  );
}
