import { StoryChapter } from "../types/chapter";
import { StoryLesson } from "../types/lesson";
import { StoryLocation } from "../types/location";
import type { ChapterDetails, LessonData } from "@/data/chaptersData";
import type { RealmLocation } from "@/data/realmMapLocations";

export function adaptStoryLessonToLegacy(lesson: StoryLesson): LessonData {
  return {
    id: lesson.id,
    chapterId: lesson.chapterId,
    lessonNumber: lesson.lessonNumber,
    title: lesson.title,
    subtitle: lesson.subtitle,
    readTime: lesson.readTime,
    xpReward: lesson.reward.xp,
    storyIntro: lesson.storyIntro || {
      speaker: "The Guide",
      speakerRole: "Companion",
      dialogue: "Welcome to this chronicle.",
    },
    scriptedDialogue: lesson.dialogue.beats.map((beat) => ({
      id: beat.id,
      speaker: beat.speaker === "system" ? "npc" : beat.speaker,
      speakerName: beat.speakerName,
      role: beat.role,
      text: beat.text,
      emotion: beat.emotion,
      sceneEvent: beat.sceneEvent,
      companionVariants: beat.companionVariants,
    })),
    sceneConfig: {
      sceneType: lesson.scene.sceneType,
      variant: lesson.scene.variant,
      atmosphereTitle: lesson.scene.atmosphere.title,
      pairedAvenues: lesson.scene.pairedAvenues,
      backdropImage: lesson.scene.backdrop.imagePath,
    },
    source: lesson.source,
    sections: lesson.codexSections.map((sec) => ({
      title: sec.title,
      content: sec.content,
      keyTakeaway: sec.keyTakeaway,
      bulletPoints: sec.bulletPoints,
      quote: sec.quote,
    })),
    companionAdvice: lesson.companionAdvice,
    knowledgeTrial: lesson.knowledgeTrial,
    knowledgeCheck: {
      question: lesson.knowledgeTrial.question,
      options: lesson.knowledgeTrial.options.map((opt) => ({
        id: opt.id,
        text: opt.text,
        explanation: opt.explanation,
      })),
      correctOptionId: lesson.knowledgeTrial.correctOptionId,
      hint: lesson.knowledgeTrial.hint,
      successMessage: lesson.knowledgeTrial.successMessage,
    },
  };
}

export function adaptStoryChapterToLegacy(chapter: StoryChapter): ChapterDetails {
  return {
    id: chapter.id,
    chapterNumber: chapter.chapterNumber,
    chapterLabel: chapter.chapterLabel,
    chapterTitle: chapter.chapterTitle,
    worldName: chapter.worldName,
    regionTitle: chapter.regionTitle,
    seethawakaInspiration: chapter.seethawakaInspiration,
    summary: chapter.summary,
    badgeReward: chapter.completionReward.badge?.title || chapter.completionReward.badgeId || "BADGE",
    xpReward: chapter.completionReward.xp,
    guideNpc: chapter.guideNpcId,
    lessons: chapter.lessons.map(adaptStoryLessonToLegacy),
  };
}

export function adaptStoryLocationToLegacy(
  location: StoryLocation,
  options?: {
    status?: "COMPLETED" | "CURRENT" | "LOCKED";
    lessonsTotal?: number;
    lessonsCompleted?: number;
    nextLesson?: string;
    xpReward?: number;
    badgeReward?: string;
    npc?: { name: string; role: string; quote: string };
  }
): RealmLocation {
  return {
    id: location.id,
    chapterNumber: location.chapterNumber,
    isPrologue: location.isPrologue,
    chapterLabel: location.chapterNumber === 0 ? "PROLOGUE" : `CHAPTER ${location.chapterNumber}`,
    chapterTitle: location.worldName,
    worldName: location.worldName,
    regionTitle: location.regionTitle,
    seethawakaInspiration: location.seethawakaHeritage.historicalLandmark,
    purpose: location.description,
    description: location.description,
    expandedLore: location.expandedLore,
    visualTag: location.visualTag,
    status: options?.status || "LOCKED",
    lessonsTotal: options?.lessonsTotal || 2,
    lessonsCompleted: options?.lessonsCompleted || 0,
    nextLesson: options?.nextLesson,
    xpReward: options?.xpReward || 50,
    badgeReward: options?.badgeReward,
    image: location.image,
    routeHref: location.routeHref,
    npc: options?.npc || {
      name: "The Guide",
      role: "Realm Guardian",
      quote: "Walk with purpose.",
    },
    coords: location.coords,
    unlockRequirement: location.unlockRequirement,
  };
}
