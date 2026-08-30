"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Target, Sparkles, Clock, ArrowRight, MapPin } from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";

export default function UpcomingMissionsSection() {
  const missionsWithArt = [
    {
      id: "mission-1",
      title: "GENERAL MEETING",
      tagline: "Meet the Regents and discover active club initiatives.",
      type: "Meeting",
      rewardXp: 150,
      status: "UPCOMING",
      date: "1st Sunday • 5:00 PM",
      thumbnail: "/images/mission_meeting.jpg",
    },
    {
      id: "mission-2",
      title: "COMMUNITY PROJECT",
      tagline: "Step into your first real project & make an on-ground impact.",
      type: "Community Service",
      rewardXp: 250,
      status: "AVAILABLE SOON",
      date: "Next Weekend",
      thumbnail: "/images/mission_community.jpg",
    },
    {
      id: "mission-3",
      title: "FELLOWSHIP GATHERING",
      tagline: "Forge lifelong bonds with fellow prospect explorers.",
      type: "Club Service",
      rewardXp: 100,
      status: "UPCOMING",
      date: "Monthly Meet",
      thumbnail: "/images/mission_fellowship.jpg",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Meeting":
        return "text-regent-blue border-regent-blue/50 bg-blue-950/40";
      case "Community Service":
        return "text-regent-green border-regent-green/50 bg-green-950/40";
      case "Club Service":
        return "text-purple-400 border-purple-400/50 bg-purple-950/40";
      default:
        return "text-white border-border-card";
    }
  };

  return (
    <section className="w-full mb-8">
      {/* Section Heading */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-pixel text-base sm:text-lg font-bold text-white tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-regent-green" />
          UPCOMING MISSIONS
        </h2>
        <Link
          href="/missions"
          className="text-xs text-regent-blue font-pixel hover:underline flex items-center gap-1"
        >
          ALL MISSIONS <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Missions Stack with Pixel Art Thumbnails */}
      <div className="space-y-3">
        {missionsWithArt.map((mission) => (
          <RetroCard
            key={mission.id}
            interactive
            className="p-3.5 sm:p-4 bg-[#071331] hover:border-regent-green"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5">
              {/* Left: Pixel Art Thumbnail + Info */}
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                {/* 16-Bit Thumbnail */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 bg-[#02091F] border-2 border-border-card overflow-hidden shadow-sm">
                  <Image
                    src={mission.thumbnail}
                    alt={mission.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Text Metadata */}
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`px-2 py-0.2 text-[9px] font-pixel uppercase border ${getTypeColor(
                        mission.type
                      )}`}
                    >
                      {mission.type}
                    </span>
                    <span className="text-[10px] font-pixel text-text-muted flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {mission.date}
                    </span>
                  </div>

                  <h3 className="font-pixel text-sm sm:text-base font-bold text-white tracking-wide truncate">
                    {mission.title}
                  </h3>
                  <p className="font-body text-xs text-text-secondary line-clamp-1">
                    {mission.tagline}
                  </p>
                </div>
              </div>

              {/* Right: XP Bounty & Action */}
              <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border-card/40">
                <div className="flex items-center gap-1 text-regent-gold font-pixel text-xs font-bold bg-[#02091F] px-2.5 py-1 border border-yellow-900/50">
                  <Sparkles className="w-3 h-3" />
                  <span>+{mission.rewardXp} XP</span>
                </div>

                <RetroButton
                  variant="outline"
                  size="sm"
                  href="/missions"
                  className="hover:border-regent-green"
                >
                  VIEW
                </RetroButton>
              </div>
            </div>
          </RetroCard>
        ))}
      </div>
    </section>
  );
}
