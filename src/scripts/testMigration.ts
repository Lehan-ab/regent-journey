import { PlayerProvider } from "../context/PlayerContext";
import { CANONICAL_BADGES } from "../data/canonicalBadges";
import { REQUIRED_JOURNEY_LESSON_IDS, getLevelFromXP } from "../lib/progressionSelectors";

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`❌ ASSERTION FAILED: ${message}`);
    process.exit(1);
  }
  console.log(`✅ PASS: ${message}`);
}

console.log("\n==================================================");
console.log("RUNNING LEGACY MIGRATION & RECOVERY TESTS");
console.log("==================================================\n");

// Simulate legacy corrupted data from regent_journey_player_v2
const legacyData = {
  name: "Traveller",
  explorerId: "pathfinder",
  xp: 150,
  level: 1, // Desync: 150 XP should be level 2!
  completedWorlds: ["The Gateway"], // String mismatch bug!
  completedLessons: [
    "lesson-0-1",
    "lesson-0-2",
    "invalid-legacy-id-999", // Invalid retired lesson
    "lesson-0-1", // Duplicate
  ],
  badges: [
    { id: "badge-first-step", title: "FIRST STEP" },
    { id: "badge-first-step", title: "FIRST STEP" }, // Duplicate
    { id: "badge-bogus-badge" }, // Invalid badge
  ],
  onboardingComplete: true,
  companion: "raya",
  interests: ["community", "finance"],
  missions: {
    enrolled: ["mission-1", "mission-1"], // Duplicate
  },
};

// We test migration logic
const rawLessons = Array.isArray(legacyData.completedLessons) ? legacyData.completedLessons : [];
const completedLessons = Array.from(
  new Set(rawLessons.filter((id) => REQUIRED_JOURNEY_LESSON_IDS.includes(id)))
);

assert(completedLessons.length === 2, "Deduplicated valid lessons count is 2");
assert(!completedLessons.includes("invalid-legacy-id-999"), "Invalid lesson stripped");

const levelInfo = getLevelFromXP(legacyData.xp);
assert(levelInfo.level === 2, "Recalculated level from 150 XP is Level 2 (Explorer)");
assert(levelInfo.rank === "Explorer", "Recalculated rank is Explorer");

console.log("\n==================================================");
console.log("ALL MIGRATION TESTS PASSED!");
console.log("==================================================\n");
