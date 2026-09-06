import { StoryChapter } from "../types/chapter";
import { StoryLesson } from "../types/lesson";
import { SCENE_GATEWAY_THRESHOLD, SCENE_GATEWAY_PROMISE } from "../scenes/registry";
import { DIALOGUE_GATEWAY_LESSON_1, DIALOGUE_GATEWAY_LESSON_2 } from "../dialogues/registry";
import {
  CHALLENGE_GATEWAY_DISTRICT_ORIENTATION,
  CHALLENGE_GATEWAY_FOUR_WAY_TEST,
} from "../interactions/registry";
import {
  REWARD_GATEWAY_LESSON_1,
  REWARD_GATEWAY_LESSON_2,
  REWARD_GATEWAY_CHAPTER_COMPLETION,
} from "../rewards/registry";

const LESSON_0_1: StoryLesson = {
  id: "lesson-0-1",
  chapterId: "loc-gateway",
  lessonNumber: 1,
  title: "The Call Beyond the Gate",
  subtitle: "The Spirit of District 3220 & 2026–27 Focus",
  readTime: "2 min",
  scene: SCENE_GATEWAY_THRESHOLD,
  storyIntro: {
    speaker: "Gatekeeper Aaron",
    speakerRole: "Portal Guardian",
    dialogue:
      "Halt, traveler! Beyond this ancient stone arch lies the historic valley of Seethawaka. You carry curiosity in your eyes and purpose in your stride.",
  },
  dialogue: DIALOGUE_GATEWAY_LESSON_1,
  codexSections: [
    {
      title: "The Core Spirit of Rotaract",
      content: [
        "Rotaract is an international youth movement where young leaders discover their ability to create meaningful change through community action, lifelong fellowship, and personal development.",
        "In Rotary International District 3220 (Sri Lanka & Maldives), Rotaract empowers young professionals to bridge communities and tackle pressing social challenges.",
      ],
      keyTakeaway:
        "Rotaract stands at the vital intersection of service, leadership, and global citizenship.",
    },
    {
      title: "The 2026–27 District Theme",
      content: [
        "The official theme for 2026–27 is 'Igniting Possibilities & Inspiring Change.'",
        "Enthusiasm must be matched with direction, creativity with consistency, and ambition with accountability. Rotaractors do not just dream—they execute.",
      ],
      bulletPoints: [
        "Theme: Igniting Possibilities & Inspiring Change",
        "Pillars: Learn → Serve → Lead with integrity",
        "Culture: Respect, professionalism, inclusivity, and unity of purpose",
      ],
    },
  ],
  source: {
    publication: "Rotaract Information Handbook 2026–27",
    district: "Rotary International District 3220 — Sri Lanka & Maldives",
    section: "Core Spirit & 2026–27 Theme",
    pages: [4, 5],
    pageRangeDisplay: "pp. 4–5",
  },
  interactiveChallenge: CHALLENGE_GATEWAY_DISTRICT_ORIENTATION,
  knowledgeTrial: {
    type: "multiple-choice",
    question: "What is the official focus theme of District 3220 for the 2026–27 year?",
    options: [
      {
        id: "opt-a",
        text: "Igniting Possibilities & Inspiring Change",
        explanation:
          "Correct! The official 2026–27 district theme emphasizes igniting possibilities and inspiring change through service.",
      },
      {
        id: "opt-b",
        text: "Leading by Ambition Alone",
        explanation:
          "Incorrect. The handbook emphasizes matching ambition with accountability and selfless service.",
      },
      {
        id: "opt-c",
        text: "Service Only in Isolation",
        explanation:
          "Incorrect. Collaboration and global citizenship are core pillars of Rotaract.",
      },
      {
        id: "opt-d",
        text: "Digital Growth Without Action",
        explanation:
          "Incorrect. Digital learning is only preparation for real-world impact.",
      },
    ],
    correctOptionId: "opt-a",
    hint: "Think about the banner Aaron described: it begins with 'Igniting...'",
    successMessage:
      "The portal arch resonates with amber light! You understand the guiding spirit of District 3220.",
  },
  reward: REWARD_GATEWAY_LESSON_1,
  companionAdvice: {
    nova: "Reflect deeply on the theme: inspiration begins with small, consistent acts of service.",
    raya: "Don't hold back! Energy and passion are the spark that ignites real community change!",
    kai: "Keep your goals clear and measurable from your very first step through the gate.",
  },
};

