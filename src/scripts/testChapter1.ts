import { CHAPTER_1_HIDDEN_GATEWAY } from "../story/chapters/chapter1";
import { getStoryChapter } from "../story/chapters/registry";
import { adaptStoryChapterToLegacy } from "../story/adapters/legacyAdapter";
import { personalizeDialogue } from "../lib/dialoguePersonalizer";
import { validateScenarioChoice, validateProtocolOrder } from "../story/interactions/registry";
import { INITIAL_PLAYER_STATE } from "../context/PlayerContext";
import { isChapterUnlocked, isChapterCompleted } from "../lib/progressionSelectors";
import { PlayerState } from "../types/player";

console.log("==================================================");
console.log("TESTING CHAPTER 1: THE HIDDEN GATEWAY FULL FLOW");
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
// 1. CHAPTER 1 METADATA & ARCHITECTURE
// ----------------------------------------------------
console.log("\n[1/6] Auditing Chapter 1 Metadata...");
const chapter1 = getStoryChapter("chapter-1");
assert(!!chapter1, "Chapter 1 is registered in Story Engine registry");
assert(chapter1?.chapterTitle === "The Hidden Gateway", "Title is 'The Hidden Gateway'");
assert(chapter1?.chapterNumber === 1, "Chapter number is 1");
assert(chapter1?.lessons.length === 3, "Chapter 1 contains exactly 3 lessons");

// ----------------------------------------------------
// 2. LESSONS AND PIPELINE STAGES
// ----------------------------------------------------
console.log("\n[2/6] Auditing Chapter 1 Lessons & 7-Step Pipeline Elements...");
const l1 = chapter1?.lessons[0];
const l2 = chapter1?.lessons[1];
const l3 = chapter1?.lessons[2];

// Lesson 1: The First Step
assert(l1?.title === "The First Step", "Lesson 1 is 'The First Step'");
assert(!!l1?.scene, "Lesson 1 has scene defined");
assert(!!l1?.dialogue, "Lesson 1 has dialogue defined");
assert(l1?.dialogue.beats.length === 5, "Lesson 1 has 5 dialogue beats");
assert(!!l1?.interactiveChallenge, "Lesson 1 has interactive challenge");
assert(l1?.interactiveChallenge?.type === "scenario-dilemma", "Lesson 1 challenge is scenario-dilemma");
assert(!!l1?.knowledgeTrial, "Lesson 1 has knowledge trial");
assert(l1?.reward.xp === 25, "Lesson 1 awards 25 XP");
assert(Boolean(l1?.source.pages.every((p) => p <= 211)), "Lesson 1 source pages within handbook limit (<=211)");

// Lesson 2: The Meaning Behind The Journey
assert(l2?.title === "The Meaning Behind The Journey", "Lesson 2 is 'The Meaning Behind The Journey'");
assert(!!l2?.scene, "Lesson 2 has scene defined");
assert(!!l2?.dialogue, "Lesson 2 has dialogue defined");
assert(!!l2?.interactiveChallenge, "Lesson 2 has interactive challenge");
assert(l2?.interactiveChallenge?.type === "scenario-dilemma", "Lesson 2 challenge is scenario-dilemma");
assert(!!l2?.knowledgeTrial, "Lesson 2 has knowledge trial");
assert(l2?.reward.xp === 25, "Lesson 2 awards 25 XP");
assert(Boolean(l2?.source.pages.every((p) => p <= 211)), "Lesson 2 source pages within handbook limit (<=211)");

// Lesson 3: The Explorer's Promise
assert(l3?.title === "The Explorer's Promise", "Lesson 3 is 'The Explorer's Promise'");
assert(!!l3?.scene, "Lesson 3 has scene defined");
assert(!!l3?.dialogue, "Lesson 3 has dialogue defined");
assert(!!l3?.interactiveChallenge, "Lesson 3 has interactive challenge");
assert(l3?.interactiveChallenge?.type === "protocol-order", "Lesson 3 challenge is protocol-order (Four-Way Test)");
assert(!!l3?.knowledgeTrial, "Lesson 3 has knowledge trial");
assert(l3?.reward.xp === 25, "Lesson 3 awards 25 XP");
assert(Boolean(l3?.source.pages.every((p) => p <= 211)), "Lesson 3 source pages within handbook limit (<=211)");

// ----------------------------------------------------
// 3. REWARD & UNLOCK DESTINATION
// ----------------------------------------------------
console.log("\n[3/6] Auditing Chapter 1 Rewards & World Unlock...");
assert(chapter1?.completionReward.xp === 50, "Chapter completion awards 50 XP bounty");
assert(chapter1?.completionReward.badgeId === "INITIATE", "Awards INITIATE badge");
assert(chapter1?.completionReward.unlockedWorldId === "loc-rotaract-harbor", "Unlocks 'loc-rotaract-harbor' (The River of Legacy)");
assert(chapter1?.completionCinematic.unlockedWorldName === "The River of Legacy", "Completion cinematic announces The River of Legacy");

// ----------------------------------------------------
// 4. DYNAMIC PLAYER NAME PERSONALIZATION
// ----------------------------------------------------
console.log("\n[4/6] Testing Dynamic Player Name Personalization...");
const testName = "Kasun";
const rawBeatText = "Welcome to the threshold, {name}!";
const personalized = personalizeDialogue(rawBeatText, { name: testName });
assert(personalized === "Welcome to the threshold, Kasun!", "Player name replaced in dialogue text");

