export type BadgeRarity = "COMMON" | "RARE" | "EPIC" | "LEGENDARY";
export type BadgeCategory = "JOURNEY" | "KNOWLEDGE" | "REAL_WORLD";

export interface BadgeDefinition {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  rarity: BadgeRarity;
  xpAwarded: number;
  category: BadgeCategory;
  unlockCondition: string;
  chapterId?: string;
}

export const CANONICAL_BADGES: BadgeDefinition[] = [
  // 1. Prologue / Gateway
  {
    id: "badge-first-step",
    title: "INITIATE",
    description: "Every Regent starts somewhere. Passed through The Gateway into Seethawaka.",
    imageUrl: "/images/root_seeker_badge.jpg",
    rarity: "COMMON",
    xpAwarded: 50,
    category: "JOURNEY",
    unlockCondition: "Complete Chapter 0: The Gateway",
    chapterId: "loc-gateway",
  },
  // 2. Chapter 1: Rotary Roots
  {
    id: "badge-root-seeker",
    title: "ROOT SEEKER",
    description: "Mastered the origins of Rotary in 1905, the Four-Way Test, Service Above Self, and District 3220 governance.",
    imageUrl: "/images/root_seeker_badge.jpg",
    rarity: "RARE",
    xpAwarded: 150,
    category: "JOURNEY",
    unlockCondition: "Complete Chapter 1: Rotary Roots",
    chapterId: "loc-rotary-roots",
  },
  // 3. Chapter 2: Rotaract Harbor
  {
    id: "badge-voyager",
    title: "VOYAGER",
    description: "Discovered the 1968 birth of Rotaract, Elevate Rotaract, and the District 3220 network.",
    imageUrl: "/images/chapter3_realms.jpg",
    rarity: "RARE",
    xpAwarded: 150,
    category: "JOURNEY",
    unlockCondition: "Complete Chapter 2: Rotaract Harbor",
    chapterId: "loc-rotaract-harbor",
  },
  // 4. Chapter 3: The Regent Odyssey
  {
    id: "badge-regent-pioneer",
    title: "REGENT PIONEER",
    description: "Explored RACSR's self-sponsored charter, 2026-27 Board of Officials, culture, and signature initiatives.",
    imageUrl: "/images/chapter2_odyssey.jpg",
    rarity: "EPIC",
    xpAwarded: 200,
    category: "JOURNEY",
    unlockCondition: "Complete Chapter 3: The Regent Odyssey",
    chapterId: "loc-regent-keep",
  },
  // 5. Chapter 4: The Seven Realms of Service
  {
    id: "badge-avenue-master",
    title: "AVENUE MASTER",
    description: "Mastered all 7 Avenues of Service and passed the Avenue Project Matching Challenge.",
    imageUrl: "/images/chapter3_realms.jpg",
    rarity: "EPIC",
    xpAwarded: 350,
    category: "JOURNEY",
    unlockCondition: "Complete Chapter 4: The Seven Realms of Service",
    chapterId: "loc-seven-realms",
  },
  // 6. Chapter 5: Project Forge
  {
    id: "badge-master-builder",
    title: "MASTER BUILDER",
    description: "Mastered project lifecycles, committee coordination, and sustainable execution in the Project Forge.",
    imageUrl: "/images/chapter4_forge.jpg",
    rarity: "EPIC",
    xpAwarded: 250,
    category: "JOURNEY",
    unlockCondition: "Complete Chapter 5: Project Forge",
    chapterId: "loc-project-forge",
  },
  // 7. Chapter 6: The Regent Code
  {
    id: "badge-code-bearer",
    title: "CODE BEARER",
    description: "Mastered the Regent Code, parliamentary procedure, and ethical standards in Codewood.",
    imageUrl: "/images/rotary_roots.jpg",
    rarity: "RARE",
    xpAwarded: 200,
    category: "JOURNEY",
    unlockCondition: "Complete Chapter 6: The Regent Code",
    chapterId: "loc-codewood",
  },
  // 8. Chapter 7: Grand Archive
  {
    id: "badge-scholar",
    title: "SCHOLAR",
    description: "Decoded ROTA 101, club constitutions, bylaws, and district citations in the Grand Archive.",
    imageUrl: "/images/chapter2_odyssey.jpg",
    rarity: "RARE",
    xpAwarded: 200,
    category: "JOURNEY",
    unlockCondition: "Complete Chapter 7: Grand Archive",
    chapterId: "loc-grand-archive",
  },
  // 9. Chapter 8: Impact Frontier
  {
    id: "badge-trailblazer",
    title: "TRAILBLAZER",
    description: "Participated in physical community initiatives and dynamic outreach on the Impact Frontier.",
    imageUrl: "/images/mission_community.jpg",
    rarity: "EPIC",
    xpAwarded: 350,
    category: "JOURNEY",
    unlockCondition: "Complete Chapter 8: Impact Frontier",
    chapterId: "loc-impact-frontier",
  },
  // 10. Chapter 9: Membership Citadel
  {
    id: "badge-inducted-regent",
    title: "INDUCTED REGENT",
    description: "Reached the high summit, took the Regent Oath, and completed the full induction pathway.",
    imageUrl: "/images/realm_of_regent_hero.jpg",
    rarity: "LEGENDARY",
    xpAwarded: 500,
    category: "JOURNEY",
    unlockCondition: "Complete Chapter 9: Membership Citadel & Induction",
    chapterId: "loc-membership-citadel",
  },
  // 11. Four-Way Champion (Knowledge milestone)
  {
    id: "badge-four-way-champion",
    title: "FOUR-WAY CHAMPION",
    description: "Mastered the Four-Way Test in personal and professional ethics across Rotary and Regent chronicles.",
    imageUrl: "/images/rotary_roots.jpg",
    rarity: "EPIC",
    xpAwarded: 200,
    category: "KNOWLEDGE",
    unlockCondition: "Demonstrate ethical mastery in the Four-Way Test knowledge trial",
  },
  // 12. First Fellowship (Real-World Attendance milestone)
  {
    id: "badge-first-fellowship",
    title: "FIRST FELLOWSHIP",
    description: "Attended your first official Rotaract Seethawaka Regent general assembly or fellowship meet.",
    imageUrl: "/images/mission_meeting.jpg",
    rarity: "COMMON",
    xpAwarded: 100,
    category: "REAL_WORLD",
    unlockCondition: "Attend and receive verified attendance at an official General Meeting",
  },
  // 13. Hands On Deck (Real-World Project milestone)
  {
    id: "badge-community-hero",
    title: "HANDS ON DECK",
    description: "Contributed hands-on dedication to a verified community impact initiative with Seethawaka Regent.",
    imageUrl: "/images/mission_community.jpg",
    rarity: "LEGENDARY",
    xpAwarded: 300,
    category: "REAL_WORLD",
    unlockCondition: "Participate and receive verified officer sign-off on a community service project",
  },
];

export const CANONICAL_BADGES_BY_CHAPTER: Record<string, BadgeDefinition> = {
  "loc-gateway": CANONICAL_BADGES[0],
  "loc-rotary-roots": CANONICAL_BADGES[1],
  "loc-rotaract-harbor": CANONICAL_BADGES[2],
  "loc-regent-keep": CANONICAL_BADGES[3],
  "loc-seven-realms": CANONICAL_BADGES[4],
  "loc-project-forge": CANONICAL_BADGES[5],
  "loc-codewood": CANONICAL_BADGES[6],
  "loc-grand-archive": CANONICAL_BADGES[7],
  "loc-impact-frontier": CANONICAL_BADGES[8],
  "loc-membership-citadel": CANONICAL_BADGES[9],
};

export const CANONICAL_BADGE_MAP: Record<string, BadgeDefinition> = Object.fromEntries(
  CANONICAL_BADGES.map((b) => [b.id, b])
);
