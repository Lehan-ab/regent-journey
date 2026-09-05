import {
  DialogueBeat,
  LessonSceneConfig,
  LessonSourceInfo,
  KnowledgeTrial,
} from "@/types/story";

export type StoryDialogueBeat = DialogueBeat;

export interface KnowledgeCheckOption {
  id: string;
  text: string;
  explanation: string;
}

export interface KnowledgeCheck {
  question: string;
  options: KnowledgeCheckOption[];
  correctOptionId: string;
  hint: string;
  successMessage: string;
}

export interface LessonSection {
  title: string;
  content: string[];
  keyTakeaway?: string;
  bulletPoints?: string[];
  quote?: {
    text: string;
    author: string;
  };
}

export interface LessonData {
  id: string;
  chapterId: string;
  lessonNumber: number;
  title: string;
  subtitle: string;
  readTime: string;
  xpReward: number;
  storyIntro: {
    speaker: string;
    speakerRole: string;
    dialogue: string;
  };
  scriptedDialogue: DialogueBeat[];
  sceneConfig: LessonSceneConfig;
  source: LessonSourceInfo;
  sections: LessonSection[];
  companionAdvice: {
    nova: string; // Wisdom / Knowledge
    raya: string; // Action / Adventure
    kai: string;  // Strategy / Planning
  };
  knowledgeTrial: KnowledgeTrial;
  // Backward compatibility alias for knowledgeTrial
  knowledgeCheck?: KnowledgeCheck;
}

export interface ChapterDetails {
  id: string;
  chapterNumber: number;
  chapterLabel: string;
  chapterTitle: string;
  worldName: string;
  regionTitle: string;
  seethawakaInspiration: string;
  summary: string;
  badgeReward: string;
  xpReward: number;
  guideNpc?: string;
  lessons: LessonData[];
}

