"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight,
  Scroll,
  HelpCircle,
  Sparkles,
  BookOpen,
  Volume2,
  ChevronDown,
  MessageSquare,
} from "lucide-react";
import PixelAvatar from "@/components/avatar/PixelAvatar";
import PixelCompanion from "@/components/companion/PixelCompanion";
import RetroButton from "@/components/ui/RetroButton";
import { usePlayer } from "@/context/PlayerContext";
import { COMPANIONS } from "@/data/companionsData";
import { LessonData } from "@/data/chaptersData";
import { audioManager } from "@/lib/audioManager";
import { getNPC } from "@/data/npcRegistry";
import { CompanionEmotion } from "@/types/player";
import NPCPortrait from "@/components/story/NPCPortrait";
import StorySceneContainer from "@/components/story/StorySceneContainer";

interface StorybookDialogueViewProps {
  lesson: LessonData;
  chapterTitle: string;
  chapterLabel: string;
  worldName: string;
  chapterNumber: number;
  guideNpcId?: string;
  onProceedToKnowledgeCheck: () => void;
  showKnowledgeCheckButton?: boolean;
}

export default function StorybookDialogueView({
  lesson,
  chapterTitle,
  chapterLabel,
  worldName,
  chapterNumber,
  guideNpcId = "gatekeeper-aaron",
  onProceedToKnowledgeCheck,
  showKnowledgeCheckButton = true,
}: StorybookDialogueViewProps) {
  const { player } = usePlayer();
  const companionKey = (player.companion || "nova") as "nova" | "raya" | "kai";
  const companion = COMPANIONS[companionKey] || COMPANIONS.nova;

  const [currentBeatIndex, setCurrentBeatIndex] = useState(0);

  // Scripted dialogue beats from LessonData
  const beats = lesson.scriptedDialogue || [];
  const currentBeat = beats[currentBeatIndex] || beats[0];
  const isLastBeat = currentBeatIndex >= beats.length - 1;

  const isNpc = currentBeat?.speaker === "npc";
  const isExplorer = currentBeat?.speaker === "explorer";
  const isCompanion = currentBeat?.speaker === "companion";

  // NPC lookup
  const npc = getNPC(guideNpcId) || getNPC("gatekeeper-aaron");

  // Determine text: support companion personality variants
  const displayText = React.useMemo(() => {
    if (!currentBeat) return "";
    if (isCompanion && currentBeat.companionVariants) {
      return (
        currentBeat.companionVariants[companionKey] ||
        currentBeat.companionVariants.nova ||
        currentBeat.text
      );
    }
    return currentBeat.text;
  }, [currentBeat, isCompanion, companionKey]);

  // Audio blip on dialogue turn
  React.useEffect(() => {
    audioManager.playDialogueBlip(isExplorer ? 100 : isCompanion ? 50 : 0);
  }, [currentBeatIndex, isExplorer, isCompanion]);

  const handleNextBeat = () => {
    audioManager.playTap();
    if (currentBeatIndex < beats.length - 1) {
      setCurrentBeatIndex((prev) => prev + 1);
    } else {
      audioManager.playWhoosh();
      onProceedToKnowledgeCheck();
    }
  };

  const handlePreviousBeat = () => {
    audioManager.playTap();
    if (currentBeatIndex > 0) {
      setCurrentBeatIndex((prev) => prev - 1);
    }
  };

  // Map DialogueEmotion to PixelCompanion emotion
  const companionEmotion: CompanionEmotion = React.useMemo(() => {
    const e = currentBeat?.emotion;
    if (e === "warm" || e === "excited") return "happy";
    if (e === "thoughtful" || e === "curious" || e === "serious") return "thinking";
    if (e === "celebrate") return "celebrate";
    return "idle";
  }, [currentBeat?.emotion]);

  // Expression resolution for NPC
  const npcExpression = isNpc
    ? currentBeat?.emotion === "excited" || currentBeat?.emotion === "celebrate"
      ? "reaction"
      : "speaking"
    : "neutral";

  // Camera framing mode resolution based on lesson scene variant
  const sceneVariant = lesson.sceneConfig?.variant || "default";
  const isOverTheShoulder = sceneVariant === "gate-unsealed";
  const isTableCouncil =
    sceneVariant === "council-table" ||
    sceneVariant === "drafting-table" ||
    sceneVariant === "treasury-vault" ||
    sceneVariant === "two-scrolls";

  return (
    <div className="w-full">
      {/* 1. Main Storybook Frame Canvas */}
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
              <span>STORY CHRONICLE</span>
            </div>
          </div>
        </div>

        {/* 2. Scenic Story Illustration Stage with Scene Engine Container */}
        <div className="relative w-full border-b-2 border-[#3D2612]">
          <StorySceneContainer
            sceneType={lesson.sceneConfig?.sceneType || "portal"}
            variant={lesson.sceneConfig?.variant || "default"}
            sceneEvent={currentBeat?.sceneEvent}
            atmosphereTitle={lesson.sceneConfig?.atmosphereTitle}
            pairedAvenues={lesson.sceneConfig?.pairedAvenues}
            backdropImage={lesson.sceneConfig?.backdropImage}
          />

          {/* Lesson Identifier Floating Ribbon */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
            <div className="bg-[#0A0503]/90 border border-regent-gold/50 px-2.5 py-1 backdrop-blur-sm shadow-md">
              <div className="text-[9px] font-pixel text-regent-gold uppercase tracking-widest flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-regent-gold" /> LESSON #{lesson.lessonNumber}
              </div>
              <h3 className="font-pixel text-xs sm:text-sm text-white drop-shadow">
                {lesson.title}
              </h3>
            </div>
          </div>

          {/* 3. Foreground Cinematic Character Actors Stage */}
          <div className="relative bg-gradient-to-t from-[#0A0503] via-[#0A0503]/95 to-transparent px-3 sm:px-6 py-3 sm:py-4 flex items-end justify-between z-15 border-t border-[#3D2612]/60 min-h-[140px] sm:min-h-[160px]">
            {/* Left: NPC Character with Cinematic Presence */}
            <motion.div
              animate={{
                scale: isNpc ? 1.05 : 0.95,
                y: isNpc ? [0, -3, 0] : 0,
                opacity: isExplorer && !isNpc ? 0.85 : 1,
              }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center shrink-0 z-20"
            >
              <NPCPortrait
                npcId={guideNpcId}
                expression={npcExpression}
                size={isNpc ? "xl" : "lg"}
                isSpeaking={isNpc}
                showBadge={true}
              />
            </motion.div>

            {/* Center: Selected Companion Observer / Reactor with Dynamic Staging */}
            <motion.div
              animate={{
                y: isCompanion ? [0, -8, 0] : isOverTheShoulder ? -4 : 0,
                scale: isCompanion ? 1.15 : 0.95,
              }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center mx-2 shrink-0 z-20"
            >
              <div
                className={`relative w-12 h-12 sm:w-16 sm:h-16 bg-[#120703]/90 border-2 p-1 transition-all ${
                  isCompanion
                    ? "border-regent-gold shadow-[0_0_20px_rgba(255,199,25,0.6)] ring-2 ring-yellow-400/30"
                    : "border-[#4A3018] opacity-80"
                }`}
              >
                <PixelCompanion
                  companionId={companion.id}
                  emotion={companionEmotion}
                  size="full"
                  animate={isCompanion}
                />
              </div>
              <div className="px-2 py-0.5 bg-[#120703] border border-regent-gold/40 text-[8px] font-pixel text-yellow-300 mt-1 uppercase shadow-sm">
                {companion.name}
              </div>
            </motion.div>

            {/* Right: Explorer Avatar — Active Player Participant */}
            <motion.div
              animate={{
                scale: isExplorer ? 1.08 : 0.95,
                y: isExplorer ? [0, -4, 0] : 0,
                opacity: isNpc && !isExplorer ? 0.85 : 1,
              }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center shrink-0 z-20"
            >
              <div
                className={`relative w-16 h-16 sm:w-22 sm:h-22 bg-[#120703]/90 border-2 p-1 transition-all ${
                  isExplorer
                    ? "border-regent-blue shadow-[0_0_20px_rgba(32,169,246,0.6)] ring-2 ring-regent-blue/30"
                    : "border-[#4A3018] opacity-80"
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
              <div className="px-2 py-0.5 bg-regent-maroon border border-red-950 text-[9px] font-pixel text-white font-bold mt-1 uppercase shadow-md truncate max-w-[110px] text-center">
                {player.name || "EXPLORER"}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 4. Scripted Story Dialogue Box (Zero prospectChoices!) */}
        <div className="p-4 sm:p-6 bg-gradient-to-b from-[#180C06] via-[#120703] to-[#0A0503] relative z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBeatIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="min-h-[105px]"
            >
              {/* Speaker Indicator Badge */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-[#3D2612]">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2.5 h-2.5 ${
                      isExplorer
                        ? "bg-regent-blue"
                        : isCompanion
                        ? "bg-yellow-400"
                        : "bg-regent-gold"
                    }`}
                  />
                  <span
                    className={`font-pixel text-xs sm:text-sm font-bold uppercase tracking-wider ${
                      isExplorer
                        ? "text-regent-blue"
                        : isCompanion
                        ? "text-yellow-300"
                        : "text-regent-gold"
                    }`}
                  >
                    {isExplorer
                      ? `${player.name || "EXPLORER PROSPECT"}`
                      : isCompanion
                      ? `${companion.name} (${companion.tagline})`
                      : `${npc?.name || "THE GUIDE"} (${npc?.title || "Guide"})`}
                  </span>
                </div>

                <span className="text-[10px] font-pixel text-[#A48871]">
                  {isExplorer ? "YOUR VOICE" : isCompanion ? "COMPANION ALLY" : "CHRONICLE SPEAKER"}
                </span>
              </div>

              {/* Dialogue Text */}
              <div className="text-white font-serif text-sm sm:text-base md:text-lg leading-relaxed sm:leading-loose text-[#F2E8DC] px-1 py-1">
                {displayText}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 5. Subtle Handbook Source Attribution Accordion */}
          {lesson.source && (
            <details className="group mt-3 pt-2 border-t border-[#3D2612]/60">
              <summary className="flex items-center justify-between text-[9px] font-pixel text-[#A48871] cursor-pointer hover:text-regent-gold transition-colors select-none py-1">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-3 h-3 text-regent-gold/80" />
                  <span className="uppercase tracking-wider">⚜ OFFICIAL HANDBOOK REFERENCE ▾</span>
                </div>
                <span className="font-pixel text-[8px] text-regent-gold/90">
                  {lesson.source.pageRangeDisplay}
                </span>
              </summary>
              <div className="mt-1.5 p-2 bg-[#0E0603] border border-[#3D2612] text-[10px] font-serif text-[#C4B2A0] space-y-1">
                <div className="font-bold text-white">
                  {lesson.source.publication}
                </div>
                <div className="text-[9px] text-regent-gold/80">
                  {lesson.source.district} • {lesson.source.section}
                </div>
              </div>
            </details>
          )}

          {/* 6. Storybook Navigation & Progression Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 mt-3 border-t border-[#3D2612]">
            {/* Left: Previous beat button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePreviousBeat}
                disabled={currentBeatIndex === 0}
                className="px-3 py-1.5 bg-[#140803] border border-[#3D2612] text-xs font-pixel text-[#A48871] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                ◀ PREVIOUS
              </button>

              <span className="text-[11px] font-serif italic text-[#967B64] hidden md:inline">
                Turn the page to continue the chronicle...
              </span>
            </div>

            {/* Right: Next Beat or Enter Knowledge Trial */}
            <div className="flex items-center gap-2">
              {!isLastBeat ? (
                <RetroButton
                  variant="yellow"
                  size="sm"
                  onClick={handleNextBeat}
                  icon={<ChevronRight className="w-4 h-4 text-black" />}
                  iconPosition="right"
                >
                  CONTINUE ➔
                </RetroButton>
              ) : (
                <RetroButton
                  variant="green"
                  size="sm"
                  onClick={onProceedToKnowledgeCheck}
                  icon={<HelpCircle className="w-4 h-4" />}
                  iconPosition="right"
                >
                  ENTER KNOWLEDGE TRIAL ➔
                </RetroButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
