"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Shield,
  ChevronDown,
  Landmark,
} from "lucide-react";
import RetroButton from "@/components/ui/RetroButton";
import { mockUser } from "@/data/mockUserData";

export default function StartPage() {
  const scrollToStory = () => {
    const el = document.getElementById("story-overview");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const hasProgress = mockUser.xp > 0 || mockUser.journeyProgress > 0;

  return (
    <div className="w-full">
      {/* 
        ============================================================
        1. CINEMATIC START SCREEN HERO
        ============================================================
      */}
      <section className="relative w-full min-h-[90vh] sm:min-h-[92vh] flex flex-col justify-between overflow-hidden border-b-2 border-border-card bg-[#02091F]">
        {/* Full-Bleed Pixel Art Panoramic Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/realm_of_regent_hero.jpg"
            alt="The Realm of Regent Pixel Art Overworld"
            fill
            priority
            className="object-cover object-center scale-100 sm:scale-105 transition-transform duration-1000 ease-out"
          />

          {/* Cinematic Dark Gradient Layers */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#02091F] via-[#02091F]/70 to-[#02091F]/40" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#02091F]/20 to-[#02091F]/80" />

          {/* Ambient Drifting Mist */}
          <motion.div
            animate={{ x: ["-15%", "15%", "-15%"] }}
            transition={{ repeat: Infinity, duration: 28, ease: "easeInOut" }}
            className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#02091F] via-[#02091F]/60 to-transparent pointer-events-none"
          />

          {/* Ambient Fireflies */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  x: `${12 + i * 14}%`,
                  y: `${38 + (i % 3) * 15}%`,
                  opacity: 0.2,
                  scale: 0.8,
                }}
                animate={{
                  y: [`${38 + (i % 3) * 15}%`, `${28 + (i % 3) * 12}%`, `${38 + (i % 3) * 15}%`],
                  opacity: [0.2, 0.7, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4 + i,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
                className="absolute w-2 h-2 rounded-full bg-regent-gold shadow-[0_0_8px_#FFC719]"
              />
            ))}
          </div>
        </div>

        {/* Top Header Strip */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-6 w-full flex items-center justify-between">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#02091F]/90 border border-regent-gold/80 text-regent-gold font-pixel text-[10px] sm:text-xs backdrop-blur shadow-md">
            <Landmark className="w-3.5 h-3.5" />
            <span>INSPIRED BY SEETHAWAKA HERITAGE</span>
          </div>

          <Link
            href="/home"
            className="px-3 py-1 bg-regent-maroon text-white border border-red-950 font-pixel text-[10px] sm:text-xs uppercase hover:bg-regent-blue hover:text-black transition-colors"
          >
            ENTER REALM →
          </Link>
        </div>

        {/* Center/Bottom Start Screen Hero Copy & Characters */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pb-10 sm:pb-14 text-center">
          {/* Subtitle / Club Name */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-regent-maroon text-white border border-red-950 font-pixel text-xs sm:text-sm uppercase tracking-widest mb-3 shadow-md"
          >
            <Shield className="w-3.5 h-3.5 text-regent-gold" />
            ROTARACT CLUB OF SEETHAWAKA REGENT
          </motion.div>

          {/* Main Brand Title */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-pixel text-regent-gold text-lg sm:text-2xl font-bold tracking-widest uppercase mb-1"
          >
            REGENT JOURNEY
          </motion.h2>

          {/* Main Tagline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-pixel text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] leading-tight mb-4"
          >
            YOUR JOURNEY INTO ROTARACT STARTS HERE.
          </motion.h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-body text-sm sm:text-base md:text-lg text-[#D6DEEE] max-w-2xl mx-auto mb-6 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
          >
            Explore the movement. Discover where you belong. Experience real impact. Begin your path toward becoming a Regent.
          </motion.p>

          {/* Foreground Characters: Explorer Avatar + Nova Companion looking toward the world */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex items-end justify-center gap-3 mb-6 pointer-events-none"
          >
            {/* Explorer Avatar */}
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
              className="flex flex-col items-center"
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 border-2 border-regent-gold bg-[#02091F] overflow-hidden shadow-[0_0_12px_#FFC719]">
                <Image
                  src={mockUser.avatarUrl}
                  alt="Regent Explorer Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-12 h-1.5 rounded-full bg-black/80 blur-[1px] mt-1" />
            </motion.div>

            {/* Nova Companion */}
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut", delay: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 border border-border-card bg-[#02091F] overflow-hidden shadow-md">
                <Image
                  src={mockUser.companionUrl}
                  alt="Nova Companion"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="w-8 h-1 rounded-full bg-black/70 blur-[1px] mt-1" />
            </motion.div>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto"
          >
            <RetroButton
              variant="blue"
              size="lg"
              href="/home"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              fullWidth
            >
              {hasProgress ? "CONTINUE YOUR JOURNEY" : "BEGIN YOUR JOURNEY"}
            </RetroButton>

            <RetroButton
              variant="outline"
              size="lg"
              onClick={scrollToStory}
              icon={<Compass className="w-5 h-5 text-regent-gold" />}
              fullWidth
              className="bg-[#02091F]/90 backdrop-blur"
            >
              WHAT IS REGENT JOURNEY?
            </RetroButton>
          </motion.div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="relative z-10 pb-4 text-center">
          <button
            onClick={scrollToStory}
            className="text-text-muted hover:text-white transition-colors animate-bounce p-1"
            aria-label="Scroll to learn more"
          >
            <ChevronDown className="w-5 h-5 mx-auto" />
          </button>
        </div>
      </section>

      {/* 
        ============================================================
        2. OPTIONAL SIMPLE INTRO (3 Items Maximum)
        ============================================================
      */}
      <section id="story-overview" className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
        <div className="inline-flex p-2.5 bg-[#071331] border-2 border-regent-gold mb-3">
          <Compass className="w-6 h-6 text-regent-gold" />
        </div>

        <h2 className="font-pixel text-2xl sm:text-3xl font-bold text-white tracking-wide mb-3">
          THE PATHWAY TO REGENT MEMBERSHIP
        </h2>

        <p className="font-body text-xs sm:text-sm text-text-secondary max-w-xl mx-auto mb-10 leading-relaxed">
          Rooted in the historical pride of Seethawaka, Regent Journey guides prospects through interactive lore, 7 avenue explorations, and on-ground club service on the road to official induction.
        </p>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left mb-10">
          {/* Step 1: DISCOVER */}
          <div className="p-5 bg-[#071331] border-2 border-border-card shadow-retro-card relative group hover:border-regent-blue transition-colors">
            <div className="w-8 h-8 bg-regent-maroon text-white font-pixel text-xs font-bold flex items-center justify-center border border-red-950 mb-3">
              01
            </div>
            <h3 className="font-pixel text-base font-bold text-white tracking-wide mb-1.5">
              DISCOVER
            </h3>
            <p className="font-body text-xs text-text-secondary leading-relaxed">
              Learn how Rotary and Rotaract work.
            </p>
          </div>

          {/* Step 2: EXPLORE */}
          <div className="p-5 bg-[#071331] border-2 border-border-card shadow-retro-card relative group hover:border-regent-gold transition-colors">
            <div className="w-8 h-8 bg-regent-maroon text-white font-pixel text-xs font-bold flex items-center justify-center border border-red-950 mb-3">
              02
            </div>
            <h3 className="font-pixel text-base font-bold text-white tracking-wide mb-1.5">
              EXPLORE
            </h3>
            <p className="font-body text-xs text-text-secondary leading-relaxed">
              Discover Seethawaka Regent and the seven avenues.
            </p>
          </div>

          {/* Step 3: EXPERIENCE */}
          <div className="p-5 bg-[#071331] border-2 border-border-card shadow-retro-card relative group hover:border-regent-green transition-colors">
            <div className="w-8 h-8 bg-regent-maroon text-white font-pixel text-xs font-bold flex items-center justify-center border border-red-950 mb-3">
              03
            </div>
            <h3 className="font-pixel text-base font-bold text-white tracking-wide mb-1.5">
              EXPERIENCE
            </h3>
            <p className="font-body text-xs text-text-secondary leading-relaxed">
              Join real projects and meetings as you progress toward membership.
            </p>
          </div>
        </div>

        {/* Final Start CTA */}
        <RetroButton
          variant="green"
          size="lg"
          href="/home"
          icon={<ArrowRight className="w-5 h-5" />}
          iconPosition="right"
          className="shadow-retro-green"
        >
          ENTER THE REALM
        </RetroButton>
      </section>
    </div>
  );
}
