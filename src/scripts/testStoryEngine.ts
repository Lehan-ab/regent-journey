import {
  PIPELINE_STAGE_ORDER,
  createInitialPipelineState,
  reducePipelineState,
  isPipelineComplete,
  CHAPTER_0_GATEWAY,
  getStoryChapter,
  validateScenarioChoice,
  validateProtocolOrder,
  adaptStoryChapterToLegacy,
  adaptStoryLessonToLegacy,
} from "../story";

console.log("==================================================");
console.log("RUNNING REGENT JOURNEY STORY ENGINE ARCHITECTURE TESTS");
console.log("==================================================");

let testsPassed = 0;
let testsFailed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    testsPassed++;
  } else {
    console.error(`❌ FAIL: ${message}`);
    testsFailed++;
  }
}

// ----------------------------------------------------
// 1. PIPELINE STAGES & TRANSITIONS
// ----------------------------------------------------
console.log("\n[1/5] Auditing 7-Step Pipeline Contract...");
assert(PIPELINE_STAGE_ORDER.length === 7, "Pipeline contains exactly 7 stages");
assert(PIPELINE_STAGE_ORDER[0] === "CINEMATIC_INTRO", "Stage 1 is CINEMATIC_INTRO");
assert(PIPELINE_STAGE_ORDER[1] === "SCENE_STAGE", "Stage 2 is SCENE_STAGE");
assert(PIPELINE_STAGE_ORDER[2] === "LESSON_CONTENT", "Stage 3 is LESSON_CONTENT");
assert(PIPELINE_STAGE_ORDER[3] === "INTERACTIVE_CHALLENGE", "Stage 4 is INTERACTIVE_CHALLENGE");
assert(PIPELINE_STAGE_ORDER[4] === "KNOWLEDGE_TRIAL", "Stage 5 is KNOWLEDGE_TRIAL");
assert(PIPELINE_STAGE_ORDER[5] === "REWARD_CEREMONY", "Stage 6 is REWARD_CEREMONY");
assert(PIPELINE_STAGE_ORDER[6] === "WORLD_UNLOCK", "Stage 7 is WORLD_UNLOCK");

// ----------------------------------------------------
// 2. STATE MACHINE EXECUTION
// ----------------------------------------------------
console.log("\n[2/5] Testing Pipeline State Machine Transitions...");
let state = createInitialPipelineState("loc-gateway", "lesson-0-1");
assert(state.currentStage === "CINEMATIC_INTRO", "Initial stage is CINEMATIC_INTRO");
assert(state.history.length === 1, "History has initial entry");

state = reducePipelineState(state, { type: "COMPLETE_CINEMATIC" });
assert(state.currentStage === "SCENE_STAGE", "Advances to SCENE_STAGE after cinematic");
assert(state.cinematicWatched === true, "cinematicWatched is marked true");

state = reducePipelineState(state, { type: "ENTER_SCENE", sceneId: "scene-gateway-threshold" });
assert(state.sceneInitialized === true, "Scene is initialized");

state = reducePipelineState(state, { type: "FINISH_DIALOGUE" });
assert(state.dialogueCompleted === true, "Dialogue completed");

state = reducePipelineState(state, { type: "FINISH_LESSON_READING" });
assert(state.currentStage === "INTERACTIVE_CHALLENGE", "Advances to INTERACTIVE_CHALLENGE");
assert(state.lessonRead === true, "lessonRead is marked true");

state = reducePipelineState(state, { type: "SUBMIT_CHALLENGE", isCorrect: true });
assert(state.currentStage === "KNOWLEDGE_TRIAL", "Advances to KNOWLEDGE_TRIAL on challenge success");
assert(state.challengePassed === true, "challengePassed is marked true");

state = reducePipelineState(state, { type: "SUBMIT_TRIAL", isCorrect: true });
assert(state.currentStage === "REWARD_CEREMONY", "Advances to REWARD_CEREMONY on trial success");
assert(state.trialPassed === true, "trialPassed is marked true");

state = reducePipelineState(state, { type: "CLAIM_REWARD" });
assert(state.currentStage === "WORLD_UNLOCK", "Advances to WORLD_UNLOCK after reward claim");
assert(state.rewardClaimed === true, "rewardClaimed is marked true");

state = reducePipelineState(state, { type: "UNLOCK_WORLD", nextChapterId: "loc-rotary-roots" });
assert(state.worldUnlocked === true, "worldUnlocked is marked true");
assert(isPipelineComplete(state), "Full pipeline passes isPipelineComplete check");

