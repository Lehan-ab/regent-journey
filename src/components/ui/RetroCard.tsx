"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface RetroCardProps {
  children: React.ReactNode;
  className?: string;
  headerTag?: string;
  headerColor?: "blue" | "green" | "yellow" | "maroon" | "slate";
  interactive?: boolean;
  onClick?: () => void;
}

export default function RetroCard({
  children,
  className,
  headerTag,
  headerColor = "slate",
  interactive = false,
  onClick,
}: RetroCardProps) {
  const headerColors = {
    blue: "bg-regent-blue text-black border-regent-blueDark",
    green: "bg-regent-green text-black border-regent-greenDark",
    yellow: "bg-regent-gold text-black border-yellow-700",
    maroon: "bg-regent-maroon text-white border-red-950",
    slate: "bg-[#1E293B] text-text-secondary border-[#334155]",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative bg-background-card border-2 border-border-card text-white shadow-retro-card transition-all duration-150",
        interactive && "cursor-pointer hover:border-border-cardHighlight hover:-translate-y-1 hover:shadow-retro-card-lg active:translate-y-0 active:shadow-retro-card",
        className
      )}
    >
      {/* Retro corner pixel rivets */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-border-card/60 pointer-events-none" />
      <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-border-card/60 pointer-events-none" />
      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-border-card/60 pointer-events-none" />
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-border-card/60 pointer-events-none" />

      {/* Optional Top Tag */}
      {headerTag && (
        <div className="absolute -top-3.5 left-4 z-10">
          <span
            className={cn(
              "px-2.5 py-0.5 text-[10px] sm:text-xs font-pixel font-bold uppercase tracking-wider border",
              headerColors[headerColor]
            )}
          >
            {headerTag}
          </span>
        </div>
      )}

      {children}
    </div>
  );
}
