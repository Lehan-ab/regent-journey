export type LessonSceneType =
  | "portal"
  | "canopy"
  | "harbor"
  | "hearth"
  | "compass"
  | "forge"
  | "codewood"
  | "archive"
  | "frontier"
  | "citadel";

export interface PairedAvenueInfo {
  isDualAvenue: boolean;
  primaryAvenue?: string;
  secondaryAvenue?: string;
  note?: string;
}

export type ActorRole = "npc" | "companion" | "explorer" | "guardian";

export interface SceneActor {
  id: string;
  role: ActorRole;
  name: string;
  position: "left" | "center" | "right";
  defaultExpression?: string;
  isInteractive?: boolean;
}

export interface SceneBackdrop {
  imagePath: string;
  blurEffect?: boolean;
  ambientParticles?: "sparks" | "embers" | "leaves" | "mist" | "starlight" | "none";
  overlayGradient?: string;
}

export interface StageAtmosphere {
  title: string;
  subtitle?: string;
  weather?: "clear" | "rain" | "fog" | "sunset" | "dawn" | "night";
  ambientSoundtrack?: string;
  lightingTone?: "warm-gold" | "royal-crimson" | "mystic-blue" | "emerald-grove" | "dusk";
}

export interface StoryScene {
  id: string;
  sceneType: LessonSceneType;
  variant: string;
  atmosphere: StageAtmosphere;
  backdrop: SceneBackdrop;
  actors: SceneActor[];
  pairedAvenues?: PairedAvenueInfo;
}
