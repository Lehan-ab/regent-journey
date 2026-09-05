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
} from "lucide-react";
import RetroCard from "@/components/ui/RetroCard";
import RetroButton from "@/components/ui/RetroButton";
import PixelCompanion from "@/components/companion/PixelCompanion";
import { usePlayer } from "@/context/PlayerContext";
import { CHAPTERS_DATA, LessonData, ChapterDetails } from "@/data/chaptersData";
import { realmLocations } from "@/data/realmMapLocations";

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
  const [showChapterSuccessModal, setShowChapterSuccessModal] = useState<boolean>(false);
  const [unlockedBadgeTitle, setUnlockedBadgeTitle] = useState<string>("");

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

  // Check quiz option
  const handleCheckAnswer = () => {
    if (!selectedOptionId || !activeLesson) return;

    const correct = selectedOptionId === activeLesson.knowledgeCheck.correctOptionId;
    setIsAnswerChecked(true);
    setIsCorrect(correct);

    if (correct) {
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
      if (res.chapterCompleted) {
        setUnlockedBadgeTitle(res.badgeUnlocked?.title || chapter.badgeReward);
        setShowChapterSuccessModal(true);
      }
    }
  };

  const handleNextLesson = () => {
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
      <div className="flex items-center justify-between pb-3 border-b border-border-card mb-5">
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
          <span className="text-[10px] font-pixel text-text-muted">
            • LESSON {currentLessonIndex + 1} OF {chapter.lessons.length}
          </span>
        </div>
      </div>

      {/* 2. Chapter Illustrated Header Banner */}
      <RetroCard className="overflow-hidden mb-6 border-2 border-regent-blue bg-[#071331]">
        <div className="relative w-full h-36 sm:h-44 md:h-52 overflow-hidden">
          <Image
            src={realmLocation?.image || "/images/rotary_roots.jpg"}
            alt={chapter.worldName}
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071331] via-[#071331]/60 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-regent-maroon text-white font-pixel text-[10px] sm:text-xs font-bold uppercase border border-red-950">
                {chapter.chapterLabel}
              </span>
              <span className="px-2 py-0.5 bg-[#02091F]/90 text-regent-blue font-pixel text-[10px] sm:text-xs border border-border-card">
                {chapter.worldName}
              </span>
            </div>

            <div className="px-2 py-0.5 bg-[#02091F]/90 text-regent-gold font-pixel text-[10px] sm:text-xs border border-yellow-900/60 flex items-center gap-1 font-bold">
              <Sparkles className="w-3 h-3" /> BADGE: {chapter.badgeReward}
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
          <div className="p-3 bg-[#03091B] border-t border-border-card flex items-start gap-3">
            <div className="w-8 h-8 rounded-none bg-regent-maroon border border-regent-gold flex items-center justify-center font-pixel text-xs font-bold text-regent-gold shrink-0 mt-0.5">
              {activeLesson.storyIntro.speaker.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-xs text-regent-gold font-bold">
                  {activeLesson.storyIntro.speaker.toUpperCase()}
                </span>
                <span className="text-[10px] text-text-muted">
                  ({activeLesson.storyIntro.speakerRole})
                </span>
              </div>
              <p className="text-xs text-text-secondary italic mt-0.5 leading-relaxed">
                &ldquo;{activeLesson.storyIntro.dialogue}&rdquo;
              </p>
            </div>
          </div>
        )}
      </RetroCard>

      {/* 3. Interactive Lesson Stepper / Tabs */}
      <div className="mb-6 p-2 bg-[#02091F] border-2 border-border-card overflow-x-auto">
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
                    ? "bg-[#091f42] border-regent-blue text-white shadow-[0_0_10px_rgba(32,169,246,0.3)]"
                    : completed
                    ? "bg-[#04152e] border-regent-green/50 text-text-secondary hover:text-white"
                    : "bg-[#050e24] border-border-card text-text-muted hover:text-text-secondary"
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
                  <span className="w-1.5 h-1.5 rounded-full bg-regent-blue animate-ping shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Main Lesson Reader Content */}
      <div className="space-y-6">
        {/* Lesson Heading Card */}
        <div className="p-4 sm:p-6 bg-[#071331] border-2 border-border-card">
          <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
            <span className="px-2 py-0.5 bg-regent-blue/20 text-regent-blue font-pixel text-[10px] border border-regent-blue/50">
              LESSON {currentLessonIndex + 1} OF {chapter.lessons.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-pixel text-text-muted flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-text-muted" /> {activeLesson.readTime}
              </span>
              <span className="px-2 py-0.5 bg-[#02091F] text-regent-gold font-pixel text-[10px] border border-yellow-900/60 font-bold flex items-center gap-1">
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
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            {activeLesson.subtitle}
          </p>
        </div>

        {/* Lesson Sections */}
        {activeLesson.sections.map((section, sIdx) => (
          <RetroCard key={sIdx} className="p-5 sm:p-6 bg-[#071331]">
            <h3 className="font-pixel text-base sm:text-lg font-bold text-white mb-3 flex items-center gap-2">
              <span className="text-regent-gold">§</span> {section.title}
            </h3>

            {/* Paragraphs */}
            <div className="space-y-3 font-body text-xs sm:text-sm text-text-secondary leading-relaxed">
              {section.content.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {/* Bullet Points */}
            {section.bulletPoints && (
              <div className="mt-4 p-3.5 bg-[#02091F] border border-border-card space-y-2">
                {section.bulletPoints.map((point, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5 text-xs text-white">
                    <span className="font-pixel text-regent-gold text-xs shrink-0 mt-0.5">✦</span>
                    <span className="leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Quote Box */}
            {section.quote && (
              <div className="mt-4 p-3.5 bg-gradient-to-r from-red-950/40 via-[#071331] to-red-950/40 border-l-4 border-regent-maroon">
                <p className="text-xs sm:text-sm text-white italic whitespace-pre-line leading-relaxed">
                  &ldquo;{section.quote.text}&rdquo;
                </p>
                <p className="text-[10px] font-pixel text-regent-gold mt-1.5 uppercase">
                  — {section.quote.author}
                </p>
              </div>
            )}

            {/* Key Takeaway */}
            {section.keyTakeaway && (
              <div className="mt-4 p-3 bg-[#02091F] border border-regent-blue/40 flex items-start gap-2.5 text-xs">
                <Shield className="w-4 h-4 text-regent-blue shrink-0 mt-0.5" />
                <span className="text-white font-medium leading-relaxed">
                  <strong>Key Regent Rule:</strong> {section.keyTakeaway}
                </span>
              </div>
            )}
          </RetroCard>
        ))}

        {/* 5. Companion Dialogue / Advice Box */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#03091B] via-[#071331] to-[#03091B] border-2 border-regent-gold/60 flex items-start gap-4 shadow-retro-card">
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
              <span className="text-[9px] font-pixel text-text-muted">
                ADVENTURE ALLY
              </span>
            </div>
            <p className="font-body text-xs sm:text-sm text-white italic leading-relaxed">
              &ldquo;{companionInsight}&rdquo;
            </p>
          </div>
        </div>

        {/* 6. Interactive Knowledge Check / Quiz */}
        <RetroCard
          headerTag="KNOWLEDGE CHECK QUEST"
          headerColor="yellow"
          className="p-5 sm:p-6 bg-[#071331] border-2 border-regent-gold"
        >
          <div className="flex items-start gap-2.5 mb-4">
            <HelpCircle className="w-5 h-5 text-regent-gold shrink-0 mt-0.5" />
            <div>
              <h3 className="font-pixel text-sm sm:text-base font-bold text-white leading-snug">
                {activeLesson.knowledgeCheck.question}
              </h3>
              <p className="text-[11px] text-text-muted mt-0.5">
                Select the correct option to prove your understanding and claim your +{activeLesson.xpReward} XP bounty!
              </p>
            </div>
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5 mb-4">
            {activeLesson.knowledgeCheck.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isTheCorrectOption = option.id === activeLesson.knowledgeCheck.correctOptionId;

              let buttonStyle = "border-border-card bg-[#02091F] text-white hover:border-regent-blue";
              if (isAnswerChecked) {
                if (isTheCorrectOption) {
                  buttonStyle = "border-regent-green bg-green-950/70 text-white font-bold";
                } else if (isSelected && !isTheCorrectOption) {
                  buttonStyle = "border-red-600 bg-red-950/70 text-white line-through";
                }
              } else if (isSelected) {
                buttonStyle = "border-regent-blue bg-[#091f42] text-white font-bold";
              }

              return (
                <button
                  key={option.id}
                  onClick={() => {
                    if (!isAnswerChecked || !isCorrect) {
                      setSelectedOptionId(option.id);
                      setIsAnswerChecked(false);
                    }
                  }}
                  className={`w-full p-3.5 border text-left text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${buttonStyle}`}
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
              className={`p-3 border mb-4 text-xs ${
                isCorrect
                  ? "bg-green-950/60 border-regent-green text-green-200"
                  : "bg-red-950/60 border-red-800 text-red-200"
              }`}
            >
              {isCorrect ? (
                <div>
                  <p className="font-pixel text-xs font-bold text-regent-gold mb-1">
                    ✦ QUEST COMPLETE! +{activeLesson.xpReward} XP AWARDED!
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-border-card">
            <div className="text-[10px] font-pixel text-text-muted flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-regent-gold" />
              <span>Reward: +{activeLesson.xpReward} XP</span>
            </div>

            <div className="flex items-center gap-2">
              {!isAnswerChecked || !isCorrect ? (
                <RetroButton
                  variant="blue"
                  size="sm"
                  disabled={!selectedOptionId}
                  onClick={handleCheckAnswer}
                >
                  CHECK ANSWER
                </RetroButton>
              ) : (
                <RetroButton
                  variant="green"
                  size="sm"
                  onClick={handleNextLesson}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  {currentLessonIndex < chapter.lessons.length - 1
                    ? "NEXT LESSON →"
                    : "FINISH CHAPTER QUEST →"}
                </RetroButton>
              )}
            </div>
          </div>
        </RetroCard>
      </div>

      {/* 7. Bottom Navigation Controls */}
      <div className="mt-8 flex items-center justify-between pt-4 border-t border-border-card">
        {currentLessonIndex > 0 ? (
          <RetroButton
            variant="outline"
            size="sm"
            onClick={() => {
              setActiveLessonId(chapter.lessons[currentLessonIndex - 1].id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            ← PREVIOUS LESSON
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
            NEXT LESSON →
          </RetroButton>
        ) : (
          <RetroButton variant="yellow" size="sm" href="/journey">
            VIEW ADVENTURE PATH
          </RetroButton>
        )}
      </div>

      {/* 8. Grand Chapter Victory / Realm Cleared Celebration Modal */}
      {showChapterSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#071331] border-4 border-regent-gold p-6 text-center shadow-retro-card-lg relative animate-bounce-slight">
            <div className="w-16 h-16 mx-auto bg-amber-950 border-2 border-regent-gold flex items-center justify-center mb-3">
              <Trophy className="w-8 h-8 text-regent-gold animate-bounce" />
            </div>

            <span className="font-pixel text-[10px] text-regent-gold bg-regent-maroon px-2 py-0.5 border border-red-950 font-bold uppercase">
              REALM QUEST CLEARED!
            </span>

            <h2 className="font-pixel text-xl sm:text-2xl font-bold text-white mt-2 mb-1">
              {chapter.chapterTitle.toUpperCase()} COMPLETED!
            </h2>

            <p className="text-xs sm:text-sm text-text-secondary mb-4 leading-relaxed">
              You have completed all {chapter.lessons.length} lessons in this chapter! Your dedication to Rotary and Regent knowledge elevates your standing.
            </p>

            <div className="p-3 bg-[#02091F] border border-border-card mb-5 text-left flex items-center gap-3">
              <div className="w-12 h-12 bg-regent-maroon border border-regent-gold flex items-center justify-center font-pixel text-base font-bold text-regent-gold shrink-0">
                ✦
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-pixel text-regent-gold uppercase block">
                  BADGE UNLOCKED
                </span>
                <span className="font-pixel text-sm font-bold text-white block truncate">
                  {unlockedBadgeTitle}
                </span>
                <span className="text-[10px] text-text-muted block">
                  Added to your Profile Badge Vault (+{chapter.xpReward} XP total)
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <RetroButton
                variant="yellow"
                size="md"
                className="w-full justify-center"
                onClick={() => {
                  setShowChapterSuccessModal(false);
                  router.push("/journey");
                }}
              >
                RETURN TO REALM MAP
              </RetroButton>

              <button
                onClick={() => setShowChapterSuccessModal(false)}
                className="text-xs text-text-muted hover:text-white font-pixel pt-1 block mx-auto"
              >
                STAY IN CHAPTER TO REVIEW LESSONS
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