// ----------------------------------------------------
// 3. REFERENCE CHAPTER 0 AUDIT
// ----------------------------------------------------
console.log("\n[3/5] Auditing Reference Chapter 0: The Gateway...");
const chapter0 = getStoryChapter("chapter-0");
assert(!!chapter0, "Chapter 0 retrieved from registry");
assert(chapter0?.chapterNumber === 0, "Chapter 0 has chapterNumber 0");
assert(chapter0?.chapterTitle === "The Gateway", "Chapter title is 'The Gateway'");
assert(chapter0?.lessons.length === 2, "Chapter 0 contains 2 lessons");

// Lesson 0-1
const l1 = chapter0?.lessons[0];
assert(l1?.id === "lesson-0-1", "Lesson 1 ID is lesson-0-1");
assert(l1?.interactiveChallenge?.id === "challenge-gateway-orientation", "Lesson 1 has interactive challenge");
assert(l1?.dialogue.beats.length === 5, "Lesson 1 has 5 dialogue beats");
assert(Boolean(l1?.source.pages.every((p) => p <= 211)), "Lesson 1 sources within handbook page limit (<=211)");

// Lesson 0-2
const l2 = chapter0?.lessons[1];
assert(l2?.id === "lesson-0-2", "Lesson 2 ID is lesson-0-2");
assert(l2?.interactiveChallenge?.id === "challenge-gateway-four-way-test", "Lesson 2 has 4-Way Test challenge");
assert(Boolean(l2?.source.pages.every((p) => p <= 211)), "Lesson 2 sources within handbook page limit (<=211)");

// ----------------------------------------------------
// 4. INTERACTIVE CHALLENGE VALIDATION
// ----------------------------------------------------
console.log("\n[4/5] Testing Interactive Challenge Evaluators...");
if (l1?.interactiveChallenge) {
  const goodChoice = validateScenarioChoice(l1.interactiveChallenge, "opt-assess-first");
  assert(goodChoice.isCorrect === true, "Scenario recommended option evaluates as correct");

  const badChoice = validateScenarioChoice(l1.interactiveChallenge, "opt-rush-publicity");
  assert(badChoice.isCorrect === false, "Scenario non-recommended option evaluates as false");
}

if (l2?.interactiveChallenge?.protocolSteps) {
  const correctOrder = ["step-truth", "step-fair", "step-goodwill", "step-beneficial"];
  const isOrderValid = validateProtocolOrder(l2.interactiveChallenge.protocolSteps, correctOrder);
  assert(isOrderValid === true, "Four-Way Test correct sequence validated");

  const wrongOrder = ["step-beneficial", "step-truth", "step-fair", "step-goodwill"];
  const isWrongOrderValid = validateProtocolOrder(l2.interactiveChallenge.protocolSteps, wrongOrder);
  assert(isWrongOrderValid === false, "Incorrect Four-Way Test sequence rejected");
}

// ----------------------------------------------------
// 5. LEGACY ADAPTER COMPATIBILITY
// ----------------------------------------------------
console.log("\n[5/5] Testing Legacy Compatibility Bridge...");
const legacyChapter = adaptStoryChapterToLegacy(CHAPTER_0_GATEWAY);
assert(legacyChapter.id === "chapter-0", "Adapted chapter ID matches");
assert(legacyChapter.chapterTitle === "The Gateway", "Adapted chapterTitle matches");
assert(legacyChapter.lessons.length === 2, "Adapted chapter has 2 lessons");

const legacyLesson1 = adaptStoryLessonToLegacy(CHAPTER_0_GATEWAY.lessons[0]);
assert(legacyLesson1.id === "lesson-0-1", "Adapted lesson ID matches");
assert(legacyLesson1.scriptedDialogue.length === 5, "Adapted lesson preserves dialogue beats");
assert(legacyLesson1.sections.length === 2, "Adapted lesson preserves codex sections");
assert(legacyLesson1.knowledgeCheck?.options.length === 4, "Adapted lesson preserves knowledgeCheck options");
assert(legacyLesson1.sceneConfig.sceneType === "portal", "Adapted lesson preserves sceneConfig sceneType");

// ----------------------------------------------------
// SUMMARY
// ----------------------------------------------------
console.log("\n==================================================");
console.log(`TOTAL PASSED: ${testsPassed}`);
console.log(`TOTAL FAILED: ${testsFailed}`);
console.log("==================================================");

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log("🎉 ALL STORY ENGINE ARCHITECTURE TESTS PASSED!\n");
  process.exit(0);
}
