import { StoryChapter } from "../types/chapter";
import { StoryLesson } from "../types/lesson";
import { StoryScene } from "../types/scene";
import { StoryDialogue } from "../types/dialogue";
import { StoryInteraction } from "../types/interaction";
import { StoryReward } from "../types/reward";
import { createDialogueBeat } from "../dialogues/registry";

// ============================================================================
// CHAPTER 1 SCENES
// ============================================================================

export const SCENE_HIDDEN_GATEWAY_ENTRANCE: StoryScene = {
  id: "scene-hidden-gateway-entrance",
  sceneType: "portal",
  variant: "gate-mist",
  atmosphere: {
    title: "The Threshold of Seethawaka",
    subtitle: "Morning light filters through ancient moss-draped river stones",
    weather: "dawn",
    ambientSoundtrack: "theme-gateway",
    lightingTone: "warm-gold",
  },
  backdrop: {
    imagePath: "/assets/pixel/worlds/backgrounds/01_hidden_gateway.jpg",
    blurEffect: false,
    ambientParticles: "mist",
    overlayGradient: "from-amber-950/25 via-transparent to-[#0A0503]",
  },
  actors: [
    {
      id: "gatekeeper-aaron",
      role: "npc",
      name: "Gatekeeper Aaron",
      position: "left",
      defaultExpression: "speaking",
      isInteractive: true,
    },
    {
      id: "companion-slot",
      role: "companion",
      name: "Companion",
      position: "center",
      defaultExpression: "idle",
      isInteractive: true,
    },
    {
      id: "explorer-slot",
      role: "explorer",
      name: "Prospect",
      position: "right",
      defaultExpression: "neutral",
      isInteractive: false,
    },
  ],
};

export const SCENE_HIDDEN_GATEWAY_CORRIDOR: StoryScene = {
  id: "scene-hidden-gateway-corridor",
  sceneType: "portal",
  variant: "council-table",
  atmosphere: {
    title: "The Corridor of Heritage",
    subtitle: "Warm torchlight illuminates historic stone relief carvings",
    weather: "clear",
    ambientSoundtrack: "theme-gateway",
    lightingTone: "royal-crimson",
  },
  backdrop: {
    imagePath: "/assets/pixel/worlds/backgrounds/01_hidden_gateway.jpg",
    blurEffect: false,
    ambientParticles: "embers",
    overlayGradient: "from-red-950/25 via-transparent to-[#0A0503]",
  },
  actors: [
    {
      id: "gatekeeper-aaron",
      role: "npc",
      name: "Gatekeeper Aaron",
      position: "left",
      defaultExpression: "speaking",
      isInteractive: true,
    },
    {
      id: "companion-slot",
      role: "companion",
      name: "Companion",
      position: "center",
      defaultExpression: "thinking",
      isInteractive: true,
    },
    {
      id: "explorer-slot",
      role: "explorer",
      name: "Prospect",
      position: "right",
      defaultExpression: "neutral",
      isInteractive: false,
    },
  ],
};

export const SCENE_HIDDEN_GATEWAY_SANCTUM: StoryScene = {
  id: "scene-hidden-gateway-sanctum",
  sceneType: "portal",
  variant: "gate-unsealed",
  atmosphere: {
    title: "The Sanctum of Commitment",
    subtitle: "Sunlight illuminates the stone pedestal of the Four-Way Test",
    weather: "clear",
    ambientSoundtrack: "theme-gateway",
    lightingTone: "warm-gold",
  },
  backdrop: {
    imagePath: "/assets/pixel/worlds/backgrounds/01_hidden_gateway.jpg",
    blurEffect: false,
    ambientParticles: "starlight",
    overlayGradient: "from-yellow-950/30 via-transparent to-[#0A0503]",
  },
  actors: [
    {
      id: "gatekeeper-aaron",
      role: "npc",
      name: "Gatekeeper Aaron",
      position: "left",
      defaultExpression: "speaking",
      isInteractive: true,
    },
    {
      id: "companion-slot",
      role: "companion",
      name: "Companion",
      position: "center",
      defaultExpression: "celebrate",
      isInteractive: true,
    },
    {
      id: "explorer-slot",
      role: "explorer",
      name: "Prospect",
      position: "right",
      defaultExpression: "neutral",
      isInteractive: false,
    },
  ],
};

// ============================================================================
// CHAPTER 1 DIALOGUES
// ============================================================================

