import { LessonSourceInfo } from "@/types/story";

export const MAX_HANDBOOK_PAGE = 211;
export const MIN_HANDBOOK_PAGE = 1;

export interface SourceValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Validates that all page numbers in a lesson source metadata fall within [1, 211].
 */
export function validateLessonSource(
  lessonId: string,
  source: LessonSourceInfo | undefined
): SourceValidationResult {
  const errors: string[] = [];

  if (!source) {
    errors.push(`Lesson ${lessonId} is missing source metadata.`);
    return { isValid: false, errors };
  }

  if (!source.pages || source.pages.length === 0) {
    errors.push(`Lesson ${lessonId} has no pages specified.`);
  } else {
    for (const page of source.pages) {
      if (typeof page !== "number" || isNaN(page)) {
        errors.push(`Lesson ${lessonId} has non-numeric page: ${page}`);
      } else if (page < MIN_HANDBOOK_PAGE || page > MAX_HANDBOOK_PAGE) {
        errors.push(
          `Lesson ${lessonId} has invalid page ${page}. Valid handbook pages are ${MIN_HANDBOOK_PAGE}–${MAX_HANDBOOK_PAGE}.`
        );
      }
    }
  }

  if (!source.publication || !source.publication.includes("2026–27")) {
    errors.push(`Lesson ${lessonId} source publication must reference 2026–27 handbook.`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
