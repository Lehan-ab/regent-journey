"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Shield, Star, Flame, Award, Sparkles, MapPin } from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import PixelProgressBar from "@/components/ui/PixelProgressBar";
import { mockUser } from "@/data/mockUserData";

export default function ProfilePage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border-card mb-6">
        <Link
          href="/home"
          className="flex items-center gap-2 font-pixel text-xs text-regent-blue hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO REALM MAP
        </Link>
        <span className="font-pixel text-xs text-regent-gold">
          EXPLORER PROFILE
        </span>
      </div>

      {/* Main Profile Header Card */}
      <RetroCard className="p-5 sm:p-7 mb-6 bg-gradient-to-b from-[#071331] to-[#040C24] border-2 border-regent-blue">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
          {/* Avatar */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#02091F] border-2 border-regent-blue p-1 shadow-[0_0_16px_rgba(32,169,246,0.3)] shrink-0">
            <Image
              src={mockUser.avatarUrl}
              alt={mockUser.name}
              fill
              className="object-cover"
            />
          </div>

          {/* User Details */}
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 bg-regent-maroon text-white font-pixel text-xs font-bold border border-red-950">
                LEVEL {mockUser.level}
              </span>
              <span className="px-2.5 py-0.5 bg-regent-blue/20 text-regent-blue font-pixel text-xs border border-regent-blue/50 font-bold">
                {mockUser.rank.toUpperCase()}
              </span>
              <span className="px-2.5 py-0.5 bg-[#1E293B] text-text-secondary font-pixel text-xs border border-border-card">
                RAC SEETHAWAKA REGENT
              </span>
            </div>

            <h1 className="font-pixel text-2xl sm:text-3xl font-bold text-white tracking-wide truncate">
              {mockUser.name.toUpperCase()}
            </h1>

            <p className="font-body text-xs sm:text-sm text-text-secondary leading-relaxed">
              Prospect Explorer progressing through Regent Journey on the path toward official induction. Currently discovering Rotary Roots.
            </p>

            {/* Level XP Progress */}
            <div className="pt-2 max-w-md mx-auto sm:mx-0">
              <PixelProgressBar
                progress={(mockUser.xp / mockUser.xpToNextLevel) * 100}
                color="yellow"
                label={`XP TO LEVEL ${mockUser.level + 1}`}
              />
              <p className="text-right text-[10px] font-pixel text-text-muted mt-1">
                {mockUser.xp} / {mockUser.xpToNextLevel} XP
              </p>
            </div>
          </div>
        </div>
      </RetroCard>

      {/* Stats Breakdown */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <RetroCard className="p-3.5 text-center">
          <Star className="w-5 h-5 text-regent-gold mx-auto mb-1 fill-regent-gold" />
          <div className="font-pixel text-base sm:text-lg font-bold text-white">{mockUser.xp}</div>
          <div className="font-pixel text-[9px] text-text-muted">TOTAL XP</div>
        </RetroCard>

        <RetroCard className="p-3.5 text-center">
          <Shield className="w-5 h-5 text-regent-blue mx-auto mb-1" />
          <div className="font-pixel text-base sm:text-lg font-bold text-white">{mockUser.rank}</div>
          <div className="font-pixel text-[9px] text-text-muted">CURRENT RANK</div>
        </RetroCard>

        <RetroCard className="p-3.5 text-center">
          <Award className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <div className="font-pixel text-base sm:text-lg font-bold text-white">{mockUser.badges}</div>
          <div className="font-pixel text-[9px] text-text-muted">BADGES EARNED</div>
        </RetroCard>

        <RetroCard className="p-3.5 text-center">
          <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1 fill-orange-400" />
          <div className="font-pixel text-base sm:text-lg font-bold text-white">{mockUser.streak} DAY</div>
          <div className="font-pixel text-[9px] text-text-muted">DAILY STREAK</div>
        </RetroCard>
      </div>

      {/* Selected Companion Card */}
      <RetroCard className="p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="relative w-12 h-12 sm:w-14 sm:h-14 bg-[#02091F] border-2 border-regent-gold shrink-0 overflow-hidden">
            <Image
              src={mockUser.companionUrl}
              alt={mockUser.companion}
              fill
              className="object-cover"
            />
          </div>
          <div className="min-w-0 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h3 className="font-pixel text-sm sm:text-base font-bold text-white truncate">
                COMPANION: {mockUser.companion.toUpperCase()}
              </h3>
              <span className="text-[9px] font-pixel text-regent-gold bg-regent-maroon px-1.5 py-0.2 border border-red-950 shrink-0">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-text-secondary mt-0.5 truncate">
              Mystic Guide providing lore tips and mission briefings.
            </p>
          </div>
        </div>

        <RetroButton
          variant="outline"
          size="sm"
          onClick={() => alert("Additional companion avatars unlock as you advance through higher chapters!")}
        >
          COMPANION INFO
        </RetroButton>
      </RetroCard>
    </div>
  );
}