export const DIALOGUE_CHAPTER1_LESSON1: StoryDialogue = {
  id: "dialogue-c1-l1",
  title: "The First Step",
  beats: [
    createDialogueBeat("c1-l1-1", "npc", "Halt, traveler. Before you rises the Hidden Gateway of Seethawaka Regent. Many gaze upon this ancient stone threshold, but few possess the courage to cross it. What brings you here today?", {
      speakerName: "Gatekeeper Aaron",
      role: "Guardian of the Gateway",
      emotion: "serious",
    }),
    createDialogueBeat("c1-l1-2", "explorer", "I am looking for more than routine meetings. I want to build real initiatives, develop practical leadership, and serve our community with purpose.", {
      emotion: "thoughtful",
    }),
    createDialogueBeat("c1-l1-3", "companion", "You have arrived at the right threshold, {name}!", {
      emotion: "excited",
      companionVariants: {
        nova: "Greetings, {name}. I am Nova, your companion in knowledge and strategy. True leadership begins with an open mind and a willingness to observe before acting. Together, we will discover how Rotaract shapes vision into reality.",
        raya: "{name}! You actually stepped through the gate! I'm Raya, your adventure ally! Forget boring lectures—we are here to dive straight into community expeditions and bold initiatives! Let's conquer this realm!",
        kai: "Good to meet you, {name}. I am Kai. In Seethawaka Regent, good intentions require structured execution and disciplined teamwork. I will help you master the avenues of service step by step.",
      },
    }),
    createDialogueBeat("c1-l1-4", "npc", "Every great Rotaractor who ever transformed a community in Sri Lanka or the Maldives began exactly where you stand now. The first step is personal commitment.", {
      speakerName: "Gatekeeper Aaron",
      role: "Guardian of the Gateway",
      emotion: "warm",
    }),
    createDialogueBeat("c1-l1-5", "companion", "Let us absorb the wisdom of this first passage, {name}. Then, we will prove our readiness in the threshold challenge!", {
      emotion: "warm",
      companionVariants: {
        nova: "Take your time to reflect on the core principles, {name}. Knowledge gives direction to passion.",
        raya: "Ready when you are, {name}! Let's study the scroll and crush the interactive challenge!",
        kai: "Review the standards thoroughly, {name}. Preparation is the mother of clean execution.",
      },
    }),
  ],
};

export const DIALOGUE_CHAPTER1_LESSON2: StoryDialogue = {
  id: "dialogue-c1-l2",
  title: "The Meaning Behind The Journey",
  beats: [
    createDialogueBeat("c1-l2-1", "companion", "Look at these relief carvings along the stone passage, {name}. They depict decades of community service across District 3220.", {
      emotion: "curious",
      companionVariants: {
        nova: "Observe the balance, {name}: Rotaract unites youth leadership with the venerable global network of Rotary International, spanning Sri Lanka and the Maldives.",
        raya: "Look at the energy in these carvings, {name}! Every project here solved a real problem for families in need. That's the spark of 'Igniting Possibilities & Inspiring Change'!",
        kai: "Notice the organization, {name}: each project followed clear avenues of service, disciplined accounting, and mutual accountability. That is the Regent standard.",
      },
    }),
    createDialogueBeat("c1-l2-2", "explorer", "So this journey is not just a digital simulation—it is designed to prepare us for real impact in our local communities.", {
      emotion: "thoughtful",
    }),
    createDialogueBeat("c1-l2-3", "npc", "Precisely, {name}. Rotaract is an international movement where young adults aged 18 and above translate empathy into action.", {
      speakerName: "Gatekeeper Aaron",
      role: "Guardian of the Gateway",
      emotion: "warm",
    }),
    createDialogueBeat("c1-l2-4", "npc", "For the 2026–27 year, our district marches under the banner of 'Igniting Possibilities & Inspiring Change.' We do not serve for self-glorification; we serve because our communities deserve dedicated, capable leaders.", {
      speakerName: "Gatekeeper Aaron",
      role: "Guardian of the Gateway",
      emotion: "serious",
    }),
    createDialogueBeat("c1-l2-5", "companion", "When you uplift others, you discover strengths you never knew you possessed. That is the true meaning behind this expedition, {name}.", {
      emotion: "celebrate",
      companionVariants: {
        nova: "Reflect on this truth, {name}: service is the crucible where character and wisdom are forged.",
        raya: "That's what I'm talking about, {name}! Big hearts, bold actions, and real change! Let's keep moving!",
        kai: "A clear mission, {name}. When your purpose is grounded in community need, obstacles become mere logistics to solve.",
      },
    }),
  ],
};

