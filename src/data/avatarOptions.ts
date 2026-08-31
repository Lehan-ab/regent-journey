import {
  SkinToneId,
  HairStyleId,
  HairColorId,
  OutfitId,
  AccessoryId,
  AvatarConfig,
} from "@/types/player";

export interface CustomizationOption<T> {
  id: T;
  label: string;
  description?: string;
  color?: string;
  secondaryColor?: string;
  highlightColor?: string;
  blushColor?: string;
  icon?: string;
}

export const SKIN_TONES: CustomizationOption<SkinToneId>[] = [
  {
    id: "fair",
    label: "Fair Porcelain",
    color: "#FDDFC2",
    secondaryColor: "#E2AA76",
    highlightColor: "#FFF2E6",
    blushColor: "#FCA5A5",
  },
  {
    id: "warm-ivory",
    label: "Warm Ivory",
    color: "#F7CCA0",
    secondaryColor: "#D89B64",
    highlightColor: "#FFEAD0",
    blushColor: "#F87171",
  },
  {
    id: "golden-olive",
    label: "Golden Olive",
    color: "#DDA36B",
    secondaryColor: "#B8753B",
    highlightColor: "#F5C799",
    blushColor: "#E17855",
  },
  {
    id: "honey-tan",
    label: "Honey Amber",
    color: "#BD7B44",
    secondaryColor: "#945321",
    highlightColor: "#DE9F6B",
    blushColor: "#C25E3E",
  },
  {
    id: "deep-bronze",
    label: "Deep Bronze",
    color: "#8F542A",
    secondaryColor: "#663412",
    highlightColor: "#B57444",
    blushColor: "#9E432A",
  },
  {
    id: "rich-espresso",
    label: "Rich Espresso",
    color: "#543118",
    secondaryColor: "#351A0A",
    highlightColor: "#774B2A",
    blushColor: "#6B2A1E",
  },
];

export const HAIR_STYLES: CustomizationOption<HairStyleId>[] = [
  { id: "short", label: "Adventurer Spikes", description: "Dynamic textured anime adventurer spikes" },
  { id: "medium", label: "Explorer Waves", description: "Layered windswept waves with side fringe" },
  { id: "long", label: "Flowing Locks", description: "Long shoulder-length voyager tresses" },
  { id: "curly", label: "Curly Crown", description: "Voluminous textured retro curls with sharp fade" },
  { id: "tied", label: "Topknot / Bun", description: "Tied warrior topknot with flowing ribbon" },
  { id: "fade", label: "Modern Fade", description: "Clean tapered sides with textured top" },
  { id: "textured", label: "Wild Spikes", description: "High-volume textured explorer mane" },
  { id: "slick", label: "Scholar Side-Part", description: "Sleek classic gentleman's side part" },
];

export const HAIR_COLORS: CustomizationOption<HairColorId>[] = [
  {
    id: "black",
    label: "Jet Obsidian",
    color: "#1C1C22",
    secondaryColor: "#0E0E12",
    highlightColor: "#404052",
  },
  {
    id: "dark-brown",
    label: "Dark Chocolate",
    color: "#3B2215",
    secondaryColor: "#24130A",
    highlightColor: "#6E432C",
  },
  {
    id: "chestnut",
    label: "Warm Chestnut",
    color: "#633319",
    secondaryColor: "#401E0D",
    highlightColor: "#9C5832",
  },
  {
    id: "light-brown",
    label: "Toffee Brown",
    color: "#8C5935",
    secondaryColor: "#5E361B",
    highlightColor: "#C48759",
  },
  {
    id: "blonde",
    label: "Sunlit Gold",
    color: "#D9AC34",
    secondaryColor: "#9E7513",
    highlightColor: "#F7DC74",
  },
  {
    id: "auburn",
    label: "Crimson Flame",
    color: "#8A2216",
    secondaryColor: "#591108",
    highlightColor: "#C94D3E",
  },
  {
    id: "slate",
    label: "Silver Ash",
    color: "#8792A2",
    secondaryColor: "#586373",
    highlightColor: "#BDC6D4",
  },
  {
    id: "burgundy",
    label: "Regent Maroon",
    color: "#6E1328",
    secondaryColor: "#450716",
    highlightColor: "#A82C4A",
  },
];

export const OUTFITS: CustomizationOption<OutfitId>[] = [
  {
    id: "traveller",
    label: "EXPLORER COAT",
    description: "Iconic midnight jacket with maroon pop-collar, brass studs, and leather straps.",
    color: "#1E293B",
    secondaryColor: "#800020",
    highlightColor: "#FFC719",
  },
  {
    id: "scholar",
    label: "SCHOLAR WAISTCOAT",
    description: "Royal indigo velvet vest with gilded embroidery, high collar, and gold ascot.",
    color: "#1E1B4B",
    secondaryColor: "#312E81",
    highlightColor: "#FACC15",
  },
  {
    id: "pathfinder",
    label: "RANGER MANTLE",
    description: "Deep forest green cloak with leaf brooch, scout harness, and leaf trim.",
    color: "#064E3B",
    secondaryColor: "#047857",
    highlightColor: "#86EFAC",
  },
  {
    id: "creator",
    label: "ARTIFICER DOUBLET",
    description: "Vibrant crimson & cobalt doublet with brass shoulder gear plates.",
    color: "#881337",
    secondaryColor: "#1D4ED8",
    highlightColor: "#38BDF8",
  },
  {
    id: "builder",
    label: "FORGE JACKET",
    description: "Heavy chestnut leather tunic with copper rivets and tool harness.",
    color: "#78350F",
    secondaryColor: "#92400E",
    highlightColor: "#F59E0B",
  },
  {
    id: "adventurer",
    label: "VANGUARD UNIFORM",
    description: "Regent royal ceremonial officer uniform with golden aiguillette ropes.",
    color: "#4C0519",
    secondaryColor: "#881337",
    highlightColor: "#FFD700",
  },
];

export const ACCESSORIES: CustomizationOption<AccessoryId>[] = [
  { id: "compass", label: "Regent Compass", description: "Golden brass compass with glowing needle pinned to lapel" },
  { id: "goggles", label: "Explorer Goggles", description: "Brass & amber expedition goggles resting on forehead" },
  { id: "notebook", label: "Field Book", description: "Leather-bound discovery journal with gold ribbon" },
  { id: "book", label: "Ancient Star Codex", description: "Gilded heritage tome strapped with leather harness" },
  { id: "map", label: "Seethawaka Map", description: "Parchment chart of the 7 Realms tucked in lapel" },
  { id: "lantern", label: "Brass Lantern", description: "Miniature trail lantern casting warm gold light" },
  { id: "satchel", label: "Courier Satchel", description: "Embossed leather crossbody bag with brass buckle" },
  { id: "scroll", label: "Charter Scroll", description: "Royal invitation scroll sealed with Regent crest" },
  { id: "none", label: "None", description: "Clean adventurer look without extra gear" },
];

export const DEFAULT_AVATAR: AvatarConfig = {
  skinTone: "golden-olive",
  hairStyle: "short",
  hairColor: "dark-brown",
  outfit: "traveller",
  accessory: "compass",
};

export function getRandomAvatar(): AvatarConfig {
  const getRandom = <T>(arr: CustomizationOption<T>[]): T => {
    return arr[Math.floor(Math.random() * arr.length)].id;
  };

  return {
    skinTone: getRandom(SKIN_TONES),
    hairStyle: getRandom(HAIR_STYLES),
    hairColor: getRandom(HAIR_COLORS),
    outfit: getRandom(OUTFITS),
    accessory: getRandom(ACCESSORIES),
  };
}