export const CHAPTERS_DATA: Record<string, ChapterDetails> = {
  // =========================================================================
  // PROLOGUE — THE GATEWAY
  // =========================================================================
  "loc-gateway": {
    id: "loc-gateway",
    chapterNumber: 0,
    chapterLabel: "PROLOGUE",
    chapterTitle: "The Gateway",
    worldName: "The Gateway",
    regionTitle: "Valley Threshold",
    guideNpc: "gatekeeper-aaron",
    seethawakaInspiration: "Inspired by the historic Seethawaka river entryway and stone heritage archways",
    summary: "Cross the stone archway into the Realm of Regent. Meet Gatekeeper Aaron, discover the core mission of District 3220, and begin your journey from curious explorer to impactful Rotaractor.",
    badgeReward: "INITIATE",
    xpReward: 50,
    lessons: [
      {
        id: "lesson-0-1",
        chapterId: "loc-gateway",
        lessonNumber: 1,
        title: "The Call Beyond the Gate",
        subtitle: "The Spirit of District 3220 & 2026–27 Focus",
        readTime: "2 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Gatekeeper Aaron",
          speakerRole: "Portal Guardian",
          dialogue: "Halt, traveler! Beyond this ancient stone arch lies the historic valley of Seethawaka. You carry curiosity in your eyes and purpose in your stride.",
        },
        sceneConfig: {
          sceneType: "portal",
          variant: "gate-mist",
          atmosphereTitle: "Twilight Portal Mist",
          backdropImage: "/images/realm_of_regent_hero.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Core Spirit & 2026–27 Theme",
          pages: [4, 5],
          pageRangeDisplay: "pp. 4–5",
        },
        scriptedDialogue: [
          {
            id: "g1-1",
            speaker: "npc",
            speakerName: "Gatekeeper Aaron",
            role: "Portal Guardian",
            text: "Welcome, seeker. You stand before the Gateway to the Realm of Regent. Rotaract is not a spectator sport—it is a living platform where youth leadership is shaped through selfless service.",
            emotion: "warm",
          },
          {
            id: "g1-2",
            speaker: "explorer",
            text: "I am ready to learn, Gatekeeper Aaron. What is the spirit that guides Rotaractors across Sri Lanka and Maldives this year?",
            emotion: "curious",
          },
          {
            id: "g1-3",
            speaker: "npc",
            speakerName: "Gatekeeper Aaron",
            role: "Portal Guardian",
            text: "For the 2026–27 year, District 3220 marches under the banner of 'Igniting Possibilities & Inspiring Change.' We stand at the intersection of service, leadership, and global citizenship.",
            emotion: "serious",
            sceneEvent: "portal_lantern_glow",
          },
          {
            id: "g1-4",
            speaker: "companion",
            text: "Igniting possibilities means we do not wait for permission to solve problems—we take the initiative!",
            emotion: "thoughtful",
            companionVariants: {
              nova: "Notice the depth in Aaron's words: leadership here is not about titles, but the quiet courage to serve.",
              raya: "Igniting possibilities! That means bold adventures and real action! Let's get through this gate!",
              kai: "Clear focus: service, leadership, and citizenship. A structured path to building real capability.",
            },
          },
          {
            id: "g1-5",
            speaker: "npc",
            speakerName: "Gatekeeper Aaron",
            role: "Portal Guardian",
            text: "Remember this golden rule: enthusiasm must be matched with direction, and ambition with accountability. Answer the portal's trial, and the threshold shall unseal.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "The Core Spirit of Rotaract",
            content: [
              "Rotaract is an international youth movement where young leaders discover their ability to create meaningful change through community action, lifelong fellowship, and personal development.",
              "In Rotary International District 3220 (Sri Lanka & Maldives), Rotaract empowers young professionals to bridge communities and tackle pressing social challenges.",
            ],
            keyTakeaway: "Rotaract stands at the vital intersection of service, leadership, and global citizenship.",
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
        companionAdvice: {
          nova: "Reflect deeply on the theme: inspiration begins with small, consistent acts of service.",
          raya: "Don't hold back! Energy and passion are the spark that ignites real community change!",
          kai: "Keep your goals clear and measurable from your very first step through the gate.",
        },
        knowledgeTrial: {
          type: "multiple-choice",
          question: "What is the official focus theme of District 3220 for the 2026–27 year?",
          options: [
            {
              id: "opt-a",
              text: "Igniting Possibilities & Inspiring Change",
              explanation: "Correct! The official 2026–27 district theme emphasizes igniting possibilities and inspiring change through service.",
            },
            {
              id: "opt-b",
              text: "Leading by Ambition Alone",
              explanation: "Incorrect. The handbook emphasizes matching ambition with accountability and selfless service.",
            },
            {
              id: "opt-c",
              text: "Service Only in Isolation",
              explanation: "Incorrect. Collaboration and global citizenship are core pillars of Rotaract.",
            },
            {
              id: "opt-d",
              text: "Digital Growth Without Action",
              explanation: "Incorrect. Digital learning is only preparation for real-world impact.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Think about the banner Aaron described: it begins with 'Igniting...'",
          successMessage: "The portal arch resonates with amber light! You understand the guiding spirit of District 3220.",
        },
      },
      {
        id: "lesson-0-2",
        chapterId: "loc-gateway",
        lessonNumber: 2,
        title: "The Explorer's Promise",
        subtitle: "The Five Core Values of an Explorer",
        readTime: "2 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Gatekeeper Aaron",
          speakerRole: "Portal Guardian",
          dialogue: "You have grasped our spirit. Now you must carry the Explorer's Code: respect, professionalism, inclusivity, responsibility, and integrity.",
        },
        sceneConfig: {
          sceneType: "portal",
          variant: "gate-unsealed",
          atmosphereTitle: "Unsealed Gateway Threshold",
          backdropImage: "/images/realm_of_regent_hero.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Leadership Pillars & Best Practices",
          pages: [4, 6, 7, 8, 9, 10],
          pageRangeDisplay: "pp. 4–10",
        },
        scriptedDialogue: [
          {
            id: "g2-1",
            speaker: "npc",
            speakerName: "Gatekeeper Aaron",
            role: "Portal Guardian",
            text: "Before you step forward into the forest of Rotary Roots, you must commit to the five pillars of our conduct: respect, professionalism, inclusivity, responsibility, and integrity.",
            emotion: "serious",
          },
          {
            id: "g2-2",
            speaker: "explorer",
            text: "How does an explorer embody these values when engaging with real communities?",
            emotion: "curious",
          },
          {
            id: "g2-3",
            speaker: "npc",
            speakerName: "Gatekeeper Aaron",
            role: "Portal Guardian",
            text: "By remembering that digital study is merely the map. The journey itself requires stepping out into meetings, listening to people, and serving with humility.",
            emotion: "warm",
            sceneEvent: "gate_stones_illuminate",
          },
          {
            id: "g2-4",
            speaker: "companion",
            text: "The Explorer's cycle is simple: Learn first, Serve with devotion, and Lead by example.",
            emotion: "celebrate",
            companionVariants: {
              nova: "True integrity means doing the right thing even when no crowd is watching.",
              raya: "Promise made! Let's honor the code and make every project unforgettable!",
              kai: "A commitment backed by personal discipline. That is how trust is earned.",
            },
          },
          {
            id: "g2-5",
            speaker: "npc",
            speakerName: "Gatekeeper Aaron",
            role: "Portal Guardian",
            text: "Well spoken. Take this promise with you. The stone gates swing wide—welcome to the Realm of Regent!",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "The Five Explorer Pillars",
            content: [
              "Respect: Valuing the dignity, time, and diverse perspectives of all members and community partners.",
              "Professionalism: Approaching every meeting and project with punctuality, preparedness, and decorum.",
              "Inclusivity: Creating a welcoming brotherhood and sisterhood where everyone has a voice.",
              "Responsibility: Following through on commitments and safeguarding club assets.",
              "Integrity: Serving selflessly without seeking personal glory or shortcutting ethics.",
            ],
            keyTakeaway: "Digital knowledge is only preparation; real Rotaract lives through action in the physical world.",
          },
        ],
        companionAdvice: {
          nova: "Hold tight to the five pillars—they will anchor your leadership when challenges arise.",
          raya: "Values aren't meant to sit on a scroll—let's live them out on the trail!",
          kai: "Consistency is key: show up on time, communicate clearly, and deliver on promises.",
        },
        knowledgeTrial: {
          type: "scenario",
          question: "What is the primary relationship between this digital guide and your real Rotaract journey?",
          options: [
            {
              id: "opt-a",
              text: "The digital guide is preparation; real Rotaract happens through meetings, service, and fellowship in the real world.",
              explanation: "Correct! The digital journey equips you with knowledge, but true impact is realized in the physical community.",
            },
            {
              id: "opt-b",
              text: "Completing digital quizzes replaces the need to ever attend physical club meetings.",
              explanation: "Incorrect. Digital learning cannot replace active human fellowship and community service.",
            },
            {
              id: "opt-c",
              text: "The guide is just a gaming app with no connection to real club principles.",
              explanation: "Incorrect. Every lesson is grounded directly in official District 3220 standards.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Remember Aaron's words: the screen is merely the map, not the destination.",
          successMessage: "The heavy stone portal unseals! You have earned the INITIATE badge and unlocked Rotary Roots.",
        },
      },
    ],
  },

  // =========================================================================
  // CHAPTER 1 — ROTARY ROOTS
  // =========================================================================
  "loc-rotary-roots": {
    id: "loc-rotary-roots",
    chapterNumber: 1,
    chapterLabel: "CHAPTER 1",
    chapterTitle: "Rotary Roots",
    worldName: "Sacred Botanical Canopy",
    regionTitle: "Bioluminescent Forest",
    guideNpc: "archivist",
    seethawakaInspiration: "Inspired by Puwarankanda rainforest reserves and ancient banyan heritage",
    summary: "Descend into the bioluminescent banyan canopy where The Archivist reveals the roots of Rotaract values: selfless service, the People of Action cycle, and professional conduct.",
    badgeReward: "ROOT SEEKER",
    xpReward: 100,
    lessons: [
      {
        id: "lesson-1-1",
        chapterId: "loc-rotary-roots",
        lessonNumber: 1,
        title: "What Rotaract Stands For",
        subtitle: "Core Values of the Movement",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "The Archivist",
          speakerRole: "Keeper of the Living Codex",
          dialogue: "Welcome beneath the Sacred Canopy. Touch this living codex; feel how every branch of Rotaract draws nourishment from five deep roots.",
        },
        sceneConfig: {
          sceneType: "canopy",
          variant: "living-codex",
          atmosphereTitle: "Bioluminescent Banyan Roots",
          backdropImage: "/images/rotary_roots.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Core Spirit & Club Service Foundations",
          pages: [4, 5, 28, 29, 30, 31, 32, 38, 39],
          pageRangeDisplay: "pp. 4–5, 28–32, 38–39",
        },
        scriptedDialogue: [
          {
            id: "rr1-1",
            speaker: "npc",
            speakerName: "The Archivist",
            role: "Keeper of the Living Codex",
            text: "Look closely at these glowing veins. Rotaract is an international fellowship of young leaders united by five foundational values: selfless service, leadership development, lifelong fellowship, active collaboration, and measurable impact.",
            emotion: "warm",
          },
          {
            id: "rr1-2",
            speaker: "explorer",
            text: "Archivist, why is fellowship placed right beside selfless service?",
            emotion: "curious",
          },
          {
            id: "rr1-3",
            speaker: "npc",
            speakerName: "The Archivist",
            role: "Keeper of the Living Codex",
            text: "Because service done in isolation quickly burns out. Fellowship is the binding root that keeps a team joyful, resilient, and united across difficult service expeditions.",
            emotion: "thoughtful",
            sceneEvent: "roots_pulse_green",
          },
          {
            id: "rr1-4",
            speaker: "companion",
            text: "When we serve alongside true friends, every challenge becomes a memorable adventure!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Notice how the banyan tree grows stronger through intertwined roots—just like our fellowship.",
              raya: "Together we can tackle huge challenges that no one could ever solve alone!",
              kai: "A cohesive team with aligned values executes far more effectively than disorganized volunteers.",
            },
          },
          {
            id: "rr1-5",
            speaker: "npc",
            speakerName: "The Archivist",
            role: "Keeper of the Living Codex",
            text: "Hold this truth close: Rotaract is not merely an organization you join—it is a standard of purpose you carry into the world.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "The Five Foundational Pillars",
            content: [
              "Selfless Service: Addressing community needs without seeking personal profit or fame.",
              "Youth Leadership: Developing decision-making, empathy, and strategic thinking by taking real responsibility.",
              "Lifelong Fellowship: Building enduring bonds with like-minded changemakers locally and globally.",
              "Active Collaboration: Partnering with other clubs, Rotary sponsors, and community organizations.",
              "Measurable Impact: Ensuring every project produces tangible, verified improvements in people's lives.",
            ],
            keyTakeaway: "Service without fellowship is fragile; fellowship without service lacks purpose.",
          },
        ],
        companionAdvice: {
          nova: "Remember that leadership is learned by serving others, not by commanding them.",
          raya: "Find teammates who share your passion—fellowship makes the hardest work feel effortless!",
          kai: "Structure your commitments carefully so your service remains consistent and sustainable.",
        },
        knowledgeTrial: {
          type: "classification",
          question: "Which of the following best expresses why fellowship is essential to Rotaract service?",
          options: [
            {
              id: "opt-a",
              text: "Fellowship builds trust and resilience, ensuring service teams remain united and avoid burnout during difficult projects.",
              explanation: "Correct! Fellowship provides the emotional foundation, camaraderie, and endurance that sustain service.",
            },
            {
              id: "opt-b",
              text: "Fellowship exists only as a social perk after all work is done.",
              explanation: "Incorrect. Fellowship is woven directly into how Rotaractors collaborate and serve.",
            },
            {
              id: "opt-c",
              text: "Fellowship is meant to replace community service entirely.",
              explanation: "Incorrect. Rotaract is equally committed to service and fellowship.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Think about what keeps a team motivated when working in challenging community conditions.",
          successMessage: "The banyan roots illuminate with radiant green light! You understand the heartbeat of Rotaract values.",
        },
      },
      {
        id: "lesson-1-2",
        chapterId: "loc-rotary-roots",
        lessonNumber: 2,
        title: "Service Above Self in Action",
        subtitle: "Sustainable Community Service Principles",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "The Archivist",
          speakerRole: "Keeper of the Living Codex",
          dialogue: "Step toward this clearing. See this community garden? Let me show you the difference between a temporary gift and sustainable roots.",
        },
        sceneConfig: {
          sceneType: "canopy",
          variant: "grove-rejuvenation",
          atmosphereTitle: "Rejuvenating Botanical Grove",
          backdropImage: "/images/rotary_roots.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Community Service Principles",
          pages: [38, 39],
          pageRangeDisplay: "pp. 38–39",
        },
        scriptedDialogue: [
          {
            id: "rr2-1",
            speaker: "npc",
            speakerName: "The Archivist",
            role: "Keeper of the Living Codex",
            text: "Rotary's timeless motto is 'Service Above Self.' But in District 3220, we insist that service must never be superficial. True service addresses the root cause, not just the visible symptom.",
            emotion: "serious",
          },
          {
            id: "rr2-2",
            speaker: "explorer",
            text: "How do we make sure our service creates lasting roots rather than just temporary relief?",
            emotion: "curious",
          },
          {
            id: "rr2-3",
            speaker: "npc",
            speakerName: "The Archivist",
            role: "Keeper of the Living Codex",
            text: "By consulting the community, transferring skills, and building local ownership. If a project collapses the day the club leaves, it was not sustainable service.",
            emotion: "thoughtful",
            sceneEvent: "grove_flowers_bloom",
          },
          {
            id: "rr2-4",
            speaker: "companion",
            text: "Give a community water for one day, or build a solar well with community caretakers for ten years!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Empowerment is the truest gift: when the community owns the solution, the roots never wither.",
              raya: "No quick photo-ops! We want to build things that our grandchildren can still be proud of!",
              kai: "Sustainable design requires risk assessment, maintenance plans, and local training.",
            },
          },
          {
            id: "rr2-5",
            speaker: "npc",
            speakerName: "The Archivist",
            role: "Keeper of the Living Codex",
            text: "Always ask: does this project empower the community to thrive independently? That is Service Above Self in action.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Temporary Charity vs. Sustainable Development",
            content: [
              "Temporary relief (such as one-off food parcels) can meet urgent crises, but long-term community development requires addressing root systemic needs.",
              "Sustainable projects build community infrastructure, transfer technical knowledge, and establish local committees to maintain resources.",
            ],
            keyTakeaway: "True service empowers the community to sustain benefits long after the project handover.",
          },
        ],
        companionAdvice: {
          nova: "Always listen with humility before proposing solutions.",
          raya: "Roll up your sleeves and work alongside community members, not above them!",
          kai: "Evaluate long-term operational costs before launching any community infrastructure.",
        },
        knowledgeTrial: {
          type: "scenario",
          question: "Which of the following projects demonstrates true sustainable Community Service?",
          options: [
            {
              id: "opt-a",
              text: "Installing a gravity-fed water purification system and training a local village youth committee to manage and maintain it.",
              explanation: "Correct! Training a local committee ensures community ownership, long-term maintenance, and enduring benefits.",
            },
            {
              id: "opt-b",
              text: "Handing out bottled water for a single afternoon photo session with no maintenance plan.",
              explanation: "Incorrect. This provides only momentary relief and generates plastic waste without lasting impact.",
            },
            {
              id: "opt-c",
              text: "Building a facility without consulting village elders, leaving it locked after launch.",
              explanation: "Incorrect. Without community consultation and access, infrastructure quickly falls into disuse.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Look for the option that builds community skills and long-term ownership.",
          successMessage: "The clearing blossoms with flourishing flowers! You understand the essence of sustainable service.",
        },
      },
      {
        id: "lesson-1-3",
        chapterId: "loc-rotary-roots",
        lessonNumber: 3,
        title: "People of Action",
        subtitle: "The Cycle from Idea to Measurable Impact",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "The Archivist",
          speakerRole: "Keeper of the Living Codex",
          dialogue: "Step toward this terrace. Rotaractors do not merely discuss community problems—we are People of Action. Observe the four stages of the action cycle.",
        },
        sceneConfig: {
          sceneType: "canopy",
          variant: "action-grove",
          atmosphereTitle: "Irrigation Canal of Action",
          backdropImage: "/images/rotary_roots.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "People of Action & Service Methodology",
          pages: [4, 5, 38, 39, 93, 106, 107],
          pageRangeDisplay: "pp. 4–5, 38–39, 93, 106–107",
        },
        scriptedDialogue: [
          {
            id: "rr3-1",
            speaker: "npc",
            speakerName: "The Archivist",
            role: "Keeper of the Living Codex",
            text: "Across the Rotary family, we are known as 'People of Action.' We follow an unbroken four-stage cycle: Idea → Collaboration → Service → Measurable Impact.",
            emotion: "warm",
          },
          {
            id: "rr3-2",
            speaker: "explorer",
            text: "Why must Collaboration come before Service?",
            emotion: "curious",
          },
          {
            id: "rr3-3",
            speaker: "npc",
            speakerName: "The Archivist",
            role: "Keeper of the Living Codex",
            text: "Because a single mind cannot foresee every obstacle. Collaboration brings together diverse perspectives, community elders, and technical partners before a single stone is laid.",
            emotion: "thoughtful",
            sceneEvent: "water_flows_through_canal",
          },
          {
            id: "rr3-4",
            speaker: "companion",
            text: "And the final stage is Measurable Impact—we must prove that life actually improved!",
            emotion: "celebrate",
            companionVariants: {
              nova: "An idea without action is a daydream; action without measurement is blind.",
              raya: "Let's turn great ideas into roaring reality through unstoppable teamwork!",
              kai: "Track each stage methodically: plan the work, collaborate broadly, and document outcomes.",
            },
          },
          {
            id: "rr3-5",
            speaker: "npc",
            speakerName: "The Archivist",
            role: "Keeper of the Living Codex",
            text: "When you execute all four stages with discipline, your service transforms lives and stands the test of time.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "The Four-Stage People of Action Cycle",
            content: [
              "1. Idea: Identifying a genuine community need through empathetic listening and observation.",
              "2. Collaboration: Forming project teams, consulting stakeholders, and securing partner expertise.",
              "3. Service: Executing the initiative with safety, quality, and mutual respect.",
              "4. Measurable Impact: Evaluating actual qualitative and quantitative changes in the community.",
            ],
            keyTakeaway: "Rotaractors bridge the gap between good intentions and tangible, documented results.",
          },
        ],
        companionAdvice: {
          nova: "Check your assumptions at the idea stage by consulting those who will be affected.",
          raya: "Keep the momentum strong during the service phase—your energy inspires the team!",
          kai: "Set concrete metrics before launching so measuring impact at the end is straightforward.",
        },
        knowledgeTrial: {
          type: "ordering",
          question: "What is the correct sequential order of the People of Action cycle?",
          options: [
            {
              id: "opt-a",
              text: "Idea → Collaboration → Service → Measurable Impact",
              explanation: "Correct! An idea is refined through collaboration, executed through service, and verified through measurable impact.",
            },
            {
              id: "opt-b",
              text: "Service → Idea → Measurable Impact → Collaboration",
              explanation: "Incorrect. Executing service before formulating an idea and collaborating leads to disorganized projects.",
            },
            {
              id: "opt-c",
              text: "Collaboration → Measurable Impact → Service → Idea",
              explanation: "Incorrect. Measurement occurs at the outcome stage, not before service begins.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Start with the spark of insight, gather partners next, execute, and finally evaluate outcomes.",
          successMessage: "The irrigation canal flows freely with clean water! The People of Action cycle is complete.",
        },
      },
      {
        id: "lesson-1-4",
        chapterId: "loc-rotary-roots",
        lessonNumber: 4,
        title: "The Standard We Carry",
        subtitle: "Professional Conduct & Event Standards",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "The Archivist",
          speakerRole: "Keeper of the Living Codex",
          dialogue: "Three botanical archways stand before us: Punctuality, Respect, and Substance-Free Integrity. These are the standards every Rotaractor carries.",
        },
        sceneConfig: {
          sceneType: "canopy",
          variant: "conduct-gateways",
          atmosphereTitle: "Archways of Integrity",
          backdropImage: "/images/rotary_roots.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Professional Conduct & Event Standards",
          pages: [7, 8, 9, 10, 113],
          pageRangeDisplay: "pp. 7–10, 113",
        },
        scriptedDialogue: [
          {
            id: "rr4-1",
            speaker: "npc",
            speakerName: "The Archivist",
            role: "Keeper of the Living Codex",
            text: "When you wear the badge or attend a Rotaract meeting, you represent an international movement. The handbook establishes strict standards of professional conduct.",
            emotion: "serious",
          },
          {
            id: "rr4-2",
            speaker: "explorer",
            text: "What behavioral guidelines are expected of every member and prospect?",
            emotion: "curious",
          },
          {
            id: "rr4-3",
            speaker: "npc",
            speakerName: "The Archivist",
            role: "Keeper of the Living Codex",
            text: "Punctuality, respectful communication without verbal abuse, attentive listening during presentations, and responsible notification if delayed. Furthermore, illegal or legal narcotics, cigarettes, vapes, and similar prohibited substances are strictly banned at Rotaract meetings and events.",
            emotion: "serious",
            sceneEvent: "archways_glow_gold",
          },
          {
            id: "rr4-4",
            speaker: "companion",
            text: "Our conduct creates the public's impression of Rotaract. When we show respect, we protect the dignity of our entire club.",
            emotion: "thoughtful",
            companionVariants: {
              nova: "Dignity is built through quiet consistency. Showing up on time speaks louder than speeches.",
              raya: "Let's bring high energy, positive vibes, and total respect to every single gathering!",
              kai: "Clear protocols protect club trust and ensure events run smoothly and professionally.",
            },
          },
          {
            id: "rr4-5",
            speaker: "npc",
            speakerName: "The Archivist",
            role: "Keeper of the Living Codex",
            text: "Uphold this standard in all you do. You have absorbed the roots of our values; now the riverway to Rotaract Harbor lies open.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Professional Conduct & Meeting Etiquette",
            content: [
              "Punctuality: Arrive on time for General Assemblies, projects, and district conferences.",
              "Respectful Communication: Maintain courteous, professional language at all times. Harassment or verbal abuse is strictly unacceptable.",
              "Attentiveness: Silence mobile devices during formal proceedings and give full attention to speakers.",
              "Substance-Free Standard: Illegal or legal narcotics, cigarettes, vapes, and similar prohibited substances are strictly prohibited at Rotaract meetings, projects, and events under District event guidance.",
            ],
            keyTakeaway: "Public trust in Rotaract depends on the personal discipline and professional conduct of each member.",
          },
        ],
        companionAdvice: {
          nova: "If delayed due to an emergency, notify the organizers promptly and politely.",
          raya: "Support the speakers by being present, attentive, and encouraging!",
          kai: "Check event dress codes in advance—smart casual or formal according to the invitation.",
        },
        knowledgeTrial: {
          type: "multiple-choice",
          question: "Under District 3220 event guidelines, what is the policy regarding substances at Rotaract events and meetings?",
          options: [
            {
              id: "opt-a",
              text: "Illegal or legal narcotics, cigarettes, vapes, and similar prohibited substances are strictly prohibited at Rotaract meetings and events.",
              explanation: "Correct! The handbook explicitly mandates a substance-free environment at Rotaract events and meetings.",
            },
            {
              id: "opt-b",
              text: "Substances are permitted as long as members step outside the room.",
              explanation: "Incorrect. Event standards prohibit these substances across all Rotaract events and meetings.",
            },
            {
              id: "opt-c",
              text: "There is no formal district policy regarding event conduct.",
              explanation: "Incorrect. The District handbook outlines clear behavioral and substance policies on pages 7–10.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "The handbook requires a strictly substance-free environment to maintain professional integrity.",
          successMessage: "All three botanical archways shine with brilliant gold! Chapter 1 is complete, and the ROOT SEEKER badge is yours.",
        },
      },
    ],
  },

  // =========================================================================
  // CHAPTER 2 — ROTARACT HARBOR
  // =========================================================================
  "loc-rotaract-harbor": {
    id: "loc-rotaract-harbor",
    chapterNumber: 2,
    chapterLabel: "CHAPTER 2",
    chapterTitle: "Rotaract Harbor",
    worldName: "River Basin Harbor",
    regionTitle: "Historic Kelani / Seethawaka River Confluence",
    guideNpc: "port-master-kael",
    seethawakaInspiration: "Inspired by the historic river transport routes of the Seethawaka River Basin",
    summary: "Board the rivercraft at Rotaract Harbor where Port Master Kael charts the concentric network of clubs, the rhythm of District 3220 assemblies, and why accurate RMIS records keep the entire fleet united.",
    badgeReward: "HARBOR MASTER",
    xpReward: 100,
    lessons: [
      {
        id: "lesson-2-1",
        chapterId: "loc-rotaract-harbor",
        lessonNumber: 1,
        title: "Club, District & the Wider Network",
        subtitle: "The Concentric Rotaract Ecosystem",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Port Master Kael",
          speakerRole: "Harbor Navigator",
          dialogue: "Ahoy, Explorer! Cast your eyes across these river basin docks. Each ship represents a vital part of our global Rotaract fleet.",
        },
        sceneConfig: {
          sceneType: "harbor",
          variant: "navigation-dock",
          atmosphereTitle: "Bustling River Docks",
          backdropImage: "/images/chapter3_realms.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Rotaract Ecosystem & Networks",
          pages: [30, 31, 32, 33, 34, 52, 53, 54, 132],
          pageRangeDisplay: "pp. 30–34, 52–54, 132",
        },
        scriptedDialogue: [
          {
            id: "rh1-1",
            speaker: "npc",
            speakerName: "Port Master Kael",
            role: "Harbor Navigator",
            text: "Welcome to Rotaract Harbor! A prospect explorer must never think their club exists on an isolated island. We belong to an interconnected ecosystem.",
            emotion: "warm",
          },
          {
            id: "rh1-2",
            speaker: "explorer",
            text: "How does our club connect to the wider movement across Sri Lanka, the Maldives, and the world?",
            emotion: "curious",
          },
          {
            id: "rh1-3",
            speaker: "npc",
            speakerName: "Port Master Kael",
            role: "Harbor Navigator",
            text: "Think of concentric circles: your home club at the center; sister clubs across Sri Lanka and Maldives; District 3220 coordinating the fleet; the Rotary family providing mentorship; and global networks spanning 180+ nations.",
            emotion: "thoughtful",
            sceneEvent: "unroll_harbor_chart",
          },
          {
            id: "rh1-4",
            speaker: "companion",
            text: "And remember: RACSR is an independent, self-sponsored club with autonomous youth leadership and strong Rotary family connections!",
            emotion: "celebrate",
            companionVariants: {
              nova: "The beauty of this network is that whenever you travel, you find brothers and sisters of service.",
              raya: "Thousands of young changemakers rowing in the same direction! Imagine the waves we can make!",
              kai: "Strong club foundations enable seamless regional and international joint ventures.",
            },
          },
          {
            id: "rh1-5",
            speaker: "npc",
            speakerName: "Port Master Kael",
            role: "Harbor Navigator",
            text: "When you serve your local community, you are part of a global youth movement. Keep your compass true to that vision.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "The Concentric Rotaract Network",
            content: [
              "1. The Club: The primary home of fellowship, weekly/monthly projects, and member growth.",
              "2. District 3220: Uniting clubs across Sri Lanka and the Maldives under shared strategic goals.",
              "3. Rotary Family: Rotary, Rotaract, and Interact collaborating for generational community impact.",
              "4. Global Network: Over 200,000 Rotaractors worldwide sharing ideas, exchanges, and humanitarian service.",
            ],
            keyTakeaway: "Local action gains global significance through the interconnected Rotaract family.",
          },
        ],
        companionAdvice: {
          nova: "Attend multi-club joint meetings to experience the breadth of our fellowship.",
          raya: "Reach out to sister clubs—collaborative projects are twice as impactful and twice as fun!",
          kai: "Understand district structures so you can leverage regional resources for club initiatives.",
        },
        knowledgeTrial: {
          type: "classification",
          question: "Which statement accurately describes the organizational relationship between RACSR and District 3220?",
          options: [
            {
              id: "opt-a",
              text: "RACSR is an independent self-sponsored club operating as an active member club within Rotary International District 3220 (Sri Lanka & Maldives).",
              explanation: "Correct! RACSR is an autonomous, self-sponsored club belonging to the District 3220 network.",
            },
            {
              id: "opt-b",
              text: "RACSR operates completely outside of Rotary International with no district affiliation.",
              explanation: "Incorrect. RACSR is chartered under Rotary International District 3220.",
            },
            {
              id: "opt-c",
              text: "RACSR is governed directly by a single local corporate sponsor.",
              explanation: "Incorrect. Rotaract clubs are youth-governed organizations within the Rotary family.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Remember that RACSR is autonomous and self-sponsored, yet firmly anchored in District 3220.",
          successMessage: "The navigational chart glows with interconnected sea lanes! You understand our place in the fleet.",
        },
      },
      {
        id: "lesson-2-2",
        chapterId: "loc-rotaract-harbor",
        lessonNumber: 2,
        title: "The District Rhythm",
        subtitle: "Assemblies, Coordination & Cross-Club Unity",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Port Master Kael",
          speakerRole: "Harbor Navigator",
          dialogue: "Look up at the harbor signal tower. The rotating brass beacon coordinates the movements of every vessel in the district.",
        },
        sceneConfig: {
          sceneType: "harbor",
          variant: "beacon-tower",
          atmosphereTitle: "Signal Tower & Astronomical Clock",
          backdropImage: "/images/chapter3_realms.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "District Interaction & Coordination",
          pages: [7, 8, 34, 132, 133],
          pageRangeDisplay: "pp. 7–8, 34, 132–133",
        },
        scriptedDialogue: [
          {
            id: "rh2-1",
            speaker: "npc",
            speakerName: "Port Master Kael",
            role: "Harbor Navigator",
            text: "A district of over ninety clubs cannot sail smoothly by accident. We move according to an intentional district rhythm.",
            emotion: "warm",
          },
          {
            id: "rh2-2",
            speaker: "explorer",
            text: "What major gatherings and coordination mechanisms create this rhythm?",
            emotion: "curious",
          },
          {
            id: "rh2-3",
            speaker: "npc",
            speakerName: "Port Master Kael",
            role: "Harbor Navigator",
            text: "District Assemblies, training conferences, the annual District Rotaract Conference, zonal fellowship meets, and multi-club joint initiatives. These synchronize our calendar and forge unity.",
            emotion: "thoughtful",
            sceneEvent: "beacon_signals_flash",
          },
          {
            id: "rh2-4",
            speaker: "companion",
            text: "When our club attends a District Assembly, we exchange best practices and build friendships across all regions!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Notice how the calendar balances intense service with periods of reflection and fellowship.",
              raya: "District conferences are electric! Hundreds of young leaders in one room inspiring each other!",
              kai: "Timely attendance and calendar synchronization prevent project clashes across clubs.",
            },
          },
          {
            id: "rh2-5",
            speaker: "npc",
            speakerName: "Port Master Kael",
            role: "Harbor Navigator",
            text: "When a club respects the district rhythm, its members gain opportunities far beyond what any single club could offer alone.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Key District Coordination Milestones",
            content: [
              "District Assemblies: Major leadership training and policy briefings aligning all club boards.",
              "District Rotaract Conference (DISCON): The flagship annual celebration of service, awards, and fellowship.",
              "Zonal Meets: Regional gatherings fostering close collaboration between neighboring clubs.",
              "Joint Initiatives: Multi-club partnerships tackling large-scale social and environmental challenges.",
            ],
            keyTakeaway: "Active participation in district events expands member networks and broadens service horizons.",
          },
        ],
        companionAdvice: {
          nova: "Make an effort to attend at least one district conference during your prospect year.",
          raya: "Introduce yourself to members from other clubs—they might become your next project partners!",
          kai: "Track district deadlines to ensure club submissions are always on schedule.",
        },
        knowledgeTrial: {
          type: "multiple-choice",
          question: "What is the primary purpose of District 3220 Assemblies and conferences?",
          options: [
            {
              id: "opt-a",
              text: "To align club leadership with district goals, deliver training, exchange best practices, and build fellowship across Sri Lanka & Maldives.",
              explanation: "Correct! District assemblies synchronize strategy, train leaders, and deepen inter-club camaraderie.",
            },
            {
              id: "opt-b",
              text: "To micromanage the day-to-day internal decisions of each local club.",
              explanation: "Incorrect. Clubs maintain autonomous governance while aligning on shared district goals.",
            },
            {
              id: "opt-c",
              text: "To conduct confidential political debates unrelated to community service.",
              explanation: "Incorrect. Rotaract is strictly non-political and focused on youth empowerment and service.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Focus on training, shared goals, and cross-club unity.",
          successMessage: "The signal tower beacon flashes in perfect synchronization! You understand the district rhythm.",
        },
      },
      {
        id: "lesson-2-3",
        chapterId: "loc-rotaract-harbor",
        lessonNumber: 3,
        title: "The Digital Harbor",
        subtitle: "Why Accurate Records & RMIS Matter",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Port Master Kael",
          speakerRole: "Harbor Navigator",
          dialogue: "Step into the harbormaster's office. Look at this digital ledger. Why do we maintain meticulous manifests for every voyage?",
        },
        sceneConfig: {
          sceneType: "harbor",
          variant: "digital-manifest",
          atmosphereTitle: "Glowing Digital Ledger",
          backdropImage: "/images/chapter3_realms.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "RMIS & Club Records",
          pages: [13, 14, 15, 16, 17, 147, 148, 149, 150, 151, 152, 153, 154],
          pageRangeDisplay: "pp. 13–17, 147–154",
        },
        scriptedDialogue: [
          {
            id: "rh3-1",
            speaker: "npc",
            speakerName: "Port Master Kael",
            role: "Harbor Navigator",
            text: "In the physical world, sailing without a manifest means your cargo is lost in history. In District 3220, our official digital platform is RMIS—the Rotaract Management Information System.",
            emotion: "serious",
          },
          {
            id: "rh3-2",
            speaker: "explorer",
            text: "As a prospect explorer, why does a digital administrative platform matter to my journey?",
            emotion: "curious",
          },
          {
            id: "rh3-3",
            speaker: "npc",
            speakerName: "Port Master Kael",
            role: "Harbor Navigator",
            text: "Because RMIS is where reporting, membership management, club progress, monthly reports, event registrations, attendance logging, and citation eligibility are officially recorded. Accurate records preserve the club's continuity across generations.",
            emotion: "thoughtful",
            sceneEvent: "ledger_entries_glow",
          },
          {
            id: "rh3-4",
            speaker: "companion",
            text: "If a project is completed but never documented or reported, future leaders won't know what worked or how to build on it!",
            emotion: "warm",
            companionVariants: {
              nova: "Records protect the truth of our service and ensure that community trust is honored.",
              raya: "Accurate logs mean your hard work counts and gets celebrated across the district!",
              kai: "Clean data management is the foundation of organizational accountability and citation readiness.",
            },
          },
          {
            id: "rh3-5",
            speaker: "npc",
            speakerName: "Port Master Kael",
            role: "Harbor Navigator",
            text: "Prospects need not memorize administrative submission forms—just understand this golden rule: honest, accurate records preserve club continuity and protect public trust.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Supported RMIS Capabilities in District 3220",
            content: [
              "The Rotaract Management Information System (RMIS) supports:",
              "• Official club reporting and monthly report submissions.",
              "• Membership roster management and tracking prospect/active member status.",
              "• Logging project outcomes, timelines, and financial summaries.",
              "• District event registrations and attendance verification.",
              "• Tracking eligibility for annual District Citations.",
            ],
            keyTakeaway: "Accurate records preserve the club's institutional memory and ensure ongoing recognition.",
          },
        ],
        companionAdvice: {
          nova: "Always sign attendance registers at meetings—it officially documents your participation.",
          raya: "Take pride in helping document club projects accurately with real facts and numbers!",
          kai: "Remember: RMIS is a tool for transparency, accountability, and continuity.",
        },
        knowledgeTrial: {
          type: "scenario",
          question: "Why does maintaining accurate records in RMIS matter at a prospect and club level?",
          options: [
            {
              id: "opt-a",
              text: "It preserves the club's institutional memory, ensures accurate membership tracking, and provides transparent evidence of community impact.",
              explanation: "Correct! RMIS preserves club continuity, verifies activity, and protects organizational trust across board transitions.",
            },
            {
              id: "opt-b",
              text: "It exists purely to generate artificial paperwork with no practical value.",
              explanation: "Incorrect. Accurate records are critical for legal, financial, and historical club continuity.",
            },
            {
              id: "opt-c",
              text: "RMIS automatically executes projects without human effort.",
              explanation: "Incorrect. RMIS is an administrative recording platform, not an automated project execution system.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Focus on institutional memory, transparency, and preserving verified club history.",
          successMessage: "The digital manifest records your completion! Chapter 2 is complete and the HARBOR MASTER badge is awarded.",
        },
      },
    ],
  },

  // =========================================================================
  // CHAPTER 3 — REGENT KEEP
  // =========================================================================
  "loc-regent-keep": {
    id: "loc-regent-keep",
    chapterNumber: 3,
    chapterLabel: "CHAPTER 3",
    chapterTitle: "The Regent Odyssey",
    worldName: "Regent Keep",
    regionTitle: "Historic Mountain Bastion",
    guideNpc: "keeper",
    seethawakaInspiration: "Inspired by King Rajasinghe I fortress ruins and heritage stonework of the Seethawaka Kingdom",
    summary: "Cross the fortified stone bridge into the grand hall of Regent Keep. The Keeper reveals the core values of Club Service: meetings that move people, the culture of belonging, and growing leadership through responsibility.",
    badgeReward: "REGENT PIONEER",
    xpReward: 100,
    lessons: [
      {
        id: "lesson-3-1",
        chapterId: "loc-regent-keep",
        lessonNumber: 1,
        title: "The Heart of the Club",
        subtitle: "Club Service as the Bedrock of Fellowship",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "The Keeper",
          speakerRole: "Guardian of Regent Lore",
          dialogue: "Welcome to the Great Hall of Regent Keep! Come close to the hearthfire. Behind every heroic community project lies the warmth of Club Service.",
        },
        sceneConfig: {
          sceneType: "hearth",
          variant: "hearth-hall",
          atmosphereTitle: "Grand Hearthfire of Fellowship",
          backdropImage: "/images/chapter2_odyssey.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Club Service Foundations",
          pages: [28, 29, 30, 31],
          pageRangeDisplay: "pp. 28–31",
        },
        scriptedDialogue: [
          {
            id: "rk1-1",
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            text: "Step inside, traveler. Many people mistake Club Service for dry administration. In truth, Club Service is the beating heart of Rotaract.",
            emotion: "warm",
          },
          {
            id: "rk1-2",
            speaker: "explorer",
            text: "Keeper, what makes Club Service so essential if our mission is community upliftment?",
            emotion: "curious",
          },
          {
            id: "rk1-3",
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            text: "Because a club that does not nurture its own members cannot heal an outside community. Club Service creates an atmosphere of belonging, supports smooth internal operations, and ensures every voice is heard.",
            emotion: "thoughtful",
            sceneEvent: "hearth_fire_flares_warm",
          },
          {
            id: "rk1-4",
            speaker: "companion",
            text: "When members feel valued, motivated, and supported, their energy for service becomes limitless!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Club Service is like soil: when it is rich in fellowship and care, every avenue flourishes.",
              raya: "This hall has such warm energy! I can feel the bonds of brotherhood and sisterhood right here!",
              kai: "Smooth internal logistics and organized communication prevent friction and keep members engaged.",
            },
          },
          {
            id: "rk1-5",
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            text: "Remember: strong, connected clubs create enduring, impactful service. That is why Club Service comes first.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "The Purpose of Club Service",
            content: [
              "Club Service is the foundational avenue of Rotaract that supports internal club functioning, member engagement, and camaraderie.",
              "It fosters an inclusive culture, organizes memorable general assemblies, and provides members with opportunities to take on meaningful responsibilities.",
            ],
            keyTakeaway: "Club Service is not just administration—it is about belonging, fellowship, and mutual growth.",
          },
        ],
        companionAdvice: {
          nova: "Take time to talk to other prospects and members at the end of meetings.",
          raya: "Volunteer to help set up the hall—fellowship starts by working together on small tasks!",
          kai: "Pay attention to how assemblies are run; you'll soon be chairing sessions yourself.",
        },
        knowledgeTrial: {
          type: "multiple-choice",
          question: "What is the primary role of Club Service according to the District 3220 Handbook?",
          options: [
            {
              id: "opt-a",
              text: "To support internal operations, member engagement, fellowship, and an inclusive culture where members feel valued.",
              explanation: "Correct! Club Service is the heart of the club, supporting member bonding and organizational health.",
            },
            {
              id: "opt-b",
              text: "To handle only international diplomacy projects in foreign countries.",
              explanation: "Incorrect. International projects belong to the International Service avenue.",
            },
            {
              id: "opt-c",
              text: "To manage commercial business sales for private profit.",
              explanation: "Incorrect. Rotaract is a non-profit service organization.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Think about internal fellowship, member bonding, and smooth operations.",
          successMessage: "The hearthfire crackles with welcoming warmth! You understand the heart of the club.",
        },
      },
      {
        id: "lesson-3-2",
        chapterId: "loc-regent-keep",
        lessonNumber: 2,
        title: "Meetings That Move People",
        subtitle: "Active Participation & Assembly Decorum",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "The Keeper",
          speakerRole: "Guardian of Regent Lore",
          dialogue: "Look upon the round council table. Candles are lit at every seat. A General Assembly should never be a boring lecture—it should inspire action.",
        },
        sceneConfig: {
          sceneType: "hearth",
          variant: "council-table",
          atmosphereTitle: "Candlelit Council Table",
          backdropImage: "/images/chapter2_odyssey.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Meeting Coordination & Member Contribution",
          pages: [7, 8, 31],
          pageRangeDisplay: "pp. 7–8, 31",
        },
        scriptedDialogue: [
          {
            id: "rk2-1",
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            text: "Every two weeks, the club gathers in General Assembly. A well-run meeting adheres to a structured agenda while keeping conversations lively and inspiring.",
            emotion: "warm",
          },
          {
            id: "rk2-2",
            speaker: "explorer",
            text: "As a prospect explorer, how can I contribute meaningfully during General Assemblies?",
            emotion: "curious",
          },
          {
            id: "rk2-3",
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            text: "By arriving on time, listening actively without distractions, asking constructive questions, and stepping forward when volunteers are needed for upcoming projects.",
            emotion: "thoughtful",
            sceneEvent: "candles_glow_steadily",
          },
          {
            id: "rk2-4",
            speaker: "companion",
            text: "Respecting the speaker and the agenda ensures everyone's time is honored and meetings stay productive!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Silence your phone and be fully present; attentive presence is the highest form of respect.",
              raya: "Raise your hand and speak up with ideas! Fresh perspectives make our discussions so exciting!",
              kai: "Notice how the chair manages the agenda time—effective meeting management is an invaluable career skill.",
            },
          },
          {
            id: "rk2-5",
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            text: "When meetings move people, attendance ceases to be an obligation and becomes a highlight of the month.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Meeting Etiquette & Active Contribution",
            content: [
              "Agenda Adherence: Respect the meeting order prepared by the President and Secretary.",
              "Constructive Participation: Share constructive ideas, offer supportive feedback, and avoid unhelpful criticism.",
              "Phone Decorum: Keep mobile devices silent throughout proceedings.",
              "Punctuality: Arrive early to connect with fellow members before the gavel sounds.",
            ],
            keyTakeaway: "Meetings that move people combine structured decorum with genuine warmth and shared purpose.",
          },
        ],
        companionAdvice: {
          nova: "Take notes during project briefings so you know where you can offer assistance.",
          raya: "Stay for the informal fellowship after the meeting—that's where great ideas are born!",
          kai: "Learn parliamentary basics: addressing the chair and waiting to be recognized.",
        },
        knowledgeTrial: {
          type: "scenario",
          question: "Which of the following demonstrates constructive participation during a General Assembly?",
          options: [
            {
              id: "opt-a",
              text: "Silencing your phone, listening attentively to avenue reports, and offering thoughtful suggestions when open discussion is called.",
              explanation: "Correct! Attentive listening, respecting the floor, and offering constructive input exemplify good meeting etiquette.",
            },
            {
              id: "opt-b",
              text: "Checking social media with audio on while a guest speaker is addressing the assembly.",
              explanation: "Incorrect. This violates meeting decorum and shows disrespect to the speaker and attendees.",
            },
            {
              id: "opt-c",
              text: "Interrupting fellow members repeatedly without being recognized by the chair.",
              explanation: "Incorrect. Orderly discussion requires waiting for recognition from the presiding officer.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Choose the action showing respect, attentiveness, and constructive dialogue.",
          successMessage: "The council candles burn with steady light! You understand the art of meaningful meetings.",
        },
      },
      {
        id: "lesson-3-3",
        chapterId: "loc-regent-keep",
        lessonNumber: 3,
        title: "Belonging",
        subtitle: "Inclusivity, Camaraderie & Member Retention",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "The Keeper",
          speakerRole: "Guardian of Regent Lore",
          dialogue: "Look around this stone hall. Here, titles take a backseat to camaraderie. Every member—veteran or newcomer—is family.",
        },
        sceneConfig: {
          sceneType: "hearth",
          variant: "fellowship-fire",
          atmosphereTitle: "Circle of Belonging",
          backdropImage: "/images/chapter2_odyssey.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Camaraderie, Inclusivity & Engagement",
          pages: [31, 32],
          pageRangeDisplay: "pp. 31–32",
        },
        scriptedDialogue: [
          {
            id: "rk3-1",
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            text: "A club may have brilliant projects, but if newcomers feel like outsiders, the club will steadily wither. Belonging is what turns a group of individuals into a united team.",
            emotion: "thoughtful",
          },
          {
            id: "rk3-2",
            speaker: "explorer",
            text: "How does Regent culture ensure that every prospect and member feels included?",
            emotion: "curious",
          },
          {
            id: "rk3-3",
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            text: "Through peer mentorship, celebrating small contributions, listening with empathy, and creating space where people from all cultural and educational backgrounds feel welcome and respected.",
            emotion: "warm",
            sceneEvent: "banners_ripple_warmly",
          },
          {
            id: "rk3-4",
            speaker: "companion",
            text: "When someone joins, we don't just hand them a task—we invite them into our circle of friendship!",
            emotion: "celebrate",
            companionVariants: {
              nova: "True inclusivity means actively seeking out the quiet voices and making sure they are heard.",
              raya: "Break down barriers! A warm smile and a handshake turn strangers into brothers and sisters!",
              kai: "Member retention is rooted in purpose and belonging: people stay where they are valued and challenged.",
            },
          },
          {
            id: "rk3-5",
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            text: "Never forget: when you walk through these doors, you are not a guest—you are a fellow architect of our future.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Cultivating Club Camaraderie",
            content: [
              "Inclusivity: Embracing diversity in language, background, and perspective across all activities.",
              "Peer Mentorship: Pairing new explorers with experienced members to guide their development.",
              "Celebrating Milestones: Acknowledging member birthdays, project contributions, and personal milestones.",
              "Psychological Safety: Encouraging bold ideas without fear of harsh judgment.",
            ],
            keyTakeaway: "Belonging is the foundation of member retention and lifelong loyalty to the movement.",
          },
        ],
        companionAdvice: {
          nova: "Check in on fellow members who haven't attended recent meetings.",
          raya: "Plan casual fellowship outings—sharing meals and laughs builds unshakeable team chemistry!",
          kai: "Notice how seasoned leaders make new members feel comfortable from day one.",
        },
        knowledgeTrial: {
          type: "classification",
          question: "Which of the following actions best strengthens member belonging and retention in a Rotaract club?",
          options: [
            {
              id: "opt-a",
              text: "Pairing new members with mentors, actively listening to their ideas, and celebrating their individual contributions.",
              explanation: "Correct! Mentorship, attentive listening, and recognition build deep belonging and retention.",
            },
            {
              id: "opt-b",
              text: "Leaving newcomers on their own until they figure everything out through trial and error.",
              explanation: "Incorrect. Without mentorship and welcoming guidance, prospects often feel isolated and disengage.",
            },
            {
              id: "opt-c",
              text: "Only allowing board members to speak or offer ideas at meetings.",
              explanation: "Incorrect. Inclusivity requires empowering every member to contribute.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Focus on mentorship, welcoming newcomers, and mutual encouragement.",
          successMessage: "The hall banners ripple with golden light! You understand the power of belonging.",
        },
      },
      {
        id: "lesson-3-4",
        chapterId: "loc-regent-keep",
        lessonNumber: 4,
        title: "Leadership Grows Through Responsibility",
        subtitle: "From Volunteer to Board Leader",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "The Keeper",
          speakerRole: "Guardian of Regent Lore",
          dialogue: "Ascend with me to the high parapet overlooking the Seethawaka valley. Look down: every leader you see began right where you stand today.",
        },
        sceneConfig: {
          sceneType: "hearth",
          variant: "high-parapet",
          atmosphereTitle: "High Parapet Valley View",
          backdropImage: "/images/chapter2_odyssey.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Leadership Growth & Opportunities",
          pages: [32, 33, 34],
          pageRangeDisplay: "pp. 32–34",
        },
        scriptedDialogue: [
          {
            id: "rk4-1",
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            text: "Leadership in Rotaract is not conferred by title or seniority. It is forged step by step by taking responsibility for tasks that matter to others.",
            emotion: "warm",
          },
          {
            id: "rk4-2",
            speaker: "explorer",
            text: "What does that progression look like in practice?",
            emotion: "curious",
          },
          {
            id: "rk4-3",
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            text: "First, you volunteer for small event duties. Next, you join a project organizing committee. Then, you co-chair an initiative. Eventually, you lead an entire avenue or serve on the club Board of Directors.",
            emotion: "thoughtful",
            sceneEvent: "valley_panorama_revealed",
          },
          {
            id: "rk4-4",
            speaker: "companion",
            text: "Every small task done reliably prepares your hands and mind for greater leadership!",
            emotion: "celebrate",
            companionVariants: {
              nova: "True leaders don't wait for permission; they see a need, step forward, and serve with care.",
              raya: "Take the challenge! Every project committee is a sandbox where you test your leadership skills!",
              kai: "Treat each volunteer role as professional training: manage time, communicate clearly, and deliver results.",
            },
          },
          {
            id: "rk4-5",
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            text: "Look up at the night sky above the keep. The celestial canopy opens—it is time to discover the 11 Avenues of Action.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "The Leadership Pathway in Rotaract",
            content: [
              "1. Volunteer: Assisting at project setups, registration desks, and fellowship gatherings.",
              "2. Committee Member: Managing specific operational tasks like logistics, PR design, or budgeting.",
              "3. Project Co-Chair: Leading an entire service initiative from planning through execution.",
              "4. Avenue Director: Coordinating all projects within a specific service avenue for the rotary year.",
              "5. Executive Board: Serving as President, Secretary, or Treasurer guiding overall club governance.",
            ],
            keyTakeaway: "Leadership capability expands in direct proportion to the responsibilities you willingly shoulder.",
          },
        ],
        companionAdvice: {
          nova: "Say yes when asked to assist with a project—small responsibilities unlock big opportunities.",
          raya: "Don't fear making mistakes: a project committee is the safest place in the world to learn!",
          kai: "Be dependable: finishing what you start is the single fastest way to earn trust.",
        },
        knowledgeTrial: {
          type: "ordering",
          question: "What is the typical growth trajectory of a leader in Rotaract?",
          options: [
            {
              id: "opt-a",
              text: "Task Volunteer → Project Committee Member → Project Chairperson → Avenue Director / Board Officer",
              explanation: "Correct! Leadership growth is progressive, building confidence and capability with each tier of responsibility.",
            },
            {
              id: "opt-b",
              text: "Board Officer immediately with zero prior participation, then retiring to a volunteer role.",
              explanation: "Incorrect. Leadership in Rotaract is earned through demonstrated dedication and practical experience.",
            },
            {
              id: "opt-c",
              text: "Waiting ten years before taking on any club responsibility.",
              explanation: "Incorrect. Rotaract encourages rapid youth leadership development from the very first months.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Start with small event tasks, advance through committee leadership, and grow into board governance.",
          successMessage: "The high parapet illuminates with royal maroon and gold! Chapter 3 is complete and the REGENT PIONEER badge is yours.",
        },
      },
    ],
  },

  // =========================================================================
  // CHAPTER 4 — THE AVENUES OF ACTION
  // =========================================================================
  "loc-seven-realms": {
    id: "loc-seven-realms",
    chapterNumber: 4,
    chapterLabel: "CHAPTER 4",
    chapterTitle: "The Avenues of Action",
    worldName: "The Avenue Constellation",
    regionTitle: "Celestial Observatory",
    guideNpc: "avenue-guide",
    seethawakaInspiration: "Inspired by the high highland ridges overlooking the expansive Seethawaka valley",
    summary: "Ascend to the celestial observatory where the Avenue Guide activates the 11-point Avenue Constellation. Discover the 4 Primary and 7 Secondary avenues as independent paths of action.",
    badgeReward: "AVENUE MASTER",
    xpReward: 150,
    lessons: [
      {
        id: "lesson-4-1",
        chapterId: "loc-seven-realms",
        lessonNumber: 1,
        title: "The Avenue Compass",
        subtitle: "The 11 Distinct Paths of Action",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Avenue Guide",
          speakerRole: "Celestial Cartographer",
          dialogue: "Welcome to the Avenue Constellation! Look upon this brass celestial compass. Eleven distinct stellar nodes illuminate our night sky.",
        },
        sceneConfig: {
          sceneType: "compass",
          variant: "celestial-overview",
          atmosphereTitle: "11-Point Celestial Compass",
          backdropImage: "/images/chapter3_realms.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Avenue Structure & Classifications",
          pages: [17],
          pageRangeDisplay: "p. 17",
        },
        scriptedDialogue: [
          {
            id: "ac1-1",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "Behold, Explorer! In Rotary International District 3220, we channel our energy through 11 distinct Avenue identities. Look closely: four golden primary anchors, encircled by seven silver secondary beacons.",
            emotion: "excited",
          },
          {
            id: "ac1-2",
            speaker: "explorer",
            text: "Guide, why are they categorized into Primary and Secondary Avenues?",
            emotion: "curious",
          },
          {
            id: "ac1-3",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "The 4 Primary Avenues—Club, Community, International, and Professional Development—form the historic core pillars of Rotaract. The 7 Secondary Avenues expand our reach into specialized frontiers like Environmental Service, Partnerships, and Regional Engagement. All 11 are distinct avenues with independent identities!",
            emotion: "thoughtful",
            sceneEvent: "compass_points_ignite",
          },
          {
            id: "ac1-4",
            speaker: "companion",
            text: "Notice also what is NOT on the compass: Finance! Treasury is an administrative stewardship function, not an avenue of service.",
            emotion: "warm",
            companionVariants: {
              nova: "Every member brings unique gifts. With eleven avenues, there is an exact home for your passions.",
              raya: "Eleven paths of action! Whether it's sports, nature, technology, or foreign diplomacy, we do it all!",
              kai: "Having four primary and seven secondary avenues allows clubs to balance foundational work with specialized initiatives.",
            },
          },
          {
            id: "ac1-5",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "Tap the nodes on the compass to inspect each avenue's purpose. Then let us embark on our paired narrative expeditions across the valley.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "The 2026–27 District 3220 Avenue Structure",
            content: [
              "4 Primary Avenues: Club Service, Community Service, International Service, Professional Development.",
              "7 Secondary Avenues: Environmental Service, Partnerships, Membership Development, Public Relations, Sports & Recreational Activities, Special Projects, Regional Engagement.",
              "Distinct Identities: Each avenue has its own director, objectives, and reporting criteria.",
              "Finance Placement: Financial accountability resides in the Grand Archive (Treasury Quarter), not as a service avenue.",
            ],
            keyTakeaway: "All 11 avenues are distinct identities categorized into 4 Primary and 7 Secondary paths.",
          },
        ],
        companionAdvice: {
          nova: "Explore all eleven nodes on the compass—you may discover a passion you never knew you had.",
          raya: "Which avenue calls to you the most? Get ready to dive into paired expeditions next!",
          kai: "Keep in mind that while lessons are paired for storytelling, the avenues remain organizationally distinct.",
        },
        knowledgeTrial: {
          type: "classification",
          question: "How does the official 2026–27 District 3220 model structure the avenues of service?",
          options: [
            {
              id: "opt-a",
              text: "4 Primary Avenues (Club, Community, International, Professional) and 7 Secondary Avenues, totaling 11 distinct avenue identities.",
              explanation: "Correct! The 2026–27 handbook designates 4 Primary and 7 Secondary avenues (11 distinct paths).",
            },
            {
              id: "opt-b",
              text: "7 equal realms with Treasury counted as a service avenue.",
              explanation: "Incorrect. The old Seven Realms model is outdated; Finance is an administrative function, not an avenue.",
            },
            {
              id: "opt-c",
              text: "Only 1 single avenue with all projects handled under the same name.",
              explanation: "Incorrect. District 3220 organizes service through 11 distinct avenue identities.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Think about the 4 Primary and 7 Secondary avenue structure on page 17 of the handbook.",
          successMessage: "The celestial compass rotates and locks into alignment! All 11 avenues are illuminated.",
        },
      },
      {
        id: "lesson-4-2",
        chapterId: "loc-seven-realms",
        lessonNumber: 2,
        title: "Heartland & The Green Trail",
        subtitle: "Community Service & Environmental Service",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Avenue Guide",
          speakerRole: "Celestial Cartographer",
          dialogue: "Look down into the valley: on one side, community villages; on the other, verdant forest reserves. Two distinct paths explored in this single expedition.",
        },
        sceneConfig: {
          sceneType: "compass",
          variant: "heartland-trail",
          atmosphereTitle: "Community Heartland & Green Trail",
          pairedAvenues: {
            isDualAvenue: true,
            primaryAvenue: "Community Service (Primary)",
            secondaryAvenue: "Environmental Service (Secondary)",
            note: "TWO DISTINCT AVENUE PATHS EXPLORED IN THIS EXPEDITION",
          },
          backdropImage: "/images/chapter3_realms.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Community Service & Environmental Service",
          pages: [17, 38, 39, 40, 41, 42, 43],
          pageRangeDisplay: "p. 17, pp. 38–43",
        },
        scriptedDialogue: [
          {
            id: "ac2-1",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "Notice the golden banner above: TWO DISTINCT AVENUE PATHS EXPLORED IN THIS EXPEDITION. Community Service is a Primary Avenue; Environmental Service is a Secondary Avenue. They are partners, not parent and child.",
            emotion: "warm",
          },
          {
            id: "ac2-2",
            speaker: "explorer",
            text: "How do these two distinct avenues complement each other in real projects?",
            emotion: "curious",
          },
          {
            id: "ac2-3",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "Community Service focuses on human development—education, health, economic upliftment, and sustainable livelihoods. Environmental Service champions conservation, climate literacy, waste management, and renewable ecological solutions.",
            emotion: "thoughtful",
            sceneEvent: "green_trail_illuminates",
          },
          {
            id: "ac2-4",
            speaker: "companion",
            text: "When a community project also protects local watersheds and plants native trees, both avenues shine!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Sustainable human communities cannot exist without a healthy, flourishing environment.",
              raya: "Cleaning waterways and empowering villages at the same time—that's maximum impact!",
              kai: "Ensure environmental impact assessments are part of every major community construction project.",
            },
          },
          {
            id: "ac2-5",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "Remember: Environmental Service has its own recognized identity and director. Treat both avenues with dedicated care.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Two Distinct Avenue Identities",
            content: [
              "Community Service (Primary Avenue): Addressing neglected social needs, health, education, and economic empowerment with measurable longevity.",
              "Environmental Service (Secondary Avenue): Conservation, climate awareness, waste segregation, tree planting, and renewable ecological practices.",
            ],
            keyTakeaway: "These avenues complement each other while maintaining completely independent organizational identities.",
          },
        ],
        companionAdvice: {
          nova: "Support environmental cleanups—small local actions contribute to global climate health.",
          raya: "Get outdoors and plant native saplings with fellow explorers!",
          kai: "Incorporate eco-friendly practices (like zero single-use plastics) into all club events.",
        },
        knowledgeTrial: {
          type: "scenario",
          question: "How should a club approach a project that involves both village school renovation and tree planting?",
          options: [
            {
              id: "opt-a",
              text: "Recognize it as an initiative where Community Service (education/facility) and Environmental Service (biodiversity/green cover) collaborate as distinct avenues.",
              explanation: "Correct! Both avenues collaborate with shared goals while preserving their distinct avenue identities.",
            },
            {
              id: "opt-b",
              text: "Pretend Environmental Service does not exist and erase it from reports.",
              explanation: "Incorrect. Environmental Service is a recognized 2026–27 Secondary Avenue.",
            },
            {
              id: "opt-c",
              text: "Cancel the tree planting because only one avenue can be active at a time.",
              explanation: "Incorrect. Cross-avenue collaboration is strongly encouraged in District 3220.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Remember the banner: two distinct avenues collaborating with mutual respect.",
          successMessage: "The green trail glows vibrant emerald! You understand the synergy between community and environment.",
        },
      },
      {
        id: "lesson-4-3",
        chapterId: "loc-seven-realms",
        lessonNumber: 3,
        title: "Far Harbor & Regional Bridges",
        subtitle: "International Service & Regional Engagement",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Avenue Guide",
          speakerRole: "Celestial Cartographer",
          dialogue: "Look toward the horizon: glowing bridges span the sea to foreign lands, while inland roads connect all nine provinces of our homeland.",
        },
        sceneConfig: {
          sceneType: "compass",
          variant: "global-regional-map",
          atmosphereTitle: "Global Bridges & Regional Roads",
          pairedAvenues: {
            isDualAvenue: true,
            primaryAvenue: "International Service (Primary)",
            secondaryAvenue: "Regional Engagement (Secondary)",
            note: "TWO DISTINCT AVENUE PATHS EXPLORED IN THIS EXPEDITION",
          },
          backdropImage: "/images/chapter3_realms.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "International Service & Regional Engagement",
          pages: [17, 52, 53, 54, 55, 56, 57, 58, 59, 60, 132, 133, 134],
          pageRangeDisplay: "pp. 52–60, 132–134",
        },
        scriptedDialogue: [
          {
            id: "ac3-1",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "This expedition explores Far Harbor and the Regional Bridges: International Service (Primary) and Regional Engagement (Secondary). Two distinct avenues of connection.",
            emotion: "warm",
          },
          {
            id: "ac3-2",
            speaker: "explorer",
            text: "What differentiates International Service from Regional Engagement?",
            emotion: "curious",
          },
          {
            id: "ac3-3",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "International Service crosses national borders—fostering global peace, cultural diplomacy, and Twin Club service across foreign districts. Regional Engagement crosses zonal boundaries right here at home—uniting clubs across all provinces of Sri Lanka and the Maldives.",
            emotion: "thoughtful",
            sceneEvent: "global_bridges_light_up",
          },
          {
            id: "ac3-4",
            speaker: "companion",
            text: "We must be ambassadors of unity both to our neighbors across the island and our friends across the globe!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Understanding foreign cultures begins with understanding the diverse communities in our own country.",
              raya: "From Jaffna to Galle, Male to Colombo, and across oceans—Rotaract makes the whole world feel like home!",
              kai: "Structure international partnerships with clear Memorandums of Understanding and shared project deliverables.",
            },
          },
          {
            id: "ac3-5",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "Both avenues teach cultural humility and expansive fellowship. Keep your bridges strong and welcoming.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Connecting Beyond Borders & Across Zones",
            content: [
              "International Service (Primary): Cross-border humanitarian action, Twin Club agreements, cultural exchanges, and representing Sri Lankan/Maldivian youth globally.",
              "Regional Engagement (Secondary): Inter-zonal visits, regional fellowship tours, and collaborative joint initiatives uniting diverse communities within District 3220.",
            ],
            keyTakeaway: "International Service connects us globally; Regional Engagement unites us across our own district.",
          },
        ],
        companionAdvice: {
          nova: "Participate in letterhead exchanges to learn how clubs in other countries tackle local problems.",
          raya: "Join cross-zonal road trips—visiting clubs in other regions is the best adventure in Rotaract!",
          kai: "Ensure cultural sensitivity when communicating with international partners.",
        },
        knowledgeTrial: {
          type: "multiple-choice",
          question: "What is a key difference between International Service and Regional Engagement in District 3220?",
          options: [
            {
              id: "opt-a",
              text: "International Service focuses on cross-border global partnerships, while Regional Engagement focuses on inter-zonal collaboration across Sri Lanka & Maldives.",
              explanation: "Correct! International Service crosses national boundaries, while Regional Engagement unites zones within District 3220.",
            },
            {
              id: "opt-b",
              text: "International Service replaces all domestic community projects.",
              explanation: "Incorrect. Domestic and international service exist side by side.",
            },
            {
              id: "opt-c",
              text: "Regional Engagement is only for sports competitions.",
              explanation: "Incorrect. Regional Engagement spans fellowship, service, and administrative collaboration across zones.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "One connects us globally across nations; the other connects our domestic zones across the district.",
          successMessage: "The global bridges and regional highways illuminate! You master the geography of Rotaract.",
        },
      },
      {
        id: "lesson-4-4",
        chapterId: "loc-seven-realms",
        lessonNumber: 4,
        title: "The Forge & Alliance Market",
        subtitle: "Professional Development & Partnerships",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Avenue Guide",
          speakerRole: "Celestial Cartographer",
          dialogue: "Look toward the artisan pavilion and bustling market square: skills are sharpened at The Forge, while alliances are forged in the market.",
        },
        sceneConfig: {
          sceneType: "compass",
          variant: "workshop-market",
          atmosphereTitle: "Artisan Forge & Alliance Pavilion",
          pairedAvenues: {
            isDualAvenue: true,
            primaryAvenue: "Professional Development (Primary)",
            secondaryAvenue: "Partnerships (Secondary)",
            note: "TWO DISTINCT AVENUE PATHS EXPLORED IN THIS EXPEDITION",
          },
          backdropImage: "/images/chapter3_realms.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Professional Development & Partnerships",
          pages: [17, 68, 69, 70, 71, 72, 73, 86, 87, 88, 89],
          pageRangeDisplay: "pp. 68–73, 86–89",
        },
        scriptedDialogue: [
          {
            id: "ac4-1",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "We enter The Forge & Alliance Market: Professional Development (Primary) and Partnerships (Secondary). Capability meets collaboration.",
            emotion: "warm",
          },
          {
            id: "ac4-2",
            speaker: "explorer",
            text: "How does an explorer grow their professional readiness through Rotaract?",
            emotion: "curious",
          },
          {
            id: "ac4-3",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "Through the CARE framework: Clarity of purpose, Ability in skills, Readiness of mindset, and Exposure to networks. And through the Partnerships avenue, clubs build alliances with corporates and NGOs based on shared value, not mere sponsorship begging.",
            emotion: "thoughtful",
            sceneEvent: "forge_market_sparks",
          },
          {
            id: "ac4-4",
            speaker: "companion",
            text: "Partnerships aren't just about asking for money—partners provide mentors, technical gear, and community access!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Sharpening your own skills allows you to bring genuine value to external partners.",
              raya: "Pitch with confidence! When you believe in the project, partners will jump on board!",
              kai: "Always document partnership terms clearly with transparent expectations on both sides.",
            },
          },
          {
            id: "ac4-5",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "Build personal capability in Professional Development, and build institutional strength in Partnerships.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Professional Capability & Ethical Partnerships",
            content: [
              "Professional Development (Primary): Career guidance via the CARE framework (Clarity, Ability, Readiness, Exposure), public speaking, time management, and ethical leadership.",
              "Partnerships (Secondary): Forging strategic alliances with corporates, SMEs, NGOs, and community groups founded on mutual shared value, trust, and transparency.",
            ],
            keyTakeaway: "Professional readiness equips the individual; ethical partnerships amplify the club.",
          },
        ],
        companionAdvice: {
          nova: "Attend club workshops on resume writing and interview skills.",
          raya: "Practice public speaking by presenting project proposals at assemblies!",
          kai: "Research potential corporate partners to understand their CSR goals before reaching out.",
        },
        knowledgeTrial: {
          type: "matching",
          question: "In the Professional Development CARE framework, what does 'Clarity' stand for?",
          options: [
            {
              id: "opt-a",
              text: "Knowing yourself: understanding your personal strengths, values, and career direction.",
              explanation: "Correct! Clarity in the CARE framework focuses on self-knowledge, strengths, and professional direction.",
            },
            {
              id: "opt-b",
              text: "Speaking loudly in public without thinking.",
              explanation: "Incorrect. Clarity refers to intentional self-knowledge and career alignment.",
            },
            {
              id: "opt-c",
              text: "Demanding immediate promotions without developing skills.",
              explanation: "Incorrect. Ability and Readiness must accompany self-awareness.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "The first pillar of CARE begins with understanding your own identity and aspirations.",
          successMessage: "The forge anvil and marketplace scales balance perfectly! You understand the CARE framework.",
        },
      },
      {
        id: "lesson-4-5",
        chapterId: "loc-seven-realms",
        lessonNumber: 5,
        title: "Signal Spire & The Public Square",
        subtitle: "Public Relations & Special Projects",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Avenue Guide",
          speakerRole: "Celestial Cartographer",
          dialogue: "A grand beacon tower broadcasts across a bustling city square: here, Public Relations tells the authentic story, while Special Projects executes bold, visible initiatives.",
        },
        sceneConfig: {
          sceneType: "compass",
          variant: "spire-square",
          atmosphereTitle: "Signal Spire & Public Square",
          pairedAvenues: {
            isDualAvenue: true,
            primaryAvenue: "Public Relations (Secondary)",
            secondaryAvenue: "Special Projects (Secondary)",
            note: "TWO DISTINCT AVENUE PATHS EXPLORED IN THIS EXPEDITION",
          },
          backdropImage: "/images/chapter3_realms.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Public Relations & Special Projects",
          pages: [17, 93, 106, 107, 108, 109, 110, 111, 112, 113, 138, 139, 140],
          pageRangeDisplay: "pp. 93, 106–126, 138–140",
        },
        scriptedDialogue: [
          {
            id: "ac5-1",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "This expedition pairs two powerful Secondary Avenues: Public Relations and Special Projects. Storytelling and high-visibility community action.",
            emotion: "warm",
          },
          {
            id: "ac5-2",
            speaker: "explorer",
            text: "Why is authentic storytelling so crucial for public credibility?",
            emotion: "curious",
          },
          {
            id: "ac5-3",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "Because if we exaggerate or use stock photos, public trust evaporates. PR must tell the truth with human-centered visuals. And Special Projects creates large-scale, innovative initiatives that bring that impact directly into the public square.",
            emotion: "thoughtful",
            sceneEvent: "signal_spire_broadcasts",
          },
          {
            id: "ac5-4",
            speaker: "companion",
            text: "Show real Rotaractors working alongside real communities—that authenticity is what inspires people to join and support us!",
            emotion: "celebrate",
            companionVariants: {
              nova: "A true story told with sincerity touches hearts far more deeply than flashy marketing hype.",
              raya: "Let's capture the smiles, the sweat, and the real triumph of community service!",
              kai: "Respect official brand guidelines: undistorted logos, clear typography, and trilingual captions.",
            },
          },
          {
            id: "ac5-5",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "When truth in PR unites with boldness in Special Projects, Rotaract becomes a beacon of hope across the nation.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Truthful Outreach & High-Visibility Action",
            content: [
              "Public Relations (Secondary): Credible, human-centered storytelling, official brand logo integrity, and trilingual communication (English, Sinhala, Tamil).",
              "Special Projects (Secondary): Bold, innovative, large-scale initiatives that address complex community needs and achieve high visibility beyond Rotaract.",
            ],
            keyTakeaway: "Authentic PR builds credibility; bold Special Projects demonstrate real-world transformative power.",
          },
        ],
        companionAdvice: {
          nova: "Always ensure you have consent before photographing community members.",
          raya: "Help write engaging captions that highlight the community's voice, not just the club's logo!",
          kai: "Ensure PR releases include clear contact information and call-to-action details.",
        },
        knowledgeTrial: {
          type: "scenario",
          question: "Which approach aligns with the District 3220 standard for Public Relations photography?",
          options: [
            {
              id: "opt-a",
              text: "Capturing authentic, human-centered photos of Rotaractors actively interacting with community members, avoiding artificial vector illustrations.",
              explanation: "Correct! The handbook advocates authentic, human-centered 'People of Action' visual storytelling.",
            },
            {
              id: "opt-b",
              text: "Using heavily edited stock photos of foreign models to pretend the event was larger than it was.",
              explanation: "Incorrect. Misleading or synthetic visuals violate brand integrity and district PR policy.",
            },
            {
              id: "opt-c",
              text: "Distorting the official Rotaract logo to fit arbitrary graphic design shapes.",
              explanation: "Incorrect. The handbook mandates that official logos must remain undistorted with adequate breathing space.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Think about authentic human impact and honest documentation.",
          successMessage: "The signal spire broadcasts true stories into the starlight! You master PR and Special Projects.",
        },
      },
      {
        id: "lesson-4-6",
        chapterId: "loc-seven-realms",
        lessonNumber: 6,
        title: "Grand Arena & Membership Grove",
        subtitle: "Sports & Recreation & Membership Development",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Avenue Guide",
          speakerRole: "Celestial Cartographer",
          dialogue: "Beside the lush sporting turf stands an ancient grove where saplings are nurtured into towering shade trees. Physical wellbeing meets member growth.",
        },
        sceneConfig: {
          sceneType: "compass",
          variant: "arena-grove",
          atmosphereTitle: "Athletic Arena & Membership Grove",
          pairedAvenues: {
            isDualAvenue: true,
            primaryAvenue: "Sports & Recreational Activities (Secondary)",
            secondaryAvenue: "Membership Development (Secondary)",
            note: "TWO DISTINCT AVENUE PATHS EXPLORED IN THIS EXPEDITION",
          },
          backdropImage: "/images/chapter3_realms.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Sports & Recreation & Membership Development",
          pages: [17, 78, 79, 80, 81, 82, 144, 145, 146],
          pageRangeDisplay: "pp. 78–82, 144–146",
        },
        scriptedDialogue: [
          {
            id: "ac6-1",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "Our final paired expedition brings together two vital Secondary Avenues: Sports & Recreational Activities, and Membership Development. Vitality and growth.",
            emotion: "warm",
          },
          {
            id: "ac6-2",
            speaker: "explorer",
            text: "Why is recreation so closely linked to member retention and growth?",
            emotion: "curious",
          },
          {
            id: "ac6-3",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "Because humans bond fastest through shared physical play, hikes, and friendly competition. Sports & Recreation builds physical and mental wellbeing under pressure. Membership Development guides those energized members from prospect orientation to active, lifelong engagement.",
            emotion: "thoughtful",
            sceneEvent: "arena_lights_illuminate",
          },
          {
            id: "ac6-4",
            speaker: "companion",
            text: "Fair play on the pitch translates to integrity in community projects. Sportsmanship is leadership in action!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Recreation restores balance to a busy life; a healthy body supports a dedicated mind.",
              raya: "Whether it's futsal, badminton, hiking, or e-sports—team sports build unbreakable trust!",
              kai: "Always enforce safety standards and keep sporting fixtures completely substance-free.",
            },
          },
          {
            id: "ac6-5",
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Celestial Cartographer",
            text: "All 11 avenues now shine brightly in your mind. You are ready to enter the Project Forge and forge real solutions.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Vitality, Fair Play & Member Continuity",
            content: [
              "Sports & Recreational Activities (Secondary): Fostering physical health, mental wellbeing, teamwork, and fair play in substance-free environments.",
              "Membership Development (Secondary): Recruiting, orienting, and retaining dedicated members, ensuring long-term club health and leadership succession.",
            ],
            keyTakeaway: "Recreation keeps the club energized and healthy; membership development ensures its future.",
          },
        ],
        companionAdvice: {
          nova: "Participate in club hikes or friendly matches to connect with peers in a relaxed setting.",
          raya: "Encourage every player, win or lose—sportsmanship is what makes Rotaract sports unique!",
          kai: "Help welcome new prospects at orientation events—first impressions define retention.",
        },
        knowledgeTrial: {
          type: "scenario",
          question: "How do Sports & Recreational activities contribute to long-term member retention?",
          options: [
            {
              id: "opt-a",
              text: "They promote physical and mental wellbeing, strengthen informal team chemistry, and build trust in a relaxed fellowship setting.",
              explanation: "Correct! Recreation relieves stress, builds interpersonal camaraderie, and keeps members energized for service.",
            },
            {
              id: "opt-b",
              text: "They replace community service and eliminate the need for project planning.",
              explanation: "Incorrect. Recreation complements service—it never replaces it.",
            },
            {
              id: "opt-c",
              text: "They are intended only for professional athletes competing for commercial contracts.",
              explanation: "Incorrect. Rotaract sports emphasize inclusivity, wellbeing, and fair play for all members.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Think about how playing together strengthens friendship, health, and team spirit.",
          successMessage: "The celestial constellation radiates across the night sky! Chapter 4 is complete and the AVENUE MASTER badge is yours.",
        },
      },
    ],
  },

  // =========================================================================
  // CHAPTER 5 — PROJECT FORGE
  // =========================================================================
  "loc-project-forge": {
    id: "loc-project-forge",
    chapterNumber: 5,
    chapterLabel: "CHAPTER 5",
    chapterTitle: "Project Forge",
    worldName: "Project Forge",
    regionTitle: "Watermill Workshop",
    guideNpc: "builder",
    seethawakaInspiration: "Inspired by traditional Seethawaka metal craftsmanship and modern industrial corridors",
    summary: "Descend into the subterranean workshops where The Builder teaches the art of project crafting: listening to genuine community needs, forging for sustainability, building alliances, and proving impact.",
    badgeReward: "MASTER BUILDER",
    xpReward: 100,
    lessons: [
      {
        id: "lesson-5-1",
        chapterId: "loc-project-forge",
        lessonNumber: 1,
        title: "Find the Real Need",
        subtitle: "Empathetic Needs Assessment & Community Purpose",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "The Builder",
          speakerRole: "Master Project Crafter",
          dialogue: "Step up to this timber drafting table! Roll up your sleeves. Before we strike a single hammer blow, we answer one question: what does the community genuinely need?",
        },
        sceneConfig: {
          sceneType: "forge",
          variant: "drafting-table",
          atmosphereTitle: "Blueprint Drafting Workbench",
          backdropImage: "/images/chapter4_forge.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Needs Assessment & Purpose",
          pages: [38, 39, 70],
          pageRangeDisplay: "pp. 38–39, 70",
        },
        scriptedDialogue: [
          {
            id: "pf1-1",
            speaker: "npc",
            speakerName: "The Builder",
            role: "Master Project Crafter",
            text: "Look at this pile of discarded blueprints. Too many well-meaning people ask: 'What project can our club do?' That is backwards. We must ask: 'What genuine need does the community have?'",
            emotion: "serious",
          },
          {
            id: "pf1-2",
            speaker: "explorer",
            text: "How do we identify a genuine community need without making false assumptions?",
            emotion: "curious",
          },
          {
            id: "pf1-3",
            speaker: "npc",
            speakerName: "The Builder",
            role: "Master Project Crafter",
            text: "Through patient consultation: speaking directly with local residents, community elders, school principals, and healthcare workers. A genuine need is identified through consultation and empathetic listening, not guesswork in an executive boardroom.",
            emotion: "thoughtful",
            sceneEvent: "unroll_community_blueprints",
          },
          {
            id: "pf1-4",
            speaker: "companion",
            text: "If we don't listen first, we risk building things that people never wanted or needed!",
            emotion: "celebrate",
            companionVariants: {
              nova: "True empathy begins in silence: listen twice as much as you speak.",
              raya: "Get out into the village streets and talk to the people—real stories tell you where to act!",
              kai: "Document survey findings and interview notes methodically before drafting project proposals.",
            },
          },
          {
            id: "pf1-5",
            speaker: "npc",
            speakerName: "The Builder",
            role: "Master Project Crafter",
            text: "Listen first. Understand the actual need. Only then do you ignite the forge.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Principles of Grounded Needs Assessment",
            content: [
              "Community Consultation: Engage directly with grassroots stakeholders to understand their lived realities.",
              "Root Cause Analysis: Differentiate between temporary symptoms and deep underlying problems.",
              "Asset Mapping: Identify existing community strengths, local leaders, and available resources before introducing external solutions.",
              "Humility in Service: Avoid imposing top-down solutions; co-design projects with community input.",
            ],
            keyTakeaway: "Great projects begin with humble listening, identifying genuine community needs through consultation.",
          },
        ],
        companionAdvice: {
          nova: "Never assume you know what a community needs before speaking with them directly.",
          raya: "Ask open questions that let residents explain their challenges in their own words!",
          kai: "Cross-reference community interviews with local health and education data.",
        },
        knowledgeTrial: {
          type: "scenario",
          question: "Which proposal originates from a genuine community need identified through consultation?",
          options: [
            {
              id: "opt-a",
              text: "Consulting village mothers and the medical officer, who report that contaminated well water causes chronic childhood illness, then designing a sand-filter well rehabilitation.",
              explanation: "Correct! This addresses a verified, urgent health need identified directly through community consultation.",
            },
            {
              id: "opt-b",
              text: "Building an elaborate gazebo in a park because the club president wants an impressive background for social media.",
              explanation: "Incorrect. This serves internal vanity rather than an authentic community need.",
            },
            {
              id: "opt-c",
              text: "Distributing unrequested computer mice to a remote school that has no electricity or computers.",
              explanation: "Incorrect. Without assessing local infrastructure, the donation is useless to the school.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Look for consultation with community stakeholders and healthcare data.",
          successMessage: "The blueprints glow with approved clarity! You understand the art of needs assessment.",
        },
      },
      {
        id: "lesson-5-2",
        chapterId: "loc-project-forge",
        lessonNumber: 2,
        title: "Forge for Sustainability",
        subtitle: "Structured Planning & Community Ownership",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "The Builder",
          speakerRole: "Master Project Crafter",
          dialogue: "Feel the heat radiating from this furnace! Hot metal breaks if struck blindly. A sustainable project requires structured planning, clear measurable objectives, and community ownership.",
        },
        sceneConfig: {
          sceneType: "forge",
          variant: "anvil-crucible",
          atmosphereTitle: "Tempering Furnace & Heavy Anvil",
          backdropImage: "/images/chapter4_forge.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Planning & Sustainability",
          pages: [39, 70, 73, 138, 139],
          pageRangeDisplay: "pp. 39, 70, 73, 138–139",
        },
        scriptedDialogue: [
          {
            id: "pf2-1",
            speaker: "npc",
            speakerName: "The Builder",
            role: "Master Project Crafter",
            text: "A fragile project is assembled with excitement and breaks as soon as the novelty wears off. Here in the forge, we temper for longevity!",
            emotion: "serious",
          },
          {
            id: "pf2-2",
            speaker: "explorer",
            text: "What architectural elements ensure a project survives long after its launch day?",
            emotion: "curious",
          },
          {
            id: "pf2-3",
            speaker: "npc",
            speakerName: "The Builder",
            role: "Master Project Crafter",
            text: "Four pillars: clear measurable objectives, structured planning (activities, timelines, responsibilities, resources), community ownership, and an ongoing maintenance plan. When local leaders take pride in ownership, the project endures.",
            emotion: "thoughtful",
            sceneEvent: "anvil_sparks_fly",
          },
          {
            id: "pf2-4",
            speaker: "companion",
            text: "If the community doesn't feel ownership, the project becomes an abandoned monument.",
            emotion: "celebrate",
            companionVariants: {
              nova: "Ownership cannot be given; it must be cultivated through partnership from day one.",
              raya: "Hammer it down with clear timelines and responsible team leads—that's how we build to last!",
              kai: "Every activity must have a named coordinator, an agreed deadline, and dedicated resources.",
            },
          },
          {
            id: "pf2-5",
            speaker: "npc",
            speakerName: "The Builder",
            role: "Master Project Crafter",
            text: "Plan methodically. Distribute responsibility. Hand over ownership. That is how Rotaractors build lasting change.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Structured Project Planning",
            content: [
              "Clear Measurable Objectives: Defining exactly what success looks like in concrete terms.",
              "Structured Staging: Outlining step-by-step activities, realistic timelines, and resource budgets.",
              "Assigned Responsibilities: Ensuring every team member has an unambiguous role.",
              "Community Ownership: Involving beneficiaries in planning, construction, and post-launch maintenance.",
            ],
            keyTakeaway: "A project without community ownership crumbles when initial club enthusiasm fades.",
          },
        ],
        companionAdvice: {
          nova: "Document the project timeline where every committee member can see it.",
          raya: "Keep team spirits high when unexpected logistical challenges arise!",
          kai: "Always establish a post-project handover protocol and review date.",
        },
        knowledgeTrial: {
          type: "scenario",
          question: "Why is community ownership critical to project sustainability?",
          options: [
            {
              id: "opt-a",
              text: "Because when local residents co-design and maintain the initiative, the benefits continue indefinitely even after the club concludes its direct involvement.",
              explanation: "Correct! Local ownership guarantees ongoing stewardship, maintenance, and long-term vitality.",
            },
            {
              id: "opt-b",
              text: "Because it allows the club to walk away without completing its initial promises.",
              explanation: "Incorrect. The club must deliver its commitments fully while fostering local stewardship.",
            },
            {
              id: "opt-c",
              text: "Because community members are required to pay the club a monthly management fee.",
              explanation: "Incorrect. Rotaract service projects do not charge commercial fees.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Focus on local stewardship, ongoing maintenance, and enduring benefits.",
          successMessage: "The forged metal rings clear and true! You understand the secrets of sustainable impact.",
        },
      },
      {
        id: "lesson-5-3",
        chapterId: "loc-project-forge",
        lessonNumber: 3,
        title: "Build the Alliance",
        subtitle: "Partnerships, Resource Mobilization & Mutual Value",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "The Builder",
          speakerRole: "Master Project Crafter",
          dialogue: "Come to the assembly yard outside the forge. Look: trucks delivering timber, engineers reviewing water blueprints, Rotary elders offering advice. No great project is built alone.",
        },
        sceneConfig: {
          sceneType: "forge",
          variant: "assembly-yard",
          atmosphereTitle: "Resource Assembly Courtyard",
          backdropImage: "/images/chapter4_forge.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Partnerships & Resource Mobilization",
          pages: [86, 87, 88, 89],
          pageRangeDisplay: "pp. 86–89",
        },
        scriptedDialogue: [
          {
            id: "pf3-1",
            speaker: "npc",
            speakerName: "The Builder",
            role: "Master Project Crafter",
            text: "Ambitious blueprints require specialized resources. A club that tries to supply everything from its own pocket will soon run dry. We build alliances!",
            emotion: "warm",
          },
          {
            id: "pf3-2",
            speaker: "explorer",
            text: "What makes external partners want to collaborate with a Rotaract club?",
            emotion: "curious",
          },
          {
            id: "pf3-3",
            speaker: "npc",
            speakerName: "The Builder",
            role: "Master Project Crafter",
            text: "Shared value. Corporates, NGOs, and community leaders do not partner for pity—they partner because Rotaract brings disciplined youth energy, transparent execution, and trusted community access.",
            emotion: "thoughtful",
            sceneEvent: "alliances_gather_in_courtyard",
          },
          {
            id: "pf3-4",
            speaker: "companion",
            text: "A corporate partner might provide materials, an NGO provides technical training, and our club provides passionate execution!",
            emotion: "celebrate",
            companionVariants: {
              nova: "When alliances are built on shared values and integrity, both parties grow stronger.",
              raya: "Bring together the right allies and nothing is impossible—scale multiplies tenfold!",
              kai: "Document deliverables, publicity rights, and financial accounting in formal partnership agreements.",
            },
          },
          {
            id: "pf3-5",
            speaker: "npc",
            speakerName: "The Builder",
            role: "Master Project Crafter",
            text: "Treat partners with respect, communicate transparently, and honor every commitment you sign.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Principles of Ethical Resource Mobilization",
            content: [
              "Shared Value: Aligning the project's community goals with the partner's CSR focus and expertise.",
              "Beyond Money: Valuing in-kind technical assistance, logistics, venue access, and mentorship as much as financial support.",
              "Written Agreements: Documenting mutual expectations, reporting timelines, and logo usage guidelines.",
              "Transparent Handover: Providing comprehensive project completion reports and financial accounting to all partners.",
            ],
            keyTakeaway: "Strategic partnerships are built on mutual respect, shared value, and uncompromised transparency.",
          },
        ],
        companionAdvice: {
          nova: "Always send formal thank-you letters and completion reports to every supporting partner.",
          raya: "Invite partner representatives to attend project execution days so they see their impact firsthand!",
          kai: "Maintain a clean ledger of all in-kind goods received and their designated distribution sites.",
        },
        knowledgeTrial: {
          type: "matching",
          question: "What is the most effective approach when proposing a partnership to a corporate or NGO?",
          options: [
            {
              id: "opt-a",
              text: "Demonstrating how the initiative creates mutual shared value, provides transparent execution, and meets verified community needs.",
              explanation: "Correct! Partners invest in transparent, value-driven collaborations with clear community impact.",
            },
            {
              id: "opt-b",
              text: "Asking for cash donations with no explanation of how funds will be spent or reported.",
              explanation: "Incorrect. Vague financial requests without transparency violate Rotaract standards.",
            },
            {
              id: "opt-c",
              text: "Promising exaggerated corporate benefits that the club has no intention of fulfilling.",
              explanation: "Incorrect. Honesty and realistic expectations are paramount to preserving trust.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Focus on mutual shared value, transparency, and verified community need.",
          successMessage: "The alliance agreements are sealed with mutual respect! You master resource mobilization.",
        },
      },
      {
        id: "lesson-5-4",
        chapterId: "loc-project-forge",
        lessonNumber: 4,
        title: "Prove the Impact",
        subtitle: "Documenting Outcomes, Evidence & Honest Reporting",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "The Builder",
          speakerRole: "Master Project Crafter",
          dialogue: "Step inside the Impact Chamber. Pressure gauges, flow meters, and verified ledgers. A craftsman tests the steel before declaring it finished.",
        },
        sceneConfig: {
          sceneType: "forge",
          variant: "impact-chamber",
          atmosphereTitle: "Testing Vault & Verification Gauges",
          backdropImage: "/images/chapter4_forge.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Documentation & Outcomes",
          pages: [13, 14, 15, 89, 93, 125, 126],
          pageRangeDisplay: "pp. 13–15, 89, 93, 125–126",
        },
        scriptedDialogue: [
          {
            id: "pf4-1",
            speaker: "npc",
            speakerName: "The Builder",
            role: "Master Project Crafter",
            text: "Anyone can claim they helped people. But a true Regent proves it with honest evidence and measurable outcomes.",
            emotion: "serious",
          },
          {
            id: "pf4-2",
            speaker: "explorer",
            text: "What is the difference between project outputs and true project outcomes?",
            emotion: "curious",
          },
          {
            id: "pf4-3",
            speaker: "npc",
            speakerName: "The Builder",
            role: "Master Project Crafter",
            text: "Outputs are what you did: 'distributed fifty water filters.' Outcomes are the actual human result: 'fifty families now drink pathogen-free water and school absenteeism dropped thirty percent.' Measure the result, not just the activity!",
            emotion: "thoughtful",
            sceneEvent: "pressure_gauges_calibrate",
          },
          {
            id: "pf4-4",
            speaker: "companion",
            text: "And we report our outcomes honestly through club and district systems, acknowledging challenges as well as successes!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Honest reflection on what went wrong teaches us more than celebrating easy victories.",
              raya: "When the numbers show real lives changed, that is the greatest feeling in the world!",
              kai: "Archive photographic evidence, attendance lists, and receipts methodically for post-project reviews.",
            },
          },
          {
            id: "pf4-5",
            speaker: "npc",
            speakerName: "The Builder",
            role: "Master Project Crafter",
            text: "Document outcomes. Maintain accurate evidence. Report honestly. You have mastered the forge; now Codewood calls you to test your character.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Outputs vs. Actual Outcomes",
            content: [
              "Project Outputs: The quantitative volume of activities performed (e.g., number of sessions held, number of kits handed over).",
              "Project Outcomes: The tangible, measurable difference created in the community (e.g., improved health markers, skills acquired, income generated).",
              "Evidence Retention: Preserving photographic documentation, participant feedback, and official handover letters.",
              "Transparent Reporting: Submitting honest reports through club records and District reporting portals.",
            ],
            keyTakeaway: "True impact is measured by actual human improvements, not merely the count of items distributed.",
          },
        ],
        companionAdvice: {
          nova: "Gather qualitative feedback by speaking to beneficiaries three months after project completion.",
          raya: "Share honest stories of the challenges your team overcame to inspire future project chairs!",
          kai: "Ensure completion reports clearly compare planned objectives against actual measured results.",
        },
        knowledgeTrial: {
          type: "classification",
          question: "Which of the following represents an actual project outcome rather than a simple output?",
          options: [
            {
              id: "opt-a",
              text: "85% of participating students passed their English standardized exam following six months of community tutoring.",
              explanation: "Correct! An outcome measures the actual, verified change in human capability or well-being.",
            },
            {
              id: "opt-b",
              text: "Printed 100 copies of a grammar booklet.",
              explanation: "Incorrect. Printing booklets is an output—it does not prove whether students actually learned.",
            },
            {
              id: "opt-c",
              text: "Held a 30-minute photo session in front of a school banner.",
              explanation: "Incorrect. A photo session produces no measurable educational or community benefit.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Look for the metric showing verified change in human performance or life quality.",
          successMessage: "The impact meters click into verified green! Chapter 5 is complete and the MASTER BUILDER badge is yours.",
        },
      },
    ],
  },

  // =========================================================================
  // CHAPTER 6 — THE REGENT CODE
  // =========================================================================
  "loc-codewood": {
    id: "loc-codewood",
    chapterNumber: 6,
    chapterLabel: "CHAPTER 6",
    chapterTitle: "The Regent Code",
    worldName: "Codewood",
    regionTitle: "Ancient Monolithic Grove",
    guideNpc: "scholar",
    seethawakaInspiration: "Inspired by Puwarankanda & heritage forest reserves in Seethawaka",
    summary: "Enter the moonlit pine forest of Codewood where The Scholar tests personal conduct, meeting decorum, authentic brand integrity through the VOICE framework, and responsible AI ethics with mandatory human oversight.",
    badgeReward: "CODE BEARER",
    xpReward: 100,
    lessons: [
      {
        id: "lesson-6-1",
        chapterId: "loc-codewood",
        lessonNumber: 1,
        title: "Conduct of a Regent",
        subtitle: "Personal Discipline & Substance-Free Integrity",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "The Scholar",
          speakerRole: "Ethics Master",
          dialogue: "Welcome to the moonlit grove of Codewood. Look upon these ancient mossy monoliths. The power of leadership without personal discipline is like a wild fire.",
        },
        sceneConfig: {
          sceneType: "codewood",
          variant: "oath-stones",
          atmosphereTitle: "Moonlit Monolithic Grove",
          backdropImage: "/images/rotary_roots.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Professional Behavior & Substance Policy",
          pages: [7, 8, 9, 10],
          pageRangeDisplay: "pp. 7–10",
        },
        scriptedDialogue: [
          {
            id: "cw1-1",
            speaker: "npc",
            speakerName: "The Scholar",
            role: "Ethics Master",
            text: "Greetings, Explorer. In Codewood, we do not measure strength by muscle or wealth, but by personal honor. A Regent is recognized by how they treat others when no supervisor is watching.",
            emotion: "serious",
          },
          {
            id: "cw1-2",
            speaker: "explorer",
            text: "Scholar, what foundational conduct standards does the handbook establish for our daily representation?",
            emotion: "curious",
          },
          {
            id: "cw1-3",
            speaker: "npc",
            speakerName: "The Scholar",
            role: "Ethics Master",
            text: "Punctuality, professional communication, zero tolerance for harassment, and a strict substance-free policy: illegal or legal narcotics, cigarettes, vapes, and similar prohibited substances are banned at Rotaract events and meetings.",
            emotion: "serious",
            sceneEvent: "oath_stones_glow_softly",
          },
          {
            id: "cw1-4",
            speaker: "companion",
            text: "Our personal conduct either uplifts or tarnishes the reputation of everyone who wears the pin.",
            emotion: "thoughtful",
            companionVariants: {
              nova: "Self-discipline is the armor that protects a leader against temptation and compromise.",
              raya: "Let's make our club famous for integrity, kindness, and unshakeable respect!",
              kai: "Clear personal boundaries ensure professional relationships remain trusted and healthy.",
            },
          },
          {
            id: "cw1-5",
            speaker: "npc",
            speakerName: "The Scholar",
            role: "Ethics Master",
            text: "Carry yourself with quiet dignity. Public respect is not demanded—it is earned through consistency.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Behavioral Standards in District 3220",
            content: [
              "Punctuality: Valuing other people's time by arriving on schedule.",
              "Respectful Language: Absolute prohibition of verbal abuse, harassment, or discriminatory slurs.",
              "Substance-Free Standard: Event standards strictly prohibit illegal or legal narcotics, cigarettes, vapes, and similar prohibited substances at meetings, assemblies, and projects.",
              "Conflict Resolution: Resolving interpersonal disputes privately and constructively through dialogue.",
            ],
            keyTakeaway: "Personal integrity and behavioral discipline form the unshakeable foundation of leadership.",
          },
        ],
        companionAdvice: {
          nova: "Always pause and reflect before reacting in anger; calmness is true strength.",
          raya: "Stand up for peers if you ever witness unfair or disrespectful treatment!",
          kai: "Adhere strictly to event policies so your club remains a model of professional conduct.",
        },
        knowledgeTrial: {
          type: "scenario",
          question: "How should a member respond if a team member is arriving late to a community project site?",
          options: [
            {
              id: "opt-a",
              text: "Communicate in advance if delayed, apologize upon arrival, and immediately take up assigned project duties without complaint.",
              explanation: "Correct! Responsible communication and taking immediate responsibility demonstrate professional conduct.",
            },
            {
              id: "opt-b",
              text: "Blame everyone else publicly on social media and refuse to participate.",
              explanation: "Incorrect. Defensiveness and public complaining violate Rotaract conduct standards.",
            },
            {
              id: "opt-c",
              text: "Bring prohibited substances to the project site to pass the time.",
              explanation: "Incorrect. Prohibited substances are strictly banned from all Rotaract project sites.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Focus on proactive communication, humility, and immediate service participation.",
          successMessage: "The oath stones pulse with serene white light! You understand the conduct of a Regent.",
        },
      },
      {
        id: "lesson-6-2",
        chapterId: "loc-codewood",
        lessonNumber: 2,
        title: "Meeting & Event Protocol",
        subtitle: "Decorum, Attire Principles & Respectful Presence",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "The Scholar",
          speakerRole: "Ethics Master",
          dialogue: "Step into the Protocol Pavilion. Three mannequins display attire standards: Formal, Smart Casual, and Field Gear. Decorum demonstrates respect.",
        },
        sceneConfig: {
          sceneType: "codewood",
          variant: "protocol-pavilion",
          atmosphereTitle: "Pavilion of Protocol",
          backdropImage: "/images/rotary_roots.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Meeting Decorum & Attire",
          pages: [7, 8, 9, 10],
          pageRangeDisplay: "pp. 7–10",
        },
        scriptedDialogue: [
          {
            id: "cw2-1",
            speaker: "npc",
            speakerName: "The Scholar",
            role: "Ethics Master",
            text: "Protocol is not hollow ceremony. It is the visible expression of mutual respect among leaders, guests, and community hosts.",
            emotion: "warm",
          },
          {
            id: "cw2-2",
            speaker: "explorer",
            text: "How should an explorer dress and conduct themselves across different Rotaract gatherings?",
            emotion: "curious",
          },
          {
            id: "cw2-3",
            speaker: "npc",
            speakerName: "The Scholar",
            role: "Ethics Master",
            text: "Follow the context of the event invitation: Formal attire for installations and official district banquets; Smart Casual for General Assemblies and workshops; and durable Project Gear for physical community service. Mobile devices must remain silent during formal proceedings.",
            emotion: "thoughtful",
            sceneEvent: "mannequins_highlight_attire",
          },
          {
            id: "cw2-4",
            speaker: "companion",
            text: "Dressing appropriately shows our hosts and community elders that we take their time and dignity seriously!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Simplicity and neatness outshine flashy extravagance every time.",
              raya: "Put on your club project shirt with pride—it shows we're ready for hands-on action!",
              kai: "Always check the dress code specified on formal invitations to avoid awkward mismatches.",
            },
          },
          {
            id: "cw2-5",
            speaker: "npc",
            speakerName: "The Scholar",
            role: "Ethics Master",
            text: "Respect the room, respect the chair, and respect the occasion. That is the essence of protocol.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Context-Aware Attire Standards",
            content: [
              "Formal Attire: Club Installations, District Award Ceremonies, and formal banquets (lounge suits, formal blazers, traditional sarees/national wear).",
              "Smart Casual: General Assemblies, training seminars, and inter-club fellowship (collared shirts, trousers, modest smart dresses).",
              "Project Gear: Outdoor service, environmental tree plantings, and cleanups (club t-shirts, comfortable trousers, durable closed-toe footwear).",
              "Mobile Phone Decorum: Phones silenced during all official speeches and proceedings.",
            ],
            keyTakeaway: "Dress and decorum reflect our respect for the community, fellow members, and invited guests.",
          },
        ],
        companionAdvice: {
          nova: "Always ensure your attire is clean, modest, and appropriate to the cultural setting.",
          raya: "Wear your member pin proudly on the left lapel over your heart!",
          kai: "If an invitation does not specify attire, smart casual is the safest and most respectful choice.",
        },
        knowledgeTrial: {
          type: "scenario",
          question: "What is the appropriate attire for a club installation ceremony or formal district assembly?",
          options: [
            {
              id: "opt-a",
              text: "Formal business attire or formal traditional wear (such as a suit, blazer, or formal national attire/saree) as specified on the invitation.",
              explanation: "Correct! Installations and formal assemblies require formal business or traditional attire.",
            },
            {
              id: "opt-b",
              text: "Muddy outdoor project boots and torn exercise clothing.",
              explanation: "Incorrect. Outdoor fieldwork gear is inappropriate for formal indoor installations.",
            },
            {
              id: "opt-c",
              text: "Casual beachwear with sandals.",
              explanation: "Incorrect. Formal proceedings require respectful, formal attire.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Think about the dignity and solemnity of an official club officer installation.",
          successMessage: "The protocol scrolls glow in perfect order! You understand meeting decorum.",
        },
      },
      {
        id: "lesson-6-3",
        chapterId: "loc-codewood",
        lessonNumber: 3,
        title: "The Rotaract Voice",
        subtitle: "The VOICE Framework & Trilingual Inclusivity",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "The Scholar",
          speakerRole: "Ethics Master",
          dialogue: "Look upon this towering carved obelisk: five rune stones stand engraved with the letters V–O–I–C–E. How we speak to the world shapes how the world sees Rotaract.",
        },
        sceneConfig: {
          sceneType: "codewood",
          variant: "rune-spire",
          atmosphereTitle: "VOICE Framework Rune Spire",
          backdropImage: "/images/rotary_roots.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Brand Integrity & Storytelling",
          pages: [93, 106, 107, 108, 109, 110, 111, 112, 113, 115, 116, 125, 126],
          pageRangeDisplay: "pp. 93–113, 115–126",
        },
        scriptedDialogue: [
          {
            id: "cw3-1",
            speaker: "npc",
            speakerName: "The Scholar",
            role: "Ethics Master",
            text: "Words carry immense weight. In District 3220, public communication is guided by the official VOICE framework: Verified, Open & inclusive, Impact-driven, Consistent, and Engaging.",
            emotion: "warm",
          },
          {
            id: "cw3-2",
            speaker: "explorer",
            text: "Scholar, what does 'Open & inclusive' mean for our publications in Sri Lanka and Maldives?",
            emotion: "curious",
          },
          {
            id: "cw3-3",
            speaker: "npc",
            speakerName: "The Scholar",
            role: "Ethics Master",
            text: "It means official public captions must be published trilingually in English, Sinhala, and Tamil! We honor our multicultural heritage so every community member feels recognized and respected.",
            emotion: "thoughtful",
            sceneEvent: "voice_runes_illuminate_in_sequence",
          },
          {
            id: "cw3-4",
            speaker: "companion",
            text: "And 'Verified' means we tell the absolute truth—no fabricated attendance numbers or exaggerated claims!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Trilingual communication builds bridges across communities where words once built walls.",
              raya: "Engaging and impact-driven! Let's tell stories that make people want to jump up and join the cause!",
              kai: "Consistency requires using the official undistorted Rotaract logo with proper color codes and margins.",
            },
          },
          {
            id: "cw3-5",
            speaker: "npc",
            speakerName: "The Scholar",
            role: "Ethics Master",
            text: "Speak with truth, design with integrity, and communicate in all three languages. That is the Rotaract Voice.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "The Official VOICE Framework",
            content: [
              "V — Verified: Every statistic, quote, and claim must be factually verified and truthful.",
              "O — Open & Inclusive: Published trilingually in English, Sinhala, and Tamil to respect all communities.",
              "I — Impact-Driven: Focusing on real community benefits rather than self-serving vanity.",
              "C — Consistent: Respecting official brand guidelines, undistorted logos, and approved typography.",
              "E — Engaging: Creating creative, human-centered narratives that capture public imagination.",
            ],
            keyTakeaway: "The Rotaract Voice communicates verified truth, inclusive multilingual respect, and genuine impact.",
          },
        ],
        companionAdvice: {
          nova: "Always proofread translations to ensure cultural sensitivity and accuracy.",
          raya: "Pair truthful captions with candid, joyful photography of real service!",
          kai: "Never compress or stretch the Rotaract logo—keep its proportions locked.",
        },
        knowledgeTrial: {
          type: "matching",
          question: "What does the 'O' in the official Rotaract VOICE framework stand for?",
          options: [
            {
              id: "opt-a",
              text: "Open & Inclusive: Communicating with cultural respect, including publishing captions trilingually in English, Sinhala, and Tamil.",
              explanation: "Correct! 'O' represents Open & inclusive communication with trilingual publications across Sri Lanka & Maldives.",
            },
            {
              id: "opt-b",
              text: "Only Online: Limiting all communication exclusively to private chat groups.",
              explanation: "Incorrect. The VOICE framework guides wide public storytelling.",
            },
            {
              id: "opt-c",
              text: "Occasional: Posting updates only once per year.",
              explanation: "Incorrect. Consistent and timely communication is essential to public engagement.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Think about multilingual inclusivity across all three national languages.",
          successMessage: "All five VOICE runes radiate brilliant white light! You master the Rotaract Voice.",
        },
      },
      {
        id: "lesson-6-4",
        chapterId: "loc-codewood",
        lessonNumber: 4,
        title: "Responsible Digital & AI Use",
        subtitle: "Human Oversight, Truth & Data Privacy",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "The Scholar",
          speakerRole: "Ethics Master",
          dialogue: "Approach the ancient Mirror of Truth. Look into its glass: synthetic mirages and generated illusions shatter when tested by human reality.",
        },
        sceneConfig: {
          sceneType: "codewood",
          variant: "mirror-of-truth",
          atmosphereTitle: "Mirror of Truth Scrying Glass",
          backdropImage: "/images/rotary_roots.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "AI Guidelines & Digital Ethics",
          pages: [17, 115, 116, 117, 118, 119, 120, 121],
          pageRangeDisplay: "p. 17, pp. 115–121",
        },
        scriptedDialogue: [
          {
            id: "cw4-1",
            speaker: "npc",
            speakerName: "The Scholar",
            role: "Ethics Master",
            text: "We live in an age of emerging technology. The 2026–27 District 3220 Handbook establishes clear digital ethics: AI is strictly an assistive tool, not an autonomous authority.",
            emotion: "serious",
          },
          {
            id: "cw4-2",
            speaker: "explorer",
            text: "What boundaries must we uphold when using AI tools for club work?",
            emotion: "curious",
          },
          {
            id: "cw4-3",
            speaker: "npc",
            speakerName: "The Scholar",
            role: "Ethics Master",
            text: "Human oversight is mandatory. You may draft notes or translations, but a human must review every word. You must never fabricate beneficiary quotes, impact statistics, or synthetic event crowd photos! And you must never input private member or financial data into public AI engines.",
            emotion: "serious",
            sceneEvent: "mirror_shatters_illusions",
          },
          {
            id: "cw4-4",
            speaker: "companion",
            text: "Authentic human service cannot be faked with algorithms. If we didn't do the service with our own hands, it doesn't belong in our story!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Tools may assist our thinking, but human conscience and empathy must hold the pen.",
              raya: "Real smiles from real projects beat any generated computer picture every single day!",
              kai: "Data protection is a serious duty: safeguard member phone numbers, IDs, and financial records.",
            },
          },
          {
            id: "cw4-5",
            speaker: "npc",
            speakerName: "The Scholar",
            role: "Ethics Master",
            text: "Let technology assist your hands, but let honor guide your heart. You have mastered the Regent Code; now enter the Grand Archive.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "District 3220 AI & Digital Ethics Guidelines",
            content: [
              "Assistive Tool: AI may assist with outlining, translations, and initial grammar drafting, but never replaces human editorial judgment.",
              "Mandatory Human Oversight: Every published sentence and graphic must be verified by a human officer.",
              "Strict Prohibitions: Never generate fake testimonials, invented impact metrics, or synthetic event photos. Never create deepfakes or manipulate authentic photographs.",
              "Data Privacy: Protect confidential member details, financial records, and youth data from unvetted online tools.",
              "Bias & Cultural Audits: Manually check generated copy for cultural sensitivity and respectful tone.",
            ],
            keyTakeaway: "AI is an assistive tool with mandatory human oversight; truth, authenticity, and data privacy are non-negotiable.",
          },
        ],
        companionAdvice: {
          nova: "If you use AI to brainstorm ideas, fact-check every reference against the official handbook.",
          raya: "Celebrate real human action—authentic stories have genuine emotional power!",
          kai: "Ensure your club has a clear editorial workflow where an officer signs off on all public releases.",
        },
        knowledgeTrial: {
          type: "scenario",
          question: "Which of the following actions violates the District 3220 AI and digital ethics policy?",
          options: [
            {
              id: "opt-a",
              text: "Generating a synthetic AI crowd image and publishing it as proof that 200 people attended a club seminar.",
              explanation: "Correct! The handbook strictly forbids generating synthetic photos or fabricating evidence of event attendance.",
            },
            {
              id: "opt-b",
              text: "Using an AI tool to suggest grammar improvements for a meeting agenda, followed by human review.",
              explanation: "Incorrect. Using AI as an assistive drafting tool with human oversight is permitted.",
            },
            {
              id: "opt-c",
              text: "Drafting an initial translation of a flyer and having a bilingual member verify its cultural accuracy.",
              explanation: "Incorrect. Translation assistance with mandatory human verification is encouraged.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Look for the option that fabricates fake visual proof of project attendance.",
          successMessage: "The Mirror of Truth reflects your unwavering integrity! Chapter 6 is complete and the CODE BEARER badge is yours.",
        },
      },
    ],
  },

  // =========================================================================
  // CHAPTER 7 — GRAND ARCHIVE
  // =========================================================================
  "loc-grand-archive": {
    id: "loc-grand-archive",
    chapterNumber: 7,
    chapterLabel: "CHAPTER 7",
    chapterTitle: "Grand Archive",
    worldName: "Grand Archive",
    regionTitle: "Mountain-Carved Library",
    guideNpc: "librarian-vanya",
    seethawakaInspiration: "Inspired by historical royal manuscript halls of the Seethawaka Kingdom",
    summary: "Climb the grand stone staircase into the mountain library. Chief Librarian Vanya reveals the records that protect the club, unlocks the Treasury of Trust, and guides you through deeper reference vaults.",
    badgeReward: "SCHOLAR",
    xpReward: 100,
    lessons: [
      {
        id: "lesson-7-1",
        chapterId: "loc-grand-archive",
        lessonNumber: 1,
        title: "Records That Protect the Club",
        subtitle: "Secretariat & Institutional Continuity",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Chief Librarian Vanya",
          speakerRole: "Master of Archives",
          dialogue: "Welcome to the Grand Archive! Hear the rustle of floating scrolls? A club without records is like a traveler with amnesia!",
        },
        sceneConfig: {
          sceneType: "archive",
          variant: "mountain-library",
          atmosphereTitle: "Soaring Mountain Library",
          backdropImage: "/images/chapter2_odyssey.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Secretariat & Institutional Memory",
          pages: [12, 13, 14, 15, 16, 17],
          pageRangeDisplay: "pp. 12–17",
        },
        scriptedDialogue: [
          {
            id: "ga1-1",
            speaker: "npc",
            speakerName: "Chief Librarian Vanya",
            role: "Master of Archives",
            text: "Come in, come in! Watch the rolling ladders. People think secretarial duty is dull paperwork. Wrong! The Secretariat holds the shield that protects the club from chaos.",
            emotion: "excited",
          },
          {
            id: "ga1-2",
            speaker: "explorer",
            text: "How do meeting minutes and attendance registers protect the club?",
            emotion: "curious",
          },
          {
            id: "ga1-3",
            speaker: "npc",
            speakerName: "Chief Librarian Vanya",
            role: "Master of Archives",
            text: "When annual board transitions occur, incoming leaders must know what partnerships were agreed upon, what funds were committed, and who attended. Accurate records prevent disputes, preserve institutional memory, and verify credibility.",
            emotion: "thoughtful",
            sceneEvent: "library_scrolls_reorganize",
          },
          {
            id: "ga1-4",
            speaker: "companion",
            text: "Last year's well-documented minutes can save this year's community partnership!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Memory is the bridge across years; accurate archives turn past experience into future wisdom.",
              raya: "Document it right, file it fast, and keep our club's history shining bright!",
              kai: "Systematic filing and cloud backups ensure no vital document is lost during leadership handovers.",
            },
          },
          {
            id: "ga1-5",
            speaker: "npc",
            speakerName: "Chief Librarian Vanya",
            role: "Master of Archives",
            text: "Respect the pen as much as the sword. Honest records preserve the soul of the club.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "The Protective Power of Secretariat Records",
            content: [
              "Meeting Minutes: Official legal and operational record of club decisions, motions, and elections.",
              "Attendance Registers: Documenting member engagement and fulfilling membership pathway criteria.",
              "Institutional Memory: Preventing new boards from repeating past mistakes or duplicating solved problems.",
              "Annual Handover: Transferring complete physical and digital archives to incoming officers.",
            ],
            keyTakeaway: "Accurate records protect club credibility, resolve disputes, and guarantee leadership continuity.",
          },
        ],
        companionAdvice: {
          nova: "Always sign in at meetings—your attendance register is the official record of your journey.",
          raya: "Help your club secretary take clean photos and notes during community projects!",
          kai: "Learn how meeting motions are proposed, seconded, and minuted.",
        },
        knowledgeTrial: {
          type: "multiple-choice",
          question: "Why are accurate meeting minutes and attendance records essential during board transitions?",
          options: [
            {
              id: "opt-a",
              text: "They provide a verified legal and operational record of past commitments, decisions, and member participation, ensuring seamless continuity.",
              explanation: "Correct! Minutes and registers preserve institutional memory and prevent operational disruption during annual transitions.",
            },
            {
              id: "opt-b",
              text: "They are meant to be locked away and never shown to incoming officers.",
              explanation: "Incorrect. Archives must be handed over openly to incoming leadership.",
            },
            {
              id: "opt-c",
              text: "Minutes exist only to evaluate calligraphy handwriting skills.",
              explanation: "Incorrect. Minutes are official operational and governance records.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Focus on operational continuity, institutional memory, and verified decisions.",
          successMessage: "The archive ladders slide into place! You understand the protective power of records.",
        },
      },
      {
        id: "lesson-7-2",
        chapterId: "loc-grand-archive",
        lessonNumber: 2,
        title: "Treasury of Trust",
        subtitle: "Financial Accountability, Budgets & Fund Separation",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Chief Librarian Vanya",
          speakerRole: "Master of Archives",
          dialogue: "Vanya turns a heavy brass key in the vaulted iron door. Step into the Treasury of Trust: balance scales, locked chests, and open financial ledgers.",
        },
        sceneConfig: {
          sceneType: "archive",
          variant: "treasury-vault",
          atmosphereTitle: "Vaulted Treasury Chamber",
          backdropImage: "/images/chapter2_odyssey.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Treasury & Financial Accountability",
          pages: [19, 20, 21, 22, 23, 24, 25, 26, 27],
          pageRangeDisplay: "pp. 19–27",
        },
        scriptedDialogue: [
          {
            id: "ga2-1",
            speaker: "npc",
            speakerName: "Chief Librarian Vanya",
            role: "Master of Archives",
            text: "Finance is not an avenue of service—it is a sacred trust of stewardship. When the public and our members entrust us with funds, our integrity must be immaculate.",
            emotion: "serious",
          },
          {
            id: "ga2-2",
            speaker: "explorer",
            text: "What core financial principles must every Rotaractor understand?",
            emotion: "curious",
          },
          {
            id: "ga2-3",
            speaker: "npc",
            speakerName: "Chief Librarian Vanya",
            role: "Master of Archives",
            text: "Two fundamental rules: first, maintain clear separation of administrative and project finances through distinct accounts or ledgers. Second, every rupee spent must have an approved budget and a valid physical or digital receipt!",
            emotion: "thoughtful",
            sceneEvent: "balance_scales_weigh_receipts",
          },
          {
            id: "ga2-4",
            speaker: "companion",
            text: "Member dues pay for club administration; community donations belong 100% to the community project!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Financial clarity keeps friendships untainted by suspicion or confusion.",
              raya: "Always collect and preserve receipts—even for the smallest purchase of nails or chalk!",
              kai: "Draft realistic budgets before committing expenses; unbudgeted spending damages club stability.",
            },
          },
          {
            id: "ga2-5",
            speaker: "npc",
            speakerName: "Chief Librarian Vanya",
            role: "Master of Archives",
            text: "Guard public funds like your own honor. Transparency is the bedrock of community trust.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Core Financial Stewardship Principles",
            content: [
              "Separation of Funds: Maintaining a clear separation of administrative finances (member dues) and community project funds.",
              "Budget Approval: Drafting and approving comprehensive line-item budgets before expenditures are incurred.",
              "Receipt Accountability: Collecting and archiving verified receipts and vouchers for every single transaction.",
              "Membership Dues Compliance: Timely payment of club dues to support administrative viability.",
              "Audited Transparency: Presenting clear financial statements to the club board and general assembly.",
            ],
            keyTakeaway: "Clear separation of funds, approved budgets, and verified receipts protect public trust.",
          },
        ],
        companionAdvice: {
          nova: "Pay your membership dues punctually—it funds the administrative life of the club.",
          raya: "Never mix personal cash with project funds—keep them strictly apart!",
          kai: "When chairing a project, reconcile all receipts with the Treasurer within 7 days of event completion.",
        },
        knowledgeTrial: {
          type: "scenario",
          question: "Which of the following describes the recommended practice for managing club finances?",
          options: [
            {
              id: "opt-a",
              text: "Maintaining clear separation of administrative and project finances, requiring approved budgets, and preserving verified receipts for all expenditures.",
              explanation: "Correct! The handbook recommends clear fund separation, prior budgeting, and mandatory receipt accountability.",
            },
            {
              id: "opt-b",
              text: "Mixing community donations into personal bank accounts with no receipts kept.",
              explanation: "Incorrect. Mixing personal and project funds violates core financial ethics and bylaws.",
            },
            {
              id: "opt-c",
              text: "Spending project funds on lavish personal dinners for the executive board.",
              explanation: "Incorrect. Community funds must be dedicated strictly to approved community purposes.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Focus on clear separation of funds, approved budgets, and verified receipts.",
          successMessage: "The balance scales settle in perfect equilibrium! You understand the Treasury of Trust.",
        },
      },
      {
        id: "lesson-7-3",
        chapterId: "loc-grand-archive",
        lessonNumber: 3,
        title: "The Reference Vault",
        subtitle: "Codex Navigation & Deeper Governance Repositories",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Chief Librarian Vanya",
          speakerRole: "Master of Archives",
          dialogue: "Vanya points toward the circular rotunda. Stone vault doors reveal deeper archives: Constitution, Secretary guidelines, Brand specs, and District Annexures.",
        },
        sceneConfig: {
          sceneType: "archive",
          variant: "rotating-vault",
          atmosphereTitle: "Rotating Codex Rotunda",
          backdropImage: "/images/chapter2_odyssey.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Annexures & Governance Reference",
          pages: [11, 12, 19, 20, 143, 144, 145, 146],
          pageRangeDisplay: "pp. 11–27, 143–164",
        },
        scriptedDialogue: [
          {
            id: "ga3-1",
            speaker: "npc",
            speakerName: "Chief Librarian Vanya",
            role: "Master of Archives",
            text: "True scholarship is not memorizing every clause of a 211-page handbook. True wisdom is knowing exactly where to find the answer when a leadership dilemma arises!",
            emotion: "warm",
          },
          {
            id: "ga3-2",
            speaker: "explorer",
            text: "Where can I look up advanced officer procedures, constitutions, and brand specifications?",
            emotion: "curious",
          },
          {
            id: "ga3-3",
            speaker: "npc",
            speakerName: "Chief Librarian Vanya",
            role: "Master of Archives",
            text: "In the Regent Codex! On our digital portal, the Codex holds deeper reference modules: Standard Constitutions, Bylaws, PR logo specifications, and District Citation scorecards. It is an open reference vault that never blocks your journey.",
            emotion: "thoughtful",
            sceneEvent: "vault_doors_rotate_open",
          },
          {
            id: "ga3-4",
            speaker: "companion",
            text: "Whenever you need to check a rule, the Regent Codex is ready on demand!",
            emotion: "celebrate",
            companionVariants: {
              nova: "An educated explorer knows how to consult verified sources before making critical decisions.",
              raya: "Keep exploring! The reference vault is packed with gold for future club presidents!",
              kai: "Bookmark the Codex sections so you can access governance templates during committee meetings.",
            },
          },
          {
            id: "ga3-5",
            speaker: "npc",
            speakerName: "Chief Librarian Vanya",
            role: "Master of Archives",
            text: "Take this master key. You have mastered the theory of Rotaract; now step through the outer gates into the Impact Frontier!",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Navigating the Regent Codex",
            content: [
              "Open On-Demand Reference: The Regent Codex (`/rota101`) provides detailed governance information for members.",
              "Constitution & Bylaws: Standard rules governing club meetings, quorum, officer duties, and elections.",
              "Brand Guidelines: Exact logo margins, official hex color palettes, and typography rules.",
              "Citation Criteria: Annual district benchmarks for club recognition and awards.",
            ],
            keyTakeaway: "Wisdom lies in knowing where to consult authoritative sources when leading your club.",
          },
        ],
        companionAdvice: {
          nova: "Visit the Regent Codex whenever you have questions about specific officer roles.",
          raya: "The theory is complete! Let's get our boots muddy on the Impact Frontier!",
          kai: "Review the Standard Constitution before running for an executive board position.",
        },
        knowledgeTrial: {
          type: "multiple-choice",
          question: "What is the purpose of the Regent Codex (`/rota101`) in Regent Journey?",
          options: [
            {
              id: "opt-a",
              text: "An open, searchable on-demand reference vault containing deeper governance, constitutions, brand specs, and officer guidelines.",
              explanation: "Correct! The Regent Codex is an accessible reference repository designed to support future leadership needs.",
            },
            {
              id: "opt-b",
              text: "A mandatory obstacle that locks you out of the app until you memorize every page.",
              explanation: "Incorrect. The Codex is an optional reference that never blocks prospect progression.",
            },
            {
              id: "opt-c",
              text: "A collection of fictional fantasy short stories.",
              explanation: "Incorrect. The Codex contains official factual reference materials grounded in District 3220 standards.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Think about an open, searchable reference vault for deeper officer guidelines.",
          successMessage: "The master archive vault swings open! Chapter 7 is complete and the SCHOLAR badge is awarded.",
        },
      },
    ],
  },

  // =========================================================================
  // CHAPTER 8 — IMPACT FRONTIER
  // =========================================================================
  "loc-impact-frontier": {
    id: "loc-impact-frontier",
    chapterNumber: 8,
    chapterLabel: "CHAPTER 8",
    chapterTitle: "Impact Frontier",
    worldName: "Impact Frontier",
    regionTitle: "Wilderness Outpost",
    guideNpc: "scout-mira",
    seethawakaInspiration: "Inspired by the rugged wilderness trails and nature reserves of the Seethawaka Corridor",
    summary: "Cross the suspension bridge into the field outpost where Expedition Scout Mira challenges you to bridge the digital realm into physical reality through active participation, field service, and honest reporting.",
    badgeReward: "FRONTIER SCOUT",
    xpReward: 100,
    lessons: [
      {
        id: "lesson-8-1",
        chapterId: "loc-impact-frontier",
        lessonNumber: 1,
        title: "From Realm to Reality",
        subtitle: "Transitioning from Digital Theory to Physical Service",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Expedition Scout Mira",
          speakerRole: "Field Scout Leader",
          dialogue: "Halt! Tighten your bootlaces. You've read scrolls and answered riddles inside ancient halls. But Rotaract lives out here under the open sky.",
        },
        sceneConfig: {
          sceneType: "frontier",
          variant: "expedition-camp",
          atmosphereTitle: "Wilderness Outpost Camp",
          backdropImage: "/images/realm_of_regent_hero.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Field Service & Real Participation",
          pages: [4, 5, 30, 31, 32, 38, 39, 144, 145, 146],
          pageRangeDisplay: "pp. 4–5, 30–32, 38–39, 144–146",
        },
        scriptedDialogue: [
          {
            id: "if1-1",
            speaker: "npc",
            speakerName: "Expedition Scout Mira",
            role: "Field Scout Leader",
            text: "Welcome to the edge of the wilderness, Explorer. Look across this suspension bridge: the digital guide ends here. Real Rotaract happens when you step into a community with your fellow members.",
            emotion: "warm",
          },
          {
            id: "if1-2",
            speaker: "explorer",
            text: "Mira, how do I make that transition from completing digital lessons to taking active part in real club life?",
            emotion: "curious",
          },
          {
            id: "if1-3",
            speaker: "npc",
            speakerName: "Expedition Scout Mira",
            role: "Field Scout Leader",
            text: "By showing up in person: attend physical General Assemblies, introduce yourself to senior members, volunteer for the next community project committee, and participate with enthusiasm!",
            emotion: "thoughtful",
            sceneEvent: "field_maps_spread_out",
          },
          {
            id: "if1-4",
            speaker: "companion",
            text: "The digital guide gave you the compass; now your boots must walk the actual trail!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Theory without practice is empty; practice guided by principle transforms communities.",
              raya: "Get ready to get your hands dirty and make lifelong memories out in the field!",
              kai: "Check the club calendar for the next physical assembly and project execution dates.",
            },
          },
          {
            id: "if1-5",
            speaker: "npc",
            speakerName: "Expedition Scout Mira",
            role: "Field Scout Leader",
            text: "Step across the bridge with courage. Real community changemakers are forged in the real world.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "Crossing from Screen to Field",
            content: [
              "Physical Presence: Attending General Assemblies, committee meetings, and fellowship events in person.",
              "Active Volunteerism: Offering your time, creativity, and energy to ongoing club flagships.",
              "Relationship Building: Forming personal bonds of trust and camaraderie with fellow prospect explorers and active members.",
              "Fulfilling Prerequisites: Completing the 2 verified meetings and 2 verified projects required for membership review.",
            ],
            keyTakeaway: "Digital knowledge is only preparation; active leadership is forged in the physical world.",
          },
        ],
        companionAdvice: {
          nova: "Reach out to the club secretary or fellowship director to learn about upcoming events.",
          raya: "Car-pool with fellow members to project sites—fellowship on the road is unforgettable!",
          kai: "Keep a personal log of the meetings and projects you attend for your membership review.",
        },
        knowledgeTrial: {
          type: "scenario",
          question: "What is the most effective next step for an explorer who has completed the digital learning chapters?",
          options: [
            {
              id: "opt-a",
              text: "Attend upcoming physical club meetings, connect with active members, and volunteer on project committees in the real world.",
              explanation: "Correct! Active physical participation in meetings and projects is the essential bridge to real membership.",
            },
            {
              id: "opt-b",
              text: "Wait at home and expect membership to be mailed automatically without attending any meetings.",
              explanation: "Incorrect. Active membership requires real-world participation and verified meeting attendance.",
            },
            {
              id: "opt-c",
              text: "Delete the app and abandon community service.",
              explanation: "Incorrect. The digital journey prepares you for real-world impact.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Focus on active physical attendance, volunteering, and building real-world relationships.",
          successMessage: "The suspension bridge holds firm! You are ready to cross into physical field service.",
        },
      },
      {
        id: "lesson-8-2",
        chapterId: "loc-impact-frontier",
        lessonNumber: 2,
        title: "The Impact Expedition",
        subtitle: "Participate, Document Accurately, Reflect & Report Honestly",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Expedition Scout Mira",
          speakerRole: "Field Scout Leader",
          dialogue: "Look upon this mission board. Route markers, survey pins, and a prospect logbook. Let us walk through the four phases of a true service expedition.",
        },
        sceneConfig: {
          sceneType: "frontier",
          variant: "mission-board",
          atmosphereTitle: "Field Mission Command Board",
          backdropImage: "/images/realm_of_regent_hero.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Service Methodology & Honest Reporting",
          pages: [38, 39, 86, 87, 88, 89, 137, 138, 139, 140],
          pageRangeDisplay: "pp. 38–39, 86–89, 137–142",
        },
        scriptedDialogue: [
          {
            id: "if2-1",
            speaker: "npc",
            speakerName: "Expedition Scout Mira",
            role: "Field Scout Leader",
            text: "Every service expedition follows four disciplines: participate with dedication, document accurately, reflect on challenges, and report honestly.",
            emotion: "serious",
          },
          {
            id: "if2-2",
            speaker: "explorer",
            text: "Why is honest reflection on challenges as important as reporting successes?",
            emotion: "curious",
          },
          {
            id: "if2-3",
            speaker: "npc",
            speakerName: "Expedition Scout Mira",
            role: "Field Scout Leader",
            text: "Because no field project goes 100% according to plan. Rainstorms hit, suppliers delay, or unforeseen needs arise. A true leader documents what went wrong so the next team learns and adapts.",
            emotion: "thoughtful",
            sceneEvent: "pins_illuminate_on_mission_map",
          },
          {
            id: "if2-4",
            speaker: "companion",
            text: "Participate whole-heartedly, capture truthful evidence, reflect with humility, and report with integrity!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Humility in reflection is the hallmark of mature leadership.",
              raya: "Learn from every obstacle—that's how good explorers become master pathfinders!",
              kai: "Ensure your prospect logbook records project dates, committee roles, and supervising officers.",
            },
          },
          {
            id: "if2-5",
            speaker: "npc",
            speakerName: "Expedition Scout Mira",
            role: "Field Scout Leader",
            text: "The path winds up the mountain summit. You have completed the knowledge chapters; the gates of Membership Citadel await!",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "The Four Disciplines of an Impact Expedition",
            content: [
              "1. Participate: Show up with preparedness, follow safety rules, and serve with dedication.",
              "2. Document Accurately: Capture authentic photos, log attendance lists, and record expenditures.",
              "3. Reflect on Challenges: Evaluate what succeeded and analyze what obstacles arose during execution.",
              "4. Report Honestly: Submit transparent project summaries through club channels without exaggeration.",
            ],
            keyTakeaway: "Honest participation, rigorous documentation, and humble reflection define the true expedition scout.",
          },
        ],
        companionAdvice: {
          nova: "Always take a few minutes after every project to write down your personal reflections.",
          raya: "Thank every volunteer who served beside you—gratitude keeps the team inspired!",
          kai: "Ensure your project chair signs off on your attendance and project contribution.",
        },
        knowledgeTrial: {
          type: "scenario",
          question: "What should a project team do when an unforeseen obstacle causes a delay during project execution?",
          options: [
            {
              id: "opt-a",
              text: "Adapt safely, document the challenge accurately in the project report, and share lessons learned so future teams can prepare better.",
              explanation: "Correct! Honest documentation of challenges and adaptations demonstrates true leadership maturity.",
            },
            {
              id: "opt-b",
              text: "Conceal the obstacle, falsify the completion date, and pretend everything was flawless.",
              explanation: "Incorrect. Falsifying reports damages institutional learning and violates Rotaract integrity.",
            },
            {
              id: "opt-c",
              text: "Abandon the project immediately without informing community partners.",
              explanation: "Incorrect. Projects require communication and responsible follow-through.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Focus on honest reporting, transparent reflection, and continuous improvement.",
          successMessage: "The mission board pins light up with verified routes! Chapter 8 is complete and the FRONTIER SCOUT badge is awarded.",
        },
      },
    ],
  },

  // =========================================================================
  // CHAPTER 9 — MEMBERSHIP CITADEL
  // =========================================================================
  "loc-membership-citadel": {
    id: "loc-membership-citadel",
    chapterNumber: 9,
    chapterLabel: "CHAPTER 9",
    chapterTitle: "Membership Citadel",
    worldName: "Membership Citadel",
    regionTitle: "Mountain Summit Citadel",
    guideNpc: "high-regent",
    seethawakaInspiration: "Inspired by the high summit peaks of the Seethawaka mountain amphitheater at sunrise",
    summary: "Ascend to the highest summit where the High Regent presides. Distinguish universal District 3220 membership categories from the specific Seethawaka Regent induction pathway, and reaffirm your commitment through The Explorer's Commitment.",
    badgeReward: "HIGH REGENT",
    xpReward: 100,
    lessons: [
      {
        id: "lesson-9-1",
        chapterId: "loc-membership-citadel",
        lessonNumber: 1,
        title: "From Prospect to Rotaractor",
        subtitle: "District Membership Categories & Responsibilities",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "High Regent",
          speakerRole: "Presiding Regent of the Citadel",
          dialogue: "Welcome to the sunlit summit of Membership Citadel! Arched marble pillars frame the valley below. You have traveled far; now understand what it truly means to bear the title of Rotaractor.",
        },
        sceneConfig: {
          sceneType: "citadel",
          variant: "ceremonial-hall",
          atmosphereTitle: "Summit Sunrise Council Hall",
          backdropImage: "/images/realm_of_regent_hero.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Membership Categories & Standing",
          pages: [144, 145, 146, 147, 148, 149, 150],
          pageRangeDisplay: "pp. 144–150",
        },
        scriptedDialogue: [
          {
            id: "mc1-1",
            speaker: "npc",
            speakerName: "High Regent",
            role: "Presiding Regent of the Citadel",
            text: "Greetings, Explorer. You stand at the threshold of active membership. In Rotary International District 3220, membership is an active commitment, not an ornamental title.",
            emotion: "warm",
          },
          {
            id: "mc1-2",
            speaker: "explorer",
            text: "High Regent, what are the official membership categories recognized under the District Handbook?",
            emotion: "curious",
          },
          {
            id: "mc1-3",
            speaker: "npc",
            speakerName: "High Regent",
            role: "Presiding Regent of the Citadel",
            text: "The handbook outlines: Prospective Member (shown interest, under observation, participating in activities), Active Member (fully inducted, fulfilling club responsibilities, paying dues), Inactive Member, and Member in Good Standing.",
            emotion: "thoughtful",
            sceneEvent: "citadel_pillars_glow_gold",
          },
          {
            id: "mc1-4",
            speaker: "companion",
            text: "A Member in Good Standing attends meetings, pays club and RI dues, and maintains positive ethical conduct!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Good standing is not a test you pass once; it is a standard of consistency you uphold every single month.",
              raya: "Active membership gives you voting rights, leadership roles, and a permanent voice in our club!",
              kai: "Understanding rights and responsibilities ensures you protect your standing throughout your Rotaract career.",
            },
          },
          {
            id: "mc1-5",
            speaker: "npc",
            speakerName: "High Regent",
            role: "Presiding Regent of the Citadel",
            text: "Now unroll the second scroll. Let us examine the specific pathway that leads to induction in the Rotaract Club of Seethawaka Regent.",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "District 3220 Membership Categories",
            content: [
              "Prospective Member: An individual who has demonstrated interest, is undergoing orientation, and is participating in club activities under observation.",
              "Active Member: Fully inducted member who fulfills club meeting and project obligations, pays applicable dues, and holds full voting rights.",
              "Member in Good Standing: An active member who has paid all dues, actively participates, and maintains honorable behavioral conduct.",
              "Club Autonomy: The handbook explicitly states that individual clubs establish their own specific active-membership criteria.",
            ],
            keyTakeaway: "District 3220 establishes universal categories; individual clubs define specific progression requirements.",
          },
        ],
        companionAdvice: {
          nova: "Remember that rights in Rotaract come coupled with responsibilities to your community.",
          raya: "Wear your future member pin as a badge of honor and commitment!",
          kai: "Review club bylaws regarding quorum and voting eligibility for active members.",
        },
        knowledgeTrial: {
          type: "classification",
          question: "Under the District 3220 Handbook, what defines a 'Member in Good Standing'?",
          options: [
            {
              id: "opt-a",
              text: "An active member who has paid all applicable dues, actively participates in club activities, and maintains honorable conduct.",
              explanation: "Correct! Good standing requires dues compliance, active participation, and positive behavioral conduct.",
            },
            {
              id: "opt-b",
              text: "A member who pays dues once but never attends any meetings or projects for three years.",
              explanation: "Incorrect. Active participation is mandatory for maintaining good standing.",
            },
            {
              id: "opt-c",
              text: "A guest who has never attended a club meeting.",
              explanation: "Incorrect. Good standing applies only to inducted active members.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Focus on dues compliance, active participation, and ethical standing.",
          successMessage: "The marble pillars resonate with golden light! You understand the rights and duties of membership.",
        },
      },
      {
        id: "lesson-9-2",
        chapterId: "loc-membership-citadel",
        lessonNumber: 2,
        title: "The Regent Path to Induction",
        subtitle: "The 5-Point RACSR Pathway & The Explorer's Commitment",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "High Regent",
          speakerRole: "Presiding Regent of the Citadel",
          dialogue: "High Regent unrolls two ceremonial scrolls: the District Golden Scroll and the Regent Maroon Scroll. Distinguish universal guidance from our club's specific pathway.",
        },
        sceneConfig: {
          sceneType: "citadel",
          variant: "two-scrolls",
          atmosphereTitle: "Two Ceremonial Scrolls of Induction",
          backdropImage: "/images/realm_of_regent_hero.jpg",
        },
        source: {
          publication: "Rotaract Information Handbook 2026–27",
          district: "Rotary International District 3220 — Sri Lanka & Maldives",
          section: "Membership Development & RACSR Pathway",
          pages: [144, 145, 146, 147, 148, 149, 150],
          pageRangeDisplay: "pp. 144–150 + Club Bylaws",
        },
        scriptedDialogue: [
          {
            id: "mc2-1",
            speaker: "npc",
            speakerName: "High Regent",
            role: "Presiding Regent of the Citadel",
            text: "Observe these two scrolls: The District Golden Scroll outlines universal membership categories. The Regent Maroon Scroll outlines our club's specific 5-point pathway to induction.",
            emotion: "warm",
          },
          {
            id: "mc2-2",
            speaker: "explorer",
            text: "High Regent, what are the five requirements of the Seethawaka Regent induction pathway?",
            emotion: "curious",
          },
          {
            id: "mc2-3",
            speaker: "npc",
            speakerName: "High Regent",
            role: "Presiding Regent of the Citadel",
            text: "First: complete Gateway Prologue and Chapters 1–8 required curriculum. Second: attend at least two verified physical meetings. Third: participate in at least two verified community projects. Fourth: receive Sergeant-at-Arms and officer verification. Fifth: Board review and formal confirmation!",
            emotion: "thoughtful",
            sceneEvent: "two_scrolls_unroll_glow",
          },
          {
            id: "mc2-4",
            speaker: "companion",
            text: "And at the culmination, we recite The Explorer's Commitment—reaffirming that we will serve with integrity, humility, and dedication!",
            emotion: "celebrate",
            companionVariants: {
              nova: "Notice how knowledge and physical participation must be balanced—neither is complete without the other.",
              raya: "You've proven your knowledge in the digital realm; now fulfill your meetings and projects and claim your pin!",
              kai: "A transparent, non-circular checklist: complete requirements 1 through 4, then present to the Board.",
            },
          },
          {
            id: "mc2-5",
            speaker: "npc",
            speakerName: "High Regent",
            role: "Presiding Regent of the Citadel",
            text: "Reaffirm your commitment, Explorer. You are ready to make history with the Rotaract Club of Seethawaka Regent!",
            emotion: "warm",
          },
        ],
        sections: [
          {
            title: "The Seethawaka Regent 5-Point Pathway",
            content: [
              "1. Curriculum V2 Mastery: Completing Gateway Prologue and Chapters 1–8 required curriculum.",
              "2. Meeting Participation: Attending a minimum of 2 verified physical club General Assemblies.",
              "3. Project Engagement: Actively volunteering on at least 2 verified community service projects.",
              "4. Officer Verification: Receiving verification from the Sergeant-at-Arms / Membership Director.",
              "5. Board Review & Confirmation: Formal confirmation by the Board of Directors followed by the pinning ceremony.",
            ],
            keyTakeaway: "Induction combines verified digital learning, active real-world participation, and formal Board review.",
          },
          {
            title: "The Explorer's Commitment",
            content: [
              "“I commit to upholding the values of selfless service, fellowship, and integrity in all that I do.",
              "I pledge to listen to my community with humility, serve with dedication, and lead by example as an ambassador of the Rotaract Club of Seethawaka Regent.”",
            ],
            quote: {
              text: "Driven by Purpose. Defined by Impact.",
              author: "Rotaract Club of Seethawaka Regent Motto",
            },
          },
        ],
        companionAdvice: {
          nova: "Reflect on The Explorer's Commitment—it will be your compass in moments of challenge.",
          raya: "Congratulations Explorer! You've walked the full trail of knowledge!",
          kai: "Coordinate with your membership director to schedule your formal Board review.",
        },
        knowledgeTrial: {
          type: "scenario",
          question: "What are the required prerequisites BEFORE a prospect is eligible for Board Review under the RACSR pathway?",
          options: [
            {
              id: "opt-a",
              text: "Gateway Prologue + Chapters 1–8 Curriculum V2 completion + 2 verified meetings + 2 verified projects + officer verification.",
              explanation: "Correct! The RACSR pathway requires completing the knowledge curriculum (Prologue + Ch1–8), 2 verified meetings, 2 verified projects, and officer verification.",
            },
            {
              id: "opt-b",
              text: "Only paying money without completing any learning or attending any meetings.",
              explanation: "Incorrect. RACSR requires verified knowledge, meeting attendance, and real-world project participation.",
            },
            {
              id: "opt-c",
              text: "Completing Chapter 9 before being allowed to unlock Chapter 9.",
              explanation: "Incorrect. Chapter 9 is the induction stage itself and is never a prerequisite to enter Board Review.",
            },
          ],
          correctOptionId: "opt-a",
          hint: "Remember the 5-point formula: Curriculum V2 (Prologue + Ch1-8) + 2 meetings + 2 projects + officer check.",
          successMessage: "The ceremonial Regent emblem blazes with golden sunrise radiance! You have conquered the Journey and earned the HIGH REGENT badge!",
        },
      },
    ],
  },
};
