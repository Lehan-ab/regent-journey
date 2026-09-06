import { StoryReward } from "../types/reward";

export function createLessonReward(
  xp: number,
  options?: Partial<Omit<StoryReward, "xp">>
): StoryReward {
  return {
    xp,
    badgeId: options?.badgeId,
    badge: options?.badge,
    titleUnlocked: options?.titleUnlocked,
    itemUnlocked: options?.itemUnlocked,
    secretLoreUnlocked: options?.secretLoreUnlocked,
    unlockedWorldId: options?.unlockedWorldId,
    celebrationDialogue: options?.celebrationDialogue,
  };
}

export const REWARD_GATEWAY_LESSON_1: StoryReward = createLessonReward(25, {
  titleUnlocked: "Gate Explorer",
  celebrationDialogue: {
    nova: "The first step is taken. The knowledge of District 3220 now guides your way.",
    raya: "Boom! Lesson one conquered! The gates are opening up!",
    kai: "Objective complete. Clean execution on the district fundamentals.",
  },
});

export const REWARD_GATEWAY_LESSON_2: StoryReward = createLessonReward(25, {
  titleUnlocked: "Bearer of the Four-Way Test",
  celebrationDialogue: {
    nova: "You carry Rotary's four questions with honor. A noble start to your fellowship.",
    raya: "Ethics check passed! You are officially ready for the wild realms ahead!",
    kai: "Integrity standard established. Your foundation is solid.",
  },
});

export const REWARD_GATEWAY_CHAPTER_COMPLETION: StoryReward = createLessonReward(50, {
  badgeId: "INITIATE",
  badge: {
    id: "badge-gateway-initiate",
    title: "Gateway Initiate",
    description: "Successfully crossed the threshold of Seethawaka Regent and completed Chapter 0.",
    category: "INITIATION",
  },
  unlockedWorldId: "loc-rotary-roots",
  celebrationDialogue: {
    nova: "A triumphant crossing! The realm of Rotary Roots awaits your arrival.",
    raya: "You did it! The Gateway is behind us and the real adventure begins now!",
    kai: "Prologue complete. Advancing to Chapter 1: Rotary Roots.",
  },
});

export const REWARD_REGISTRY: Record<string, StoryReward> = {
  "reward-gw-l1": REWARD_GATEWAY_LESSON_1,
  "reward-gw-l2": REWARD_GATEWAY_LESSON_2,
  "reward-gw-chapter": REWARD_GATEWAY_CHAPTER_COMPLETION,
};
