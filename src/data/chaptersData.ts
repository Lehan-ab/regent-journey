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
              "Sponsor Club: Rotary Club of Seethawaka",
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
    summary: "Delve into the origin and history of Rotary International, master the timeless Four-Way Test, explore Service Above Self, and learn the complete leadership chain for this year from RI down to RACSR.",
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
        title: "Rotary & Rotaract Leadership Structure (2026-27)",
        subtitle: "From Rotary International down to the RACSR Board",
        readTime: "4 min",
        xpReward: 45,
        storyIntro: {
          speaker: "The Archivist",
          speakerRole: "Ancient Lore Keeper",
          dialogue: "You are not an isolated explorer. You are part of an organized global hierarchy connecting Evanston, Illinois to the Seethawaka valley. Here is the chain of leadership for the 2026-27 Rotary year.",
        },
        sections: [
          {
            title: "1. Global & District Leadership",
            content: [
              "Every Rotary year runs from July 1 to June 30 of the following calendar year.",
              "At the apex stands Rotary International (RI), led by the RI President and the RI Board of Directors, guiding over 1.4 million members.",
              "Our club belongs to Rotary International District 3220, which unites all Rotary and Rotaract clubs across Sri Lanka and the Maldives.",
              "The District Governor (DG) oversees all Rotary operations in District 3220, supported by the District Rotaract Committee Chair (DRCC).",
              "The youth movement of our district is headed by the District Rotaract Representative (DRR) and the District Executive Committee.",
            ],
            bulletPoints: [
              "Global Apex: Rotary International President & Board of Directors",
              "District 3220 Head: District Governor (DG)",
              "District Rotaract Liaison: District Rotaract Committee Chair (DRCC)",
              "Youth Head: District Rotaract Representative (DRR)",
              "Sponsor Rotary Club: Rotary Club of Seethawaka (President & Rotaract Advisor)",
            ],
          },
          {
            title: "2. RACSR Board of Officials (2026-27)",
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
            keyTakeaway: "Knowing your leaders allows you to reach out to the right Director whenever you want to pitch an initiative or volunteer for an avenue!",
          },
        ],
        companionAdvice: {
          nova: "Keep this roster handy! If you love community work, reach out to Rtr. Saumya and Rtr. Dilreen; if you love design and media, connect with Rtr. Venuri and Rtr. Akila!",
          raya: "President Rtr. Lehan and the Vice Presidents are super approachable. Introduce yourself at the next assembly—they will welcome you with open arms!",
          kai: "Understanding the hierarchy from RI President -> District Governor -> DRR -> Sponsor Club -> RACSR President shows true institutional maturity.",
        },
        knowledgeCheck: {
          question: "Who is the Charter President & President of the Rotaract Club of Seethawaka Regent for 2026-27, and which Rotary District do we belong to?",
          options: [
            {
              id: "opt-1",
              text: "Rtr. Lehan Abeysuriya; Rotary International District 3220 (Sri Lanka & Maldives)",
              explanation: "Correct! Rtr. Lehan Abeysuriya is the Charter President & President for 2026-27, under District 3220.",
            },
            {
              id: "opt-2",
              text: "Rtr. Paul Harris; Rotary District 1905",
              explanation: "Incorrect. Paul Harris was the founder of Rotary in Chicago in 1905.",
            },
            {
              id: "opt-3",
              text: "Rtr. Sasiru Gunathilake; Rotary District 9900",
              explanation: "Incorrect. Rtr. Sasiru Gunathilake serves as the Sergeant-at-Arms of RACSR.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "Think about the leader who chartered RACSR and the district code for Sri Lanka & Maldives (3220)!",
          successMessage: "Outstanding! You know your club leaders and district home.",
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
        sections: [
          {
            title: "March 13, 1968: The First Rotaract Club",
            content: [
              "In the 1960s, Rotary leaders recognized that university students and young young adults needed an energetic platform of their own to practice leadership and community service.",
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
        title: "Our Charter Story & Founders",
        subtitle: "The Birth of the Rotaract Club of Seethawaka Regent",
        readTime: "3 min",
        xpReward: 65,
        storyIntro: {
          speaker: "The Keeper",
          speakerRole: "Guardian of Regent Lore",
          dialogue: "You have arrived at the high ramparts of Regent Keep! The banners of Maroon and Gold snap in the mountain wind. Here, the dream of a dedicated community club for the youth of the Seethawaka valley became reality.",
        },
        sections: [
          {
            title: "Why Seethawaka Regent Was Founded",
            content: [
              "For years, passionate young people living in Avissawella, Hanwella, Puwakpitiya, and surrounding towns traveled long distances to Colombo to participate in Rotaract activities.",
              "A visionary group of founding leaders recognized the urgent need for a high-caliber, locally grounded community club based right here in the Seethawaka region.",
              "Sponsored by the Rotary Club of Seethawaka, the club was officially chartered under District 3220, led by Charter President Rtr. Lehan Abeysuriya and a dedicated charter board of officials.",
            ],
            keyTakeaway: "RACSR was founded to bring world-class leadership opportunities and sustainable service directly to the youth and communities of the Seethawaka valley.",
          },
        ],
        companionAdvice: {
          nova: "Remembering our charter founders honors the groundwork they laid so you and I could have this platform today.",
          raya: "We are pioneers! Every project we carry out sets the standard for the decades to come.",
          kai: "Our partnership with the Rotary Club of Seethawaka provides us with invaluable mentorship, senior advice, and institutional backing.",
        },
        knowledgeCheck: {
          question: "Which sponsor Rotary Club supported the chartering of the Rotaract Club of Seethawaka Regent?",
          options: [
            {
              id: "opt-1",
              text: "The Rotary Club of Seethawaka",
              explanation: "Correct! The Rotary Club of Seethawaka is our proud sponsor and parent club.",
            },
            {
              id: "opt-2",
              text: "The Rotary Club of New York",
              explanation: "Incorrect. Our sponsor club is our local parent club in Seethawaka.",
            },
            {
              id: "opt-3",
              text: "The Rotary Club of Colombo West",
              explanation: "Incorrect. While Colombo West is a historic club, RACSR's dedicated sponsor is the Rotary Club of Seethawaka.",
            },
          ],
          correctOptionId: "opt-1",
          hint: "It shares our local regional home name: Seethawaka!",
          successMessage: "Splendid! You know our roots and parent Rotary foundation.",
        },
      },
      {
        id: "lesson-3-2",
        chapterId: "loc-regent-keep",
        lessonNumber: 2,
        title: "Regent Culture, Identity & Pride",
        subtitle: "Heritage, Brotherhood, and High Standards",
        readTime: "3 min",
        xpReward: 65,
        storyIntro: {
          speaker: "The Keeper",
          speakerRole: "Guardian of Regent Lore",
          dialogue: "A club without a distinct culture is just another meeting on a calendar. Regent culture is warm, demanding of excellence, fiercely loyal to one another, and rooted in our heritage.",
        },
        sections: [
          {
            title: "The Pillars of Regent Culture",
            content: [
              "In RACSR, we balance two essential forces: warm, brotherly fellowship and strict professional excellence.",
              "When we assemble, we embrace each other as family; when we execute projects, we operate with the precision and discipline of top corporate leaders.",
            ],
            bulletPoints: [
              "Uncompromising Punctuality: Regent meetings start on the dot. Respecting people's time is our first sign of leadership.",
              "The Fellowship Circle: After every formal meeting concludes, members stay back for open conversations, laughter, and bonding.",
              "Empowering Every Voice: Even the newest prospect explorer is encouraged to share ideas and take ownership of project tasks.",
              "Regent Pride: We wear our club colors and pins with pride, representing Seethawaka with honor across the district.",
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
        id: "lesson-3-3",
        chapterId: "loc-regent-keep",
        lessonNumber: 3,
        title: "Signature Club Initiatives",
        subtitle: "Ran Hewisi, Momentum, and Clean Sri Lanka",
        readTime: "3 min",
        xpReward: 70,
        storyIntro: {
          speaker: "The Keeper",
          speakerRole: "Guardian of Regent Lore",
          dialogue: "Look upon the battle banners in the hall of champions. Each represents a signature project that has made waves across our community and the district. Here are the flagships of RACSR.",
        },
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
          kai: "Partnering with the Rotary Club of Seethawaka or corporate sponsors can double or triple the budget of your community initiatives.",
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
};

export function getChapterData(chapterId: string): ChapterDetails | undefined {
  return CHAPTERS_DATA[chapterId];
}

export function getAllChaptersData(): ChapterDetails[] {
  return Object.values(CHAPTERS_DATA);
}
