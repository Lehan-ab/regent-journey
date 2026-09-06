export type StoryPipelineStage =
  | "CINEMATIC_INTRO"
  | "SCENE_STAGE"
  | "LESSON_CONTENT"
  | "INTERACTIVE_CHALLENGE"
  | "KNOWLEDGE_TRIAL"
  | "REWARD_CEREMONY"
  | "WORLD_UNLOCK";

export const PIPELINE_STAGE_ORDER: readonly StoryPipelineStage[] = [
  "CINEMATIC_INTRO",
  "SCENE_STAGE",
  "LESSON_CONTENT",
  "INTERACTIVE_CHALLENGE",
  "KNOWLEDGE_TRIAL",
  "REWARD_CEREMONY",
  "WORLD_UNLOCK",
] as const;

export interface PipelineState {
  currentStage: StoryPipelineStage;
  stageIndex: number;
  chapterId: string;
  lessonId?: string;
  isStageCompleted: boolean;
  history: StoryPipelineStage[];
  cinematicWatched: boolean;
  sceneInitialized: boolean;
  dialogueCompleted: boolean;
  lessonRead: boolean;
  challengePassed: boolean;
  trialPassed: boolean;
  rewardClaimed: boolean;
  worldUnlocked: boolean;
}

export type ProgressionEvent =
  | { type: "START_CHAPTER"; chapterId: string }
  | { type: "COMPLETE_CINEMATIC" }
  | { type: "ENTER_SCENE"; sceneId: string }
  | { type: "FINISH_DIALOGUE" }
  | { type: "FINISH_LESSON_READING" }
  | { type: "SUBMIT_CHALLENGE"; isCorrect: boolean }
  | { type: "SUBMIT_TRIAL"; isCorrect: boolean }
  | { type: "CLAIM_REWARD" }
  | { type: "UNLOCK_WORLD"; nextChapterId?: string }
  | { type: "RESET_STAGE"; stage: StoryPipelineStage };
