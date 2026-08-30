"use client";

import React, { useState, useEffect } from "react";
import { Hourglass, Trophy, Sparkles, Calendar } from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import ImpactBoardModal from "@/components/ui/ImpactBoardModal";

export default function DailyQuestCard() {
  const [formattedDate, setFormattedDate] = useState("");
  const [isImpactBoardOpen, setIsImpactBoardOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      weekday: "short",
    };
    setFormattedDate(today.toLocaleDateString("en-US", options).toUpperCase());
  }, []);

  return (
    <>
      <section className="w-full mb-8">
        <RetroCard
          headerTag="DAILY QUEST"
          headerColor="yellow"
          className="p-5 sm:p-6 pt-7 bg-gradient-to-br from-[#071331] to-[#040C24]"
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2 text-xs font-pixel text-regent-gold">
              <Calendar className="w-3.5 h-3.5" />
              <span>{formattedDate || "TODAY"}</span>
            </div>
            <span className="flex items-center gap-1 text-[10px] font-pixel text-text-muted bg-[#02091F] px-2 py-0.5 border border-border-card">
              <Sparkles className="w-2.5 h-2.5 text-regent-gold" /> +50 XP POTENTIAL
            </span>
          </div>

          <div className="flex items-center gap-3 my-3">
            <div className="p-3 bg-[#02091F] border-2 border-border-card text-regent-gold shadow-inner animate-bounce-slight">
              <Hourglass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-pixel text-lg sm:text-xl font-bold text-white tracking-wide">
                COMING SOON...
              </h3>
              <p className="text-xs text-text-muted font-pixel">
                QUEST ENGINE GENERATING
              </p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-5 font-body">
            Daily challenges will eventually help prospects build consistency, learn about Rotaract, and earn bonus Regent XP.
          </p>

          <RetroButton
            variant="yellow"
            size="md"
            fullWidth
            onClick={() => setIsImpactBoardOpen(true)}
            icon={<Trophy className="w-4 h-4" />}
          >
            IMPACT BOARD
          </RetroButton>
        </RetroCard>
      </section>

      <ImpactBoardModal
        isOpen={isImpactBoardOpen}
        onClose={() => setIsImpactBoardOpen(false)}
      />
    </>
  );
}
