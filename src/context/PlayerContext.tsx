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
} from "@/types/player";
import { DEFAULT_AVATAR } from "@/data/avatarOptions";
import { DEFAULT_EXPLORER_CUSTOMIZATION } from "@/data/customizationsData";
import { COMPANIONS } from "@/data/companionsData";

const STORAGE_KEY = "regent_journey_player_v2";

const INITIAL_PLAYER_STATE: PlayerState = {
  name: "Traveller",
  explorerId: "pathfinder",
  avatar: DEFAULT_AVATAR,
  explorerCustomization: DEFAULT_EXPLORER_CUSTOMIZATION,
  unlockedCosmetics: ["base_explorer", "explorer_satchel", "notebook_accessory", "lantern_accessory"],
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
  currentChapterLabel: "PROLOGUE",
  completedWorlds: [],
  completedLessons: [],
  journeyProgress: 0,
  membershipStatus: "PROSPECT",
};

export const FIRST_STEP_BADGE: Badge = {
  id: "badge-first-step",
  title: "FIRST STEP",
  description: "Every Regent starts somewhere. Passed through The Gateway into Seethawaka.",
  imageUrl: "/images/root_seeker_badge.jpg",
  unlockedAt: "Just now",
  rarity: "COMMON",
  xpAwarded: 50,
};

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
}

const PlayerContext = createContext<PlayerContextType | null>(null);

function calculateLevelAndRank(xp: number) {
  let level = 1;
  let rank = "Prospect";
  let xpToNextLevel = 100;

  if (xp >= 500) {
    level = 4;
    rank = "Senior Regent";
    xpToNextLevel = 800;
  } else if (xp >= 250) {
    level = 3;
    rank = "Pathfinder";
    xpToNextLevel = 500;
  } else if (xp >= 100) {
    level = 2;
    rank = "Explorer";
    xpToNextLevel = 250;
  } else {
    level = 1;
    rank = "Prospect";
    xpToNextLevel = 100;
  }

  return { level, rank, xpToNextLevel };
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<PlayerState>(INITIAL_PLAYER_STATE);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PlayerState;
        // Merge with initial state to ensure any new keys exist
        setPlayer((prev) => ({
          ...INITIAL_PLAYER_STATE,
          ...parsed,
          explorerId: parsed.explorerId || "pathfinder",
          avatar: { ...INITIAL_PLAYER_STATE.avatar, ...(parsed.avatar || {}) },
          explorerCustomization: {
            ...INITIAL_PLAYER_STATE.explorerCustomization,
            ...(parsed.explorerCustomization || {}),
          },
          unlockedCosmetics: Array.from(
            new Set([
              ...(INITIAL_PLAYER_STATE.unlockedCosmetics || []),
              ...(parsed.unlockedCosmetics || []),
            ])
          ),
          projectPatches: Array.from(
            new Set([
              ...(INITIAL_PLAYER_STATE.projectPatches || []),
              ...(parsed.projectPatches || []),
            ])
          ),
        }));
      }
    } catch (e) {
      console.warn("Failed to load player state from localStorage", e);
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
    setPlayer((prev) => ({ ...prev, name: name.trim() || "Traveller" }));
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
        relationshipXP: prev.companionRelationship?.id === companion ? prev.companionRelationship.relationshipXP : 0,
        relationshipLevel: prev.companionRelationship?.id === companion ? prev.companionRelationship.relationshipLevel : 1,
        trustLevel: prev.companionRelationship?.id === companion ? prev.companionRelationship.trustLevel : "New Companion",
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
      const { level, rank, xpToNextLevel } = calculateLevelAndRank(newXp);
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

  const completeOnboarding = () => {
    setPlayer((prev) => {
      const hasFirstStepBadge = prev.badges.some((b) => b.id === FIRST_STEP_BADGE.id);
      const updatedBadges = hasFirstStepBadge
        ? prev.badges
        : [...prev.badges, FIRST_STEP_BADGE];

      const newXp = hasFirstStepBadge ? prev.xp : prev.xp + (FIRST_STEP_BADGE.xpAwarded || 50);
      const { level, rank, xpToNextLevel } = calculateLevelAndRank(newXp);

      return {
        ...prev,
        xp: newXp,
        level,
        rank,
        xpToNextLevel,
        badges: updatedBadges,
        onboardingComplete: true,
        onboardingStep: "completed",
        currentWorld: "Rotary Roots",
        currentChapterLabel: "CHAPTER 1",
        completedWorlds: Array.from(new Set([...prev.completedWorlds, "The Gateway"])),
        journeyProgress: Math.max(prev.journeyProgress, 10),
        membershipStatus: "EXPLORER",
      };
    });
  };

  const resetJourney = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to clear player storage", e);
    }
    setPlayer(INITIAL_PLAYER_STATE);
  };

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
