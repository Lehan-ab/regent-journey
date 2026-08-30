"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Target, Sparkles, Clock, MapPin } from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import { mockMissions } from "@/data/mockUserData";

export default function MissionsPage() {
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
          +500 XP AVAILABLE
        </span>
      </div>

      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex p-3 bg-green-950 border-2 border-regent-green mb-3 shadow-retro-card">
          <Target className="w-7 h-7 text-regent-green" />
        </div>
        <h1 className="font-pixel text-2xl sm:text-3xl font-bold text-white tracking-wide">
          REGENT MISSIONS & QUESTS
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
          Participate in physical club assemblies, hands-on community projects, and fellowship activities to turn knowledge into real-world action.
        </p>
      </div>

      {/* Missions Grid */}
      <div className="space-y-4">
        {mockMissions.map((mission) => (
          <RetroCard key={mission.id} className="p-4 sm:p-5 bg-[#071331]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 bg-regent-maroon text-white font-pixel text-[9px] uppercase border border-red-950 font-bold">
                    {mission.type}
                  </span>
                  <span className="px-2 py-0.5 bg-regent-blue/20 text-regent-blue font-pixel text-[9px] border border-regent-blue/50">
                    {mission.status}
                  </span>
                  <span className="text-[10px] font-pixel text-text-muted flex items-center gap-1">
                    <Clock className="w-3 h-3 text-regent-gold" /> {mission.date}
                  </span>
                </div>

                <h3 className="font-pixel text-base sm:text-lg font-bold text-white tracking-wide truncate">
                  {mission.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-text-secondary leading-relaxed">
                  {mission.tagline}
                </p>

                <div className="flex items-center gap-1.5 text-[11px] text-text-muted pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span className="truncate">{mission.location || "Seethawaka / Hybrid"}</span>
                </div>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2.5 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-border-card">
                <div className="flex items-center gap-1.5 font-pixel text-xs sm:text-sm font-bold text-regent-gold bg-[#02091F] px-2.5 py-1 border border-border-card">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+{mission.rewardXp} XP</span>
                </div>

                <RetroButton
                  variant="green"
                  size="sm"
                  onClick={() => alert(`Registered interest for: ${mission.title}! Official on-ground verification required.`)}
                >
                  ENROLL IN MISSION
                </RetroButton>
              </div>
            </div>
          </RetroCard>
        ))}
      </div>
    </div>
  );
}
