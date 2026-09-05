"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Compass,
  CheckCircle2,
  Lock,
  Sparkles,
  Flag,
  Landmark,
  Trees,
} from "lucide-react";
import PixelProgressBar from "@/components/ui/PixelProgressBar";
import LocationDetailPanel from "./LocationDetailPanel";
import PixelAvatar from "@/components/avatar/PixelAvatar";
import PixelCompanion from "@/components/companion/PixelCompanion";
import {
  realmLocations,
  RealmLocation,
  mapSecrets,
  MapSecret,
} from "@/data/realmMapLocations";
import { usePlayer } from "@/context/PlayerContext";

export default function RegentRealmMap() {
  const { player, isChapterUnlocked } = usePlayer();

  const dynamicLocations: RealmLocation[] = React.useMemo(() => {
    return realmLocations.map((loc) => {
      const isCompleted =
        player.completedWorlds?.includes(loc.id) ||
        (loc.id === "loc-gateway" && player.onboardingComplete);
      const isUnlocked = isChapterUnlocked(loc.id);
      const isCurrent = isUnlocked && !isCompleted;
      const status: "COMPLETED" | "CURRENT" | "LOCKED" = isCompleted
        ? "COMPLETED"
        : isCurrent
        ? "CURRENT"
        : "LOCKED";

      return {
        ...loc,
        status,
        routeHref: `/journey/${loc.id}`,
      };
    });
  }, [player.completedWorlds, player.onboardingComplete, isChapterUnlocked]);

  const [selectedLocation, setSelectedLocation] = useState<RealmLocation | null>(null);
  const [selectedSecret, setSelectedSecret] = useState<MapSecret | null>(null);
  const [discoveredSecrets, setDiscoveredSecrets] = useState<string[]>([]);
  const [hoveredLocation, setHoveredLocation] = useState<RealmLocation | null>(null);

  // Initialize selected location to current active chapter
  React.useEffect(() => {
    const currentLoc = dynamicLocations.find((loc) => loc.status === "CURRENT") || dynamicLocations[1];
    setSelectedLocation((prev) => prev || currentLoc);
  }, [dynamicLocations]);

  const handleSelectSecret = (secret: MapSecret) => {
    setSelectedSecret(secret);
    setSelectedLocation(null);
    if (!discoveredSecrets.includes(secret.id)) {
      setDiscoveredSecrets((prev) => [...prev, secret.id]);
    }
  };

  const handleSelectLocation = (loc: RealmLocation) => {
    setSelectedLocation(loc);
    setSelectedSecret(null);
  };

  return (
    <div className="w-full">
      {/* Top Map Header Strip */}
      <div className="bg-[#071331] border-2 border-border-card p-3 sm:p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-retro-card">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-2 bg-[#02091F] border border-regent-gold text-regent-gold shrink-0 shadow-sm">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-pixel text-sm sm:text-base font-bold text-white tracking-wider truncate">
                THE REALM OF REGENT
              </h2>
              <span className="px-2 py-0.5 bg-[#02091F] text-regent-gold text-[9px] font-pixel border border-regent-gold/40 shrink-0">
                LIVING OVERWORLD
              </span>
            </div>
            <p className="text-[11px] text-text-muted font-body truncate">
              Explore 9 chapters & the prologue across illustrated Seethawaka landscapes
            </p>
          </div>
        </div>

        {/* Overall Journey Progress Indicator */}
        <div className="w-full sm:w-auto sm:min-w-[210px] bg-[#02091F] p-2 border border-border-card shrink-0">
          <div className="flex items-center justify-between text-[10px] font-pixel mb-1">
            <span className="text-regent-gold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> JOURNEY PROGRESS
            </span>
            <span className="text-white font-bold">{player.journeyProgress}%</span>
          </div>
          <PixelProgressBar
            progress={player.journeyProgress}
            color="green"
            showLabel={false}
            size="sm"
          />
        </div>
      </div>

      {/* Main Grid: Living Overworld Map + Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Map Canvas (12 cols mobile, 7 cols desktop) */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/11] bg-[#02091F] border-2 border-border-card overflow-hidden shadow-retro-card-lg select-none group">
            {/* 1. Base Layer: Rich Pixel Art Overworld Landscape */}
            <Image
              src="/images/chapter3_realms.jpg"
              alt="Regent Realm Living Overworld"
              fill
              priority
              className="object-cover object-center brightness-100 contrast-105"
            />

            {/* 2. Soft Ambient Lighting Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#02091F]/30 via-transparent to-[#02091F]/20 pointer-events-none" />

            {/* 
              ============================================================
              3. ATMOSPHERIC FOG & MIST OF DISCOVERY
              Layered soft mist, cloud veils, and regional haze
              ============================================================
            */}

            {/* Heavy Distant Summit Mist (Chapters 7, 8, 9 - Top 35% of Map) */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(200, 225, 255, 0.28) 0%, rgba(135, 175, 225, 0.22) 20%, rgba(20, 45, 90, 0.15) 35%, transparent 48%)",
                backdropFilter: "blur(0.8px)",
                maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0) 45%)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.8) 25%, rgba(0,0,0,0) 45%)",
              }}
            />

            {/* Drifting Summit Cloud Layer 1 */}
            <motion.div
              animate={{ x: ["-12%", "12%", "-12%"] }}
              transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
              className="absolute top-0 inset-x-[-20%] h-36 pointer-events-none z-11 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(255, 255, 255, 0.35) 0%, rgba(180, 215, 255, 0.15) 50%, transparent 80%)",
                filter: "blur(12px)",
              }}
            />

            {/* Drifting Summit Cloud Layer 2 (Opposite direction) */}
            <motion.div
              animate={{ x: ["10%", "-10%", "10%"] }}
              transition={{ repeat: Infinity, duration: 28, ease: "easeInOut" }}
              className="absolute top-4 inset-x-[-20%] h-32 pointer-events-none z-11 opacity-45"
              style={{
                background:
                  "radial-gradient(ellipse 50% 35% at 40% 30%, rgba(220, 240, 255, 0.4) 0%, rgba(140, 185, 240, 0.1) 60%, transparent 85%)",
                filter: "blur(14px)",
              }}
            />

            {/* Medium Mist Veil (Chapters 4, 5, 6 - Mid 40% to 65% of Map) */}
            <div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "radial-gradient(ellipse 80% 30% at 50% 50%, rgba(180, 210, 250, 0.14) 0%, rgba(120, 160, 220, 0.08) 50%, transparent 85%)",
                filter: "blur(6px)",
              }}
            />

            {/* Light Drifting Valley Wisp (Across Rotaract Harbor & Regent Keep) */}
            <motion.div
              animate={{ x: ["-8%", "8%", "-8%"], opacity: [0.25, 0.45, 0.25] }}
              transition={{ repeat: Infinity, duration: 18, ease: "easeInOut" }}
              className="absolute top-[52%] inset-x-[-10%] h-24 pointer-events-none z-11"
              style={{
                background:
                  "radial-gradient(ellipse 65% 25% at 55% 50%, rgba(210, 235, 255, 0.25) 0%, rgba(160, 200, 255, 0.08) 55%, transparent 80%)",
                filter: "blur(10px)",
              }}
            />

            {/* Fully Clear Sunlight Opening over Rotary Roots & The Gateway (Bottom 65% to 100%) */}
            <div
              className="absolute bottom-0 inset-x-0 h-44 pointer-events-none z-12"
              style={{
                background:
                  "radial-gradient(ellipse 70% 50% at 30% 80%, rgba(255, 235, 180, 0.12) 0%, rgba(155, 234, 45, 0.06) 45%, transparent 75%)",
              }}
            />

            {/* 
              ============================================================
              4. THEMED LANDMARK LUMINOUS AURAS
              ============================================================
            */}

            {/* Chapter 1: Rotary Roots - Seethawaka Botanical Garden Emerald Grove */}
            <div
              style={{ left: "32%", top: "76%" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-12"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-400/25 blur-md animate-pulse" />
            </div>

            {/* Chapter 3: Regent Keep - Rajasinghe Castle Ruins Crimson Pride */}
            <div
              style={{ left: "24%", top: "56%" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-12"
            >
              <div className="w-14 h-14 rounded-full bg-red-800/30 blur-md" />
            </div>

            {/* Chapter 4: The Seven Realms - Signal Spire Arcane Light */}
            <motion.div
              animate={{ opacity: [0.35, 0.85, 0.35], scale: [0.95, 1.1, 0.95] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              style={{ left: "54%", top: "58%" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-12"
            >
              <div className="w-16 h-16 rounded-full bg-purple-400/25 blur-md" />
            </motion.div>

            {/* Chapter 5: Project Forge - Industrial Glow */}
            <motion.div
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              style={{ left: "82%", top: "52%" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-12"
            >
              <div className="w-12 h-12 rounded-full bg-amber-400/25 blur-md" />
            </motion.div>

            {/* Chapter 9: Membership Citadel - Mountain Summit Beacon */}
            <motion.div
              animate={{ opacity: [0.3, 0.85, 0.3] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{ left: "50%", top: "12%" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-12"
            >
              <div className="w-24 h-24 rounded-full bg-yellow-300/30 blur-lg" />
            </motion.div>

            {/* Ambient Fireflies over Botanical Groves */}
            <div className="absolute inset-0 pointer-events-none z-14 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: `${25 + (i % 3) * 12}%`,
                    y: `${70 + (i % 2) * 10}%`,
                    opacity: 0.2,
                  }}
                  animate={{
                    y: [`${70 + (i % 2) * 10}%`, `${64 + (i % 2) * 8}%`, `${70 + (i % 2) * 10}%`],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + i,
                    ease: "easeInOut",
                    delay: i * 0.4,
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-regent-gold shadow-[0_0_6px_#FFC719]"
                />
              ))}
            </div>

            {/* 
              ============================================================
              5. MAP SECRETS (Clickable Heritage Landmarks)
              ============================================================
            */}
            {mapSecrets.map((secret) => {
              const isFound = discoveredSecrets.includes(secret.id);
              const isSelected = selectedSecret?.id === secret.id;

              return (
                <motion.button
                  key={secret.id}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSelectSecret(secret)}
                  style={{
                    left: `${secret.coords.x}%`,
                    top: `${secret.coords.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-22 p-1 rounded-full border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-regent-gold text-black border-white shadow-[0_0_10px_#FFC719]"
                      : isFound
                      ? "bg-[#02091F]/90 text-regent-gold border-yellow-900/60"
                      : "bg-[#071331]/80 text-text-muted border-border-card/60 hover:text-white animate-bounce-slight"
                  }`}
                  aria-label={secret.title}
                >
                  {secret.type === "HERITAGE_LORE" ? (
                    <Landmark className="w-2.5 h-2.5" />
                  ) : secret.type === "BOTANICAL_NOTE" ? (
                    <Trees className="w-2.5 h-2.5" />
                  ) : (
                    <Sparkles className="w-2.5 h-2.5" />
                  )}
                </motion.button>
              );
            })}

            {/* 
              ============================================================
              6. CANONICAL 10 WORLD CHAPTER NODES (Prologue + Chapters 1-9)
              ============================================================
            */}
            {dynamicLocations.map((loc) => {
              const isSelected = selectedLocation?.id === loc.id;
              const isCurrent = loc.status === "CURRENT";
              const isCompleted = loc.status === "COMPLETED";
              const isLocked = loc.status === "LOCKED";

              return (
                <div
                  key={loc.id}
                  style={{
                    left: `${loc.coords.x}%`,
                    top: `${loc.coords.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-25 cursor-pointer"
                  onClick={() => handleSelectLocation(loc)}
                  onMouseEnter={() => setHoveredLocation(loc)}
                  onMouseLeave={() => setHoveredLocation(null)}
                >
                  {/* Outer Pulsing Aura for Selected/Current Node */}
                  {isSelected && (
                    <div className="absolute -inset-2.5 rounded-none border-2 border-regent-blue/80 bg-regent-blue/20 animate-pulse pointer-events-none" />
                  )}

                  {/* Chapter Marker Node */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center justify-center p-1 sm:p-1.5 transition-all ${
                      isSelected
                        ? "bg-regent-blue text-black border-2 border-white shadow-[0_0_14px_#20A9F6]"
                        : isCurrent
                        ? "bg-regent-maroon text-white border-2 border-regent-gold shadow-[0_0_12px_#FFC719] animate-pulse"
                        : isCompleted
                        ? "bg-green-950 text-regent-green border border-regent-green/70"
                        : "bg-[#071331]/95 text-text-muted border border-border-card/80 hover:border-text-secondary"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-regent-green" />
                    ) : isLocked ? (
                      <Lock className="w-3 h-3 text-text-muted" />
                    ) : isCurrent ? (
                      <Sparkles className="w-3.5 h-3.5 text-regent-gold fill-regent-gold" />
                    ) : (
                      <Flag className="w-3 h-3 text-white" />
                    )}

                    {/* Small Chapter Badge */}
                    <span className="absolute -top-2.5 -right-2.5 bg-regent-maroon px-1 py-0.2 border border-red-950 text-[7px] font-pixel text-white font-bold leading-none shadow-sm">
                      {loc.isPrologue ? "P" : loc.chapterNumber}
                    </span>
                  </motion.div>

                  {/* Player & Companion Standing at Current World */}
                  {isCurrent && (
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                      className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-end gap-1.5 pointer-events-none z-30"
                    >
                      {/* Avatar Mini Sprite */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-9 h-10 rounded-none border-2 border-regent-gold bg-[#02091F]/90 p-0.5 shadow-[0_0_10px_#FFC719] flex items-center justify-center">
                          <PixelAvatar
                            explorerId={player.explorerId}
                            config={player.avatar}
                            variant="mini"
                            size="full"
                            animate={true}
                          />
                        </div>
                        <div className="w-7 h-1 rounded-full bg-black/70 blur-[1px] mt-0.5" />
                      </div>

                      {/* Chosen Companion Mini Sprite */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-6 h-6 border border-border-card bg-[#02091F]/90 p-0.5 flex items-center justify-center">
                          <PixelCompanion
                            companionId={player.companion || "nova"}
                            emotion="idle"
                            variant="mini"
                            size="full"
                            animate={true}
                          />
                        </div>
                        <div className="w-5 h-0.5 rounded-full bg-black/60 blur-[1px] mt-0.5" />
                      </div>
                    </motion.div>
                  )}

                  {/* Standardized World Location Name Label */}
                  <div
                    className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 font-pixel text-[8px] sm:text-[9px] uppercase tracking-wider pointer-events-none transition-all shadow-md ${
                      isSelected
                        ? "bg-regent-blue text-black font-bold border border-white"
                        : isCurrent
                        ? "bg-regent-maroon text-white font-bold border border-red-950"
                        : isCompleted
                        ? "bg-[#02091F]/95 text-regent-green border border-regent-green/60"
                        : "bg-[#02091F]/90 text-text-muted border border-border-card/70"
                    }`}
                  >
                    {loc.worldName}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Realm Inspector Panel */}
        <div className="lg:col-span-5 xl:col-span-4">
          <LocationDetailPanel
            location={selectedLocation}
            secret={selectedSecret}
            onClose={() => {
              setSelectedSecret(null);
              setSelectedLocation(
                realmLocations.find((l) => l.status === "CURRENT") || realmLocations[1]
              );
            }}
          />
        </div>
      </div>
    </div>
  );
}
