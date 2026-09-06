import { StoryScene } from "./scene";
import { StoryDialogue } from "./dialogue";
import { StoryInteraction } from "./interaction";
import { StoryReward } from "./reward";

export interface LessonSourceInfo {
  publication: string;
  district: string;
  section: string;
  pages: number[];
  pageRangeDisplay: string;
}

export interface KnowledgeTrialOption {
  id: string;
  text: string;
  explanation: string;
}

export interface KnowledgeTrial {
  type: "multiple-choice" | "scenario" | "ordering" | "matching" | "classification";
  question: string;
  options: KnowledgeTrialOption[];
  correctOptionId: string;
  hint: string;
  successMessage: string;
}

export interface StoryCodexSection {
  title: string;
  content: string[];
  keyTakeaway?: string;
  bulletPoints?: string[];
  quote?: {
    text: string;
    author: string;
  };
}

export interface StoryLesson {
  id: string;
  chapterId: string;
  lessonNumber: number;
  title: string;
  subtitle: string;
  readTime: string;
  scene: StoryScene;
  storyIntro?: {
    speaker: string;
    speakerRole: string;
    dialogue: string;
  };
  dialogue: StoryDialogue;
  codexSections: StoryCodexSection[];
  source: LessonSourceInfo;
  interactiveChallenge?: StoryInteraction;
  knowledgeTrial: KnowledgeTrial;
  reward: StoryReward;
  companionAdvice: {
    nova: string;
    raya: string;
    kai: string;
  };
}