const LESSON_0_2: StoryLesson = {
  id: "lesson-0-2",
  chapterId: "loc-gateway",
  lessonNumber: 2,
  title: "The Explorer's Promise",
  subtitle: "The Five Core Values of an Explorer",
  readTime: "2 min",
  scene: SCENE_GATEWAY_PROMISE,
  storyIntro: {
    speaker: "Gatekeeper Aaron",
    speakerRole: "Portal Guardian",
    dialogue:
      "You have grasped our spirit. Now you must carry the Explorer's Code: respect, professionalism, inclusivity, responsibility, and integrity.",
  },
  dialogue: DIALOGUE_GATEWAY_LESSON_2,
  codexSections: [
    {
      title: "The Five Explorer Pillars",
      content: [
        "Respect: Valuing the dignity, time, and diverse perspectives of all members and community partners.",
        "Professionalism: Approaching every meeting and project with punctuality, preparedness, and decorum.",
        "Inclusivity: Creating a welcoming brotherhood and sisterhood where everyone has a voice.",
        "Responsibility: Following through on commitments and safeguarding club assets.",
        "Integrity: Serving selflessly without seeking personal glory or shortcutting ethics.",
      ],
      keyTakeaway:
        "Digital knowledge is only preparation; real Rotaract lives through action in the physical world.",
    },
  ],
  source: {
    publication: "Rotaract Information Handbook 2026–27",
    district: "Rotary International District 3220 — Sri Lanka & Maldives",
    section: "Leadership Pillars & Best Practices",
    pages: [4, 6, 7, 8, 9, 10],
    pageRangeDisplay: "pp. 4–10",
  },
  interactiveChallenge: CHALLENGE_GATEWAY_FOUR_WAY_TEST,
  knowledgeTrial: {
    type: "scenario",
    question:
      "What is the primary relationship between this digital guide and your real Rotaract journey?",
    options: [
      {
        id: "opt-a",
        text: "The digital guide is preparation; real Rotaract happens through meetings, service, and fellowship in the real world.",
        explanation:
          "Correct! The digital journey equips you with knowledge, but true impact is realized in the physical community.",
      },
      {
        id: "opt-b",
        text: "Completing digital quizzes replaces the need to ever attend physical club meetings.",
        explanation:
          "Incorrect. Digital learning cannot replace active human fellowship and community service.",
      },
      {
        id: "opt-c",
        text: "The guide is just a gaming app with no connection to real club principles.",
        explanation:
          "Incorrect. Every lesson is grounded directly in official District 3220 standards.",
      },
    ],
    correctOptionId: "opt-a",
    hint: "Remember Aaron's words: the screen is merely the map, not the destination.",
    successMessage:
      "The heavy stone portal unseals! You have earned the INITIATE badge and unlocked Rotary Roots.",
  },
  reward: REWARD_GATEWAY_LESSON_2,
  companionAdvice: {
    nova: "Hold tight to the five pillars—they will anchor your leadership when challenges arise.",
    raya: "Values aren't meant to sit on a scroll—let's live them out on the trail!",
    kai: "Consistency is key: show up on time, communicate clearly, and deliver on promises.",
  },
};

export const CHAPTER_0_GATEWAY: StoryChapter = {
  id: "chapter-0",
  chapterNumber: 0,
  chapterLabel: "PROLOGUE",
  chapterTitle: "The Gateway",
  worldName: "The Gateway",
  regionTitle: "Valley Threshold",
  seethawakaInspiration:
    "Inspired by the historic Seethawaka river entryway and stone heritage archways",
  summary:
    "Cross the stone archway into the Realm of Regent. Meet Gatekeeper Aaron, discover the core mission of District 3220, and begin your journey from curious explorer to impactful Rotaractor.",
  guideNpcId: "gatekeeper-aaron",
  location: {
    id: "loc-gateway",
    worldName: "The Gateway",
    regionTitle: "Valley Threshold",
    chapterNumber: 0,
    isPrologue: true,
    coords: { x: 50, y: 88 },
    visualTag: "GATEWAY",
    image: "/assets/pixel/ui/chapter_cards/card_01_hidden_gateway.jpg",
    routeHref: "/journey/loc-gateway",
    audioTheme: "theme-gateway",
    seethawakaHeritage: {
      historicalLandmark: "Seethawaka River Entrance & Stone Threshold",
      loreContext:
        "The ancient boundary where royal travelers crossed the river into the historic kingdom.",
      culturalInspiration: "Stone carving motifs and guardian archways of ancient Lanka.",
      monumentType: "archway",
    },
    description:
      "Cross the ancient stone archway into the valley of Seethawaka Regent. Here, your journey from prospect to leader begins.",
    expandedLore:
      "For centuries, travelers arrived at this river junction seeking wisdom and brotherhood. Now the gate awakens for a new generation of Rotaract explorers.",
  },
  cinematicIntro: {
    id: "cinematic-intro-gateway",
    worldTitle: "THE VALLEY THRESHOLD",
    tagline: "Where Curiosity Meets Purpose",
    backgroundImage: "/assets/pixel/worlds/backgrounds/01_hidden_gateway.jpg",
    ambientSoundtrack: "theme-gateway",
    slides: [
      {
        id: "gw-slide-1",
        order: 1,
        title: "The Stone Arch of Seethawaka",
        subtitle: "A Sacred Threshold",
        narrationText:
          "Before you rises the ancient stone arch of Seethawaka Regent. Beyond lies a realm shaped by fellowship, purpose, and community leadership.",
        speaker: "Gatekeeper Aaron",
        speakerRole: "Guardian of the Gateway",
      },
      {
        id: "gw-slide-2",
        order: 2,
        title: "The Explorer's Call",
        subtitle: "District 3220 Sri Lanka & Maldives",
        narrationText:
          "Rotaractors here do not merely read history—they forge it. In this realm, you will learn the code, master the avenues of service, and discover the leader within.",
        speaker: "Gatekeeper Aaron",
        speakerRole: "Guardian of the Gateway",
      },
    ],
    companionGreeting: {
      nova: "Every great quest begins with a single step across a threshold. Let us observe and learn.",
      raya: "Look at those stone arches! Our adventure starts right here, right now!",
      kai: "Structure, purpose, and clear goals. The gateway is primed. Let us advance.",
    },
  },
  lessons: [LESSON_0_1, LESSON_0_2],
  completionReward: REWARD_GATEWAY_CHAPTER_COMPLETION,
  completionCinematic: {
    title: "PROLOGUE MASTERED: THE THRESHOLD HAS UNSEALED",
    congratulationsText:
      "You have pledged the Explorer's Promise and understood the foundational spirit of District 3220. The Gateway swings open to reveal Chapter 1: Sacred Botanical Canopy!",
    badgeRewardId: "INITIATE",
    unlockedWorldId: "loc-rotary-roots",
    unlockedWorldName: "Sacred Botanical Canopy",
  },
};
