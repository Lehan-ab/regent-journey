"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles, Trees, Shield } from "lucide-react";
import RetroButton from "@/components/ui/RetroButton";
import PixelProgressBar from "@/components/ui/PixelProgressBar";
import { mockUser } from "@/data/mockUserData";

export default function FeaturedJourneyCard() {
  return (
    <section className="w-full mb-8">
      {/* Section Heading */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-pixel text-base sm:text-lg font-bold text-white tracking-wider flex items-center gap-2">
          <Trees className="w-4 h-4 text-regent-green" />
          JUMP BACK IN
        </h2>
        <span className="text-xs text-text-muted font-pixel hidden sm:inline-block">
          CHAPTER 1 • CURRENT QUEST
        </span>
      </div>

      {/* Featured Card */}
      <div className="relative bg-background-card border-2 border-border-card text-white shadow-retro-card-lg overflow-hidden group">
        {/* Background Pixel Art with Dynamic Atmospheric Lighting */}
        <div className="relative w-full h-64 sm:h-72 md:h-80">
          <Image
            src="/images/rotary_roots.jpg"
            alt="Rotary Roots Ancient Banyan Forest"
            fill
            priority
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Gradients tailored to highlight the ancient banyan tree artwork while ensuring crisp text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071331] via-[#071331]/80 to-transparent" />
          <div className="absolute inset-0 bg-[#02091F]/20" />

          {/* Top Progress Bar Module */}
          <div className="absolute top-4 left-4 right-4 z-10">
            <div className="bg-[#02091F]/90 border border-border-card p-3 backdrop-blur-sm shadow-md">
              <div className="flex items-center justify-between gap-2 mb-1.5 font-pixel text-xs">
                <span className="text-regent-gold flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> ROTARY ROOTS PROGRESS
                </span>
                <span className="text-white font-bold">{mockUser.journeyProgress}%</span>
              </div>
              <PixelProgressBar
                progress={mockUser.journeyProgress}
                color="green"
                showLabel={false}
                size="sm"
              />
            </div>
          </div>

          {/* Bottom Card Content */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            {/* Journey Pill & XP Bounty */}
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="px-2.5 py-0.5 bg-regent-maroon text-white font-pixel text-[10px] sm:text-xs font-bold uppercase tracking-wider border border-red-950 shadow-sm">
                CHAPTER 1
              </span>
              <span className="px-2 py-0.5 bg-[#02091F]/90 text-regent-gold font-pixel text-[10px] sm:text-xs border border-yellow-900/50 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> +150 XP Reward
              </span>
            </div>

            {/* Large Title */}
            <h3 className="font-pixel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {mockUser.currentJourney.toUpperCase()}
            </h3>

            {/* Next Lesson Info */}
            <div className="mt-1 mb-4 flex items-center gap-2 text-xs sm:text-sm text-text-secondary bg-[#02091F]/60 p-1.5 max-w-fit border border-border-card/50">
              <BookOpen className="w-4 h-4 text-regent-blue shrink-0" />
              <span>
                Next quest:{" "}
                <strong className="text-white font-semibold">
                  {mockUser.nextLesson}
                </strong>
              </span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <RetroButton
                variant="blue"
                size="lg"
                href="/journey"
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="flex-1 sm:flex-initial"
              >
                CONTINUE JOURNEY
              </RetroButton>

              <Link
                href="/journey"
                className="inline-flex items-center justify-center font-pixel text-xs text-text-secondary hover:text-white px-3 py-2 border border-transparent hover:border-border-card transition-colors uppercase tracking-wider"
              >
                VIEW FULL JOURNEY
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
