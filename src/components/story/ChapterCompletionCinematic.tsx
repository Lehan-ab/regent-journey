"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, ArrowRight, X, Compass, Key, Anchor, Flame, Star, Hammer, Feather, BookOpen, MapPin, Sunrise, Sprout } from "lucide-react";
import confetti from "canvas-confetti";
import RetroButton from "@/components/ui/RetroButton";
import PixelCompanion from "@/components/companion/PixelCompanion";
import { audioManager } from "@/lib/audioManager";

interface ChapterCompletionCinematicProps {
  chapterId: string;
  chapterTitle: string;
  worldName: string;
  nextChapterId?: string;
  nextChapterTitle?: string;
  badgeUnlockedTitle?: string;
  xpAwarded: number;
  companionId: string;
  isOpen: boolean;
  onAdvance: () => void;
  onClose: () => void;
}

const WORLD_REACTIONS: Record<string, { title: string; narrative: string; icon: any; glowColor: string }> = {
  "loc-gateway": {
    title: "THE VALLEY GATES SWING OPEN",
    narrative: "The ancient stone portal unseals. The illuminated river trail toward the banyan canopy of Rotary Roots is revealed!",
    icon: Key,
    glowColor: "#F59E0B",
  },
  "loc-rotary-roots": {
    title: "ROOTS REVEAL THE RIVER ROUTE",
    narrative: "Glowing banyan root veins pulse with emerald light, parting to unveil the river quay of Rotaract Harbor!",
    icon: Sprout,
    glowColor: "#10B981",
  },
  "loc-rotaract-harbor": {
    title: "THE HARBOR FLEET SETS SAIL",
    narrative: "The beacon signal flashes green. River currents carry the Explorer toward the fortified towers of Regent Keep!",
    icon: Anchor,
    glowColor: "#06B6D4",
  },
  "loc-regent-keep": {
    title: "THE CONSTELLATION IGNITES",
    narrative: "From the high battlements of the Keep, the night sky awakens—11 brilliant celestial avenue stars ignite across the heavens!",
    icon: Star,
    glowColor: "#6366F1",
  },
  "loc-seven-realms": {
    title: "THE CELESTIAL PATHS ALIGN",
    narrative: "All 11 avenue starbeams converge, illuminating the roaring fires and craftsmens' anvils of Project Forge!",
    icon: Compass,
    glowColor: "#8B5CF6",
  },
  "loc-project-forge": {
    title: "THE TEMPERED KEYSTONE RESONATES",
    narrative: "The forged keystone of sustainable community impact rings out with golden resonance, pointing to the sacred ethics of Codewood!",
    icon: Hammer,
    glowColor: "#D97706",
  },
  "loc-codewood": {
    title: "THE SACRED CODEWOOD PARTS",
    narrative: "The V.O.I.C.E. rune-spire glows with serene teal radiance. The trees gently part, revealing the vast towers of the Grand Archive!",
    icon: Feather,
    glowColor: "#0D9488",
  },
  "loc-grand-archive": {
    title: "THE EXPEDITION DOORS UNSEAL",
    narrative: "The Treasury of Trust and Secretariat records lock into place. Outer vault gates open directly to the open-air Impact Frontier!",
    icon: BookOpen,
    glowColor: "#A855F7",
  },
  "loc-impact-frontier": {
    title: "THE CITADEL SUMMIT PATH EMERGES",
    narrative: "The field mission board lights up with completed pins! A golden stairway ascends into the clouds toward the Membership Citadel!",
    icon: MapPin,
    glowColor: "#059669",
  },
  "loc-membership-citadel": {
    title: "SUNRISE OVER THE CITADEL",
    narrative: "The ceremonial Regent emblem glows with radiant morning light. You have completed the Explorer's journey and stand ready for induction!",
    icon: Sunrise,
    glowColor: "#EAB308",
  },
};

function SproutIcon(props: any) {
  return <Sparkles {...props} />;
}

export default function ChapterCompletionCinematic({
  chapterId,
  chapterTitle,
  worldName,
  nextChapterId,
  nextChapterTitle,
  badgeUnlockedTitle,
  xpAwarded,
  companionId,
  isOpen,
  onAdvance,
  onClose,
}: ChapterCompletionCinematicProps) {
  const reaction = WORLD_REACTIONS[chapterId] || WORLD_REACTIONS["loc-gateway"];
  const ReactionIcon = reaction.icon;

  useEffect(() => {
    if (isOpen) {
      audioManager.playFanfare();
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#FFC719", "#D8232A", "#20A9F6", "#10B981"],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: -20 }}
          className="relative max-w-lg w-full bg-[#0C0603] border-4 border-regent-gold p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(255,199,25,0.35)] overflow-hidden"
        >
          {/* Filigree Corners */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-regent-gold pointer-events-none" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-regent-gold pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-regent-gold pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-regent-gold pointer-events-none" />

          {/* Header Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#170904] border border-regent-gold text-[9px] font-pixel text-regent-gold uppercase tracking-widest mb-3">
            <Trophy className="w-3.5 h-3.5 text-regent-gold" />
            <span>REALM QUEST CONQUERED!</span>
          </div>

          <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white tracking-wide mb-1">
            {worldName} COMPLETED!
          </h2>
          <p className="font-serif italic text-xs text-[#C9B9A6] mb-4">
            {chapterTitle}
          </p>

          {/* World Reaction Visual Animation */}
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-18 h-18 sm:w-22 sm:h-22 rounded-full mx-auto my-3 flex items-center justify-center border-2 border-regent-gold bg-[#150904] shadow-[0_0_30px_rgba(255,199,25,0.5)]"
            style={{ borderColor: reaction.glowColor }}
          >
            <ReactionIcon className="w-10 h-10 text-regent-gold" />
          </motion.div>

          <div
            className="font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider mb-2"
            style={{ color: reaction.glowColor }}
          >
            {reaction.title}
          </div>

          <p className="font-serif text-xs sm:text-sm text-[#F4EDE5] leading-relaxed max-w-md mx-auto mb-5">
            {reaction.narrative}
          </p>

          {/* XP & Badge Award Banner */}
          <div className="flex items-center justify-center gap-4 py-2 px-3 bg-[#170904] border border-[#3D2612] mb-6">
            <div className="flex items-center gap-1 text-xs font-pixel text-regent-gold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>+{xpAwarded} XP REALM BOUNTY</span>
            </div>
            {badgeUnlockedTitle && (
              <div className="flex items-center gap-1 text-xs font-pixel text-yellow-300">
                <Trophy className="w-3.5 h-3.5" />
                <span>BADGE: {badgeUnlockedTitle}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <RetroButton
              variant="green"
              size="md"
              onClick={onAdvance}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="w-full sm:w-auto"
            >
              {nextChapterTitle ? `ENTER ${nextChapterTitle.toUpperCase()} →` : "VIEW ADVENTURE PATH →"}
            </RetroButton>

            <RetroButton
              variant="outline"
              size="sm"
              onClick={onClose}
              className="w-full sm:w-auto text-[#A48871]"
            >
              STAY IN CHAPTER
            </RetroButton>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
