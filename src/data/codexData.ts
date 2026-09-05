export interface CodexArticle {
  id: string;
  title: string;
  category: "START_HERE" | "AVENUES" | "CONDUCT" | "DIGITAL_AI" | "SECRETARIAT_RMIS" | "TREASURY" | "MEMBERSHIP" | "OFFICER_ARCHIVE";
  badgeLabel: string;
  summary: string;
  sourceCitation: string;
  contentParagraphs: string[];
  keyPrinciples?: string[];
  operationalNotes?: string[];
  statusNotice?: string;
}

export const CODEX_SECTIONS = [
  { id: "all", label: "All Records", icon: "BookOpen" },
  { id: "START_HERE", label: "Start Here", icon: "Compass" },
  { id: "AVENUES", label: "11 Avenues of Action", icon: "Stars" },
  { id: "CONDUCT", label: "Conduct & Protocol", icon: "Shield" },
  { id: "DIGITAL_AI", label: "Digital & AI Ethics", icon: "Cpu" },
  { id: "SECRETARIAT_RMIS", label: "Secretariat & RMIS", icon: "Database" },
  { id: "TREASURY", label: "Treasury of Trust", icon: "Scale" },
  { id: "MEMBERSHIP", label: "Membership Pathway", icon: "Users" },
  { id: "OFFICER_ARCHIVE", label: "Officer Archive", icon: "Lock" },
] as const;

