"use client";

import React from "react";
import PlayerHUDStrip from "@/components/home/PlayerHUDStrip";
import CompanionGreeting from "@/components/home/CompanionGreeting";
import RegentRealmMap from "@/components/map/RegentRealmMap";
import NextStepCard from "@/components/home/NextStepCard";
import NextMissionCard from "@/components/home/NextMissionCard";
import WorldDivider from "@/components/ui/WorldDivider";

export default function ProspectHomePage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-3 sm:pt-5 pb-12">
      {/* 1. Compact Player HUD Strip */}
      <PlayerHUDStrip />

      {/* 2. Compact Companion Greeting */}
      <CompanionGreeting />

      {/* 3. Main Interactive Regent Realm Map (70% Attention Focus) */}
      <section className="w-full mb-8">
        <RegentRealmMap />
      </section>

      <WorldDivider label="ACTIVE DIRECTIVES" icon="compass" />

      {/* 4. Action Cards (Focused Next Steps) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Your Next Step */}
        <NextStepCard />

        {/* Next Real-World Mission */}
        <NextMissionCard />
      </div>
    </div>
  );
}
