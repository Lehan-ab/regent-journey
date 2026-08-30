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
  BookOpen,
  Landmark,
  Heart,
  Users,
  Globe,
  Megaphone,
  Trophy,
  Coins,
} from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import PixelProgressBar from "@/components/ui/PixelProgressBar";
import WorldDivider from "@/components/ui/WorldDivider";
import { sevenAvenueRealms } from "@/data/realmMapLocations";

interface LessonNode {
  title: string;
  completed: boolean;
  current?: boolean;
}

interface ChapterLocation {
  id: number;
  chapterNumber: number;
  title: string;
  location: string;
  seethawakaInspiration: string;
  description: string;
  image: string;
  status: "IN_PROGRESS" | "LOCKED" | "COMPLETED";
  progress: number;
  lessonCount: number;
  xpReward: number;
  badgeReward: string;
  isSevenAvenues?: boolean;
  npc?: {
    name: string;
    role: string;
    quote: string;
  };
  lessons: LessonNode[];
}

export default function JourneyPage() {
  const [activeNpcDialogue, setActiveNpcDialogue] = useState<{
    name: string;
    quote: string;
  } | null>(null);

  const worldLocations: ChapterLocation[] = [
    {
      id: 1,
      chapterNumber: 1,
      title: "ROTARY ROOTS",
      location: "Sacred Botanical Canopy",
      seethawakaInspiration: "Seethawaka Botanical Garden (Ilangakoon)",
      description:
        "Inspired by the lush Seethawaka Botanical Garden. Walk along flower paths and ancient trees where Rotary's core philosophy of 'Service Above Self' was first etched into stone.",
      image: "/images/rotary_roots.jpg",
      status: "IN_PROGRESS",
      progress: 35,
      lessonCount: 4,
      xpReward: 150,
      badgeReward: "ROOT SEEKER",
      npc: {
        name: "The Archivist",
        role: "Ancient Lore Keeper",
        quote: "“Before you branch into the world, your roots must run deep in service and truth.”",
      },
      lessons: [
        { title: "What is Rotary International?", completed: true },
        { title: "The Four-Way Test", completed: true },
        { title: "Service Above Self", completed: false, current: true },
        { title: "The Birth of Rotaract", completed: false },
      ],
    },
    {
      id: 2,
      chapterNumber: 2,
      title: "REGENT ODYSSEY",
      location: "The High Mountain Keep",
      seethawakaInspiration: "Ruins of King Rajasinghe I's Castle Fortress",
      description:
        "Ascend the mountain ruins inspired by King Rajasinghe's historical Seethawaka fortress. Discover the charter story, traditions, and pride of the Rotaract Club of Seethawaka Regent.",
      image: "/images/chapter2_odyssey.jpg",
      status: "LOCKED",
      progress: 0,
      lessonCount: 3,
      xpReward: 200,
      badgeReward: "REGENT PIONEER",
      npc: {
        name: "The Keeper",
        role: "Guardian of Regent Lore",
        quote: "“Regent pride is built on action, fellowship, and unwavering commitment to our Seethawaka heritage.”",
      },
      lessons: [
        { title: "Our Charter Story", completed: false },
        { title: "Club Culture & Traditions", completed: false },
        { title: "Signature Club Initiatives", completed: false },
      ],
    },
    {
      id: 3,
      chapterNumber: 3,
      title: "THE SEVEN REALMS OF SERVICE",
      location: "Avenue Overworld Map",
      seethawakaInspiration: "The 7 Core Service Pillars of RACSR",
      description:
        "Explore all seven dynamic avenue territories: Heartland (Community), The Hearth (Club), The Forge (Professional Dev), Far Harbor (International), Signal Spire (PR), Grand Arena (Sports & Recreation), and Treasury Hall (Finance).",
      image: "/images/chapter3_realms.jpg",
      status: "LOCKED",
      progress: 0,
      lessonCount: 7,
      xpReward: 350,
      badgeReward: "AVENUE MASTER",
      isSevenAvenues: true,
      npc: {
        name: "Avenue Guide",
        role: "Realm Navigator",
        quote: "“Every explorer has their element. From the Grand Arena to Treasury Hall, where will your greatest passion ignite?”",
      },
      lessons: [
        { title: "Heartland: Community Service", completed: false },
        { title: "The Hearth: Club Service", completed: false },
        { title: "The Forge: Professional Development", completed: false },
        { title: "Far Harbor: International Service", completed: false },
        { title: "Signal Spire: Public Relations", completed: false },
        { title: "Grand Arena: Sports & Recreation", completed: false },
        { title: "Treasury Hall: Finance & Fundraising", completed: false },
      ],
    },
    {
      id: 4,
      chapterNumber: 4,
      title: "PROJECT FORGE",
      location: "The Craftsman Workshop",
      seethawakaInspiration: "Seethawaka Industrial & Traditional Craft Heritage",
      description:
        "Learn how a raw community idea is hammered into a sustainable project through proposal drafting, Treasury budgeting, and on-ground logistics.",
      image: "/images/chapter4_forge.jpg",
      status: "LOCKED",
      progress: 0,
      lessonCount: 4,
      xpReward: 250,
      badgeReward: "MASTER BUILDER",
      npc: {
        name: "The Builder",
        role: "Master Project Crafter",
        quote: "“In the forge of service, passion meets discipline to create lasting community change.”",
      },
      lessons: [
        { title: "Drafting the Project Blueprint", completed: false },
        { title: "Resource Mobilization & Sponsorship", completed: false },
        { title: "PR & Event Logistics", completed: false },
      ],
    },
    {
      id: 5,
      chapterNumber: 5,
      title: "THE REGENT CODE",
      location: "Hall of Standards",
      seethawakaInspiration: "Historical Seethawaka Royal Standards & Ethics",
      description:
        "Master meeting protocols, parliamentary procedures, constitution bylaws, and leadership ethics that define a true Regent.",
      image: "/images/realm_of_regent_hero.jpg",
      status: "LOCKED",
      progress: 0,
      lessonCount: 3,
      xpReward: 250,
      badgeReward: "CODE BEARER",
      npc: {
        name: "The Scholar",
        role: "Ethics Master",
        quote: "“Integrity is what we do when no one is watching.”",
      },
      lessons: [
        { title: "Meeting Protocols & Standing Orders", completed: false },
        { title: "The Ethical Standard & Four-Way Test", completed: false },
      ],
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between pb-4 border-b border-border-card mb-6">
        <Link
          href="/home"
          className="flex items-center gap-2 font-pixel text-xs text-regent-blue hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO REALM MAP
        </Link>
        <span className="font-pixel text-xs text-regent-gold">
          SEETHAWAKA WORLD PATH • 5 REALMS DISCOVERED
        </span>
      </div>

      {/* World Map Title Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex p-3 bg-[#071331] border-2 border-regent-gold mb-3 shadow-[0_4px_0_#02091F]">
          <Compass className="w-8 h-8 text-regent-gold animate-bounce-slight" />
        </div>
        <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
          REGENT ADVENTURE PATH
        </h1>
        <p className="font-body text-xs sm:text-sm text-text-secondary mt-2 max-w-xl mx-auto leading-relaxed">
          Journey across illustrated world destinations inspired by real Seethawaka landmarks. Complete quests across all 7 avenues to level up and prepare for membership induction.
        </p>
      </div>

      {/* NPC Dialogue Popup Toast */}
      {activeNpcDialogue && (
        <div className="fixed bottom-20 sm:bottom-8 right-4 sm:right-8 z-50 max-w-sm bg-[#09173a] border-2 border-regent-gold p-4 shadow-retro-card animate-bounce-slight text-white">
          <div className="flex items-center justify-between pb-1 mb-2 border-b border-regent-gold/40">
            <span className="font-pixel text-xs text-regent-gold font-bold">
              NPC: {activeNpcDialogue.name.toUpperCase()}
            </span>
            <button
              onClick={() => setActiveNpcDialogue(null)}
              className="text-xs text-text-muted hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="font-body text-xs text-text-secondary italic">
            {activeNpcDialogue.quote}
          </p>
        </div>
      )}

      {/* World Location Cards */}
      <div className="space-y-8">
        {worldLocations.map((chapter, idx) => (
          <React.Fragment key={chapter.id}>
            {idx > 0 && <WorldDivider label={`ROUTE TO CHAPTER ${chapter.chapterNumber}`} icon="path" />}

            <RetroCard
              className={`overflow-hidden ${
                chapter.status === "LOCKED" ? "opacity-85 border-border-card" : "border-regent-blue shadow-retro-card-lg"
              }`}
            >
              {/* Illustrated Banner Header */}
              <div className="relative w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                <Image
                  src={chapter.image}
                  alt={chapter.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071331] via-[#071331]/60 to-transparent" />

                {/* Top Location & Chapter Pills */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-regent-maroon text-white font-pixel text-[10px] sm:text-xs font-bold uppercase border border-red-950">
                      CHAPTER {chapter.chapterNumber}
                    </span>
                    <span className="px-2.5 py-0.5 bg-[#02091F]/90 text-text-secondary font-pixel text-[10px] sm:text-xs border border-border-card flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-regent-blue" /> {chapter.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 bg-[#02091F]/90 text-regent-gold font-pixel text-[10px] sm:text-xs border border-yellow-900/60 flex items-center gap-1 font-bold">
                      <Sparkles className="w-3 h-3" /> +{chapter.xpReward} XP
                    </span>
                  </div>
                </div>

                {/* Chapter Banner Title */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {chapter.title}
                  </h2>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6 bg-[#071331]">
                {/* Seethawaka Landmark Heritage Badge */}
                {chapter.seethawakaInspiration && (
                  <div className="mb-3 px-3 py-1.5 bg-[#02091F] border border-regent-gold/40 text-xs font-pixel text-regent-gold flex items-center gap-2 max-w-fit shadow-sm">
                    <Landmark className="w-4 h-4 text-regent-gold shrink-0" />
                    <span>Seethawaka Heritage: <strong>{chapter.seethawakaInspiration}</strong></span>
                  </div>
                )}

                <p className="font-body text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                  {chapter.description}
                </p>

                {/* 7 Avenue Sub-Realms Preview (For Chapter 3) */}
                {chapter.isSevenAvenues && (
                  <div className="mb-5 p-3.5 bg-[#03091B] border border-border-card">
                    <span className="font-pixel text-xs text-regent-gold uppercase tracking-wider block mb-2">
                      The 7 Themed Avenue Realms:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {sevenAvenueRealms.map((realm) => (
                        <div
                          key={realm.id}
                          className="p-2 bg-[#071331] border border-border-card/60 flex items-center justify-between"
                        >
                          <div>
                            <span className="font-pixel text-xs text-white font-bold block">
                              {realm.realmTitle}
                            </span>
                            <span className="text-[10px] text-text-muted">
                              {realm.name}
                            </span>
                          </div>
                          <span className={`text-[10px] font-pixel px-1.5 py-0.2 border border-border-card/40 ${realm.color}`}>
                            AVENUE
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* NPC Module */}
                {chapter.npc && (
                  <div className="mb-5 p-3 bg-[#03091B] border border-border-card flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-regent-maroon border border-regent-gold flex items-center justify-center font-pixel text-xs font-bold text-regent-gold shrink-0">
                        {chapter.npc.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-pixel text-xs text-regent-gold block">
                          {chapter.npc.name}
                        </span>
                        <span className="text-[10px] text-text-muted">
                          {chapter.npc.role}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveNpcDialogue(chapter.npc!)}
                      className="px-2.5 py-1 bg-[#071331] hover:bg-regent-blue hover:text-black border border-border-card text-[10px] font-pixel text-regent-blue transition-colors flex items-center gap-1 shrink-0"
                    >
                      <MessageSquare className="w-3 h-3" /> TALK TO NPC
                    </button>
                  </div>
                )}

                {/* Progress Bar for Active Chapter */}
                {chapter.status === "IN_PROGRESS" && (
                  <div className="mb-5 bg-[#02091F] p-3 border border-border-card">
                    <div className="flex items-center justify-between text-xs font-pixel mb-1.5">
                      <span className="text-regent-blue">CHAPTER PROGRESS</span>
                      <span className="text-white font-bold">{chapter.progress}% COMPLETE</span>
                    </div>
                    <PixelProgressBar
                      progress={chapter.progress}
                      color="blue"
                      showLabel={false}
                      size="md"
                    />
                  </div>
                )}

                {/* Lesson Nodes Grid */}
                <div className="space-y-2 mb-5">
                  <div className="flex items-center justify-between text-[11px] font-pixel text-text-muted">
                    <span>QUEST NODES:</span>
                    <span>{chapter.lessonCount} LESSONS</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {chapter.lessons.map((lesson, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 border flex items-center justify-between text-xs ${
                          lesson.completed
                            ? "bg-[#04152e] border-regent-blue/40 text-text-secondary"
                            : lesson.current
                            ? "bg-[#091f42] border-regent-blue text-white font-medium shadow-[0_0_10px_rgba(32,169,246,0.35)]"
                            : "bg-[#02091F] border-border-card text-text-muted"
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate">
                          {lesson.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-regent-green shrink-0" />
                          ) : lesson.current ? (
                            <Play className="w-4 h-4 text-regent-blue fill-regent-blue shrink-0 animate-pulse" />
                          ) : (
                            <Lock className="w-3.5 h-3.5 text-text-muted shrink-0" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </span>

                        {lesson.current && (
                          <span className="font-pixel text-[9px] text-regent-blue uppercase shrink-0 font-bold">
                            CURRENT
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-3 border-t border-border-card flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="text-[11px] font-pixel text-text-muted flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-regent-gold" />
                    <span>BADGE UNLOCK: <strong>{chapter.badgeReward}</strong></span>
                  </div>

                  {chapter.status === "IN_PROGRESS" ? (
                    <RetroButton
                      variant="blue"
                      size="md"
                      onClick={() => alert("Entering Chapter 1: 'Service Above Self' Lesson...")}
                    >
                      ENTER REALM QUEST
                    </RetroButton>
                  ) : (
                    <RetroButton variant="outline" size="sm" disabled>
                      LOCKED • COMPLETE PREVIOUS CHAPTER
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
