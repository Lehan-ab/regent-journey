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
  currentJourney: string;
  nextLesson: string;
  avatarUrl: string;
  companionUrl: string;
}

export interface Mission {
  id: string;
  title: string;
  tagline: string;
  type: "Meeting" | "Community Service" | "Club Service" | "Professional Dev";
  rewardXp: number;
  status: "UPCOMING" | "AVAILABLE SOON" | "COMPLETED";
  date: string;
  badge?: string;
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
  currentJourney: "Rotary Roots",
  nextLesson: "Service Above Self",
  avatarUrl: "/images/lehan_avatar.jpg",
  companionUrl: "/images/nova_companion.jpg",
};

export const mockMissions: Mission[] = [
  {
    id: "mission-1",
    title: "GENERAL MEETING",
    tagline: "Meet the Regents and discover active club initiatives.",
    type: "Meeting",
    rewardXp: 150,
    status: "UPCOMING",
    date: "1st Sunday • 5:00 PM",
    badge: "Official",
  },
  {
    id: "mission-2",
    title: "COMMUNITY PROJECT",
    tagline: "Step into your first real project & make an on-ground impact.",
    type: "Community Service",
    rewardXp: 250,
    status: "AVAILABLE SOON",
    date: "Next Weekend",
    badge: "Impact",
  },
  {
    id: "mission-3",
    title: "FELLOWSHIP GATHERING",
    tagline: "Forge lifelong bonds with fellow prospect explorers.",
    type: "Club Service",
    rewardXp: 100,
    status: "UPCOMING",
    date: "Monthly Meet",
    badge: "Fellowship",
  },
];

export const exploreFeatures: ExploreFeature[] = [
  {
    id: "rota101",
    title: "ROTA 101",
    description: "Learn the essentials of Rotary, Rotaract, and life inside the club.",
    iconType: "book",
    href: "/rota101",
    tag: "Essential Guide",
  },
  {
    id: "ask-nova",
    title: "ASK NOVA",
    description: "Your companion can guide you through Regent Journey and help explain what comes next.",
    iconType: "nova",
    href: "#",
    isActionModal: true,
    tag: "AI Companion",
  },
  {
    id: "avenue-realms",
    title: "AVENUE REALMS",
    description: "Discover where your interests and skills can create the greatest impact.",
    iconType: "map",
    href: "/journey",
    tag: "5 Avenues",
  },
  {
    id: "project-forge",
    title: "PROJECT FORGE",
    description: "Discover how a Rotaract idea becomes a real community project.",
    iconType: "forge",
    href: "/missions",
    tag: "Creation Lab",
  },
  {
    id: "badge-collection",
    title: "BADGE COLLECTION",
    description: "View the achievements you've unlocked throughout your Regent Journey.",
    iconType: "badge",
    href: "/achievements",
    tag: "Vault",
  },
];

export const mockRecentAchievement: Achievement = {
  id: "ach-root-seeker",
  title: "ROOT SEEKER",
  description: "You discovered the roots behind the movement.",
  rewardXp: 150,
  imageUrl: "/images/root_seeker_badge.jpg",
  unlockedAt: "Recent",
  rarity: "RARE",
};