export const DIALOGUE_CHAPTER1_LESSON3: StoryDialogue = {
  id: "dialogue-c1-l3",
  title: "The Explorer's Promise",
  beats: [
    createDialogueBeat("c1-l3-1", "npc", "You have arrived at the inner sanctum of the Hidden Gateway, {name}. Beyond this arch lies The River of Legacy. But no traveler may navigate those currents without carrying our ethical compass.", {
      speakerName: "Gatekeeper Aaron",
      role: "Guardian of the Gateway",
      emotion: "serious",
    }),
    createDialogueBeat("c1-l3-2", "explorer", "I am ready, Aaron. What is the code that guides every Rotaractor?", {
      emotion: "thoughtful",
    }),
    createDialogueBeat("c1-l3-3", "npc", "Rotaractors across the globe uphold the Four-Way Test: Is it the TRUTH? Is it FAIR to all concerned? Will it build GOODWILL and BETTER FRIENDSHIPS? Will it be BENEFICIAL to all concerned?", {
      speakerName: "Gatekeeper Aaron",
      role: "Guardian of the Gateway",
      emotion: "warm",
    }),
    createDialogueBeat("c1-l3-4", "companion", "Four questions that define the soul of our fellowship, {name}.", {
      emotion: "warm",
      companionVariants: {
        nova: "When faced with difficult decisions in projects or leadership, test them against these four questions, {name}. They will never lead you astray.",
        raya: "Four honest questions that keep our projects honorable, {name}! Let's pledge them together and wear the standard with pride!",
        kai: "In governance, partnerships, and team management, {name}, the Four-Way Test is your ultimate risk mitigation and integrity guarantee.",
      },
    }),
    createDialogueBeat("c1-l3-5", "npc", "Pledge this promise, arrange the Four-Way Test in the protocol challenge, and pass the final trial. Then, the gates shall part and The River of Legacy shall be yours to explore!", {
      speakerName: "Gatekeeper Aaron",
      role: "Guardian of the Gateway",
      emotion: "celebrate",
    }),
  ],
};

// ============================================================================
// CHAPTER 1 INTERACTIVE CHALLENGES
// ============================================================================

export const CHALLENGE_CHAPTER1_LESSON1: StoryInteraction = {
  id: "challenge-c1-l1",
  type: "scenario-dilemma",
  title: "The Threshold Mindset Decision",
  challengePrompt:
    "As you step across the threshold into the Hidden Gateway, an elder council member asks why you chose to begin this journey with RACSR today. Which response reflects the true spirit of a Regent explorer?",
  contextLore:
    "In the Realm of Regent, leadership is built on selflessness and community growth, not self-promotional shortcuts.",
  scenarioOptions: [
    {
      id: "opt-serve-learn",
      title: "Serve & Learn Selflessly",
      description:
        "To learn how to serve our community selflessly and build lasting leadership skills alongside dedicated peers.",
      isRecommended: true,
      outcomeExplanation:
        "Exemplary choice! True Rotaract leadership begins with humility, a desire to learn, and commitment to collective community impact.",
      companionFeedback: {
        nova: "Wisdom speaks clearly in your choice, {name}. Grounding your journey in learning and service will guide every future project.",
        raya: "Boom! Exactly what I wanted to hear, {name}! Teamwork, bold service, and real growth!",
        kai: "A sound foundation, {name}. Leaders driven by service rather than ego build enduring trust.",
      },
    },
    {
      id: "opt-social-badge",
      title: "Collect Quick Badges",
      description:
        "To quickly collect badges and prestige titles to embellish my social media profile without attending community activities.",
      isRecommended: false,
      outcomeExplanation:
        "A superficial detour! Badges and titles are symbols of real-world service and effort, not empty vanity tokens.",
      companionFeedback: {
        nova: "Remember, {name}: honor cannot be simulated. Real impact happens through genuine presence.",
        raya: "Hold up, {name}! We're here to change the world, not just snap pictures for clout!",
        kai: "Empty credentials crumble under the first test of real responsibility, {name}.",
      },
    },
    {
      id: "opt-passive-presence",
      title: "Passive Observer",
      description:
        "Because someone invited me, but I prefer to stay in the background without engaging in projects.",
      isRecommended: false,
      outcomeExplanation:
        "A passive stance! Rotaract is designed for People of Action who step forward to ignite change.",
      companionFeedback: {
        nova: "Growth requires stepping out of your comfort zone, {name}.",
        raya: "No way, {name}! You've got fire inside you—don't hide on the sidelines!",
        kai: "Observation has value, {name}, but leadership requires taking ownership.",
      },
    },
  ],
  hint: "Think about the spirit Gatekeeper Aaron emphasized: moving from intention to genuine service and fellowship.",
  successOutcome:
    "You have demonstrated the true explorer mindset. The threshold arch glows with warm amber approval!",
  bonusXp: 15,
};

