"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Compass,
  BookOpen,
  Anchor,
  Flame,
  Star,
  Hammer,
  Feather,
  Key,
  MapPin,
  Sparkles,
} from "lucide-react";
import { NPC_REGISTRY, NPCRegistryEntry } from "@/data/npcRegistry";

interface NPCPortraitProps {
  npcId: string;
  expression?: "neutral" | "speaking" | "reaction";
  size?: "sm" | "md" | "lg" | "xl" | "cinematic" | "full";
  isSpeaking?: boolean;
  className?: string;
  showBadge?: boolean;
}

const NPC_ICONS: Record<string, React.ReactNode> = {
  "gatekeeper-aaron": <Compass className="w-1/2 h-1/2 text-amber-300" />,
  "archivist": <BookOpen className="w-1/2 h-1/2 text-emerald-300" />,
  "port-master-kael": <Anchor className="w-1/2 h-1/2 text-blue-300" />,
  "keeper": <Flame className="w-1/2 h-1/2 text-orange-300" />,
  "the-keeper": <Flame className="w-1/2 h-1/2 text-orange-300" />,
  "avenue-guide": <Star className="w-1/2 h-1/2 text-cyan-300" />,
  "builder": <Hammer className="w-1/2 h-1/2 text-amber-400" />,
  "the-builder": <Hammer className="w-1/2 h-1/2 text-amber-400" />,
  "scholar": <Feather className="w-1/2 h-1/2 text-teal-300" />,
  "the-scholar": <Feather className="w-1/2 h-1/2 text-teal-300" />,
  "librarian-vanya": <Key className="w-1/2 h-1/2 text-purple-300" />,
  "chief-librarian-vanya": <Key className="w-1/2 h-1/2 text-purple-300" />,
  "scout-mira": <MapPin className="w-1/2 h-1/2 text-emerald-400" />,
  "high-regent": <Sparkles className="w-1/2 h-1/2 text-yellow-300" />,
};

export default function NPCPortrait({
  npcId,
  expression = "neutral",
  size = "md",
  isSpeaking = false,
  className = "",
  showBadge = true,
}: NPCPortraitProps) {
  const [imageError, setImageError] = useState(false);
  const npc: NPCRegistryEntry = NPC_REGISTRY[npcId] || NPC_REGISTRY["gatekeeper-aaron"];

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16 sm:w-20 sm:h-20",
    lg: "w-24 h-24 sm:w-28 sm:h-28",
    xl: "w-28 h-28 sm:w-36 sm:h-36",
    cinematic: "w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48",
    full: "w-full h-full",
  };

  const portraitSrc = npc.portraits[expression] || npc.portraits.neutral;
  const icon = NPC_ICONS[npc.id] || <Sparkles className="w-1/2 h-1/2 text-regent-gold" />;

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.04, 1] : 1,
          y: isSpeaking ? [0, -3, 0] : 0,
        }}
        transition={{ duration: 0.4, repeat: isSpeaking ? Infinity : 0, repeatDelay: 1.2 }}
        className={`relative ${sizeClasses[size]} rounded-none border-2 bg-gradient-to-b from-[#1C0D05] to-[#0A0503] flex items-center justify-center overflow-hidden transition-all ${
          isSpeaking
            ? "border-regent-gold shadow-[0_0_16px_rgba(255,199,25,0.45)] ring-2 ring-regent-gold/30"
            : "border-[#4A3018] shadow-md"
        }`}
        style={{ borderColor: isSpeaking ? npc.accentColor : undefined }}
      >
        {/* Subtle corner notches */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-regent-gold/50 pointer-events-none z-20" />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-regent-gold/50 pointer-events-none z-20" />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-regent-gold/50 pointer-events-none z-20" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-regent-gold/50 pointer-events-none z-20" />

        {!imageError ? (
          <Image
            src={portraitSrc}
            alt={`${npc.name} (${expression})`}
            fill
            sizes="(max-width: 640px) 160px, 250px"
            className="object-cover object-top"
            onError={() => setImageError(true)}
          />
        ) : (
          /* High-fidelity procedural heraldic avatar representing the NPC */
          <div className="w-full h-full flex flex-col items-center justify-center relative p-1 bg-gradient-to-br from-[#24130A] via-[#150904] to-[#0D0502]">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `radial-gradient(circle at center, ${npc.accentColor} 0%, transparent 70%)`,
              }}
            />
            <div className="relative z-10 flex items-center justify-center">
              {icon}
            </div>
            <div className="relative z-10 mt-1">
              <span
                className="text-[8px] font-pixel uppercase tracking-widest px-1 py-0.5 border"
                style={{
                  color: npc.accentColor,
                  borderColor: `${npc.accentColor}40`,
                  backgroundColor: "#0A050390",
                }}
              >
                {expression === "reaction" ? "!" : expression === "speaking" ? "..." : npc.name.split(" ")[0]}
              </span>
            </div>
          </div>
        )}

        {/* Expression Indicator Pip */}
        {isSpeaking && (
          <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-regent-gold animate-ping pointer-events-none" />
        )}
      </motion.div>

      {/* NPC Name Badge */}
      {showBadge && (
        <div className="px-2 py-0.5 bg-[#120703] border border-regent-gold/60 text-[9px] font-pixel text-regent-gold font-bold mt-1 uppercase shadow-md truncate max-w-[130px] text-center">
          {npc.name}
        </div>
      )}
    </div>
  );
}
