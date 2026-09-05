export type SkinToneId =
  | "fair"
  | "warm-ivory"
  | "golden-olive"
  | "honey-tan"
  | "deep-bronze"
  | "rich-espresso";

export type HairStyleId =
  | "short"
  | "medium"
  | "long"
  | "curly"
  | "tied"
  | "fade"
  | "textured"
  | "slick";

export type HairColorId =
  | "black"
  | "dark-brown"
  | "chestnut"
  | "light-brown"
  | "blonde"
  | "auburn"
  | "slate"
  | "burgundy";

export type OutfitId =
  | "traveller"
  | "scholar"
  | "pathfinder"
  | "creator"
  | "builder"
  | "adventurer";

export type AccessoryId =
  | "none"
  | "compass"
  | "goggles"
  | "notebook"
  | "book"
  | "map"
  | "lantern"
  | "satchel"
  | "scroll";

export interface AvatarConfig {
  skinTone: SkinToneId;
  hairStyle: HairStyleId;
  hairColor: HairColorId;
  outfit: OutfitId;
  accessory: AccessoryId;
}

export type CompanionId = "raya" | "nova" | "kai";

export type CompanionEmotion =
  | "idle"
  | "happy"
  | "thinking"
  | "surprised"
  | "celebrate"
  | "proud";

export interface CompanionRelationship {
  id: CompanionId;
  name: string;
  archetype: string;
  relationshipXP: number;
  relationshipLevel: number;
  trustLevel: string;
}

export interface CompanionInfo {
  id: CompanionId;
  name: string;
  title: string;
  archetype: string;
  type: string;
  tagline: string;
  motto: string;
  personality: string[];
  keyTraits: string[];
  role: string;
  description: string;
  visualSummary: string;
  introDialogue: string[];
  personalizedGreetingTemplate: string;
  gatewayDialogue: {
    lines: string[];
    playerPrompts: string[];
    finalLines: string[];
  };
  homeGreetings: string[];
  themeColor: string;
  accentColor: string;
}

export interface InterestOption {
  id: string;
  title: string;
  description: string;
  category: string;
  iconName: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  unlockedAt: string;
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
  xpAwarded?: number;
  grandfathered?: boolean;
  curriculumVersion?: number;
}

export type OnboardingStep = "explorer" | "companion" | "interests" | "gateway" | "completed";

export type ExplorerId =
  | "pathfinder"
  | "scholar"
  | "creator"
  | "wayfarer"
  | "trailblazer"
  | "storyteller"
  | "strategist"
  | "builder";

export type CosmeticCategory =
  | "hairVariant"
  | "hairColor"
  | "outfit"
  | "cloak"
  | "accessory"
  | "patches"
  | "badgeDetail";

export interface CosmeticUnlockRequirement {
  type: "starter" | "world_complete" | "lesson_complete" | "projects_count" | "membership";
  targetId?: string;
  count?: number;
  description: string;
}

export interface CosmeticItem {
  id: string;
  name: string;
  category: CosmeticCategory;
  description: string;
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
  unlockRequirement: CosmeticUnlockRequirement;
  icon?: string;
  colorHex?: string;
  previewUrl?: string;
}

export interface ProjectPatch {
  id: string;
  projectId: string;
  title: string;
  avenue: string;
  iconName: string;
  accentColor: string;
  description: string;
  unlockedAt?: string;
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
}

export interface ExplorerCustomizationState {
  hairVariant: string;
  hairColor: string;
  outfit: string;
  accessory: string;
  cloak: string;
  patches: string[];
}

export interface PlayerMissionsState {
  enrolled: string[];
  completed: string[];
  verified: string[];
}

export interface PlayerMembershipState {
  meetingsAttended: number;
  meetingsVerified: number;
  projectsParticipated: number;
  projectsVerified: number;
  knowledgeRequirementCompleted: boolean;
  eligibleForBoardReview: boolean;
  boardStatus: "not-eligible" | "eligible" | "under-review" | "approved";
}

export interface PlayerState {
  version: number;
  curriculumVersion: number;
  name: string;
  role: "Prospect" | "Member";
  explorerId: ExplorerId;
  avatar: AvatarConfig;
  explorerCustomization: ExplorerCustomizationState;
  unlockedCosmetics: string[];
  projectPatches: string[];
  companion: CompanionId;
  companionRelationship?: CompanionRelationship;
  interests: string[];
  primaryGoal: string;
  xp: number;
  level: number;
  xpToNextLevel: number;
  rank: string;
  streak: number;
  badges: Badge[];
  onboardingComplete: boolean;
  onboardingStep: OnboardingStep;
  currentWorld: string;
  currentLocationId: string;
  currentChapterId: string;
  currentChapterLabel: string;
  completedWorlds: string[];
  completedLessons: string[];
  journeyProgress: number;
  membershipStatus: "PROSPECT" | "EXPLORER" | "OFFICIAL_MEMBER";
  missions: PlayerMissionsState;
  membership: PlayerMembershipState;
}

