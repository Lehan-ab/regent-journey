"use client";

import React from "react";
import Image from "next/image";
import { Clock, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import { usePlayer } from "@/context/PlayerContext";
import { CANONICAL_MISSIONS } from "@/data/missionsData";

export default function NextMissionCard() {
  const { player, isHydrated } = usePlayer();

  // Find the first unverified mission (default to mission-1)
  const activeMission =
    CANONICAL_MISSIONS.find((m) => !player.missions?.verified?.includes(m.id)) ||
    CANONICAL_MISSIONS[0];

  const isVerified = isHydrated && player.missions?.verified?.includes(activeMission.id);
  const isEnrolled = isHydrated && player.missions?.enrolled?.includes(activeMission.id);

  return (
    <RetroCard
      headerTag="NEXT MISSION"
      headerColor="green"
      className="p-4 sm:p-5 bg-gradient-to-r from-[#071331] via-[#051829] to-[#071331] border-2 border-regent-green"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
        {/* Left: Thumbnail & Info */}
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#02091F] border-2 border-border-card shrink-0 overflow-hidden shadow-sm">
            <Image
              src={activeMission.image || "/images/mission_meeting.jpg"}
              alt={activeMission.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.2 bg-regent-maroon text-white font-pixel text-[9px] uppercase border border-red-950">
                {activeMission.type.toUpperCase()}
              </span>
              {isVerified ? (
                <span className="text-[9px] font-pixel text-regent-green flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3 h-3" /> VERIFIED
                </span>
              ) : isEnrolled ? (
                <span className="text-[9px] font-pixel text-regent-blue font-bold">
                  • ENROLLED
                </span>
              ) : (
                <span className="text-[10px] font-pixel text-text-muted flex items-center gap-1">
                  <Clock className="w-3 h-3 text-regent-gold" /> {activeMission.date}
                </span>
              )}
            </div>

            <h3 className="font-pixel text-sm sm:text-base font-bold text-white tracking-wide truncate">
              {activeMission.title}
            </h3>
            <p className="font-body text-xs text-text-secondary line-clamp-1">
              {activeMission.tagline}
            </p>
          </div>
        </div>

        {/* Right: Reward & Button */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border-card/50">
          <div className="flex items-center gap-1 text-regent-gold font-pixel text-xs font-bold bg-[#02091F] px-2.5 py-1 border border-yellow-900/60 shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+{activeMission.rewardXp} XP</span>
          </div>

          <RetroButton
            variant={isEnrolled ? "outline" : "green"}
            size="sm"
            href="/missions"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            {isVerified ? "VIEW QUEST" : isEnrolled ? "ENROLLED" : "VIEW MISSION"}
          </RetroButton>
        </div>
      </div>
    </RetroCard>
  );
}
