import { PlayerState } from "@/types/player";
import { CHAPTERS_DATA, ChapterDetails } from "@/data/chaptersData";
import { CANONICAL_BADGES } from "@/data/canonicalBadges";
import { CANONICAL_MISSIONS } from "@/data/missionsData";

export const CANONICAL_CHAPTER_IDS = [
  "loc-gateway",
  "loc-rotary-roots",
  "loc-rotaract-harbor",
  "loc-regent-keep",
  "loc-seven-realms",
  "loc-project-forge",
  "loc-codewood",
  "loc-grand-archive",
  "loc-impact-frontier",
  "loc-membership-citadel",
] as const;

export type CanonicalChapterId = (typeof CANONICAL_CHAPTER_IDS)[number];

/**
 * Chapters that constitute the prospect learning and knowledge curriculum.
 * Completing these 9 chapters (Prologue + Chapters 1-8) satisfies the knowledge
 * requirement for Membership Board Review eligibility.
 * Chapter 9 (Membership Citadel) is the induction stage itself and is not a prerequisite to board review.
 */
export const REQUIRED_KNOWLEDGE_CHAPTER_IDS: CanonicalChapterId[] = [
  "loc-gateway",
  "loc-rotary-roots",
  "loc-rotaract-harbor",
  "loc-regent-keep",
  "loc-seven-realms",
  "loc-project-forge",
  "loc-codewood",
  "loc-grand-archive",
  "loc-impact-frontier",
];

// Flatten all canonical required lesson IDs
export const REQUIRED_JOURNEY_LESSON_IDS: string[] = CANONICAL_CHAPTER_IDS.flatMap(
  (chapId) => {
    const chap = CHAPTERS_DATA[chapId];
    return chap ? chap.lessons.map((l) => l.id) : [];
  }
);

export const TOTAL_REQUIRED_LESSONS_COUNT = REQUIRED_JOURNEY_LESSON_IDS.length; // 34 lessons

/**
 * Derives Level, Rank, XP to next level, and progress percentage strictly from XP.
 */
export function getLevelFromXP(xp: number): {
  level: number;
  rank: string;
  xpToNextLevel: number;
  prevLevelXp: number;
  progressPercent: number;
} {
  const safeXp = Math.max(0, xp || 0);

  let level = 1;
  let rank = "Prospect";
  let xpToNextLevel = 100;
  let prevLevelXp = 0;

  if (safeXp >= 500) {
    level = 4;
    rank = "Senior Regent";
    xpToNextLevel = 800;
    prevLevelXp = 500;
  } else if (safeXp >= 250) {
    level = 3;
    rank = "Pathfinder";
    xpToNextLevel = 500;
    prevLevelXp = 250;
  } else if (safeXp >= 100) {
    level = 2;
    rank = "Explorer";
    xpToNextLevel = 250;
    prevLevelXp = 100;
  } else {
    level = 1;
    rank = "Prospect";
    xpToNextLevel = 100;
    prevLevelXp = 0;
  }

  const range = xpToNextLevel - prevLevelXp;
  const progressPercent =
    range > 0
      ? Math.min(100, Math.max(0, Math.round(((safeXp - prevLevelXp) / range) * 100)))
      : 100;

  return { level, rank, xpToNextLevel, prevLevelXp, progressPercent };
}

/**
 * Checks if a specific lesson is completed.
 */
export function isLessonCompleted(player: PlayerState | null | undefined, lessonId: string): boolean {
  if (!player || !player.completedLessons) return false;
  return player.completedLessons.includes(lessonId);
}

/**
 * Pure selector: determines if a chapter is unlocked.
 * Rules:
 * - Chapter 0 (The Gateway) is unlocked by default.
 * - Chapter 9 (Membership Citadel) is the final induction process. It unlocks when
 *   all required knowledge chapters are completed AND the prospect is eligible for board review.
 * - All other chapters unlock sequentially when their immediate predecessor is completed.
 */
export function isChapterUnlocked(player: PlayerState | null | undefined, chapterId: string): boolean {
  if (!player) return chapterId === "loc-gateway" || chapterId === "chapter-1";
  if (chapterId === "loc-gateway" || chapterId === "chapter-1") return true;

  if (chapterId === "loc-membership-citadel") {
    return getMembershipReadiness(player).eligibleForBoardReview;
  }

  // Completing Chapter 1 (The Hidden Gateway) unlocks The River of Legacy (loc-rotaract-harbor)
  if (chapterId === "loc-rotaract-harbor") {
    if (isChapterCompleted(player, "chapter-1")) {
      return true;
    }
  }

  const idx = CANONICAL_CHAPTER_IDS.indexOf(chapterId as CanonicalChapterId);
  if (idx <= 0) return true;

  const prevChapterId = CANONICAL_CHAPTER_IDS[idx - 1];
  return isChapterCompleted(player, prevChapterId);
}

