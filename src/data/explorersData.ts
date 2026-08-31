import { ExplorerId } from "@/types/player";

export interface ExplorerPreset {
  id: ExplorerId;
  title: string;
  archetype: string;
  tagline: string;
  quote: string;
  portraitUrl: string;
  accentColor: string;
  badgeBg: string;
  traits: string[];
  description: string;
  miniSprite: {
    hairColor: string;
    outfitColor: string;
    skinColor: string;
  };
}

export const EXPLORERS: Record<ExplorerId, ExplorerPreset> = {
  pathfinder: {
    id: "pathfinder",
    title: "THE PATHFINDER",
    archetype: "Pathfinder",
    tagline: "Bold, agile, and always drawn toward uncharted paths.",
    quote: "“Always curious about what lies beyond the next turn.”",
    portraitUrl: "/images/explorer_pathfinder.jpg",
    accentColor: "#FFC719",
    badgeBg: "bg-amber-950/80 border-amber-800 text-amber-300",
    traits: ["Adaptable", "Curious", "Pioneering"],
    description: "Equipped with the signature Regent explorer coat, leather harness, and golden compass.",
    miniSprite: {
      hairColor: "#3B2215",
      outfitColor: "#1E293B",
      skinColor: "#DDA36B",
    },
  },
  scholar: {
    id: "scholar",
    title: "THE SCHOLAR",
    archetype: "Scholar",
    tagline: "Thoughtful, observant, and dedicated to timeless heritage.",
    quote: "“Every heritage story has a lesson waiting to be discovered.”",
    portraitUrl: "/images/explorer_scholar.jpg",
    accentColor: "#38BDF8",
    badgeBg: "bg-sky-950/80 border-sky-800 text-sky-300",
    traits: ["Analytical", "Wise", "Articulate"],
    description: "Dressed in a royal indigo velvet scholar coat with gold embroidery and wire spectacles.",
    miniSprite: {
      hairColor: "#1C1C22",
      outfitColor: "#1E1B4B",
      skinColor: "#F7CCA0",
    },
  },
  creator: {
    id: "creator",
    title: "THE CREATOR",
    archetype: "Creator",
    tagline: "Vibrant, visionary, and driven to turn ideas into reality.",
    quote: "“Turning fresh ideas into projects that inspire people.”",
    portraitUrl: "/images/explorer_creator.jpg",
    accentColor: "#F43F5E",
    badgeBg: "bg-rose-950/80 border-rose-800 text-rose-300",
    traits: ["Creative", "Enthusiastic", "Original"],
    description: "Sporting a crimson & cobalt doublet with brass gear buckles and volume curls.",
    miniSprite: {
      hairColor: "#633319",
      outfitColor: "#881337",
      skinColor: "#BD7B44",
    },
  },
  wayfarer: {
    id: "wayfarer",
    title: "THE WAYFARER",
    archetype: "Wayfarer",
    tagline: "Calm, steadfast, and connected to the living wilderness.",
    quote: "“The best expeditions are the ones that bring everyone along.”",
    portraitUrl: "/images/explorer_wayfarer.jpg",
    accentColor: "#34D399",
    badgeBg: "bg-emerald-950/80 border-emerald-800 text-emerald-300",
    traits: ["Grounded", "Supportive", "Perceptive"],
    description: "Garbed in an emerald forest mantle with golden leaf brooch and warrior topknot.",
    miniSprite: {
      hairColor: "#1C1C22",
      outfitColor: "#064E3B",
      skinColor: "#8F542A",
    },
  },
  trailblazer: {
    id: "trailblazer",
    title: "THE TRAILBLAZER",
    archetype: "Trailblazer",
    tagline: "Dynamic, fearless, and energized by high-impact action.",
    quote: "“Action creates momentum. Let’s lead the charge.”",
    portraitUrl: "/images/explorer_trailblazer.jpg",
    accentColor: "#FACC15",
    badgeBg: "bg-yellow-950/80 border-yellow-800 text-yellow-300",
    traits: ["Energetic", "Resolute", "Charismatic"],
    description: "Wearing a midnight slate doublet with gold star medal and sunlit spiky hair.",
    miniSprite: {
      hairColor: "#D9AC34",
      outfitColor: "#334155",
      skinColor: "#FDDFC2",
    },
  },
  storyteller: {
    id: "storyteller",
    title: "THE STORYTELLER",
    archetype: "Storyteller",
    tagline: "Warm, expressive, and passionate about celebrating community.",
    quote: "“Every member’s journey deserves to be remembered.”",
    portraitUrl: "/images/explorer_storyteller.jpg",
    accentColor: "#FB923C",
    badgeBg: "bg-orange-950/80 border-orange-800 text-orange-300",
    traits: ["Empathetic", "Expressive", "Inspiring"],
    description: "Styling a regal burgundy coat with leather messenger straps and braided fade crown.",
    miniSprite: {
      hairColor: "#1C1C22",
      outfitColor: "#6E1328",
      skinColor: "#543118",
    },
  },
  strategist: {
    id: "strategist",
    title: "THE STRATEGIST",
    archetype: "Strategist",
    tagline: "Poised, astute, and gifted in organizing collective efforts.",
    quote: "“Clear vision turns bold ambitions into lasting impact.”",
    portraitUrl: "/images/explorer_strategist.jpg",
    accentColor: "#818CF8",
    badgeBg: "bg-indigo-950/80 border-indigo-800 text-indigo-300",
    traits: ["Strategic", "Poised", "Insightful"],
    description: "Wearing a gilded naval officer doublet with gold aiguillette ropes and elegant swept hair.",
    miniSprite: {
      hairColor: "#3B2215",
      outfitColor: "#1E3A8A",
      skinColor: "#DDA36B",
    },
  },
  builder: {
    id: "builder",
    title: "THE BUILDER",
    archetype: "Builder",
    tagline: "Practical, hardworking, and committed to lasting structures.",
    quote: "“Solid foundations build sustainable communities.”",
    portraitUrl: "/images/explorer_builder.jpg",
    accentColor: "#F59E0B",
    badgeBg: "bg-amber-950/80 border-amber-800 text-amber-300",
    traits: ["Resourceful", "Diligent", "Reliable"],
    description: "Wearing a heavy chestnut forge vest with copper rivets and tool harness.",
    miniSprite: {
      hairColor: "#3B2215",
      outfitColor: "#78350F",
      skinColor: "#BD7B44",
    },
  },
};

export const EXPLORER_LIST: ExplorerPreset[] = [
  EXPLORERS.pathfinder,
  EXPLORERS.scholar,
  EXPLORERS.creator,
  EXPLORERS.wayfarer,
  EXPLORERS.trailblazer,
  EXPLORERS.storyteller,
  EXPLORERS.strategist,
  EXPLORERS.builder,
];

export const DEFAULT_EXPLORER_ID: ExplorerId = "pathfinder";

export function getRandomExplorerId(): ExplorerId {
  const list: ExplorerId[] = [
    "pathfinder",
    "scholar",
    "creator",
    "wayfarer",
    "trailblazer",
    "storyteller",
    "strategist",
    "builder",
  ];
  return list[Math.floor(Math.random() * list.length)];
}
