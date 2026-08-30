"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, User, Shield, Star, Flame, Award, Calendar, Sparkles } from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import PixelProgressBar from "@/components/ui/PixelProgressBar";
import { mockUser } from "@/data/mockUserData";

export default function ProfilePage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border-card mb-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-pixel text-xs text-regent-blue hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO HOME
        </Link>
        <span className="font-pixel text-xs text-regent-gold">
          PROSPECT DOSSIER
        </span>
      </div>

      {/* Main Profile Header Card */}
      <RetroCard className="p-6 sm:p-8 mb-6 bg-gradient-to-b from-[#071331] to-[#040C24]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
          {/* Avatar */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 bg-[#02091F] border-2 border-regent-blue p-1 shadow-[0_0_16px_rgba(32,169,246,0.3)] shrink-0">
            <Image
              src={mockUser.avatarUrl}
              alt={mockUser.name}
              fill
              className="object-cover"
            />
          </div>

          {/* User Dossier */}
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="px-2.5 py-0.5 bg-regent-maroon text-white font-pixel text-xs font-bold border border-red-950">
                LEVEL {mockUser.level}
              </span>
              <span className="px-2.5 py-0.5 bg-regent-blue/20 text-regent-blue font-pixel text-xs border border-regent-blue/50">
                {mockUser.rank.toUpperCase()}
              </span>
              <span className="px-2.5 py-0.5 bg-[#1E293B] text-text-secondary font-pixel text-xs border border-border-card">
                RAC SEETHAWAKA REGENT
              </span>
            </div>

            <h1 className="font-pixel text-2xl sm:text-3xl font-bold text-white tracking-wide">
              {mockUser.name.toUpperCase()}
            </h1>

            <p className="font-body text-xs sm:text-sm text-text-secondary">
              Prospect Explorer currently discovering Rotary Roots & preparing for the Regent Installation Ceremony.
            </p>

            {/* Level XP Progress */}
            <div className="pt-2 max-w-md">
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
        <RetroCard className="p-3 text-center">
          <Star className="w-5 h-5 text-regent-gold mx-auto mb-1" />
          <div className="font-pixel text-lg font-bold text-white">{mockUser.xp}</div>
          <div className="font-pixel text-[9px] text-text-muted">TOTAL XP</div>
        </RetroCard>

        <RetroCard className="p-3 text-center">
          <Shield className="w-5 h-5 text-regent-blue mx-auto mb-1" />
          <div className="font-pixel text-lg font-bold text-white">{mockUser.rank}</div>
          <div className="font-pixel text-[9px] text-text-muted">CURRENT RANK</div>
        </RetroCard>

        <RetroCard className="p-3 text-center">
          <Award className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <div className="font-pixel text-lg font-bold text-white">{mockUser.badges}</div>
          <div className="font-pixel text-[9px] text-text-muted">BADGES EARNED</div>
        </RetroCard>

        <RetroCard className="p-3 text-center">
          <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
          <div className="font-pixel text-lg font-bold text-white">{mockUser.streak} DAY</div>
          <div className="font-pixel text-[9px] text-text-muted">DAILY STREAK</div>
        </RetroCard>
      </div>

      {/* Selected Companion */}
      <RetroCard className="p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="relative w-14 h-14 bg-[#02091F] border-2 border-border-card shrink-0 overflow-hidden">
            <Image
              src={mockUser.companionUrl}
              alt="Nova"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-pixel text-base font-bold text-white">
                COMPANION: {mockUser.companion.toUpperCase()}
              </h3>
              <span className="text-[10px] font-pixel text-regent-gold bg-regent-maroon px-1.5 py-0.2 border border-red-950">
                ACTIVE
              </span>
            </div>
            <p className="text-xs text-text-secondary">
              Mystic Owl Guide providing lore tips and mission briefings.
            </p>
          </div>
        </div>

        <RetroButton
          variant="outline"
          size="sm"
          onClick={() => alert("Companion selection will be unlocked with more companion avatars soon!")}
        >
          SWITCH
        </RetroButton>
      </RetroCard>
    </div>
  );
}