/**
 * Pure selector: determines the progress of a given chapter.
 * Strictly derives completion from completedLessons.
 */
export function getChapterProgress(
  player: PlayerState | null | undefined,
  chapterId: string
): {
  completedCount: number;
  totalCount: number;
  percentage: number;
  isCompleted: boolean;
  isUnlocked: boolean;
} {
  const chapter = CHAPTERS_DATA[chapterId];
  if (!chapter || !chapter.lessons || chapter.lessons.length === 0) {
    return {
      completedCount: 0,
      totalCount: 0,
      percentage: 0,
      isCompleted: false,
      isUnlocked: isChapterUnlocked(player, chapterId),
    };
  }

  const totalCount = chapter.lessons.length;
  const completedLessons = player?.completedLessons || [];
  const completedCount = chapter.lessons.filter((l) => completedLessons.includes(l.id)).length;
  const percentage = Math.round((completedCount / totalCount) * 100);
  const isCompleted = completedCount === totalCount && totalCount > 0;
  const isUnlocked = isChapterUnlocked(player, chapterId);

  return {
    completedCount,
    totalCount,
    percentage: isCompleted ? 100 : percentage,
    isCompleted,
    isUnlocked,
  };
}

/**
 * Checks if all required lessons of a chapter are completed.
 * Authoritative: strictly derived from getChapterProgress.
 */
export function isChapterCompleted(player: PlayerState | null | undefined, chapterId: string): boolean {
  return getChapterProgress(player, chapterId).isCompleted;
}

export type ChapterCTAType = "LOCKED" | "BEGIN CHAPTER" | "CONTINUE JOURNEY" | "REVISIT CHAPTER";

/**
 * Pure selector: returns the unambiguous CTA wording and state for a chapter.
 * Rules:
 * - LOCKED: Prerequisite chapter is incomplete.
 * - BEGIN CHAPTER: Unlocked and 0 lessons completed.
 * - CONTINUE JOURNEY: At least 1 lesson complete, but chapter not complete.
 * - REVISIT CHAPTER: All required lessons complete.
 */
export function getChapterCTA(
  player: PlayerState | null | undefined,
  chapterId: string
): {
  text: ChapterCTAType;
  variant: "blue" | "outline" | "disabled";
  isLocked: boolean;
  href: string;
} {
  const { completedCount, isCompleted, isUnlocked } = getChapterProgress(player, chapterId);

  if (!isUnlocked) {
    return {
      text: "LOCKED",
      variant: "disabled",
      isLocked: true,
      href: `/journey/${chapterId}`,
    };
  }

  if (isCompleted) {
    return {
      text: "REVISIT CHAPTER",
      variant: "outline",
      isLocked: false,
      href: `/journey/${chapterId}`,
    };
  }

  if (completedCount > 0) {
    return {
      text: "CONTINUE JOURNEY",
      variant: "blue",
      isLocked: false,
      href: `/journey/${chapterId}`,
    };
  }

  return {
    text: "BEGIN CHAPTER",
    variant: "blue",
    isLocked: false,
    href: `/journey/${chapterId}`,
  };
}

/**
 * Pure selector: computes overall Journey progress % using ONLY canonical required lessons.
 */
export function getJourneyProgress(player: PlayerState | null | undefined): number {
  if (!player || !player.completedLessons || TOTAL_REQUIRED_LESSONS_COUNT === 0) {
    return 0;
  }

  const completedRequiredCount = REQUIRED_JOURNEY_LESSON_IDS.filter((id) =>
    player.completedLessons.includes(id)
  ).length;

  return Math.min(
    100,
    Math.round((completedRequiredCount / TOTAL_REQUIRED_LESSONS_COUNT) * 100)
  );
}

/**
 * Pure selector: checks if a badge is unlocked by ID.
 */
export function isBadgeUnlocked(player: PlayerState | null | undefined, badgeId: string): boolean {
  if (!player || !player.badges) return false;
  return player.badges.some((b) => b.id === badgeId);
}

/**
 * Pure selector: computes membership readiness.
 *
 * Requirements for Board Review eligibility:
 * 1. Complete all foundational learning chapters (Chapters 0-8 in REQUIRED_KNOWLEDGE_CHAPTER_IDS).
 * 2. Complete and verify at least 2 meetings (meetingsVerified >= 2).
 * 3. Complete and verify at least 2 projects (projectsVerified >= 2).
 *
 * Notice: Chapter 9 (Membership Citadel) is the Board Review & Induction ceremony itself.
 * Therefore, Chapter 9 completion is NEVER a requirement to become eligible for board review.
 */
