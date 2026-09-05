"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Lock,
  Sparkles,
  ChevronRight,
  Landmark,
  Shield,
  HelpCircle,
  Trophy,
  ArrowRight,
  RotateCcw,
  MessageSquare,
  Scroll,
} from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import PixelCompanion from "@/components/companion/PixelCompanion";
import StorybookDialogueView from "@/components/story/StorybookDialogueView";
import CompanionGuidanceModal from "@/components/story/CompanionGuidanceModal";
import { usePlayer } from "@/context/PlayerContext";
import { CHAPTERS_DATA, LessonData, ChapterDetails } from "@/data/chaptersData";
import { realmLocations } from "@/data/realmMapLocations";
import { audioManager } from "@/lib/audioManager";

export default function ChapterQuestReaderPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { player, isHydrated, completeLesson, isLessonCompleted, isChapterUnlocked } = usePlayer();

  const chapterId = (params?.chapterId as string) || "loc-rotary-roots";
  const chapter: ChapterDetails | undefined = CHAPTERS_DATA[chapterId];
  const realmLocation = realmLocations.find((r) => r.id === chapterId);

  // Lesson state
  const [activeLessonId, setActiveLessonId] = useState<string>("");
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"story" | "codex">("story");

  // Automatic Companion Guidance Modal State
  const [guidanceConfig, setGuidanceConfig] = useState<{
    isOpen: boolean;
    type: "lesson" | "chapter";
    currentTitle: string;
    nextTitle: string;
    xpAwarded: number;
    badgeUnlockedTitle?: string;
    nextChapterId?: string;
    nextLessonId?: string;
  }>({
    isOpen: false,
    type: "lesson",
    currentTitle: "",
    nextTitle: "",
    xpAwarded: 0,
  });

  // Determine initial lesson
  useEffect(() => {
    if (!chapter) return;
    const requestedLesson = searchParams?.get("lesson");
    if (requestedLesson && chapter.lessons.some((l) => l.id === requestedLesson)) {
      setActiveLessonId(requestedLesson);
      return;
    }

    // Default to first incomplete lesson or first lesson
    const firstIncomplete = chapter.lessons.find((l) => !player.completedLessons?.includes(l.id));
    if (firstIncomplete) {
      setActiveLessonId(firstIncomplete.id);
    } else {
      setActiveLessonId(chapter.lessons[0]?.id || "");
    }
  }, [chapter, searchParams, player.completedLessons]);

  // Reset quiz state when switching lessons
  useEffect(() => {
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
  }, [activeLessonId]);

  if (!chapter) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-16 text-center">
        <RetroCard className="p-8 bg-[#071331] border-2 border-red-900">
          <h2 className="font-pixel text-xl text-red-400 mb-2">CHAPTER NOT FOUND</h2>
          <p className="text-text-secondary text-sm mb-6">
            The scrolls for realm &apos;{chapterId}&apos; could not be located in the Grand Archive.
          </p>
          <RetroButton variant="blue" href="/journey">
            RETURN TO REALM MAP
          </RetroButton>
        </RetroCard>
      </div>
    );
  }

  // Check if locked
  const unlocked = isChapterUnlocked(chapterId);
  if (isHydrated && !unlocked) {
    return (
      <div className="w-full max-w-3xl mx-auto px-4 py-16 text-center">
        <RetroCard className="p-8 bg-[#071331] border-2 border-border-card">
          <div className="inline-flex p-3 bg-[#02091F] border border-border-card mb-4">
            <Lock className="w-8 h-8 text-orange-400" />
          </div>
          <h2 className="font-pixel text-xl text-white mb-2">REALM CURRENTLY LOCKED</h2>
          <p className="text-text-secondary text-sm mb-6">
            You must complete the preceding chapter quests to unlock the gateway to {chapter.worldName}.
          </p>
          <RetroButton variant="blue" href="/journey">
            RETURN TO ADVENTURE PATH
          </RetroButton>
        </RetroCard>
      </div>
    );
  }

  const activeLesson: LessonData | undefined =
    chapter.lessons.find((l) => l.id === activeLessonId) || chapter.lessons[0];

  const currentLessonIndex = chapter.lessons.findIndex((l) => l.id === activeLesson?.id);
  const activeIsCompleted = isLessonCompleted(activeLesson?.id || "");

  // Check quiz option & trigger automatic guidance
  const handleCheckAnswer = () => {
    if (!selectedOptionId || !activeLesson) return;

    const correct = selectedOptionId === activeLesson.knowledgeCheck.correctOptionId;
    setIsAnswerChecked(true);
    setIsCorrect(correct);

    if (correct) {
      audioManager.playSuccessChime();
      // Trigger retro confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#FFC719", "#20A9F6", "#800000", "#10B981"],
        });
      } catch (e) {
        console.warn("Confetti error", e);
      }

      // Complete lesson in PlayerContext
      const res = completeLesson(activeLesson.id, chapter.id, activeLesson.xpReward);
      const isLastLesson = currentLessonIndex >= chapter.lessons.length - 1;

      // Trigger automatic guidance modal
      if (res.chapterCompleted || isLastLesson) {
        const currentIdxInRealms = realmLocations.findIndex((r) => r.id === chapter.id);
        const nextLoc = realmLocations[currentIdxInRealms + 1] || realmLocations[0];
        setGuidanceConfig({
          isOpen: true,
          type: "chapter",
          currentTitle: chapter.worldName,
          nextTitle: nextLoc.worldName,
          xpAwarded: activeLesson.xpReward + chapter.xpReward,
          badgeUnlockedTitle: res.badgeUnlocked?.title || chapter.badgeReward,
          nextChapterId: nextLoc.id,
        });
      } else {
        const nextLesson = chapter.lessons[currentLessonIndex + 1];
        setGuidanceConfig({
          isOpen: true,
          type: "lesson",
          currentTitle: activeLesson.title,
          nextTitle: nextLesson.title,
          xpAwarded: activeLesson.xpReward,
          nextLessonId: nextLesson.id,
        });
      }
    } else {
      audioManager.playErrorBuzz();
    }
  };

  const handleAdvanceGuidance = () => {
    setGuidanceConfig((prev) => ({ ...prev, isOpen: false }));
    if (guidanceConfig.type === "chapter" && guidanceConfig.nextChapterId) {
      router.push(`/journey/${guidanceConfig.nextChapterId}`);
    } else if (guidanceConfig.nextLessonId) {
      setActiveLessonId(guidanceConfig.nextLessonId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/journey");
    }
  };

  const handleNextLessonManual = () => {
    if (currentLessonIndex < chapter.lessons.length - 1) {
      const nextLesson = chapter.lessons[currentLessonIndex + 1];
      setActiveLessonId(nextLesson.id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/journey");
    }
  };

  const companionKey = player.companion || "nova";
  const companionInsight =
    activeLesson?.companionAdvice?.[companionKey] ||
    activeLesson?.companionAdvice?.nova ||
    "Pay close attention to these principles as you grow into a Regent leader!";

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 pt-4 pb-16">
      {/* 1. Top Breadcrumb & Chapter Status Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#3D2612] mb-5">
        <Link
          href="/journey"
          className="flex items-center gap-2 font-pixel text-xs text-regent-blue hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> ADVENTURE PATH
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-pixel text-xs text-regent-gold uppercase">
            {chapter.chapterLabel}: {chapter.worldName}
          </span>
          <span className="text-[10px] font-pixel text-[#A48871]">
            • LESSON {currentLessonIndex + 1} OF {chapter.lessons.length}
          </span>
        </div>
      </div>

      {/* 2. Chapter Illustrated Header Banner */}
      <div className="relative rounded-none border-4 border-[#3D2612] bg-[#0A0503] overflow-hidden mb-6 shadow-2xl">
        <div className="relative w-full h-36 sm:h-44 md:h-52 overflow-hidden">
          <Image
            src={realmLocation?.image || "/images/rotary_roots.jpg"}
            alt={chapter.worldName}
            fill
            priority
            className="object-cover object-center filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0503] via-[#0A0503]/50 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-regent-maroon text-white font-pixel text-[10px] sm:text-xs font-bold uppercase border border-red-950 shadow-md">
                {chapter.chapterLabel}
              </span>
              <span className="px-2 py-0.5 bg-[#0A0503]/90 text-regent-blue font-pixel text-[10px] sm:text-xs border border-[#3D2612]">
                {chapter.worldName}
              </span>
            </div>

            <div className="px-2 py-0.5 bg-[#0A0503]/90 text-regent-gold font-pixel text-[10px] sm:text-xs border border-yellow-800 flex items-center gap-1 font-bold">
              <Sparkles className="w-3 h-3 text-regent-gold" /> BADGE: {chapter.badgeReward}
            </div>
          </div>

          {/* Bottom Title & Heritage Info */}
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <h1 className="font-pixel text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {chapter.chapterTitle}
            </h1>
            <p className="font-pixel text-xs text-regent-gold mt-0.5 flex items-center gap-1">
              <Landmark className="w-3.5 h-3.5 shrink-0" />
              <span>{chapter.seethawakaInspiration}</span>
            </p>
          </div>
        </div>

        {/* NPC Welcome Quote */}
        {activeLesson?.storyIntro && (
          <div className="p-3 bg-[#120703] border-t-2 border-[#3D2612] flex items-start gap-3">
            <div className="w-8 h-8 bg-regent-maroon border border-regent-gold flex items-center justify-center font-pixel text-xs font-bold text-regent-gold shrink-0 mt-0.5 shadow-sm">
              {activeLesson.storyIntro.speaker.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-xs text-regent-gold font-bold">
                  {activeLesson.storyIntro.speaker.toUpperCase()}
                </span>
                <span className="text-[10px] text-[#A48871]">
                  ({activeLesson.storyIntro.speakerRole})
                </span>
              </div>
              <p className="text-xs text-[#E5D7C7] font-serif italic mt-0.5 leading-relaxed">
                &ldquo;{activeLesson.storyIntro.dialogue}&rdquo;
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 3. Interactive Lesson Stepper / Tabs */}
      <div className="mb-6 p-2 bg-[#0A0503] border-2 border-[#3D2612] overflow-x-auto shadow-md">
        <div className="flex items-center gap-2 min-w-max">
          {chapter.lessons.map((lesson, idx) => {
            const completed = isLessonCompleted(lesson.id);
            const isActive = lesson.id === activeLesson?.id;

            return (
              <button
                key={lesson.id}
                onClick={() => setActiveLessonId(lesson.id)}
                className={`px-3 py-2 border flex items-center gap-2 text-xs transition-all ${
                  isActive
                    ? "bg-[#2D1609] border-regent-gold text-regent-gold shadow-md font-bold"
                    : completed
                    ? "bg-[#170E06] border-green-800/60 text-green-300 hover:text-white"
                    : "bg-[#120703] border-[#3D2612] text-[#A48871] hover:text-white"
                }`}
              >
                {completed ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-regent-green shrink-0" />
                ) : (
                  <span className="font-pixel text-[10px] text-regent-gold shrink-0">
                    #{idx + 1}
                  </span>
                )}
                <span className="font-pixel text-xs truncate max-w-[130px] sm:max-w-[160px]">
                  {lesson.title}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-regent-gold animate-ping shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Storybook View Mode Switcher */}
      <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
        <div className="flex items-center gap-1.5 p-1 bg-[#0A0503] border border-[#3D2612]">
          <button
            onClick={() => setViewMode("story")}
            className={`px-3 py-1.5 font-pixel text-xs flex items-center gap-1.5 transition-all ${
              viewMode === "story"
                ? "bg-[#2D1609] border border-regent-gold text-regent-gold font-bold shadow-md"
                : "text-[#A48871] hover:text-white"
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" /> INTERACTIVE STORY DIALOGUE
          </button>
          <button
            onClick={() => setViewMode("codex")}
            className={`px-3 py-1.5 font-pixel text-xs flex items-center gap-1.5 transition-all ${
              viewMode === "codex"
                ? "bg-[#2D1609] border border-regent-gold text-regent-gold font-bold shadow-md"
                : "text-[#A48871] hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> ILLUMINATED CODEX SCROLL
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-pixel text-[#A48871]">
          <Sparkles className="w-3.5 h-3.5 text-regent-gold" />
          <span>+{activeLesson.xpReward} XP BOUNTY</span>
        </div>
      </div>

      {/* 5. Main Lesson Reader Experience */}
      {viewMode === "story" ? (
        /* INTERACTIVE STORYBOOK MODE: Guide and Prospect Conversational Scene */
        <div className="mb-8">
          <StorybookDialogueView
            lesson={activeLesson}
            chapterTitle={chapter.chapterTitle}
            chapterLabel={chapter.chapterLabel}
            worldName={chapter.worldName}
            chapterNumber={chapter.chapterNumber}
            bgImage={realmLocation?.image}
            onProceedToKnowledgeCheck={() => {
              const el = document.getElementById("knowledge-check-section");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
          />
        </div>
      ) : (
        /* ILLUMINATED CODEX MODE: Full reference text */
        <div className="space-y-6 mb-8">
          <div className="p-4 sm:p-6 bg-[#0C0603] border-4 border-[#3D2612] shadow-xl">
            <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
              <span className="px-2 py-0.5 bg-regent-maroon text-white font-pixel text-[10px] border border-red-950">
                LESSON {currentLessonIndex + 1} OF {chapter.lessons.length}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-pixel text-[#A48871] flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-[#A48871]" /> {activeLesson.readTime}
                </span>
                <span className="px-2 py-0.5 bg-[#170B05] text-regent-gold font-pixel text-[10px] border border-yellow-800 font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> +{activeLesson.xpReward} XP
                </span>
                {activeIsCompleted && (
                  <span className="px-2 py-0.5 bg-green-950 text-regent-green font-pixel text-[10px] border border-regent-green/60 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> COMPLETED
                  </span>
                )}
              </div>
            </div>

            <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white tracking-wide">
              {activeLesson.title}
            </h2>
            <p className="font-serif italic text-xs sm:text-sm text-[#C9B9A6] mt-1">
              {activeLesson.subtitle}
            </p>
          </div>

          {activeLesson.sections.map((section, sIdx) => (
            <div
              key={sIdx}
              className="p-5 sm:p-6 bg-[#0C0603] border-2 border-[#3D2612] shadow-md"
            >
              <h3 className="font-pixel text-base sm:text-lg font-bold text-regent-gold mb-3 flex items-center gap-2">
                <span className="text-regent-gold font-serif">§</span> {section.title}
              </h3>

              <div className="space-y-3 font-serif text-sm sm:text-base text-[#F4EDE5] leading-relaxed">
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>

              {section.bulletPoints && (
                <div className="mt-4 p-3.5 bg-[#140803] border border-[#3D2612] space-y-2">
                  {section.bulletPoints.map((point, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5 text-xs text-white font-serif">
                      <span className="font-pixel text-regent-gold text-xs shrink-0 mt-0.5">✦</span>
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              )}

              {section.quote && (
                <div className="mt-4 p-3.5 bg-gradient-to-r from-red-950/40 via-[#170B05] to-red-950/40 border-l-4 border-regent-maroon">
                  <p className="text-xs sm:text-sm text-white italic font-serif leading-relaxed">
                    &ldquo;{section.quote.text}&rdquo;
                  </p>
                  <p className="text-[10px] font-pixel text-regent-gold mt-1.5 uppercase">
                    — {section.quote.author}
                  </p>
                </div>
              )}

              {section.keyTakeaway && (
                <div className="mt-4 p-3 bg-[#140803] border border-regent-blue/40 flex items-start gap-2.5 text-xs">
                  <Shield className="w-4 h-4 text-regent-blue shrink-0 mt-0.5" />
                  <span className="text-white font-serif leading-relaxed">
                    <strong className="text-regent-gold">Key Regent Rule:</strong> {section.keyTakeaway}
                  </span>
                </div>
              )}
            </div>
          ))}

          {/* Companion Advice Box */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-[#140803] via-[#1C0F06] to-[#140803] border-2 border-regent-gold/60 flex items-start gap-4 shadow-md">
            <div className="shrink-0 pt-1">
              <PixelCompanion
                companionId={companionKey}
                emotion="happy"
                size="md"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="font-pixel text-xs text-regent-gold font-bold uppercase tracking-wider">
                  COMPANION INSIGHT • {companionKey.toUpperCase()}
                </span>
                <span className="text-[9px] font-pixel text-[#A48871]">
                  ADVENTURE ALLY
                </span>
              </div>
              <p className="font-serif italic text-xs sm:text-sm text-[#F4EDE5] leading-relaxed">
                &ldquo;{companionInsight}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 6. The Guardian's Riddle / Interactive Knowledge Check */}
      <div
        id="knowledge-check-section"
        className="rounded-none border-4 border-regent-gold bg-[#0C0603] p-5 sm:p-7 shadow-[0_0_30px_rgba(255,199,25,0.15)] relative mb-8"
      >
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 bg-[#170B05] border-2 border-regent-gold flex items-center justify-center shrink-0">
            <HelpCircle className="w-6 h-6 text-regent-gold" />
          </div>
          <div>
            <span className="text-[10px] font-pixel text-regent-gold uppercase tracking-widest block">
              TRIAL OF THE STORY GUARDIAN
            </span>
            <h3 className="font-pixel text-sm sm:text-base font-bold text-white leading-snug">
              {activeLesson.knowledgeCheck.question}
            </h3>
            <p className="text-[11px] font-serif text-[#C9B9A6] mt-0.5">
              Select the correct truth to prove your mastery and advance to the next chronicle!
            </p>
          </div>
        </div>

        {/* Options Grid */}
        <div className="space-y-2.5 mb-4">
          {activeLesson.knowledgeCheck.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const isTheCorrectOption = option.id === activeLesson.knowledgeCheck.correctOptionId;

            let buttonStyle = "border-[#3D2612] bg-[#140803] text-white hover:border-regent-gold";
            if (isAnswerChecked) {
              if (isTheCorrectOption) {
                buttonStyle = "border-regent-green bg-green-950/80 text-white font-bold";
              } else if (isSelected && !isTheCorrectOption) {
                buttonStyle = "border-red-600 bg-red-950/80 text-white line-through";
              }
            } else if (isSelected) {
              buttonStyle = "border-regent-gold bg-[#2D1609] text-white font-bold shadow-md";
            }

            return (
              <button
                key={option.id}
                onClick={() => {
                  if (!isAnswerChecked || !isCorrect) {
                    audioManager.playTap();
                    setSelectedOptionId(option.id);
                    setIsAnswerChecked(false);
                  }
                }}
                className={`w-full p-3.5 border text-left font-serif text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${buttonStyle}`}
              >
                <span className="leading-relaxed">{option.text}</span>
                {isAnswerChecked && isTheCorrectOption && (
                  <CheckCircle2 className="w-4 h-4 text-regent-green shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback Display */}
        {isAnswerChecked && (
          <div
            className={`p-3.5 border-2 mb-4 text-xs font-serif ${
              isCorrect
                ? "bg-green-950/70 border-regent-green text-green-100"
                : "bg-red-950/70 border-red-800 text-red-100"
            }`}
          >
            {isCorrect ? (
              <div>
                <p className="font-pixel text-xs font-bold text-regent-gold mb-1">
                  ✦ TRIAL PASSED! +{activeLesson.xpReward} XP BOUNTY CLAIMED!
                </p>
                <p>{activeLesson.knowledgeCheck.successMessage}</p>
              </div>
            ) : (
              <div>
                <p className="font-pixel text-xs font-bold text-red-300 mb-1">
                  ✕ NOT QUITE! TRY AGAIN
                </p>
                <p>Hint from {companionKey.toUpperCase()}: {activeLesson.knowledgeCheck.hint}</p>
              </div>
            )}
          </div>
        )}

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#3D2612]">
          <div className="text-[10px] font-pixel text-[#A48871] flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-regent-gold" />
            <span>Reward: +{activeLesson.xpReward} XP Bounty</span>
          </div>

          <div className="flex items-center gap-2">
            {!isAnswerChecked || !isCorrect ? (
              <RetroButton
                variant="yellow"
                size="sm"
                disabled={!selectedOptionId}
                onClick={handleCheckAnswer}
              >
                SUBMIT ANSWER
              </RetroButton>
            ) : (
              <RetroButton
                variant="green"
                size="sm"
                onClick={handleNextLessonManual}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                {currentLessonIndex < chapter.lessons.length - 1
                  ? "NEXT CHRONICLE →"
                  : "FINISH REALM QUEST →"}
              </RetroButton>
            )}
          </div>
        </div>
      </div>

      {/* 7. Bottom Navigation Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-[#3D2612]">
        {currentLessonIndex > 0 ? (
          <RetroButton
            variant="outline"
            size="sm"
            onClick={() => {
              setActiveLessonId(chapter.lessons[currentLessonIndex - 1].id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            ← PREVIOUS SCROLL
          </RetroButton>
        ) : (
          <RetroButton variant="outline" size="sm" href="/journey">
            ← REALM MAP
          </RetroButton>
        )}

        {currentLessonIndex < chapter.lessons.length - 1 ? (
          <RetroButton
            variant="blue"
            size="sm"
            onClick={() => {
              setActiveLessonId(chapter.lessons[currentLessonIndex + 1].id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            NEXT SCROLL →
          </RetroButton>
        ) : (
          <RetroButton variant="yellow" size="sm" href="/journey">
            VIEW ADVENTURE PATH
          </RetroButton>
        )}
      </div>

      {/* 8. AUTOMATIC COMPANION GUIDANCE MODAL */}
      <CompanionGuidanceModal
        isOpen={guidanceConfig.isOpen}
        type={guidanceConfig.type}
        currentTitle={guidanceConfig.currentTitle}
        nextTitle={guidanceConfig.nextTitle}
        xpAwarded={guidanceConfig.xpAwarded}
        badgeUnlockedTitle={guidanceConfig.badgeUnlockedTitle}
        nextChapterId={guidanceConfig.nextChapterId}
        onAdvance={handleAdvanceGuidance}
        onClose={() => setGuidanceConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
