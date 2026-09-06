import {
  PipelineState,
  ProgressionEvent,
  StoryPipelineStage,
  PIPELINE_STAGE_ORDER,
} from "../types/pipeline";

export function createInitialPipelineState(
  chapterId: string,
  lessonId?: string
): PipelineState {
  return {
    currentStage: "CINEMATIC_INTRO",
    stageIndex: 0,
    chapterId,
    lessonId,
    isStageCompleted: false,
    history: ["CINEMATIC_INTRO"],
    cinematicWatched: false,
    sceneInitialized: false,
    dialogueCompleted: false,
    lessonRead: false,
    challengePassed: false,
    trialPassed: false,
    rewardClaimed: false,
    worldUnlocked: false,
  };
}

export function getNextStage(currentStage: StoryPipelineStage): StoryPipelineStage | null {
  const currentIndex = PIPELINE_STAGE_ORDER.indexOf(currentStage);
  if (currentIndex === -1 || currentIndex >= PIPELINE_STAGE_ORDER.length - 1) {
    return null;
  }
  return PIPELINE_STAGE_ORDER[currentIndex + 1];
}

export function canTransitionTo(
  state: PipelineState,
  targetStage: StoryPipelineStage
): boolean {
  const targetIndex = PIPELINE_STAGE_ORDER.indexOf(targetStage);
  const currentIndex = PIPELINE_STAGE_ORDER.indexOf(state.currentStage);

  // Can always rewind to any previously unlocked stage
  if (targetIndex <= currentIndex) return true;

  // Can only advance to the immediate next stage if the current stage is completed
  if (targetIndex === currentIndex + 1) {
    switch (state.currentStage) {
      case "CINEMATIC_INTRO":
        return state.cinematicWatched;
      case "SCENE_STAGE":
        return state.sceneInitialized && state.dialogueCompleted;
      case "LESSON_CONTENT":
        return state.lessonRead;
      case "INTERACTIVE_CHALLENGE":
        return state.challengePassed;
      case "KNOWLEDGE_TRIAL":
        return state.trialPassed;
      case "REWARD_CEREMONY":
        return state.rewardClaimed;
      case "WORLD_UNLOCK":
        return true;
    }
  }

  return false;
}

export function reducePipelineState(
  state: PipelineState,
  event: ProgressionEvent
): PipelineState {
  switch (event.type) {
    case "START_CHAPTER":
      return createInitialPipelineState(event.chapterId);

    case "COMPLETE_CINEMATIC": {
      const nextStage = getNextStage("CINEMATIC_INTRO") || "SCENE_STAGE";
      return {
        ...state,
        cinematicWatched: true,
        currentStage: nextStage,
        stageIndex: PIPELINE_STAGE_ORDER.indexOf(nextStage),
        isStageCompleted: false,
        history: [...state.history, nextStage],
      };
    }

    case "ENTER_SCENE":
      return {
        ...state,
        sceneInitialized: true,
      };

    case "FINISH_DIALOGUE":
      return {
        ...state,
        dialogueCompleted: true,
        isStageCompleted: true,
      };

    case "FINISH_LESSON_READING": {
      const nextStage = getNextStage("LESSON_CONTENT") || "INTERACTIVE_CHALLENGE";
      return {
        ...state,
        lessonRead: true,
        currentStage: nextStage,
        stageIndex: PIPELINE_STAGE_ORDER.indexOf(nextStage),
        isStageCompleted: false,
        history: [...state.history, nextStage],
      };
    }

    case "SUBMIT_CHALLENGE": {
      if (!event.isCorrect) return state;
      const nextStage = getNextStage("INTERACTIVE_CHALLENGE") || "KNOWLEDGE_TRIAL";
      return {
        ...state,
        challengePassed: true,
        currentStage: nextStage,
        stageIndex: PIPELINE_STAGE_ORDER.indexOf(nextStage),
        isStageCompleted: false,
        history: [...state.history, nextStage],
      };
    }

    case "SUBMIT_TRIAL": {
      if (!event.isCorrect) return state;
      const nextStage = getNextStage("KNOWLEDGE_TRIAL") || "REWARD_CEREMONY";
      return {
        ...state,
        trialPassed: true,
        currentStage: nextStage,
        stageIndex: PIPELINE_STAGE_ORDER.indexOf(nextStage),
        isStageCompleted: false,
        history: [...state.history, nextStage],
      };
    }

    case "CLAIM_REWARD": {
      const nextStage = getNextStage("REWARD_CEREMONY") || "WORLD_UNLOCK";
      return {
        ...state,
        rewardClaimed: true,
        currentStage: nextStage,
        stageIndex: PIPELINE_STAGE_ORDER.indexOf(nextStage),
        isStageCompleted: false,
        history: [...state.history, nextStage],
      };
    }

    case "UNLOCK_WORLD":
      return {
        ...state,
        worldUnlocked: true,
        isStageCompleted: true,
      };

    case "RESET_STAGE":
      return {
        ...state,
        currentStage: event.stage,
        stageIndex: PIPELINE_STAGE_ORDER.indexOf(event.stage),
        isStageCompleted: false,
      };

    default:
      return state;
  }
}

export function isPipelineComplete(state: PipelineState): boolean {
  return (
    state.cinematicWatched &&
    state.dialogueCompleted &&
    state.lessonRead &&
    state.challengePassed &&
    state.trialPassed &&
    state.rewardClaimed &&
    state.worldUnlocked
  );
}
