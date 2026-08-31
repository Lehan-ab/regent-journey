"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AvatarConfig, ExplorerId } from "@/types/player";
import { EXPLORERS, DEFAULT_EXPLORER_ID } from "@/data/explorersData";

export interface PixelAvatarProps {
  explorerId?: ExplorerId;
  config?: AvatarConfig;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  variant?: "portrait" | "mini";
  animate?: boolean;
  className?: string;
  showFrame?: boolean;
  showAccessory?: boolean; // kept for interface compatibility
}

const SIZE_MAP: Record<string, string> = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
  xl: "w-16 h-16",
  "2xl": "w-24 h-24",
  full: "w-full h-full",
};

export default function PixelAvatar({
  explorerId = "pathfinder",
  config,
  size = "md",
  variant = "portrait",
  animate = false,
  className = "",
  showFrame = false,
}: PixelAvatarProps) {
  // Resolve explorer preset
  const resolvedId: ExplorerId =
    explorerId && EXPLORERS[explorerId]
      ? explorerId
      : DEFAULT_EXPLORER_ID;

  const explorer = EXPLORERS[resolvedId] || EXPLORERS.pathfinder;

  // -------------------------------------------------------------
  // VARIANT B: MINI / MAP SPRITE (Chibi overworld token)
  // -------------------------------------------------------------
  if (variant === "mini") {
    const { hairColor, outfitColor, skinColor } = explorer.miniSprite;

    return (
      <div
        className={`relative ${SIZE_MAP[size]} shrink-0 flex items-center justify-center select-none ${className}`}
      >
        <motion.div
          animate={animate ? { y: [0, -2, 0] } : undefined}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <svg
            viewBox="0 0 32 32"
            className="w-full h-full"
            style={{ imageRendering: "pixelated" }}
            shapeRendering="crispEdges"
          >
            {/* Chibi Hair Back */}
            <rect x="8" y="4" width="16" height="12" fill={hairColor} />
            <rect x="6" y="6" width="20" height="10" fill={hairColor} />

            {/* Chibi Head & Face */}
            <rect x="9" y="8" width="14" height="10" fill={skinColor} />
            <rect x="8" y="9" width="16" height="8" fill={skinColor} />

            {/* Eyes */}
            <rect x="11" y="11" width="3" height="4" fill="#0F172A" />
            <rect x="18" y="11" width="3" height="4" fill="#0F172A" />
            {/* Eye Gleam */}
            <rect x="11" y="11" width="1" height="1" fill="#FFFFFF" />
            <rect x="18" y="11" width="1" height="1" fill="#FFFFFF" />

            {/* Smile */}
            <rect x="14" y="16" width="4" height="1" fill="#78350F" />

            {/* Hair Front Fringe */}
            <rect x="9" y="5" width="14" height="4" fill={hairColor} />
            <rect x="8" y="7" width="4" height="3" fill={hairColor} />
            <rect x="20" y="7" width="4" height="3" fill={hairColor} />

            {/* Body / Outfit */}
            <rect x="9" y="18" width="14" height="9" fill={outfitColor} />
            <rect x="13" y="18" width="6" height="6" fill="#F8FAFC" />
            {/* Gold Lapel Brooch */}
            <rect x="11" y="20" width="2" height="2" fill="#FFC719" />

            {/* Collar */}
            <rect x="10" y="17" width="12" height="2" fill="#6E1328" />

            {/* Belt */}
            <rect x="9" y="25" width="14" height="2" fill="#3E2723" />
            <rect x="14" y="25" width="4" height="2" fill="#FFC719" />

            {/* Boots */}
            <rect x="10" y="27" width="4" height="4" fill="#1E293B" />
            <rect x="18" y="27" width="4" height="4" fill="#1E293B" />
          </svg>
        </motion.div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VARIANT A: PORTRAIT (Authentic High-Resolution RPG Character Art)
  // -------------------------------------------------------------
  return (
    <div
      className={`relative ${SIZE_MAP[size]} shrink-0 flex items-center justify-center select-none ${className}`}
    >
      <motion.div
        animate={animate ? { y: [0, -3, 0] } : undefined}
        transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
        className="relative w-full h-full overflow-hidden flex items-center justify-center"
      >
        <Image
          src={explorer.portraitUrl}
          alt={explorer.title}
          width={240}
          height={240}
          priority
          className="w-full h-full object-cover select-none pointer-events-none rounded-none"
        />

        {/* Optional Ornate Frame Border */}
        {showFrame && (
          <div className="absolute inset-0 border-2 border-regent-gold/80 pointer-events-none shadow-[inset_0_0_10px_rgba(255,199,25,0.2)]">
            <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-regent-gold" />
            <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-regent-gold" />
            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-regent-gold" />
            <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-regent-gold" />
          </div>
        )}
      </motion.div>
    </div>
  );
}