export const CHALLENGE_CHAPTER1_LESSON2: StoryInteraction = {
  id: "challenge-c1-l2",
  type: "scenario-dilemma",
  title: "The Purpose Alignment Dilemma",
  challengePrompt:
    "During your first project planning council, a team member proposes spending the entire club budget on a lavish single-evening party. A community school nearby urgently needs clean drinking water filtration. How do you guide the decision?",
  contextLore:
    "Rotary District 3220 champions sustainable, life-changing service projects over fleeting entertainment.",
  scenarioOptions: [
    {
      id: "opt-sustainable-water",
      title: "Prioritize Community Water Filtration",
      description:
        "Advocate for the water filtration project, while organizing a low-cost, fellowship-driven gathering to celebrate together.",
      isRecommended: true,
      outcomeExplanation:
        "Brilliant leadership! You balanced meaningful community impact with club camaraderie, aligning perfectly with Rotary's core mission.",
      companionFeedback: {
        nova: "Outstanding judgment, {name}. Sustainable community health always takes precedence over luxury.",
        raya: "Yes! The school gets clean water, and we still get to bond as a team! Perfect win-win!",
        kai: "Excellent resource allocation, {name}. Club credibility and community welfare must guide our balance sheets.",
      },
    },
    {
      id: "opt-lavish-party",
      title: "Spend Everything on the Party",
      description:
        "Spend the full budget on the lavish party to create temporary buzz, ignoring the school's water crisis.",
      isRecommended: false,
      outcomeExplanation:
        "Misguided priority! Rotaractors are stewards of community trust; wasting vital funds on temporary spectacle contradicts our purpose.",
      companionFeedback: {
        nova: "A missed opportunity for real leadership, {name}. Vanity does not quench thirst.",
        raya: "That feels wrong, {name}! We can't celebrate while a school nearby needs our help!",
        kai: "A severe breach of fiduciary responsibility and club trust, {name}.",
      },
    },
    {
      id: "opt-cancel-all",
      title: "Cancel Everything",
      description:
        "Abandon both initiatives to avoid any debate among club members.",
      isRecommended: false,
      outcomeExplanation:
        "Paralysis through conflict avoidance! True leaders navigate healthy discussions to reach principled solutions.",
      companionFeedback: {
        nova: "Conflict is an opportunity to clarify values, {name}.",
        raya: "Don't quit, {name}! We can talk it through and make the right decision together!",
        kai: "Leadership is decision-making under constraints, {name}. Inaction solves nothing.",
      },
    },
  ],
  hint: "Think about the district theme: 'Igniting Possibilities & Inspiring Change' requires prioritizing real human need.",
  successOutcome:
    "You guided the council with ethical clarity. The corridor carvings resonate with emerald light!",
  bonusXp: 15,
};

export const CHALLENGE_CHAPTER1_LESSON3: StoryInteraction = {
  id: "challenge-c1-l3",
  type: "protocol-order",
  title: "The Pillars of Integrity",
  challengePrompt:
    "Arrange the four pillars of Rotary's Four-Way Test in their exact canonical sequence.",
  contextLore:
    "Created in 1932 by Herbert J. Taylor, this 24-word code is the universal ethical foundation for Rotaractors worldwide.",
  protocolSteps: [
    {
      id: "step-truth",
      label: "1. Is it the TRUTH?",
      correctRank: 1,
      description: "Transparency, honesty, and grounded reality in all dealings.",
    },
    {
      id: "step-fair",
      label: "2. Is it FAIR to all concerned?",
      correctRank: 2,
      description: "Justice, balance, and mutual respect without bias.",
    },
    {
      id: "step-goodwill",
      label: "3. Will it build GOODWILL and BETTER FRIENDSHIPS?",
      correctRank: 3,
      description: "Strengthening trust and camaraderie across borders and communities.",
    },
    {
      id: "step-beneficial",
      label: "4. Will it be BENEFICIAL to all concerned?",
      correctRank: 4,
      description: "Delivering lasting, positive mutual value for the common good.",
    },
  ],
  hint: "Truth comes first, followed by fairness to all parties, building goodwill, and mutual benefit.",
  successOutcome:
    "You have masterfully assembled the Four-Way Test! Your pledge is sealed and the gateway to The River of Legacy unseals!",
  bonusXp: 20,
};

// ============================================================================
// CHAPTER 1 REWARDS
// ============================================================================

