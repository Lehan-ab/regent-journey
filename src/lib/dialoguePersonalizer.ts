/**
 * Reusable dialogue personalization engine for Regent Journey.
 * Replaces dynamic placeholders case-insensitively:
 * - {name}     -> Explorer's chosen name (e.g., "Kasun", "LEHAN", fallback "Explorer")
 * - {level}    -> Current explorer level (e.g., "1", "2")
 * - {chapter}  -> Active chapter name or label (e.g., "Rotary Roots", "The Gateway")
 * - {location} -> Physical/thematic realm location (e.g., "Seethawaka Valley", "River Basin Harbor")
 */

export interface DialogueContext {
  name?: string;
  level?: number | string;
  chapter?: string;
  location?: string;
}

export function personalizeDialogue(
  template: string,
  ctx?: DialogueContext
): string {
  if (!template) return "";

  const name =
    ctx?.name && typeof ctx.name === "string" && ctx.name.trim()
      ? ctx.name.trim()
      : "Explorer";

  const level =
    ctx?.level !== undefined && ctx.level !== null
      ? String(ctx.level)
      : "1";

  const chapter =
    ctx?.chapter && typeof ctx.chapter === "string" && ctx.chapter.trim()
      ? ctx.chapter.trim()
      : "The Gateway";

  const location =
    ctx?.location && typeof ctx.location === "string" && ctx.location.trim()
      ? ctx.location.trim()
      : chapter;

  return template
    .replace(/\{name\}/gi, name)
    .replace(/\{level\}/gi, level)
    .replace(/\{chapter\}/gi, chapter)
    .replace(/\{location\}/gi, location);
}
