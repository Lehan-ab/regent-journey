"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Flame, Award, ChevronRight } from "lucide-react";
import { mockUser } from "@/data/mockUserData";

export default function PlayerHUDStrip() {
  return (
    <div className="w-full bg-[#050F2D] border-2 border-border-card p-2 sm:p-2.5 mb-4 flex items-center justify-between gap-2.5 shadow-retro-card">
      {/* Player Avatar & Info */}
      <Link
        href="/profile"
        className="flex items-center gap-2 sm:gap-2.5 group hover:opacity-90 transition-opacity min-w-0"
      >
        <div className="relative w-9 h-9 sm:w-10 sm:h-10 bg-[#02091F] border-2 border-regent-gold p-0.5 shrink-0 shadow-sm">
          <Image
            src={mockUser.avatarUrl}
            alt={mockUser.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-pixel text-xs sm:text-sm font-bold text-white group-hover:text-regent-blue transition-colors truncate">
              {mockUser.name.toUpperCase()}
            </span>
            <span className="px-1.5 py-0.2 bg-regent-maroon text-white text-[8px] sm:text-[9px] font-pixel border border-red-950 font-bold shrink-0">
              LVL {mockUser.level}
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] font-pixel text-regent-blue uppercase truncate">
            {mockUser.rank}
          </span>
        </div>
      </Link>

      {/* Gamified Stats Summary */}
      <div className="flex items-center gap-1.5 sm:gap-3 font-pixel text-xs shrink-0">
        {/* XP */}
        <div className="flex items-center gap-1 text-regent-gold bg-[#02091F] px-2 py-0.5 sm:py-1 border border-yellow-900/50">
          <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-regent-gold" />
          <span className="font-bold text-[11px] sm:text-xs">{mockUser.xp} XP</span>
        </div>

        {/* Streak */}
        <div className="hidden xs:flex items-center gap-1 text-orange-400 bg-[#02091F] px-2 py-0.5 sm:py-1 border border-orange-900/50">
          <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-orange-400" />
          <span className="text-[11px] sm:text-xs">{mockUser.streak}D</span>
        </div>

        {/* Badges */}
        <div className="hidden sm:flex items-center gap-1 text-purple-400 bg-[#02091F] px-2 py-0.5 sm:py-1 border border-purple-900/50">
          <Award className="w-3.5 h-3.5" />
          <span className="text-xs">{mockUser.badges}</span>
        </div>

        {/* Profile Link */}
        <Link
          href="/profile"
          className="flex items-center gap-1 text-[9px] sm:text-[10px] text-text-muted hover:text-white font-pixel px-2 py-0.5 sm:py-1 border border-border-card/60 bg-[#071331] transition-colors"
        >
          PROFILE <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
