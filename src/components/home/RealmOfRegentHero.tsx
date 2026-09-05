"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Sparkles, MapPin, ShieldCheck, Flame } from "lucide-react";
import RetroButton from "@/components/ui/RetroButton";
import PixelProgressBar from "@/components/ui/PixelProgressBar";
import { usePlayer } from "@/context/PlayerContext";

export default function RealmOfRegentHero() {
  const { journeyProgress } = usePlayer();
  return (
    <section className="relative w-full mb-8 overflow-hidden bg-background-card border-2 border-border-card text-white shadow-retro-card-lg">
      {/* Background Pixel Art Panoramic Image */}
      <div className="relative w-full h-[380px] sm:h-[430px] md:h-[480px] overflow-hidden">
        <Image
          src="/images/realm_of_regent_hero.jpg"
          alt="The Realm of Regent Pixel Art Landscape"
          fill
          priority
          className="object-cover object-center scale-100 hover:scale-105 transition-transform duration-1000 ease-out"
        />

        {/* Ambient Dark Gradient Overlays for High Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#02091F] via-[#02091F]/70 to-[#02091F]/30" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#02091F]/20 to-[#02091F]/80" />

        {/* Animated Mist Layers */}
        <motion.div
          animate={{ x: ["-10%", "10%", "-10%"] }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#02091F] to-transparent opacity-60 pointer-events-none"
        />

        {/* Ambient Floating Fireflies / Sparkles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: `${15 + i * 14}%`,
                y: `${40 + (i % 3) * 20}%`,
                opacity: 0.2,
                scale: 0.8,
              }}
              animate={{
                y: [`${40 + (i % 3) * 20}%`, `${30 + (i % 3) * 15}%`, `${40 + (i % 3) * 20}%`],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                repeat: Infinity,
                duration: 4 + i,
                ease: "easeInOut",
                delay: i * 0.7,
              }}
              className="absolute w-2 h-2 rounded-full bg-regent-gold shadow-[0_0_8px_#FFC719]"
            />
          ))}
        </div>

        {/* Top Floating Location Pill */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#02091F]/90 border border-border-card backdrop-blur-sm shadow-md">
            <MapPin className="w-3.5 h-3.5 text-regent-blue animate-bounce-slight" />
            <span className="font-pixel text-[10px] sm:text-xs text-white uppercase tracking-wider">
              SEETHAWAKA REGION • REALM OF REGENT
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-[#02091F]/90 border border-regent-gold/60 text-regent-gold font-pixel text-[10px] sm:text-xs backdrop-blur-sm shadow-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{journeyProgress}% JOURNEY COMPLETE</span>
          </div>
        </div>

        {/* Bottom Hero Content */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 z-20 max-w-2xl">
          {/* Small Label */}
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-regent-maroon text-white border border-red-950 font-pixel text-[10px] sm:text-xs uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3 h-3 text-regent-gold" />
            REGENT JOURNEY
          </div>

          {/* Main Title */}
          <h1 className="font-pixel text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-wide drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] leading-tight mb-2">
            THE REALM OF REGENT AWAITS
          </h1>

          {/* Supporting Copy */}
          <p className="font-body text-xs sm:text-sm md:text-base text-[#D0D7E5] max-w-xl mb-5 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Continue your journey through service, leadership, fellowship, and impact with the Rotaract Club of Seethawaka Regent.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <RetroButton
              variant="blue"
              size="lg"
              href="/journey"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="sm:flex-initial"
            >
              CONTINUE JOURNEY
            </RetroButton>

            <RetroButton
              variant="outline"
              size="lg"
              href="/journey"
              icon={<Compass className="w-5 h-5 text-regent-gold" />}
              className="sm:flex-initial bg-[#02091F]/80 backdrop-blur-sm"
            >
              VIEW JOURNEY MAP
            </RetroButton>
          </div>
        </div>
      </div>
    </section>
  );
}
