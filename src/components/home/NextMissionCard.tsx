"use client";

import React from "react";
import Image from "next/image";
import { Clock, Sparkles, ArrowRight } from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";

export default function NextMissionCard() {
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
              src="/images/mission_meeting.jpg"
              alt="General Meeting"
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.2 bg-regent-maroon text-white font-pixel text-[9px] uppercase border border-red-950">
                ASSEMBLY
              </span>
              <span className="text-[10px] font-pixel text-text-muted flex items-center gap-1">
                <Clock className="w-3 h-3 text-regent-gold" /> 1st Sunday • 5:00 PM
              </span>
            </div>

            <h3 className="font-pixel text-sm sm:text-base font-bold text-white tracking-wide truncate">
              GENERAL MEETING: MEET THE REGENTS
            </h3>
            <p className="font-body text-xs text-text-secondary line-clamp-1">
              Attend the official club assembly & meet the board of directors.
            </p>
          </div>
        </div>

        {/* Right: Reward & Button */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border-card/50">
          <div className="flex items-center gap-1 text-regent-gold font-pixel text-xs font-bold bg-[#02091F] px-2.5 py-1 border border-yellow-900/60 shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+150 XP</span>
          </div>

          <RetroButton
            variant="green"
            size="sm"
            href="/missions"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            VIEW MISSION
          </RetroButton>
        </div>
      </div>
    </RetroCard>
  );
}
