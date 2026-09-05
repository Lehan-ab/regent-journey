import { CHAPTERS_DATA } from "../data/chaptersData";

console.log("| LESSON ID | TITLE | WORLD | SCENE VARIANT | GUIDE NPC | SCENE EVENT | TRIAL TYPE |");
console.log("| :--- | :--- | :--- | :--- | :--- | :--- | :--- |");

for (const [chId, chapter] of Object.entries(CHAPTERS_DATA)) {
  for (const lesson of chapter.lessons) {
    const events = lesson.scriptedDialogue
      .map((d) => d.sceneEvent)
      .filter(Boolean)
      .join(", ") || "none";
    const trialType = (lesson.knowledgeTrial as any)?.type || "standard";
    console.log(
      `| ${lesson.id} | ${lesson.title} | ${chapter.worldName} | ${lesson.sceneConfig.variant} | ${chapter.guideNpc || "aaron"} | ${events} | ${trialType} |`
    );
  }
}