export const REWARD_CHAPTER1_LESSON1: StoryReward = {
  xp: 25,
  titleUnlocked: "Threshold Pioneer",
  celebrationDialogue: {
    nova: "The first step is taken, {name}. The path of leadership now opens before you.",
    raya: "First quest crushed, {name}! That's how we roll!",
    kai: "Clean execution, {name}. The foundation is laid.",
  },
};

export const REWARD_CHAPTER1_LESSON2: StoryReward = {
  xp: 25,
  titleUnlocked: "Seeker of Purpose",
  celebrationDialogue: {
    nova: "You grasp the true heart of service, {name}. Knowledge transforms into purpose.",
    raya: "You nailed it, {name}! Real impact over empty spectacle every single time!",
    kai: "Sound ethical clarity, {name}. You are thinking like a true Regent executive.",
  },
};

export const REWARD_CHAPTER1_LESSON3: StoryReward = {
  xp: 25,
  titleUnlocked: "Bearer of the Four-Way Test",
  celebrationDialogue: {
    nova: "You carry Rotary's four questions with honor, {name}. A noble compass for your journey.",
    raya: "The pledge is made, {name}! We are officially ready for The River of Legacy!",
    kai: "Integrity standard established, {name}. Your character is your greatest credential.",
  },
};

export const REWARD_CHAPTER1_COMPLETION: StoryReward = {
  xp: 50,
  badgeId: "INITIATE",
  badge: {
    id: "badge-initiate",
    title: "INITIATE",
    description: "Completed Chapter 1: The Hidden Gateway. Pledged the Four-Way Test and unlocked The River of Legacy.",
    category: "INITIATION",
  },
  unlockedWorldId: "loc-rotaract-harbor",
  celebrationDialogue: {
    nova: "Magnificent crossing, {name}! Chapter 1 is complete. The River of Legacy awaits your exploration!",
    raya: "We did it, {name}! The Hidden Gateway is unlocked! Next stop: The River of Legacy!",
    kai: "Prologue and Chapter 1 mastered, {name}. Advancing to Chapter 2: The River of Legacy.",
  },
};

// ============================================================================
// CHAPTER 1 LESSONS DEFINITIONS
// ============================================================================

export const LESSON_1_1: StoryLesson = {
  id: "lesson-1-1",
  chapterId: "chapter-1",
  lessonNumber: 1,
  title: "The First Step",
  subtitle: "Entering the Realm & Meeting Your Adventure Ally",
  readTime: "2 min",
  scene: SCENE_HIDDEN_GATEWAY_ENTRANCE,
  storyIntro: {
    speaker: "Gatekeeper Aaron",
    speakerRole: "Guardian of the Gateway",
    dialogue:
      "Halt, traveler! Beyond this ancient stone arch lies the historic valley of Seethawaka. You carry curiosity in your eyes and purpose in your stride.",
  },
  dialogue: DIALOGUE_CHAPTER1_LESSON1,
  codexSections: [
    {
      title: "The Courage to Step Forward",
      content: [
        "Every meaningful journey in Rotaract begins with a single, deliberate step. Moving from passive bystander to active explorer is the first hallmark of leadership.",
        "In the Rotaract Club of Seethawaka Regent (RACSR), prospects are not passive observers—they are invited to participate, question, and discover their personal potential from day one.",
      ],
      keyTakeaway:
        "Leadership does not begin with an official election; it begins the moment you decide to step forward and serve.",
    },
    {
      title: "Your Companion: The Adventure Ally",
      content: [
        "In this journey, you never travel alone. Your companion—Nova (Wisdom & Knowledge), Raya (Energy & Bold Action), or Kai (Strategy & Execution)—reflects a core leadership archetype.",
        "Fellowship is Rotary's cornerstone. By learning alongside your companion, you experience how diverse perspectives strengthen every project.",
      ],
      bulletPoints: [
        "Nova: The Reflective Scholar — Focuses on research, strategic depth, and deep community listening.",
        "Raya: The Daring Trailblazer — Brings infectious enthusiasm, bold mobilization, and hands-on energy.",
        "Kai: The Master Strategist — Enforces structural discipline, clear deadlines, and accountable governance.",
      ],
    },
  ],
  source: {
    publication: "Rotaract Information Handbook 2026–27",
    district: "Rotary International District 3220 — Sri Lanka & Maldives",
    section: "Core Spirit & The Beginning of the Journey",
    pages: [4, 5, 28],
    pageRangeDisplay: "pp. 4–5, 28",
  },
  interactiveChallenge: CHALLENGE_CHAPTER1_LESSON1,
  knowledgeTrial: {
    type: "multiple-choice",
    question: "According to the principles of the Hidden Gateway, what marks the true beginning of a Rotaractor's journey?",
    options: [
      {
        id: "opt-a",
        text: "Taking the personal initiative to step forward from curiosity into active learning and service.",
        explanation:
          "Correct! Leadership begins with the deliberate decision to move from passive observer to active participant.",
      },
      {
        id: "opt-b",
        text: "Waiting until you receive an executive leadership title before helping others.",
        explanation:
          "Incorrect. In Rotaract, leadership is demonstrated through service at every stage, not title alone.",
      },
      {
        id: "opt-c",
        text: "Joining solely to collect digital certificates without attending physical community projects.",
        explanation:
          "Incorrect. Certificates reflect real-world dedication; they are not substitutes for community presence.",
      },
      {
        id: "opt-d",
        text: "Letting others do all the project planning while you observe from the sidelines.",
        explanation:
          "Incorrect. Active engagement and teamwork are essential to developing leadership skills.",
      },
    ],
    correctOptionId: "opt-a",
    hint: "Think about Aaron's opening words: moving from spectator to active explorer.",
    successMessage:
      "The gateway arch illuminates with amber light! You understand the courage of taking the first step.",
  },
  reward: REWARD_CHAPTER1_LESSON1,
  companionAdvice: {
    nova: "Reflect on your motivation, {name}: small, deliberate beginnings lead to monumental outcomes.",
    raya: "Don't overthink it, {name}! Taking action with an open heart is what Rotaract is all about!",
    kai: "Set a clear goal for what you wish to learn, {name}, and execute it with consistency.",
  },
};

