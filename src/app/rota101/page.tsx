"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  Sparkles,
  Shield,
  Heart,
  Globe,
  Users,
  Megaphone,
  Trophy,
  Coins,
  Compass,
} from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";

export default function Rota101Page() {
  const fourWayTest = [
    "Is it the TRUTH?",
    "Is it FAIR to all concerned?",
    "Will it build GOODWILL and BETTER FRIENDSHIPS?",
    "Will it be BENEFICIAL to all concerned?",
  ];

  const avenues = [
    {
      title: "Community Service",
      realm: "HEARTLAND",
      desc: "Focuses on uplifting local Seethawaka communities through health camps, environmental drives, and sustainable village development.",
      icon: Heart,
      color: "text-red-400",
      bgColor: "bg-red-950/40",
      borderColor: "border-red-900/50",
    },
    {
      title: "Club Service",
      realm: "THE HEARTH",
      desc: "Strengthens member bonds, fellowship gatherings, general assemblies, and the internal administrative heartbeat of the club.",
      icon: Users,
      color: "text-blue-400",
      bgColor: "bg-blue-950/40",
      borderColor: "border-blue-900/50",
    },
    {
      title: "Professional Development",
      realm: "THE FORGE",
      desc: "Enhances career skills, public speaking, leadership acumen, and CV-building workshops to forge industry-ready young professionals.",
      icon: Shield,
      color: "text-amber-400",
      bgColor: "bg-amber-950/40",
      borderColor: "border-amber-900/50",
    },
    {
      title: "International Service",
      realm: "FAR HARBOR",
      desc: "Connects Seethawaka Regent with international Rotaract clubs worldwide for cross-border twin projects, cultural exchanges, and global peace.",
      icon: Globe,
      color: "text-cyan-400",
      bgColor: "bg-cyan-950/40",
      borderColor: "border-cyan-900/50",
    },
    {
      title: "Public Relations",
      realm: "SIGNAL SPIRE",
      desc: "Champions digital storytelling, media coverage, social branding, flyers, and public outreach to broadcast the club's impact.",
      icon: Megaphone,
      color: "text-purple-400",
      bgColor: "bg-purple-950/40",
      borderColor: "border-purple-900/50",
    },
    {
      title: "Sports & Recreation",
      realm: "GRAND ARENA",
      desc: "Energizes the club with sports meets, cricket tournaments, hiking expeditions across Seethawaka mountains, and active fitness challenges.",
      icon: Trophy,
      color: "text-orange-400",
      bgColor: "bg-orange-950/40",
      borderColor: "border-orange-900/50",
    },
    {
      title: "Finance",
      realm: "TREASURY HALL / MERCHANT'S QUARTER",
      desc: "The strategic backbone powering all avenues through fundraising galas, sponsorship partnerships, budget auditing, and resource mobilization.",
      icon: Coins,
      color: "text-yellow-400",
      bgColor: "bg-yellow-950/40",
      borderColor: "border-yellow-900/50",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border-card mb-6">
        <Link
          href="/home"
          className="flex items-center gap-2 font-pixel text-xs text-regent-blue hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO REALM MAP
        </Link>
        <span className="font-pixel text-xs text-regent-gold">
          ROTARACT ESSENTIALS
        </span>
      </div>

      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex p-3 bg-blue-950 border-2 border-regent-blue mb-3">
          <BookOpen className="w-8 h-8 text-regent-blue" />
        </div>
        <h1 className="font-pixel text-2xl sm:text-3xl font-bold text-white tracking-wide">
          ROTA 101 GUIDE
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary mt-2 leading-relaxed">
          Your foundational handbook to the core principles, ethical pillars, and life inside the Rotaract Club of Seethawaka Regent.
        </p>
      </div>

      {/* The 4-Way Test Module */}
      <RetroCard headerTag="ETHICAL CODE" headerColor="yellow" className="p-6 mb-6">
        <h3 className="font-pixel text-lg font-bold text-white mb-2">
          THE ROTARY FOUR-WAY TEST
        </h3>
        <p className="text-xs sm:text-sm text-text-secondary mb-4">
          Of the things we think, say or do:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {fourWayTest.map((item, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#02091F] border border-border-card flex items-start gap-2.5 text-xs sm:text-sm text-white"
            >
              <span className="font-pixel text-xs text-regent-gold font-bold shrink-0">
                {idx + 1}.
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </RetroCard>

      {/* The 7 Avenues of Service */}
      <RetroCard headerTag="THE 7 PILLARS" headerColor="blue" className="p-6 mb-8">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-pixel text-lg font-bold text-white">
            THE 7 AVENUES OF SERVICE
          </h3>
          <span className="text-[10px] font-pixel text-regent-gold bg-regent-maroon px-2 py-0.5 border border-red-950">
            RACSR STRUCTURE
          </span>
        </div>
        <p className="text-xs sm:text-sm text-text-secondary mb-5">
          Every project, expedition, and leadership role in Seethawaka Regent thrives under one of these seven distinct avenue realms:
        </p>

        <div className="space-y-3">
          {avenues.map((avenue, idx) => {
            const Icon = avenue.icon;
            return (
              <div
                key={idx}
                className={`p-3.5 bg-[#02091F] border ${avenue.borderColor} flex items-start gap-3.5 hover:border-border-cardHighlight transition-colors`}
              >
                <div className={`p-2.5 ${avenue.bgColor} border border-border-card shrink-0`}>
                  <Icon className={`w-5 h-5 ${avenue.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h4 className="font-pixel text-sm font-bold text-white">
                      {avenue.title}
                    </h4>
                    <span className="px-2 py-0.2 bg-[#050F2D] text-[9px] font-pixel text-regent-gold border border-border-card/60">
                      REALM: {avenue.realm}
                    </span>
                  </div>
                  <p className="font-body text-xs text-text-secondary mt-0.5 leading-relaxed">
                    {avenue.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </RetroCard>

      {/* Bottom Action */}
      <div className="text-center pb-8">
        <RetroButton variant="blue" size="lg" href="/home">
          RETURN TO REALM MAP
        </RetroButton>
      </div>
    </div>
  );
}
