"use client";

import React from "react";
import { Compass, Footprints, Sparkles, Mountain } from "lucide-react";

interface WorldDividerProps {
  label?: string;
  icon?: "compass" | "path" | "mountain" | "sparkles";
}

export default function WorldDivider({
  label,
  icon = "compass",
}: WorldDividerProps) {
  const renderIcon = () => {
    switch (icon) {
      case "mountain":
        return <Mountain className="w-3.5 h-3.5 text-regent-blue" />;
      case "path":
        return <Footprints className="w-3.5 h-3.5 text-regent-gold" />;
      case "sparkles":
        return <Sparkles className="w-3.5 h-3.5 text-regent-green" />;
      default:
        return <Compass className="w-3.5 h-3.5 text-regent-gold" />;
    }
  };

  return (
    <div className="w-full my-6 flex items-center justify-center gap-3 select-none">
      {/* Left Dotted Pixel Trail */}
      <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#52627E]/40 to-[#52627E] border-b border-dashed border-[#52627E]/60" />

      {/* Center Marker Node */}
      <div className="flex items-center gap-1.5 px-3 py-1 bg-[#050F2D] border-2 border-border-card text-xs font-pixel text-text-muted shadow-[0_2px_0_#02091F]">
        {renderIcon()}
        {label && <span className="text-[9px] uppercase tracking-widest text-text-secondary">{label}</span>}
      </div>

      {/* Right Dotted Pixel Trail */}
      <div className="flex-1 h-[2px] bg-gradient-to-l from-transparent via-[#52627E]/40 to-[#52627E] border-b border-dashed border-[#52627E]/60" />
    </div>
  );
}
