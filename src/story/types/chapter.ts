import { StoryLocation } from "./location";
import { StoryLesson } from "./lesson";
import { StoryReward } from "./reward";

export interface CinematicIntroSlide {
  id: string;
  order: number;
  title: string;
  subtitle?: string;
  narrationText: string;
  speaker?: string;
  speakerRole?: string;
  image?: string;
  soundEffect?: string;
  durationSeconds?: number;
}

export interface CinematicIntroConfig {
  id: string;
  worldTitle: string;
  tagline: string;
  backgroundImage: string;
  ambientSoundtrack?: string;
  slides: CinematicIntroSlide[];
  companionGreeting?: {
    nova: string;
    raya: string;
    kai: string;
  };
}

export interface ChapterCompletionConfig {
  title: string;
  congratulationsText: string;
  badgeRewardId?: string;
  unlockedWorldId?: string;
  unlockedWorldName?: string;
}

export interface StoryChapter {
  id: string;
  chapterNumber: number;
  chapterLabel: string;
  chapterTitle: string;
  worldName: string;
  regionTitle: string;
  seethawakaInspiration: string;
  summary: string;
  location: StoryLocation;
  guideNpcId: string;
  cinematicIntro: CinematicIntroConfig;
  lessons: StoryLesson[];
  completionReward: StoryReward;
  completionCinematic: ChapterCompletionConfig;
  unlockRequirement?: string;
}
