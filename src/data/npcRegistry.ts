export interface NPCPortraitSet {
  neutral: string;
  speaking: string;
  reaction: string;
}

export interface NPCRegistryEntry {
  id: string;
  name: string;
  title: string;
  chapterId: string;
  chapterLabel: string;
  worldName: string;
  bio: string;
  voiceTone: string;
  quote: string;
  themeColor: string;
  accentColor: string;
  portraits: NPCPortraitSet;
  isProductionAsset: boolean; // Explicitly false for temporary placeholders
}

export const NPC_REGISTRY: Record<string, NPCRegistryEntry> = {
  "gatekeeper-aaron": {
    id: "gatekeeper-aaron",
    name: "Gatekeeper Aaron",
    title: "Portal Guardian",
    chapterId: "loc-gateway",
    chapterLabel: "PROLOGUE",
    worldName: "The Gateway",
    bio: "The venerable guardian of the Seethawaka valley threshold. Carrying an ancient brass lantern staff that illuminates the Explorer's Code, Aaron tests the purpose and dedication of all who seek to enter.",
    voiceTone: "Ancient, resonant, welcoming, and solemn.",
    quote: "“Curiosity opens the door; integrity and service keep it open.”",
    themeColor: "amber",
    accentColor: "#F59E0B",
    portraits: {
      neutral: "/images/npcs/gatekeeper-aaron/neutral.webp",
      speaking: "/images/npcs/gatekeeper-aaron/speaking.webp",
      reaction: "/images/npcs/gatekeeper-aaron/reaction.webp",
    },
    isProductionAsset: true,
  },
  "archivist": {
    id: "archivist",
    name: "The Archivist",
    title: "Keeper of the Living Codex",
    chapterId: "loc-rotary-roots",
    chapterLabel: "CHAPTER 1",
    worldName: "Rotary Roots",
    bio: "Draped in a botanical mantle of gold and emerald, the Archivist reads the glowing root veins of the ancient banyan canopy, revealing how selfless service creates sustainable community growth.",
    voiceTone: "Gentle, contemplative, principled, and deeply grounded.",
    quote: "“A tree stands firm not because of its leaves, but because its roots run deep in service.”",
    themeColor: "emerald",
    accentColor: "#10B981",
    portraits: {
      neutral: "/images/npcs/archivist/neutral.webp",
      speaking: "/images/npcs/archivist/speaking.webp",
      reaction: "/images/npcs/archivist/reaction.webp",
    },
    isProductionAsset: true,
  },
  "port-master-kael": {
    id: "port-master-kael",
    name: "Port Master Kael",
    title: "Harbor Navigator",
    chapterId: "loc-rotaract-harbor",
    chapterLabel: "CHAPTER 2",
    worldName: "Rotaract Harbor",
    bio: "A weathered river captain in an expedition coat with brass navigation spyglass. Kael coordinates the fleet of clubs across District 3220 and worldwide networks, maintaining accurate manifests and logbooks.",
    voiceTone: "Boisterous, confident, energetic, and worldly.",
    quote: "“A fleet sails on coordinated rhythm. Accurate logbooks keep the whole fleet united.”",
    themeColor: "cyan",
    accentColor: "#06B6D4",
    portraits: {
      neutral: "/images/npcs/port-master-kael/neutral.webp",
      speaking: "/images/npcs/port-master-kael/speaking.webp",
      reaction: "/images/npcs/port-master-kael/reaction.webp",
    },
    isProductionAsset: true,
  },
  "keeper": {
    id: "keeper",
    name: "The Keeper",
    title: "Guardian of Regent Lore",
    chapterId: "loc-regent-keep",
    chapterLabel: "CHAPTER 3",
    worldName: "Regent Keep",
    bio: "Steward of the Seethawaka fortress hall, wearing charcoal and maroon tailored vestments with the crest key. The Keeper protects club camaraderie, meetings that move people, and self-sponsored heritage.",
    voiceTone: "Warm, protective, hospitable, and dignified.",
    quote: "“Fellowship is not a luxury—it is the hearthfire that warms all of our service.”",
    themeColor: "rose",
    accentColor: "#E11D48",
    portraits: {
      neutral: "/images/npcs/keeper/neutral.webp",
      speaking: "/images/npcs/keeper/speaking.webp",
      reaction: "/images/npcs/keeper/reaction.webp",
    },
    isProductionAsset: true,
  },
  "avenue-guide": {
    id: "avenue-guide",
    name: "Avenue Guide",
    title: "Celestial Cartographer",
    chapterId: "loc-seven-realms",
    chapterLabel: "CHAPTER 4",
    worldName: "The Avenue Constellation",
    bio: "Astrological navigator holding the 11-point brass celestial compass. The Avenue Guide illuminates the 4 Primary and 7 Secondary avenue pathways, guiding explorers through distinct avenues of action.",
    voiceTone: "Visionary, animated, enthusiastic, and articulate.",
    quote: "“Eleven distinct stars chart our course. Four anchors guide our foundation, and seven beacons expand our reach.”",
    themeColor: "indigo",
    accentColor: "#6366F1",
    portraits: {
      neutral: "/images/npcs/avenue-guide/neutral.webp",
      speaking: "/images/npcs/avenue-guide/speaking.webp",
      reaction: "/images/npcs/avenue-guide/reaction.webp",
    },
    isProductionAsset: true,
  },
  "builder": {
    id: "builder",
    name: "The Builder",
    title: "Master Project Crafter",
    chapterId: "loc-project-forge",
    chapterLabel: "CHAPTER 5",
    worldName: "Project Forge",
    bio: "Pragmatic master craftsman with rolled leather sleeves and calipers. The Builder insists that projects begin by listening to genuine community needs, forge for sustainability, and measure actual outcomes.",
    voiceTone: "Pragmatic, blunt, encouraging, and quality-driven.",
    quote: "“Do not ask what project you want to build—ask what the community genuinely needs.”",
    themeColor: "amber",
    accentColor: "#D97706",
    portraits: {
      neutral: "/images/npcs/builder/neutral.webp",
      speaking: "/images/npcs/builder/speaking.webp",
      reaction: "/images/npcs/builder/reaction.webp",
    },
    isProductionAsset: true,
  },
  "scholar": {
    id: "scholar",
    name: "The Scholar",
    title: "Ethics Master",
    chapterId: "loc-codewood",
    chapterLabel: "CHAPTER 6",
    worldName: "Codewood",
    bio: "Hermetic mentor in teal hooded robes holding an obsidian rune tablet. The Scholar tests personal conduct, attire decorum, brand integrity via the VOICE framework, and responsible AI ethics with human oversight.",
    voiceTone: "Precise, analytical, principled, and tranquil.",
    quote: "“A leader's voice must be verified, open, impact-driven, consistent, and engaging.”",
    themeColor: "teal",
    accentColor: "#0D9488",
    portraits: {
      neutral: "/images/npcs/scholar/neutral.webp",
      speaking: "/images/npcs/scholar/speaking.webp",
      reaction: "/images/npcs/scholar/reaction.webp",
    },
    isProductionAsset: true,
  },
  "librarian-vanya": {
    id: "librarian-vanya",
    name: "Chief Librarian Vanya",
    title: "Master of Archives",
    chapterId: "loc-grand-archive",
    chapterLabel: "CHAPTER 7",
    worldName: "Grand Archive",
    bio: "Energetic scholar-archivist with round brass spectacles and archive keys. Vanya guards the Secretariat records, unseals the Treasury of Trust, and points explorers toward deeper reference repositories.",
    voiceTone: "Meticulous, passionate, fast-talking, and fiercely protective of truth.",
    quote: "“Clear records protect public trust; transparent ledgers protect the soul of the club.”",
    themeColor: "purple",
    accentColor: "#A855F7",
    portraits: {
      neutral: "/images/npcs/librarian-vanya/neutral.webp",
      speaking: "/images/npcs/librarian-vanya/speaking.webp",
      reaction: "/images/npcs/librarian-vanya/reaction.webp",
    },
    isProductionAsset: true,
  },
  "scout-mira": {
    id: "scout-mira",
    name: "Expedition Scout Mira",
    title: "Field Scout Leader",
    chapterId: "loc-impact-frontier",
    chapterLabel: "CHAPTER 8",
    worldName: "Impact Frontier",
    bio: "Athletic field leader in rugged waxed-canvas gear and boots with a field logbook. Mira guides the Explorer from digital theory into physical reality: meetings, hands-on service, and honest documentation.",
    voiceTone: "Direct, fearless, motivating, and action-oriented.",
    quote: "“The realm inside the screen is preparation; real Rotaract lives under the open sky.”",
    themeColor: "emerald",
    accentColor: "#059669",
    portraits: {
      neutral: "/images/npcs/scout-mira/neutral.webp",
      speaking: "/images/npcs/scout-mira/speaking.webp",
      reaction: "/images/npcs/scout-mira/reaction.webp",
    },
    isProductionAsset: true,
  },
  "high-regent": {
    id: "high-regent",
    name: "High Regent",
    title: "Presiding Regent of the Citadel",
    chapterId: "loc-membership-citadel",
    chapterLabel: "CHAPTER 9",
    worldName: "Membership Citadel",
    bio: "Dignified youth leader wearing the ceremonial Regent maroon mantle edged with gold filigree and ceremonial Regent emblem. Presides over the induction pathway and administers The Explorer's Commitment.",
    voiceTone: "Dignified, visionary, humble, and inspiring.",
    quote: "“Membership is not a trophy of completion—it is an unsealed gateway to lifelong leadership.”",
    themeColor: "yellow",
    accentColor: "#EAB308",
    portraits: {
      neutral: "/images/npcs/high-regent/neutral.webp",
      speaking: "/images/npcs/high-regent/speaking.webp",
      reaction: "/images/npcs/high-regent/reaction.webp",
    },
    isProductionAsset: true,
  },
};

export function getNPC(npcId?: string): NPCRegistryEntry | undefined {
  if (!npcId) return undefined;
  return NPC_REGISTRY[npcId];
}

export function getNPCForChapter(chapterId: string): NPCRegistryEntry | undefined {
  return Object.values(NPC_REGISTRY).find((npc) => npc.chapterId === chapterId);
}