export const LESSON_1_2: StoryLesson = {
  id: "lesson-1-2",
  chapterId: "chapter-1",
  lessonNumber: 2,
  title: "The Meaning Behind The Journey",
  subtitle: "Why We Serve: District 3220 & The Regent Purpose",
  readTime: "3 min",
  scene: SCENE_HIDDEN_GATEWAY_CORRIDOR,
  storyIntro: {
    speaker: "Gatekeeper Aaron",
    speakerRole: "Guardian of the Gateway",
    dialogue:
      "As you advance through the stone corridor, notice the carvings of past projects. Rotaract is not abstract theory—it is living history written in service.",
  },
  dialogue: DIALOGUE_CHAPTER1_LESSON2,
  codexSections: [
    {
      title: "The Living Purpose of Rotaract",
      content: [
        "Rotaract was created by Rotary International to provide young adults aged 18 and older with opportunities to develop professional leadership, expand global networks, and address pressing community challenges.",
        "In District 3220 (Sri Lanka & Maldives), Rotaract is a powerhouse of youth-led social impact. Rotaractors construct schools, plant native forests, support healthcare facilities, and bridge cultural divides.",
      ],
      keyTakeaway:
        "Rotaract stands at the intersection of service, leadership, and global fellowship.",
    },
    {
      title: "The 2026–27 District Banner",
      content: [
        "The guiding theme for 2026–27 is 'Igniting Possibilities & Inspiring Change.'",
        "This theme reminds us that inspiration without execution is just daydreaming. Rotaractors match enthusiasm with direction, creativity with consistency, and ambition with accountability.",
      ],
      bulletPoints: [
        "Pillar 1: Learn — Deeply understand community needs before designing interventions.",
        "Pillar 2: Serve — Deliver sustainable, high-impact projects that outlive our tenure.",
        "Pillar 3: Lead — Lead with integrity, empathy, and professional excellence.",
      ],
    },
  ],
  source: {
    publication: "Rotaract Information Handbook 2026–27",
    district: "Rotary International District 3220 — Sri Lanka & Maldives",
    section: "Purposeful Leadership & District 3220 Vision",
    pages: [4, 5, 7, 8, 38, 39],
    pageRangeDisplay: "pp. 4–5, 7–8, 38–39",
  },
  interactiveChallenge: CHALLENGE_CHAPTER1_LESSON2,
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
        text: "Personal Glory & Social Media Reach",
        explanation:
          "Incorrect. The handbook stresses matching ambition with accountability and community service.",
      },
      {
        id: "opt-c",
        text: "Leading in Complete Isolation from Others",
        explanation:
          "Incorrect. Global fellowship and multi-club partnerships are fundamental to the Rotaract movement.",
      },
      {
        id: "opt-d",
        text: "Replacing Physical Meetings with Pure Gaming",
        explanation:
          "Incorrect. Digital education is merely preparation for hands-on, real-world fellowship and community action.",
      },
    ],
    correctOptionId: "opt-a",
    hint: "Recall the banner Aaron highlighted in the corridor carvings: it begins with 'Igniting...'",
    successMessage:
      "The corridor carvings glow emerald! You hold the true meaning behind this expedition.",
  },
  reward: REWARD_CHAPTER1_LESSON2,
  companionAdvice: {
    nova: "Remember, {name}: when we design initiatives, always listen to the community first.",
    raya: "Big energy meets real purpose, {name}! That is how we ignite possibilities!",
    kai: "Align every project plan with measurable community deliverables, {name}.",
  },
};

