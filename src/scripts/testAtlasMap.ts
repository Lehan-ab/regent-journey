/**
 * testAtlasMap.ts
 *
 * Comprehensive automated test suite for THE REGENT REALM ATLAS:
 * 1. 8 Canonical Atlas Locations audit (IDs, names, sequence 1-8, coords, fog descriptions, golden emblems).
 * 2. Dynamic 3-State Simulation (LOCKED with fog of war, UNLOCKED active expedition, COMPLETED golden emblem).
 * 3. Backward compatibility verification with legacy progression and chapter adapters.
 */

import {
  atlasLocations,
  realmLocations,
  RealmLocation,
} from "../data/realmMapLocations";
import { PlayerState } from "../types/player";
import { INITIAL_PLAYER_STATE } from "../context/PlayerContext";
import {
  isChapterUnlocked,
  isChapterCompleted,
} from "../lib/progressionSelectors";

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

console.log("==================================================");
console.log("TESTING THE REGENT REALM ATLAS MAP SYSTEM");
console.log("==================================================");

// ----------------------------------------------------
// 1. AUDITING 8 CANONICAL ATLAS LOCATIONS
// ----------------------------------------------------
console.log("\n[1/4] Auditing 8 Canonical Atlas Locations...");
assert(atlasLocations.length === 8, "atlasLocations contains exactly 8 canonical locations");

const EXPECTED_8_LOCATIONS = [
  { index: 1, id: "loc-gateway", name: "Hidden Gateway" },
  { index: 2, id: "loc-rotaract-harbor", name: "River of Legacy" },
  { index: 3, id: "loc-regent-keep", name: "Harbor of Connections" },
  { index: 4, id: "loc-seven-realms", name: "Seven Realms Nexus" },
  { index: 5, id: "loc-project-forge", name: "Project Forge" },
  { index: 6, id: "loc-grand-archive", name: "Grand Archive" },
  { index: 7, id: "loc-impact-frontier", name: "Impact Frontier" },
  { index: 8, id: "loc-membership-citadel", name: "Regent Citadel" },
];

EXPECTED_8_LOCATIONS.forEach((expected, i) => {
  const loc = atlasLocations[i];
  assert(loc?.atlasIndex === expected.index, `Step ${expected.index} is ${expected.name} (index matches)`);
  assert(loc?.id === expected.id, `Step ${expected.index} ID is ${expected.id}`);
  assert(loc?.atlasName === expected.name, `Step ${expected.index} atlasName is '${expected.name}'`);
  assert(!!loc?.coords && loc.coords.x > 0 && loc.coords.y > 0, `Step ${expected.index} has valid coordinates ({x: ${loc?.coords?.x}, y: ${loc?.coords?.y}})`);
  assert(typeof loc?.fogDescription === "string" && loc.fogDescription.length > 10, `Step ${expected.index} has rich fog description`);
  assert(typeof loc?.goldenEmblemTitle === "string" && loc.goldenEmblemTitle.length > 5, `Step ${expected.index} has golden emblem title ('${loc?.goldenEmblemTitle}')`);
});

// ----------------------------------------------------
// 2. TESTING STATE EVALUATION: FRESH PROSPECT
// ----------------------------------------------------
console.log("\n[2/4] Testing Fresh Prospect Atlas States...");

function resolveAtlasStatus(loc: RealmLocation, player: PlayerState): "COMPLETED" | "CURRENT" | "LOCKED" {
  const isCompleted =
    isChapterCompleted(player, loc.id) ||
    (loc.id === "loc-gateway" && isChapterCompleted(player, "chapter-1"));
  const isUnlocked =
    isChapterUnlocked(player, loc.id) ||
    (loc.id === "loc-gateway" && isChapterUnlocked(player, "chapter-1"));

  if (isCompleted) return "COMPLETED";
  if (isUnlocked) return "CURRENT";
  return "LOCKED";
}

const freshPlayer: PlayerState = {
  ...INITIAL_PLAYER_STATE,
  completedLessons: [],
  completedWorlds: [],
};

const freshGatewayStatus = resolveAtlasStatus(atlasLocations[0], freshPlayer);
assert(freshGatewayStatus === "CURRENT", "Fresh player: Hidden Gateway is UNLOCKED/CURRENT");

for (let i = 1; i < atlasLocations.length; i++) {
  const loc = atlasLocations[i];
  const status = resolveAtlasStatus(loc, freshPlayer);
  assert(status === "LOCKED", `Fresh player: ${loc.atlasName} is LOCKED (fogbound)`);
}

// ----------------------------------------------------
// 3. TESTING STATE TRANSITIONS: CHAPTER 1 & 2 COMPLETIONS
// ----------------------------------------------------
console.log("\n[3/4] Testing Progression Transitions & Unlocks...");

// Player completes Chapter 1
const playerAfterCh1: PlayerState = {
  ...freshPlayer,
  completedLessons: ["lesson-1-1", "lesson-1-2", "lesson-1-3"],
  completedWorlds: ["chapter-1"],
};

const ch1GatewayStatus = resolveAtlasStatus(atlasLocations[0], playerAfterCh1);
assert(ch1GatewayStatus === "COMPLETED", "After Ch1: Hidden Gateway is COMPLETED (golden emblem awarded)");

const ch1RiverStatus = resolveAtlasStatus(atlasLocations[1], playerAfterCh1);
assert(ch1RiverStatus === "CURRENT", "After Ch1: River of Legacy is UNLOCKED/CURRENT (fog lifted)");

const ch1HarborStatus = resolveAtlasStatus(atlasLocations[2], playerAfterCh1);
assert(ch1HarborStatus === "LOCKED", "After Ch1: Harbor of Connections remains LOCKED (fogbound)");

// Player completes Chapter 2 (River of Legacy)
const playerAfterCh2: PlayerState = {
  ...playerAfterCh1,
  completedLessons: [...playerAfterCh1.completedLessons, "lesson-2-1", "lesson-2-2", "lesson-2-3"],
  completedWorlds: [...playerAfterCh1.completedWorlds, "loc-rotaract-harbor"],
};

const ch2RiverStatus = resolveAtlasStatus(atlasLocations[1], playerAfterCh2);
assert(ch2RiverStatus === "COMPLETED", "After Ch2: River of Legacy is COMPLETED (golden emblem awarded)");

const ch2HarborStatus = resolveAtlasStatus(atlasLocations[2], playerAfterCh2);
assert(ch2HarborStatus === "CURRENT", "After Ch2: Harbor of Connections is UNLOCKED/CURRENT (fog lifted)");

// ----------------------------------------------------
// 4. TESTING BACKWARD COMPATIBILITY
// ----------------------------------------------------
console.log("\n[4/4] Testing Backward Compatibility & Alias Access...");
assert(realmLocations.length >= 8, "realmLocations maintains full length");

const gatewayInLegacy = realmLocations.find((r) => r.id === "loc-gateway");
assert(!!gatewayInLegacy, "loc-gateway exists in realmLocations");

const harborInLegacy = realmLocations.find((r) => r.id === "loc-rotaract-harbor");
assert(!!harborInLegacy, "loc-rotaract-harbor exists in realmLocations");

const rootsInLegacy = realmLocations.find((r) => r.id === "loc-rotary-roots");
assert(!!rootsInLegacy, "loc-rotary-roots alias preserved in realmLocations");

const codewoodInLegacy = realmLocations.find((r) => r.id === "loc-codewood");
assert(!!codewoodInLegacy, "loc-codewood alias preserved in realmLocations");

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
  console.log("🎉 ALL REGENT REALM ATLAS TESTS PASSED!\n");
  process.exit(0);
}
