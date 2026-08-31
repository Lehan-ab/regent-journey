import {
  CosmeticItem,
  ProjectPatch,
  ExplorerCustomizationState,
  ExplorerId,
} from "@/types/player";

export const DEFAULT_EXPLORER_CUSTOMIZATION: ExplorerCustomizationState = {
  hairVariant: "signature",
  hairColor: "natural",
  outfit: "base_explorer",
  accessory: "none",
  cloak: "none",
  patches: [],
};

// Approved Hair Color Palette (Curated & Art-Directed)
export interface ApprovedColorSwatch {
  id: string;
  name: string;
  hex: string;
  borderHex: string;
}

export const APPROVED_HAIR_COLORS: ApprovedColorSwatch[] = [
  { id: "natural", name: "Natural Heritage", hex: "#2C1B18", borderHex: "#4A2E2B" },
  { id: "midnight_black", name: "Midnight Onyx", hex: "#121217", borderHex: "#2E2E38" },
  { id: "warm_chestnut", name: "Warm Chestnut", hex: "#542D1C", borderHex: "#7E432A" },
  { id: "sunlit_amber", name: "Sunlit Amber", hex: "#C68A2C", borderHex: "#E5A943" },
  { id: "slate_silver", name: "Slate Silver", hex: "#707A8A", borderHex: "#94A3B8" },
  { id: "regent_crimson", name: "Regent Maroon", hex: "#6E1328", borderHex: "#9B1C38" },
];

// Progression Cosmetic Catalog
export const COSMETIC_ITEMS: CosmeticItem[] = [
  // 1. STARTER
  {
    id: "base_explorer",
    name: "Base Explorer Garb",
    category: "outfit",
    description: "The classic foundational adventurer outfit tailored for Seethawaka terrain.",
    rarity: "COMMON",
    unlockRequirement: {
      type: "starter",
      description: "Default starter attire upon joining Regent Journey.",
    },
    icon: "Shirt",
    colorHex: "#FFC719",
  },
  {
    id: "explorer_satchel",
    name: "Leather Expedition Satchel",
    category: "accessory",
    description: "Sturdy travel satchel for carrying scrolls, notes, and project documents.",
    rarity: "COMMON",
    unlockRequirement: {
      type: "starter",
      description: "Default explorer gear provided during Gateway induction.",
    },
    icon: "Briefcase",
    colorHex: "#D97706",
  },

  // 2. COMPLETE ROTARY ROOTS
  {
    id: "root_seeker_accessory",
    name: "Root Seeker Talisman",
    category: "accessory",
    description: "A brass token forged in the likeness of the rotary wheel, honoring historical foundations.",
    rarity: "RARE",
    unlockRequirement: {
      type: "world_complete",
      targetId: "Rotary Roots",
      description: "Unlock by completing the Rotary Roots chapter.",
    },
    icon: "Compass",
    colorHex: "#38BDF8",
  },

  // 3. COMPLETE SEVEN REALMS
  {
    id: "pathfinder_cloak",
    name: "Pathfinder Cloak",
    category: "cloak",
    description: "A wind-tested navy mantle woven for navigators traversing all Seven Realms.",
    rarity: "EPIC",
    unlockRequirement: {
      type: "world_complete",
      targetId: "Seven Realms",
      description: "Unlock by journeying across all Seven Realms of Rotaract.",
    },
    icon: "Shield",
    colorHex: "#818CF8",
  },

  // 4. COMPLETE ROTA 101
  {
    id: "scholar_pin",
    name: "Scholar Gold Pin",
    category: "accessory",
    description: "An engraved golden emblem signifying mastery of Rotary fundamentals and constitutional lore.",
    rarity: "RARE",
    unlockRequirement: {
      type: "lesson_complete",
      targetId: "rota101_foundations",
      description: "Unlock by graduating from Rota 101 core knowledge modules.",
    },
    icon: "Award",
    colorHex: "#FACC15",
  },

  // 5. FIRST VERIFIED PROJECT
  {
    id: "impact_patch",
    name: "First Impact Patch",
    category: "patches",
    description: "A woven emblem stitched to commemorate your very first on-ground Rotaract project.",
    rarity: "RARE",
    unlockRequirement: {
      type: "projects_count",
      count: 1,
      description: "Unlock upon completing and verifying 1 club project.",
    },
    icon: "Sparkles",
    colorHex: "#34D399",
  },

  // 6. COMPLETE 2 PROJECTS
  {
    id: "field_jacket",
    name: "Regent Field Jacket",
    category: "outfit",
    description: "Durable tactical project jacket with dedicated slots for earned club service patches.",
    rarity: "EPIC",
    unlockRequirement: {
      type: "projects_count",
      count: 2,
      description: "Unlock upon active involvement in 2 verified community or club projects.",
    },
    icon: "Layers",
    colorHex: "#FB923C",
  },

  // 7. MEMBERSHIP APPROVED - HIGHEST PRESTIGE
  {
    id: "regent_mantle",
    name: "THE REGENT MANTLE",
    category: "cloak",
    description: "The most prestigious ceremonial mantle of Rotary Club of Seethawaka Regents, trimmed with gold brocade.",
    rarity: "LEGENDARY",
    unlockRequirement: {
      type: "membership",
      description: "Prestigious cosmetic awarded upon official membership approval into RAC Seethawaka.",
    },
    icon: "Crown",
    colorHex: "#FFC719",
  },

  // ADDITIONAL ART-DIRECTED ACCESSORIES
  {
    id: "notebook_accessory",
    name: "Historian Notebook",
    category: "accessory",
    description: "Leather-bound journal for recording avenue strategies and meeting minutes.",
    rarity: "COMMON",
    unlockRequirement: {
      type: "starter",
      description: "Standard gear option for all prospective members.",
    },
    icon: "BookOpen",
    colorHex: "#94A3B8",
  },
  {
    id: "lantern_accessory",
    name: "Wayfarer Lantern",
    category: "accessory",
    description: "A brass guide lamp illuminating the path for new club recruits.",
    rarity: "RARE",
    unlockRequirement: {
      type: "starter",
      description: "Available to all dedicated explorers.",
    },
    icon: "Flame",
    colorHex: "#F59E0B",
  },
];

