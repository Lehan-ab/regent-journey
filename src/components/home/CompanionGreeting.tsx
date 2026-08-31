"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Sparkles, RefreshCw } from "lucide-react";
import PixelCompanion from "@/components/companion/PixelCompanion";
import AskNovaModal from "@/components/ui/AskNovaModal";
import { usePlayer } from "@/context/PlayerContext";
import { COMPANIONS } from "@/data/companionsData";

export default function CompanionGreeting() {
  const { player } = usePlayer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const companion = COMPANIONS[player.companion] || COMPANIONS.nova;
  const playerName = player.name || "Explorer";

  const rawGreetings = companion.homeGreetings || [
    `“Rotary Roots is active, {name}. Your next lesson is Service Above Self.”`,
    `“Complete Chapter 1 to unlock the Seethawaka riverboats at Rotaract Harbor!”`,
    `“Explore all 7 Avenues in The Seven Realms to discover where your passion ignites.”`,
    `“Every 100 XP brings you closer to the Pathfinder rank and official induction.”`,
    `“Check the upcoming General Meeting mission to earn +150 bonus XP!”`,
  ];

  const dialogues = rawGreetings.map((d) => d.replace(/\{name\}/g, playerName));

  const cycleDialogue = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDialogueIndex((prev) => (prev + 1) % dialogues.length);
  };

  return (
    <>
      <section className="w-full mb-5">
        <div className="flex items-center gap-3">
          {/* Floating Companion Avatar Sprite */}
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
            onClick={() => setIsModalOpen(true)}
            className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 bg-[#050F2D] border-2 border-regent-gold/80 p-1 cursor-pointer group shadow-[0_3px_0_#02091F] hover:border-regent-gold transition-all"
            title={`Click to talk with ${companion.name}`}
          >
            <div className="relative w-full h-full overflow-hidden bg-[#02091F] flex items-center justify-center">
              <PixelCompanion
                companionId={companion.id}
                emotion="happy"
                size="full"
                animate={true}
              />
            </div>
            <div className="absolute -bottom-2 -right-1 bg-regent-maroon px-1.5 py-0.2 border border-red-950 text-[7px] sm:text-[8px] font-pixel text-regent-gold font-bold shadow-sm uppercase">
              {companion.name}
            </div>
          </motion.div>

          {/* Dialogue Speech Bubble */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="speech-bubble flex-1 p-2.5 sm:p-3 cursor-pointer hover:border-regent-blue transition-all duration-150 shadow-retro-card group relative min-w-0"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="font-pixel text-[11px] sm:text-xs text-regent-gold font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 shrink-0" /> {companion.name}
                </span>
                <span className="text-[10px] text-text-muted hidden sm:inline truncate">
                  • {companion.tagline}
                </span>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={cycleDialogue}
                  className="p-1 text-text-muted hover:text-regent-gold border border-border-card/40 bg-[#02091F] text-[8px] sm:text-[9px] font-pixel flex items-center gap-1"
                  title="Next hint"
                >
                  <RefreshCw className="w-2.5 h-2.5" /> HINT
                </button>
                <span className="font-pixel text-[8px] sm:text-[9px] text-regent-blue uppercase tracking-wider group-hover:underline flex items-center gap-0.5">
                  <MessageSquare className="w-2.5 h-2.5" /> TALK
                </span>
              </div>
            </div>

            <motion.p
              key={dialogueIndex}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-body text-xs sm:text-sm text-white font-medium leading-relaxed break-words"
            >
              {dialogues[dialogueIndex % dialogues.length]}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Interactive Modal */}
      <AskNovaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