export const CODEX_ARTICLES: CodexArticle[] = [
  // --- 1. START HERE ---
  {
    id: "codex-spirit-2026",
    title: "The Spirit of Rotaract & 2026–27 District Focus",
    category: "START_HERE",
    badgeLabel: "FOUNDATION",
    summary: "The core mission of Rotaract in Rotary International District 3220 (Sri Lanka & Maldives).",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, Core Spirit, pp. 4–5.",
    contentParagraphs: [
      "Rotaract is a global platform where leadership is forged through selfless service, friendships are built through common purpose, and young professionals discover their power to spark meaningful change.",
      "In District 3220 (Sri Lanka & Maldives), Rotaract stands at the vital intersection of community service, professional leadership development, and global citizenship. Members are encouraged to match enthusiasm with direction, creativity with consistency, and ambition with accountability.",
      "The official theme for the 2026–27 Rotary Year is 'Igniting Possibilities & Inspiring Change'—challenging every club and explorer to move beyond routine activities toward transformative, lasting impact.",
    ],
    keyPrinciples: [
      "Learn → Serve → Lead with integrity and discipline.",
      "Friendships forged through shared purpose outlast all obstacles.",
      "Collaboration between clubs, districts, and the wider Rotary family multiplies community impact.",
    ],
  },
  {
    id: "codex-four-way-notice",
    title: "The Four-Way Test & Historical Roots [STATUS NOTICE]",
    category: "START_HERE",
    badgeLabel: "SOURCE REQUIRED",
    summary: "Status notice regarding Rotary historical deep-dives and the Four-Way Test wording.",
    sourceCitation: "District 3220 Handbook references ethical integrity; exact official text requires official Rotary International source.",
    statusNotice: "REQUIRES OFFICIAL ROTARY INTERNATIONAL SOURCE — Excluded from mandatory Curriculum V2 testing until official source verification.",
    contentParagraphs: [
      "The Rotaract Information Handbook 2026–27 emphasizes the core ethical principles of Rotary and Rotaract: truth, fairness, goodwill, fellowship, and beneficial community service.",
      "To uphold absolute factual accuracy, the full official wording of the historical Four-Way Test and granular 1905–1968 organizational chronologies are categorized as requiring direct verified Rotary International source documentation rather than generated from memory.",
      "In the prospect curriculum, ethical service is taught through verified behavioral standards: empathetic community assessment, respect, accountability, and the People of Action cycle.",
    ],
  },

  // --- 2. THE 11 AVENUES OF ACTION ---
  {
    id: "codex-avenues-overview",
    title: "The Official 2026–27 11-Avenue Architecture",
    category: "AVENUES",
    badgeLabel: "STRUCTURE",
    summary: "Clear distinction between the 4 Primary Avenues and 7 Secondary Avenues.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, Avenue Structure, p. 17.",
    contentParagraphs: [
      "District 3220 organizes service into 11 distinct Avenue identities, categorized into 4 Primary Avenues and 7 Secondary Avenues. All 11 avenues maintain independent identities and unique areas of focus.",
      "Primary Avenues represent the historical pillars of Rotaract activity: Club Service, Community Service, International Service, and Professional Development.",
      "Secondary Avenues provide specialized avenues of impact: Environmental Service, Partnerships, Membership Development, Public Relations, Sports & Recreational Activities, Special Projects, and Regional Engagement.",
    ],
    keyPrinciples: [
      "4 Primary Avenues: Core pillars of club life and community engagement.",
      "7 Secondary Avenues: Specialized vehicles expanding club reach, sustainability, and wellbeing.",
      "Finance / Treasury is an administrative stewardship function, NOT an avenue of service.",
    ],
  },
  {
    id: "codex-avenue-club-service",
    title: "Primary Avenue: Club Service",
    category: "AVENUES",
    badgeLabel: "PRIMARY AVENUE",
    summary: "The heartbeat of the club: fellowship, operations, belonging, and leadership growth.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, Club Service, pp. 28–36.",
    contentParagraphs: [
      "Club Service supports internal operations, meeting coordination, member engagement, and camaraderie. It is the foundation that keeps members united, inspired, and organized.",
      "Club Service is not merely administrative paperwork—it creates an environment of belonging where every member is mentored, valued, and given tangible leadership responsibilities.",
    ],
    keyPrinciples: [
      "Nurture an inclusive and welcoming club culture.",
      "Coordinate engaging General Assemblies with clear agendas.",
      "Foster genuine camaraderie and lifelong friendships.",
    ],
  },
  {
    id: "codex-avenue-community-service",
    title: "Primary Avenue: Community Service",
    category: "AVENUES",
    badgeLabel: "PRIMARY AVENUE",
    summary: "Sustainable, community-centered development addressing real local needs.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, Community Service, pp. 37–50.",
    contentParagraphs: [
      "Community Service is a voluntary effort to create meaningful change in local communities through innovation and sustainability. It stays true to the motto of 'Service Above Self'.",
      "District 3220 strongly urges clubs to move beyond short-term relief toward long-term, scalable, and replicable initiatives that cultivate local community ownership.",
    ],
    keyPrinciples: [
      "Listen first: conduct grounded needs assessments with community stakeholders.",
      "Design for sustainability so benefits outlast the club's direct presence.",
      "Measure actual community outcomes rather than just counted project outputs.",
    ],
  },
  {
    id: "codex-avenue-international-service",
    title: "Primary Avenue: International Service",
    category: "AVENUES",
    badgeLabel: "PRIMARY AVENUE",
    summary: "Cross-border collaboration, Twin Club relationships, and cultural diplomacy.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, International Service, pp. 51–66.",
    contentParagraphs: [
      "International Service creates opportunities for young leaders to collaborate globally, build cross-border friendships, and strengthen international goodwill.",
      "The handbook highlights the difference between International Service (active joint humanitarian action across borders) and International Understanding (cultural exchange and dialogue).",
    ],
    keyPrinciples: [
      "Twin Club agreements must be rooted in active, meaningful collaboration.",
      "Promote Sri Lankan and Maldivian cultural identity on global youth stages.",
      "Foster peace, mutual understanding, and global citizenship.",
    ],
  },
  {
    id: "codex-avenue-professional-development",
    title: "Primary Avenue: Professional Development",
    category: "AVENUES",
    badgeLabel: "PRIMARY AVENUE",
    summary: "Equipping young leaders through the CARE framework and career mentorship.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, Professional Development, pp. 67–76.",
    contentParagraphs: [
      "Professional Development focuses on equipping young professionals with actionable skills, strategic thinking, executive grooming, and ethical leadership.",
      "The official CARE framework guides career preparedness: Clarity (knowing oneself), Ability (building concrete skills), Readiness (professional mindset), and Exposure (real-world network opportunities).",
    ],
    keyPrinciples: [
      "Develop public speaking, critical thinking, and project management skills.",
      "Facilitate CV clinics, interview readiness, and professional mentorship.",
      "Instill professional ethics and workplace decorum.",
    ],
  },
  {
    id: "codex-avenue-environmental-service",
    title: "Secondary Avenue: Environmental Service",
    category: "AVENUES",
    badgeLabel: "SECONDARY AVENUE",
    summary: "Conservation, climate awareness, waste management, and ecological sustainability.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, p. 17 & pp. 37–50.",
    contentParagraphs: [
      "Environmental Service is recognized as a dedicated Secondary Avenue for 2026–27. It focuses on environmental responsibility, ecosystem conservation, renewable energy, and climate literacy.",
      "Clubs are encouraged to integrate sustainable environmental practices into all community initiatives, reducing waste and protecting natural biodiversity.",
    ],
    keyPrinciples: [
      "Promote waste segregation and conservation in community spaces.",
      "Champion climate literacy and responsible natural resource stewardship.",
      "Incorporate ecological sustainability into project design.",
    ],
  },
  {
    id: "codex-avenue-partnerships",
    title: "Secondary Avenue: Partnerships",
    category: "AVENUES",
    badgeLabel: "SECONDARY AVENUE",
    summary: "Strategic collaborations built on shared value, trust, and mutual impact.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, Partnerships, pp. 85–91.",
    contentParagraphs: [
      "Partnerships expand project scale, technical competence, and reach. Potential allies include corporates, SMEs, NGOs, community elders, and the wider Rotary family.",
      "Partnerships are far more than financial sponsorship: partners provide technical guidance, venues, logistics, equipment, community access, and mentorship.",
    ],
    keyPrinciples: [
      "Base collaborations on genuine shared value and transparent agreements.",
      "Clearly articulate project impact and accountability to corporate/NGO allies.",
      "Safeguard Rotaract values and community trust in every partnership.",
    ],
  },
  {
    id: "codex-avenue-pr",
    title: "Secondary Avenue: Public Relations",
    category: "AVENUES",
    badgeLabel: "SECONDARY AVENUE",
    summary: "Authentic digital storytelling, brand integrity, and the VOICE framework.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, Public Relations, pp. 92–130.",
    contentParagraphs: [
      "Public Relations enhances the credibility and visibility of Rotaract through purposeful communication that explains why initiatives exist and why impact matters.",
      "PR is anchored by the VOICE framework: Verified, Open & inclusive, Impact-driven, Consistent, and Engaging. Official captions must be published trilingually in English, Sinhala, and Tamil.",
    ],
    keyPrinciples: [
      "Use official, undistorted Rotaract logos with adequate contrast and spacing.",
      "Show human-centered, authentic storytelling over repetitive vector art.",
      "Uphold trilingual inclusivity across public publications.",
    ],
  },
  {
    id: "codex-avenue-sports",
    title: "Secondary Avenue: Sports & Recreational Activities",
    category: "AVENUES",
    badgeLabel: "SECONDARY AVENUE",
    summary: "Physical and mental wellbeing, sportsmanship, and teamwork under pressure.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, Sports & Recreation, pp. 77–84.",
    contentParagraphs: [
      "This avenue fosters member wellbeing, physical health, fair play, and camaraderie through competitive sports, e-sports, outdoor hikes, and recreational team challenges.",
      "Safety, fair play, and substance-free sporting environments are paramount to protecting member health and club reputation.",
    ],
    keyPrinciples: [
      "Encourage an active, healthy, and balanced lifestyle.",
      "Build resilience, teamwork, and fellowship under competitive pressure.",
      "Maintain health and safety standards at all sporting fixtures.",
    ],
  },
  {
    id: "codex-avenue-special-projects",
    title: "Secondary Avenue: Special Projects",
    category: "AVENUES",
    badgeLabel: "SECONDARY AVENUE",
    summary: "High-visibility, innovative initiatives that resonate beyond the Rotaract network.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, Special Projects, pp. 137–142.",
    contentParagraphs: [
      "Special Projects focuses on large-scale, innovative initiatives that achieve high public visibility and deliver meaningful outcomes for the broader public.",
      "Impact should not remain confined within club walls; special projects demonstrate the transformative energy of Rotaract to external civic communities.",
    ],
    keyPrinciples: [
      "Tackle multi-dimensional community challenges with bold innovation.",
      "Foster multi-stakeholder participation and wide public reach.",
      "Deliver measurable, scalable, and lasting community results.",
    ],
  },
  {
    id: "codex-avenue-regional-engagement",
    title: "Secondary Avenue: Regional Engagement",
    category: "AVENUES",
    badgeLabel: "SECONDARY AVENUE",
    summary: "Cross-zonal unity, regional fellowship, and cultural exchange across District 3220.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, Regional Engagement, pp. 131–136.",
    contentParagraphs: [
      "Regional Engagement strengthens fellowship, collaboration, and mutual understanding across all zones of Sri Lanka and the Maldives.",
      "Rotaract is larger than any individual club. Inter-zonal visits and joint initiatives connect young leaders from diverse regional backgrounds.",
    ],
    keyPrinciples: [
      "Participate actively in cross-zonal initiatives and district assemblies.",
      "Build trust and cultural understanding across all communities.",
      "Ensure equitable representation and inclusive collaboration.",
    ],
  },
  {
    id: "codex-avenue-membership-dev",
    title: "Secondary Avenue: Membership Development",
    category: "AVENUES",
    badgeLabel: "SECONDARY AVENUE",
    summary: "Orientation, mentorship, member engagement, and sustainable club growth.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, Membership Development, pp. 143–164.",
    contentParagraphs: [
      "Membership Development guides prospects from initial curiosity to active, passionate membership. It oversees recruitment, orientation, mentorship, and retention.",
      "A healthy club does not merely recruit members; it creates pathways where every individual feels supported, engaged, and empowered to contribute.",
    ],
    keyPrinciples: [
      "Provide thorough, welcoming orientation to prospective members.",
      "Pair new members with experienced peer mentors.",
      "Track engagement and ensure every member has a role in club activities.",
    ],
  },

  // --- 3. CONDUCT & PROTOCOL ---
  {
    id: "codex-conduct-protocol",
    title: "Professional Conduct, Decorum & Substance Policy",
    category: "CONDUCT",
    badgeLabel: "STANDARDS",
    summary: "Punctuality, respectful communication, meeting decorum, and substance prohibitions.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, Best Practices, pp. 6–10, 113.",
    contentParagraphs: [
      "Rotaractors represent the global movement in public. Professional conduct is expected at all meetings, projects, assemblies, and official communications.",
      "Punctuality is a direct reflection of respect. If unavoidably delayed, members are expected to communicate responsibly in advance.",
      "Event standards strictly prohibit illegal or legal narcotics, cigarettes, vapes, and similar prohibited substances at Rotaract meetings, events, and project sites.",
    ],
    keyPrinciples: [
      "Silence mobile devices during formal meetings and assembly proceedings.",
      "Maintain respectful, inclusive language; zero tolerance for harassment or verbal abuse.",
      "Follow event attire guidelines: Formal, Smart Casual, or Project Gear according to context.",
    ],
  },

  // --- 4. DIGITAL & AI ETHICS ---
  {
    id: "codex-digital-ai-ethics",
    title: "District 3220 Responsible Digital & AI Guidelines",
    category: "DIGITAL_AI",
    badgeLabel: "AI ETHICS",
    summary: "Official principles for assistive AI usage, human oversight, and data privacy.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, AI Guidelines, pp. 115–121.",
    contentParagraphs: [
      "AI is recognized strictly as an assistive tool, not an autonomous authority. Human oversight and accountability are mandatory for all public publications.",
      "AI-assisted text, translations, and summaries must be manually reviewed and edited for tone, factual accuracy, cultural sensitivity, and brand integrity.",
      "Strict prohibitions: never fabricate beneficiary testimonials, impact metrics, or quotes. Never create synthetic event photos or deepfakes to simulate project attendance.",
    ],
    keyPrinciples: [
      "Human beings retain ultimate accountability for all published materials.",
      "Never input private member personal data or confidential financial ledgers into public AI tools.",
      "Audit generated communications for cultural sensitivity, bias, and truth.",
    ],
  },

  // --- 5. SECRETARIAT & RMIS ---
  {
    id: "codex-secretariat-rmis",
    title: "Secretariat Records & The RMIS Platform",
    category: "SECRETARIAT_RMIS",
    badgeLabel: "RECORDS",
    summary: "Why institutional memory matters and the official role of RMIS in District 3220.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, Secretariat & RMIS, pp. 11–18, 147–154.",
    contentParagraphs: [
      "The Secretariat preserves the institutional memory of the club through meeting minutes, attendance registers, official correspondence, and annual reporting.",
      "The Rotaract Management Information System (RMIS) is the official District 3220 digital platform for reporting, membership management, tracking club progress, project/monthly/financial report submissions, District event registration, attendance logging, and citation tracking.",
      "Accurate records prevent duplicated effort, protect historical credibility, and ensure seamless continuity across annual board transitions.",
    ],
    keyPrinciples: [
      "Accurate meeting minutes provide legal and historical protection for the club.",
      "RMIS submissions must reflect verified facts and honest evidence.",
      "Timely reporting preserves club standing and eligibility for District citations.",
    ],
  },

  // --- 6. TREASURY OF TRUST ---
  {
    id: "codex-treasury-trust",
    title: "Treasury of Trust: Financial Accountability",
    category: "TREASURY",
    badgeLabel: "ACCOUNTABILITY",
    summary: "Managing public and member funds with transparency, budgets, and receipts.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, Treasury Guidelines, pp. 19–27.",
    contentParagraphs: [
      "Managing funds in Rotaract is a sacred public trust. The Treasurer and Board are responsible for transparent records, timely reporting, and accurate receipts.",
      "The handbook recommends a clear separation of administrative finances (such as membership dues) and community project funds, maintained through distinct ledgers or accounts.",
      "Budgets must be structured before committing expenses, and supporting receipts must be archived for all club expenditures.",
    ],
    keyPrinciples: [
      "Clear separation of administrative dues from public community project funds.",
      "Every expenditure requires a valid receipt and supporting documentation.",
      "Financial transparency protects the club against disputes and preserves public trust.",
    ],
  },

  // --- 7. MEMBERSHIP PATHWAY ---
  {
    id: "codex-membership-pathway",
    title: "Membership Status vs. The RACSR Pathway",
    category: "MEMBERSHIP",
    badgeLabel: "INDUCTION",
    summary: "Universal District 3220 membership categories compared with the Seethawaka Regent pathway.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, pp. 144–150 & RACSR Club Bylaws.",
    contentParagraphs: [
      "The District 3220 Handbook establishes universal membership categories: Prospective Member (shown interest, under observation, participates in activities), Active Member (fully inducted, fulfills club responsibilities, pays dues), Inactive Member, and Member in Good Standing.",
      "The handbook explicitly recognizes that individual clubs establish their own active membership criteria.",
      "The Rotaract Club of Seethawaka Regent requires its specific 5-point pathway: (1) Gateway Prologue + Chapters 1–8 required curriculum, (2) 2 verified meetings, (3) 2 verified projects, (4) Sergeant-at-Arms/officer verification, and (5) Board Review and confirmation.",
    ],
    keyPrinciples: [
      "District handbook defines universal categories; individual clubs define active criteria.",
      "Membership readiness requires both digital knowledge mastery and physical participation.",
      "Induction is not a final milestone—it marks the beginning of active leadership.",
    ],
  },

  // --- 8. OFFICER ARCHIVE ---
  {
    id: "codex-officer-archive",
    title: "Officer Archive & Governance Reference (Level C)",
    category: "OFFICER_ARCHIVE",
    badgeLabel: "GOVERNANCE",
    summary: "Reference guides and templates for future Presidents, Secretaries, and Treasurers.",
    sourceCitation: "Rotaract Information Handbook 2026–27, RID 3220, Annexures & Governance Guidelines.",
    contentParagraphs: [
      "This section contains administrative reference links for elected club officials and avenue directors. Reading these documents is optional for prospect explorers.",
      "Includes: Standard Rotaract Club Constitution, Recommended Club Bylaws, District 3220 Citation Guidelines, Monthly Reporting Deadlines, and Financial Handover Protocols.",
    ],
    operationalNotes: [
      "Standard Rotaract Club Constitution & Bylaws (Reference Annexure A).",
      "District Citation Scorecard & Eligibility Criteria (Reference Annexure B).",
      "Official PR Brand Guidelines & Typography Standards (Reference Annexure C).",
    ],
  },
];
