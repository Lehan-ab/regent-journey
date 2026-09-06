export interface RealmCoordinates {
  x: number;
  y: number;
}

export interface SeethawakaHeritage {
  historicalLandmark: string;
  loreContext: string;
  culturalInspiration: string;
  monumentType?: "archway" | "palace" | "river" | "canopy" | "fortress" | "temple" | "citadel";
}

export interface StoryLocation {
  id: string;
  worldName: string;
  regionTitle: string;
  chapterNumber: number;
  isPrologue?: boolean;
  coords: RealmCoordinates;
  visualTag: string;
  image: string;
  routeHref: string;
  audioTheme?: string;
  seethawakaHeritage: SeethawakaHeritage;
  description: string;
  expandedLore?: string;
  unlockRequirement?: string;
}
