"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  PlayerState,
  ExplorerId,
  AvatarConfig,
  ExplorerCustomizationState,
  CompanionId,
  OnboardingStep,
  Badge,
  PlayerMissionsState,
  PlayerMembershipState,
} from "@/types/player";
import { DEFAULT_AVATAR } from "@/data/avatarOptions";
import { DEFAULT_EXPLORER_CUSTOMIZATION, COSMETIC_ITEMS } from "@/data/customizationsData";
import { COMPANIONS } from "@/data/companionsData";
import { CHAPTERS_DATA } from "@/data/chaptersData";
import {
  CANONICAL_BADGES,
  CANONICAL_BADGES_BY_CHAPTER,
  CANONICAL_BADGE_MAP,
  BadgeDefinition,
} from "@/data/canonicalBadges";
import { CANONICAL_MISSIONS_MAP } from "@/data/missionsData";
import {
  CANONICAL_CHAPTER_IDS,
  CanonicalChapterId,
  REQUIRED_JOURNEY_LESSON_IDS,
  getLevelFromXP,
  isLessonCompleted as selectorIsLessonCompleted,
  isChapterUnlocked as selectorIsChapterUnlocked,
  isChapterCompleted as selectorIsChapterCompleted,
  getChapterProgress as selectorGetChapterProgress,
  getChapterCTA as selectorGetChapterCTA,
  getJourneyProgress as selectorGetJourneyProgress,
  getMembershipReadiness as selectorGetMembershipReadiness,
  getNextRecommendedAction as selectorGetNextRecommendedAction,
} from "@/lib/progressionSelectors";

const STORAGE_KEY = "regent-journey-progress-v1";
const LEGACY_STORAGE_KEY = "regent_journey_player_v2";

export const INITIAL_PLAYER_STATE: PlayerState = {
  version: 1,
  curriculumVersion: 2,
  name: "TRAVELLER",
  role: "Prospect",
  explorerId: "pathfinder",
  avatar: DEFAULT_AVATAR,
  explorerCustomization: DEFAULT_EXPLORER_CUSTOMIZATION,
  unlockedCosmetics: [
    "base_explorer",
    "explorer_satchel",
    "notebook_accessory",
    "lantern_accessory",
  ],
  projectPatches: [],
  companion: "nova",
  companionRelationship: {
    id: "nova",
    name: "NOVA",
    archetype: "Wise Guide",
    relationshipXP: 0,
    relationshipLevel: 1,
    trustLevel: "New Companion",
  },
  interests: [],
  primaryGoal: "",
  xp: 0,
  level: 1,
  xpToNextLevel: 100,
  rank: "Prospect",
  streak: 1,
  badges: [],
  onboardingComplete: false,
  onboardingStep: "explorer",
  currentWorld: "The Gateway",
  currentLocationId: "loc-gateway",
  currentChapterId: "loc-gateway",
  currentChapterLabel: "PROLOGUE",
  completedWorlds: [],
  completedLessons: [],
  journeyProgress: 0,
  membershipStatus: "PROSPECT",
  missions: {
    enrolled: [],
    completed: [],
    verified: [],
  },
  membership: {
    meetingsAttended: 0,
    meetingsVerified: 0,
    projectsParticipated: 0,
    projectsVerified: 0,
    knowledgeRequirementCompleted: false,
    eligibleForBoardReview: false,
    boardStatus: "not-eligible",
  },
};

/**
 * Normalizes and safely migrates legacy state into Curriculum V2.
 * When migrating from V1 (or unversioned) to V2:
 * - PRESERVES: Identity (name, archetype, companion, avatar, cosmetics, interests, goal, onboarding, missions).
 * - RESETS: Obsolete curriculum completion (lessons, chapters, journey %, chapter badges, XP to 0, level to 1, rank to Prospect).
 */