export const LESSON_1_3: StoryLesson = {
  id: "lesson-1-3",
  chapterId: "chapter-1",
  lessonNumber: 3,
  title: "The Explorer's Promise",
  subtitle: "The Four-Way Test & The Five Pillars of Conduct",
  readTime: "3 min",
  scene: SCENE_HIDDEN_GATEWAY_SANCTUM,
  storyIntro: {
    speaker: "Gatekeeper Aaron",
    speakerRole: "Guardian of the Gateway",
    dialogue:
      "You stand at the inner sanctum of the Hidden Gateway. Before you embark across The River of Legacy, you must pledge the standard of our fellowship.",
  },
  dialogue: DIALOGUE_CHAPTER1_LESSON3,
  codexSections: [
    {
      title: "The Four-Way Test",
      content: [
        "Created in 1932 by Rotarian Herbert J. Taylor, the Four-Way Test is a 24-word ethical code translated into over 100 languages. It is not a code of punishment, but a practical moral compass.",
        "Of the things we think, say, or do:",
      ],
      bulletPoints: [
        "1. Is it the TRUTH? — Honesty, accuracy, and transparent integrity.",
        "2. Is it FAIR to all concerned? — Justice, equity, and treating others with dignity.",
        "3. Will it build GOODWILL and BETTER FRIENDSHIPS? — Fostering trust, camaraderie, and mutual respect.",
        "4. Will it be BENEFICIAL to all concerned? — Delivering lasting, positive value for the common good.",
      ],
      keyTakeaway:
        "The Four-Way Test guides personal, professional, and club decisions in every situation.",
    },
    {
      title: "The Five Explorer Pillars",
      content: [
        "Respect: Valuing the dignity, time, and diverse perspectives of all members and community partners.",
        "Professionalism: Approaching every meeting and project with punctuality, preparedness, and decorum.",
        "Inclusivity: Creating a welcoming fellowship where every prospect and member has a voice.",
        "Responsibility: Following through on commitments and safeguarding club assets.",
        "Integrity: Serving selflessly without seeking personal glory or shortcutting ethics.",
      ],
    },
    {
      title: "From Screen to Reality",
      content: [
        "This digital guide is your training map. Real Rotaract is lived through attending meetings, shaking hands, planting trees, mentoring youth, and forming lifelong friendships in the physical world.",
      ],
    },
  ],
  source: {
    publication: "Rotaract Information Handbook 2026–27",
    district: "Rotary International District 3220 — Sri Lanka & Maldives",
    section: "The Four-Way Test & Leadership Pillars",
    pages: [4, 6, 7, 8, 9, 10],
    pageRangeDisplay: "pp. 4–10",
  },
  interactiveChallenge: CHALLENGE_CHAPTER1_LESSON3,
  knowledgeTrial: {
    type: "scenario",
    question: "What is the primary relationship between this digital guide and your real Rotaract journey?",
    options: [
      {
        id: "opt-a",
        text: "The digital guide is preparation; real Rotaract happens through meetings, service, and fellowship in the real world.",
        explanation:
          "Correct! The digital journey equips you with knowledge, but true impact is realized in the physical community.",
      },
      {
        id: "opt-b",
        text: "Completing digital quizzes replaces the need to ever attend physical club meetings or community projects.",
        explanation:
          "Incorrect. Digital learning cannot replace active human fellowship and hands-on community service.",
      },
      {
        id: "opt-c",
        text: "The guide is just an entertaining RPG game with no real connection to Rotary or district principles.",
        explanation:
          "Incorrect. Every lesson is grounded directly in official District 3220 standards and the club constitution.",
      },
      {
        id: "opt-d",
        text: "Passing this guide automatically awards you executive club presidency without peer election.",
        explanation:
          "Incorrect. Leadership in Rotaract is democratically elected by fellow club members based on merit and service.",
      },
    ],
    correctOptionId: "opt-a",
    hint: "Remember Aaron's words: the screen is merely the map, not the destination.",
    successMessage:
      "The sanctum altar blazes with golden fire! You have pledged the Explorer's Promise and unlocked Chapter 2: The River of Legacy!",
  },
  reward: REWARD_CHAPTER1_LESSON3,
  companionAdvice: {
    nova: "Carry the Four-Way Test close to your heart, {name}. It is your truest compass.",
    raya: "The promise is made, {name}! Let's head straight into The River of Legacy with pride!",
    kai: "Integrity, consistency, and discipline, {name}. The journey ahead will test them all.",
  },
};

