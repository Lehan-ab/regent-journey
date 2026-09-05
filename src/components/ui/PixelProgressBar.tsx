"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PixelProgressBarProps {
  progress: number; // 0 to 100
  color?: "blue" | "green" | "yellow" | "maroon";
  showLabel?: boolean;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function PixelProgressBar({
  progress,
  color = "blue",
  showLabel = true,
  label,
  size = "md",
  className,
}: PixelProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  const colorStyles = {
    blue: "bg-regent-blue shadow-[0_0_12px_rgba(32,169,246,0.6)]",
    green: "bg-regent-green shadow-[0_0_12px_rgba(155,234,45,0.6)]",
    yellow: "bg-regent-gold shadow-[0_0_12px_rgba(255,199,25,0.6)]",
    maroon: "bg-regent-maroon shadow-[0_0_12px_rgba(128,0,0,0.6)]",
  };

  const heightStyles = {
    sm: "h-2.5",
    md: "h-4",
    lg: "h-6",
  };

  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex items-center justify-between mb-1.5 font-pixel text-xs">
          <span className="text-text-secondary">{label || "PROGRESS"}</span>
          <span className="text-white font-bold">{clampedProgress}%</span>
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || "Progress"}
        className={cn(
          "w-full bg-[#03091A] border-2 border-border-card p-0.5 overflow-hidden relative",
          heightStyles[size]
        )}
      >
        {/* Animated Bar */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn("h-full relative transition-all duration-300", colorStyles[color])}
        >
          {/* Subtle striped retro pattern */}
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                "linear-gradient(45deg, rgba(0,0,0,0.4) 25%, transparent 25%, transparent 50%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.4) 75%, transparent 75%, transparent)",
              backgroundSize: "8px 8px",
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
