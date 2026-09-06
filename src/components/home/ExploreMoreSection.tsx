"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, Sparkles, Map, Hammer, Award, ChevronRight } from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import AskNovaModal from "@/components/ui/AskNovaModal";
import { exploreFeatures } from "@/data/mockUserData";

export default function ExploreMoreSection() {
  const [isNovaModalOpen, setIsNovaModalOpen] = useState(false);
  const [genericModalInfo, setGenericModalInfo] = useState<{
    title: string;
    description: string;
  } | null>(null);

  const getCardIcon = (iconType: string) => {
    switch (iconType) {
      case "book":
        return (
          <div className="w-12 h-12 bg-blue-950 border-2 border-regent-blue flex items-center justify-center text-regent-blue shadow-[0_2px_0_#0c5784]">
            <BookOpen className="w-6 h-6" />
          </div>
        );
      case "nova":
        return (
          <div className="relative w-12 h-12 bg-[#050F2D] border-2 border-border-card flex items-center justify-center overflow-hidden shadow-[0_2px_0_#1b263b]">
            <Image
              src="/assets/pixel/characters/companions/nova/portrait.jpg"
              alt="Nova Companion"
              fill
              className="object-cover"
            />
          </div>
        );
      case "map":
        return (
          <div className="w-12 h-12 bg-purple-950 border-2 border-purple-400 flex items-center justify-center text-purple-400 shadow-[0_2px_0_#4a1d75]">
            <Map className="w-6 h-6" />
          </div>
        );
      case "forge":
        return (
          <div className="w-12 h-12 bg-amber-950 border-2 border-regent-gold flex items-center justify-center text-regent-gold shadow-[0_2px_0_#754a00]">
            <Hammer className="w-6 h-6" />
          </div>
        );
      case "badge":
        return (
          <div className="w-12 h-12 bg-red-950 border-2 border-regent-maroon flex items-center justify-center text-white shadow-[0_2px_0_#400000]">
            <Award className="w-6 h-6 text-regent-gold" />
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 bg-[#050F2D] border-2 border-border-card flex items-center justify-center text-white">
            <Sparkles className="w-6 h-6 text-regent-blue" />
          </div>
        );
    }
  };

  const handleCardClick = (feature: (typeof exploreFeatures)[0]) => {
    if (feature.id === "ask-nova") {
      setIsNovaModalOpen(true);
      return;
    }
  };

  return (
    <>
      <section className="w-full mb-8">
        {/* Section Heading */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-pixel text-base sm:text-lg font-bold text-white tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 bg-regent-gold inline-block" />
            EXPLORE MORE
          </h2>
          <span className="text-xs text-text-muted font-pixel hidden sm:inline-block">
            5 MODULES AVAILABLE
          </span>
        </div>

        {/* Stacked Series of Cards */}
        <div className="space-y-3">
          {exploreFeatures.map((item) => {
            const isExternalRoute = item.href && item.href !== "#" && !item.isActionModal;

            const CardInner = (
              <div className="p-3.5 sm:p-4 flex items-center justify-between gap-3.5 sm:gap-4">
                {/* Left: Pixel Icon */}
                <div className="shrink-0">{getCardIcon(item.iconType)}</div>

                {/* Center: Title & Description */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-pixel text-sm sm:text-base font-bold text-white tracking-wide group-hover:text-regent-blue transition-colors">
                      {item.title}
                    </h3>
                    {item.tag && (
                      <span className="hidden sm:inline-block px-1.5 py-0.2 bg-[#02091F] text-[9px] font-pixel text-text-muted border border-border-card">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="font-body text-xs sm:text-sm text-text-secondary line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Right: Arrow / Action */}
                <div className="shrink-0 text-text-secondary group-hover:text-regent-blue group-hover:translate-x-0.5 transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            );

            if (isExternalRoute) {
              return (
                <Link key={item.id} href={item.href} className="block group">
                  <RetroCard interactive className="border-border-card hover:border-regent-blue">
                    {CardInner}
                  </RetroCard>
                </Link>
              );
            }

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(item)}
                className="cursor-pointer group"
              >
                <RetroCard interactive className="border-border-card hover:border-regent-gold">
                  {CardInner}
                </RetroCard>
              </div>
            );
          })}
        </div>
      </section>

      {/* Ask Nova Companion Modal */}
      <AskNovaModal
        isOpen={isNovaModalOpen}
        onClose={() => setIsNovaModalOpen(false)}
      />
    </>
  );
}
