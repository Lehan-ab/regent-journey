"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/onboarding")) {
    return null;
  }
  return (
    <footer className="relative w-full bg-[#050F2D] border-t-2 border-border-card mt-16 text-xs text-text-secondary overflow-hidden">
      {/* Mountain Skyline Silhouette Graphic Layer */}
      <div className="w-full h-8 bg-gradient-to-b from-[#02091F] to-[#050F2D] opacity-60 flex items-center justify-center overflow-hidden">
        <div className="flex items-center gap-6 text-[#52627E]/30 text-xs font-pixel select-none">
          <span>▲▲▲</span>
          <span>▲▲</span>
          <span>▲▲▲▲</span>
          <span>▲▲</span>
          <span>▲▲▲</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-20 md:pb-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-border-card/60">
          {/* Brand & Crest */}
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="relative w-10 h-10 bg-regent-maroon border-2 border-regent-gold flex items-center justify-center font-pixel-heading text-sm font-bold text-regent-gold shadow-[0_2px_0_#400000]">
              R
              <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-regent-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-pixel font-bold text-base text-white tracking-wide">
                  REGENT JOURNEY
                </p>
                <span className="bg-regent-maroon px-2 py-0.2 border border-red-950 text-[9px] font-pixel text-white">
                  DIGITAL GUIDE
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5 font-body">
                Prospect Digital Guide • Rotaract Club of Seethawaka Regent
              </p>
            </div>
          </div>

          {/* Motto & District Tag */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="px-3.5 py-1.5 bg-[#071331] border border-border-card text-[11px] font-pixel text-regent-gold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Rotaract District 3220</span>
            </div>
          </div>
        </div>

        {/* Bottom Slogan & World Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-5 text-[11px] text-text-muted">
          <p className="font-pixel text-[11px] text-regent-blue tracking-wide">
            DRIVEN BY PURPOSE. DEFINED BY IMPACT.
          </p>

          <div className="flex items-center gap-4 font-pixel text-[10px] text-text-secondary flex-wrap justify-center">
            <Link href="/" className="hover:text-regent-blue transition-colors">
              HOME
            </Link>
            <Link href="/journey" className="hover:text-regent-blue transition-colors">
              JOURNEY PATH
            </Link>
            <Link href="/missions" className="hover:text-regent-blue transition-colors">
              MISSIONS
            </Link>
            <Link href="/achievements" className="hover:text-regent-blue transition-colors">
              BADGES
            </Link>
            <Link href="/rota101" className="hover:text-regent-blue transition-colors">
              ROTA 101
            </Link>
            <Link href="/profile" className="hover:text-regent-blue transition-colors">
              PROFILE
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
