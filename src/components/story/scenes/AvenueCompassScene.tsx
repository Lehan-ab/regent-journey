"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Compass, Star, Sparkles, X, Shield, Globe, Users, Trees, Briefcase, Handshake, Radio, Trophy, Sprout } from "lucide-react";
import { PairedAvenueInfo } from "@/types/story";

interface SceneProps {
  variant?: string;
  sceneEvent?: string;
  atmosphereTitle?: string;
  pairedAvenues?: PairedAvenueInfo;
}

interface AvenueNode {
  id: string;
  name: string;
  classification: "PRIMARY" | "SECONDARY";
  purpose: string;
  lessonId: string;
  lessonNumber: string;
  color: string;
}

export const ELEVEN_AVENUE_NODES: AvenueNode[] = [
  // 4 Primary Avenues
  {
    id: "club-service",
    name: "Club Service",
    classification: "PRIMARY",
    purpose: "Nurturing member fellowship, traditions, bonding, and internal operational vitality of the club.",
    lessonId: "lesson-4-1",
    lessonNumber: "4-1",
    color: "#EAB308", // gold
  },
  {
    id: "community-service",
    name: "Community Service",
    classification: "PRIMARY",
    purpose: "Direct grassroots action addressing genuine community needs, health, education, and social empowerment.",
    lessonId: "lesson-4-2",
    lessonNumber: "4-2",
    color: "#10B981", // emerald
  },
  {
    id: "international-service",
    name: "International Service",
    classification: "PRIMARY",
    purpose: "Promoting cross-border friendship, peace initiatives, international twin-club understanding, and global harmony.",
    lessonId: "lesson-4-3",
    lessonNumber: "4-3",
    color: "#3B82F6", // blue
  },
  {
    id: "professional-development",
    name: "Professional Development",
    classification: "PRIMARY",
    purpose: "Enhancing career readiness, ethical leadership, vocational skills, and personal growth for young leaders.",
    lessonId: "lesson-4-4",
    lessonNumber: "4-4",
    color: "#F59E0B", // amber
  },

  // 7 Secondary Avenues
  {
    id: "environmental-service",
    name: "Environmental Service",
    classification: "SECONDARY",
    purpose: "Tree planting, coastal cleanups, biodiversity conservation, sustainable practices, and climate action.",
    lessonId: "lesson-4-2",
    lessonNumber: "4-2",
    color: "#059669", // dark emerald
  },
  {
    id: "strategic-partnerships",
    name: "Partnerships",
    classification: "SECONDARY",
    purpose: "Collaborating with external corporate partners, NGOs, sponsors, and educational institutions for shared value.",
    lessonId: "lesson-4-4",
    lessonNumber: "4-4",
    color: "#8B5CF6", // purple
  },
  {
    id: "membership-development",
    name: "Membership Development",
    classification: "SECONDARY",
    purpose: "Attracting, inducting, engaging, and retaining passionate changemakers across their Rotaract journey.",
    lessonId: "lesson-4-6",
    lessonNumber: "4-6",
    color: "#14B8A6", // teal
  },
  {
    id: "public-relations",
    name: "Public Relations",
    classification: "SECONDARY",
    purpose: "Storytelling, brand guardianship, trilingual communications, and digital voice of Rotaract.",
    lessonId: "lesson-4-5",
    lessonNumber: "4-5",
    color: "#EC4899", // pink
  },
  {
    id: "sports-recreation",
    name: "Sports & Recreational Activities",
    classification: "SECONDARY",
    purpose: "Healthy living, sporting tournaments, outdoor camaraderie, team-building, and wellness initiatives.",
    lessonId: "lesson-4-6",
    lessonNumber: "4-6",
    color: "#EF4444", // red
  },
  {
    id: "special-projects",
    name: "Special Projects",
    classification: "SECONDARY",
    purpose: "Agile, thematic, or District-mandated annual flagship impact projects addressing urgent emerging priorities.",
    lessonId: "lesson-4-5",
    lessonNumber: "4-5",
    color: "#F97316", // orange
  },
  {
    id: "regional-engagement",
    name: "Regional Engagement",
    classification: "SECONDARY",
    purpose: "Inter-club regional connectivity, joint District initiatives, and bridging geographical club networks.",
    lessonId: "lesson-4-3",
    lessonNumber: "4-3",
    color: "#06B6D4", // cyan
  },
];