// ============================================================================
// CHAPTER 1 FULL CHAPTER DEFINITION
// ============================================================================

export const CHAPTER_1_HIDDEN_GATEWAY: StoryChapter = {
  id: "chapter-1",
  chapterNumber: 1,
  chapterLabel: "CHAPTER 1",
  chapterTitle: "The Hidden Gateway",
  worldName: "The Hidden Gateway",
  regionTitle: "Valley Threshold",
  seethawakaInspiration:
    "Inspired by the historic Seethawaka river entryway and stone heritage archways",
  summary:
    "The beginning of the explorer journey. The explorer enters the Regent Realm, meets their chosen companion, and discovers why the journey begins.",
  guideNpcId: "gatekeeper-aaron",
  location: {
    id: "loc-gateway",
    worldName: "The Hidden Gateway",
    regionTitle: "Valley Threshold",
    chapterNumber: 1,
    isPrologue: false,
    coords: { x: 50, y: 88 },
    visualTag: "GATEWAY",
    image: "/assets/pixel/ui/chapter_cards/card_01_hidden_gateway.jpg",
    routeHref: "/journey/loc-gateway",
    audioTheme: "theme-gateway",
    seethawakaHeritage: {
      historicalLandmark: "Seethawaka River Entrance & Stone Threshold",
      loreContext:
        "The ancient boundary where royal travelers crossed the river into the historic kingdom of Seethawaka.",
      culturalInspiration: "Stone carving motifs and guardian archways of ancient Lanka.",
      monumentType: "archway",
    },
    description:
      "Cross the ancient stone archway into the Realm of Regent. Here, your journey from prospect to leader begins.",
    expandedLore:
      "For centuries, travelers arrived at this river junction seeking wisdom and brotherhood. Now the gate awakens for a new generation of Rotaract explorers.",
  },
  cinematicIntro: {
    id: "cinematic-intro-gateway",
    worldTitle: "THE HIDDEN GATEWAY",
    tagline: "Where Curiosity Meets Purpose",
    backgroundImage: "/assets/pixel/worlds/backgrounds/01_hidden_gateway.jpg",
    ambientSoundtrack: "theme-gateway",
    slides: [
      {
        id: "c1-slide-1",
        order: 1,
        title: "The Stone Arch of Seethawaka",
        subtitle: "A Sacred Threshold",
        narrationText:
          "Before you rises the ancient stone arch of Seethawaka Regent. Beyond lies a realm shaped by fellowship, purpose, and community leadership.",
        speaker: "Gatekeeper Aaron",
        speakerRole: "Guardian of the Gateway",
      },
      {
        id: "c1-slide-2",
        order: 2,
        title: "Meeting Your Companion",
        subtitle: "Fellowship Begins",
        narrationText:
          "In this realm, no explorer walks alone. Your chosen companion steps forward from the mist to guide your path through every chronicle and avenue of service.",
        speaker: "Gatekeeper Aaron",
        speakerRole: "Guardian of the Gateway",
      },
      {
        id: "c1-slide-3",
        order: 3,
        title: "The Explorer's Call",
        subtitle: "District 3220 Sri Lanka & Maldives",
        narrationText:
          "Rotaractors here do not merely read history—they forge it. In this realm, you will learn the code, master the avenues of service, and discover the leader within.",
        speaker: "Gatekeeper Aaron",
        speakerRole: "Guardian of the Gateway",
      },
    ],
    companionGreeting: {
      nova: "Every great quest begins with a single step across a threshold. Let us observe, learn, and lead.",
      raya: "Look at those towering stone arches! Our adventure starts right here, right now! Let's conquer the Gateway!",
      kai: "Structure, purpose, and clear goals. The Hidden Gateway is primed. Let us advance with discipline.",
    },
  },
  lessons: [LESSON_1_1, LESSON_1_2, LESSON_1_3],
  completionReward: REWARD_CHAPTER1_COMPLETION,
  completionCinematic: {
    title: "CHAPTER 1 MASTERED: THE HIDDEN GATEWAY HAS UNSEALED",
    congratulationsText:
      "You have stepped forward, understood the meaning behind the journey, and pledged the Explorer's Promise. The waters of Chapter 2: The River of Legacy now open before you!",
    badgeRewardId: "INITIATE",
    unlockedWorldId: "loc-rotaract-harbor",
    unlockedWorldName: "The River of Legacy",
  },
};
