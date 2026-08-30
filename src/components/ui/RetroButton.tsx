"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface RetroButtonProps {
  children: React.ReactNode;
  variant?: "blue" | "green" | "yellow" | "maroon" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
}

export default function RetroButton({
  children,
  variant = "blue",
  size = "md",
  href,
  onClick,
  className,
  disabled = false,
  type = "button",
  icon,
  iconPosition = "left",
  fullWidth = false,
}: RetroButtonProps) {
  const variantStyles = {
    blue: "btn-retro-blue",
    green: "btn-retro-green",
    yellow: "btn-retro-yellow",
    maroon: "btn-retro-maroon",
    outline: "btn-retro-outline",
    ghost: "bg-transparent text-text-secondary hover:text-white border-transparent hover:bg-background-card/50",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm md:text-base gap-2",
    lg: "px-6 py-3.5 text-base md:text-lg gap-2.5 tracking-wide",
  };

  const baseStyles = cn(
    "btn-retro rounded-none select-none tracking-wider",
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "active:translate-y-1",
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="inline-flex shrink-0">{icon}</span>}
      <span className="font-pixel font-bold leading-none">{children}</span>
      {icon && iconPosition === "right" && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={baseStyles}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyles}
    >
      {content}
    </button>
  );
}
