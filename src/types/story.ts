export type DialogueSpeaker = "npc" | "explorer" | "companion";

export type DialogueEmotion =
  | "neutral"
  | "warm"
  | "curious"
  | "serious"
  | "excited"
  | "thoughtful"
  | "celebrate";

export interface CompanionDialogueVariants {
  nova?: string; // Thoughtful, reflective, knowledge-seeking
  raya?: string; // Energetic, action-oriented, bold
  kai?: string;  // Strategic, structured, practical
}

export interface DialogueBeat {
  id: string;
  speaker: DialogueSpeaker;
  speakerName?: string;
  role?: string;
  text: string;
  emotion?: DialogueEmotion;
  sceneEvent?: string;
  companionVariants?: CompanionDialogueVariants;
}

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

export interface LessonSceneConfig {
  sceneType: LessonSceneType;
  variant: string;
  atmosphereTitle?: string;
  pairedAvenues?: PairedAvenueInfo;
  backdropImage?: string;
}

export interface LessonSourceInfo {
  publication: string;
  district: string;
  section: string;
  pages: number[];
  pageRangeDisplay: string;
}

export type TrialType =
  | "multiple-choice"
  | "scenario"
  | "ordering"
  | "matching"
  | "classification";

export interface TrialOption {
  id: string;
  text: string;
  explanation: string;
}

export interface KnowledgeTrial {
  type: TrialType;
  question: string;
  options: TrialOption[];
  correctOptionId: string;
  hint: string;
  successMessage: string;
}
