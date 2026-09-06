"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MessageCircle, X, ChevronRight, Compass, Trophy } from "lucide-react";
import PixelCompanion from "@/components/companion/PixelCompanion";
import { usePlayer } from "@/context/PlayerContext";
import { COMPANIONS } from "@/data/companionsData";
import { CHAPTERS_DATA } from "@/data/chaptersData";
import { realmLocations } from "@/data/realmMapLocations";
import { audioManager } from "@/lib/audioManager";
import { personalizeDialogue } from "@/lib/dialoguePersonalizer";

export default function FloatingClashGuide() {
  const router = useRouter();
  const pathname = usePathname();
  const { player, isHydrated } = usePlayer();

  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);
  const [bubbleText, setBubbleText] = useState<string>("");

  const companionKey = player.companion || "nova";
  const companion = COMPANIONS[companionKey] || COMPANIONS.nova;
  const name = player.name || "Prospect";

  // Hide on onboarding or when reader is active in full screen
  const isExcluded = pathname?.startsWith("/onboarding");

  // Determine current quest target
  const nextTarget = React.useMemo(() => {
    for (const loc of realmLocations) {
      const chapterData = CHAPTERS_DATA[loc.id];
      if (!chapterData) continue;
      for (const lesson of chapterData.lessons) {
        if (!player.completedLessons?.includes(lesson.id)) {
          return {
            chapter: chapterData,
            lesson,
            realm: loc,
          };
        }
      }
    }
    return null;
  }, [player.completedLessons]);

  // Initial greeting prompt
  useEffect(() => {
    if (!hasPrompted && isHydrated && !isExcluded) {
      const timer = setTimeout(() => {
        setBubbleText(
          nextTarget
            ? personalizeDialogue(
                companion.id === "nova"
                  ? "Welcome back, {name}. The realm of {location} awaits your wisdom."
                  : companion.id === "raya"
                  ? "{name}! Another quest is waiting in {location}!"
                  : "Good to see you, {name}. Let's advance into {location}.",
                { name, location: nextTarget.chapter.worldName }
              )
            : personalizeDialogue(
                companion.id === "nova"
                  ? "Magnificent work, {name}. You have mastered every realm in Seethawaka."
                  : companion.id === "raya"
                  ? "Incredible, {name}! Every realm in Seethawaka has been conquered!"
                  : "Respect, {name}. Every realm in Seethawaka stands mastered.",
                { name }
              )
        );
        setHasPrompted(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [hasPrompted, isHydrated, isExcluded, nextTarget, name, companion.id]);

  if (isExcluded || !isHydrated) return null;

  const handleOpenDialog = () => {
    audioManager.playTap();
    audioManager.playDialogueBlip(50);
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    audioManager.playTap();
    setIsOpen(false);
  };

  const handleGoToNextQuest = () => {
    audioManager.playTap();
    audioManager.playWhoosh();
    setIsOpen(false);
    if (nextTarget) {
      router.push(`/journey/${nextTarget.chapter.id}?lesson=${nextTarget.lesson.id}`);
    } else {
      router.push("/journey");
    }
  };

  return (
    <>
      {/* Floating Guide Portrait in Corner */}
      <div className="fixed bottom-20 left-4 md:bottom-6 md:left-6 z-40 select-none">
        {/* Animated CoC Speech Bubble Prompt */}
        <AnimatePresence>
          {!isOpen && bubbleText && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-14 left-0 mb-2 w-52 sm:w-60 bg-[#120703] border-2 border-regent-gold p-3 shadow-2xl rounded-sm"
              onClick={handleOpenDialog}
            >
              {/* Pointer triangle */}
              <div className="absolute -bottom-2 left-6 w-3 h-3 bg-[#120703] border-r-2 border-b-2 border-regent-gold rotate-45" />

              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="font-pixel text-[9px] text-regent-gold uppercase font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-regent-gold" />
                  {companion.name} • COMPANION GUIDE
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setBubbleText("");
                  }}
                  className="text-[#A48871] hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              <p className="font-serif text-xs text-[#F4EDE5] leading-snug cursor-pointer">
                {bubbleText}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Companion Avatar Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleOpenDialog}
          className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 bg-[#140803] border-2 border-regent-gold p-1 shadow-[0_0_15px_rgba(255,199,25,0.4)] rounded-none group cursor-pointer"
          title={`Talk to ${companion.name}`}
        >
          <PixelCompanion
            companionId={companion.id}
            emotion="happy"
            size="full"
            animate={true}
          />

          {/* Glowing Badge Tag */}
          <span className="absolute -top-1.5 -right-1.5 px-1.5 py-0.2 bg-regent-maroon border border-regent-gold text-[8px] font-pixel text-yellow-300 font-bold shadow-md">
            LVL {player.level || 1}
          </span>
        </motion.button>
      </div>

      {/* Clash of Clans Full Guide Dialogue Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="relative w-full max-w-md bg-[#0C0603] border-4 border-regent-gold shadow-[0_0_40px_rgba(255,199,25,0.3)] p-5 text-white"
            >
              {/* Corner Accents */}
              <div className="absolute top-1 left-1 w-4 h-4 border-t-2 border-l-2 border-regent-gold pointer-events-none" />
              <div className="absolute top-1 right-1 w-4 h-4 border-t-2 border-r-2 border-regent-gold pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-4 h-4 border-b-2 border-l-2 border-regent-gold pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-4 h-4 border-b-2 border-r-2 border-regent-gold pointer-events-none" />

              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-yellow-900/60">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-regent-gold text-base">⚜</span>
                  <div>
                    <h3 className="font-pixel text-sm text-regent-gold font-bold uppercase">
                      COMPANION {companion.name.toUpperCase()}
                    </h3>
                    <p className="text-[10px] text-[#A48871] font-pixel">
                      {companion.tagline}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleCloseDialog}
                  className="p-1 text-regent-gold hover:text-white"
                  aria-label="Close guide dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Main CoC Villager Box */}
              <div className="flex items-start gap-3.5 p-3.5 bg-[#170B05] border border-[#4A2610] mb-4">
                <div className="w-16 h-16 sm:w-18 sm:h-18 bg-[#0C0603] border-2 border-regent-gold p-1 shrink-0 shadow-md flex items-center justify-center">
                  <PixelCompanion
                    companionId={companion.id}
                    emotion="proud"
                    size="full"
                    animate={true}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="text-[10px] font-pixel text-regent-gold mb-1 font-bold">
                    GUIDANCE FOR {name.toUpperCase()}:
                  </div>
                  <p className="font-serif text-xs sm:text-sm text-[#F0E6D8] leading-relaxed">
                    {nextTarget
                      ? personalizeDialogue(
                          `“{name}! Our next objective is ${nextTarget.lesson.title} inside {location}! Complete the chronicle trials to earn +${nextTarget.lesson.xpReward} XP!”`,
                          { name, location: nextTarget.chapter.worldName }
                        )
                      : personalizeDialogue(
                          `“Triumphant news, {name}! You have explored all 9 realms and reached the Membership Citadel! Wear your Regent pin with royal pride!”`,
                          { name }
                        )}
                  </p>
                </div>
              </div>

              {/* Stats Strip */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                <div className="p-2 bg-[#140803] border border-[#3D2612]">
                  <span className="text-[9px] font-pixel text-[#A48871] block">TOTAL XP</span>
                  <span className="font-pixel text-xs text-regent-gold font-bold">
                    {player.xp || 0} XP
                  </span>
                </div>
                <div className="p-2 bg-[#140803] border border-[#3D2612]">
                  <span className="text-[9px] font-pixel text-[#A48871] block">RANK</span>
                  <span className="font-pixel text-xs text-yellow-300 font-bold truncate">
                    {player.rank || "Explorer"}
                  </span>
                </div>
                <div className="p-2 bg-[#140803] border border-[#3D2612]">
                  <span className="text-[9px] font-pixel text-[#A48871] block">BADGES</span>
                  <span className="font-pixel text-xs text-white font-bold">
                    {player.badges?.length || 0}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-yellow-900/60">
                <button
                  onClick={() => {
                    audioManager.playTap();
                    audioManager.toggleMusic();
                  }}
                  className="w-full sm:w-auto px-3 py-2 bg-[#170B05] border border-[#4A2610] text-[11px] font-pixel text-regent-gold hover:text-white"
                >
                  TOGGLE BGM ♫
                </button>

                <button
                  onClick={handleGoToNextQuest}
                  className="w-full sm:flex-1 px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-regent-gold text-black font-pixel text-xs font-bold shadow-lg hover:brightness-110 flex items-center justify-center gap-2"
                >
                  <span>MARCH TO NEXT QUEST</span>
                  <ChevronRight className="w-4 h-4 text-black" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
