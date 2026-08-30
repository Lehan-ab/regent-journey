"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Shield, Award, Flame, User, Sparkles, ChevronRight } from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import PixelProgressBar from "@/components/ui/PixelProgressBar";
import { mockUser } from "@/data/mockUserData";

export default function ProfileSummaryCard() {
  const [editToast, setEditToast] = useState(false);

  const stats = [
    {
      id: "stat-xp",
      icon: Star,
      iconColor: "text-regent-gold fill-regent-gold",
      value: mockUser.xp.toString(),
      label: "TOTAL XP",
      borderColor: "border-yellow-900/40",
      bgColor: "bg-[#091530]",
    },
    {
      id: "stat-rank",
      icon: Shield,
      iconColor: "text-regent-blue",
      value: mockUser.rank.toUpperCase(),
      label: "RANK",
      borderColor: "border-blue-900/40",
      bgColor: "bg-[#091530]",
    },
    {
      id: "stat-badges",
      icon: Award,
      iconColor: "text-purple-400",
      value: mockUser.badges.toString(),
      label: "BADGES",
      borderColor: "border-purple-900/40",
      bgColor: "bg-[#091530]",
    },
    {
      id: "stat-streak",
      icon: Flame,
      iconColor: "text-orange-400 fill-orange-400",
      value: `${mockUser.streak} DAY`,
      label: "STREAK",
      borderColor: "border-orange-900/40",
      bgColor: "bg-[#091530]",
    },
  ];

  return (
    <section className="w-full mb-8">
      <RetroCard className="p-4 sm:p-5 bg-gradient-to-b from-[#071331] via-[#05112B] to-[#040D24]">
        {/* Profile Header HUD */}
        <div className="flex items-center justify-between pb-4 border-b border-border-card mb-4">
          <div className="flex items-center gap-3.5 sm:gap-4">
            {/* Ornate Fantasy Avatar Frame */}
            <div className="relative group">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-[#02091F] border-2 border-regent-gold p-1 shadow-[0_0_10px_rgba(255,199,25,0.25)]">
                <Image
                  src={mockUser.avatarUrl}
                  alt={mockUser.name}
                  fill
                  className="object-cover"
                />
                {/* Corner Golden Rivets */}
                <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-regent-gold" />
                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-regent-gold" />
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-regent-gold" />
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-regent-gold" />
              </div>

              <button
                onClick={() => {
                  setEditToast(true);
                  setTimeout(() => setEditToast(false), 2500);
                }}
                className="absolute -bottom-2 -right-1 px-1.5 py-0.2 bg-regent-maroon hover:bg-regent-blue hover:text-black border border-red-950 text-[9px] font-pixel text-white transition-colors"
                title="Edit Avatar"
              >
                EDIT
              </button>
            </div>

            {/* Character Info */}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-pixel text-lg sm:text-xl font-bold text-white tracking-wide">
                  {mockUser.name.toUpperCase()}
                </h3>
                <span className="px-2 py-0.5 bg-regent-maroon text-white border border-red-950 text-[10px] font-pixel font-bold">
                  LVL {mockUser.level}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1">
                <span className="text-[11px] font-pixel text-regent-blue uppercase">
                  TITLE: {mockUser.rank}
                </span>
                <span className="text-text-muted text-xs">•</span>
                <span className="text-[10px] font-pixel text-text-muted uppercase">
                  NEXT: PATHFINDER
                </span>
              </div>
            </div>
          </div>

          {/* Active Companion Badge */}
          <div className="hidden sm:flex flex-col items-center">
            <div className="relative w-10 h-10 bg-[#02091F] border-2 border-border-card p-0.5 shadow-sm">
              <Image
                src={mockUser.companionUrl}
                alt="Nova Companion"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-[9px] font-pixel text-regent-gold mt-1">
              NOVA
            </span>
          </div>
        </div>

        {/* Level XP Bar */}
        <div className="mb-4 bg-[#02091F] p-2.5 border border-border-card">
          <div className="flex items-center justify-between text-[11px] font-pixel mb-1">
            <span className="text-text-secondary flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-regent-gold" /> LEVEL XP
            </span>
            <span className="text-regent-gold font-bold">
              {mockUser.xp} / 300 XP
            </span>
          </div>
          <PixelProgressBar
            progress={(mockUser.xp / 300) * 100}
            color="yellow"
            showLabel={false}
            size="sm"
          />
        </div>

        {/* Edit Toast Feedback */}
        {editToast && (
          <div className="mb-3 p-2 bg-[#050F2D] border border-regent-gold text-regent-gold font-pixel text-xs text-center animate-pulse">
            Avatar customization unlocked in Level 3!
          </div>
        )}

        {/* 2x2 Statistics Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-5">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`p-3 border-2 border-border-card flex items-center gap-3 ${stat.bgColor} hover:border-border-cardHighlight transition-colors`}
              >
                <div className="p-2 bg-[#02091F] border border-border-card shrink-0">
                  <Icon className={`w-4 h-4 ${stat.iconColor}`} />
                </div>
                <div className="min-w-0">
                  <div className="font-pixel text-base sm:text-lg font-bold text-white leading-none truncate">
                    {stat.value}
                  </div>
                  <div className="font-pixel text-[9px] sm:text-[10px] text-text-secondary uppercase tracking-wider mt-1 truncate">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Profile CTA */}
        <RetroButton
          variant="outline"
          size="md"
          href="/profile"
          fullWidth
          icon={<User className="w-4 h-4" />}
        >
          VIEW PROFILE
        </RetroButton>
      </RetroCard>
    </section>
  );
}
