export interface UserProfile {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  rank: string;
  badges: number;
  streak: number;
  companion: string;
  companionTitle: string;
  journeyProgress: number;
  currentChapterLabel: string;
  currentJourney: string;
  currentWorld: string;
  nextLesson: string;
  avatarUrl: string;
  companionUrl: string;
}

export interface Mission {
  id: string;
  title: string;
  tagline: string;
  type: "General Meeting" | "Community Service" | "Club Service" | "Professional Dev";
  rewardXp: number;
  status: "UPCOMING" | "AVAILABLE SOON" | "COMPLETED";
  date: string;
  badge?: string;
  location?: string;
}

export interface ExploreFeature {
  id: string;
  title: string;
  description: string;
  iconType: "book" | "nova" | "map" | "forge" | "badge";
  href: string;
  isActionModal?: boolean;
  tag?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  rewardXp: number;
  imageUrl: string;
  unlockedAt: string;
  rarity: "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
}

export const mockUser: UserProfile = {
  name: "Lehan",
  level: 2,
  xp: 105,
  xpToNextLevel: 200,
  rank: "Explorer",
  badges: 1,
  streak: 1,
  companion: "Nova",
  companionTitle: "Mystic Guide",
  journeyProgress: 35,
  currentChapterLabel: "CHAPTER 1",
  currentJourney: "Rotary Roots",
  currentWorld: "Rotary Roots",
  nextLesson: "Service Above Self",
  avatarUrl: "/images/lehan_avatar.jpg",
  companionUrl: "/assets/pixel/characters/companions/nova/portrait.jpg",
};

export const mockMissions: Mission[] = [
  {
    id: "mission-1",
    title: "GENERAL MEETING: MEET THE REGENTS",
    tagline: "Attend the official club assembly and meet the board of directors.",
    type: "General Meeting",
    rewardXp: 150,
    status: "UPCOMING",
    date: "1st Sunday • 5:00 PM",
    badge: "Official",
    location: "Seethawaka / Hybrid",
  },
  {
    id: "mission-2",
    title: "COMMUNITY SERVICE EXPEDITION",
    tagline: "Step into your first real project and create sustainable on-ground impact.",
    type: "Community Service",
    rewardXp: 250,
    status: "AVAILABLE SOON",
    date: "Next Weekend",
    badge: "Impact",
    location: "Seethawaka Community Center",
  },
  {
    id: "mission-3",
    title: "REGENT FELLOWSHIP GATHERING",
    tagline: "Forge lifelong bonds with fellow prospect explorers and members.",
    type: "Club Service",
    rewardXp: 100,
    status: "UPCOMING",
    date: "Monthly Meet",
    badge: "Fellowship",
    location: "Avissawella",
  },
];

export const exploreFeatures: ExploreFeature[] = [
  {
    id: "rota101",
    title: "ROTA 101",
    description: "Learn the essentials of Rotary, Rotaract, and life inside Seethawaka Regent.",
    iconType: "book",
    href: "/rota101",
    tag: "Handbook",
  },
  {
    id: "ask-nova",
    title: "ASK NOVA",
    description: "Your companion can guide you through Regent Journey and explain what comes next.",
    iconType: "nova",
    href: "#",
    isActionModal: true,
    tag: "AI Companion",
  },
  {
    id: "avenue-realms",
    title: "THE SEVEN REALMS",
    description: "Discover where your skills create the greatest impact across the 7 avenues.",
    iconType: "map",
    href: "/journey",
    tag: "7 Avenues",
  },
  {
    id: "project-forge",
    title: "PROJECT FORGE",
    description: "Discover how a community idea is planned, budgeted, and executed.",
    iconType: "forge",
    href: "/journey",
    tag: "Chapter 5",
  },
  {
    id: "badge-collection",
    title: "BADGE VAULT",
    description: "View the achievements you've unlocked throughout your Regent Journey.",
    iconType: "badge",
    href: "/achievements",
    tag: "Achievements",
  },
];

export const mockRecentAchievement: Achievement = {
  id: "ach-root-seeker",
  title: "ROOT SEEKER",
  description: "Discovered the roots and core values behind the global Rotary movement.",
  rewardXp: 150,
  imageUrl: "/images/root_seeker_badge.jpg",
  unlockedAt: "Recent",
  rarity: "RARE",
};
