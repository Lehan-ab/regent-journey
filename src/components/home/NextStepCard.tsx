"use client";

import React from "react";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import { mockUser } from "@/data/mockUserData";

export default function NextStepCard() {
  return (
    <RetroCard
      headerTag="YOUR NEXT STEP"
      headerColor="blue"
      className="p-4 sm:p-5 bg-gradient-to-r from-[#071331] via-[#091a42] to-[#071331] border-2 border-regent-blue"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
        {/* Left: Next Quest Details */}
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[11px] sm:text-xs text-regent-gold font-bold uppercase tracking-wider truncate">
              {mockUser.currentChapterLabel}: {mockUser.currentJourney.toUpperCase()}
            </span>
            <span className="text-text-muted text-[11px] font-pixel shrink-0">• Lesson 3</span>
          </div>

          <h3 className="font-pixel text-base sm:text-lg font-bold text-white tracking-wide flex items-center gap-2 truncate">
            <BookOpen className="w-4 h-4 text-regent-blue shrink-0" />
            <span className="truncate">{mockUser.nextLesson}</span>
          </h3>

          <p className="font-body text-xs text-text-secondary line-clamp-2">
            Master the core ethical ethos of Rotary and discover how service transforms communities.
          </p>
        </div>

        {/* Right: XP Bounty & Action CTA */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border-card/50">
          <div className="flex items-center gap-1 text-regent-gold font-pixel text-xs font-bold bg-[#02091F] px-2.5 py-1 border border-yellow-900/60 shrink-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span>+20 XP</span>
          </div>

          <RetroButton
            variant="blue"
            size="sm"
            href="/journey"
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            CONTINUE JOURNEY
          </RetroButton>
        </div>
      </div>
    </RetroCard>
  );
}
