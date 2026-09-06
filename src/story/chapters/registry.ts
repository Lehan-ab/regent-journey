import { StoryChapter } from "../types/chapter";
import { CHAPTER_0_GATEWAY } from "./chapter0";
import { CHAPTER_1_HIDDEN_GATEWAY } from "./chapter1";

export const STORY_CHAPTERS_REGISTRY: Record<string, StoryChapter> = {
  [CHAPTER_0_GATEWAY.id]: CHAPTER_0_GATEWAY,
  [CHAPTER_1_HIDDEN_GATEWAY.id]: CHAPTER_1_HIDDEN_GATEWAY,
  // Alias loc-gateway to Chapter 1: The Hidden Gateway for seamless route resolution
  "loc-gateway": CHAPTER_1_HIDDEN_GATEWAY,
};

export function getStoryChapter(chapterId: string): StoryChapter | undefined {
  return STORY_CHAPTERS_REGISTRY[chapterId];
}

export function getAllStoryChapters(): StoryChapter[] {
  // Deduplicate distinct chapters
  const seen = new Set<string>();
  const chapters: StoryChapter[] = [];
  for (const chap of Object.values(STORY_CHAPTERS_REGISTRY)) {
    if (!seen.has(chap.id)) {
      seen.add(chap.id);
      chapters.push(chap);
    }
  }
  return chapters.sort((a, b) => a.chapterNumber - b.chapterNumber);
}

export function registerStoryChapter(chapter: StoryChapter): void {
  STORY_CHAPTERS_REGISTRY[chapter.id] = chapter;
}
