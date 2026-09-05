import { CHAPTERS_DATA } from "../data/chaptersData";
import { validateLessonSource, MAX_HANDBOOK_PAGE } from "../lib/sourceValidator";

console.log("\n==================================================");
console.log("RUNNING LESSON SOURCE METADATA VALIDATION");
console.log(`MAX HANDBOOK PAGE LIMIT: ${MAX_HANDBOOK_PAGE}`);
console.log("==================================================\n");

let totalLessons = 0;
let errorsCount = 0;

for (const [chapterId, chapter] of Object.entries(CHAPTERS_DATA)) {
  console.log(`Auditing Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle} (${chapter.lessons.length} lessons)`);
  for (const lesson of chapter.lessons) {
    totalLessons++;
    const result = validateLessonSource(lesson.id, lesson.source);
    if (!result.isValid) {
      errorsCount++;
      console.error(`❌ [FAIL] ${lesson.id} (${lesson.title}):`, result.errors);
    } else {
      console.log(`  ✅ [PASS] ${lesson.id}: ${lesson.title} -> ${lesson.source.pageRangeDisplay} [pages: ${lesson.source.pages.join(", ")}]`);
    }
  }
}

console.log("\n--------------------------------------------------");
console.log(`Total Lessons Audited: ${totalLessons}`);
console.log(`Total Errors: ${errorsCount}`);
console.log("--------------------------------------------------\n");

if (errorsCount > 0) {
  console.error(`❌ SOURCE VALIDATION FAILED WITH ${errorsCount} ERRORS!`);
  process.exit(1);
} else {
  console.log("🎉 ALL 34 LESSON SOURCES ARE STRICTLY WITHIN PAGES 1–211! VALIDATION PASSED.");
}
