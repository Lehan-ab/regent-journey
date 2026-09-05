"use client";

import React from "react";
import Image from "next/image";
import { CompanionId, CompanionEmotion } from "@/types/player";

export interface PixelCompanionProps {
  companionId: CompanionId;
  emotion?: CompanionEmotion;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  variant?: "portrait" | "mini";
  animate?: boolean;
  className?: string;
  showGlow?: boolean;
}

const sizeMap = {
  xs: "w-6 h-6",
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-24 h-24",
  "2xl": "w-36 h-36 sm:w-44 sm:h-44",
  full: "w-full h-full",
};

const COMPANION_IMAGE_MAP: Record<CompanionId, string> = {
  raya: "/images/raya_companion.jpg",
  nova: "/images/nova_companion.jpg",
  kai: "/images/kai_companion.jpg",
};

export default function PixelCompanion({
  companionId,
  emotion = "idle",
  size = "md",
  variant = "portrait",
  animate = true,
  className = "",
  showGlow = false,
}: PixelCompanionProps) {
  const imageSrc = COMPANION_IMAGE_MAP[companionId] || "/images/nova_companion.jpg";

  // PORTRAIT VERSION (High-Resolution Pixel Art Creature Portrait)
  if (variant === "portrait") {
    return (
      <div
        className={`relative inline-flex items-center justify-center select-none ${
          sizeMap[size]
        } ${className}`}
      >
        {/* Background Magical Ambient Glow */}
        {showGlow && (
          <div
            className={`absolute inset-0 rounded-full blur-lg opacity-50 ${
              companionId === "raya"
                ? "bg-orange-500"
                : companionId === "nova"
                ? "bg-blue-500"
                : "bg-emerald-400"
            }`}
          />
        )}

        {/* Companion Artwork Container */}
        <div
          className={`relative w-full h-full rounded-none overflow-hidden ${
            animate
              ? emotion === "celebrate"
                ? "animate-bounce"
                : emotion === "happy"
                ? "animate-bounce-slight"
                : "animate-float-gentle"
              : ""
          }`}
        >
          <Image
            src={imageSrc}
            alt={`${companionId} companion`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Emotion Micro-Badge Overlay if active */}
        {emotion === "celebrate" && (
          <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 bg-regent-gold text-black font-pixel text-[9px] font-bold border border-yellow-950 shadow-sm animate-bounce">
            ✨
          </span>
        )}
        {emotion === "happy" && (
          <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 bg-green-500 text-white font-pixel text-[9px] font-bold border border-green-950 shadow-sm">
            ★
          </span>
        )}
        {emotion === "thinking" && (
          <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 bg-blue-500 text-white font-pixel text-[9px] font-bold border border-blue-950 shadow-sm">
            💡
          </span>
        )}
        {emotion === "surprised" && (
          <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 bg-purple-500 text-white font-pixel text-[9px] font-bold border border-purple-950 shadow-sm">
            !
          </span>
        )}
        {emotion === "proud" && (
          <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 bg-amber-600 text-white font-pixel text-[9px] font-bold border border-amber-950 shadow-sm">
            ⚜
          </span>
        )}
      </div>
    );
  }

  // MINI VERSION (Compact pixel sprite for map and small tokens)
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${
        sizeMap[size]
      } ${className}`}
    >
      <svg
        viewBox="0 0 32 32"
        className={`w-full h-full relative z-10 ${
          animate
            ? emotion === "celebrate"
              ? "animate-bounce"
              : emotion === "happy"
              ? "animate-bounce-slight"
              : "animate-float-gentle"
            : ""
        }`}
        style={{ shapeRendering: "crispEdges", imageRendering: "pixelated" }}
      >
        <ellipse cx="16" cy="30" rx="9" ry="1.5" fill="#000000" opacity="0.35" />

        {/* RAYA (Fox) */}
        {companionId === "raya" && (
          <g>
            <rect x="22" y="16" width="6" height="7" fill="#EA580C" />
            <rect x="24" y="13" width="5" height="5" fill="#C2410C" />
            <rect x="26" y="10" width="4" height="5" fill="#9BEA2D" />
            <rect x="10" y="16" width="12" height="11" fill="#EA580C" />
            <rect x="12" y="18" width="8" height="8" fill="#FFF7ED" />
            <rect x="9" y="15" width="14" height="3" fill="#800000" />
            <rect x="9" y="8" width="14" height="8" fill="#EA580C" />
            <polygon points="9,8 7,1 12,5" fill="#EA580C" />
            <polygon points="23,8 25,1 20,5" fill="#EA580C" />
            <rect x="12" y="10" width="2" height="3" fill="#1C1917" />
            <rect x="18" y="10" width="2" height="3" fill="#1C1917" />
            <rect x="13" y="10" width="1" height="1" fill="#FFFFFF" />
            <rect x="19" y="10" width="1" height="1" fill="#FFFFFF" />
            <rect x="15" y="12" width="2" height="1" fill="#1C1917" />
          </g>
        )}

        {/* NOVA (Owl) */}
        {companionId === "nova" && (
          <g>
            <ellipse cx="16" cy="18" rx="8" ry="9" fill="#1E293B" />
            <ellipse cx="16" cy="19" rx="6" ry="6" fill="#FEF3C7" />
            <rect x="10" y="15" width="12" height="3" fill="#800000" />
            <polygon points="10,8 12,4 14,8" fill="#0F172A" />
            <polygon points="22,8 20,4 18,8" fill="#0F172A" />
            <circle cx="13" cy="12" r="3" fill="#D97706" />
            <circle cx="19" cy="12" r="3" fill="#D97706" />
            <circle cx="13" cy="12" r="1.5" fill="#0F172A" />
            <circle cx="19" cy="12" r="1.5" fill="#0F172A" />
            <rect x="13.5" y="11" width="1" height="1" fill="#FFFFFF" />
            <rect x="19.5" y="11" width="1" height="1" fill="#FFFFFF" />
            <polygon points="16,13 15,16 17,16" fill="#F59E0B" />
          </g>
        )}

        {/* KAI (Deer Spirit) */}
        {companionId === "kai" && (
          <g>
            <rect x="11" y="17" width="10" height="10" fill="#B45309" />
            <rect x="13" y="18" width="6" height="7" fill="#FEF3C7" />
            <rect x="12" y="9" width="8" height="9" fill="#B45309" />
            {/* Glowing Antlers */}
            <path d="M12 9 L9 4 L10 2" stroke="#FFC719" strokeWidth="1.5" fill="none" />
            <path d="M20 9 L23 4 L22 2" stroke="#FFC719" strokeWidth="1.5" fill="none" />
            <circle cx="10" cy="2" r="1" fill="#FEF08A" />
            <circle cx="22" cy="2" r="1" fill="#FEF08A" />
            {/* Eyes */}
            <rect x="13" y="11" width="2" height="3" fill="#1C1917" />
            <rect x="17" y="11" width="2" height="3" fill="#1C1917" />
            <rect x="14" y="11" width="1" height="1" fill="#FFFFFF" />
            <rect x="18" y="11" width="1" height="1" fill="#FFFFFF" />
            <circle cx="16" cy="22" r="1.5" fill="#FFC719" />
          </g>
        )}
      </svg>
    </div>
  );
}