export function migrateProgress(savedData: any): PlayerState {
  if (!savedData || typeof savedData !== "object") {
    return INITIAL_PLAYER_STATE;
  }

  // 1. Detect Curriculum Version
  const isCurriculumV1 = !savedData.curriculumVersion || savedData.curriculumVersion < 2;

  // 2. Core Profile Identity (Preserved)
  const rawName = typeof savedData.name === "string" && savedData.name.trim() ? savedData.name.trim() : "TRAVELLER";
  const name = rawName === "Traveller" ? "TRAVELLER" : rawName;
  const role: "Prospect" | "Member" = savedData.role === "Member" ? "Member" : "Prospect";
  const explorerId: ExplorerId = savedData.explorerId || "pathfinder";

  const avatar: AvatarConfig = {
    ...DEFAULT_AVATAR,
    ...(savedData.avatar || {}),
  };

  const explorerCustomization: ExplorerCustomizationState = {
    ...DEFAULT_EXPLORER_CUSTOMIZATION,
    ...(savedData.explorerCustomization || {}),
  };

  const unlockedCosmetics: string[] = Array.from(
    new Set([
      ...INITIAL_PLAYER_STATE.unlockedCosmetics,
      ...(Array.isArray(savedData.unlockedCosmetics) ? savedData.unlockedCosmetics : []),
    ])
  );

  const projectPatches: string[] = Array.isArray(savedData.projectPatches)
    ? Array.from(new Set(savedData.projectPatches))
    : [];

  const companion: CompanionId =
    savedData.companion === "raya" || savedData.companion === "kai" || savedData.companion === "nova"
      ? savedData.companion
      : "nova";

  const companionInfo = COMPANIONS[companion] || COMPANIONS.nova;
  const companionRelationship = {
    id: companion,
    name: companionInfo.name,
    archetype: companionInfo.archetype,
    relationshipXP: isCurriculumV1 ? 0 : (savedData.companionRelationship?.relationshipXP || 0),
    relationshipLevel: isCurriculumV1 ? 1 : (savedData.companionRelationship?.relationshipLevel || 1),
    trustLevel: isCurriculumV1 ? "New Companion" : (savedData.companionRelationship?.trustLevel || "New Companion"),
  };

  const interests: string[] = Array.isArray(savedData.interests) ? savedData.interests : [];
  const primaryGoal: string = typeof savedData.primaryGoal === "string" ? savedData.primaryGoal : "";

  // 3. Onboarding State (Preserved)
  const onboardingComplete: boolean = Boolean(savedData.onboardingComplete);
  const onboardingStep: OnboardingStep = savedData.onboardingStep || (onboardingComplete ? "completed" : "explorer");

  // 4. Non-Curriculum Missions State (Preserved)
  const rawMissions = savedData.missions;
  let enrolledMissions: string[] = [];
  let completedMissions: string[] = [];
  let verifiedMissions: string[] = [];

  if (Array.isArray(rawMissions)) {
    // Support legacy array format of mission objects
    for (const m of rawMissions) {
      if (m && typeof m === "object" && typeof m.id === "string") {
        if (m.completed) completedMissions.push(m.id);
        else enrolledMissions.push(m.id);
        if (m.verified) verifiedMissions.push(m.id);
      }
    }
  } else if (rawMissions && typeof rawMissions === "object") {
    if (Array.isArray(rawMissions.enrolled)) {
      enrolledMissions = rawMissions.enrolled.filter((id: unknown): id is string => typeof id === "string");
    }
    if (Array.isArray(rawMissions.completed)) {
      completedMissions = rawMissions.completed.filter((id: unknown): id is string => typeof id === "string");
    }
    if (Array.isArray(rawMissions.verified)) {
      verifiedMissions = rawMissions.verified.filter((id: unknown): id is string => typeof id === "string");
    }
  }

  const missions: PlayerMissionsState = {
    enrolled: Array.from(new Set(enrolledMissions)),
    completed: Array.from(new Set(completedMissions)),
    verified: Array.from(new Set(verifiedMissions)),
  };

  // 5. Real-World Participation Tracking (Preserved)
  const rawMembership = savedData.membership || {};
  const meetingsAttended = Number(rawMembership.meetingsAttended) || 0;
  const meetingsVerified = Number(rawMembership.meetingsVerified) || 0;
  const projectsParticipated = Number(rawMembership.projectsParticipated) || 0;
  const projectsVerified = Number(rawMembership.projectsVerified) || 0;

  // --- CLEAN CURRICULUM V2 RESET RULE ---
  if (isCurriculumV1) {
    return {
      version: 1,
      curriculumVersion: 2,
      name,
      role,
      explorerId,
      avatar,
      explorerCustomization,
      unlockedCosmetics,
      projectPatches,
      companion,
      companionRelationship,
      interests,
      primaryGoal,
      xp: 0,
      level: 1,
      xpToNextLevel: 100,
      rank: "Prospect",
      streak: 1,
      badges: [],
      onboardingComplete,
      onboardingStep,
      currentWorld: "The Gateway",
      currentLocationId: "loc-gateway",
      currentChapterId: "loc-gateway",
      currentChapterLabel: "PROLOGUE",
      completedWorlds: [],
      completedLessons: [],
      journeyProgress: 0,
      membershipStatus: onboardingComplete ? "EXPLORER" : "PROSPECT",
      missions,
      membership: {
        meetingsAttended,
        meetingsVerified,
        projectsParticipated,
        projectsVerified,
        knowledgeRequirementCompleted: false,
        eligibleForBoardReview: false,
        boardStatus: "not-eligible",
      },
    };
  }

  // --- CURRICULUM V2 VALIDATION & DERIVATION ---
  const rawLessons = Array.isArray(savedData.completedLessons) ? savedData.completedLessons : [];
  const completedLessons: string[] = Array.from(
    new Set(rawLessons.filter((id: string) => REQUIRED_JOURNEY_LESSON_IDS.includes(id)))
  );

  const completedWorlds: string[] = CANONICAL_CHAPTER_IDS.filter((chapId) => {
    const chapter = CHAPTERS_DATA[chapId];
    if (!chapter || !chapter.lessons || chapter.lessons.length === 0) return false;
    return chapter.lessons.every((l) => completedLessons.includes(l.id));
  });

  const rawXp = typeof savedData.xp === "number" && !isNaN(savedData.xp) ? Math.max(0, savedData.xp) : 0;
  const { level, rank, xpToNextLevel } = getLevelFromXP(rawXp);

  // Derive chapter badges strictly from verified V2 completion
  const validBadgeMap = new Map<string, Badge>();
  for (const chapId of completedWorlds) {
    const canonicalBadge = CANONICAL_BADGES_BY_CHAPTER[chapId];
    if (canonicalBadge) {
      validBadgeMap.set(canonicalBadge.id, {
        id: canonicalBadge.id,
        title: canonicalBadge.title,
        description: canonicalBadge.description,
        imageUrl: canonicalBadge.imageUrl,
        unlockedAt: "Completed Milestone",
        rarity: canonicalBadge.rarity,
        xpAwarded: canonicalBadge.xpAwarded,
        curriculumVersion: 2,
      });
    }
  }

  const rawBadges: any[] = Array.isArray(savedData.badges) ? savedData.badges : [];
  for (const b of rawBadges) {
    if (b && typeof b.id === "string" && CANONICAL_BADGE_MAP[b.id]) {
      const def = CANONICAL_BADGE_MAP[b.id];
      if (def.category === "JOURNEY" && def.chapterId && !completedWorlds.includes(def.chapterId)) {
        continue;
      }
      validBadgeMap.set(b.id, {
        id: def.id,
        title: def.title,
        description: def.description,
        imageUrl: def.imageUrl,
        unlockedAt: b.unlockedAt || "Unlocked",
        rarity: def.rarity,
        xpAwarded: def.xpAwarded,
        curriculumVersion: 2,
      });
    }
  }

  const badges: Badge[] = Array.from(validBadgeMap.values());

  let activeChapterId: CanonicalChapterId = "loc-gateway";
  for (const chapId of CANONICAL_CHAPTER_IDS) {
    if (!completedWorlds.includes(chapId)) {
      activeChapterId = chapId;
      break;
    }
  }

  const activeChapterData = CHAPTERS_DATA[activeChapterId] || CHAPTERS_DATA["loc-gateway"];
  const currentWorld = activeChapterData.worldName;
  const currentLocationId = activeChapterId;
  const currentChapterId = activeChapterId;
  const currentChapterLabel = activeChapterData.chapterLabel;

  const readiness = selectorGetMembershipReadiness({
    ...INITIAL_PLAYER_STATE,
    completedLessons,
    membership: {
      meetingsAttended,
      meetingsVerified,
      projectsParticipated,
      projectsVerified,
      knowledgeRequirementCompleted: false,
      eligibleForBoardReview: false,
      boardStatus: (rawMembership.boardStatus || "not-eligible") as any,
    },
  });

  const journeyProgress = selectorGetJourneyProgress({
    ...INITIAL_PLAYER_STATE,
    completedLessons,
  });

  return {
    version: 1,
    curriculumVersion: 2,
    name,
    role,
    explorerId,
    avatar,
    explorerCustomization,
    unlockedCosmetics,
    projectPatches,
    companion,
    companionRelationship,
    interests,
    primaryGoal,
    xp: rawXp,
    level,
    xpToNextLevel,
    rank,
    streak: Math.max(1, Number(savedData.streak) || 1),
    badges,
    onboardingComplete,
    onboardingStep,
    currentWorld,
    currentLocationId,
    currentChapterId,
    currentChapterLabel,
    completedWorlds,
    completedLessons,
    journeyProgress,
    membershipStatus: onboardingComplete ? "EXPLORER" : "PROSPECT",
    missions,
    membership: {
      meetingsAttended,
      meetingsVerified,
      projectsParticipated,
      projectsVerified,
      knowledgeRequirementCompleted: readiness.knowledgeComplete,
      eligibleForBoardReview: readiness.eligibleForBoardReview,
      boardStatus: readiness.boardStatus as any,
    },
  };
}

