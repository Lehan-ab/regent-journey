import { StoryDialogue, StoryDialogueBeat } from "../types/dialogue";
import { personalizeDialogue, DialogueContext } from "@/lib/dialoguePersonalizer";

export function createDialogueBeat(
  id: string,
  speaker: StoryDialogueBeat["speaker"],
  text: string,
  options?: Partial<Omit<StoryDialogueBeat, "id" | "speaker" | "text">>
): StoryDialogueBeat {
  return {
    id,
    speaker,
    text,
    emotion: options?.emotion || "neutral",
    speakerName: options?.speakerName,
    role: options?.role,
    sceneEvent: options?.sceneEvent,
    companionVariants: options?.companionVariants,
    choices: options?.choices,
  };
}

export function personalizeStoryDialogue(
  dialogue: StoryDialogue,
  ctx: DialogueContext
): StoryDialogue {
  return {
    ...dialogue,
    beats: dialogue.beats.map((beat) => ({
      ...beat,
      text: personalizeDialogue(beat.text, ctx),
      companionVariants: beat.companionVariants
        ? {
            nova: beat.companionVariants.nova
              ? personalizeDialogue(beat.companionVariants.nova, ctx)
              : undefined,
            raya: beat.companionVariants.raya
              ? personalizeDialogue(beat.companionVariants.raya, ctx)
              : undefined,
            kai: beat.companionVariants.kai
              ? personalizeDialogue(beat.companionVariants.kai, ctx)
              : undefined,
          }
        : undefined,
    })),
  };
}

// Chapter 0 Lesson 1 Dialogue: The Call Beyond the Gate
export const DIALOGUE_GATEWAY_LESSON_1: StoryDialogue = {
  id: "dialogue-gateway-l1",
  title: "The Call Beyond the Gate",
  beats: [
    createDialogueBeat("gw1-1", "npc", "Halt, traveler. Beyond this archway lies the Realm of Seethawaka Regent—where young leaders transform communities through purposeful service.", {
      speakerName: "Gatekeeper Aaron",
      role: "Guardian of the Gateway",
      emotion: "serious",
    }),
    createDialogueBeat("gw1-2", "explorer", "I came seeking something more than meetings and speeches. I want to build real initiatives that matter.", {
      emotion: "thoughtful",
    }),
    createDialogueBeat("gw1-3", "companion", "You picked the right threshold. RACSR blends youth energy with Rotary's global network across District 3220.", {
      emotion: "excited",
      companionVariants: {
        nova: "Every great journey starts with a curious mind. The knowledge preserved across these realms will show you what true leadership means.",
        raya: "That is the spirit! No sitting on the sidelines here—we dive straight into hands-on projects and bold adventures!",
        kai: "A sound objective. Rotary provides the structured framework; your initiative provides the momentum. Let us proceed.",
      },
    }),
    createDialogueBeat("gw1-4", "npc", "Listen well. District 3220 spans Sri Lanka and the Maldives. The 2026–27 thematic direction challenges every Rotaractor to move from passive observer to active leader.", {
      speakerName: "Gatekeeper Aaron",
      role: "Guardian of the Gateway",
      emotion: "warm",
    }),
    createDialogueBeat("gw1-5", "npc", "Study the records of our district, understand our commitment, and complete the knowledge trial. Only then shall the inner road reveal itself.", {
      speakerName: "Gatekeeper Aaron",
      role: "Guardian of the Gateway",
      emotion: "excited",
      sceneEvent: "gate-unsealed",
    }),
  ],
};

// Chapter 0 Lesson 2 Dialogue: The Explorer's Promise
export const DIALOGUE_GATEWAY_LESSON_2: StoryDialogue = {
  id: "dialogue-gateway-l2",
  title: "The Explorer's Promise",
  beats: [
    createDialogueBeat("gw2-1", "npc", "You have proven your curiosity. Now comes the deeper question: what standard will govern your decisions as an explorer of this realm?", {
      speakerName: "Gatekeeper Aaron",
      role: "Guardian of the Gateway",
      emotion: "serious",
    }),
    createDialogueBeat("gw2-2", "explorer", "A leader is defined not just by what they achieve, but how they treat others along the way.", {
      emotion: "thoughtful",
    }),
    createDialogueBeat("gw2-3", "npc", "Precisely. Rotaractors live by the Four-Way Test: Is it the TRUTH? Is it FAIR to all concerned? Will it build GOODWILL and BETTER FRIENDSHIPS? Will it be BENEFICIAL to all concerned?", {
      speakerName: "Gatekeeper Aaron",
      role: "Guardian of the Gateway",
      emotion: "warm",
    }),
    createDialogueBeat("gw2-4", "companion", "Four questions that separate ordinary efforts from lasting impact. Carry them in your mind across every project.", {
      emotion: "warm",
      companionVariants: {
        nova: "The Four-Way Test is an ethical compass. When faced with difficult decisions, it illuminates the path forward.",
        raya: "Four simple questions that make every project honorable! Let's pledge to carry them proudly into every challenge!",
        kai: "In leadership and governance, the Four-Way Test is your risk mitigation policy and your integrity guarantee. Remember it well.",
      },
    }),
    createDialogueBeat("gw2-5", "npc", "Commit these four truths to memory. Complete the trial, claim your Initiate Badge, and the Great Realm shall open before you!", {
      speakerName: "Gatekeeper Aaron",
      role: "Guardian of the Gateway",
      emotion: "celebrate",
    }),
  ],
};

export const DIALOGUE_REGISTRY: Record<string, StoryDialogue> = {
  [DIALOGUE_GATEWAY_LESSON_1.id]: DIALOGUE_GATEWAY_LESSON_1,
  [DIALOGUE_GATEWAY_LESSON_2.id]: DIALOGUE_GATEWAY_LESSON_2,
};
