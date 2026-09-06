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
  Crown,
  Shield,
  Layers,
} from "lucide-react";
import PixelProgressBar from "@/components/ui/PixelProgressBar";
import LocationDetailPanel from "./LocationDetailPanel";
import PixelAvatar from "@/components/avatar/PixelAvatar";
import PixelCompanion from "@/components/companion/PixelCompanion";
import {
  atlasLocations,
  realmLocations,
  RealmLocation,
  mapSecrets,
  MapSecret,
} from "@/data/realmMapLocations";
import { usePlayer } from "@/context/PlayerContext";

export default function RegentRealmMap() {
  const { player, isChapterUnlocked, isChapterCompleted } = usePlayer();

  // Dynamic Atlas Locations with state resolution
  const dynamicAtlasLocations: RealmLocation[] = React.useMemo(() => {
    return atlasLocations.map((loc) => {
      // Gateway checks both canonical chapter-1 and legacy loc-gateway
      const isCompleted =
        isChapterCompleted(loc.id) ||
        (loc.id === "loc-gateway" && isChapterCompleted("chapter-1"));
      const isUnlocked =
        isChapterUnlocked(loc.id) ||
        (loc.id === "loc-gateway" && isChapterUnlocked("chapter-1"));

      const isCurrent = isUnlocked && !isCompleted;
      const status: "COMPLETED" | "CURRENT" | "LOCKED" = isCompleted
        ? "COMPLETED"
        : isCurrent
        ? "CURRENT"
        : "LOCKED";

      return {
        ...loc,
        status,
        routeHref: loc.routeHref || `/journey/${loc.id}`,
      };
    });
  }, [isChapterCompleted, isChapterUnlocked]);

  const [selectedLocation, setSelectedLocation] = useState<RealmLocation | null>(null);
  const [selectedSecret, setSelectedSecret] = useState<MapSecret | null>(null);
  const [discoveredSecrets, setDiscoveredSecrets] = useState<string[]>([]);
  const [hoveredLocation, setHoveredLocation] = useState<RealmLocation | null>(null);

  // Initialize selected location to current active chapter or first uncompleted
  React.useEffect(() => {
    const currentLoc =
      dynamicAtlasLocations.find((loc) => loc.status === "CURRENT") ||
      dynamicAtlasLocations[0];
    setSelectedLocation((prev) => prev || currentLoc);
  }, [dynamicAtlasLocations]);

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
      {/* Top Map Header Strip — The Regent Realm Atlas */}
      <div className="bg-[#071331] border-2 border-border-card p-3 sm:p-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-retro-card">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2.5 bg-[#02091F] border-2 border-regent-gold text-regent-gold shrink-0 shadow-sm relative">
            <Compass className="w-5 h-5 animate-spin-slow" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-regent-gold rounded-full animate-ping" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-pixel text-sm sm:text-base font-bold text-white tracking-wider truncate">
                THE REGENT REALM ATLAS
              </h2>
              <span className="px-2 py-0.5 bg-[#02091F] text-regent-gold text-[9px] font-pixel border border-regent-gold/50 shrink-0">
                16-BIT OVERWORLD
              </span>
            </div>
            <p className="text-[11px] text-text-muted font-body truncate">
              Ascend through 8 canonical realm sanctuaries from the Gateway to the Regent Citadel
            </p>
          </div>
        </div>

        {/* Journey Progress Gauge */}
        <div className="w-full sm:w-auto sm:min-w-[220px] bg-[#02091F] p-2.5 border border-border-card shrink-0">
          <div className="flex items-center justify-between text-[10px] font-pixel mb-1.5">
            <span className="text-regent-gold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-yellow-400" /> EXPEDITION PROGRESS
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

      {/* Main Grid: Retro RPG Atlas Canvas + Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Map Canvas Frame (12 cols mobile, 7/8 cols desktop) */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/11] bg-[#02091F] border-4 border-[#071331] overflow-hidden shadow-retro-card-lg select-none group">
            {/* Retro Parchment/Corner Rivets */}
            <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-regent-gold/60 z-30 pointer-events-none" />
            <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-regent-gold/60 z-30 pointer-events-none" />
            <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-regent-gold/60 z-30 pointer-events-none" />
            <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-regent-gold/60 z-30 pointer-events-none" />

            {/* 1. Base Layer: 16-Bit Hand-Crafted Landscape Art */}
            <Image
              src="/images/chapter3_realms.jpg"
              alt="Regent Realm Atlas Overworld"
              fill
              priority
              className="object-cover object-center brightness-100 contrast-105"
            />

            {/* Ambient Lighting Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#02091F]/40 via-transparent to-[#02091F]/30 pointer-events-none" />

            {/* Retro Coordinate Overlay Grid (Subtle) */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10 z-10"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.2) 1px, transparent 1px)",
                backgroundSize: "10% 10%",
              }}
            />

            {/* 
              ============================================================
              2. EXPEDITION TRAIL LAYER (SVG Trail Connecting 8 Locations)
              ============================================================
            */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-15"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="goldTrailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFC719" />
                  <stop offset="100%" stopColor="#F59E0B" />
                </linearGradient>
                <filter id="trailGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1" result="glow" />
                  <feComposite in="SourceGraphic" in2="glow" operator="over" />
                </filter>
              </defs>

              {dynamicAtlasLocations.map((loc, idx) => {
                if (idx === dynamicAtlasLocations.length - 1) return null;
                const nextLoc = dynamicAtlasLocations[idx + 1];

                const isCompletedSegment =
                  loc.status === "COMPLETED" &&
                  (nextLoc.status === "COMPLETED" || nextLoc.status === "CURRENT");
                const isActiveSegment =
                  loc.status === "COMPLETED" && nextLoc.status === "CURRENT";
                const isLockedSegment = nextLoc.status === "LOCKED";

                // Control point curve
                const midX = (loc.coords.x + nextLoc.coords.x) / 2 + (idx % 2 === 0 ? 3 : -3);
                const midY = (loc.coords.y + nextLoc.coords.y) / 2;

                return (
                  <g key={`trail-${loc.id}-${nextLoc.id}`}>
                    {/* Shadow under trail */}
                    <path
                      d={`M ${loc.coords.x} ${loc.coords.y} Q ${midX} ${midY}, ${nextLoc.coords.x} ${nextLoc.coords.y}`}
                      fill="none"
                      stroke="#000000"
                      strokeWidth="2.5"
                      strokeOpacity="0.6"
                    />
                    {/* Dynamic state trail line */}
                    <path
                      d={`M ${loc.coords.x} ${loc.coords.y} Q ${midX} ${midY}, ${nextLoc.coords.x} ${nextLoc.coords.y}`}
                      fill="none"
                      stroke={
                        isCompletedSegment
                          ? "url(#goldTrailGrad)"
                          : isActiveSegment
                          ? "#20A9F6"
                          : isLockedSegment
                          ? "#334155"
                          : "#64748B"
                      }
                      strokeWidth={isCompletedSegment ? "1.8" : isActiveSegment ? "2" : "1.2"}
                      strokeDasharray={
                        isCompletedSegment
                          ? "none"
                          : isActiveSegment
                          ? "3, 2"
                          : "1.5, 2.5"
                      }
                      strokeOpacity={isLockedSegment ? 0.4 : 0.95}
                      filter={isCompletedSegment || isActiveSegment ? "url(#trailGlow)" : undefined}
                    />
                  </g>
                );
              })}
            </svg>

            {/* 
              ============================================================
              3. REGIONAL ATMOSPHERIC CLOUDS & MIST
              ============================================================
            */}
            {/* Distant Summit Fog (Citadel & Frontier) */}
            <div
              className="absolute inset-x-0 top-0 h-40 pointer-events-none z-12"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(15, 30, 65, 0.45) 0%, rgba(30, 50, 95, 0.25) 45%, transparent 100%)",
                backdropFilter: "blur(0.5px)",
              }}
            />

            {/* Drifting Summit Cloud Layer */}
            <motion.div
              animate={{ x: ["-10%", "10%", "-10%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
              className="absolute top-0 inset-x-[-20%] h-32 pointer-events-none z-12 opacity-50"
              style={{
                background:
                  "radial-gradient(ellipse 60% 40% at 50% 20%, rgba(255, 255, 255, 0.3) 0%, rgba(180, 215, 255, 0.12) 50%, transparent 80%)",
                filter: "blur(12px)",
              }}
            />

            {/* Ambient Floating Fireflies */}
            <div className="absolute inset-0 pointer-events-none z-14 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{
                    x: `${20 + (i % 4) * 18}%`,
                    y: `${60 + (i % 2) * 16}%`,
                    opacity: 0.2,
                  }}
                  animate={{
                    y: [
                      `${60 + (i % 2) * 16}%`,
                      `${54 + (i % 2) * 14}%`,
                      `${60 + (i % 2) * 16}%`,
                    ],
                    opacity: [0.2, 0.85, 0.2],
                    scale: [0.8, 1.3, 0.8],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 3 + i * 0.8,
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }}
                  className="absolute w-1.5 h-1.5 rounded-full bg-regent-gold shadow-[0_0_6px_#FFC719]"
                />
              ))}
            </div>

            {/* 
              ============================================================
              4. MAP SECRETS (Clickable Heritage Lore & Discovery Pins)
              ============================================================
            */}
            {mapSecrets.map((secret) => {
              const isFound = discoveredSecrets.includes(secret.id);
              const isSelected = selectedSecret?.id === secret.id;

              return (
                <motion.button
                  key={secret.id}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSelectSecret(secret)}
                  style={{
                    left: `${secret.coords.x}%`,
                    top: `${secret.coords.y}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-22 p-1 border transition-all cursor-pointer shadow-sm ${
                    isSelected
                      ? "bg-regent-gold text-black border-white shadow-[0_0_12px_#FFC719]"
                      : isFound
                      ? "bg-[#02091F]/90 text-regent-gold border-yellow-800/80"
                      : "bg-[#071331]/80 text-text-muted border-border-card/70 hover:text-white animate-bounce-slight"
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
              5. THE 8 CANONICAL REGENT REALM ATLAS LOCATIONS
              ============================================================
            */}
            {dynamicAtlasLocations.map((loc) => {
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
                  {/* Outer Pulsing Aura for Selected or Current Node */}
                  {isSelected && (
                    <div className="absolute -inset-3 rounded-none border-2 border-regent-blue/90 bg-regent-blue/20 animate-pulse pointer-events-none" />
                  )}

                  {/* 
                    ----------------------------------------------------
                    STATE 1: LOCKED (Fog of War + Darkened Pixel Art)
                    ----------------------------------------------------
                  */}
                  {isLocked && (
                    <div className="relative flex items-center justify-center">
                      {/* Swirling Local Fog Patch */}
                      <motion.div
                        animate={{
                          opacity: [0.7, 0.95, 0.7],
                          scale: [0.95, 1.08, 0.95],
                          rotate: [0, 4, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 5,
                          ease: "easeInOut",
                        }}
                        className="absolute -inset-6 pointer-events-none rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle, rgba(10, 20, 48, 0.92) 0%, rgba(15, 30, 68, 0.75) 50%, transparent 75%)",
                          backdropFilter: "blur(1.5px)",
                        }}
                      />

                      {/* Darkened Desaturated Location Icon */}
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        className={`relative w-9 h-9 sm:w-10 sm:h-10 border-2 border-slate-700/80 bg-slate-950/90 flex items-center justify-center filter grayscale brightness-50 contrast-125 shadow-inner transition-all ${
                          isSelected ? "border-slate-400 ring-2 ring-slate-400/50" : ""
                        }`}
                      >
                        <Lock className="w-4 h-4 text-slate-400" />

                        {/* Miniature Chapter Number in Iron Frame */}
                        <span className="absolute -top-2 -right-2 bg-slate-900 px-1 py-0.5 border border-slate-700 text-[7px] font-pixel text-slate-400 leading-none">
                          {loc.atlasIndex}
                        </span>
                      </motion.div>
                    </div>
                  )}

                  {/* 
                    ----------------------------------------------------
                    STATE 2: UNLOCKED / CURRENT (Vibrant Animation)
                    ----------------------------------------------------
                  */}
                  {!isLocked && !isCompleted && (
                    <div className="relative flex items-center justify-center">
                      {/* Sunbeam / Arcane Aura Breaking Through Fog */}
                      <motion.div
                        animate={{
                          scale: [1, 1.25, 1],
                          opacity: [0.4, 0.85, 0.4],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 3,
                          ease: "easeInOut",
                        }}
                        className="absolute -inset-4 rounded-full bg-cyan-400/25 blur-md pointer-events-none"
                      />

                      {/* Vibrant 16-Bit Unlocked Node */}
                      <motion.div
                        whileHover={{ scale: 1.18 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative w-10 h-10 sm:w-11 sm:h-11 border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-regent-blue text-black border-2 border-white shadow-[0_0_16px_#20A9F6]"
                            : isCurrent
                            ? "bg-gradient-to-br from-regent-maroon via-red-900 to-amber-900 text-white border-2 border-regent-gold shadow-[0_0_14px_#FFC719] animate-pulse"
                            : "bg-gradient-to-br from-[#0c2461] to-[#1e3799] text-cyan-300 border-2 border-cyan-400/80 shadow-[0_0_10px_#20A9F6]"
                        }`}
                      >
                        <Flag className="w-4 h-4 text-regent-gold animate-bounce-slight" />

                        {/* Atlas Step Number */}
                        <span className="absolute -top-2.5 -right-2.5 bg-regent-maroon px-1.5 py-0.5 border border-regent-gold text-[7px] font-pixel text-white font-bold leading-none shadow-md">
                          {loc.atlasIndex}
                        </span>
                      </motion.div>

                      {/* Player & Companion Standing at Current Node */}
                      {isCurrent && (
                        <motion.div
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                          className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-end gap-1 pointer-events-none z-30"
                        >
                          {/* Avatar Mini Sprite */}
                          <div className="flex flex-col items-center">
                            <div className="relative w-8 h-9 rounded-none border-2 border-regent-gold bg-[#02091F]/90 p-0.5 shadow-[0_0_10px_#FFC719] flex items-center justify-center">
                              <PixelAvatar
                                explorerId={player.explorerId}
                                config={player.avatar}
                                variant="mini"
                                size="full"
                                animate={true}
                              />
                            </div>
                            <div className="w-6 h-1 rounded-full bg-black/70 blur-[1px] mt-0.5" />
                          </div>

                          {/* Companion Mini Sprite */}
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
                    </div>
                  )}

                  {/* 
                    ----------------------------------------------------
                    STATE 3: COMPLETED (Golden Emblem + Radiance Effects)
                    ----------------------------------------------------
                  */}
                  {isCompleted && (
                    <div className="relative flex items-center justify-center">
                      {/* Golden Radiance Aura */}
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.9, 0.5],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 3.5,
                          ease: "easeInOut",
                        }}
                        className="absolute -inset-4 rounded-full bg-yellow-400/25 blur-md pointer-events-none"
                      />

                      {/* Upward Drifting Golden Pixel Sparkles */}
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(3)].map((_, pi) => (
                          <motion.div
                            key={pi}
                            animate={{
                              y: [-2, -18],
                              opacity: [1, 0],
                              scale: [1, 0.5],
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: 1.8 + pi * 0.4,
                              delay: pi * 0.4,
                            }}
                            className="absolute w-1 h-1 bg-yellow-300 shadow-[0_0_4px_#FFC719]"
                            style={{ left: `${25 + pi * 25}%`, top: "0%" }}
                          />
                        ))}
                      </div>

                      {/* Ornate Golden Emblem Node */}
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        className={`relative w-10 h-10 sm:w-11 sm:h-11 border-2 flex items-center justify-center transition-all ${
                          isSelected
                            ? "bg-gradient-to-br from-yellow-300 via-amber-400 to-yellow-500 text-yellow-950 border-2 border-white shadow-[0_0_18px_#FFC719]"
                            : "bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-600 text-yellow-950 border-2 border-yellow-200 shadow-[0_0_14px_#FFC719]"
                        }`}
                      >
                        <Crown className="w-4 h-4 text-yellow-950 fill-yellow-950" />

                        {/* Completion Seal Star */}
                        <span className="absolute -top-2.5 -right-2.5 bg-yellow-400 text-yellow-950 font-bold text-[8px] font-pixel px-1 border border-yellow-200 leading-tight shadow-md">
                          ★
                        </span>
                      </motion.div>
                    </div>
                  )}

                  {/* Standardized World Location Name Label */}
                  <div
                    className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 font-pixel text-[8px] sm:text-[9px] uppercase tracking-wider pointer-events-none transition-all shadow-md flex items-center gap-1 ${
                      isSelected
                        ? "bg-regent-blue text-black font-bold border border-white"
                        : isCompleted
                        ? "bg-[#02091F]/95 text-regent-gold border border-regent-gold/80 font-bold shadow-[0_0_8px_rgba(255,199,25,0.3)]"
                        : isCurrent
                        ? "bg-regent-maroon text-white font-bold border border-regent-gold shadow-sm"
                        : "bg-[#071331]/95 text-slate-400 border border-slate-700/80"
                    }`}
                  >
                    {isCompleted && <CheckCircle2 className="w-2.5 h-2.5 text-regent-gold" />}
                    {isLocked && <Lock className="w-2.5 h-2.5 text-slate-400" />}
                    <span>{loc.atlasName || loc.worldName}</span>
                  </div>
                </div>
              );
            })}

            {/* Bottom Left: Retro Atlas Map Legend */}
            <div className="absolute bottom-2 left-2 z-20 hidden sm:flex items-center gap-2 bg-[#02091F]/90 border border-border-card/80 px-2.5 py-1 backdrop-blur-sm text-[8px] font-pixel text-text-muted shadow-sm">
              <span className="text-white font-bold flex items-center gap-1">
                <Layers className="w-3 h-3 text-regent-gold" /> ATLAS:
              </span>
              <span className="flex items-center gap-1 text-slate-400">
                <Lock className="w-2.5 h-2.5" /> FOGBOUND
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-cyan-400">
                <Flag className="w-2.5 h-2.5" /> EXPEDITION
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-regent-gold">
                <Crown className="w-2.5 h-2.5" /> MASTERED
              </span>
            </div>
          </div>
        </div>

        {/* Selected Realm Inspector Panel */}
        <div className="lg:col-span-5 xl:col-span-4">
          <LocationDetailPanel
            location={selectedLocation}
            secret={selectedSecret}
            onClose={() => {
              setSelectedSecret(null);
              const fallback =
                dynamicAtlasLocations.find((l) => l.status === "CURRENT") ||
                dynamicAtlasLocations[0];
              setSelectedLocation(fallback);
            }}
          />
        </div>
      </div>
    </div>
  );
}
