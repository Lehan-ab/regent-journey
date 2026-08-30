"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Target, Sparkles, Clock, MapPin, CheckCircle } from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import { mockMissions } from "@/data/mockUserData";

export default function MissionsPage() {
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
          +500 XP AVAILABLE
        </span>
      </div>

      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex p-3 bg-green-950 border-2 border-regent-green mb-3">
          <Target className="w-8 h-8 text-regent-green" />
        </div>
        <h1 className="font-pixel text-2xl sm:text-3xl font-bold text-white tracking-wide">
          REGENT MISSIONS & QUESTS
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-2">
          Participate in physical meetings, hands-on community projects, and club service activities to turn knowledge into action.
        </p>
      </div>

      {/* Missions Grid */}
      <div className="space-y-4">
        {mockMissions.map((mission) => (
          <RetroCard key={mission.id} className="p-5 sm:p-6 bg-[#071331]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 bg-regent-maroon text-white font-pixel text-[10px] uppercase border border-red-950">
                    {mission.type}
                  </span>
                  <span className="px-2 py-0.5 bg-regent-blue/20 text-regent-blue font-pixel text-[10px] border border-regent-blue/50">
                    {mission.status}
                  </span>
                  <span className="text-xs font-pixel text-text-muted flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {mission.date}
                  </span>
                </div>

                <h3 className="font-pixel text-lg sm:text-xl font-bold text-white tracking-wide">
                  {mission.title}
                </h3>
                <p className="font-body text-xs sm:text-sm text-text-secondary">
                  {mission.tagline}
                </p>

                <div className="flex items-center gap-2 text-xs text-text-muted pt-1">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span>Seethawaka / Online Realm</span>
                </div>
              </div>

              <div className="flex flex-col sm:items-end gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-border-card">
                <div className="flex items-center gap-1.5 font-pixel text-sm font-bold text-regent-gold bg-[#02091F] px-3 py-1.5 border border-border-card">
                  <Sparkles className="w-4 h-4" />
                  <span>+{mission.rewardXp} XP</span>
                </div>

                <RetroButton
                  variant="green"
                  size="md"
                  onClick={() => alert(`Registered interest for: ${mission.title}! Officer verification required on-ground.`)}
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