export default function AvenueCompassScene({
  variant = "celestial-overview",
  sceneEvent,
  atmosphereTitle = "The 11 Celestial Avenues of Rotaract",
  pairedAvenues,
}: SceneProps) {
  const [selectedAvenue, setSelectedAvenue] = useState<AvenueNode | null>(null);

  const isHeartlandTrail = variant === "heartland-trail";
  const isGlobalRegional = variant === "global-regional-map";
  const isWorkshopMarket = variant === "workshop-market";
  const isSpireSquare = variant === "spire-square";
  const isArenaGrove = variant === "arena-grove";
  const isCelestialOverview = variant === "celestial-overview" || (!isHeartlandTrail && !isGlobalRegional && !isWorkshopMarket && !isSpireSquare && !isArenaGrove);

  return (
    <div className="relative w-full h-full min-h-[250px] sm:min-h-[310px] bg-gradient-to-b from-[#080518] via-[#100928] to-[#060410] overflow-hidden flex flex-col justify-between p-3 sm:p-4">
      {/* 1. Deep Cosmos Starlight Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-purple-950/20 to-transparent pointer-events-none" />

      {/* Constellation Star Twinkles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(11)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: [0.2, 0.9, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2.5 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.25,
            }}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-200 blur-[0.5px]"
            style={{
              top: `${15 + (i * 7)}%`,
              left: `${8 + (i * 8)}%`,
            }}
          />
        ))}
      </div>

      {/* Paired Avenue Notice Banner */}
      {pairedAvenues?.isDualAvenue && (
        <div className="relative z-10 mb-2 px-2.5 py-1.5 bg-gradient-to-r from-indigo-950/90 via-purple-950/90 to-indigo-950/90 border border-regent-gold/60 text-[10px] font-pixel text-regent-gold flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-regent-gold shrink-0" />
            <span className="font-bold tracking-wide">
              TWO DISTINCT AVENUE PATHS EXPLORED IN THIS EXPEDITION
            </span>
          </div>
          <span className="text-white/80 text-[9px] hidden sm:inline font-serif italic">
            Primary: {pairedAvenues.primaryAvenue} + Secondary: {pairedAvenues.secondaryAvenue}
          </span>
        </div>
      )}

      {/* 2. Visual Staging for Distinct Chapter 4 Lessons */}
      <div className="relative z-10 my-auto py-1">
        {/* VARIANT 4-1: FULL 11-NODE CELESTIAL CONSTELLATION OVERVIEW */}
        {isCelestialOverview && (
          <div>
            <div className="text-center mb-2">
              <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#070514]/90 border border-cyan-400/40 text-[9px] font-pixel text-cyan-300 uppercase">
                <Compass className="w-3 h-3 text-cyan-400" />
                <span>Tap Any Avenue Node to Inspect Handbook Purpose</span>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1.5 sm:gap-2 max-w-2xl mx-auto">
              {ELEVEN_AVENUE_NODES.map((avenue) => {
                const isPrimary = avenue.classification === "PRIMARY";
                return (
                  <motion.button
                    key={avenue.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedAvenue(avenue)}
                    className={`p-1.5 sm:p-2 border text-left flex flex-col justify-between min-h-[50px] sm:min-h-[58px] transition-all relative ${
                      isPrimary
                        ? "bg-indigo-950/80 border-regent-gold/80 hover:border-regent-gold shadow-md"
                        : "bg-[#0F0A24]/70 border-cyan-900/60 hover:border-cyan-400/80"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span
                        className={`text-[8px] font-pixel font-bold px-1 py-0.2 border ${
                          isPrimary
                            ? "bg-amber-950 text-regent-gold border-amber-500"
                            : "bg-cyan-950 text-cyan-300 border-cyan-700"
                        }`}
                      >
                        {isPrimary ? "PRIMARY" : "SEC"}
                      </span>
                      <span className="text-[8px] font-pixel text-[#888]">
                        {avenue.lessonNumber}
                      </span>
                    </div>

                    <div className="font-pixel text-[10px] text-white truncate font-bold mt-1">
                      {avenue.name}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* VARIANT 4-2: SPLIT SCENE — COMMUNITY SERVICE (LEFT) & ENVIRONMENTAL SERVICE (RIGHT) */}
        {/* Strictly adheres to prompt: Community Service (Heartland) vs Environmental Service (Green Trail) — NO Club Service! */}
        {isHeartlandTrail && (
          <div className="max-w-lg mx-auto w-full">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Left: Community Service (Heartland Village & People) */}
              <div className="p-3 bg-gradient-to-b from-[#052414] to-[#02140A] border-2 border-emerald-500/80 text-center flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-400 flex items-center justify-center mb-1 text-emerald-300 shadow-[0_0_10px_#10B981]">
                  <Users className="w-4 h-4" />
                </div>
                <div className="text-[8px] font-pixel text-emerald-300 uppercase tracking-widest font-bold">
                  COMMUNITY SERVICE (PRIMARY)
                </div>
                <div className="text-[10px] font-serif text-emerald-100 font-bold mt-1">
                  Heartland: Grassroots Action
                </div>
                <p className="text-[9px] font-serif text-emerald-200/80 mt-0.5">
                  Community health, education, and genuine grassroots empowerment.
                </p>
              </div>

              {/* Right: Environmental Service (Green Trail & Ecological Conservation) */}
              <div className="p-3 bg-gradient-to-b from-[#032612] to-[#011408] border-2 border-green-500/80 text-center flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-950 border border-green-400 flex items-center justify-center mb-1 text-green-300 shadow-[0_0_10px_#059669]">
                  <Trees className="w-4 h-4" />
                </div>
                <div className="text-[8px] font-pixel text-green-300 uppercase tracking-widest font-bold">
                  ENVIRONMENTAL SERVICE (SEC)
                </div>
                <div className="text-[10px] font-serif text-green-100 font-bold mt-1">
                  Green Trail: Living Planet
                </div>
                <p className="text-[9px] font-serif text-green-200/80 mt-0.5">
                  Biodiversity conservation, tree planting, and climate stewardship.
                </p>
              </div>
            </div>

            <p className="text-center text-[10px] font-serif italic text-cyan-200/90 mt-2">
              Two distinct avenues: Serving human communities alongside our living planet.
            </p>
          </div>
        )}

        {/* VARIANT 4-3: INTERNATIONAL SERVICE & REGIONAL BRIDGES */}
        {isGlobalRegional && (
          <div className="max-w-lg mx-auto w-full">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="p-3 bg-[#04162C] border-2 border-blue-500/80 text-center flex flex-col items-center">
                <Globe className="w-7 h-7 text-blue-300 mb-1" />
                <div className="text-[8px] font-pixel text-blue-300 uppercase font-bold">
                  INTERNATIONAL SERVICE (PRIMARY)
                </div>
                <p className="text-[9px] font-serif text-blue-100 mt-1">
                  Cross-border peace, global fellowship & twin-club partnerships.
                </p>
              </div>

              <div className="p-3 bg-[#031D28] border-2 border-cyan-500/80 text-center flex flex-col items-center">
                <Compass className="w-7 h-7 text-cyan-300 mb-1" />
                <div className="text-[8px] font-pixel text-cyan-300 uppercase font-bold">
                  REGIONAL ENGAGEMENT (SEC)
                </div>
                <p className="text-[9px] font-serif text-cyan-100 mt-1">
                  Inter-club connectivity across District 3220 regions.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VARIANT 4-4: PROFESSIONAL DEVELOPMENT & STRATEGIC PARTNERSHIPS */}
        {/* Strictly adheres to prompt: Professional Growth + Strategic Partnerships (NO generic economic stalls) */}
        {isWorkshopMarket && (
          <div className="max-w-lg mx-auto w-full">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {/* Professional Development */}
              <div className="p-3 bg-[#1C1204] border-2 border-amber-500/80 text-center flex flex-col items-center">
                <Briefcase className="w-7 h-7 text-amber-300 mb-1" />
                <div className="text-[8px] font-pixel text-amber-300 uppercase font-bold">
                  PROFESSIONAL DEVELOPMENT (PRIMARY)
                </div>
                <p className="text-[9px] font-serif text-amber-100 mt-1">
                  Vocational workshops, career readiness, mentorship & ethical leadership.
                </p>
              </div>

              {/* Strategic Partnerships */}
              <div className="p-3 bg-[#160B24] border-2 border-purple-500/80 text-center flex flex-col items-center">
                <Handshake className="w-7 h-7 text-purple-300 mb-1" />
                <div className="text-[8px] font-pixel text-purple-300 uppercase font-bold">
                  PARTNERSHIPS (SEC)
                </div>
                <p className="text-[9px] font-serif text-purple-100 mt-1">
                  Partner accords, shared expertise, sponsor resources & NGO synergy.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VARIANT 4-5: PUBLIC RELATIONS & SPECIAL PROJECTS */}
        {isSpireSquare && (
          <div className="max-w-lg mx-auto w-full">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="p-3 bg-[#240A18] border-2 border-pink-500/80 text-center flex flex-col items-center">
                <Radio className="w-7 h-7 text-pink-300 mb-1 animate-pulse" />
                <div className="text-[8px] font-pixel text-pink-300 uppercase font-bold">
                  PUBLIC RELATIONS (SEC)
                </div>
                <p className="text-[9px] font-serif text-pink-100 mt-1">
                  District brand voice, trilingual storytelling & digital broadcast.
                </p>
              </div>

              <div className="p-3 bg-[#220E04] border-2 border-orange-500/80 text-center flex flex-col items-center">
                <Sparkles className="w-7 h-7 text-orange-300 mb-1" />
                <div className="text-[8px] font-pixel text-orange-300 uppercase font-bold">
                  SPECIAL PROJECTS (SEC)
                </div>
                <p className="text-[9px] font-serif text-orange-100 mt-1">
                  District-mandated flagship campaigns & emerging community needs.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* VARIANT 4-6: SPORTS & RECREATION & MEMBERSHIP DEVELOPMENT */}
        {isArenaGrove && (
          <div className="max-w-lg mx-auto w-full">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div className="p-3 bg-[#240808] border-2 border-red-500/80 text-center flex flex-col items-center">
                <Trophy className="w-7 h-7 text-red-300 mb-1" />
                <div className="text-[8px] font-pixel text-red-300 uppercase font-bold">
                  SPORTS & RECREATIONAL ACTIVITIES (SEC)
                </div>
                <p className="text-[9px] font-serif text-red-100 mt-1">
                  Team wellness, tournaments, outdoor endurance & sportsmanship.
                </p>
              </div>

              <div className="p-3 bg-[#041E1C] border-2 border-teal-500/80 text-center flex flex-col items-center">
                <Sprout className="w-7 h-7 text-teal-300 mb-1" />
                <div className="text-[8px] font-pixel text-teal-300 uppercase font-bold">
                  MEMBERSHIP DEVELOPMENT (SEC)
                </div>
                <p className="text-[9px] font-serif text-teal-100 mt-1">
                  Prospect recruitment, onboarding, engagement & retention pathway.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Tap Modal for Avenue Node Details */}
      <AnimatePresence>
        {selectedAvenue && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute inset-x-2 bottom-10 z-30 p-3 bg-[#0F0824] border-2 border-regent-gold shadow-2xl"
          >
            <div className="flex items-center justify-between pb-1 mb-1 border-b border-indigo-900">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: selectedAvenue.color }}
                />
                <span className="font-pixel text-xs text-regent-gold font-bold uppercase">
                  {selectedAvenue.name}
                </span>
                <span className="text-[8px] font-pixel text-indigo-300">
                  [{selectedAvenue.classification}]
                </span>
              </div>
              <button
                onClick={() => setSelectedAvenue(null)}
                className="text-gray-400 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <p className="font-serif text-xs text-[#E0D8F0] leading-relaxed">
              {selectedAvenue.purpose}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Ground Status Bar */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-pixel text-cyan-300/80 border-t border-indigo-900/60 pt-2 mt-auto">
        <div className="flex items-center gap-1.5">
          <Star className="w-3 h-3 text-cyan-400" />
          <span>{atmosphereTitle}</span>
        </div>
        <div className="px-2 py-0.5 bg-indigo-950/80 border border-indigo-700 text-[9px] uppercase tracking-wider">
          AVENUES: {variant.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
