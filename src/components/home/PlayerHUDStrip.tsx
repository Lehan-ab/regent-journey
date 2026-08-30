"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Shield, Flame, Award, ChevronRight, Sparkles } from "lucide-react";
import { mockUser } from "@/data/mockUserData";

export default function PlayerHUDStrip() {
  return (
    <div className="w-full bg-[#050F2D] border-2 border-border-card p-2 sm:p-2.5 mb-4 flex items-center justify-between gap-3 shadow-retro-card">
      {/* Player Avatar & Info */}
      <Link
        href="/profile"
        className="flex items-center gap-2.5 sm:gap-3 group hover:opacity-90 transition-opacity"
      >
        <div className="relative w-10 h-10 sm:w-11 sm:h-11 bg-[#02091F] border-2 border-regent-gold p-0.5 shrink-0 shadow-sm">
          <Image
            src={mockUser.avatarUrl}
            alt={mockUser.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-pixel text-xs sm:text-sm font-bold text-white group-hover:text-regent-blue transition-colors">
              {mockUser.name.toUpperCase()}
            </span>
            <span className="px-1.5 py-0.2 bg-regent-maroon text-white text-[9px] font-pixel border border-red-950 font-bold">
              LVL {mockUser.level}
            </span>
          </div>
          <span className="text-[10px] font-pixel text-regent-blue uppercase">
            {mockUser.rank}
          </span>
        </div>
      </Link>

      {/* Gamified Stats Summary */}
      <div className="flex items-center gap-2 sm:gap-4 font-pixel text-xs">
        {/* XP */}
        <div className="flex items-center gap-1 text-regent-gold bg-[#02091F] px-2 py-1 border border-yellow-900/50">
          <Star className="w-3.5 h-3.5 fill-regent-gold" />
          <span className="font-bold">{mockUser.xp} XP</span>
        </div>

        {/* Streak */}
        <div className="hidden xs:flex items-center gap-1 text-orange-400 bg-[#02091F] px-2 py-1 border border-orange-900/50">
          <Flame className="w-3.5 h-3.5 fill-orange-400" />
          <span>{mockUser.streak}D</span>
        </div>

        {/* Badges */}
        <div className="hidden sm:flex items-center gap-1 text-purple-400 bg-[#02091F] px-2 py-1 border border-purple-900/50">
          <Award className="w-3.5 h-3.5" />
          <span>{mockUser.badges}</span>
        </div>

        {/* Dossier Link */}
        <Link
          href="/profile"
          className="hidden md:flex items-center gap-1 text-[10px] text-text-muted hover:text-white font-pixel px-2 py-1 border border-border-card/60 bg-[#071331] transition-colors"
        >
          DOSSIER <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