// Companion variants with name
const novaVariant = l1?.dialogue.beats[2]?.companionVariants?.nova || "";
const personalizedNova = personalizeDialogue(novaVariant, { name: testName });
assert(personalizedNova.includes("Kasun"), "Nova dialogue addresses player as 'Kasun'");
assert(!personalizedNova.includes("Chief"), "Nova dialogue contains zero 'Chief'");

const rayaVariant = l1?.dialogue.beats[2]?.companionVariants?.raya || "";
const personalizedRaya = personalizeDialogue(rayaVariant, { name: testName });
assert(personalizedRaya.includes("Kasun"), "Raya dialogue addresses player as 'Kasun'");
assert(!personalizedRaya.includes("Chief"), "Raya dialogue contains zero 'Chief'");

const kaiVariant = l1?.dialogue.beats[2]?.companionVariants?.kai || "";
const personalizedKai = personalizeDialogue(kaiVariant, { name: testName });
assert(personalizedKai.includes("Kasun"), "Kai dialogue addresses player as 'Kasun'");
assert(!personalizedKai.includes("Chief"), "Kai dialogue contains zero 'Chief'");

// ----------------------------------------------------
// 5. INTERACTIVE CHALLENGE EVALUATORS
// ----------------------------------------------------
console.log("\n[5/6] Testing Interactive Challenges...");
if (l1?.interactiveChallenge) {
  const good = validateScenarioChoice(l1.interactiveChallenge, "opt-serve-learn");
  assert(good.isCorrect === true, "Lesson 1: 'Serve & Learn Selflessly' evaluates as recommended");

  const bad = validateScenarioChoice(l1.interactiveChallenge, "opt-social-badge");
  assert(bad.isCorrect === false, "Lesson 1: 'Collect Quick Badges' evaluates as not recommended");
}

if (l2?.interactiveChallenge) {
  const good = validateScenarioChoice(l2.interactiveChallenge, "opt-sustainable-water");
  assert(good.isCorrect === true, "Lesson 2: 'Prioritize Community Water Filtration' evaluates as recommended");

  const bad = validateScenarioChoice(l2.interactiveChallenge, "opt-lavish-party");
  assert(bad.isCorrect === false, "Lesson 2: 'Spend Everything on the Party' evaluates as not recommended");
}

if (l3?.interactiveChallenge?.protocolSteps) {
  const correctOrder = ["step-truth", "step-fair", "step-goodwill", "step-beneficial"];
  const isValid = validateProtocolOrder(l3.interactiveChallenge.protocolSteps, correctOrder);
  assert(isValid === true, "Lesson 3: Correct Four-Way Test sequence passes validation");

  const wrongOrder = ["step-goodwill", "step-truth", "step-beneficial", "step-fair"];
  const isWrongValid = validateProtocolOrder(l3.interactiveChallenge.protocolSteps, wrongOrder);
  assert(isWrongValid === false, "Lesson 3: Incorrect Four-Way Test sequence rejected");
}

// ----------------------------------------------------
// 6. PROGRESSION & RIVER OF LEGACY UNLOCK
// ----------------------------------------------------
console.log("\n[6/6] Testing Progression Simulation & River of Legacy Unlock...");

// Fresh player: Chapter 1 is unlocked by default
assert(isChapterUnlocked(INITIAL_PLAYER_STATE, "chapter-1") === true, "Chapter 1 is unlocked for fresh prospect");
assert(isChapterUnlocked(INITIAL_PLAYER_STATE, "loc-rotaract-harbor") === false, "River of Legacy is LOCKED before Chapter 1");

// Simulate completing lessons 1, 2, and 3
const playerAfterL1: PlayerState = {
  ...INITIAL_PLAYER_STATE,
  name: "Kasun",
  completedLessons: ["lesson-1-1"],
  xp: 25,
};
assert(isChapterCompleted(playerAfterL1, "chapter-1") === false, "Chapter 1 incomplete after lesson 1");

const playerAfterL2: PlayerState = {
  ...playerAfterL1,
  completedLessons: ["lesson-1-1", "lesson-1-2"],
  xp: 50,
};
assert(isChapterCompleted(playerAfterL2, "chapter-1") === false, "Chapter 1 incomplete after lesson 2");

const playerAfterL3: PlayerState = {
  ...playerAfterL2,
  completedLessons: ["lesson-1-1", "lesson-1-2", "lesson-1-3"],
  completedWorlds: ["chapter-1"],
  xp: 75 + 50, // 3 lessons + 50 XP chapter bounty = 125 XP
};
assert(isChapterCompleted(playerAfterL3, "chapter-1") === true, "Chapter 1 is COMPLETED after lesson 3");

// Verify River of Legacy unlocks upon Chapter 1 completion!
const isRiverUnlocked = isChapterUnlocked(playerAfterL3, "loc-rotaract-harbor");
assert(isRiverUnlocked === true, "🎉 The River of Legacy (loc-rotaract-harbor) is UNLOCKED!");

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
  console.log("🎉 ALL CHAPTER 1 FLOW TESTS PASSED!\n");
  process.exit(0);
}
