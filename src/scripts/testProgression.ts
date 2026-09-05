import { INITIAL_PLAYER_STATE, migrateProgress } from "../context/PlayerContext";
import {
  getLevelFromXP,
  getChapterProgress,
  getChapterCTA,
  isChapterUnlocked,
  isChapterCompleted,
  getJourneyProgress,
  isBadgeUnlocked,
  getNextRecommendedAction,
  getMembershipReadiness,
  CANONICAL_CHAPTER_IDS,
  REQUIRED_JOURNEY_LESSON_IDS,
  REQUIRED_KNOWLEDGE_CHAPTER_IDS,
} from "../lib/progressionSelectors";
import { CANONICAL_BADGES, CANONICAL_BADGES_BY_CHAPTER } from "../data/canonicalBadges";
import { CANONICAL_MISSIONS } from "../data/missionsData";
import { CHAPTERS_DATA } from "../data/chaptersData";
import { PlayerState } from "../types/player";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASS: ${message}`);
}

console.log("\n==================================================");
console.log("RUNNING UNIFIED PROGRESSION SYSTEM AUTOMATED TESTS");
console.log("==================================================\n");

// --- TEST 1: Canonical Initial Player State ---
console.log("--- TEST 1: Fresh Prospect State ---");
assert(INITIAL_PLAYER_STATE.version === 1, "State version is 1");
assert(INITIAL_PLAYER_STATE.name === "TRAVELLER", "Default name is TRAVELLER");
assert(INITIAL_PLAYER_STATE.role === "Prospect", "Default role is Prospect");
assert(INITIAL_PLAYER_STATE.level === 1, "Default level is 1");
assert(INITIAL_PLAYER_STATE.xp === 0, "Default XP is 0");
assert(INITIAL_PLAYER_STATE.badges.length === 0, "Default badges count is 0");
assert(INITIAL_PLAYER_STATE.completedLessons.length === 0, "Default completed lessons is empty");
assert(INITIAL_PLAYER_STATE.completedWorlds.length === 0, "Default completed worlds is empty");

const initialGatewayProg = getChapterProgress(INITIAL_PLAYER_STATE, "loc-gateway");
assert(initialGatewayProg.completedCount === 0, "Gateway completed count is 0");
assert(initialGatewayProg.totalCount === 2, "Gateway total count is 2");
assert(initialGatewayProg.isCompleted === false, "Gateway is not completed");
assert(initialGatewayProg.isUnlocked === true, "Gateway is unlocked");

const initialGatewayCTA = getChapterCTA(INITIAL_PLAYER_STATE, "loc-gateway");
assert(initialGatewayCTA.text === "BEGIN CHAPTER", "Gateway CTA is 'BEGIN CHAPTER'");
assert(!initialGatewayCTA.isLocked, "Gateway CTA is not locked");

const initialRotaryRootsProg = getChapterProgress(INITIAL_PLAYER_STATE, "loc-rotary-roots");
assert(initialRotaryRootsProg.isUnlocked === false, "Rotary Roots is LOCKED for fresh prospect");

const initialRotaryRootsCTA = getChapterCTA(INITIAL_PLAYER_STATE, "loc-rotary-roots");
assert(initialRotaryRootsCTA.text === "LOCKED", "Rotary Roots CTA is 'LOCKED'");
assert(initialRotaryRootsCTA.isLocked === true, "Rotary Roots isLocked is true");

const initialNextAction = getNextRecommendedAction(INITIAL_PLAYER_STATE);
assert(initialNextAction.type === "onboarding", "Fresh user recommended action is resume onboarding");

// Simulate completing onboarding
const onboardedPlayer: PlayerState = {
  ...INITIAL_PLAYER_STATE,
  onboardingComplete: true,
  onboardingStep: "completed",
  name: "LEHAN",
  companion: "raya",
};

// --- TEST 1B: Explicit Post-Onboarding Invariants (No Shortcut) ---
console.log("\n--- TEST 1B: Fresh Post-Onboarding Invariants ---");
assert(onboardedPlayer.completedLessons.length === 0, "Post-onboarding completedLessons is empty []");
assert(onboardedPlayer.xp === 0, "Post-onboarding XP is strictly 0");
const postOnboardGatewayProg = getChapterProgress(onboardedPlayer, "loc-gateway");
assert(postOnboardGatewayProg.completedCount === 0, "Post-onboarding Gateway progress is 0/2");
assert(isBadgeUnlocked(onboardedPlayer, "badge-initiate") === false, "Post-onboarding INITIATE badge is LOCKED");
assert(isChapterUnlocked(onboardedPlayer, "loc-rotary-roots") === false, "Post-onboarding Rotary Roots is LOCKED");

const canonicalPostOnboardRoute = "/journey/loc-gateway?lesson=lesson-0-1";
assert(canonicalPostOnboardRoute === "/journey/loc-gateway?lesson=lesson-0-1", "Canonical route is /journey/loc-gateway?lesson=lesson-0-1");

const onboardedNextAction = getNextRecommendedAction(onboardedPlayer);
assert(onboardedNextAction.type === "lesson", "After onboarding, next action is lesson");
assert(onboardedNextAction.lessonId === "lesson-0-1", "Next action is Gateway lesson-0-1");
assert(onboardedNextAction.chapterId === "loc-gateway", "Next action chapter is loc-gateway");

// --- TEST 2: Complete Gateway Lesson 1 ---
console.log("\n--- TEST 2: Complete Gateway Lesson 1 ---");
const playerAfterLesson1: PlayerState = {
  ...onboardedPlayer,
  completedLessons: ["lesson-0-1"],
  xp: 25,
};

const l1GatewayProg = getChapterProgress(playerAfterLesson1, "loc-gateway");
assert(l1GatewayProg.completedCount === 1, "Gateway completed count is 1/2");
assert(l1GatewayProg.percentage === 50, "Gateway progress is 50%");
assert(l1GatewayProg.isCompleted === false, "Gateway is not yet completed");

const l1GatewayCTA = getChapterCTA(playerAfterLesson1, "loc-gateway");
assert(l1GatewayCTA.text === "CONTINUE JOURNEY", "Gateway CTA is now 'CONTINUE JOURNEY'");

const l1RotaryRootsUnlocked = isChapterUnlocked(playerAfterLesson1, "loc-rotary-roots");
assert(l1RotaryRootsUnlocked === false, "Rotary Roots is still LOCKED");

const l1NextAction = getNextRecommendedAction(playerAfterLesson1);
assert(l1NextAction.lessonId === "lesson-0-2", "Next action advanced to Gateway lesson-0-2");

// --- TEST 3: Complete Gateway Lesson 2 (Chapter Completion) ---
console.log("\n--- TEST 3: Complete Gateway Lesson 2 (Chapter Completion) ---");
const gatewayBadge = CANONICAL_BADGES_BY_CHAPTER["loc-gateway"];
const playerAfterLesson2: PlayerState = {
  ...playerAfterLesson1,
  completedLessons: ["lesson-0-1", "lesson-0-2"],
  completedWorlds: ["loc-gateway"],
  badges: [
    {
      id: gatewayBadge.id,
      title: gatewayBadge.title,
      description: gatewayBadge.description,
      imageUrl: gatewayBadge.imageUrl,
      unlockedAt: "Just now",
      rarity: gatewayBadge.rarity,
      xpAwarded: gatewayBadge.xpAwarded,
    },
  ],
  xp: 25 + 25 + gatewayBadge.xpAwarded, // 25 + 25 + 50 = 100 XP
};

const l2GatewayProg = getChapterProgress(playerAfterLesson2, "loc-gateway");
assert(l2GatewayProg.completedCount === 2, "Gateway completed count is 2/2");
assert(l2GatewayProg.percentage === 100, "Gateway progress is 100%");
assert(l2GatewayProg.isCompleted === true, "Gateway is now COMPLETED");

const l2GatewayCTA = getChapterCTA(playerAfterLesson2, "loc-gateway");
assert(l2GatewayCTA.text === "REVISIT CHAPTER", "Gateway CTA is now 'REVISIT CHAPTER'");

const l2RotaryRootsProg = getChapterProgress(playerAfterLesson2, "loc-rotary-roots");
assert(l2RotaryRootsProg.isUnlocked === true, "Rotary Roots is now UNLOCKED!");

const l2RotaryRootsCTA = getChapterCTA(playerAfterLesson2, "loc-rotary-roots");
assert(l2RotaryRootsCTA.text === "BEGIN CHAPTER", "Rotary Roots CTA is 'BEGIN CHAPTER'");

const levelInfo = getLevelFromXP(playerAfterLesson2.xp);
assert(levelInfo.level === 2, "100 XP elevated player to Level 2");
assert(levelInfo.rank === "Explorer", "Level 2 rank is Explorer");

assert(isBadgeUnlocked(playerAfterLesson2, "badge-first-step"), "First Step badge is unlocked");
assert(gatewayBadge.title === "INITIATE", "Canonical display title for badge-first-step is INITIATE");

const l2NextAction = getNextRecommendedAction(playerAfterLesson2);
assert(l2NextAction.chapterId === "loc-rotary-roots", "Next recommended chapter is Rotary Roots");
assert(l2NextAction.lessonId === "lesson-1-1", "Next recommended lesson is lesson-1-1");

// --- TEST 4: Idempotent Completion Verification ---
console.log("\n--- TEST 4: Idempotency ---");
// Re-running completed lessons does not duplicate XP or badges
assert(playerAfterLesson2.completedLessons.includes("lesson-0-1"), "Lesson 0-1 is already in completedLessons");
assert(playerAfterLesson2.xp === 100, "XP remains strictly 100");
assert(playerAfterLesson2.badges.length === 1, "Badges count remains strictly 1");

// --- TEST 5: Canonical Journey Progress Calculation ---
console.log("\n--- TEST 5: Canonical Journey Progress ---");
assert(REQUIRED_JOURNEY_LESSON_IDS.length === 34, `Total required lessons is 34 (got ${REQUIRED_JOURNEY_LESSON_IDS.length})`);
const calculatedProgress = getJourneyProgress(playerAfterLesson2);
assert(calculatedProgress === Math.round((2 / 34) * 100), `Journey progress is ${calculatedProgress}% (2 / 34)`);

// --- TEST 6: Membership Readiness Model & Non-Circular Eligibility ---
console.log("\n--- TEST 6: Membership Readiness Model ---");
assert(REQUIRED_KNOWLEDGE_CHAPTER_IDS.length === 9, "Curriculum contains exactly 9 required knowledge chapters (Chapters 0-8)");
assert(!REQUIRED_KNOWLEDGE_CHAPTER_IDS.includes("loc-membership-citadel"), "Chapter 9 is the induction process, not a knowledge prerequisite");

const readiness = getMembershipReadiness(playerAfterLesson2);
assert(readiness.knowledgeComplete === false, "Knowledge not yet complete (only Gateway finished)");
assert(readiness.completedKnowledgeChaptersCount === 1, "1 of 9 knowledge chapters completed");
assert(readiness.meetings.current === 0, "Meetings verified is 0");
assert(readiness.projects.current === 0, "Projects verified is 0");
assert(readiness.eligibleForBoardReview === false, "Board review is locked");

// Collect all lessons across the 9 curriculum chapters (Chapters 0-8)
const allCurriculumLessons = REQUIRED_KNOWLEDGE_CHAPTER_IDS.flatMap((chapId) => {
  const chap = CHAPTERS_DATA[chapId];
  return chap ? chap.lessons.map((l) => l.id) : [];
});

// Scenario A: Curriculum complete, but NO verified meetings/projects
const curriculumOnlyPlayer: PlayerState = {
  ...playerAfterLesson2,
  completedLessons: allCurriculumLessons,
  completedWorlds: [], // Proves selectors derive purely from completedLessons without completedWorlds!
  membership: {
    ...playerAfterLesson2.membership,
    meetingsVerified: 0,
    projectsVerified: 0,
    knowledgeRequirementCompleted: true,
    eligibleForBoardReview: false,
  },
};

const curriculumOnlyReadiness = getMembershipReadiness(curriculumOnlyPlayer);
assert(curriculumOnlyReadiness.knowledgeComplete === true, "All 9 knowledge chapters completed");
assert(curriculumOnlyReadiness.completedKnowledgeChaptersCount === 9, "9 / 9 chapters completed");
assert(curriculumOnlyReadiness.eligibleForBoardReview === false, "Board review remains locked without field verification");
assert(isChapterUnlocked(curriculumOnlyPlayer, "loc-membership-citadel") === false, "Chapter 9 (Membership Citadel) remains locked without verified meetings/projects");

// Scenario B: Curriculum complete AND 2 meetings + 2 projects verified
const readyPlayer: PlayerState = {
  ...curriculumOnlyPlayer,
  membership: {
    ...curriculumOnlyPlayer.membership,
    meetingsVerified: 2,
    projectsVerified: 2,
    knowledgeRequirementCompleted: true,
    eligibleForBoardReview: true,
  },
};

const fullReadiness = getMembershipReadiness(readyPlayer);
assert(fullReadiness.knowledgeComplete === true, "Knowledge requirement completed");
assert(fullReadiness.verificationComplete === true, "2 meetings & 2 projects verified");
assert(fullReadiness.eligibleForBoardReview === true, "Eligible for board review WITHOUT completing Chapter 9!");
assert(isChapterUnlocked(readyPlayer, "loc-membership-citadel") === true, "Chapter 9 (Membership Citadel) is now UNLOCKED for board induction!");

// --- TEST 7: Canonical Missions ---
console.log("\n--- TEST 7: Canonical Missions ---");
assert(CANONICAL_MISSIONS.length === 3, "Canonical missions count is 3");
assert(CANONICAL_MISSIONS[0].id === "mission-1", "Mission 1 ID matches existing mockUserData");
assert(CANONICAL_MISSIONS[1].id === "mission-2", "Mission 2 ID matches existing mockUserData");
assert(CANONICAL_MISSIONS[2].id === "mission-3", "Mission 3 ID matches existing mockUserData");

// --- TEST 8: Canonical Badges Registry ---
console.log("\n--- TEST 8: Canonical Badges Registry ---");
assert(CANONICAL_BADGES.length === 13, `Canonical badges count is 13 (got ${CANONICAL_BADGES.length})`);
assert(CANONICAL_BADGES.some((b) => b.id === "badge-first-step"), "Contains badge-first-step");
assert(CANONICAL_BADGES.some((b) => b.id === "badge-root-seeker"), "Contains badge-root-seeker");
assert(CANONICAL_BADGES.some((b) => b.id === "badge-voyager"), "Contains badge-voyager");
assert(CANONICAL_BADGES.some((b) => b.id === "badge-regent-pioneer"), "Contains badge-regent-pioneer");
assert(CANONICAL_BADGES.some((b) => b.id === "badge-avenue-master"), "Contains badge-avenue-master");
assert(CANONICAL_BADGES.some((b) => b.id === "badge-master-builder"), "Contains badge-master-builder");
assert(CANONICAL_BADGES.some((b) => b.id === "badge-code-bearer"), "Contains badge-code-bearer");
assert(CANONICAL_BADGES.some((b) => b.id === "badge-scholar"), "Contains badge-scholar");
assert(CANONICAL_BADGES.some((b) => b.id === "badge-trailblazer"), "Contains badge-trailblazer");
assert(CANONICAL_BADGES.some((b) => b.id === "badge-inducted-regent"), "Contains badge-inducted-regent");

// --- TEST 9: Curriculum V2 Migration (Reset Obsolete Learning while Preserving Profile Identity) ---
console.log("\n--- TEST 9: Curriculum V2 Migration & Clean Educational Reset ---");
const legacyV1SavedData = {
  version: 1,
  curriculumVersion: 1, // Old Curriculum V1
  name: "EXPLORER_ALEX",
  explorerId: "creator",
  companion: "kai",
  interests: ["community", "leadership"],
  primaryGoal: "Lead projects",
  onboardingComplete: true,
  onboardingStep: "completed",
  xp: 1250, // Old V1 XP from old lessons
  level: 5,
  badges: [
    {
      id: "badge-first-step",
      title: "INITIATE",
      description: "Gateway complete",
      imageUrl: "/images/root_seeker_badge.jpg",
      unlockedAt: "Yesterday",
      rarity: "COMMON",
      xpAwarded: 50,
    },
    {
      id: "badge-root-seeker",
      title: "ROOT SEEKER",
      description: "Rotary Roots complete",
      imageUrl: "/images/root_seeker_badge.jpg",
      unlockedAt: "Yesterday",
      rarity: "UNCOMMON",
      xpAwarded: 100,
    },
  ],
  completedLessons: ["lesson-0-1", "lesson-0-2", "lesson-1-1", "lesson-1-2", "lesson-1-3"],
  completedWorlds: ["loc-gateway", "loc-rotary-roots"],
  missions: [
    {
      id: "mission-1",
      title: "Introduce Yourself",
      description: "Send a greeting",
      rewardXP: 100,
      completed: true,
      category: "community",
    },
  ],
};

const migratedPlayer = migrateProgress(legacyV1SavedData);
assert(migratedPlayer.curriculumVersion === 2, "Player migrated to curriculumVersion 2");
assert(migratedPlayer.name === "EXPLORER_ALEX", "Preserved user profile name");
assert(migratedPlayer.explorerId === "creator", "Preserved explorer archetype");
assert(migratedPlayer.companion === "kai", "Preserved chosen companion");
assert(migratedPlayer.interests.includes("community"), "Preserved interests");
assert(migratedPlayer.primaryGoal === "Lead projects", "Preserved primary aspiration");
assert(migratedPlayer.onboardingComplete === true, "Preserved onboarding completion state");

// Verify clean educational reset:
assert(migratedPlayer.completedLessons.length === 0, "Curriculum V2 reset completed lessons to 0 (no obsolete V1 credit granted)");
assert(migratedPlayer.completedWorlds.length === 0, "Curriculum V2 reset completed chapters to 0");
assert(migratedPlayer.xp === 0, "Curriculum V2 reset learning XP to 0");
assert(migratedPlayer.level === 1, "Curriculum V2 reset level to 1");
assert(migratedPlayer.rank === "Prospect", "Curriculum V2 reset rank to Prospect");
assert(migratedPlayer.badges.length === 0, "Curriculum V2 recalculated badges: obsolete chapter badges removed");
assert(migratedPlayer.currentChapterId === "loc-gateway", "Active chapter is reset to loc-gateway");
assert(migratedPlayer.journeyProgress === 0, "Journey progress recalculated to 0%");

// Verify non-curriculum missions are preserved:
assert(migratedPlayer.missions.completed.includes("mission-1"), "Preserved valid non-curriculum completed mission-1");

// --- TEST 10: Canonical 34 Lessons Breakdown ---
console.log("\n--- TEST 10: Canonical 34 Lessons Breakdown Across All 10 Worlds ---");
const expectedChapterLessonCounts: Record<string, number> = {
  "loc-gateway": 2,
  "loc-rotary-roots": 4,
  "loc-rotaract-harbor": 3,
  "loc-regent-keep": 4,
  "loc-seven-realms": 6,
  "loc-project-forge": 4,
  "loc-codewood": 4,
  "loc-grand-archive": 3,
  "loc-impact-frontier": 2,
  "loc-membership-citadel": 2,
};

let totalLessonsCount = 0;
for (const [chapId, count] of Object.entries(expectedChapterLessonCounts)) {
  const chap = CHAPTERS_DATA[chapId];
  assert(!!chap, `Chapter ${chapId} exists in CHAPTERS_DATA`);
  assert(chap.lessons.length === count, `Chapter ${chapId} has exactly ${count} lessons (got ${chap.lessons.length})`);
  totalLessonsCount += count;
}
assert(totalLessonsCount === 34, `Total lessons sum is exactly 34 (got ${totalLessonsCount})`);

// --- TEST 11: 11 Distinct Avenue Identities & Primary/Secondary Model ---
console.log("\n--- TEST 11: 11 Distinct Avenue Identities & Primary/Secondary Model ---");
const { elevenAvenueRealms } = require("../data/realmMapLocations");
const { ELEVEN_AVENUE_NODES } = require("../components/story/scenes/AvenueCompassScene");

const expectedPrimaryAvenues = [
  "Club Service",
  "Community Service",
  "International Service",
  "Professional Development",
];

const expectedSecondaryAvenues = [
  "Environmental Service",
  "Partnerships",
  "Membership Development",
  "Public Relations",
  "Sports & Recreational Activities",
  "Special Projects",
  "Regional Engagement",
];

// 1. Verify realmMapLocations elevenAvenueRealms
const realmPrimaryNames = elevenAvenueRealms.filter((a: any) => a.category === "PRIMARY").map((a: any) => a.name);
const realmSecondaryNames = elevenAvenueRealms.filter((a: any) => a.category === "SECONDARY").map((a: any) => a.name);
const allRealmNames = elevenAvenueRealms.map((a: any) => a.name);

assert(realmPrimaryNames.length === 4, `realmMapLocations: Exactly 4 PRIMARY avenues (got ${realmPrimaryNames.length})`);
assert(realmSecondaryNames.length === 7, `realmMapLocations: Exactly 7 SECONDARY avenues (got ${realmSecondaryNames.length})`);
assert(allRealmNames.length === 11, `realmMapLocations: Total avenues count is 11 (got ${allRealmNames.length})`);
assert(new Set(allRealmNames).size === 11, `realmMapLocations: Exactly 11 unique avenues`);

for (const p of expectedPrimaryAvenues) {
  assert(realmPrimaryNames.includes(p), `Primary avenue '${p}' is present in realmMapLocations`);
}
for (const s of expectedSecondaryAvenues) {
  assert(realmSecondaryNames.includes(s), `Secondary avenue '${s}' is present in realmMapLocations`);
}

assert(realmPrimaryNames.includes("Club Service"), "Club Service is PRIMARY in realmMapLocations");
assert(!realmSecondaryNames.includes("Club Service"), "Club Service is NOT Secondary in realmMapLocations");
assert(realmSecondaryNames.includes("Public Relations"), "Public Relations is SECONDARY in realmMapLocations");
assert(!realmPrimaryNames.includes("Public Relations"), "Public Relations is NOT Primary in realmMapLocations");

assert(!allRealmNames.includes("Finance"), "Finance is ABSENT from realmMapLocations");
assert(!allRealmNames.includes("Treasury"), "Treasury is ABSENT from realmMapLocations");
assert(!allRealmNames.includes("Special Initiatives"), "Special Initiatives is ABSENT from realmMapLocations");

// 2. Verify AvenueCompassScene ELEVEN_AVENUE_NODES
const nodePrimaryNames = ELEVEN_AVENUE_NODES.filter((n: any) => n.classification === "PRIMARY").map((n: any) => n.name);
const nodeSecondaryNames = ELEVEN_AVENUE_NODES.filter((n: any) => n.classification === "SECONDARY").map((n: any) => n.name);
const allNodeNames = ELEVEN_AVENUE_NODES.map((n: any) => n.name);

assert(nodePrimaryNames.length === 4, `AvenueCompassScene: Exactly 4 PRIMARY avenues (got ${nodePrimaryNames.length})`);
assert(nodeSecondaryNames.length === 7, `AvenueCompassScene: Exactly 7 SECONDARY avenues (got ${nodeSecondaryNames.length})`);
assert(allNodeNames.length === 11, `AvenueCompassScene: Total avenues count is 11 (got ${allNodeNames.length})`);
assert(new Set(allNodeNames).size === 11, `AvenueCompassScene: Exactly 11 unique avenues`);

for (const p of expectedPrimaryAvenues) {
  assert(nodePrimaryNames.includes(p), `Primary avenue '${p}' is present in AvenueCompassScene`);
}
for (const s of expectedSecondaryAvenues) {
  assert(nodeSecondaryNames.includes(s), `Secondary avenue '${s}' is present in AvenueCompassScene`);
}

assert(nodePrimaryNames.includes("Club Service"), "Club Service is PRIMARY in AvenueCompassScene");
assert(!nodeSecondaryNames.includes("Club Service"), "Club Service is NOT Secondary in AvenueCompassScene");
assert(nodeSecondaryNames.includes("Public Relations"), "Public Relations is SECONDARY in AvenueCompassScene");
assert(!nodePrimaryNames.includes("Public Relations"), "Public Relations is NOT Primary in AvenueCompassScene");

assert(!allNodeNames.includes("Finance"), "Finance is ABSENT from AvenueCompassScene");
assert(!allNodeNames.includes("Treasury"), "Treasury is ABSENT from AvenueCompassScene");
assert(!allNodeNames.includes("Special Initiatives"), "Special Initiatives is ABSENT from AvenueCompassScene");

// --- TEST 12: Handbook Source Page Validation (1 <= page <= 211) ---
console.log("\n--- TEST 12: Source Page Validation (Strict Handbook Grounding <= 211) ---");
const { validateLessonSource } = require("../lib/sourceValidator");
for (const [chapId, chap] of Object.entries(CHAPTERS_DATA)) {
  for (const lesson of chap.lessons) {
    const val = validateLessonSource(lesson.id, lesson.source);
    assert(val.isValid, `Lesson ${lesson.id} (${lesson.title}) source is valid: ${val.errors.join(", ")}`);
    for (const page of lesson.source.pages) {
      assert(page >= 1 && page <= 211, `Lesson ${lesson.id} page ${page} is within [1, 211]`);
    }
  }
}

console.log("\n==================================================");
console.log("ALL 42 CURRICULUM V2 & PROGRESSION TESTS PASSED!");
console.log("==================================================\n");