// Project Patches Catalog (Real Projects & Avenues)
export const PROJECT_PATCHES: ProjectPatch[] = [
  {
    id: "patch_rota101",
    projectId: "rota101",
    title: "Rota 101",
    avenue: "Club Service & Induction",
    iconName: "GraduationCap",
    accentColor: "#38BDF8",
    description: "Earned through active participation and graduation from the Rota 101 training camp.",
    rarity: "RARE",
  },
  {
    id: "patch_momentum",
    projectId: "momentum",
    title: "Momentum",
    avenue: "Professional Development",
    iconName: "TrendingUp",
    accentColor: "#F43F5E",
    description: "Awarded to members organizing or taking part in career readiness and skills workshops.",
    rarity: "EPIC",
  },
  {
    id: "patch_ran_hewisi",
    projectId: "ran_hewisi",
    title: "Ran Hewisi",
    avenue: "Community Service & Culture",
    iconName: "Music",
    accentColor: "#FACC15",
    description: "Celebrating traditional rhythm, cultural preservation, and heritage community impact.",
    rarity: "EPIC",
  },
  {
    id: "patch_ypl",
    projectId: "ypl",
    title: "YPL (Youth Parliament)",
    avenue: "Youth Leadership & Public Policy",
    iconName: "Landmark",
    accentColor: "#818CF8",
    description: "Recognizing debate, youth governance, diplomacy, and community leadership excellence.",
    rarity: "LEGENDARY",
  },
  {
    id: "patch_clean_sl",
    projectId: "clean_sl",
    title: "Clean Sri Lanka",
    avenue: "Environmental Service",
    iconName: "Leaf",
    accentColor: "#34D399",
    description: "Active frontline participation in coastal cleanups, reforestation, and sustainable ecology.",
    rarity: "RARE",
  },
];

// Hairstyle Variants per Archetype (Art-Directed)
export interface ArchetypeHairVariant {
  id: string;
  name: string;
  description: string;
}

export const ARCHETYPE_HAIRSTYLES: Record<ExplorerId, ArchetypeHairVariant[]> = {
  pathfinder: [
    { id: "signature", name: "Signature Windswept", description: "Default agile look designed for fast exploration." },
    { id: "tied_explorer", name: "Braided Topknot", description: "Secured for rough mountain traverses." },
    { id: "cropped_trail", name: "Cropped Trailcut", description: "Low-maintenance adventure trim." },
  ],
  scholar: [
    { id: "signature", name: "Classic Sidepart", description: "Neat academic cut with refined silhouette." },
    { id: "scholar_bun", name: "Low Archival Bun", description: "Focused library and research styling." },
    { id: "waiving_curls", name: "Textured Curls", description: "Expressive scholarly presentation." },
  ],
  creator: [
    { id: "signature", name: "Volume Curly Waves", description: "Vibrant and visionary signature crown." },
    { id: "creator_locs", name: "Artisan Locs", description: "Creative statement style with brass beads." },
    { id: "undercut_fade", name: "High Fade Taper", description: "Modern dynamic studio silhouette." },
  ],
  wayfarer: [
    { id: "signature", name: "Warrior Topknot", description: "Traditional forest wanderer tie." },
    { id: "long_flowing", name: "Flowing Wilderness Locks", description: "Free-flowing organic natural hair." },
    { id: "banded_braids", name: "Banded Trail Braids", description: "Secured with woven leather bands." },
  ],
  trailblazer: [
    { id: "signature", name: "Sunlit Spikes", description: "High-energy bold profile." },
    { id: "sweep_fade", name: "Executive Sweep", description: "Sharp forward-leaning leadership taper." },
    { id: "short_buzz", name: "Tactical Buzz", description: "Zero-distraction action cut." },
  ],
  storyteller: [
    { id: "signature", name: "Braided Fade Crown", description: "Regal woven braids celebrating cultural roots." },
    { id: "afro_taper", name: "Sculpted Afro Taper", description: "Warm expressive presentation style." },
    { id: "draped_twist", name: "Draped Twists", description: "Elegant storytelling ensemble." },
  ],
  strategist: [
    { id: "signature", name: "Gilded Naval Slick", description: "Precise aristocratic poise." },
    { id: "side_pompadour", name: "Commander Pompadour", description: "Commanding officer presence." },
    { id: "neat_fade", name: "Tailored Taper", description: "Immaculate strategic silhouette." },
  ],
  builder: [
    { id: "signature", name: "Forge Undercut", description: "Practical workshop haircut." },
    { id: "bandana_wrap", name: "Artisan Bandana", description: "Headband keeping hair clear of forge sparks." },
    { id: "rugged_crew", name: "Rugged Crew Cut", description: "Heavy-duty construction staple." },
  ],
};
