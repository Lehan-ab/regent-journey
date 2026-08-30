"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  CheckCircle2,
  Lock,
  Sparkles,
  MapPin,
  Flame,
  Trees,
  Castle,
  Anchor,
  Hammer,
  BookOpen,
  Flag,
  Mountain,
  Landmark,
  Eye,
  Scroll,
  Radio,
  Trophy,
  Coins,
  Heart,
  Users,
  Shield,
  HelpCircle,
} from "lucide-react";
import PixelProgressBar from "@/components/ui/PixelProgressBar";
import LocationDetailPanel from "./LocationDetailPanel";
import {
  realmLocations,
  RealmLocation,
  mapSecrets,
  MapSecret,
  sevenAvenueRealms,
} from "@/data/realmMapLocations";
import { mockUser } from "@/data/mockUserData";

export default function RegentRealmMap() {
  const [selectedLocation, setSelectedLocation] = useState<RealmLocation | null>(
    realmLocations.find((loc) => loc.status === "CURRENT") || realmLocations[1]
  );
  const [selectedSecret, setSelectedSecret] = useState<MapSecret | null>(null);
  const [discoveredSecrets, setDiscoveredSecrets] = useState<string[]>([]);
  const [hoveredLocation, setHoveredLocation] = useState<RealmLocation | null>(null);

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
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#02091F] border border-regent-gold text-regent-gold shadow-sm">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-pixel text-sm sm:text-base font-bold text-white tracking-wider">
                THE REALM OF REGENT
              </h2>
              <span className="hidden sm:inline-flex px-2 py-0.2 bg-[#02091F] text-regent-gold text-[9px] font-pixel border border-regent-gold/40">
                SEETHAWAKA OVERWORLD
              </span>
            </div>
            <p className="text-[11px] text-text-muted font-body">
              Explore the 10 living world regions and discover hidden Seethawaka landmarks
            </p>
          </div>
        </div>

        {/* Overall Journey Progress Indicator */}
        <div className="min-w-[200px] max-w-xs bg-[#02091F] p-2 border border-border-card">
          <div className="flex items-center justify-between text-[10px] font-pixel mb-1">
            <span className="text-regent-gold flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> JOURNEY PROGRESS
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

      {/* Main Grid: Living Overworld Map + Inspector Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map Canvas (12 cols mobile, 7/8 cols desktop) */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/11] bg-[#02091F] border-2 border-border-card overflow-hidden shadow-retro-card-lg select-none group">
            {/* 1. Base Layer: Rich Pixel Art Overworld Landscape */}
            <Image
              src="/images/chapter3_realms.jpg"
              alt="Regent Realm Living Overworld"
              fill
              priority
              className="object-cover object-center brightness-95 contrast-105"
            />

            {/* 2. Tactical Gradient Base */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#02091F]/50 via-transparent to-[#02091F]/40 pointer-events-none" />

            {/* 3. Multi-Layer Fog of War (Veiling locked future regions) */}
            {/* Upper Misty Mountains Veil (Chapters 8, 9, 10) */}
            <div
              className="absolute inset-0 pointer-events-none z-15 bg-gradient-to-b from-[#02091F]/90 via-[#05112B]/60 to-transparent"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
              }}
            />

            {/* Mid Realm Atmosphere Mist (Chapters 5, 6, 7) */}
            <div
              className="absolute inset-0 pointer-events-none z-15 bg-[#030d24]/30 backdrop-blur-[0.3px]"
              style={{
                clipPath: "polygon(0 40%, 100% 40%, 100% 65%, 0 65%)",
              }}
            />

            {/* Drifting Cloud Veils Across High Summit */}
            <motion.div
              animate={{ x: ["-10%", "10%", "-10%"] }}
              transition={{ repeat: Infinity, duration: 24, ease: "easeInOut" }}
              className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#02091F]/70 via-[#0a1b3d]/30 to-transparent pointer-events-none z-15"
            />

            {/* 5. In-World Landmark Micro-Visuals (Themed World Features) */}

            {/* Region 2: Rotary Roots - Seethawaka Botanical Garden Grove */}
            <div
              style={{ left: "32%", top: "76%" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-12"
            >
              {/* Luminous Ancient Banyan Roots Aura */}
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 blur-md animate-pulse" />
            </div>

            {/* Region 4: Regent Keep - Rajasinghe Castle Ruins Aura */}
            <div
              style={{ left: "24%", top: "56%" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-12"
            >
              <div className="w-14 h-14 rounded-full bg-red-900/25 blur-md" />
            </div>

            {/* Region 5: The Seven Realms - Signal Spire Light Pulse */}
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.1, 0.9] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              style={{ left: "54%", top: "58%" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-12"
            >
              <div className="w-16 h-16 rounded-full bg-purple-500/20 blur-md" />
            </motion.div>

            {/* Region 6: Project Forge - Industrial Spark Motes */}
            <motion.div
              animate={{ opacity: [0.4, 0.9, 0.4] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              style={{ left: "82%", top: "52%" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-12"
            >
              <div className="w-12 h-12 rounded-full bg-amber-500/20 blur-md" />
            </motion.div>

            {/* Region 10: Membership Citadel - Summit Light Pulse */}
            <motion.div
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{ left: "50%", top: "12%" }}
              className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-12"
            >
              <div className="w-20 h-20 rounded-full bg-yellow-400/25 blur-lg" />
            </motion.div>

            {/* 6. In-World Ambient Particles (Fireflies in Botanical Canopy) */}
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
                    y: [`${70 + (i % 2) * 10}%`, `${65 + (i % 2) * 8}%`, `${70 + (i % 2) * 10}%`],
                    opacity: [0.2, 0.7, 0.2],
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

            {/* 7. Secret Discovery Easter Eggs (Clickable World Landmarks) */}
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

            {/* 8. The 10 Refined In-World Chapter Markers */}
            {realmLocations.map((loc) => {
              const isSelected = selectedLocation?.id === loc.id;
              const isCurrent = loc.status === "CURRENT";
              const isCompleted = loc.status === "COMPLETED";
              const isLocked = loc.status === "LOCKED";
              const isHovered = hoveredLocation?.id === loc.id;

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
                  {/* Subtle Elegant Chapter Marker (Replaces oversized icons) */}
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative flex items-center justify-center p-1 sm:p-1.5 transition-all ${
                      isSelected
                        ? "bg-regent-blue text-black border-2 border-white shadow-[0_0_12px_#20A9F6]"
                        : isCurrent
                        ? "bg-regent-maroon text-white border-2 border-regent-gold shadow-[0_0_10px_#FFC719] animate-pulse"
                        : isCompleted
                        ? "bg-green-950 text-regent-green border border-regent-green/60"
                        : "bg-[#071331]/90 text-text-muted border border-border-card/70 hover:border-text-secondary"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-3 h-3 text-regent-green" />
                    ) : isLocked ? (
                      <Lock className="w-2.5 h-2.5 text-text-muted" />
                    ) : isCurrent ? (
                      <Sparkles className="w-3 h-3 text-regent-gold fill-regent-gold" />
                    ) : (
                      <Flag className="w-2.5 h-2.5 text-white" />
                    )}

                    {/* Small Chapter Number Badge */}
                    <span className="absolute -top-2 -right-2 bg-regent-maroon px-1 py-0.2 border border-red-950 text-[7px] font-pixel text-white font-bold leading-none">
                      {loc.number}
                    </span>
                  </motion.div>

                  {/* In-World Player Avatar & Nova Companion (Standing IN Rotary Roots) */}
                  {isCurrent && (
                    <motion.div
                      animate={{ y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                      className="absolute -top-11 left-1/2 -translate-x-1/2 flex items-end gap-1 pointer-events-none z-30"
                    >
                      {/* Avatar with ground contact shadow */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-8 h-8 rounded-none border-2 border-regent-gold bg-[#02091F] overflow-hidden shadow-[0_0_8px_#FFC719]">
                          <Image
                            src={mockUser.avatarUrl}
                            alt="Lehan Avatar"
                            fill
                            className="object-cover"
                          />
                        </div>
                        {/* Ground Contact Shadow */}
                        <div className="w-6 h-1 rounded-full bg-black/70 blur-[1px] mt-0.5" />
                      </div>

                      {/* Nova Companion Beside Player */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-5 h-5 border border-border-card bg-[#02091F] overflow-hidden">
                          <Image
                            src={mockUser.companionUrl}
                            alt="Nova Companion"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="w-4 h-0.5 rounded-full bg-black/60 blur-[1px] mt-0.5" />
                      </div>
                    </motion.div>
                  )}

                  {/* Refined World Region Label */}
                  <div
                    className={`absolute top-full mt-1 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.2 font-pixel text-[8px] sm:text-[9px] uppercase tracking-wider pointer-events-none transition-all shadow-md ${
                      isSelected
                        ? "bg-regent-blue text-black font-bold border border-white"
                        : isCurrent
                        ? "bg-regent-maroon text-white font-bold border border-red-950"
                        : isCompleted
                        ? "bg-[#02091F]/90 text-regent-green border border-regent-green/50"
                        : "bg-[#02091F]/80 text-text-muted border border-border-card/60"
                    }`}
                  >
                    {loc.name}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Location Inspector Panel (Right column on desktop, beneath on mobile) */}
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
