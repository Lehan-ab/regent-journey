"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MessageSquare, Sparkles, RefreshCw } from "lucide-react";
import AskNovaModal from "@/components/ui/AskNovaModal";
import { mockUser } from "@/data/mockUserData";

export default function CompanionGreeting() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dialogueIndex, setDialogueIndex] = useState(0);

  const dialogues = [
    `“Rotary Roots is open. Your next lesson is Service Above Self.”`,
    `“Complete Chapter 1 to unlock the Seethawaka riverboats at Rotaract Harbor!”`,
    `“Every 100 XP brings you closer to the Pathfinder rank and official induction.”`,
    `“Check the upcoming General Meeting mission to earn +150 bonus XP!”`,
  ];

  const cycleDialogue = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDialogueIndex((prev) => (prev + 1) % dialogues.length);
  };

  return (
    <>
      <section className="w-full mb-5">
        <div className="flex items-center gap-3 md:gap-4">
          {/* Nova Floating Avatar Sprite */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: "easeInOut" }}
            onClick={() => setIsModalOpen(true)}
            className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-[#050F2D] border-2 border-regent-gold/80 p-0.5 cursor-pointer group shadow-[0_4px_0_#02091F] hover:border-regent-gold transition-all"
            title="Click to talk with Nova"
          >
            <div className="relative w-full h-full overflow-hidden bg-[#02091F]">
              <Image
                src={mockUser.companionUrl}
                alt="Nova Companion"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="absolute -bottom-2 -right-1 bg-regent-maroon px-1.5 py-0.2 border border-red-950 text-[8px] font-pixel text-regent-gold font-bold shadow-sm">
              NOVA
            </div>
          </motion.div>

          {/* Dialogue Speech Bubble */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="speech-bubble flex-1 p-3 sm:p-3.5 cursor-pointer hover:border-regent-blue transition-all duration-150 shadow-retro-card group relative"
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-xs text-regent-gold font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> NOVA
                </span>
                <span className="text-[10px] text-text-muted hidden sm:inline">
                  • Mystic Guide
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={cycleDialogue}
                  className="p-1 text-text-muted hover:text-regent-gold border border-border-card/40 bg-[#02091F] text-[9px] font-pixel flex items-center gap-1"
                  title="Next hint"
                >
                  <RefreshCw className="w-2.5 h-2.5" /> HINT
                </button>
                <span className="font-pixel text-[9px] text-regent-blue uppercase tracking-wider group-hover:underline flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" /> TALK
                </span>
              </div>
            </div>

            <motion.p
              key={dialogueIndex}
              initial={{ opacity: 0, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-body text-xs sm:text-sm text-white font-medium leading-relaxed"
            >
              {dialogues[dialogueIndex]}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Interactive Modal */}
      <AskNovaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
