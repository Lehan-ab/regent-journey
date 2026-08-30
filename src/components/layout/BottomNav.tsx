"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Target, Trophy, User } from "lucide-react";
import { cn } from "@/lib/utils";

export default function BottomNav() {
  const pathname = usePathname();

  // Hide bottom nav on start screen
  if (pathname === "/") {
    return null;
  }

  const navItems = [
    { label: "REALM", href: "/home", icon: Home },
    { label: "JOURNEY", href: "/journey", icon: Compass },
    { label: "MISSIONS", href: "/missions", icon: Target },
    { label: "BADGES", href: "/achievements", icon: Trophy },
    { label: "PROFILE", href: "/profile", icon: User },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#050F2D]/95 backdrop-blur border-t-2 border-border-card shadow-[0_-4px_12px_rgba(0,0,0,0.5)]">
      <nav className="flex items-center justify-around h-16 px-2 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/home"
              ? pathname === "/home"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-1 px-1 transition-all duration-150 relative group",
                isActive
                  ? "text-regent-blue font-bold"
                  : "text-text-secondary hover:text-white"
              )}
            >
              {/* Active Indicator Top Line */}
              {isActive && (
                <div className="absolute -top-[2px] left-2 right-2 h-0.5 bg-regent-blue shadow-[0_0_8px_#20A9F6]" />
              )}

              <div
                className={cn(
                  "p-1 rounded-none transition-transform group-active:scale-90",
                  isActive && "bg-[#071331] border border-regent-blue/40"
                )}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="font-pixel text-[9px] tracking-wider mt-0.5 uppercase leading-tight">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