interface PlayerContextType {
  player: PlayerState;
  isHydrated: boolean;
  setName: (name: string) => void;
  setExplorerId: (id: ExplorerId) => void;
  updateAvatar: (avatar: Partial<AvatarConfig>) => void;
  updateExplorerCustomization: (customization: Partial<ExplorerCustomizationState>) => void;
  unlockCosmetic: (cosmeticId: string) => void;
  addProjectPatch: (patchId: string) => void;
  setCompanion: (companion: CompanionId) => void;
  setInterests: (interests: string[]) => void;
  setPrimaryGoal: (goal: string) => void;
  addXp: (amount: number, reason?: string) => void;
  unlockBadge: (badge: Badge) => void;
  setOnboardingStep: (step: OnboardingStep) => void;
  completeOnboarding: () => void;
  resetJourney: () => void;
  completeLesson: (
    lessonId: string,
    chapterId: string,
    xpReward: number
  ) => { chapterCompleted: boolean; badgeUnlocked?: Badge; alreadyCompleted?: boolean };
  enrollMission: (missionId: string) => void;
  verifyMission: (missionId: string, officerName?: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isChapterUnlocked: (chapterId: string) => boolean;
  isChapterCompleted: (chapterId: string) => boolean;
  getChapterProgress: (chapterId: string) => {
    completedCount: number;
    totalCount: number;
    percentage: number;
    isCompleted: boolean;
    isUnlocked: boolean;
  };
  getChapterCTA: (chapterId: string) => {
    text: "LOCKED" | "BEGIN CHAPTER" | "CONTINUE JOURNEY" | "REVISIT CHAPTER";
    variant: "blue" | "outline" | "disabled";
    isLocked: boolean;
    href: string;
  };
  journeyProgress: number;
  membershipReadiness: ReturnType<typeof selectorGetMembershipReadiness>;
  nextRecommendedAction: ReturnType<typeof selectorGetNextRecommendedAction>;
}

const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<PlayerState>(INITIAL_PLAYER_STATE);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount with automated safe migration
  useEffect(() => {
    try {
      let stored = localStorage.getItem(STORAGE_KEY);
      // Fallback: check legacy storage key if v1 is not present
      if (!stored) {
        stored = localStorage.getItem(LEGACY_STORAGE_KEY);
      }

      if (stored) {
        const parsed = JSON.parse(stored);
        const migrated = migrateProgress(parsed);
        setPlayer(migrated);
      }
    } catch (e) {
      console.warn("Failed to load/migrate player state from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save to localStorage whenever player changes and hydrated
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
    } catch (e) {
      console.warn("Failed to save player state to localStorage", e);
    }
  }, [player, isHydrated]);

  const setName = (name: string) => {
    setPlayer((prev) => ({ ...prev, name: name.trim() || "TRAVELLER" }));
  };

  const setExplorerId = (explorerId: ExplorerId) => {
    setPlayer((prev) => ({ ...prev, explorerId }));
  };

  const updateAvatar = (avatarUpdates: Partial<AvatarConfig>) => {
    setPlayer((prev) => ({
      ...prev,
      avatar: { ...prev.avatar, ...avatarUpdates },
    }));
  };

  const updateExplorerCustomization = (
    customizationUpdates: Partial<ExplorerCustomizationState>
  ) => {
    setPlayer((prev) => ({
      ...prev,
      explorerCustomization: {
        ...prev.explorerCustomization,
        ...customizationUpdates,
      },
    }));
  };

  const unlockCosmetic = (cosmeticId: string) => {
    setPlayer((prev) => {
      if (prev.unlockedCosmetics?.includes(cosmeticId)) return prev;
      return {
        ...prev,
        unlockedCosmetics: [...(prev.unlockedCosmetics || []), cosmeticId],
      };
    });
  };

  const addProjectPatch = (patchId: string) => {
    setPlayer((prev) => {
      if (prev.projectPatches?.includes(patchId)) return prev;
      return {
        ...prev,
        projectPatches: [...(prev.projectPatches || []), patchId],
      };
    });
  };

  const setCompanion = (companion: CompanionId) => {
    const compInfo = COMPANIONS[companion] || COMPANIONS.nova;
    setPlayer((prev) => ({
      ...prev,
      companion,
      companionRelationship: {
        id: companion,
        name: compInfo.name,
        archetype: compInfo.archetype,
        relationshipXP:
          prev.companionRelationship?.id === companion
            ? prev.companionRelationship.relationshipXP
            : 0,
        relationshipLevel:
          prev.companionRelationship?.id === companion
            ? prev.companionRelationship.relationshipLevel
            : 1,
        trustLevel:
          prev.companionRelationship?.id === companion
            ? prev.companionRelationship.trustLevel
            : "New Companion",
      },
    }));
  };

  const setInterests = (interests: string[]) => {
    setPlayer((prev) => ({ ...prev, interests }));
  };

  const setPrimaryGoal = (primaryGoal: string) => {
    setPlayer((prev) => ({ ...prev, primaryGoal }));
  };

  const addXp = (amount: number) => {
    setPlayer((prev) => {
      const newXp = prev.xp + amount;
      const { level, rank, xpToNextLevel } = getLevelFromXP(newXp);
      return {
        ...prev,
        xp: newXp,
        level,
        rank,
        xpToNextLevel,
      };
    });
  };

  const unlockBadge = (badge: Badge) => {
    setPlayer((prev) => {
      if (prev.badges.some((b) => b.id === badge.id)) {
        return prev;
      }
      return {
        ...prev,
        badges: [...prev.badges, badge],
      };
    });
  };

  const setOnboardingStep = (onboardingStep: OnboardingStep) => {
    setPlayer((prev) => ({ ...prev, onboardingStep }));
  };

  /**
   * Completes onboarding WITHOUT completing The Gateway chapter.
   * Gateway becomes the active first chapter with 0/2 lessons completed.
   */
  const completeOnboarding = () => {
    setPlayer((prev) => {
      return {
        ...prev,
        onboardingComplete: true,
        onboardingStep: "completed",
        currentWorld: "The Gateway",
        currentLocationId: "loc-gateway",
        currentChapterId: "loc-gateway",
        currentChapterLabel: "PROLOGUE",
        membershipStatus: "EXPLORER",
      };
    });
  };

  /**
   * Resets all prospect progress and purges localStorage.
   */
  const resetJourney = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear player storage", e);
    }
    setPlayer(INITIAL_PLAYER_STATE);
  };

  /**
   * Idempotently completes a lesson, awards XP once, updates level, checks chapter completion,
   * unlocks chapter badge and milestone cosmetics, and advances next chapter when appropriate.
   */
  const completeLesson = (
    lessonId: string,
    chapterId: string,
    xpReward: number
  ): { chapterCompleted: boolean; badgeUnlocked?: Badge; alreadyCompleted?: boolean } => {
    let isNewlyCompletedChapter = false;
    let newBadge: Badge | undefined = undefined;
    let isAlreadyDone = false;

    setPlayer((prev) => {
      // 1. Check idempotency
      if (prev.completedLessons?.includes(lessonId)) {
        isAlreadyDone = true;
        return prev;
      }

      const updatedLessons = [...(prev.completedLessons || []), lessonId];
      let runningXp = prev.xp + xpReward;

      const chapter = CHAPTERS_DATA[chapterId];
      let updatedWorlds = prev.completedWorlds || [];
      let updatedBadges = prev.badges || [];
      let updatedCosmetics = prev.unlockedCosmetics || [];
      let nextWorld = prev.currentWorld;
      let nextChapterId = prev.currentChapterId;
      let nextLocationId = prev.currentLocationId;
      let nextChapterLabel = prev.currentChapterLabel;

      if (chapter) {
        const allLessonsFinished = chapter.lessons.every((l) =>
          updatedLessons.includes(l.id)
        );
        const alreadyInCompletedWorlds = updatedWorlds.includes(chapterId);

        if (allLessonsFinished && !alreadyInCompletedWorlds) {
          isNewlyCompletedChapter = true;
          updatedWorlds = Array.from(new Set([...updatedWorlds, chapterId]));

          // Award chapter badge from canonical registry
          const badgeDef = CANONICAL_BADGES_BY_CHAPTER[chapterId];
          if (badgeDef && !updatedBadges.some((b) => b.id === badgeDef.id)) {
            newBadge = {
              id: badgeDef.id,
              title: badgeDef.title,
              description: badgeDef.description,
              imageUrl: badgeDef.imageUrl,
              unlockedAt: "Just now",
              rarity: badgeDef.rarity,
              xpAwarded: badgeDef.xpAwarded,
            };
            updatedBadges = [...updatedBadges, newBadge];
            runningXp += badgeDef.xpAwarded;
          }

          // Advance active chapter position to next chapter in canonical sequence
          const currIdx = CANONICAL_CHAPTER_IDS.indexOf(chapterId as CanonicalChapterId);
          if (currIdx >= 0 && currIdx < CANONICAL_CHAPTER_IDS.length - 1) {
            const nextChapId = CANONICAL_CHAPTER_IDS[currIdx + 1];
            const nextChapDetails = CHAPTERS_DATA[nextChapId];
            if (nextChapDetails) {
              nextWorld = nextChapDetails.worldName;
              nextChapterId = nextChapId;
              nextLocationId = nextChapId;
              nextChapterLabel = nextChapDetails.chapterLabel;
            }
          }

          // Check and unlock milestone cosmetics linked to chapter completion
          for (const item of COSMETIC_ITEMS) {
            if (
              item.unlockRequirement.type === "world_complete" &&
              item.unlockRequirement.targetId === chapterId &&
              !updatedCosmetics.includes(item.id)
            ) {
              updatedCosmetics = [...updatedCosmetics, item.id];
            }
          }
        }
      }

      // Check and unlock milestone cosmetics linked to lesson completion
      for (const item of COSMETIC_ITEMS) {
        if (
          item.unlockRequirement.type === "lesson_complete" &&
          item.unlockRequirement.targetId === lessonId &&
          !updatedCosmetics.includes(item.id)
        ) {
          updatedCosmetics = [...updatedCosmetics, item.id];
        }
      }

      const { level, rank, xpToNextLevel } = getLevelFromXP(runningXp);
      const calculatedProgress = selectorGetJourneyProgress({
        ...prev,
        completedLessons: updatedLessons,
      });

      const knowledgeRequirementCompleted =
        updatedWorlds.includes("loc-gateway") &&
        updatedWorlds.includes("loc-rotary-roots") &&
        updatedWorlds.includes("loc-rotaract-harbor") &&
        updatedWorlds.includes("loc-regent-keep") &&
        updatedWorlds.includes("loc-seven-realms");

      return {
        ...prev,
        xp: runningXp,
        level,
        rank,
        xpToNextLevel,
        completedLessons: updatedLessons,
        completedWorlds: updatedWorlds,
        badges: updatedBadges,
        unlockedCosmetics: updatedCosmetics,
        currentWorld: nextWorld,
        currentLocationId: nextLocationId,
        currentChapterId: nextChapterId,
        currentChapterLabel: nextChapterLabel,
        journeyProgress: calculatedProgress,
        membership: {
          ...prev.membership,
          knowledgeRequirementCompleted,
          eligibleForBoardReview:
            knowledgeRequirementCompleted &&
            (prev.membership?.meetingsVerified || 0) >= 2 &&
            (prev.membership?.projectsVerified || 0) >= 2,
        },
      };
    });

    return {
      chapterCompleted: isNewlyCompletedChapter,
      badgeUnlocked: newBadge,
      alreadyCompleted: isAlreadyDone,
    };
  };

  /**
   * Enrolls in a mission without awarding XP or faking verification.
   */
  const enrollMission = (missionId: string) => {
    setPlayer((prev) => {
      const currentEnrolled = prev.missions?.enrolled || [];
      if (currentEnrolled.includes(missionId)) return prev;
      return {
        ...prev,
        missions: {
          ...prev.missions,
          enrolled: [...currentEnrolled, missionId],
        },
      };
    });
  };

  /**
   * Verifies a mission attendance/participation (intended for Officer / Dev testing).
   * Awards XP once and increments verified meetings or projects count.
   */
  const verifyMission = (missionId: string, officerName?: string) => {
    setPlayer((prev) => {
      const currentVerified = prev.missions?.verified || [];
      if (currentVerified.includes(missionId)) return prev;

      const missionDef = CANONICAL_MISSIONS_MAP[missionId];
      const xpReward = missionDef?.rewardXp || 100;
      const newXp = prev.xp + xpReward;
      const { level, rank, xpToNextLevel } = getLevelFromXP(newXp);

      const isMeeting = missionDef?.type === "General Meeting" || missionDef?.type === "Club Service";
      const meetingsVerified = isMeeting
        ? (prev.membership?.meetingsVerified || 0) + 1
        : prev.membership?.meetingsVerified || 0;
      const projectsVerified = !isMeeting
        ? (prev.membership?.projectsVerified || 0) + 1
        : prev.membership?.projectsVerified || 0;

      const knowledgeRequirementCompleted = prev.membership?.knowledgeRequirementCompleted || false;
      const eligibleForBoardReview =
        knowledgeRequirementCompleted && meetingsVerified >= 2 && projectsVerified >= 2;

      // Check if real-world badges unlock
      let updatedBadges = prev.badges || [];
      if (isMeeting) {
        const fellowshipBadge = CANONICAL_BADGE_MAP["badge-first-fellowship"];
        if (fellowshipBadge && !updatedBadges.some((b) => b.id === fellowshipBadge.id)) {
          updatedBadges = [
            ...updatedBadges,
            {
              id: fellowshipBadge.id,
              title: fellowshipBadge.title,
              description: fellowshipBadge.description,
              imageUrl: fellowshipBadge.imageUrl,
              unlockedAt: `Verified by ${officerName || "Officer"}`,
              rarity: fellowshipBadge.rarity,
              xpAwarded: fellowshipBadge.xpAwarded,
            },
          ];
        }
      } else {
        const communityBadge = CANONICAL_BADGE_MAP["badge-community-hero"];
        if (communityBadge && !updatedBadges.some((b) => b.id === communityBadge.id)) {
          updatedBadges = [
            ...updatedBadges,
            {
              id: communityBadge.id,
              title: communityBadge.title,
              description: communityBadge.description,
              imageUrl: communityBadge.imageUrl,
              unlockedAt: `Verified by ${officerName || "Officer"}`,
              rarity: communityBadge.rarity,
              xpAwarded: communityBadge.xpAwarded,
            },
          ];
        }
      }

      return {
        ...prev,
        xp: newXp,
        level,
        rank,
        xpToNextLevel,
        badges: updatedBadges,
        missions: {
          ...prev.missions,
          verified: [...currentVerified, missionId],
        },
        membership: {
          ...prev.membership,
          meetingsVerified,
          projectsVerified,
          eligibleForBoardReview,
        },
      };
    });
  };

  // Pure derived state selectors bound to current player
  const isLessonCompleted = (lessonId: string) => selectorIsLessonCompleted(player, lessonId);
  const isChapterUnlocked = (chapterId: string) => selectorIsChapterUnlocked(player, chapterId);
  const isChapterCompleted = (chapterId: string) => selectorIsChapterCompleted(player, chapterId);
  const getChapterProgress = (chapterId: string) => selectorGetChapterProgress(player, chapterId);
  const getChapterCTA = (chapterId: string) => selectorGetChapterCTA(player, chapterId);
  const journeyProgress = selectorGetJourneyProgress(player);
  const membershipReadiness = selectorGetMembershipReadiness(player);
  const nextRecommendedAction = selectorGetNextRecommendedAction(player);

  return (
    <PlayerContext.Provider
      value={{
        player,
        isHydrated,
        setName,
        setExplorerId,
        updateAvatar,
        updateExplorerCustomization,
        unlockCosmetic,
        addProjectPatch,
        setCompanion,
        setInterests,
        setPrimaryGoal,
        addXp,
        unlockBadge,
        setOnboardingStep,
        completeOnboarding,
        resetJourney,
        completeLesson,
        enrollMission,
        verifyMission,
        isLessonCompleted,
        isChapterUnlocked,
        isChapterCompleted,
        getChapterProgress,
        getChapterCTA,
        journeyProgress,
        membershipReadiness,
        nextRecommendedAction,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error("usePlayer must be used within a PlayerProvider");
  }
  return context;
}
