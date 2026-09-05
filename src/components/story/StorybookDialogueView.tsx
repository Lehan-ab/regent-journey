"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  Sparkles,
  ChevronRight,
  MessageSquare,
  Scroll,
  Shield,
  HelpCircle,
  Volume2,
  RefreshCw,
  Award,
} from "lucide-react";
import PixelAvatar from "@/components/avatar/PixelAvatar";
import PixelCompanion from "@/components/companion/PixelCompanion";
import RetroButton from "@/components/ui/RetroButton";
import { usePlayer } from "@/context/PlayerContext";
import { COMPANIONS } from "@/data/companionsData";
import { StoryDialogueBeat, LessonData } from "@/data/chaptersData";
import { audioManager } from "@/lib/audioManager";

interface StorybookDialogueViewProps {
  lesson: LessonData;
  chapterTitle: string;
  chapterLabel: string;
  worldName: string;
  chapterNumber: number;
  bgImage?: string;
  onProceedToKnowledgeCheck: () => void;
  showKnowledgeCheckButton?: boolean;
}

export default function StorybookDialogueView({
  lesson,
  chapterTitle,
  chapterLabel,
  worldName,
  chapterNumber,
  bgImage = "/images/rotary_roots.jpg",
  onProceedToKnowledgeCheck,
  showKnowledgeCheckButton = true,
}: StorybookDialogueViewProps) {
  const { player } = usePlayer();
  const companionKey = player.companion || "nova";
  const companion = COMPANIONS[companionKey] || COMPANIONS.nova;

  // Build conversational script: use lesson.interactiveStory or generate engaging beats from sections
  const beats: StoryDialogueBeat[] = React.useMemo(() => {
    if (lesson.interactiveStory && lesson.interactiveStory.length > 0) {
      return lesson.interactiveStory;
    }

    // Smart fallback generator: turns lesson sections into a vivid dialogue
    const generated: StoryDialogueBeat[] = [
      {
        speaker: "npc",
        speakerName: lesson.storyIntro.speaker,
        role: lesson.storyIntro.speakerRole,
        emotion: "proud",
        text: lesson.storyIntro.dialogue,
      },
      {
        speaker: "prospect",
        text: `Tell me more, Chief ${companion.name}! How does this chronicle apply to my journey as an aspiring Regent?`,
      },
    ];

    lesson.sections.forEach((sec, idx) => {
      generated.push({
        speaker: "guide",
        speakerName: companion.name,
        role: companion.tagline,
        emotion: idx % 2 === 0 ? "thinking" : "happy",
        text: `“${sec.title}”: ${sec.content.join(" ")}`,
      });

      if (sec.keyTakeaway) {
        generated.push({
          speaker: "prospect",
          text: `“Key Regent Rule: ${sec.keyTakeaway}” — I will remember this principle!`,
        });
      }
    });

    generated.push({
      speaker: "guide",
      speakerName: companion.name,
      role: companion.tagline,
      emotion: "celebrate",
      text:
        lesson.companionAdvice?.[companionKey] ||
        `Outstanding dedication, ${player.name || "Prospect"}! You have absorbed the wisdom of this scroll! Now step forward into the Knowledge Check!`,
    });

    return generated;
  }, [lesson, companion, companionKey, player.name]);

  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);

  const currentBeat = beats[currentBeatIndex] || beats[0];
  const isLastBeat = currentBeatIndex >= beats.length - 1;
  const isProspect = currentBeat.speaker === "prospect";

  // Play cute blip whenever beat advances
  React.useEffect(() => {
    audioManager.playDialogueBlip(isProspect ? 100 : 0);
  }, [currentBeatIndex, isProspect]);

  const handleNextBeat = () => {
    audioManager.playTap();
    if (currentBeatIndex < beats.length - 1) {
      setCurrentBeatIndex((prev) => prev + 1);
      setSelectedChoice(null);
    } else {
      audioManager.playWhoosh();
      onProceedToKnowledgeCheck();
    }
  };

  const handlePreviousBeat = () => {
    audioManager.playTap();
    if (currentBeatIndex > 0) {
      setCurrentBeatIndex((prev) => prev - 1);
      setSelectedChoice(null);
    }
  };

  return (
    <div className="w-full">
      {/* 1. Storybook Frame Canvas */}
      <div className="relative rounded-none border-4 border-[#3D2612] bg-[#0A0503] shadow-[0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Ornate Gold Filigree Corners */}
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-regent-gold pointer-events-none z-30" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-regent-gold pointer-events-none z-30" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-regent-gold pointer-events-none z-30" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-regent-gold pointer-events-none z-30" />

        {/* Storybook Top Header Ribbon */}
        <div className="bg-gradient-to-r from-[#200F05] via-[#481E09] to-[#200F05] border-b-2 border-regent-gold/60 px-4 py-2.5 flex items-center justify-between text-xs z-20 relative">
          <div className="flex items-center gap-2">
            <span className="text-regent-gold font-serif italic text-sm">⚜</span>
            <span className="font-pixel text-[11px] text-regent-gold uppercase tracking-wider">
              {chapterLabel} • {worldName}
            </span>
            <span className="text-[#A48871] font-pixel text-[10px] hidden sm:inline">
              — SCENE {currentBeatIndex + 1} OF {beats.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 bg-[#120703] border border-regent-gold/40 text-[10px] font-pixel text-yellow-300 flex items-center gap-1">
              <Scroll className="w-3 h-3 text-regent-gold" />
              <span>STORYBOOK CHRONICLE</span>
            </div>
          </div>
        </div>

        {/* 2. Scenic Story Illustration Backdrop */}
        <div className="relative w-full h-48 sm:h-64 md:h-72 overflow-hidden border-b-2 border-[#3D2612]">
          <Image
            src={bgImage}
            alt={chapterTitle}
            fill
            priority
            className="object-cover object-center filter brightness-[0.75] contrast-[1.1] scale-100 transition-all duration-700"
          />

          {/* Vignette & Parchment Lighting */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0503] via-[#0A0503]/40 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0A0503]/20 to-[#0A0503]/70" />

          {/* Chapter Title Badge in Scene */}
          <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between">
            <div className="bg-[#0A0503]/85 border border-regent-gold/50 px-3 py-1.5 backdrop-blur-sm max-w-lg">
              <div className="text-[9px] font-pixel text-regent-gold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-regent-gold" /> LESSON #{lesson.lessonNumber}
              </div>
              <h3 className="font-pixel text-sm sm:text-base text-white tracking-wide drop-shadow-md">
                {lesson.title}
              </h3>
              <p className="text-[11px] text-[#C9B9A6] italic hidden sm:block font-serif">
                {lesson.subtitle}
              </p>
            </div>

            {/* Scene Counter Bookmark */}
            <div className="bg-regent-maroon border-x border-b border-red-950 px-3 py-1 shadow-lg flex flex-col items-center">
              <span className="text-[9px] font-pixel text-regent-gold font-bold">BEAT</span>
              <span className="text-xs font-pixel text-white font-bold">
                {currentBeatIndex + 1}/{beats.length}
              </span>
            </div>
          </div>

          {/* Foreground Visual Characters on the Stage */}
          <div className="absolute bottom-2 left-6 right-6 flex items-end justify-between z-15 pointer-events-none">
            {/* Guide / NPC Sprite (Left Side) */}
            <motion.div
              animate={{
                y: currentBeat.speaker !== "prospect" ? [0, -4, 0] : 0,
                opacity: currentBeat.speaker !== "prospect" ? 1 : 0.7,
                scale: currentBeat.speaker !== "prospect" ? 1.05 : 0.95,
              }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div
                className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-[#120703]/90 border-2 p-1 transition-all ${
                  currentBeat.speaker !== "prospect"
                    ? "border-regent-gold shadow-[0_0_15px_rgba(255,199,25,0.4)]"
                    : "border-[#4A3018]"
                }`}
              >
                <PixelCompanion
                  companionId={companion.id}
                  emotion={currentBeat.emotion || "happy"}
                  size="full"
                  animate={currentBeat.speaker !== "prospect"}
                />
              </div>
              <div className="px-2 py-0.5 bg-[#120703] border border-regent-gold/60 text-[9px] font-pixel text-regent-gold font-bold mt-1 uppercase shadow-md">
                {currentBeat.speaker === "npc"
                  ? currentBeat.speakerName || lesson.storyIntro.speaker
                  : companion.name}
              </div>
            </motion.div>

            {/* Prospect Avatar Sprite (Right Side) */}
            <motion.div
              animate={{
                y: isProspect ? [0, -4, 0] : 0,
                opacity: isProspect ? 1 : 0.7,
                scale: isProspect ? 1.05 : 0.95,
              }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div
                className={`relative w-16 h-16 sm:w-20 sm:h-20 bg-[#120703]/90 border-2 p-1 transition-all ${
                  isProspect
                    ? "border-regent-blue shadow-[0_0_15px_rgba(32,169,246,0.4)]"
                    : "border-[#4A3018]"
                }`}
              >
                <PixelAvatar
                  explorerId={player.explorerId}
                  config={player.avatar}
                  size="full"
                  variant="portrait"
                  animate={false}
                  showAccessory={true}
                />
              </div>
              <div className="px-2 py-0.5 bg-regent-maroon border border-red-950 text-[9px] font-pixel text-white font-bold mt-1 uppercase shadow-md truncate max-w-[100px]">
                {player.name || "PROSPECT"}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3. Storybook Interactive Dialogue Box */}
        <div className="p-4 sm:p-6 bg-gradient-to-b from-[#180C06] via-[#120703] to-[#0A0503] relative z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBeatIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="min-h-[110px]"
            >
              {/* Speaker Indicator Badge */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[#3D2612]">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2.5 h-2.5 ${
                      isProspect ? "bg-regent-blue" : "bg-regent-gold"
                    }`}
                  />
                  <span
                    className={`font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider ${
                      isProspect ? "text-regent-blue" : "text-regent-gold"
                    }`}
                  >
                    {isProspect
                      ? player.name || "PROSPECT EXPLORER"
                      : currentBeat.speaker === "npc"
                      ? `${currentBeat.speakerName || lesson.storyIntro.speaker} (${
                          currentBeat.role || lesson.storyIntro.speakerRole
                        })`
                      : `${companion.name} (${companion.tagline})`}
                  </span>
                </div>

                <span className="text-[10px] font-pixel text-[#A48871]">
                  {isProspect ? "YOUR WORDS" : "GUIDE CHRONICLE"}
                </span>
              </div>

              {/* Dialogue Text in Storybook Typography */}
              <div className="text-white font-serif text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose text-[#F2E8DC] px-1 py-1">
                {currentBeat.text}
              </div>

              {/* Interactive Player Choices (if beat has options) */}
              {currentBeat.prospectChoices && currentBeat.prospectChoices.length > 0 && (
                <div className="mt-3 space-y-1.5">
                  <span className="text-[10px] font-pixel text-regent-gold uppercase tracking-wider">
                    CHOOSE YOUR RESPONSE:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentBeat.prospectChoices.map((choice, cIdx) => (
                      <button
                        key={cIdx}
                        onClick={() => setSelectedChoice(choice)}
                        className={`p-2.5 text-left border text-xs font-serif transition-all flex items-center justify-between gap-2 ${
                          selectedChoice === choice
                            ? "bg-[#2D1609] border-regent-gold text-regent-gold font-bold shadow-md"
                            : "bg-[#140803] border-[#3D2612] text-[#DDD] hover:border-[#6B4223]"
                        }`}
                      >
                        <span>&ldquo;{choice}&rdquo;</span>
                        <ChevronRight className="w-3.5 h-3.5 shrink-0 text-regent-gold" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* 4. Storybook Navigation & Progression Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 mt-4 border-t border-[#3D2612]">
            {/* Left: Previous scene button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousBeat}
                disabled={currentBeatIndex === 0}
                className="px-3 py-1.5 bg-[#140803] border border-[#3D2612] text-xs font-pixel text-[#A48871] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                ◀ PREVIOUS
              </button>

              <span className="text-[11px] font-serif italic text-[#967B64] hidden md:inline">
                Turn the page to continue the narrative...
              </span>
            </div>

            {/* Right: Next turn or Proceed to Trial */}
            <div className="flex items-center gap-2">
              {!isLastBeat ? (
                <RetroButton
                  variant="yellow"
                  size="sm"
                  onClick={handleNextBeat}
                  icon={<ChevronRight className="w-4 h-4 text-black" />}
                  iconPosition="right"
                >
                  NEXT DIALOGUE ➔
                </RetroButton>
              ) : (
                <RetroButton
                  variant="green"
                  size="sm"
                  onClick={onProceedToKnowledgeCheck}
                  icon={<HelpCircle className="w-4 h-4" />}
                  iconPosition="right"
                >
                  ENTER THE GUARDIAN&apos;S RIDDLE ➔
                </RetroButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