export function getMembershipReadiness(player: PlayerState | null | undefined): {
  knowledgeComplete: boolean;
  completedKnowledgeChaptersCount: number;
  totalKnowledgeChaptersCount: number;
  meetings: { current: number; required: number };
  projects: { current: number; required: number };
  verificationComplete: boolean;
  eligibleForBoardReview: boolean;
  boardStatus: "not-eligible" | "eligible" | "under-review" | "approved";
} {
  const completedKnowledgeCount = REQUIRED_KNOWLEDGE_CHAPTER_IDS.filter((chapId) =>
    isChapterCompleted(player, chapId)
  ).length;
  const totalKnowledgeCount = REQUIRED_KNOWLEDGE_CHAPTER_IDS.length;
  const knowledgeComplete = completedKnowledgeCount === totalKnowledgeCount;

  const meetingsCurrent = player?.membership?.meetingsVerified || 0;
  const projectsCurrent = player?.membership?.projectsVerified || 0;
  const meetingsRequired = 2;
  const projectsRequired = 2;

  const verificationComplete =
    meetingsCurrent >= meetingsRequired && projectsCurrent >= projectsRequired;
  const eligibleForBoardReview = knowledgeComplete && verificationComplete;

  const boardStatus =
    player?.membership?.boardStatus || (eligibleForBoardReview ? "eligible" : "not-eligible");

  return {
    knowledgeComplete,
    completedKnowledgeChaptersCount: completedKnowledgeCount,
    totalKnowledgeChaptersCount: totalKnowledgeCount,
    meetings: { current: meetingsCurrent, required: meetingsRequired },
    projects: { current: projectsCurrent, required: projectsRequired },
    verificationComplete,
    eligibleForBoardReview,
    boardStatus,
  };
}

export interface NextRecommendedAction {
  type: "onboarding" | "lesson" | "mission" | "induction";
  title: string;
  subtitle: string;
  chapterId?: string;
  chapterLabel?: string;
  worldName?: string;
  lessonNumber?: number;
  lessonId?: string;
  href: string;
  xpReward: number;
}

/**
 * Pure selector: determines the authoritative next step across the entire application.
 */
export function getNextRecommendedAction(
  player: PlayerState | null | undefined
): NextRecommendedAction {
  // 1. If onboarding is not completed, resume onboarding
  if (!player || !player.onboardingComplete) {
    const step = player?.onboardingStep || "explorer";
    return {
      type: "onboarding",
      title: "RESUME ONBOARDING",
      subtitle: "Complete your explorer registration and choose your companion.",
      href: `/onboarding?step=${step}`,
      xpReward: 25,
    };
  }

  // 2. Look for the first unlocked chapter that is incomplete, and find its first incomplete lesson
  for (const chapterId of CANONICAL_CHAPTER_IDS) {
    const unlocked = isChapterUnlocked(player, chapterId);
    const chapter = CHAPTERS_DATA[chapterId];

    if (unlocked && chapter) {
      const firstIncompleteLesson = chapter.lessons.find(
        (l) => !isLessonCompleted(player, l.id)
      );

      if (firstIncompleteLesson) {
        return {
          type: "lesson",
          title: firstIncompleteLesson.title,
          subtitle: firstIncompleteLesson.subtitle,
          chapterId: chapter.id,
          chapterLabel: chapter.chapterLabel,
          worldName: chapter.worldName,
          lessonNumber: firstIncompleteLesson.lessonNumber,
          lessonId: firstIncompleteLesson.id,
          href: `/journey/${chapter.id}?lesson=${firstIncompleteLesson.id}`,
          xpReward: firstIncompleteLesson.xpReward,
        };
      }
    }
  }

  // 3. If all knowledge chapters complete, but Membership Citadel is still locked (awaiting field verification)
  const readiness = getMembershipReadiness(player);
  if (readiness.knowledgeComplete && !readiness.eligibleForBoardReview) {
    return {
      type: "mission",
      title: "FIELD VERIFICATION REQUIRED",
      subtitle: `Attend and verify meetings (${readiness.meetings.current}/${readiness.meetings.required}) and projects (${readiness.projects.current}/${readiness.projects.required}) to unlock Membership Citadel.`,
      href: "/missions",
      xpReward: 150,
    };
  }

  // 4. If all chapters are completed, recommend official induction ceremony
  return {
    type: "induction",
    title: "MEMBERSHIP CITADEL",
    subtitle: "Take the Regent Oath and prepare for board induction review.",
    chapterId: "loc-membership-citadel",
    chapterLabel: "CHAPTER 9",
    worldName: "Membership Citadel",
    href: "/journey/loc-membership-citadel",
    xpReward: 500,
  };
}
