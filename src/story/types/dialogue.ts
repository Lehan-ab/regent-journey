export type DialogueSpeaker = "npc" | "explorer" | "companion" | "system";

export type DialogueEmotion =
  | "neutral"
  | "warm"
  | "curious"
  | "serious"
  | "excited"
  | "thoughtful"
  | "celebrate";

export interface CompanionDialogueVariants {
  nova?: string; // Thoughtful, analytical, reflective, knowledge-seeking
  raya?: string; // Energetic, adventurous, action-oriented, bold
  kai?: string;  // Strategic, structured, practical, leadership-focused
}

export interface DialogueChoice {
  id: string;
  label: string;
  responsePreview?: string;
  nextBeatId?: string;
  reputationBonus?: {
    nova?: number;
    raya?: number;
    kai?: number;
  };
}

export interface StoryDialogueBeat {
  id: string;
  speaker: DialogueSpeaker;
  speakerName?: string;
  role?: string;
  text: string;
  emotion?: DialogueEmotion;
  sceneEvent?: string;
  companionVariants?: CompanionDialogueVariants;
  choices?: DialogueChoice[];
}

export interface StoryDialogue {
  id: string;
  title?: string;
  beats: StoryDialogueBeat[];
  allowSkip?: boolean;
}
