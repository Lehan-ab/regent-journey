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

export interface StoryDialogueBeat {
  speaker: "guide" | "prospect" | "npc";
  speakerName?: string;
  role?: string;
  emotion?: "idle" | "happy" | "thinking" | "celebrate" | "proud";
  text: string;
  prospectChoices?: string[];
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
  interactiveStory?: StoryDialogueBeat[];
  sections: LessonSection[];
  companionAdvice: {
    nova: string; // Wisdom / Knowledge
    raya: string; // Action / Adventure
    kai: string;  // Strategy / Planning
  };
  knowledgeCheck: KnowledgeCheck;
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
  lessons: LessonData[];
}

export const CHAPTERS_DATA: Record<string, ChapterDetails> = {
  "loc-gateway": {
    id: "loc-gateway",
    chapterNumber: 0,
    chapterLabel: "PROLOGUE",
    chapterTitle: "The Gateway",
    worldName: "The Gateway",
    regionTitle: "Valley Threshold",
    seethawakaInspiration: "Inspired by Seethawaka river entryway and stone heritage archways",
    summary: "Cross the stone archway into the Realm of Regent. Discover what it means to be a prospect explorer and map your path to official Rotaract membership.",
    badgeReward: "INITIATE",
    xpReward: 50,
    lessons: [
      {
        id: "lesson-0-1",
        chapterId: "loc-gateway",
        lessonNumber: 1,
        title: "Welcome to the Realm of Regent",
        subtitle: "The Vision & Spirit of Seethawaka Regent",
        readTime: "2 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Gatekeeper Aaron",
          speakerRole: "Portal Guardian",
          dialogue: "Halt, traveler! Beyond this stone arch lies the historic valley of Seethawaka. You carry curiosity in your eyes and purpose in your stride. Let us see if your spirit resonates with the Regent code.",
        },
        sections: [
          {
            title: "What is Rotaract Seethawaka Regent?",
            content: [
              "The Rotaract Club of Seethawaka Regent (RACSR) is a dynamic, youth-driven organization chartered under Rotary International District 3220 (Sri Lanka & Maldives).",
              "We draw our cultural inspiration from the timeless valor and natural splendor of the historic Seethawaka Kingdom—channeling that heritage into modern community impact, youth empowerment, and lifelong leadership.",
            ],
            keyTakeaway: "RACSR is more than a volunteer group—it is a brotherhood and sisterhood of changemakers driven by purpose and defined by impact.",
          },
          {
            title: "Our Club Creed & Colors",
            content: [
              "Regent Maroon represents passion, courage, and the historic bloodline of Seethawaka's defenders.",
              "Imperial Gold signifies excellence, fellowship, and the lasting value we create for our society.",
              "Our motto: 'Driven by Purpose. Defined by Impact.' Every initiative we forge must create measurable, lasting community transformation.",
            ],
            bulletPoints: [
              "Chartered under: Rotary International District 3220",
              "Club Model: Independent Self-Sponsored Club (Autonomous Youth Governance)",
              "Headquarters: Avissawella / Seethawaka Valley Corridor",
            ],
          },
        ],
        companionAdvice: {
          nova: "Pay close attention to our club roots! Knowing who we are and why we serve will be the compass that guides all your future projects.",
          raya: "Welcome aboard! Don't just read about our spirit—feel the adrenaline of jumping into real projects and meeting our fellowship!",
          kai: "Starting strong is about clear intentions. Understand RACSR's core values first, and your path to leadership will unfold seamlessly.",
        },
        knowledgeCheck: {
          question: "What is the official club motto of the Rotaract Club of Seethawaka Regent?",
          options: [
            {
              id: "opt-1",
              text: "Driven by Purpose. Defined by Impact.",
              explanation: "Correct! 'Driven by Purpose. Defined by Impact.' is the proud guiding motto of RACSR.",
            },
            {
              id: "opt-2",
              text: "Service Above Fellowship.",
              explanation: "Incorrect. Rotary's motto is 'Service Above Self', but RACSR's specific club motto is 'Driven by Purpose. Defined by Impact.'",
            },
            {
              id: "opt-3",
              text: "Leadership through Silence.",
              explanation: "Incorrect. Rotaract champions active youth voices and bold community leadership.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Remember our twin pillars: Purpose and Impact!",
          successMessage: "Splendid! You understand the foundational heartbeat of RACSR.",
        },
      },
      {
        id: "lesson-0-2",
        chapterId: "loc-gateway",
        lessonNumber: 2,
        title: "The Prospect Explorer Pathway",
        subtitle: "From Guest to Inducted Regent Member",
        readTime: "3 min",
        xpReward: 25,
        storyIntro: {
          speaker: "Gatekeeper Aaron",
          speakerRole: "Portal Guardian",
          dialogue: "You cannot wear the Regent Pin simply by asking. It is forged through active attendance, genuine fellowship, and on-ground community service. Here is your roadmap.",
        },
        sections: [
          {
            title: "The 4 Milestones to Induction",
            content: [
              "Every member of RACSR once walked through this gateway as an aspiring prospect explorer. Becoming a fully recognized, badged, and pinned Regent member follows a transparent 4-stage journey:",
            ],
            bulletPoints: [
              "1. Knowledge Mastery (ROTA 101): Complete the digital chapters of this Regent Journey to understand Rotary ethics, history, and protocols.",
              "2. Meeting Attendance: Attend a minimum of two official club general assemblies (physical or hybrid) to meet the board and fellowship with members.",
              "3. Hands-on Project Participation: Actively participate in at least one club project across any of the 7 avenues of service.",
              "4. The Regent Oath & Pinning: Complete your prospect interview with the Executive Committee, take the official pledge, and receive your bronze club pin!",
            ],
            keyTakeaway: "Induction is not a formality; it is our celebration of your real-world commitment to Seethawaka and humanity.",
          },
        ],
        companionAdvice: {
          nova: "Keep track of your meeting attendance and project hours! Knowledge combined with attendance will earn you the Regent Pin.",
          raya: "Step up at your first meeting! Introduce yourself, join a project sub-committee, and you will make friends for life.",
          kai: "Consistency is key. Setting a goal to attend the very next assembly is the most tactical move you can make today.",
        },
        knowledgeCheck: {
          question: "Which of the following is REQUIRED before an explorer can be officially inducted as a member of RACSR?",
          options: [
            {
              id: "opt-1",
              text: "Paying a large private entrance donation",
              explanation: "Incorrect. Rotaract never charges entrance donations; membership is based on character, attendance, and commitment.",
            },
            {
              id: "opt-2",
              text: "Active meeting attendance, hands-on project participation, and ROTA 101 mastery",
              explanation: "Correct! Prospects earn induction through meeting attendance, project participation, and learning club foundations.",
            },
            {
              id: "opt-3",
              text: "Having more than 5 years of prior corporate executive experience",
              explanation: "Incorrect. Rotaract is designed for young people from all backgrounds, students and professionals alike.",
            },
          ],
          correctOptionId: "opt-2",
          hint: "Think about the 4 Milestones: learning, attending, and serving hands-on.",
          successMessage: "Spot on! You now hold the master map to official membership.",
        },
      },
    ],
  },

  "loc-rotary-roots": {
    id: "loc-rotary-roots",
    chapterNumber: 1,
    chapterLabel: "CHAPTER 1",
    chapterTitle: "Rotary Roots",
    worldName: "Rotary Roots",
    regionTitle: "Sacred Botanical Canopy",
    seethawakaInspiration: "Inspired by Seethawaka Botanical Garden (Ilangakoon)",
    summary: "Delve into the origin and history of Rotary International in 1905, master the timeless Four-Way Test, explore Service Above Self, and understand the global and district governance of Rotary International District 3220.",
    badgeReward: "ROOT SEEKER",
    xpReward: 150,
    lessons: [
      {
        id: "lesson-1-1",
        chapterId: "loc-rotary-roots",
        lessonNumber: 1,
        title: "The Origin & History of Rotary",
        subtitle: "Room 711, 1905, and the World's First Service Club",
        readTime: "4 min",
        xpReward: 35,
        storyIntro: {
          speaker: "The Archivist",
          speakerRole: "Ancient Lore Keeper",
          dialogue: "Welcome beneath the giant banyans of Rotary Roots. Before you can branch out into leadership, your roots must tap into the subterranean rivers of history. Listen closely to how four visionaries started a global revolution.",
        },
        sections: [
          {
            title: "The First Rotary Meeting: February 23, 1905",
            content: [
              "On the evening of February 23, 1905, a young Chicago attorney named Paul P. Harris gathered three friends in Room 711 of the Unity Building in downtown Chicago.",
              "His companions represented diverse vocations: Silvester Schiele (a coal merchant), Gustavus Loehr (a mining engineer), and Hiram E. Shorey (a merchant tailor).",
              "Their original goal was simple yet revolutionary: to recreate the friendly, supportive fellowship of small-town life within the bustling metropolis of Chicago, uniting professionals of diverse backgrounds.",
            ],
            quote: {
              text: "Whatever Rotary may mean to us, to the world it will be known by the results it achieves.",
              author: "Paul P. Harris, Founder of Rotary",
            },
          },
          {
            title: "Why the Name 'Rotary'?",
            content: [
              "The founders decided to rotate their weekly meetings among each other's offices and places of business. This practice of rotating locations led to the name: 'The Rotary Club'.",
              "As the club expanded, the members realized that fellowship was even more rewarding when coupled with service to others. In 1907, the Chicago Rotary club initiated its very first community service project: constructing Chicago's first public comfort station (restroom facility).",
            ],
            keyTakeaway: "Rotary invented the concept of the 'service club'—proving that professional networking gains its highest fulfillment when dedicated to public good.",
          },
          {
            title: "From Local Circle to Global Humanitarian Force",
            content: [
              "Rotary quickly swept across North America and across the oceans. By 1910, clubs formed in San Francisco, New York, and Winnipeg (Canada), creating the International Association of Rotary Clubs.",
              "In 1922, the organization officially adopted the name Rotary International (RI).",
              "Today, Rotary International spans more than 46,000 clubs in over 200 countries and geographical areas, uniting 1.4+ million dedicated volunteers.",
              "Its flagship global initiative, PolioPlus (launched in 1985), has reduced polio cases worldwide by 99.9%, immunizing over 3 billion children and standing on the precipice of eradicating a human disease for only the second time in history.",
            ],
          },
        ],
        companionAdvice: {
          nova: "Remember Room 711 and the date February 23, 1905! That date is celebrated globally as World Understanding and Peace Day.",
          raya: "Imagine four regular people sitting in a Chicago office changing millions of lives! That is the exact same power our club projects have.",
          kai: "Notice the structural genius: rotating meetings built trust, diverse vocations built versatility, and community service built enduring legacy.",
        },
        knowledgeCheck: {
          question: "Who founded Rotary, and what was the historical reason behind the name 'Rotary'?",
          options: [
            {
              id: "opt-1",
              text: "Paul Harris; named because the founders rotated meeting locations among their offices",
              explanation: "Correct! Paul Harris and three friends founded Rotary in Chicago in 1905, rotating their meeting venues.",
            },
            {
              id: "opt-2",
              text: "Herbert Taylor; named after the rotating mechanical gears in industrial Chicago factories",
              explanation: "Incorrect. Herbert Taylor authored the Four-Way Test in 1932; Paul Harris founded Rotary in 1905.",
            },
            {
              id: "opt-3",
              text: "Arch Klumph; named after the rotating Earth representing international peace",
              explanation: "Incorrect. Arch Klumph established the Rotary Foundation in 1917.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Think about where the early members met every week!",
          successMessage: "Historic excellence! You know the origin story of our global movement.",
        },
      },
      {
        id: "lesson-1-2",
        chapterId: "loc-rotary-roots",
        lessonNumber: 2,
        title: "The Four-Way Test",
        subtitle: "The Timeless Ethical Compass of All Rotarians",
        readTime: "3 min",
        xpReward: 35,
        storyIntro: {
          speaker: "The Archivist",
          speakerRole: "Ancient Lore Keeper",
          dialogue: "Look upon this stone monolith. Four questions are carved into its face, glowing with steadfast clarity. Whenever you face a moral crossroad in life, project planning, or leadership, measure your decisions against this test.",
        },
        sections: [
          {
            title: "Origin of the Four-Way Test",
            content: [
              "In 1932, during the depths of the Great Depression, an entrepreneur named Herbert J. Taylor was brought in to save the Club Aluminum Company of Chicago from impending bankruptcy.",
              "Believing that ethical conduct was the only foundation for lasting commercial recovery, Taylor drafted a 24-word code of ethics for all employees to memorize and apply to advertising, sales, and internal relations.",
              "The company miraculously rebounded, paid off its debts with interest, and distributed substantial dividends. Rotary adopted this code in 1943, and it has since been translated into over 100 languages.",
            ],
            quote: {
              text: "Of the things we think, say or do:\n1. Is it the TRUTH?\n2. Is it FAIR to all concerned?\n3. Will it build GOODWILL and BETTER FRIENDSHIPS?\n4. Will it be BENEFICIAL to all concerned?",
              author: "The Four-Way Test (Herbert J. Taylor, 1932)",
            },
          },
          {
            title: "Applying the 4 Questions in Rotaract",
            content: [
              "The Four-Way Test is not a rigid set of bureaucratic rules; it is a practical mental filter applied before speaking, posting on social media, making a financial decision, or organizing a community camp:",
            ],
            bulletPoints: [
              "1. Is it the TRUTH? Be transparent, factual, and honest in club accounting, reporting, and PR.",
              "2. Is it FAIR to all concerned? Does this project respect all stakeholders, underprivileged beneficiaries, partners, and club members equally?",
              "3. Will it build GOODWILL and BETTER FRIENDSHIPS? Does our tone bring people together, or does it cause unnecessary friction and gossip?",
              "4. Will it be BENEFICIAL to all concerned? Are we creating sustainable value, or just a fleeting photo-op?",
            ],
            keyTakeaway: "When every decision passes all four tests, trust flourishes, and your leadership commands undeniable respect.",
          },
        ],
        companionAdvice: {
          nova: "Always test your words against Question 3: 'Will it build goodwill and better friendships?' A club thrives on harmony.",
          raya: "When we plan community projects, Question 4 is king: Will it truly benefit the villagers long after we leave? Sustainability matters!",
          kai: "In business and sponsorships, Question 2 (Fairness) and Question 1 (Truth) will protect your reputation for decades.",
        },
        knowledgeCheck: {
          question: "Which of the following is the THIRD question of the Rotary Four-Way Test?",
          options: [
            {
              id: "opt-1",
              text: "Is it beneficial to all concerned?",
              explanation: "Incorrect. 'Will it be beneficial to all concerned?' is the fourth question.",
            },
            {
              id: "opt-2",
              text: "Will it build GOODWILL and BETTER FRIENDSHIPS?",
              explanation: "Correct! The 3rd question is: 'Will it build GOODWILL and BETTER FRIENDSHIPS?'",
            },
            {
              id: "opt-3",
              text: "Will it generate sufficient profit for the club?",
              explanation: "Incorrect. The Four-Way Test focuses on ethics, truth, fairness, goodwill, and community benefit, never personal profit.",
            },
          ],
          correctOptionId: "opt-2",
          hint: "The order is: 1. Truth, 2. Fair, 3. Goodwill/Friendships, 4. Beneficial.",
          successMessage: "Spot on! The Four-Way Test is your lifelong ethical shield.",
        },
      },
      {
        id: "lesson-1-3",
        chapterId: "loc-rotary-roots",
        lessonNumber: 3,
        title: "Service Above Self & Areas of Focus",
        subtitle: "The Core Philosophy Powering Global Transformation",
        readTime: "3 min",
        xpReward: 35,
        storyIntro: {
          speaker: "The Archivist",
          speakerRole: "Ancient Lore Keeper",
          dialogue: "Selfish ambition burns out like dry kindling; selfless service burns like the eternal hearth. Let us examine the philosophy that has guided Rotarians for over a century.",
        },
        sections: [
          {
            title: "The Motto: Service Above Self",
            content: [
              "Rotary's primary official motto, 'Service Above Self', was first voiced by Rotarian Frank Collins in 1911 and officially ratified in 1950. A secondary companion motto is: 'One Profits Most Who Serves Best'.",
              "It reminds us that our highest human satisfaction comes when we elevate others before seeking personal applause or commercial gain.",
            ],
            keyTakeaway: "In Rotaract Seethawaka Regent, leadership is measured not by titles on a business card, but by how selflessly we roll up our sleeves to uplift our neighbors.",
          },
          {
            title: "Rotary's 7 Areas of Focus",
            content: [
              "To maximize global impact, Rotary directs its resources, grants, and youth action toward 7 critical humanitarian causes worldwide:",
            ],
            bulletPoints: [
              "1. Peacebuilding and Conflict Prevention",
              "2. Disease Prevention and Treatment (including PolioPlus & dengue drives)",
              "3. Water, Sanitation, and Hygiene (WASH)",
              "4. Maternal and Child Health",
              "5. Basic Education and Literacy",
              "6. Community Economic Development",
              "7. Supporting the Environment (added in 2020 as a core global priority)",
            ],
          },
        ],
        companionAdvice: {
          nova: "The 7 Areas of Focus are recognized by the United Nations! Aligning your projects with them makes funding and district citations much easier.",
          raya: "Supporting the Environment is our personal favorite in Seethawaka! Our riverbanks and lush rainforests need our hands on deck.",
          kai: "When drafting project proposals, always map your objectives directly to at least one of these 7 areas.",
        },
        knowledgeCheck: {
          question: "What is Rotary International's primary official motto?",
          options: [
            {
              id: "opt-1",
              text: "Service Above Self",
              explanation: "Correct! 'Service Above Self' has been the defining motto of Rotary since 1911.",
            },
            {
              id: "opt-2",
              text: "Success Through Competition",
              explanation: "Incorrect. Rotary is built on collaboration, fellowship, and selfless service.",
            },
            {
              id: "opt-3",
              text: "Power to the Youth",
              explanation: "Incorrect. While youth empowerment is central to Rotaract, the universal motto is 'Service Above Self'.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Think of selflessness over ego!",
          successMessage: "Masterfully done! You carry the heart of a true Rotaractor.",
        },
      },
      {
        id: "lesson-1-4",
        chapterId: "loc-rotary-roots",
        lessonNumber: 4,
        title: "Rotary Global & District 3220 Governance",
        subtitle: "From Rotary International in Evanston to District 3220 (Sri Lanka & Maldives)",
        readTime: "4 min",
        xpReward: 45,
        storyIntro: {
          speaker: "The Archivist",
          speakerRole: "Ancient Lore Keeper",
          dialogue: "You are not an isolated explorer. You are connected to an organized global fellowship bridging Evanston, Illinois to every corner of Sri Lanka and the Maldives. Behold the architecture of Rotary International and District 3220.",
        },
        sections: [
          {
            title: "1. Global Governance: Rotary International",
            content: [
              "Every Rotary year runs from July 1 to June 30 of the following calendar year, welcoming a new theme and set of worldwide leaders.",
              "At the global apex stands Rotary International (RI), headquartered in Evanston, Illinois, USA. It is led by the RI President and the RI Board of Directors, uniting over 1.4 million members across 46,000+ clubs in more than 200 countries.",
              "The Rotary Foundation serves as the humanitarian engine of the movement, channeling hundreds of millions of dollars annually into global grants for water, sanitation, peacebuilding, disease prevention, and the eradication of polio through PolioPlus.",
            ],
            bulletPoints: [
              "Global Apex: Rotary International President & Board of Directors (Evanston, IL)",
              "Humanitarian Engine: The Rotary Foundation & Global Grant Endowments",
              "Worldwide Footprint: 1.4+ Million Volunteers across 46,000+ Clubs",
            ],
          },
          {
            title: "2. District 3220 & The 2019 Elevation of Rotaract",
            content: [
              "Across the world, Rotary clubs are organized into geographical administrative units called Districts. Sri Lanka and the Maldives form Rotary International District 3220.",
              "District 3220 is presided over by the District Governor (DG), who oversees all Rotary operations. The youth movement is championed by the District Rotaract Committee Chair (DRCC) and led by the District Rotaract Representative (DRR) alongside the District Steering Committee.",
              "Historically, Rotaract clubs were required to be sponsored by a local Rotary club. However, at the historic 2019 Rotary International Council on Legislation, Rotaract was elevated to a full membership category of Rotary International.",
              "This landmark decision granted Rotaract clubs institutional self-governance and the official authority to establish as independent, self-sponsored clubs, taking full ownership of their own leadership, finances, and destiny!",
            ],
            bulletPoints: [
              "District 3220 Territory: Sri Lanka & The Republic of Maldives",
              "District Governor (DG): Supreme administrative leader of District 3220",
              "District Rotaract Representative (DRR): Executive leader of the youth movement",
              "2019 Elevate Rotaract Landmark: Official recognition of Rotaract clubs as self-governing and eligible for independent self-sponsorship!",
            ],
            keyTakeaway: "District 3220 is a tight-knit brotherhood and sisterhood across Sri Lanka and the Maldives. The 2019 elevation empowered Rotaract clubs to stand tall as autonomous, self-sponsored changemakers.",
          },
        ],
        companionAdvice: {
          nova: "Remember District 3220 and the 2019 Elevate Rotaract milestone! That legislative change is what enables vibrant clubs to operate with independent self-sponsored excellence.",
          raya: "District 3220 hosts island-wide conferences, sports fiestas, and assemblies where you will meet thousands of inspiring young leaders!",
          kai: "Understanding the chain from RI President to District Governor and DRR demonstrates true institutional maturity.",
        },
        knowledgeCheck: {
          question: "Which Rotary District unites all Rotary and Rotaract clubs across Sri Lanka and the Maldives, and how did Rotary elevate Rotaract in 2019?",
          options: [
            {
              id: "opt-1",
              text: "District 3220; Rotaract was elevated to a recognized partner in service with full authority for independent self-sponsorship and self-governance",
              explanation: "Correct! District 3220 unites Sri Lanka & Maldives, and the 2019 Council on Legislation recognized Rotaract as self-governing partners with self-sponsorship eligibility.",
            },
            {
              id: "opt-2",
              text: "District 1905; Rotaract was converted into a high school debating society",
              explanation: "Incorrect. 1905 is the year Rotary was founded, and District 3220 is our district.",
            },
            {
              id: "opt-3",
              text: "District 9900; Rotaract was dissolved and replaced by corporate internships",
              explanation: "Incorrect. Rotaract expanded globally and is stronger than ever across District 3220.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Think about our island nation district code: 3220, and the freedom of self-sponsored youth leadership!",
          successMessage: "Outstanding! You master the global and district architecture of Rotary and Rotaract.",
        },
      },
    ],
  },

  "loc-rotaract-harbor": {
    id: "loc-rotaract-harbor",
    chapterNumber: 2,
    chapterLabel: "CHAPTER 2",
    chapterTitle: "Rotaract Harbor",
    worldName: "Rotaract Harbor",
    regionTitle: "River Port Basin",
    seethawakaInspiration: "Inspired by the Kelani & Seethawaka river confluence",
    summary: "Explore the origin of the global Rotaract movement in 1968, the historic 'Elevate Rotaract' milestone, and how District 3220 unites young leaders across Sri Lanka and the Maldives.",
    badgeReward: "VOYAGER",
    xpReward: 150,
    lessons: [
      {
        id: "lesson-2-1",
        chapterId: "loc-rotaract-harbor",
        lessonNumber: 1,
        title: "The Birth of the Rotaract Movement",
        subtitle: "1968, Charlotte North Carolina, and 'Rotary in Action'",
        readTime: "3 min",
        xpReward: 50,
        storyIntro: {
          speaker: "Port Master Kael",
          speakerRole: "Harbor Navigator",
          dialogue: "Welcome to Rotaract Harbor! The river waters here flow outwards to the great oceans. For decades, young people sought a way to partner with Rotary on equal terms. Here is how our movement was born.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "Port Master Kael",
            role: "Harbor Navigator",
            emotion: "happy",
            text: "Welcome to Rotaract Harbor, Prospect! The river waters here flow outwards to the great oceans. For decades, young changemakers sought a way to partner with Rotary on equal terms. Here is how our movement was born!",
          },
          {
            speaker: "prospect",
            text: "How did Rotaract first originate, Port Master? What does the name stand for?",
            prospectChoices: [
              "What does the name 'Rotaract' actually stand for?",
              "When was the very first Rotaract club chartered?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "The name 'Rotaract' is a dynamic blend of 'Rotary' and 'Action'! On March 13, 1968, the first club was chartered at the University of North Carolina in Charlotte, USA.",
          },
          {
            speaker: "prospect",
            text: "Rotary in Action! That perfectly captures the energetic spirit of young people.",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Spot on, Chief! And every year, the global movement celebrates World Rotaract Week during the week of March 13 to honor that historic spark of youth leadership!",
          },
        ],
        sections: [
          {
            title: "March 13, 1968: The First Rotaract Club",
            content: [
              "In the 1960s, Rotary leaders recognized that university students and young adults needed an energetic platform of their own to practice leadership and community service.",
              "On March 13, 1968, the very first Rotaract club was chartered at the University of North Carolina in Charlotte, USA, sponsored by the Rotary Club of Charlotte.",
              "The name 'Rotaract' is a portmanteau blending 'Rotary' and 'Action'.",
              "Every year, the global movement celebrates World Rotaract Week during the week of March 13 to honor this historic milestone.",
            ],
            keyTakeaway: "Rotaract was born from youth action—giving young adults between university and career takeoff the reins to lead community transformation.",
          },
        ],
        companionAdvice: {
          nova: "Remember the week of March 13: World Rotaract Week! Clubs worldwide celebrate with joint fellowship and service drives.",
          raya: "Rotary in Action! That is what Rotaract means. No sitting around talking—we roll up our sleeves and build.",
          kai: "Notice how Rotaract bridges university life and early career. It is the premier training ground for next-generation leaders.",
        },
        knowledgeCheck: {
          question: "When and where was the very first Rotaract club officially chartered?",
          options: [
            {
              id: "opt-1",
              text: "March 13, 1968 in Charlotte, North Carolina (USA)",
              explanation: "Correct! The Rotaract Club of the University of North Carolina was chartered on March 13, 1968.",
            },
            {
              id: "opt-2",
              text: "February 23, 1905 in Chicago, Illinois",
              explanation: "Incorrect. That was the founding of Rotary itself, not Rotaract.",
            },
            {
              id: "opt-3",
              text: "July 1, 2026 in Avissawella, Sri Lanka",
              explanation: "Incorrect. That is connected to our own local club charter, not the global birth of Rotaract.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Look for 1968 and the city of Charlotte!",
          successMessage: "Superb! You know the birthdate of our global movement.",
        },
      },
      {
        id: "lesson-2-2",
        chapterId: "loc-rotaract-harbor",
        lessonNumber: 2,
        title: "Elevate Rotaract: A Historic Milestone",
        subtitle: "From Youth Program to Equal Membership Type",
        readTime: "3 min",
        xpReward: 50,
        storyIntro: {
          speaker: "Port Master Kael",
          speakerRole: "Harbor Navigator",
          dialogue: "For 51 years, Rotaract was categorized as a 'program of Rotary'. But in 2019, history shifted on its axis. Let me recount the watershed moment known as 'Elevate Rotaract'.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "Port Master Kael",
            role: "Harbor Navigator",
            emotion: "proud",
            text: "For 51 years, Rotaract was categorized as merely an external 'program of Rotary'. But in 2019, history shifted on its axis!",
          },
          {
            speaker: "prospect",
            text: "What monumental shift took place in 2019, Port Master?",
            prospectChoices: [
              "Tell me about the Council on Legislation vote!",
              "Did Rotaract become an equal partner?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "Rotary's parliament—the Council on Legislation—passed the historic 'Elevate Rotaract' enactment! Rotaract was officially recognized as an equal membership type of Rotary International.",
          },
          {
            speaker: "prospect",
            text: "And that gave clubs the freedom to self-sponsor and removed the age ceiling?",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Precisely! Clubs can be self-sponsored community hubs, members never 'age out' at 30, and we have direct access to Rotary Foundation grants. We are equal partners in service!",
          },
        ],
        sections: [
          {
            title: "The 2019 Council on Legislation Vote",
            content: [
              "In April 2019, the Council on Legislation (Rotary's parliament) gathered to vote on a groundbreaking constitutional change.",
              "By an overwhelming majority, the Council voted to elevate Rotaract: officially recognizing Rotaract clubs as a distinct membership type of Rotary International, rather than merely an external youth program.",
              "This landmark reform took effect on July 1, 2020.",
            ],
            bulletPoints: [
              "Rotaract clubs can now establish without mandatory Rotary club sponsorship (though sponsor partnerships remain treasured).",
              "The upper age limit of 30 was removed, allowing professionals to continue serving in Rotaract as long as they choose.",
              "Rotaractors gained direct access to Rotary Foundation global and district grants.",
              "Rotaract and Rotary members can hold dual membership simultaneously.",
            ],
            keyTakeaway: "'Elevate Rotaract' recognized young leaders not as future leaders, but as leaders of today.",
          },
        ],
        companionAdvice: {
          nova: "Elevate Rotaract elevated our standing worldwide. We sit at the table with Rotary leaders as equal partners in service.",
          raya: "No age limits means you can build lifelong networks in Rotaract without worrying about aging out!",
          kai: "Access to Rotary Foundation grants allows Rotaract clubs to scale up multi-million rupee community projects.",
        },
        knowledgeCheck: {
          question: "What major transformation occurred when Rotary passed the 'Elevate Rotaract' legislation in 2019?",
          options: [
            {
              id: "opt-1",
              text: "Rotaract was recognized as an official membership type of Rotary International with no upper age limit",
              explanation: "Correct! Elevate Rotaract gave Rotaract equal membership status and removed the strict age limit of 30.",
            },
            {
              id: "opt-2",
              text: "All Rotaract clubs were forced to merge into local municipal councils",
              explanation: "Incorrect. Rotaract remains autonomous and community-led.",
            },
            {
              id: "opt-3",
              text: "Rotaract was converted into a purely online social media club",
              explanation: "Incorrect. Rotaract's hands-on community projects and physical fellowship expanded even further.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Think about becoming an official membership type of Rotary International!",
          successMessage: "Splendid! You understand how Rotaract became the global force it is today.",
        },
      },
      {
        id: "lesson-2-3",
        chapterId: "loc-rotaract-harbor",
        lessonNumber: 3,
        title: "District 3220 & The Sri Lankan Network",
        subtitle: "One of the Most Vibrant Rotaract Districts in the World",
        readTime: "3 min",
        xpReward: 50,
        storyIntro: {
          speaker: "Port Master Kael",
          speakerRole: "Harbor Navigator",
          dialogue: "Look out toward the harbor waters! Every club in our district is a ship in the same fleet. District 3220 is celebrated across the globe as one of the most passionate and award-winning Rotaract families on Earth.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "Port Master Kael",
            role: "Harbor Navigator",
            emotion: "happy",
            text: "Look out toward the harbor waters, Prospect! Every club in our district is a ship in the same fleet. District 3220 is celebrated across the globe as one of the most passionate Rotaract families on Earth.",
          },
          {
            speaker: "prospect",
            text: "What makes District 3220 such a recognized force in global Rotaract?",
            prospectChoices: [
              "How many clubs sail under District 3220?",
              "What regions are represented in our district?",
            ],
          },
          {
            speaker: "guide",
            emotion: "proud",
            text: "District 3220 unites Sri Lanka and the Maldives with over 90 active clubs—spanning leading universities and dynamic community-based clubs like RACSR!",
          },
          {
            speaker: "prospect",
            text: "So as an inducted Regent, I am automatically connected to thousands of young leaders nationwide?",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Exactly, Chief! From Colombo to Kandy, Jaffna to Avissawella, and across to Male, you gain an instant family of changemakers ready to collaborate on service and career growth!",
          },
        ],
        sections: [
          {
            title: "The Island Powerhouse: District 3220",
            content: [
              "Rotary International District 3220 encompasses the island nation of Sri Lanka and the Maldives.",
              "With over 90 active clubs representing universities, state colleges, vocational institutes, and community-based clubs, District 3220 is widely regarded as an international benchmark for Rotaract excellence.",
              "Our clubs frequently win top global awards at the annual Rotaract Preconvention and Interota conferences.",
            ],
            bulletPoints: [
              "Community-Based Clubs (like RACSR): Uniting working professionals and community youth across a geographic town or region.",
              "Institution-Based Clubs: Based in universities and colleges (e.g. University of Colombo, University of Moratuwa, SLIIT).",
              "District Assemblies & Conferences: Annual gatherings where thousands of Rotaractors unite to celebrate achievements, receive citations, and elect the incoming DRR.",
            ],
            keyTakeaway: "When you join RACSR, you instantly gain a nationwide network of thousands of like-minded young leaders across Sri Lanka.",
          },
        ],
        companionAdvice: {
          nova: "District assemblies and conferences are legendary! Make sure to attend the District Conference to meet friends from across the island.",
          raya: "Being a community-based club gives RACSR immense agility! We can impact our home valley of Seethawaka directly every single week.",
          kai: "District recognition and awards validate our project discipline. Aim high with every project plan you draft.",
        },
        knowledgeCheck: {
          question: "What territory does Rotary International District 3220 cover?",
          options: [
            {
              id: "opt-1",
              text: "Sri Lanka & the Maldives",
              explanation: "Correct! District 3220 unites all Rotary and Rotaract clubs in Sri Lanka and the Republic of Maldives.",
            },
            {
              id: "opt-2",
              text: "India & Bangladesh only",
              explanation: "Incorrect. India and Bangladesh have their own distinct Rotary districts (e.g. 3190, 3281).",
            },
            {
              id: "opt-3",
              text: "The city of Chicago alone",
              explanation: "Incorrect. Chicago is District 6450, where Rotary was founded.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Think about Sri Lanka and its neighboring island nation!",
          successMessage: "Brilliant! You know your home district inside and out.",
        },
      },
    ],
  },

  "loc-regent-keep": {
    id: "loc-regent-keep",
    chapterNumber: 3,
    chapterLabel: "CHAPTER 3",
    chapterTitle: "The Regent Odyssey",
    worldName: "Regent Keep",
    regionTitle: "Historic Mountain Bastion",
    seethawakaInspiration: "Inspired by King Rajasinghe I fortress ruins and heritage stonework",
    summary: "Uncover the charter story of RACSR, our proud Seethawaka heritage, our distinct culture and traditions, and our signature club projects like Ran Hewisi, Momentum, and Clean Sri Lanka.",
    badgeReward: "REGENT PIONEER",
    xpReward: 200,
    lessons: [
      {
        id: "lesson-3-1",
        chapterId: "loc-regent-keep",
        lessonNumber: 1,
        title: "Our Charter Story & Self-Sponsored Legacy",
        subtitle: "The Birth of an Independent, Self-Sponsored Youth Powerhouse",
        readTime: "3 min",
        xpReward: 50,
        storyIntro: {
          speaker: "The Keeper",
          speakerRole: "Guardian of Regent Lore",
          dialogue: "You have arrived at the high ramparts of Regent Keep! The banners of Maroon and Gold snap in the mountain wind. Here, the dream of an independent, self-sponsored community club for the youth of the Seethawaka valley became reality.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            emotion: "proud",
            text: "Welcome to Regent Keep, traveler! Look upon the high stone parapets. Unlike many traditional clubs, RACSR was forged with a unique destiny.",
          },
          {
            speaker: "prospect",
            text: "What makes RACSR's charter unique in District 3220?",
          },
          {
            speaker: "guide",
            emotion: "happy",
            text: "We are an independent, self-sponsored Rotaract club! We are not sponsored by any Rotary club. Under the modern 2019 elevation of Rotaract, our founding leaders chartered RACSR directly to take 100% ownership of our own governance, funding, and community impact.",
          },
          {
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            emotion: "thinking",
            text: "Led by Charter President Rtr. Lehan Abeysuriya and our founding board, we proved that youth in Avissawella and the Seethawaka valley could run an elite, autonomous humanitarian powerhouse.",
          },
          {
            speaker: "prospect",
            text: "That means our decisions, initiatives, and leadership are completely driven by youth!",
            prospectChoices: [
              "How does self-sponsorship empower our members?",
              "Tell me more about our Seethawaka valley heritage!",
            ],
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Precisely! Every rupee we raise, every twin club agreement we sign, and every community project we launch comes directly from our members' passion and drive.",
          },
        ],
        sections: [
          {
            title: "Why Seethawaka Regent Was Founded",
            content: [
              "For years, passionate young people living in Avissawella, Hanwella, Puwakpitiya, and surrounding towns traveled long distances to Colombo to participate in Rotaract activities.",
              "A visionary group of founding leaders recognized the urgent need for a high-caliber, locally grounded community club based right here in the Seethawaka region.",
              "Taking full advantage of Rotary International's 2019 elevation of Rotaract, the club was officially chartered under District 3220 as a proud, self-sponsored Rotaract club, led by Charter President Rtr. Lehan Abeysuriya and a dedicated charter board of officials.",
            ],
            keyTakeaway: "RACSR is self-sponsored and self-governed. We are not sponsored by any Rotary club—our youth leaders chart our course and take full ownership of our destiny.",
          },
          {
            title: "The Self-Sponsored Advantage",
            content: [
              "Being a self-sponsored, community-based club gives RACSR unmatched agility and creative freedom.",
              "We mobilize our own corporate sponsorships, partner directly with community institutions across Avissawella, and cultivate a culture of true entrepreneurial responsibility among our members.",
            ],
            bulletPoints: [
              "Club Identity: Rotaract Club of Seethawaka Regent (RACSR)",
              "Sponsorship Status: Independent Self-Sponsored Club (No Sponsor Rotary Club)",
              "Governing District: Rotary International District 3220",
              "Charter President: Rtr. Lehan Abeysuriya",
            ],
          },
        ],
        companionAdvice: {
          nova: "Remember that RACSR is a self-sponsored club! That is a proud badge of honor showing our members manage our own governance and vision with absolute professionalism.",
          raya: "We are pioneers! Because we are self-sponsored, every exciting project idea you bring can become reality without red tape!",
          kai: "Self-sponsorship demands higher financial discipline and strategic planning. That is why RACSR members develop unmatched leadership skills.",
        },
        knowledgeCheck: {
          question: "What is the official sponsorship and charter model of the Rotaract Club of Seethawaka Regent (RACSR)?",
          options: [
            {
              id: "opt-1",
              text: "An independent, self-sponsored community-based Rotaract club chartered under RI District 3220",
              explanation: "Correct! RACSR is proud to be a self-sponsored club with no sponsor Rotary club, led autonomously by youth leaders under District 3220.",
            },
            {
              id: "opt-2",
              text: "Sponsored and operated directly by a foreign Rotary Club in London",
              explanation: "Incorrect. RACSR is a self-sponsored club right here in the Seethawaka corridor.",
            },
            {
              id: "opt-3",
              text: "A school Interact club governed by teachers",
              explanation: "Incorrect. RACSR is an autonomous community-based Rotaract club for young adults.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Remember: We are self-governed and self-sponsored!",
          successMessage: "Splendid! You understand RACSR's proud self-sponsored identity.",
        },
      },
      {
        id: "lesson-3-2",
        chapterId: "loc-regent-keep",
        lessonNumber: 2,
        title: "RACSR Board of Officials (2026-27)",
        subtitle: "The Guardians of Regent: Leadership Hierarchy & Board Structure",
        readTime: "4 min",
        xpReward: 50,
        storyIntro: {
          speaker: "The Keeper",
          speakerRole: "Guardian of Regent Lore",
          dialogue: "Step into the Council Chamber of Regent Keep. The elected Board of Officials steers our club through every expedition, assembly, and service mission. Meet the leaders of the 2026-27 Rotary Year.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            emotion: "idle",
            text: "Every great movement needs disciplined captains. Here sits the 2026-27 Board of Officials of the Rotaract Club of Seethawaka Regent.",
          },
          {
            speaker: "prospect",
            text: "Who leads our club as President this year?",
          },
          {
            speaker: "guide",
            emotion: "happy",
            text: "Our Charter President & President for 2026-27 is Rtr. Lehan Abeysuriya! Supported by Vice Presidents Rtr. Haymen Molligoda and Rtr. Rachel Anjala.",
          },
          {
            speaker: "prospect",
            text: "And who runs the day-to-day administration and avenues?",
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "Joint Secretaries Rtr. Piyangie Baduge and Rtr. Akithya Ranasinghe manage our records, Treasurer Rtr. Thisuri Himasha guards the treasury, and dedicated Directors lead our 7 avenues of service!",
          },
          {
            speaker: "prospect",
            text: "It's inspiring to see such a complete team. Can a new prospect reach out to them directly?",
            prospectChoices: [
              "Are the Directors open to new project ideas from prospects?",
              "How can I assist an avenue director as a team member?",
            ],
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Yes! Every single Director loves when prospects step up. You can join project sub-committees right away!",
          },
        ],
        sections: [
          {
            title: "The 2026-27 Board of Officials Roster",
            content: [
              "Inside our home realm, the Rotaract Club of Seethawaka Regent is guided by an elected Board of Officials representing passionate youth leaders across Seethawaka:",
            ],
            bulletPoints: [
              "Charter President & President (2026-27): Rtr. Lehan Abeysuriya",
              "Vice Presidents: Rtr. Haymen Molligoda, Rtr. Rachel Anjala",
              "Joint Secretaries: Rtr. Piyangie Baduge, Rtr. Akithya Ranasinghe",
              "Treasurer: Rtr. Thisuri Himasha | Assistant Treasurer: Rtr. Gayani Jayalath",
              "Sergeant-at-Arms: Rtr. Sasiru Gunathilake",
              "Joint Editors: Rtr. Umair Muzammill, Rtr. Nadun Sandeepa",
              "Community Service Directors: Rtr. Saumya Weerasinghe, Rtr. Dilreen Monisha",
              "Club Service Directors: Rtr. Dinetha Sahan, Rtr. Dushyanthi Malsha",
              "International Services Directors: Rtr. Risini De Mel, Rtr. Gemini De Silva",
              "Professional Development Directors: Rtr. Jalitha Kuruppu, Rtr. Imasha Perera",
              "Public Relations Directors: Rtr. Venuri Rupasinghe, Rtr. Akila Ranasinghe",
              "Sports & Recreation Director: Rtr. Vidath Ranasinghe",
              "Finance Directors: Rtr. Inuka Sandanu, Rtr. Thumara Hasandi",
            ],
            keyTakeaway: "Knowing your leaders allows you to reach out to the right Director whenever you want to pitch an initiative, volunteer for an avenue, or attend a meeting!",
          },
        ],
        companionAdvice: {
          nova: "Keep this roster in mind! If you love community projects, reach out to Rtr. Saumya and Rtr. Dilreen; for PR and graphic design, connect with Rtr. Venuri and Rtr. Akila!",
          raya: "President Rtr. Lehan and the Vice Presidents are super welcoming. Say hello at your first meeting!",
          kai: "Observing how our Board delegates responsibility and manages meetings will teach you more about corporate governance than any textbook.",
        },
        knowledgeCheck: {
          question: "Who is the Charter President & President of the Rotaract Club of Seethawaka Regent for the 2026-27 Rotary Year?",
          options: [
            {
              id: "opt-1",
              text: "Rtr. Lehan Abeysuriya",
              explanation: "Correct! Rtr. Lehan Abeysuriya is the Charter President & President of RACSR for 2026-27.",
            },
            {
              id: "opt-2",
              text: "Paul Harris",
              explanation: "Incorrect. Paul Harris was the founder of Rotary in Chicago in 1905.",
            },
            {
              id: "opt-3",
              text: "Rtr. Sasiru Gunathilake",
              explanation: "Incorrect. Rtr. Sasiru Gunathilake serves as the Sergeant-at-Arms of RACSR.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "He founded the club and leads as Charter President & President!",
          successMessage: "Outstanding! You know our club leadership.",
        },
      },
      {
        id: "lesson-3-3",
        chapterId: "loc-regent-keep",
        lessonNumber: 3,
        title: "Regent Culture, Identity & Club Creed",
        subtitle: "Heritage, Brotherhood, and High Standards",
        readTime: "3 min",
        xpReward: 50,
        storyIntro: {
          speaker: "The Keeper",
          speakerRole: "Guardian of Regent Lore",
          dialogue: "A club without a distinct culture is just another meeting on a calendar. Regent culture is warm, demanding of excellence, fiercely loyal to one another, and rooted in our heritage.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            emotion: "proud",
            text: "Behold the colors of Regent: Maroon and Gold! Do you know what these colors mean in our club?",
          },
          {
            speaker: "prospect",
            text: "I see Maroon in our banners and Gold on our pins. What do they symbolize?",
          },
          {
            speaker: "guide",
            emotion: "happy",
            text: "Regent Maroon represents courage, passion, and the historic valor of the Seethawaka Kingdom! Imperial Gold signifies excellence, warmth, and enduring impact.",
          },
          {
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            emotion: "thinking",
            text: "And our motto binds them together: 'Driven by Purpose. Defined by Impact.' In RACSR, meetings start strictly on the dot, but once the gavel strikes adjourn, we celebrate as family.",
          },
          {
            speaker: "prospect",
            text: "Balancing professional excellence with genuine brotherly and sisterly fellowship—that sounds like the ideal culture!",
            prospectChoices: [
              "What is the famous Regent Fellowship Circle?",
              "Why is punctuality so important to us?",
            ],
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "The Fellowship Circle happens after every assembly—we sit together, share stories, enjoy snacks, and form friendships that last a lifetime!",
          },
        ],
        sections: [
          {
            title: "The Pillars of Regent Culture",
            content: [
              "In RACSR, we balance two essential forces: warm, brotherly fellowship and strict professional excellence.",
              "When we assemble, we embrace each other as family; when we execute projects, we operate with the precision and discipline of top corporate leaders.",
            ],
            bulletPoints: [
              "Official Motto: 'Driven by Purpose. Defined by Impact.'",
              "Regent Colors: Maroon (Passion & Courage) and Imperial Gold (Excellence & Fellowship)",
              "Uncompromising Punctuality: Regent meetings start on the dot. Respecting people's time is our first sign of leadership.",
              "The Fellowship Circle: After every formal meeting concludes, members stay back for open conversations, laughter, and bonding.",
              "Empowering Every Voice: Even the newest prospect explorer is encouraged to share ideas and take ownership of project tasks.",
            ],
          },
        ],
        companionAdvice: {
          nova: "Notice how meetings are run: we adhere strictly to parliamentary procedure to keep order, but our fellowship is full of warmth.",
          raya: "Never hesitate to speak up during brainstorming! Some of our greatest signature projects started as wild ideas from new prospects.",
          kai: "Punctuality and reliability are how reputations are forged in this club. Be the person who always delivers on time.",
        },
        knowledgeCheck: {
          question: "How does RACSR approach meetings and project execution?",
          options: [
            {
              id: "opt-1",
              text: "By balancing brotherly fellowship with professional discipline, punctuality, and high standards",
              explanation: "Correct! Regent culture is defined by deep personal fellowship matched with professional execution and punctuality.",
            },
            {
              id: "opt-2",
              text: "By canceling meetings whenever people are tired and avoiding all structure",
              explanation: "Incorrect. Regular meetings and disciplined structure are essential to our impact.",
            },
            {
              id: "opt-3",
              text: "By only allowing the president to speak while everyone else remains silent",
              explanation: "Incorrect. Every member and prospect is encouraged to participate actively.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Think about how we combine family warmth with professional excellence!",
          successMessage: "Bravo! You embody the true spirit of Regent culture.",
        },
      },
      {
        id: "lesson-3-4",
        chapterId: "loc-regent-keep",
        lessonNumber: 4,
        title: "Signature Club Flagships",
        subtitle: "Ran Hewisi, Momentum, and Clean Sri Lanka",
        readTime: "3 min",
        xpReward: 50,
        storyIntro: {
          speaker: "The Keeper",
          speakerRole: "Guardian of Regent Lore",
          dialogue: "Look upon the battle banners in the hall of champions. Each represents a signature project that has made waves across our community and the district. Here are the flagships of RACSR.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "The Keeper",
            role: "Guardian of Regent Lore",
            emotion: "proud",
            text: "These three banners in the Hall of Champions represent our signature flagships. Every Regent knows them by heart!",
          },
          {
            speaker: "prospect",
            text: "What are our three premier flagships?",
          },
          {
            speaker: "guide",
            emotion: "happy",
            text: "First is 'Clean Sri Lanka'—our community & environmental conservation flagship protecting the rivers and greenery of Seethawaka!",
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "Second is 'Momentum'—our premier professional development symposium with corporate HR leaders, CV critiques, and mock interviews!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "And third is 'Ran Hewisi'—our cultural & club service celebration honoring traditional drums, folk arts, and historic fellowship!",
          },
          {
            speaker: "prospect",
            text: "As a prospect explorer, can I join the organizing committees for these projects?",
            prospectChoices: [
              "Which avenue leads project Momentum?",
              "How soon can I participate in Clean Sri Lanka?",
            ],
          },
          {
            speaker: "guide",
            emotion: "happy",
            text: "Immediately! Volunteering on a flagship project is the fastest way to get noticed, make friends, and earn your Regent Pin!",
          },
        ],
        sections: [
          {
            title: "1. Clean Sri Lanka (Community & Environment)",
            content: [
              "Clean Sri Lanka is RACSR's flagship environmental initiative dedicated to preserving the pristine riverbanks, water springs, and forest trails of Seethawaka.",
              "Through community cleanups, tree-planting drives, and waste-segregation workshops for schools, Clean Sri Lanka translates environmental awareness into boots-on-the-ground conservation.",
            ],
          },
          {
            title: "2. Momentum (Professional Development)",
            content: [
              "Momentum is our premier corporate preparedness symposium. It brings top industry leaders, HR directors, and entrepreneurs to mentor undergraduates and school leavers.",
              "Features include 1-on-1 resume critiques, mock job interviews, LinkedIn optimization, and public speaking bootcamps.",
            ],
          },
          {
            title: "3. Ran Hewisi (Club Service & Cultural Heritage)",
            content: [
              "Ran Hewisi celebrates the vibrant heritage and traditional percussion arts of ancient Seethawaka.",
              "It blends cultural reverence with club fellowship—bringing members together for unforgettable nights of music, traditional drums, storytelling, and celebration of our roots.",
            ],
            keyTakeaway: "As a prospect, participating in these signature projects is your fast track to making friends and demonstrating your leadership potential.",
          },
        ],
        companionAdvice: {
          nova: "Take note of which avenue manages which signature project: Clean Sri Lanka is Community Service, Momentum is Professional Development, and Ran Hewisi is Club Service!",
          raya: "Clean Sri Lanka is so rewarding—getting your boots muddy while cleaning up a riverbank builds real team bonding!",
          kai: "Momentum is a project you should definitely attend for your own career growth, even as you help organize it.",
        },
        knowledgeCheck: {
          question: "Which signature RACSR project focuses on career guidance, resume critiques, and corporate mentorship for young leaders?",
          options: [
            {
              id: "opt-1",
              text: "Momentum",
              explanation: "Correct! Momentum is our flagship Professional Development symposium.",
            },
            {
              id: "opt-2",
              text: "Clean Sri Lanka",
              explanation: "Incorrect. Clean Sri Lanka is our environmental and Community Service flagship project.",
            },
            {
              id: "opt-3",
              text: "Ran Hewisi",
              explanation: "Incorrect. Ran Hewisi is our cultural and Club Service celebration.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Think about professional velocity and career growth!",
          successMessage: "Masterfully answered! You know RACSR's signature flagships.",
        },
      },
    ],
  },

  "loc-seven-realms": {
    id: "loc-seven-realms",
    chapterNumber: 4,
    chapterLabel: "CHAPTER 4",
    chapterTitle: "The Seven Realms of Service",
    worldName: "The Seven Realms",
    regionTitle: "Avenue Overworld Biomes",
    seethawakaInspiration: "Inspired by the dynamic service landscape of Seethawaka Regent",
    summary: "Explore in-depth descriptions for all 7 avenues of service. Learn how Far Harbor champions International Service, Twin Club Agreements, and global fellowship, and test your ability to match real projects to their rightful avenues.",
    badgeReward: "AVENUE MASTER",
    xpReward: 350,
    lessons: [
      {
        id: "lesson-4-1",
        chapterId: "loc-seven-realms",
        lessonNumber: 1,
        title: "Heartland — Community Service",
        subtitle: "Uplifting Lives and Protecting Nature Across Seethawaka",
        readTime: "3 min",
        xpReward: 50,
        storyIntro: {
          speaker: "Avenue Guide",
          speakerRole: "Realm Navigator",
          dialogue: "Welcome to Heartland, where flowering meadows meet village water springs. Community Service is the beating heart of Rotaract—where our motto 'Service Above Self' transforms real lives.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Realm Navigator",
            emotion: "happy",
            text: "Welcome to Heartland, Prospect! Community Service is the beating heart of Rotaract—where our motto 'Service Above Self' transforms real lives.",
          },
          {
            speaker: "prospect",
            text: "How does Heartland carry out service across the Seethawaka region?",
            prospectChoices: [
              "What community projects do we lead in Seethawaka?",
              "How do we know what a village truly needs?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "We lead rural healthcare clinics, clean water installations, Clean Sri Lanka river cleanups, and library donations! But always preceded by a Community Needs Assessment.",
          },
          {
            speaker: "prospect",
            text: "Listening to the community before building solutions ensures lasting impact!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Exactly, Chief! When we listen first, we don't just give charity—we empower communities to thrive sustainably!",
          },
        ],
        sections: [
          {
            title: "What is Community Service?",
            content: [
              "Community Service identifies genuine needs in our society and devises sustainable, long-term solutions rather than temporary band-aids.",
              "In RACSR, our Community Service avenue works hand-in-hand with local schools, village elders, and healthcare clinics across the Seethawaka region.",
            ],
            bulletPoints: [
              "Health & Wellness: Organizing blood donation drives, eye clinics, dental camps, and mental health awareness seminars.",
              "Basic Education & Literacy: Donating books, school supplies, and renovating rural libraries in underserved schools.",
              "Environmental Conservation (Clean Sri Lanka): Reforestation, riverbank cleanups along the Kelani and Seethawaka rivers, and plastic recycling drives.",
              "Village Upliftment: Installing clean water filter systems, renovating community halls, and disaster relief aid during monsoon floods.",
            ],
            keyTakeaway: "A great community project starts with a Community Needs Assessment—listening to the beneficiaries before deciding on solutions.",
          },
        ],
        companionAdvice: {
          nova: "Always conduct a proper Community Needs Assessment first! Never assume you know what a community needs without asking them.",
          raya: "Heartland is where you make the deepest human connections. Seeing a child smile with new schoolbooks is unforgettable.",
          kai: "Partnering with corporate sponsors and local community partners can double or triple the budget of your community initiatives.",
        },
        knowledgeCheck: {
          question: "PROJECT MATCHING CHALLENGE: RACSR organizes a free medical check-up clinic and distributes water purification kits to rural families in Avissawella. Which Avenue does this project belong to?",
          options: [
            {
              id: "opt-1",
              text: "Community Service (Heartland)",
              explanation: "Correct! Healthcare clinics, clean water projects, and village aid belong directly to Community Service.",
            },
            {
              id: "opt-2",
              text: "International Service (Far Harbor)",
              explanation: "Incorrect. This project serves the local community in Avissawella, not cross-border international relations.",
            },
            {
              id: "opt-3",
              text: "Sports & Recreation (Grand Arena)",
              explanation: "Incorrect. While health is involved, clinical aid and relief belong to Community Service.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "It directly serves the local village and health needs of the community.",
          successMessage: "Correct! You correctly identified the Community Service avenue.",
        },
      },
      {
        id: "lesson-4-2",
        chapterId: "loc-seven-realms",
        lessonNumber: 2,
        title: "The Hearth — Club Service",
        subtitle: "The Administrative Backbone, Brotherhood & Fellowship",
        readTime: "3 min",
        xpReward: 50,
        storyIntro: {
          speaker: "Avenue Guide",
          speakerRole: "Realm Navigator",
          dialogue: "Step inside The Hearth! A warm fire glows in the center of the hall, surrounded by round tables. Club Service is the engine that keeps our membership energized, united, and functioning smoothly.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Realm Navigator",
            emotion: "happy",
            text: "Step inside The Hearth! A warm fire glows in the center of the hall. Club Service is the engine that keeps our membership bonded, united, and energized!",
          },
          {
            speaker: "prospect",
            text: "What makes Club Service the administrative backbone of our fellowship?",
            prospectChoices: [
              "How do we celebrate Regent fellowship?",
              "What events keep the club united?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "Club Service organizes our monthly General Assemblies, outdoor camping trips, the Buddy System for prospects, and the formal annual Installation Ceremony!",
          },
          {
            speaker: "prospect",
            text: "So it builds the brotherly and sisterly bonds that make service fun!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Bingo, Chief! You join for the service, but you stay for the lifelong friends made around The Hearth.",
          },
        ],
        sections: [
          {
            title: "What is Club Service?",
            content: [
              "Without a strong, happy, and bonded club, no external service project can succeed. Club Service is responsible for internal administration, member engagement, retention, and fellowship.",
            ],
            bulletPoints: [
              "General Assemblies: Organizing structured, engaging monthly and bi-weekly club meetings adhering to parliamentary protocol.",
              "Fellowship & Bonding: Arranging club trips, camping retreats, game nights, birthday celebrations, and movie marathons.",
              "Member Development & Mentorship: Pairing new prospect explorers with experienced members through our 'Buddy System'.",
              "Charter & Installation Ceremonies: Planning the grand annual Installation Ceremony where new boards are inducted in formal attire.",
              "Cultural Celebrations (Ran Hewisi): Honoring traditional heritage and national holidays through music and shared meals.",
            ],
            keyTakeaway: "Club Service builds the fellowship that makes volunteering fun, warm, and lifelong.",
          },
        ],
        companionAdvice: {
          nova: "Parliamentary procedure keeps our meetings orderly, but Club Service makes sure everyone leaves with a smile and a warm heart.",
          raya: "Fellowship camps are the absolute best! You go in as strangers and come out as brothers and sisters.",
          kai: "Tracking attendance, meeting minutes, and member satisfaction gives the board data to improve every single assembly.",
        },
        knowledgeCheck: {
          question: "PROJECT MATCHING CHALLENGE: RACSR hosts a 2-day outdoor adventure camp in the Seethawaka hills for members to play team-building games, bond around a campfire, and welcome new prospects. Which Avenue leads this project?",
          options: [
            {
              id: "opt-1",
              text: "Club Service (The Hearth)",
              explanation: "Correct! Member bonding, team retreats, and fellowship camps are the signature territory of Club Service.",
            },
            {
              id: "opt-2",
              text: "Public Relations (Signal Spire)",
              explanation: "Incorrect. While PR may take photos, the organization and purpose of member bonding belongs to Club Service.",
            },
            {
              id: "opt-3",
              text: "Finance (Treasury Quarter)",
              explanation: "Incorrect. Finance manages the budget, but does not own member fellowship and retention.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Think about internal member bonding, fellowship, and club spirit!",
          successMessage: "Spot on! That is the true purpose of Club Service.",
        },
      },
      {
        id: "lesson-4-3",
        chapterId: "loc-seven-realms",
        lessonNumber: 3,
        title: "The Forge — Professional Development",
        subtitle: "Sharpening Skills, Career Acumen & Future Leaders",
        readTime: "3 min",
        xpReward: 50,
        storyIntro: {
          speaker: "Avenue Guide",
          speakerRole: "Realm Navigator",
          dialogue: "Hear the strike of the hammer on the anvil! In The Forge, raw talent is tempered into industry-ready leadership. Professional Development ensures our members excel in their careers and universities.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Realm Navigator",
            emotion: "proud",
            text: "Hear the strike of the hammer on the anvil! In The Forge, raw talent is tempered into industry-ready leadership through Professional Development.",
          },
          {
            speaker: "prospect",
            text: "How does The Forge prepare young members for corporate and startup success?",
            prospectChoices: [
              "What skills can I forge in this avenue?",
              "Tell me about corporate workshops and mock interviews!",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "Through flagship programs like 'Momentum'—hosting senior HR directors for CV critiques, mock interviews, public speaking bootcamps, and project management training!",
          },
          {
            speaker: "prospect",
            text: "Leading a Rotaract project committee sounds like real executive training!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "It is, Chief! Employers recognize that chairing a major Rotaract project proves you can manage budgets, teams, and real deadlines!",
          },
        ],
        sections: [
          {
            title: "What is Professional Development (PD)?",
            content: [
              "Rotaract bridges the gap between classroom theory and real-world executive skills. The PD avenue creates opportunities for members to gain competitive workplace advantages.",
            ],
            bulletPoints: [
              "Career Workshops (Momentum): Resume and CV writing clinics, mock corporate interviews with senior HR directors, and LinkedIn profile optimization.",
              "Public Speaking & Debate: Moderated panel discussions, impromptu speaking drills, and presentation skills workshops.",
              "Leadership Masterclasses: Seminars on emotional intelligence, project management tools (Notion, Trello, Agile), and financial literacy.",
              "Industry Visits & Networking: Visiting corporate headquarters, factories, and technology parks to interact with senior executives.",
            ],
            keyTakeaway: "Serving as a project chairperson in Rotaract gives you leadership experience that rivals corporate management training.",
          },
        ],
        companionAdvice: {
          nova: "Take notes during PD workshops! Building a stellar CV and practicing public speaking will give you an edge in every job interview.",
          raya: "Chairing a PD project teaches you how to negotiate with corporate guest speakers and sponsors. It's real-world training!",
          kai: "Make sure you update your LinkedIn with your Rotaract project leadership roles. Recruiters actively look for community leadership.",
        },
        knowledgeCheck: {
          question: "PROJECT MATCHING CHALLENGE: RACSR organizes a corporate workshop featuring guest HR directors who conduct mock interviews, CV reviews, and LinkedIn training for undergraduates. Which Avenue leads this project?",
          options: [
            {
              id: "opt-1",
              text: "Professional Development (The Forge)",
              explanation: "Correct! Career skill workshops, CV clinics, and mock interviews belong to Professional Development.",
            },
            {
              id: "opt-2",
              text: "Community Service (Heartland)",
              explanation: "Incorrect. Community Service focuses on village and public welfare, not career and corporate skill development.",
            },
            {
              id: "opt-3",
              text: "International Service (Far Harbor)",
              explanation: "Incorrect. Unless it's a cross-border international exchange, career training belongs to Professional Development.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Think about career growth, job interviews, and professional skills!",
          successMessage: "Brilliant! You identified the Professional Development avenue.",
        },
      },
      {
        id: "lesson-4-4",
        chapterId: "loc-seven-realms",
        lessonNumber: 4,
        title: "Far Harbor — International Service & Global Fellowship",
        subtitle: "Twin Clubs, Cross-Border Impact & World Understanding",
        readTime: "4 min",
        xpReward: 50,
        storyIntro: {
          speaker: "Avenue Guide",
          speakerRole: "Realm Navigator",
          dialogue: "Look out across Far Harbor! Here, ships fly flags from across the globe. International Service connects Seethawaka Regent with clubs worldwide—proving that Rotary fellowship knows no borders.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Realm Navigator",
            emotion: "happy",
            text: "Look out across Far Harbor! Here, ships fly flags from across the globe. International Service connects Seethawaka Regent with clubs worldwide!",
          },
          {
            speaker: "prospect",
            text: "How does our local club build relationships across oceans?",
            prospectChoices: [
              "What is a Twin Club Agreement?",
              "How do we collaborate with international clubs?",
            ],
          },
          {
            speaker: "guide",
            emotion: "proud",
            text: "We sign formal Letters of Intent (LOI) and Twin Club Agreements (TCA) with clubs in India, Nepal, Australia, and beyond—co-hosting cultural webinars and global peace drives!",
          },
          {
            speaker: "prospect",
            text: "So a member in Avissawella can forge real friendships with peers across the globe!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Precisely, Chief! Rotary is an international family. With Far Harbor, the whole globe becomes your neighborhood!",
          },
        ],
        sections: [
          {
            title: "What is International Service?",
            content: [
              "Rotary is a worldwide fellowship dedicated to world peace, cultural understanding, and global cooperation. The International Service avenue connects RACSR with sister clubs abroad to carry out cross-border initiatives.",
            ],
            bulletPoints: [
              "Twin Club Agreements (Sister Clubs): Formal partnerships established between RACSR and an overseas Rotaract club (e.g. in India, Nepal, Australia, UK, Philippines).",
              "Letters of Intent (LOI): The formal bilateral document signed by both club presidents outlining joint commitments, shared projects, and friendship.",
              "Cross-Border Joint Projects: Executing joint environmental webinars, global peace campaigns, or cultural exchange sessions where members learn about other countries' traditions.",
              "Hosting International Guests: Welcoming traveling Rotaractors visiting Sri Lanka and arranging local tours across Seethawaka.",
              "World Rotaract Week Celebrations: Collaborating with international clubs every March to celebrate our global movement.",
            ],
            keyTakeaway: "Through Twin Club agreements and international fellowship, a member in Avissawella can forge real friendships with young leaders across 5 continents.",
          },
        ],
        companionAdvice: {
          nova: "Signing a Twin Club Agreement requires mutual respect and clear communication. It is a promise of ongoing international friendship.",
          raya: "Joining an international Zoom call with our twin club in India or Malaysia is so exciting! You get to see how clubs operate across the globe.",
          kai: "When drafting an LOI (Letter of Intent), ensure both clubs agree on at least one actionable joint project during the year.",
        },
        knowledgeCheck: {
          question: "PROJECT MATCHING CHALLENGE: RACSR signs a formal Letter of Intent with the Rotaract Club of Bangalore Junction (India) to establish a Twin Club partnership and host a cross-border cultural exchange webinar. Which Avenue leads this project?",
          options: [
            {
              id: "opt-1",
              text: "International Service (Far Harbor)",
              explanation: "Correct! Twin Club agreements, Letters of Intent (LOI), and cross-border partnerships belong exclusively to International Service.",
            },
            {
              id: "opt-2",
              text: "Club Service (The Hearth)",
              explanation: "Incorrect. Club Service manages internal domestic club bonding, while cross-border international partnerships belong to International Service.",
            },
            {
              id: "opt-3",
              text: "Finance (Treasury Quarter)",
              explanation: "Incorrect. Finance manages accounting, not international diplomatic club ties.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "It involves a sister club in India, an LOI, and cross-border fellowship!",
          successMessage: "Spectacular! You understand Far Harbor and International Service.",
        },
      },
      {
        id: "lesson-4-5",
        chapterId: "loc-seven-realms",
        lessonNumber: 5,
        title: "Signal Spire — Public Relations (PR)",
        subtitle: "Digital Storytelling, Social Branding & Media Outreach",
        readTime: "3 min",
        xpReward: 50,
        storyIntro: {
          speaker: "Avenue Guide",
          speakerRole: "Realm Navigator",
          dialogue: "High atop the crystal tower of Signal Spire, luminous signals beam across the horizon. Public Relations ensures that the great work our club accomplishes is broadcast far and wide to inspire the world.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Realm Navigator",
            emotion: "happy",
            text: "High atop the crystal tower of Signal Spire, luminous beacons broadcast our impact far and wide. Welcome to Public Relations!",
          },
          {
            speaker: "prospect",
            text: "What is the true power of Public Relations in Rotaract?",
            prospectChoices: [
              "Is PR just about social media posts?",
              "How does PR protect our brand and inspire the public?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "It's about storytelling, Chief! Creating viral reels, adhering to official Rotary visual guidelines, writing newspaper press releases, and inspiring people to support our humanitarian missions!",
          },
          {
            speaker: "prospect",
            text: "Sharing our impact transparently builds credibility and attracts new changemakers!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "You said it! A vibrant Signal Spire ensures the voice of Seethawaka Regent resonates across Sri Lanka!",
          },
        ],
        sections: [
          {
            title: "What is Public Relations (PR)?",
            content: [
              "Doing good in the world is only half the journey—the other half is inspiring others to join that good. Public Relations is the voice, the visual identity, and the media shield of RACSR.",
            ],
            bulletPoints: [
              "Social Media Management: Crafting eye-catching Instagram reels, Facebook posts, TikTok videos, and LinkedIn updates that amplify club projects.",
              "Visual Identity & Branding: Upholding Rotary International's official Voice & Visual Identity guidelines (correct logos, colors, typography, and badges).",
              "Press & Media Releases: Writing articles for national newspapers, online magazines, and district bulletins to showcase club achievements.",
              "Photography & Videography: Capturing high-resolution photos and documentary footage at every assembly and community camp.",
              "Official Newsletters / Club Bulletins: Publishing quarterly or monthly editorial magazines chronicling club milestones.",
            ],
            keyTakeaway: "PR is not about boasting; it is about transparency, accountability to sponsors, and inspiring the public to support humanitarian causes.",
          },
        ],
        companionAdvice: {
          nova: "Always ensure the Rotary and Rotaract logos follow official Brand Center guidelines! Clear margins and proper color lockups protect our prestige.",
          raya: "Creative reels and dynamic photography make our projects pop! If you love editing videos or graphic design, PR is your playground.",
          kai: "PR drives prospective member recruitment. A clean, active social media feed brings dozens of new young leaders to our doorstep.",
        },
        knowledgeCheck: {
          question: "PROJECT MATCHING CHALLENGE: RACSR launches a social media awareness campaign on Instagram and TikTok with infographics, video reels, and press releases for national newspapers to highlight youth mental health. Which Avenue leads this project?",
          options: [
            {
              id: "opt-1",
              text: "Public Relations (Signal Spire)",
              explanation: "Correct! Social media campaigns, infographics, video reels, and press releases belong to Public Relations.",
            },
            {
              id: "opt-2",
              text: "Sports & Recreation (Grand Arena)",
              explanation: "Incorrect. Sports focuses on athletic events and fitness challenges, not digital media campaigns.",
            },
            {
              id: "opt-3",
              text: "Club Service (The Hearth)",
              explanation: "Incorrect. Club Service handles internal meetings, while PR handles external public communication and media.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Think about social media branding, reels, press releases, and media outreach!",
          successMessage: "Excellently deduced! You know the power of Signal Spire.",
        },
      },
      {
        id: "lesson-4-6",
        chapterId: "loc-seven-realms",
        lessonNumber: 6,
        title: "Grand Arena — Sports & Recreation",
        subtitle: "Wellness, Teamwork, and Athletic Camaraderie",
        readTime: "3 min",
        xpReward: 50,
        storyIntro: {
          speaker: "Avenue Guide",
          speakerRole: "Realm Navigator",
          dialogue: "Step into the open amphitheater of Grand Arena! Torches blaze and the cheers of the crowd ring out. Sports & Recreation builds healthy bodies, sharp minds, and unbreakable team camaraderie.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Realm Navigator",
            emotion: "celebrate",
            text: "Step into the open amphitheater of Grand Arena! Torches blaze and cheers echo. Sports & Recreation builds healthy bodies and unbreakable camaraderie!",
          },
          {
            speaker: "prospect",
            text: "How do athletic tournaments fit into our service mission?",
            prospectChoices: [
              "What tournaments do we organize in the Grand Arena?",
              "How does sportsmanship build leadership character?",
            ],
          },
          {
            speaker: "guide",
            emotion: "happy",
            text: "Six-a-side cricket fiestas, futsal championships, hiking expeditions through Puwarankanda, and e-sports tourneys! We practice the Four-Way Test on the playing field.",
          },
          {
            speaker: "prospect",
            text: "Winning with humility, losing with grace, and sweating together as teammates!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "That is true Regent sportsmanship, Chief! Healthy bodies foster resilient, energetic changemakers!",
          },
        ],
        sections: [
          {
            title: "What is Sports & Recreation?",
            content: [
              "Leadership requires physical endurance, mental resilience, and fair play. The Sports avenue harnesses the power of athletic competition and outdoor recreation to forge unity across the district.",
            ],
            bulletPoints: [
              "Tournaments: Organizing cricket fiestas, six-a-side futsal cups, badminton championships, and swimming galas.",
              "Adventure Expeditions: Hiking treks through Puwarankanda, waterfalls, and mountain trails across the scenic Seethawaka terrain.",
              "E-Sports & Gaming: Hosting FIFA, PUBG, and Valorant online gaming championships to engage tech-savvy youth.",
              "District Sports Meets: Training and representing RACSR at the annual District 3220 Rotaract Sports Festival.",
              "Wellness & Fitness: Yoga sessions, morning marathon runs, and healthy lifestyle awareness challenges.",
            ],
            keyTakeaway: "In sports, you learn how to win with humility, lose with grace, and never give up on your teammates.",
          },
        ],
        companionAdvice: {
          nova: "Sportsmanship is just the Four-Way Test applied to the playing field: Is it fair? Does it build goodwill?",
          raya: "Put on your running shoes! Playing cricket or hiking up a mist-covered peak together creates legendary stories.",
          kai: "Hosting a sports tournament is a great revenue generator. Pair up with Finance to bring in food stalls and corporate sponsors!",
        },
        knowledgeCheck: {
          question: "PROJECT MATCHING CHALLENGE: RACSR organizes an all-island Six-a-Side Cricket Fiesta with spectator stands and teams participating from 16 different clubs across Sri Lanka. Which Avenue leads this project?",
          options: [
            {
              id: "opt-1",
              text: "Sports & Recreation (Grand Arena)",
              explanation: "Correct! Organizing athletic tournaments like cricket, futsal, or badminton belongs to Sports & Recreation.",
            },
            {
              id: "opt-2",
              text: "Professional Development (The Forge)",
              explanation: "Incorrect. Professional Development focuses on career skills, resume reviews, and corporate mentorship.",
            },
            {
              id: "opt-3",
              text: "Community Service (Heartland)",
              explanation: "Incorrect. While proceeds might benefit charity, athletic sports meets are led by Sports & Recreation.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "It is a cricket tournament with athletic teams competing!",
          successMessage: "Home run! You mastered the Sports & Recreation avenue.",
        },
      },
      {
        id: "lesson-4-7",
        chapterId: "loc-seven-realms",
        lessonNumber: 7,
        title: "Treasury Quarter — Finance",
        subtitle: "The Strategic Financial Engine, Sponsorships & Budgeting",
        readTime: "3 min",
        xpReward: 50,
        storyIntro: {
          speaker: "Avenue Guide",
          speakerRole: "Realm Navigator",
          dialogue: "Enter the gilded arches of the Treasury Quarter! Ledger desks, gold scales, and sponsorship contracts line the hall. Without financial integrity and resource mobilization, no grand vision can leave the drawing board.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "Avenue Guide",
            role: "Realm Navigator",
            emotion: "proud",
            text: "Enter the gilded arches of Treasury Quarter! Ledger desks and sponsorship contracts line the hall. Welcome to the Finance Avenue!",
          },
          {
            speaker: "prospect",
            text: "Why is the Finance Avenue described as the strategic engine of the club?",
            prospectChoices: [
              "How do we raise funds for major service projects?",
              "Why is financial auditing so strictly maintained?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "Without funds and transparent ledgers, no grand vision can leave the drawing board. Finance leads corporate sponsorship pitches, car-wash fundraisers, and flawless accounting!",
          },
          {
            speaker: "prospect",
            text: "Flawless financial integrity is the cornerstone of public and sponsor trust!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Spot on, Chief! Every cent is accounted for with receipts. That financial credibility is why sponsors love partnering with RACSR!",
          },
        ],
        sections: [
          {
            title: "What is the Finance Avenue?",
            content: [
              "Every great community project, installation ceremony, and sports meet requires funds to operate. The Finance avenue ensures that the club remains solvent, well-funded, and transparently audited.",
            ],
            bulletPoints: [
              "Fundraising Projects: Organizing bake sales, car washes, musical galas, movie screenings, and merchandise sales to generate club revenue.",
              "Corporate Sponsorship Acquisition: Drafting professional sponsorship proposal decks, pitching to corporate banks and local businesses, and fulfilling sponsor deliverables.",
              "Budget Planning & Cost Control: Working with every project committee to create balanced budgets and avoid deficits.",
              "Financial Transparency & Auditing: Maintaining detailed ledgers of income and expenditure, collecting membership dues, and presenting audited financial statements at general assemblies.",
            ],
            keyTakeaway: "Financial credibility is the bedrock of public trust. When donors and sponsors see flawless accounting, they return year after year.",
          },
        ],
        companionAdvice: {
          nova: "Every cent must be accounted for with receipts! Transparent ledgers are how we uphold the Four-Way Test.",
          raya: "Fundraising projects like car washes and street food stalls are surprisingly fun when the whole club joins in with music!",
          kai: "Pitching to corporate sponsors is an incredible professional skill. Learning how to pitch for RACSR prepares you to pitch for your own startup.",
        },
        knowledgeCheck: {
          question: "PROJECT MATCHING CHALLENGE: RACSR designs custom club merchandise (hoodies and caps) and conducts a community car-wash fundraiser to raise funds for the club's annual project treasury. Which Avenue leads this project?",
          options: [
            {
              id: "opt-1",
              text: "Finance (Treasury Quarter)",
              explanation: "Correct! Fundraising campaigns, merchandise sales, and treasury generation are led by the Finance avenue.",
            },
            {
              id: "opt-2",
              text: "International Service (Far Harbor)",
              explanation: "Incorrect. Far Harbor handles foreign sister clubs, not domestic fundraising initiatives.",
            },
            {
              id: "opt-3",
              text: "Community Service (Heartland)",
              explanation: "Incorrect. The purpose here is raising club funds/treasury, which is the core domain of Finance.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "It is about fundraising, merchandise revenue, and the club treasury!",
          successMessage: "Golden precision! You have mastered all 7 avenues and their project matching.",
        },
      },
    ],
  },

  "loc-project-forge": {
    id: "loc-project-forge",
    chapterNumber: 5,
    chapterLabel: "CHAPTER 5",
    chapterTitle: "Project Forge",
    worldName: "Project Forge",
    regionTitle: "Watermill Workshop",
    seethawakaInspiration: "Inspired by traditional Seethawaka craft and industrial enterprise",
    summary: "Learn project crafting, lifecycle architecture, committee dynamics, and sustainable community execution in the watermill workshops of Project Forge.",
    badgeReward: "MASTER BUILDER",
    xpReward: 250,
    lessons: [
      {
        id: "lesson-5-1",
        chapterId: "loc-project-forge",
        lessonNumber: 1,
        title: "The Project Lifecycle & Blueprint",
        subtitle: "From Vision to Reality: The 4 Phases of Execution",
        readTime: "3 min",
        xpReward: 75,
        storyIntro: {
          speaker: "The Builder",
          speakerRole: "Master Project Crafter",
          dialogue: "Welcome to Project Forge! Sparks fly from the anvils and waterwheels power our planning desks. Every great initiative follows a disciplined lifecycle. Let me reveal the blueprint.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "The Builder",
            role: "Master Project Crafter",
            emotion: "proud",
            text: "Welcome to the Project Forge, Prospect! Passion is raw iron, but structured execution is the anvil that tempers it into real community transformation.",
          },
          {
            speaker: "prospect",
            text: "How does an idea turn into an official RACSR project, Master Builder?",
            prospectChoices: [
              "What are the 4 phases of the project lifecycle?",
              "Does every project need Board approval first?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "Phase 1: Conception & Needs Assessment. Phase 2: Project Proposal & Board Approval. Phase 3: Flawless Ground Execution. Phase 4: Financial Auditing & Reporting!",
          },
          {
            speaker: "prospect",
            text: "So no project launches until the Board reviews the proposal and approves the budget!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Exact precision, Chief! Board approval protects club credibility, ensures budget safety, and secures official district recognition!",
          },
        ],
        sections: [
          {
            title: "The 4 Phases of Project Management",
            content: [
              "A successful project is not an accident—it is the result of methodical planning, disciplined budgeting, and thorough post-project evaluation.",
            ],
            bulletPoints: [
              "Phase 1 - Conception: Identifying community needs, defining clear objectives, and appointing Project Chairpersons.",
              "Phase 2 - Proposal & Approval: Drafting a formal proposal with timelines, marketing strategy, and budget, submitted to the Board of Directors for approval.",
              "Phase 3 - Execution: Mobilizing teams, coordinating logistics, managing sponsors, and delivering impact on the ground.",
              "Phase 4 - Reporting & Audit: Settling financial accounts, gathering feedback, thanking sponsors, and filing the secretarial report.",
            ],
            keyTakeaway: "A project is only complete when the final financial ledger is balanced, receipts audited, and the report submitted.",
          },
        ],
        companionAdvice: {
          nova: "Always keep every single bill and receipt during project execution! The Treasurer will need them for the final audit.",
          raya: "Execution day is a whirlwind of energy! Stay calm, trust your team, and enjoy making real impact together.",
          kai: "Drafting a solid project proposal teaches you how to present proposals to corporate management in your career.",
        },
        knowledgeCheck: {
          question: "What is the mandatory first step before any project can officially launch or publicize under the RACSR banner?",
          options: [
            {
              id: "opt-1",
              text: "Submitting a formal project proposal and budget for Board of Directors approval",
              explanation: "Correct! The Board of Directors must review and formally approve every project and its budget before execution.",
            },
            {
              id: "opt-2",
              text: "Posting on Instagram without asking anyone",
              explanation: "Incorrect. Projects must follow protocol and obtain Board approval prior to public announcement.",
            },
            {
              id: "opt-3",
              text: "Immediately ordering merchandise without budget clearance",
              explanation: "Incorrect. Financial commitments require approved budgets.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Think about the governing body that reviews proposals and budgets!",
          successMessage: "Spot on! You understand the governance of project execution.",
        },
      },
      {
        id: "lesson-5-2",
        chapterId: "loc-project-forge",
        lessonNumber: 2,
        title: "Committee Roles & Crew Coordination",
        subtitle: "How a Project Organizing Committee Functions",
        readTime: "3 min",
        xpReward: 75,
        storyIntro: {
          speaker: "The Builder",
          speakerRole: "Master Project Crafter",
          dialogue: "No one builds alone! In the forge, each crafter has a dedicated duty. Learn how project organizing committees coordinate like clockwork.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "The Builder",
            role: "Master Project Crafter",
            emotion: "happy",
            text: "No one builds a fortress alone! A Project Organizing Committee (OC) operates like a well-oiled clockwork machine.",
          },
          {
            speaker: "prospect",
            text: "What key roles exist inside an Organizing Committee?",
            prospectChoices: [
              "Who leads the organizing committee?",
              "What duties do committee members take on?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "You have Project Chairpersons (steering the ship), Project Secretary (documenting minutes and registrations), Project Treasurer (budget and bills), PR Lead (socials and flyers), and Logistics Lead (venues and sound)!",
          },
          {
            speaker: "prospect",
            text: "Serving in these roles gives prospects direct hands-on leadership practice!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Exactly, Chief! Joining an OC is where prospects showcase their drive and earn recommendations for future Board positions!",
          },
        ],
        sections: [
          {
            title: "Core Organizing Committee Roles",
            content: [
              "When a project is chartered, the Board appoints Project Chairpersons who recruit committee members across key operational desks.",
            ],
            bulletPoints: [
              "Project Chair / Co-Chair: Overall leadership, vision, delegating tasks, and liaising directly with the Avenue Director.",
              "Project Secretary: Taking meeting minutes, drafting invitations, tracking volunteer attendance, and compiling the post-project report.",
              "Project Treasurer: Monitoring expenditure against the budget, managing cash on ground, and collecting all invoices.",
              "Public Relations & Creative Lead: Designing flyers, managing countdown stories, and coordinating media coverage.",
              "Logistics & Operations Lead: Venue bookings, sound and AV equipment, transportation, and volunteer safety.",
            ],
            keyTakeaway: "Clear role delegation prevents burnout and empowers every committee member to take ownership.",
          },
        ],
        companionAdvice: {
          nova: "If you are serving as Project Secretary, note down decisions immediately during meetings. Don't rely on memory!",
          raya: "Volunteering for Logistics is high-energy fun! You're on your feet setting up stages and testing equipment.",
          kai: "Co-Chairing a project is the fastest way to build teamwork chemistry and prove your executive potential.",
        },
        knowledgeCheck: {
          question: "Who holds overall responsibility for coordinating team tasks, adhering to the timeline, and liaising with the Avenue Director?",
          options: [
            {
              id: "opt-1",
              text: "The Project Chairperson(s)",
              explanation: "Correct! The Project Chairperson(s) steer the organizing committee and report to the Avenue Director.",
            },
            {
              id: "opt-2",
              text: "The Graphic Designer",
              explanation: "Incorrect. The designer focuses on creative assets, while the Chairperson leads the overall initiative.",
            },
            {
              id: "opt-3",
              text: "An external spectator",
              explanation: "Incorrect. Only appointed committee chairs lead projects.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Look for the overall leader who steers the committee!",
          successMessage: "Brilliant! You know how project committees are steered.",
        },
      },
      {
        id: "lesson-5-3",
        chapterId: "loc-project-forge",
        lessonNumber: 3,
        title: "Sustainable Impact & The Project Matrix",
        subtitle: "Beyond Charity: Building Solutions That Last",
        readTime: "3 min",
        xpReward: 100,
        storyIntro: {
          speaker: "The Builder",
          speakerRole: "Master Project Crafter",
          dialogue: "Giving someone a meal feeds them for a day; teaching them to farm feeds a community for generations. In RACSR, we champion sustainable transformation.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "The Builder",
            role: "Master Project Crafter",
            emotion: "proud",
            text: "Giving a one-off handout lasts a day. But building sustainable solutions transforms generations! That is the Regent standard.",
          },
          {
            speaker: "prospect",
            text: "How does RACSR ensure its community projects achieve lasting sustainability?",
            prospectChoices: [
              "What makes a project truly sustainable?",
              "How do we measure long-term community impact?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "We partner with local stakeholders, conduct training, and set up maintenance protocols—like installing water filter systems that the village committee maintains long after handover!",
          },
          {
            speaker: "prospect",
            text: "Empowering communities with ownership so the impact continues indefinitely!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Magnificent understanding, Chief! That is what sets Rotaract apart—Service Above Self that leaves a lasting legacy!",
          },
        ],
        sections: [
          {
            title: "Principles of Sustainable Impact",
            content: [
              "Rotary International emphasizes sustainability: providing solutions where the community can maintain the benefits long after the project concludes.",
            ],
            bulletPoints: [
              "Community Ownership: Involving local teachers, parents, and village leaders in project planning so they take pride in maintaining assets.",
              "Measurable Metrics: Tracking quantitative data (e.g. number of students taught, liters of water filtered, trees survived after 6 months).",
              "Environmental Responsibility: Ensuring project materials are eco-friendly and do not generate residual plastic pollution.",
              "Alignment with Rotary Areas of Focus: Designing initiatives that align with Peacebuilding, Disease Prevention, Water & Sanitation, Maternal Health, Education, Economic Development, and Environment.",
            ],
            keyTakeaway: "True impact is measured not on the day of the opening ceremony, but six months later when the community is still flourishing.",
          },
        ],
        companionAdvice: {
          nova: "Always follow up after project completion! A 3-month check-in visit shows genuine care and validates long-term success.",
          raya: "Clean water, planted trees, and empowered youth—that is the legacy of Regent service.",
          kai: "Aligning your project with Rotary's 7 Areas of Focus makes it eligible for prestigious District Awards and global grants.",
        },
        knowledgeCheck: {
          question: "How does RACSR define 'Sustainable Community Impact'?",
          options: [
            {
              id: "opt-1",
              text: "Creating long-term solutions with community ownership that continue benefiting people well after the project team departs",
              explanation: "Correct! Sustainability means empowering the community to maintain and benefit from the initiative long-term.",
            },
            {
              id: "opt-2",
              text: "A quick photo-op with zero follow-up or maintenance plan",
              explanation: "Incorrect. Temporary photo-ops run contrary to Rotary's commitment to sustainable development.",
            },
            {
              id: "opt-3",
              text: "Spending all funds on lavish closing fireworks",
              explanation: "Incorrect. Funds must be utilized responsibly for lasting humanitarian impact.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Look for long-term benefit and community ownership!",
          successMessage: "Masterful! You are now a certified Master Builder of projects.",
        },
      },
    ],
  },

  "loc-codewood": {
    id: "loc-codewood",
    chapterNumber: 6,
    chapterLabel: "CHAPTER 6",
    chapterTitle: "The Regent Code",
    worldName: "Codewood",
    regionTitle: "Ancient Monolithic Grove",
    seethawakaInspiration: "Inspired by Puwarankanda & heritage forest reserves",
    summary: "Master the Regent Code, parliamentary procedure, meeting decorum, Robert's Rules of Order, and ethical standards in the monolithic glades of Codewood.",
    badgeReward: "CODE BEARER",
    xpReward: 200,
    lessons: [
      {
        id: "lesson-6-1",
        chapterId: "loc-codewood",
        lessonNumber: 1,
        title: "Parliamentary Procedure & The Gavel",
        subtitle: "Robert's Rules of Order, Quorum & Meeting Protocol",
        readTime: "3 min",
        xpReward: 60,
        storyIntro: {
          speaker: "The Scholar",
          speakerRole: "Ethics Master",
          dialogue: "Welcome to Codewood, traveler. The ancient monoliths here are etched with rules of justice, order, and honor. Let us study the language of the gavel and parliamentary law.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "The Scholar",
            role: "Ethics Master",
            emotion: "proud",
            text: "Welcome to Codewood, Prospect! In the halls of Rotaract, passion must be governed by order, respect, and parliamentary fairness.",
          },
          {
            speaker: "prospect",
            text: "What is parliamentary procedure, Scholar?",
            prospectChoices: [
              "Why do we use Robert's Rules of Order?",
              "What does the sound of the gavel signify?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "Robert's Rules of Order ensure every member's voice can be heard and decisions are made democratically! The gavel in the President's hands symbolizes meeting authority and order.",
          },
          {
            speaker: "prospect",
            text: "And what does it mean when a member moves a motion and another 'seconds' it?",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Moving a motion puts a proposal on the table! Seconding it confirms at least one other member agrees it should be debated and voted upon by the assembly!",
          },
        ],
        sections: [
          {
            title: "Fundamentals of Parliamentary Procedure",
            content: [
              "Rotaract meetings follow formal democratic rules to guarantee fair debate, orderly decision-making, and protection of minority viewpoints.",
            ],
            bulletPoints: [
              "The Gavel: Held exclusively by the presiding officer (President or Chairperson). A single tap calls the assembly to order or closes a motion.",
              "Quorum: The minimum percentage of active members required present (usually 50% + 1) for official club votes to be legally binding.",
              "Moving a Motion: 'I move that RACSR allocates 25,000 LKR for the school library project.'",
              "Seconding a Motion: A motion requires a second before debate begins ('I second the motion').",
              "Point of Order: Raised by a member when meeting rules or protocol are violated.",
            ],
            keyTakeaway: "Parliamentary procedure prevents chaos and ensures that every member has equal democratic standing.",
          },
        ],
        companionAdvice: {
          nova: "Remember: always address the Chair, not individual members during a debate. Say: 'Through the Chair, I would like to propose...'",
          raya: "Hearing the gavel strike to open an assembly gives you goosebumps! It feels so official and prestigious.",
          kai: "Understanding parliamentary motions will make you shine in boardrooms and corporate shareholder meetings later in life.",
        },
        knowledgeCheck: {
          question: "In parliamentary procedure, what is required before a motion can be opened for formal debate and voting?",
          options: [
            {
              id: "opt-1",
              text: "Another member must 'second' the motion to show it has support for consideration",
              explanation: "Correct! A motion must be seconded before debate and voting can take place.",
            },
            {
              id: "opt-2",
              text: "The President must dismiss all members from the hall",
              explanation: "Incorrect. The assembly stays in order to debate the proposal.",
            },
            {
              id: "opt-3",
              text: "A coin toss must be conducted",
              explanation: "Incorrect. Rotaract decisions are made through democratic voting, not games of chance.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Think about seconding the motion!",
          successMessage: "Flawless! You speak the language of parliamentary procedure.",
        },
      },
      {
        id: "lesson-6-2",
        chapterId: "loc-codewood",
        lessonNumber: 2,
        title: "The Four-Way Test in Action & Regent Ethics",
        subtitle: "The 24-Word Compass That Guides Our Conduct",
        readTime: "3 min",
        xpReward: 70,
        storyIntro: {
          speaker: "The Scholar",
          speakerRole: "Ethics Master",
          dialogue: "Look upon the central granite monolith! Four golden questions are carved into the stone. Whenever you face a difficult decision in leadership or life, test it against this compass.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "The Scholar",
            role: "Ethics Master",
            emotion: "proud",
            text: "Look upon the central granite obelisk, Prospect! Four timeless questions are etched into the stone.",
          },
          {
            speaker: "prospect",
            text: "The Four-Way Test of the things we think, say, or do!",
            prospectChoices: [
              "Can you recite the four questions?",
              "How do we apply the test in difficult situations?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "1. Is it the TRUTH? 2. Is it FAIR to all concerned? 3. Will it build GOODWILL and BETTER FRIENDSHIPS? 4. Will it be BENEFICIAL to all concerned?",
          },
          {
            speaker: "prospect",
            text: "If an action fails even one of these four questions, a Regent must reconsider!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Noble wisdom, Chief! When leaders live by the Four-Way Test, integrity is unshakeable and reputations stand tall!",
          },
        ],
        sections: [
          {
            title: "The 4 Pillars of the Four-Way Test",
            content: [
              "Created in 1932 by Herbert J. Taylor, this 24-word ethical test is translated into over 100 languages and recited by millions of Rotarians and Rotaractors worldwide.",
            ],
            bulletPoints: [
              "1. Is it the TRUTH? Complete honesty and transparency in words, accounting, and representations.",
              "2. Is it FAIR to all concerned? Treating peers, partners, and competitors with equity and justice.",
              "3. Will it build GOODWILL and BETTER FRIENDSHIPS? Does your action strengthen trust and mutual affection?",
              "4. Will it be BENEFICIAL to all concerned? Striving for win-win outcomes where everyone gains positively.",
            ],
            keyTakeaway: "The Four-Way Test is not a set of laws to punish; it is an inner moral mirror to keep leaders honorable.",
          },
        ],
        companionAdvice: {
          nova: "Whenever there is a disagreement in a project committee, test both viewpoints against: 'Will it build goodwill and better friendships?'",
          raya: "Fair play and truthfulness make you someone everyone respects. Live the Four-Way Test on and off the field!",
          kai: "In business negotiations, ethical leaders who build mutual benefit are the ones who build long-term empires.",
        },
        knowledgeCheck: {
          question: "Which of the following is NOT one of the 4 questions in Rotary's Four-Way Test?",
          options: [
            {
              id: "opt-1",
              text: "Will it make the most money regardless of who is affected?",
              explanation: "Correct! The Four-Way Test emphasizes fairness and benefit to all, never selfish profit at the expense of others.",
            },
            {
              id: "opt-2",
              text: "Is it the TRUTH?",
              explanation: "Incorrect. 'Is it the TRUTH?' is the very first question of the test.",
            },
            {
              id: "opt-3",
              text: "Will it build GOODWILL and BETTER FRIENDSHIPS?",
              explanation: "Incorrect. 'Will it build goodwill and better friendships?' is the third question of the test.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Which option contradicts ethics and mutual benefit?",
          successMessage: "Golden clarity! The Four-Way Test is your moral compass.",
        },
      },
      {
        id: "lesson-6-3",
        chapterId: "loc-codewood",
        lessonNumber: 3,
        title: "General Assembly Decorum & Protocol",
        subtitle: "Dress Codes, Collar Etiquette & Meeting Decorum",
        readTime: "3 min",
        xpReward: 70,
        storyIntro: {
          speaker: "The Scholar",
          speakerRole: "Ethics Master",
          dialogue: "Dignity in appearance and speech reflects your self-respect and pride in the Regent movement. Here is how we carry ourselves at General Assemblies and District events.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "The Scholar",
            role: "Ethics Master",
            emotion: "happy",
            text: "Dignity in speech, attire, and decorum honors the heritage of our fellowship. Let us review the protocol of the assembly.",
          },
          {
            speaker: "prospect",
            text: "What dress code and etiquette are expected of prospects and members?",
            prospectChoices: [
              "What is the official dress code for General Assemblies?",
              "What is collar etiquette for the Club President?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "Smart casual or formal business attire! Mobile phones silent, standing when addressing the Chair, and respecting the President's official collar, which is worn with pride at formal ceremonies.",
          },
          {
            speaker: "prospect",
            text: "And we begin every assembly with the National Anthem, Rotary & Rotaract Invocations, and the Four-Way Test!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Spot on, Chief! That ceremonial reverence binds all Rotaractors across Sri Lanka and the world in unity!",
          },
        ],
        sections: [
          {
            title: "Assembly Standards & Protocol",
            content: [
              "Rotaract assemblies reflect professional decorum that prepares young leaders for corporate boardrooms and international diplomacy.",
            ],
            bulletPoints: [
              "Meeting Order: Call to Order $\\rightarrow$ National Anthem $\\rightarrow$ Rotaract Invocation $\\rightarrow$ Four-Way Test $\\rightarrow$ Welcome & Secretarial Report $\\rightarrow$ Avenue Updates $\\rightarrow$ Open Floor $\\rightarrow$ Termination.",
              "Addressing the Assembly: Always address 'Mr./Madam President' or 'Through the Chair' when speaking.",
              "Presidential Collar: A ceremonial chain of office displaying the names of past charter leaders, worn strictly by the President at official installations and district assemblies.",
              "Mobile Phone Courtesy: Phones set to silent mode; stepping out quietly if urgent emergencies arise.",
            ],
            keyTakeaway: "Etiquette is not rigidity; it is mutual respect and organizational discipline.",
          },
        ],
        companionAdvice: {
          nova: "Arrive 15 minutes before the gavel strikes! Punctuality shows respect for your fellow members' time.",
          raya: "Wear your badge and club t-shirt or formal blazer with pride! You represent Seethawaka Regent.",
          kai: "Observe how senior directors present their reports. You will learn executive presence and boardroom confidence.",
        },
        knowledgeCheck: {
          question: "When speaking during a formal club meeting debate, to whom should a member always address their remarks?",
          options: [
            {
              id: "opt-1",
              text: "Through the Chair / Presiding Officer (e.g. 'Mr./Madam President')",
              explanation: "Correct! Parliamentary protocol dictates that all remarks must be directed through the presiding Chair.",
            },
            {
              id: "opt-2",
              text: "Directly shouting at an opponent across the room",
              explanation: "Incorrect. Debates must remain orderly and civil through the Chair.",
            },
            {
              id: "opt-3",
              text: "Whispering to the person in the row behind",
              explanation: "Incorrect. Floor remarks are formally addressed through the Chair.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Always speak through the presiding Chair!",
          successMessage: "Exemplary decorum! You have earned the Code Bearer badge.",
        },
      },
    ],
  },

  "loc-grand-archive": {
    id: "loc-grand-archive",
    chapterNumber: 7,
    chapterLabel: "CHAPTER 7",
    chapterTitle: "Grand Archive",
    worldName: "Grand Archive",
    regionTitle: "Mountain-Carved Library",
    seethawakaInspiration: "Inspired by historical Seethawaka Kingdom manuscript halls",
    summary: "Decode ROTA 101, standard Rotaract constitutions, club bylaws, District citations, and official secretarial reporting in the mountain-carved Grand Archive.",
    badgeReward: "SCHOLAR",
    xpReward: 200,
    lessons: [
      {
        id: "lesson-7-1",
        chapterId: "loc-grand-archive",
        lessonNumber: 1,
        title: "ROTA 101 & The Rotaract Constitution",
        subtitle: "The Governing Framework of Every Rotaract Club",
        readTime: "3 min",
        xpReward: 60,
        storyIntro: {
          speaker: "Chief Librarian Vanya",
          speakerRole: "Archive Keeper",
          dialogue: "Welcome to the Grand Archive! Towering bookshelves carved into the living rock hold the constitutional bedrock of Rotaract. Let us unroll the sacred scroll of ROTA 101.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "Chief Librarian Vanya",
            role: "Archive Keeper",
            emotion: "happy",
            text: "Welcome to the Grand Archive, Prospect! Behind every thriving organization lies a constitution that protects its longevity and fairness.",
          },
          {
            speaker: "prospect",
            text: "What is ROTA 101 and the Standard Rotaract Constitution, Librarian Vanya?",
            prospectChoices: [
              "What does the Standard Club Constitution define?",
              "What rights and responsibilities does a member hold?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "The Standard Rotaract Constitution outlines club governance, voting rights, officer qualifications, and financial transparency. Club Bylaws tailor these rules to our local Seethawaka community!",
          },
          {
            speaker: "prospect",
            text: "So knowing our constitution ensures our leadership is rooted in law and equity!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Exquisite comprehension, Chief! When leaders master the rules of governance, they lead with clarity and protect the club for generations!",
          },
        ],
        sections: [
          {
            title: "The Standard Rotaract Club Constitution",
            content: [
              "Issued by Rotary International, the Standard Constitution establishes uniform governance across all Rotaract clubs worldwide.",
            ],
            bulletPoints: [
              "Membership Criteria: Open to individuals of good character and leadership potential.",
              "Elections: Annual democratic elections held between November and February to elect the President-Elect and board officers for the incoming Rotary year (July 1 - June 30).",
              "Board of Directors: The governing body responsible for club policy, finances, and approving projects and inductions.",
              "Club Bylaws: Supplementary rules adopted by each individual club (e.g. membership dues, local committees, attendance minimums).",
            ],
            keyTakeaway: "The constitution guarantees that no single person rules arbitrarily—governance is collective and democratic.",
          },
        ],
        companionAdvice: {
          nova: "Every newly elected Director should read the club bylaws during the transition period. It eliminates confusion before term commencement!",
          raya: "Knowing your member rights gives you the confidence to raise your hand and make positive suggestions in meetings.",
          kai: "Constitutional knowledge is the secret weapon of great leaders. It makes you a trusted adviser across the district.",
        },
        knowledgeCheck: {
          question: "When does the official Rotary and Rotaract year officially commence and conclude worldwide?",
          options: [
            {
              id: "opt-1",
              text: "July 1st through June 30th of the following calendar year",
              explanation: "Correct! The global Rotary and Rotaract administrative year runs from July 1 to June 30.",
            },
            {
              id: "opt-2",
              text: "January 1st through December 31st",
              explanation: "Incorrect. Rotary's administrative fiscal calendar starts on July 1.",
            },
            {
              id: "opt-3",
              text: "September 1st through August 31st",
              explanation: "Incorrect. The global Rotary year commences on July 1.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Think of the midpoint of the calendar year: July 1!",
          successMessage: "Splendid! You know the global Rotary calendar cycle.",
        },
      },
      {
        id: "lesson-7-2",
        chapterId: "loc-grand-archive",
        lessonNumber: 2,
        title: "District Citations & The Hall of Recognition",
        subtitle: "How Excellence is Celebrated at the Annual Assembly",
        readTime: "3 min",
        xpReward: 70,
        storyIntro: {
          speaker: "Chief Librarian Vanya",
          speakerRole: "Archive Keeper",
          dialogue: "Look toward the illuminated glass alcoves! The awards of District 3220 shine brightly. Learn how clubs achieve District Citations and global recognition.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "Chief Librarian Vanya",
            role: "Archive Keeper",
            emotion: "proud",
            text: "Look toward the illuminated Hall of Laurels, Prospect! Every year, District 3220 honors clubs that display balanced excellence.",
          },
          {
            speaker: "prospect",
            text: "How does a club qualify for prestigious District Citations and Awards?",
            prospectChoices: [
              "What are the criteria for a District Citation?",
              "What projects win Most Outstanding Project awards?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "Citations require balanced excellence across ALL avenues of service: timely secretarial reports, active membership retention, community impact, and participation in district events!",
          },
          {
            speaker: "prospect",
            text: "So a truly great club doesn't just focus on one avenue—it shines across all seven!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Bullseye, Chief! Balance, consistency, and verifiable community impact are what earn the Regent banner its golden glory!",
          },
        ],
        sections: [
          {
            title: "Earning District & Global Accolades",
            content: [
              "District Citations serve as performance benchmarks set by the District Governor (DG) and District Rotaract Representative (DRR) to motivate high standards.",
            ],
            bulletPoints: [
              "Rotary Citation for Rotaract Clubs: Awarded directly by the Rotary International President to clubs achieving challenging goals in membership growth, foundation giving, and service.",
              "District 3220 Citations (Gold, Silver, Bronze): Awarded at the annual Rotaract District Assembly based on avenue points and audit scores.",
              "Single Project Awards: Recognizing the Most Outstanding Project in Community Service, Professional Development, International Service, and Club Service.",
              "Spirit of Service & Fellowship Awards: Honoring unsung heroes and exemplary prospect contributors.",
            ],
            keyTakeaway: "Awards are not for vanity—they validate that our projects made measurable, high-quality differences in human lives.",
          },
        ],
        companionAdvice: {
          nova: "Documenting high-resolution photographs, participant rosters, and beneficiary testimonials during projects is vital for citation submissions.",
          raya: "Attending the annual District Assembly with your club delegation in matching royal attire is an electric experience!",
          kai: "When RACSR wins District accolades, it boosts our reputation with corporate sponsors for the following year.",
        },
        knowledgeCheck: {
          question: "What is the primary objective of Rotary & District Citations for Rotaract clubs?",
          options: [
            {
              id: "opt-1",
              text: "To recognize balanced excellence and measurable achievements across all avenues of service and administration",
              explanation: "Correct! Citations reward balanced service, administrative discipline, and sustainable community impact.",
            },
            {
              id: "opt-2",
              text: "To give trophies only to clubs that host the most parties",
              explanation: "Incorrect. Citations require balanced humanitarian impact and administrative excellence.",
            },
            {
              id: "opt-3",
              text: "To rank clubs based on the color of their banners",
              explanation: "Incorrect. Citations evaluate real projects, governance, and community benefit.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Look for balanced excellence across service and administration!",
          successMessage: "Accolades earned! You understand the pursuit of excellence.",
        },
      },
      {
        id: "lesson-7-3",
        chapterId: "loc-grand-archive",
        lessonNumber: 3,
        title: "Official Reporting & Monthly District Portals",
        subtitle: "Timely Submissions: The Secret to Club Good Standing",
        readTime: "3 min",
        xpReward: 70,
        storyIntro: {
          speaker: "Chief Librarian Vanya",
          speakerRole: "Archive Keeper",
          dialogue: "Ink, parchment, and digital portals! The Club Secretary is the unsung hero of Rotaract. Discover why timely reporting keeps the club in good standing.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "Chief Librarian Vanya",
            role: "Archive Keeper",
            emotion: "happy",
            text: "Even the greatest projects mean nothing to history unless accurately chronicled. Welcome to the art of Secretarial Reporting!",
          },
          {
            speaker: "prospect",
            text: "Why is timely monthly reporting to the District Secretariat so critical?",
            prospectChoices: [
              "What happens if a club fails to file reports?",
              "What goes into the Monthly Secretarial Report?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "Every month, the Club Secretary submits meeting minutes, project briefs, and member attendance to the District Portal. Timely filing keeps RACSR in 'Good Standing'!",
          },
          {
            speaker: "prospect",
            text: "Maintaining Good Standing allows our members to vote at District conferences and win awards!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Spot on, Chief! Administrative discipline is the invisible backbone that empowers all our frontline service!",
          },
        ],
        sections: [
          {
            title: "The Mechanics of District Reporting",
            content: [
              "District 3220 maintains an official online portal where clubs log their monthly activities, financial records, and service metrics.",
            ],
            bulletPoints: [
              "Monthly Secretarial Report (MSR): Details all assemblies held, avenue projects executed, volunteer hours logged, and community reach.",
              "Project Completion Reports: Filed within 14 days of project completion, including financial balance sheets and receipts.",
              "Good Standing Status: Clubs that submit timely reports and settle district dues on schedule maintain full voting rights at District Conference.",
              "Historical Archives: Preserving records for future club presidents, researchers, and Rotaract historians.",
            ],
            keyTakeaway: "Unreported impact is forgotten impact. Thorough reporting honors the sweat and effort of our volunteers.",
          },
        ],
        companionAdvice: {
          nova: "The 10th of every month is usually the submission deadline! Disciplined secretaries prepare their draft logs early.",
          raya: "If you help a project secretary take notes or photograph events, you're directly helping the club earn citation points!",
          kai: "Report-writing teaches concise, business-grade documentation—an indispensable executive skill.",
        },
        knowledgeCheck: {
          question: "Why is submitting the Monthly Secretarial Report (MSR) on time mandatory for every Rotaract club?",
          options: [
            {
              id: "opt-1",
              text: "To maintain official 'Good Standing', secure voting rights, and validate project impact for district awards",
              explanation: "Correct! Timely MSR submissions maintain Good Standing and document the club's achievements.",
            },
            {
              id: "opt-2",
              text: "To ensure members receive free fast-food coupons",
              explanation: "Incorrect. Reporting is an official administrative governance responsibility.",
            },
            {
              id: "opt-3",
              text: "To replace physical meetings with text messages",
              explanation: "Incorrect. Reporting documents physical and virtual activities, it does not replace them.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Look for Good Standing and voting rights!",
          successMessage: "Brilliant! You have mastered the Grand Archive scrolls.",
        },
      },
    ],
  },

  "loc-impact-frontier": {
    id: "loc-impact-frontier",
    chapterNumber: 8,
    chapterLabel: "CHAPTER 8",
    chapterTitle: "Impact Frontier",
    worldName: "Impact Frontier",
    regionTitle: "Expedition Grounds",
    seethawakaInspiration: "Inspired by living Seethawaka communities and tea estate trails",
    summary: "Step out of theory into real ground reality. Engage with local communities, build stakeholder partnerships, and log active service hours across Seethawaka.",
    badgeReward: "TRAILBLAZER",
    xpReward: 350,
    lessons: [
      {
        id: "lesson-8-1",
        chapterId: "loc-impact-frontier",
        lessonNumber: 1,
        title: "Stepping into the Field: Real Community Engagement",
        subtitle: "From Classroom Theory to Compassionate Action",
        readTime: "3 min",
        xpReward: 100,
        storyIntro: {
          speaker: "Expedition Scout Mira",
          speakerRole: "Frontier Leader",
          dialogue: "Welcome to the Impact Frontier! Leave the library halls behind. Out here on the tea plantation trails and village lanes is where Rotaract touches real human lives.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "Expedition Scout Mira",
            role: "Frontier Leader",
            emotion: "happy",
            text: "Welcome to the Impact Frontier, Prospect! Leave the theoretical scrolls behind. Out here on the village trails is where true changemakers are forged!",
          },
          {
            speaker: "prospect",
            text: "How does ground reality challenge and transform a prospect explorer?",
            prospectChoices: [
              "What makes on-ground community service different from theory?",
              "How do we interact with village families and beneficiaries?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "On the ground, you look people in the eyes, listen to their hardships with empathy, and realize service isn't about charity—it's about human solidarity and dignity!",
          },
          {
            speaker: "prospect",
            text: "Rolling up our sleeves and working side-by-side with the community!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "That is the heartbeat of a true Regent, Chief! Sweat, humility, and genuine compassion bridge every gap!",
          },
        ],
        sections: [
          {
            title: "The Reality of On-Ground Service",
            content: [
              "No presentation can replace the experience of visiting a rural school in Avissawella, handing a child their first computer, or planting trees on deforested riverbanks.",
            ],
            bulletPoints: [
              "Empathy Over Sympathy: Treating beneficiaries as respected partners and active collaborators, never as pity cases.",
              "Cultural Sensitivity: Respecting local village customs, speaking politely in native languages, and dressing appropriately.",
              "Active Listening: Spending time conversing with village elders and parents to understand root challenges.",
              "Team Safety & Logistics: Working in buddy pairs, carrying first-aid supplies, and respecting environmental weather conditions.",
            ],
            keyTakeaway: "True leadership begins with empathy. When you connect with people's hearts, service becomes joyful.",
          },
        ],
        companionAdvice: {
          nova: "Always listen more than you speak when visiting a project site. The community understands their needs best.",
          raya: "Get your boots muddy! Painting school walls or clearing debris alongside your club friends is the most rewarding fun on Earth.",
          kai: "Take note of unforeseen needs during field visits. A school library visit might reveal that children also lack clean drinking water—sparking your next project!",
        },
        knowledgeCheck: {
          question: "When interacting with community beneficiaries during a field service project, what attitude should a Regent always uphold?",
          options: [
            {
              id: "opt-1",
              text: "Empathetic partnership and mutual respect, treating beneficiaries as valued collaborators",
              explanation: "Correct! Rotary service is built on mutual respect and empowering communities as equal partners.",
            },
            {
              id: "opt-2",
              text: "Arrogance and acting like you know better than the local community",
              explanation: "Incorrect. Arrogance contradicts Service Above Self and alienates communities.",
            },
            {
              id: "opt-3",
              text: "Ignoring the locals and only taking selfies for social media",
              explanation: "Incorrect. Self-serving vanity defeats the entire humanitarian purpose of Rotaract.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Look for empathy, mutual respect, and partnership!",
          successMessage: "Spot on! You have the genuine heart of a servant leader.",
        },
      },
      {
        id: "lesson-8-2",
        chapterId: "loc-impact-frontier",
        lessonNumber: 2,
        title: "Building Stakeholder Trust & Local Partnerships",
        subtitle: "Collaborating with Elders, Schools & Regional Authorities",
        readTime: "3 min",
        xpReward: 120,
        storyIntro: {
          speaker: "Expedition Scout Mira",
          speakerRole: "Frontier Leader",
          dialogue: "A lone explorer can move quickly, but an alliance can traverse mountain ranges. Learn how RACSR builds trust with local authorities, schools, and partner NGOs.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "Expedition Scout Mira",
            role: "Frontier Leader",
            emotion: "proud",
            text: "A single volunteer can move fast, but an alliance can move mountains! Let us explore stakeholder partnerships.",
          },
          {
            speaker: "prospect",
            text: "Who are the key local stakeholders we partner with across Seethawaka?",
            prospectChoices: [
              "How do we collaborate with school principals and village elders?",
              "Do we work alongside government health offices and NGOs?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "We collaborate with Medical Officers of Health (MOH), Public Health Inspectors (PHI), school principals, and village development committees to coordinate approvals and ensure projects run legally and smoothly!",
          },
          {
            speaker: "prospect",
            text: "Building trust with authorities ensures our projects have official backing and long-term sustainability!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Precisely, Chief! When local authorities know RACSR's integrity, doors swing wide open for future community impact!",
          },
        ],
        sections: [
          {
            title: "Navigating Community Alliances",
            content: [
              "Sustainable community development requires coordination with existing regional authorities, educational leaders, and healthcare personnel.",
            ],
            bulletPoints: [
              "Official Approvals: Obtaining written permission from Zonal Education Directors before conducting school workshops, or from the MOH before health camps.",
              "Village Elders & Grama Niladhari: Respectfully briefing local village administrators to secure community participation.",
              "Corporate Sponsors: Providing sponsors with formal impact reports, photo deliverables, and audited financial statements.",
              "Sister Rotary Clubs: Collaborating with Rotary clubs for mentorship, advisory oversight, and matching district grant opportunities.",
            ],
            keyTakeaway: "Collaboration multiplies impact. When everyone shares ownership, everyone celebrates the victory.",
          },
        ],
        companionAdvice: {
          nova: "Always send formal gratitude letters to partner schools, MOH officers, and sponsors within 7 days of project completion.",
          raya: "Meeting local leaders teaches you diplomacy, professional courtesy, and how to communicate effectively across generations.",
          kai: "Keep a digital directory of every contact person, principal, and sponsor you meet. That rolodex is pure gold.",
        },
        knowledgeCheck: {
          question: "Why is securing approvals from local authorities (like School Principals, MOH, or Grama Niladhari) essential before executing community projects?",
          options: [
            {
              id: "opt-1",
              text: "To ensure legal compliance, community trust, participant safety, and long-term institutional support",
              explanation: "Correct! Official approvals ensure safety, legality, and strong institutional collaboration.",
            },
            {
              id: "opt-2",
              text: "To slow down projects unnecessarily",
              explanation: "Incorrect. Seeking approvals guarantees credibility and protects volunteers and beneficiaries.",
            },
            {
              id: "opt-3",
              text: "It is not required and can always be skipped",
              explanation: "Incorrect. Skipping approvals breaches club protocol and creates legal liabilities.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Think about compliance, safety, and community trust!",
          successMessage: "Masterful diplomacy! You understand the power of stakeholder alliances.",
        },
      },
      {
        id: "lesson-8-3",
        chapterId: "loc-impact-frontier",
        lessonNumber: 3,
        title: "Logging Service Hours & The Prospect Logbook",
        subtitle: "Demonstrating Active Commitment on the Road to Induction",
        readTime: "3 min",
        xpReward: 130,
        storyIntro: {
          speaker: "Expedition Scout Mira",
          speakerRole: "Frontier Leader",
          dialogue: "Your backpack is packed, your boots are laced. It is time to translate your learning into recorded action. Discover how prospects log active service hours for membership induction.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "Expedition Scout Mira",
            role: "Frontier Leader",
            emotion: "happy",
            text: "Your journey across the realm is nearing its ultimate pinnacle! But before the gates of the Citadel open, you must log your active service.",
          },
          {
            speaker: "prospect",
            text: "How do prospect explorers log their active service hours and project contributions?",
            prospectChoices: [
              "What service hours are required for induction?",
              "What activities count toward prospect qualification?",
            ],
          },
          {
            speaker: "guide",
            emotion: "thinking",
            text: "Prospects participate in at least 2 major club projects, attend 3 consecutive General Assemblies, and actively log their volunteer hours with their designated Club Buddy!",
          },
          {
            speaker: "prospect",
            text: "Proving our dedication through real actions, teamwork, and fellowship!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Exactly, Chief! When the Board reviews your application, your active service log proves you are truly ready to wear the Regent pin with honor!",
          },
        ],
        sections: [
          {
            title: "The Prospect Induction Criteria",
            content: [
              "Membership in RACSR is earned through genuine enthusiasm, active participation, and adherence to the Regent Code.",
            ],
            bulletPoints: [
              "Meeting Attendance: Attending a minimum of 3 General Assemblies to understand club culture and parliamentary protocol.",
              "Project Participation: Actively serving as a committee volunteer in at least 2 avenue initiatives.",
              "Digital Guide Mastery: Passing all knowledge checks across this interactive prospect guide.",
              "Buddy Endorsement: Receiving a positive endorsement from your designated member mentor (Buddy System).",
              "Board Approval: Unanimous vote of approval by the RACSR Board of Officials.",
            ],
            keyTakeaway: "Induction is not a formality; it is an initiation into a lifelong fellowship of impact-driven changemakers.",
          },
        ],
        companionAdvice: {
          nova: "Track your dates! Keep a simple note of which meetings you attended and which project tasks you completed.",
          raya: "Your buddy is your greatest guide! Ask them any questions about upcoming projects or how to get involved.",
          kai: "When you contribute enthusiastically as a prospect, directors immediately take notice and invite you to lead future initiatives.",
        },
        knowledgeCheck: {
          question: "Which of the following demonstrates the true active commitment required for prospect induction?",
          options: [
            {
              id: "opt-1",
              text: "Attending assemblies, actively volunteering in club projects, and collaborating with a member buddy",
              explanation: "Correct! True commitment is shown through consistent meeting attendance and hands-on project participation.",
            },
            {
              id: "opt-2",
              text: "Signing up online and never attending a single meeting or project",
              explanation: "Incorrect. Passive membership is contrary to the active ethos of Rotaract.",
            },
            {
              id: "opt-3",
              text: "Demanding immediate board positions on day one without participating",
              explanation: "Incorrect. Leadership in Rotaract is earned through service and humble dedication.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Look for attendance, volunteering, and collaboration!",
          successMessage: "Trailblazer status unlocked! The mountain summit beckons.",
        },
      },
    ],
  },

  "loc-membership-citadel": {
    id: "loc-membership-citadel",
    chapterNumber: 9,
    chapterLabel: "CHAPTER 9",
    chapterTitle: "Membership Citadel",
    worldName: "Membership Citadel",
    regionTitle: "The High Royal Summit",
    seethawakaInspiration: "Inspired by the high summit landscapes of the Seethawaka mountain range",
    summary: "Ascend to the high mountain citadel. Complete the final induction pathway, recite the Regent Oath, and receive the official Rotaract lapel pin.",
    badgeReward: "INDUCTED REGENT",
    xpReward: 500,
    lessons: [
      {
        id: "lesson-9-1",
        chapterId: "loc-membership-citadel",
        lessonNumber: 1,
        title: "The Induction Pathway & Board Confirmation",
        subtitle: "The Final Review Before the Assembly of Regents",
        readTime: "3 min",
        xpReward: 200,
        storyIntro: {
          speaker: "High Regent",
          speakerRole: "Club President",
          dialogue: "You have ascended through every realm of our kingdom. The stone citadel rises into the clouds. Stand before the Board of Officials for the final confirmation of your readiness.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "High Regent",
            role: "Club President",
            emotion: "proud",
            text: "Halt, traveler! You have navigated Rotary Roots, charted the Seven Realms, and labored on the Impact Frontier. Stand before the Board of Officials!",
          },
          {
            speaker: "prospect",
            text: "I stand ready, Mr. President. My journey has shown me the true power of Service Above Self.",
            prospectChoices: [
              "I have completed all prospect milestones!",
              "I am eager to pledge my service to Seethawaka Regent!",
            ],
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "Prospect {name} has mastered all scrolls, served in field projects, and demonstrated flawless ethical integrity! The Companion Council proudly endorses their induction!",
          },
          {
            speaker: "prospect",
            text: "What remains for the final induction into the fellowship?",
          },
          {
            speaker: "npc",
            speakerName: "High Regent",
            role: "Club President",
            emotion: "happy",
            text: "The Board has unanimously confirmed your candidacy! Step forward into the inner chamber to take the Regent Oath and receive your official club pin!",
          },
        ],
        sections: [
          {
            title: "The Induction Confirmation Process",
            content: [
              "Induction is a sacred milestone where a prospect transitions from an observer to an officially pinned, voting member of the worldwide Rotary family.",
            ],
            bulletPoints: [
              "Board Review: The Director of Club Service and Membership presents the prospect's log of attendance and project service.",
              "Unanimous Vote: The Board votes to accept the candidate into active membership.",
              "District Registry: The Secretary registers the new member on the Rotary International and District 3220 databases.",
              "Preparation for Ceremony: The candidate is invited to the formal General Assembly or Installation to take the official oath.",
            ],
            keyTakeaway: "Receiving board confirmation means you have proven your reliability, character, and alignment with club values.",
          },
        ],
        companionAdvice: {
          nova: "Review the Regent Oath before the ceremony. Speaking it from the heart makes the moment unforgettable.",
          raya: "You made it! From a curious beginner at the stone gate to an officially confirmed Regent. I am so proud of you!",
          kai: "Becoming a member unlocks your eligibility to run for Board of Directors positions in future administrative years.",
        },
        knowledgeCheck: {
          question: "What formal body officially confirms and votes to approve a prospect for induction into RACSR?",
          options: [
            {
              id: "opt-1",
              text: "The RACSR Board of Directors / Board of Officials",
              explanation: "Correct! The Board of Directors formally reviews candidate qualifications and votes on induction.",
            },
            {
              id: "opt-2",
              text: "An anonymous online chatroom",
              explanation: "Incorrect. Official club governance requires Board review and formal confirmation.",
            },
            {
              id: "opt-3",
              text: "A random lottery draw",
              explanation: "Incorrect. Rotaract membership is earned through proven dedication and merit.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "The club's executive governing body!",
          successMessage: "Confirmed with honor! Step into the Pinning Chamber.",
        },
      },
      {
        id: "lesson-9-2",
        chapterId: "loc-membership-citadel",
        lessonNumber: 2,
        title: "The Pinning Ceremony & The Regent Oath",
        subtitle: "The Sacred Pledge: You Are Officially a Rotaractor",
        readTime: "3 min",
        xpReward: 300,
        storyIntro: {
          speaker: "High Regent",
          speakerRole: "Club President",
          dialogue: "Kneel before the assembly banner. As the gold and enamel pin is placed upon your lapel, you cease to be a prospect. You are now, and forever, a Regent of Seethawaka.",
        },
        interactiveStory: [
          {
            speaker: "npc",
            speakerName: "High Regent",
            role: "Club President",
            emotion: "proud",
            text: "Members and guests, rise! Raise your right hand and recite the Regent Pledge of Service!",
          },
          {
            speaker: "prospect",
            text: "I solemnly pledge to uphold the constitution of the Rotaract Club of Seethawaka Regent, to live by the Four-Way Test, and to place Service Above Self in all my endeavors!",
          },
          {
            speaker: "npc",
            speakerName: "High Regent",
            role: "Club President",
            emotion: "celebrate",
            text: "By the authority vested in me, I pin you as an official member of the Rotaract Club of Seethawaka Regent and Rotary International District 3220! Wear this pin with honor!",
          },
          {
            speaker: "guide",
            emotion: "celebrate",
            text: "FANFARE AND CHEERS! You did it, Regent {name}! The entire kingdom celebrates your investiture! Welcome home to the Regent family!",
          },
          {
            speaker: "prospect",
            text: "Driven by Purpose. Defined by Impact. I am proud to be a Regent!",
          },
        ],
        sections: [
          {
            title: "The Pinning & Lifetime Fellowship",
            content: [
              "The Rotaract lapel pin is a global badge of honor. Wherever you travel across 180 countries, fellow Rotarians and Rotaractors will recognize your commitment to humanitarian leadership.",
            ],
            bulletPoints: [
              "The Pin: Crafted with the gearwheel of Rotary and the bold Rotaract banner, symbolizing action, continuity, and fellowship.",
              "Wearing the Pin: Worn proudly over the left lapel, closest to the heart, at every official assembly, project, and district conference.",
              "The Club Creed: 'Driven by Purpose. Defined by Impact.'—reminding every member to act with courage, excellence, and compassion.",
              "Your Future Path: The journey does not end with induction; it truly begins! You are now eligible to chair flagship initiatives, lead avenue committees, and shape the future of our nation.",
            ],
            keyTakeaway: "You are no longer an observer of history—you are now an active architect of community transformation.",
          },
        ],
        companionAdvice: {
          nova: "Never leave your pin behind for formal events! It is your passport to international respect and warm fellowship.",
          raya: "WELCOME HOME, REGENT! I will always be by your side on every upcoming adventure and project!",
          kai: "You have completed the Prospect Journey. Now step forward and inspire the next generation of prospects!",
        },
        knowledgeCheck: {
          question: "What does wearing the official Rotaract lapel pin over your left lapel symbolize?",
          options: [
            {
              id: "opt-1",
              text: "A lifelong commitment to Service Above Self, ethical leadership, and brotherhood/sisterhood in the global Rotary family",
              explanation: "Correct! The lapel pin is the universal badge of honor representing Service Above Self and global fellowship.",
            },
            {
              id: "opt-2",
              text: "A temporary souvenir with no meaning",
              explanation: "Incorrect. The pin is an official insignia of membership in Rotary International.",
            },
            {
              id: "opt-3",
              text: "A ticket for free parking",
              explanation: "Incorrect. The pin represents leadership, integrity, and humanitarian service.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Service Above Self, ethical leadership, and global fellowship!",
          successMessage: "TRIUMPHANT VICTORY! You are an Inducted Regent of Seethawaka!",
        },
      },
    ],
  },
};

export function getChapterData(chapterId: string): ChapterDetails | undefined {
  return CHAPTERS_DATA[chapterId];
}

export function getAllChaptersData(): ChapterDetails[] {
  return Object.values(CHAPTERS_DATA);
}
