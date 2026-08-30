"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Compass,
  Lock,
  CheckCircle2,
  Sparkles,
  Play,
  MapPin,
  MessageSquare,
  Shield,
  Landmark,
  Layers,
} from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import PixelProgressBar from "@/components/ui/PixelProgressBar";
import WorldDivider from "@/components/ui/WorldDivider";
import { sevenAvenueRealms, realmLocations, RealmLocation } from "@/data/realmMapLocations";

interface LessonNode {
  title: string;
  completed: boolean;
  current?: boolean;
}

interface ChapterData extends RealmLocation {
  lessons: LessonNode[];
}

export default function JourneyPage() {
  const [activeNpcDialogue, setActiveNpcDialogue] = useState<{
    name: string;
    quote: string;
  } | null>(null);

  // Map canonical chapters with their lessons
  const canonicalChapters: ChapterData[] = [
    {
      ...realmLocations[0], // PROLOGUE: The Gateway
      lessons: [
        { title: "Welcome to the Realm of Regent", completed: true },
        { title: "The Prospect Explorer Pathway", completed: true },
      ],
    },
    {
      ...realmLocations[1], // CHAPTER 1: Rotary Roots
      lessons: [
        { title: "What is Rotary International?", completed: true },
        { title: "The Four-Way Test", completed: true },
        { title: "Service Above Self", completed: false, current: true },
        { title: "The Birth of Rotaract", completed: false },
      ],
    },
    {
      ...realmLocations[2], // CHAPTER 2: Rotaract Harbor
      lessons: [
        { title: "The Global Rotaract Movement", completed: false },
        { title: "Twin Clubs & Global Fellowship", completed: false },
        { title: "District 3220 & Sri Lankan Network", completed: false },
      ],
    },
    {
      ...realmLocations[3], // CHAPTER 3: The Regent Odyssey
      lessons: [
        { title: "Our Charter Story & Founders", completed: false },
        { title: "Regent Culture, Identity & Pride", completed: false },
        { title: "Signature Club Initiatives", completed: false },
      ],
    },
    {
      ...realmLocations[4], // CHAPTER 4: The Seven Realms of Service
      lessons: [
        { title: "Heartland: Community Service", completed: false },
        { title: "The Hearth: Club Service", completed: false },
        { title: "The Forge: Professional Development", completed: false },
        { title: "Far Harbor: International Service", completed: false },
        { title: "Signal Spire: Public Relations", completed: false },
        { title: "Grand Arena: Sports & Recreation", completed: false },
        { title: "Treasury Quarter: Finance", completed: false },
      ],
    },
    {
      ...realmLocations[5], // CHAPTER 5: Project Forge
      lessons: [
        { title: "Drafting the Project Blueprint", completed: false },
        { title: "Resource Mobilization & Sponsorship", completed: false },
        { title: "PR, Media & Event Logistics", completed: false },
      ],
    },
    {
      ...realmLocations[6], // CHAPTER 6: The Regent Code
      lessons: [
        { title: "Meeting Protocols & Standing Orders", completed: false },
        { title: "Leadership Ethics & The Four-Way Test", completed: false },
        { title: "Constitutional Bylaws & Voting", completed: false },
      ],
    },
    {
      ...realmLocations[7], // CHAPTER 7: Grand Archive
      lessons: [
        { title: "ROTA 101: The Official Handbook", completed: false },
        { title: "District Citations & Awards Criteria", completed: false },
        { title: "Club Administration Archive", completed: false },
      ],
    },
    {
      ...realmLocations[8], // CHAPTER 8: Impact Frontier
      lessons: [
        { title: "Attending Your First Club Assembly", completed: false },
        { title: "Joining an On-Ground Community Camp", completed: false },
        { title: "Prospect Action Directives", completed: false },
      ],
    },
    {
      ...realmLocations[9], // CHAPTER 9: Membership Citadel
      lessons: [
        { title: "The Regent Member Oath", completed: false },
        { title: "Official Pinning & Induction Ceremony", completed: false },
      ],
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-12">
      {/* Top Navigation Breadcrumb */}
      <div className="flex items-center justify-between pb-3 border-b border-border-card mb-6">
        <Link
          href="/home"
          className="flex items-center gap-2 font-pixel text-xs text-regent-blue hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO REALM MAP
        </Link>
        <span className="font-pixel text-xs text-regent-gold">
          10-PART EXPEDITION PATH
        </span>
      </div>

      {/* World Map Title Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex p-3 bg-[#071331] border-2 border-regent-gold mb-3 shadow-retro-card">
          <Compass className="w-7 h-7 text-regent-gold animate-bounce-slight" />
        </div>
        <h1 className="font-pixel text-2xl sm:text-3xl font-bold text-white tracking-wide">
          REGENT ADVENTURE PATH
        </h1>
        <p className="font-body text-xs sm:text-sm text-text-secondary mt-2 max-w-xl mx-auto leading-relaxed">
          Journey through the 9 canonical chapters and prologue. Complete quests across all 7 avenues to level up and prepare for official induction.
        </p>
      </div>

      {/* NPC Dialogue Toast Notification */}
      {activeNpcDialogue && (
        <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 max-w-sm bg-[#09173a] border-2 border-regent-gold p-3.5 shadow-retro-card animate-bounce-slight text-white">
          <div className="flex items-center justify-between pb-1 mb-1.5 border-b border-regent-gold/40">
            <span className="font-pixel text-xs text-regent-gold font-bold">
              NPC: {activeNpcDialogue.name.toUpperCase()}
            </span>
            <button
              onClick={() => setActiveNpcDialogue(null)}
              className="text-xs text-text-muted hover:text-white px-1"
            >
              ✕
            </button>
          </div>
          <p className="font-body text-xs text-text-secondary italic leading-relaxed">
            {activeNpcDialogue.quote}
          </p>
        </div>
      )}

      {/* Chapter Cards Streamlined List */}
      <div className="space-y-7">
        {canonicalChapters.map((chapter, idx) => (
          <React.Fragment key={chapter.id}>
            {idx > 0 && (
              <WorldDivider
                label={chapter.isPrologue ? "THE GATEWAY" : `ROUTE TO ${chapter.chapterLabel}`}
                icon="path"
              />
            )}

            <RetroCard
              className={`overflow-hidden ${
                chapter.status === "LOCKED"
                  ? "opacity-85 border-border-card"
                  : chapter.status === "COMPLETED"
                  ? "border-green-800/80 shadow-retro-card"
                  : "border-regent-blue shadow-retro-card-lg"
              }`}
            >
              {/* Illustrated Header Banner */}
              <div className="relative w-full h-36 sm:h-44 md:h-48 overflow-hidden">
                <Image
                  src={chapter.image}
                  alt={chapter.worldName}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071331] via-[#071331]/60 to-transparent" />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-regent-maroon text-white font-pixel text-[10px] sm:text-xs font-bold uppercase border border-red-950">
                      {chapter.chapterLabel}
                    </span>
                    <span className="px-2 py-0.5 bg-[#02091F]/90 text-text-secondary font-pixel text-[10px] sm:text-xs border border-border-card flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-regent-blue" /> {chapter.worldName}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 bg-[#02091F]/90 text-regent-gold font-pixel text-[10px] sm:text-xs border border-yellow-900/60 flex items-center gap-1 font-bold">
                    <Sparkles className="w-3 h-3" /> +{chapter.xpReward} XP
                  </span>
                </div>

                {/* Title & World Info */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <h2 className="font-pixel text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {chapter.chapterTitle}
                  </h2>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-5 bg-[#071331]">
                {/* Seethawaka Heritage Inspiration Badge */}
                {chapter.seethawakaInspiration && (
                  <div className="mb-2.5 px-2.5 py-1 bg-[#02091F] border border-regent-gold/40 text-[10px] font-pixel text-regent-gold flex items-center gap-1.5 max-w-fit shadow-sm">
                    <Landmark className="w-3.5 h-3.5 text-regent-gold shrink-0" />
                    <span className="truncate">{chapter.seethawakaInspiration}</span>
                  </div>
                )}

                {/* Short Description */}
                <p className="font-body text-xs sm:text-sm text-text-secondary leading-relaxed mb-3.5">
                  {chapter.description}
                </p>

                {/* The Seven Realms: 2-Column Responsive Tile Grid */}
                {chapter.id === "loc-seven-realms" && (
                  <div className="mb-4 p-3 bg-[#03091B] border border-border-card">
                    <div className="flex items-center gap-1.5 mb-2 text-xs font-pixel text-regent-gold uppercase tracking-wider">
                      <Layers className="w-3.5 h-3.5" />
                      <span>The 7 Themed Avenue Realms:</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {sevenAvenueRealms.map((realm) => (
                        <div
                          key={realm.id}
                          className={`p-2 ${realm.bgColor} border ${realm.borderColor} flex items-start justify-between gap-2`}
                        >
                          <div className="min-w-0">
                            <span className="font-pixel text-xs text-white font-bold block truncate">
                              {realm.realmTitle}
                            </span>
                            <span className="text-[10px] text-text-muted block truncate">
                              {realm.name}
                            </span>
                            <p className="text-[10px] text-text-secondary line-clamp-1 mt-0.5">
                              {realm.tagline}
                            </p>
                          </div>
                          <span className={`text-[9px] font-pixel px-1.5 py-0.2 border border-border-card/40 ${realm.color} shrink-0`}>
                            AVENUE
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* NPC Dialogue Box */}
                {chapter.npc && (
                  <div className="mb-4 p-2.5 bg-[#03091B] border border-border-card flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 bg-regent-maroon border border-regent-gold flex items-center justify-center font-pixel text-xs font-bold text-regent-gold shrink-0">
                        {chapter.npc.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <span className="font-pixel text-xs text-regent-gold block truncate">
                          NPC: {chapter.npc.name}
                        </span>
                        <span className="text-[10px] text-text-muted block truncate">
                          {chapter.npc.role}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveNpcDialogue(chapter.npc)}
                      className="px-2 py-1 bg-[#071331] hover:bg-regent-blue hover:text-black border border-border-card text-[10px] font-pixel text-regent-blue transition-colors flex items-center gap-1 shrink-0"
                    >
                      <MessageSquare className="w-3 h-3" /> TALK
                    </button>
                  </div>
                )}

                {/* Progress Bar for Active Chapter */}
                {chapter.status === "CURRENT" && (
                  <div className="mb-4 bg-[#02091F] p-2.5 border border-border-card">
                    <div className="flex items-center justify-between text-xs font-pixel mb-1">
                      <span className="text-regent-blue">CHAPTER PROGRESS</span>
                      <span className="text-white font-bold">
                        {Math.round((chapter.lessonsCompleted / chapter.lessonsTotal) * 100)}% COMPLETE
                      </span>
                    </div>
                    <PixelProgressBar
                      progress={(chapter.lessonsCompleted / chapter.lessonsTotal) * 100}
                      color="blue"
                      showLabel={false}
                      size="sm"
                    />
                  </div>
                )}

                {/* Quest Nodes */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center justify-between text-[10px] font-pixel text-text-muted">
                    <span>QUEST NODES:</span>
                    <span>{chapter.lessonsTotal} LESSONS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {chapter.lessons.map((lesson, lIdx) => (
                      <div
                        key={lIdx}
                        className={`p-2 border flex items-center justify-between text-xs min-w-0 ${
                          lesson.completed
                            ? "bg-[#04152e] border-regent-blue/40 text-text-secondary"
                            : lesson.current
                            ? "bg-[#091f42] border-regent-blue text-white font-medium shadow-[0_0_8px_rgba(32,169,246,0.3)]"
                            : "bg-[#02091F] border-border-card text-text-muted"
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          {lesson.completed ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-regent-green shrink-0" />
                          ) : lesson.current ? (
                            <Play className="w-3.5 h-3.5 text-regent-blue fill-regent-blue shrink-0 animate-pulse" />
                          ) : (
                            <Lock className="w-3 h-3 text-text-muted shrink-0" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </span>

                        {lesson.current && (
                          <span className="font-pixel text-[8px] text-regent-blue uppercase shrink-0 font-bold ml-1">
                            ACTIVE
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Footer Actions */}
                <div className="pt-2.5 border-t border-border-card flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <div className="text-[10px] font-pixel text-text-muted flex items-center gap-1">
                    <Shield className="w-3.5 h-3.5 text-regent-gold shrink-0" />
                    <span>BADGE: <strong>{chapter.badgeReward}</strong></span>
                  </div>

                  {chapter.status === "CURRENT" ? (
                    <RetroButton
                      variant="blue"
                      size="sm"
                      onClick={() => alert(`Entering ${chapter.chapterTitle}: Next lesson '${chapter.nextLesson}'...`)}
                    >
                      ENTER REALM QUEST
                    </RetroButton>
                  ) : chapter.status === "COMPLETED" ? (
                    <RetroButton variant="outline" size="sm">
                      REVISIT COMPLETED CHAPTER
                    </RetroButton>
                  ) : (
                    <RetroButton variant="outline" size="sm" disabled>
                      {chapter.unlockRequirement || "LOCKED • COMPLETE PREVIOUS CHAPTER"}
                    </RetroButton>
                  )}
                </div>
              </div>
            </RetroCard>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
