export interface RealmLocation {
  id: string;
  chapterNumber: number; // 0 for Prologue, 1-9 for Chapters
  isPrologue?: boolean;
  chapterLabel: string; // "PROLOGUE" or "CHAPTER 1", etc.
  chapterTitle: string; // Thematic journey title: "The Regent Odyssey", etc.
  worldName: string; // Physical map location: "Regent Keep", etc.
  atlasName?: string; // Canonical Atlas location name (1 to 8)
  atlasIndex?: number; // 1 to 8 for the 8 canonical Atlas locations
  fogDescription?: string; // Atmospheric description when shrouded in fog
  goldenEmblemTitle?: string; // Ceremonial golden emblem title upon completion
  regionTitle: string;
  seethawakaInspiration: string;
  purpose: string;
  description: string;
  expandedLore?: string;
  visualTag: string;
  status: "COMPLETED" | "CURRENT" | "LOCKED";
  lessonsTotal: number;
  lessonsCompleted: number;
  nextLesson?: string;
  xpReward: number;
  badgeReward?: string;
  image: string;
  routeHref: string;
  npc: {
    name: string;
    role: string;
    quote: string;
  };
  coords: {
    x: number;
    y: number;
  };
  unlockRequirement?: string;
}

export interface AvenueRealm {
  id: string;
  name: string;
  category: "PRIMARY" | "SECONDARY";
  realmTitle: string;
  tagline: string;
  visualAtmosphere: string;
  exploredInLesson: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface MapSecret {
  id: string;
  name: string;
  type: "HERITAGE_LORE" | "SECRET_DISCOVERY" | "BOTANICAL_NOTE";
  title: string;
  description: string;
  coords: { x: number; y: number };
  rewardXp?: number;
}

export const elevenAvenueRealms: AvenueRealm[] = [
  // 4 PRIMARY AVENUES
  {
    id: "club",
    name: "Club Service",
    category: "PRIMARY",
    realmTitle: "THE HEARTH",
    tagline: "Fellowship, internal operations, meetings that move people, and camaraderie.",
    visualAtmosphere: "Warm lantern-lit stone hall, glowing central hearth, and round tables.",
    exploredInLesson: "Lesson 3-1 & Chapter 3",
    color: "text-blue-400",
    bgColor: "bg-blue-950/40",
    borderColor: "border-blue-800/60",
  },
  {
    id: "community",
    name: "Community Service",
    category: "PRIMARY",
    realmTitle: "HEARTLAND",
    tagline: "Sustainable community development addressing verified grassroots needs.",
    visualAtmosphere: "Lush botanical groves, community water wells, and village centers.",
    exploredInLesson: "Lesson 4-2: Heartland & The Green Trail",
    color: "text-emerald-400",
    bgColor: "bg-emerald-950/40",
    borderColor: "border-emerald-800/60",
  },
  {
    id: "international",
    name: "International Service",
    category: "PRIMARY",
    realmTitle: "FAR HARBOR",
    tagline: "Cross-border twin club partnerships, cultural diplomacy, and global peace.",
    visualAtmosphere: "River port with world flags, navigation maps, and illuminated sea bridges.",
    exploredInLesson: "Lesson 4-3: Far Harbor & Regional Bridges",
    color: "text-cyan-400",
    bgColor: "bg-cyan-950/40",
    borderColor: "border-cyan-800/60",
  },
  {
    id: "professional",
    name: "Professional Development",
    category: "PRIMARY",
    realmTitle: "THE FORGE",
    tagline: "Career growth, the CARE framework, public speaking, and executive readiness.",
    visualAtmosphere: "Master artisan workshop, polished anvils, and career blueprint tables.",
    exploredInLesson: "Lesson 4-4: The Forge & Alliance Market",
    color: "text-amber-400",
    bgColor: "bg-amber-950/40",
    borderColor: "border-amber-800/60",
  },

  // 7 SECONDARY AVENUES
  {
    id: "environmental",
    name: "Environmental Service",
    category: "SECONDARY",
    realmTitle: "THE GREEN TRAIL",
    tagline: "Conservation, climate awareness, waste segregation, and renewable solutions.",
    visualAtmosphere: "Canopy trail with solar water pumps, native saplings, and nature reserves.",
    exploredInLesson: "Lesson 4-2: Heartland & The Green Trail",
    color: "text-green-400",
    bgColor: "bg-green-950/40",
    borderColor: "border-green-800/60",
  },
  {
    id: "partnerships",
    name: "Partnerships",
    category: "SECONDARY",
    realmTitle: "ALLIANCE MARKET",
    tagline: "Strategic alliances with corporates, NGOs, and the Rotary family based on shared value.",
    visualAtmosphere: "Bustling trade pavilion with resource ledgers, partner crests, and blueprints.",
    exploredInLesson: "Lesson 4-4: The Forge & Alliance Market",
    color: "text-orange-400",
    bgColor: "bg-orange-950/40",
    borderColor: "border-orange-800/60",
  },
  {
    id: "membership",
    name: "Membership Development",
    category: "SECONDARY",
    realmTitle: "MEMBERSHIP GROVE",
    tagline: "Welcoming orientation, peer mentorship, member retention, and sustainable growth.",
    visualAtmosphere: "Nurtured grove of saplings where each member's journey is recorded.",
    exploredInLesson: "Lesson 4-6: Grand Arena & Membership Grove",
    color: "text-teal-400",
    bgColor: "bg-teal-950/40",
    borderColor: "border-teal-800/60",
  },
  {
    id: "pr",
    name: "Public Relations",
    category: "SECONDARY",
    realmTitle: "SIGNAL SPIRE",
    tagline: "Authentic storytelling, the VOICE framework, and trilingual communication.",
    visualAtmosphere: "Towering crystal beacon broadcasting verified truth across the valley.",
    exploredInLesson: "Lesson 4-5: Signal Spire & The Public Square",
    color: "text-purple-400",
    bgColor: "bg-purple-950/40",
    borderColor: "border-purple-800/60",
  },
  {
    id: "sports",
    name: "Sports & Recreational Activities",
    category: "SECONDARY",
    realmTitle: "GRAND ARENA",
    tagline: "Physical wellbeing, mental health, sportsmanship, and teamwork under pressure.",
    visualAtmosphere: "Open turf stadium, mountain trekking trail, and substance-free sportsmanship.",
    exploredInLesson: "Lesson 4-6: Grand Arena & Membership Grove",
    color: "text-rose-400",
    bgColor: "bg-rose-950/40",
    borderColor: "border-rose-800/60",
  },
  {
    id: "special_projects",
    name: "Special Projects",
    category: "SECONDARY",
    realmTitle: "THE PUBLIC SQUARE",
    tagline: "Innovative, high-visibility flagship initiatives with wide public reach.",
    visualAtmosphere: "Monumental city square showcasing transformative public impact projects.",
    exploredInLesson: "Lesson 4-5: Signal Spire & The Public Square",
    color: "text-yellow-400",
    bgColor: "bg-yellow-950/40",
    borderColor: "border-yellow-800/60",
  },
  {
    id: "regional_engagement",
    name: "Regional Engagement",
    category: "SECONDARY",
    realmTitle: "REGIONAL BRIDGES",
    tagline: "Cross-zonal collaboration and cultural unity across Sri Lanka & Maldives.",
    visualAtmosphere: "Interconnected highways and regional outposts uniting all district zones.",
    exploredInLesson: "Lesson 4-3: Far Harbor & Regional Bridges",
    color: "text-indigo-400",
    bgColor: "bg-indigo-950/40",
    borderColor: "border-indigo-800/60",
  },
];

// Backward-compatible alias for existing consumers
export const sevenAvenueRealms = elevenAvenueRealms;

export const realmLocations: RealmLocation[] = [
  {
    id: "loc-gateway",
    chapterNumber: 0,
    isPrologue: true,
    atlasIndex: 1,
    atlasName: "Hidden Gateway",
    chapterLabel: "CHAPTER 1",
    chapterTitle: "The Hidden Gateway",
    worldName: "Hidden Gateway",
    regionTitle: "Valley Threshold",
    seethawakaInspiration: "Inspired by Seethawaka river entryway and stone heritage archways",
    purpose: "Beginning & Prospect Onboarding",
    description: "The stone portal welcoming explorers into the Realm of Regent. A cobblestone bridge flanked by lanterns and maroon flags leads into the journey.",
    expandedLore: "The visual architecture draws artistic inspiration from the ancient river gateways and stone entryways that historically welcomed travelers along the Seethawaka river corridor.",
    visualTag: "Ancient Stone Archway",
    status: "CURRENT",
    lessonsTotal: 3,
    lessonsCompleted: 0,
    xpReward: 50,
    badgeReward: "INITIATE",
    fogDescription: "A gentle river morning mist clears away as your journey begins at the stone threshold.",
    goldenEmblemTitle: "Gateway Keystone Emblem",
    image: "/assets/pixel/ui/chapter_cards/card_01_hidden_gateway.jpg",
    routeHref: "/journey/chapter-1",
    npc: {
      name: "Gatekeeper Aaron",
      role: "Portal Guardian",
      quote: "“Every grand expedition begins with a single step across the threshold of service.”",
    },
    coords: { x: 16, y: 88 },
  },
  {
    id: "loc-rotary-roots",
    chapterNumber: 1,
    chapterLabel: "CHAPTER 1",
    chapterTitle: "Rotary Roots",
    worldName: "Rotary Roots",
    regionTitle: "Sacred Botanical Canopy",
    seethawakaInspiration: "Inspired by Seethawaka Botanical Garden (Ilangakoon)",
    purpose: "Discover Rotary International & Core Values",
    description: "A lush botanical grove where ancient banyan roots and lotus waterways frame the timeless philosophy of 'Service Above Self'.",
    expandedLore: "Visual inspiration: The vibrant flowering pathways and shaded banyan groves of the Seethawaka Botanical Garden in Avissawella, representing the deep roots of the Rotary movement.",
    visualTag: "Giant Banyan & Botanical Shrines",
    status: "LOCKED",
    lessonsTotal: 4,
    lessonsCompleted: 0,
    nextLesson: "Service Above Self",
    xpReward: 150,
    badgeReward: "ROOT SEEKER",
    image: "/assets/pixel/worlds/backgrounds/01_hidden_gateway.jpg",
    routeHref: "/journey",
    npc: {
      name: "The Archivist",
      role: "Ancient Lore Keeper",
      quote: "“Before you branch into the world, your roots must run deep in service and truth.”",
    },
    coords: { x: 32, y: 76 },
  },
  {
    id: "loc-rotaract-harbor",
    chapterNumber: 2,
    chapterLabel: "CHAPTER 2",
    atlasIndex: 2,
    atlasName: "River of Legacy",
    chapterTitle: "The River of Legacy",
    worldName: "River of Legacy",
    regionTitle: "River Port Basin",
    seethawakaInspiration: "Inspired by the Kelani & Seethawaka river confluence",
    purpose: "Discover the Global Rotaract Movement & Regent Chronicle",
    description: "A lively river port with wooden docks, riverboats, and banners connecting Seethawaka Regent with the global fellowship.",
    expandedLore: "Visual inspiration: Historic inland waterways of Seethawaka, reimagined as a bustling harbor where ideas and partnerships embark across the globe.",
    visualTag: "Lantern River Port & Docks",
    status: "LOCKED",
    lessonsTotal: 3,
    lessonsCompleted: 0,
    xpReward: 150,
    badgeReward: "VOYAGER",
    fogDescription: "Dense river fog cloaks the wooden docks and harbor waterways of the Kelani basin.",
    goldenEmblemTitle: "Navigator's Astrolabe Emblem",
    image: "/assets/pixel/ui/chapter_cards/card_02_river_of_legacy.jpg",
    routeHref: "/journey/loc-rotaract-harbor",
    npc: {
      name: "Port Master Kael",
      role: "Harbor Navigator",
      quote: "“Our fleet sails on fellowship. Together with clubs worldwide, no horizon is too distant.”",
    },
    unlockRequirement: "Complete Chapter 1 (The Hidden Gateway)",
    coords: { x: 38, y: 78 },
  },
  {
    id: "loc-regent-keep",
    chapterNumber: 3,
    chapterLabel: "CHAPTER 3",
    atlasIndex: 3,
    atlasName: "Harbor of Connections",
    chapterTitle: "The Regent Odyssey",
    worldName: "Harbor of Connections",
    regionTitle: "Historic Mountain Bastion & Fellowship Hearth",
    seethawakaInspiration: "Inspired by King Rajasinghe I fortress ruins and heritage stonework",
    purpose: "Discover the Rotaract Club of Seethawaka Regent",
    description: "A cliffside stone fortress surrounded by waterfalls, celebrating club traditions, charter history, and Regent pride.",
    expandedLore: "Visual inspiration: The legendary 16th-century fortress ruins of the Seethawaka Kingdom, honoring the local cultural heritage that inspires RACSR's courage and dedication.",
    visualTag: "Rajasinghe Fortress Ruins & Castle",
    status: "LOCKED",
    lessonsTotal: 4,
    lessonsCompleted: 0,
    xpReward: 200,
    badgeReward: "REGENT PIONEER",
    fogDescription: "Thick highland clouds veil the ancient fortress ruins and fellowship bridges.",
    goldenEmblemTitle: "Regent Fortress Crest",
    image: "/assets/pixel/ui/chapter_cards/card_03_harbor_of_connections.jpg",
    routeHref: "/journey/loc-regent-keep",
    npc: {
      name: "The Keeper",
      role: "Guardian of Regent Lore",
      quote: "“Regent pride is built on action, fellowship, and unwavering commitment to our heritage.”",
    },
    unlockRequirement: "Complete Chapter 2 (River of Legacy)",
    coords: { x: 22, y: 56 },
  },
  {
    id: "loc-seven-realms",
    chapterNumber: 4,
    chapterLabel: "CHAPTER 4",
    atlasIndex: 4,
    atlasName: "Seven Realms Nexus",
    chapterTitle: "The Avenues of Action",
    worldName: "Seven Realms Nexus",
    regionTitle: "Celestial Observatory",
    seethawakaInspiration: "Inspired by the high highland ridges overlooking the expansive Seethawaka valley",
    purpose: "Explore the 11 Avenues of Action",
    description: "An enchanted celestial compass revealing the 11 distinct paths of service: 4 Primary anchors and 7 Secondary beacons.",
    expandedLore: "Visual inspiration: The highland observation ridges of Seethawaka, where cartographers chart paths of service across the valley.",
    visualTag: "11-Point Celestial Compass",
    status: "LOCKED",
    lessonsTotal: 6,
    lessonsCompleted: 0,
    xpReward: 350,
    badgeReward: "AVENUE MASTER",
    fogDescription: "Arcane twilight haze conceals the 11-point celestial compass and observation spires.",
    goldenEmblemTitle: "Celestial Star Compass",
    image: "/assets/pixel/ui/chapter_cards/card_04_seven_realms_nexus.jpg",
    routeHref: "/journey/loc-seven-realms",
    npc: {
      name: "Avenue Guide",
      role: "Celestial Cartographer",
      quote: "“Eleven distinct stars chart our course: four anchors guide our foundation, and seven beacons expand our reach.”",
    },
    unlockRequirement: "Complete Chapter 3 (Harbor of Connections)",
    coords: { x: 50, y: 60 },
  },
  {
    id: "loc-project-forge",
    chapterNumber: 5,
    chapterLabel: "CHAPTER 5",
    atlasIndex: 5,
    atlasName: "Project Forge",
    chapterTitle: "Project Forge",
    worldName: "Project Forge",
    regionTitle: "Watermill Workshop",
    seethawakaInspiration: "Inspired by traditional Seethawaka craft and industrial enterprise",
    purpose: "Learn Project Crafting & Execution",
    description: "An industrial workshop with waterwheels and planning boards where genuine community needs are hammered into sustainable solutions.",
    expandedLore: "Visual inspiration: The industrious spirit of traditional craftsman workshops and modern enterprises found across the Seethawaka industrial corridor.",
    visualTag: "Waterwheel, Anvil & Blueprint Desks",
    status: "LOCKED",
    lessonsTotal: 4,
    lessonsCompleted: 0,
    xpReward: 250,
    badgeReward: "MASTER BUILDER",
    fogDescription: "Industrial steam and heavy river vapor shroud the waterwheels and planning anvils.",
    goldenEmblemTitle: "Master Craftsman Hammer",
    image: "/assets/pixel/ui/chapter_cards/card_05_project_forge.jpg",
    routeHref: "/journey/loc-project-forge",
    npc: {
      name: "The Builder",
      role: "Master Project Crafter",
      quote: "“In the forge of service, passion meets discipline to create lasting community change.”",
    },
    unlockRequirement: "Complete Chapter 4 (Seven Realms Nexus)",
    coords: { x: 80, y: 52 },
  },
  {
    id: "loc-codewood",
    chapterNumber: 6,
    chapterLabel: "CHAPTER 6",
    chapterTitle: "The Regent Code",
    worldName: "Codewood",
    regionTitle: "Ancient Monolithic Grove",
    seethawakaInspiration: "Inspired by Puwarankanda & heritage forest reserves",
    purpose: "Club Culture, Ethics & The Regent Code",
    description: "A tranquil moonlit sanctuary with runic obelisks holding the secrets of conduct, the VOICE framework, and responsible AI ethics.",
    expandedLore: "Visual inspiration: The peaceful Puwarankanda forest reserves in Seethawaka, symbolizing quiet reflection, integrity, and ethical principles.",
    visualTag: "Glowing Rune Glade & Monoliths",
    status: "LOCKED",
    lessonsTotal: 4,
    lessonsCompleted: 0,
    xpReward: 200,
    badgeReward: "CODE BEARER",
    image: "/assets/pixel/worlds/backgrounds/06_grand_archive.jpg",
    routeHref: "/journey",
    npc: {
      name: "The Scholar",
      role: "Ethics Master",
      quote: "“Integrity is doing the right thing with honor, even when no one is watching.”",
    },
    unlockRequirement: "Complete Chapter 5 (Project Forge)",
    coords: { x: 28, y: 36 },
  },
  {
    id: "loc-grand-archive",
    chapterNumber: 7,
    chapterLabel: "CHAPTER 7",
    atlasIndex: 6,
    atlasName: "Grand Archive",
    chapterTitle: "Grand Archive",
    worldName: "Grand Archive",
    regionTitle: "Mountain-Carved Library",
    seethawakaInspiration: "Inspired by historical Seethawaka Kingdom manuscript halls",
    purpose: "ROTA 101 & Constitution Handbook",
    description: "An illuminated mountain library preserving Secretariat records, the Treasury of Trust, standing orders, and the ROTA 101 guide.",
    expandedLore: "Visual inspiration: Scholarly traditions and royal records of ancient Seethawaka, reimagined as a majestic grand archive of Rotaract knowledge.",
    visualTag: "Stained Glass Mountain Library",
    status: "LOCKED",
    lessonsTotal: 3,
    lessonsCompleted: 0,
    xpReward: 200,
    badgeReward: "SCHOLAR",
    fogDescription: "Silent mountain mist drifts through the high arched windows of the royal manuscript library.",
    goldenEmblemTitle: "Seal of the Grand Archivist",
    image: "/assets/pixel/ui/chapter_cards/card_06_grand_archive.jpg",
    routeHref: "/journey/loc-grand-archive",
    npc: {
      name: "Chief Librarian Vanya",
      role: "Master of Archives",
      quote: "“Knowledge of constitution and protocol empowers you to lead with clarity and confidence.”",
    },
    unlockRequirement: "Complete Chapter 5 (Project Forge)",
    coords: { x: 32, y: 34 },
  },
  {
    id: "loc-impact-frontier",
    chapterNumber: 8,
    chapterLabel: "CHAPTER 8",
    atlasIndex: 7,
    atlasName: "Impact Frontier",
    chapterTitle: "Impact Frontier",
    worldName: "Impact Frontier",
    regionTitle: "Expedition Grounds",
    seethawakaInspiration: "Inspired by living Seethawaka communities and tea estate trails",
    purpose: "Real Physical Meetings & Community Projects",
    description: "Active community expedition grounds where prospect learning transforms into real on-ground service, accurate documentation, and honest reporting.",
    expandedLore: "Visual inspiration: Rural hamlets, green tea plantation hills, and community spaces throughout the Seethawaka district where actual club projects take place.",
    visualTag: "Quest Campfire & Frontier Outposts",
    status: "LOCKED",
    lessonsTotal: 2,
    lessonsCompleted: 0,
    xpReward: 350,
    badgeReward: "TRAILBLAZER",
    fogDescription: "Expedition valley fog covers the green tea plantation trails and community outposts.",
    goldenEmblemTitle: "Trailblazer's Map Seal",
    image: "/assets/pixel/ui/chapter_cards/card_07_impact_frontier.jpg",
    routeHref: "/missions",
    npc: {
      name: "Expedition Scout Mira",
      role: "Field Scout Leader",
      quote: "“The real journey happens out here on the ground, working hand-in-hand with our communities.”",
    },
    unlockRequirement: "Complete Chapter 7 (Grand Archive)",
    coords: { x: 76, y: 28 },
  },
  {
    id: "loc-membership-citadel",
    chapterNumber: 9,
    chapterLabel: "CHAPTER 9",
    atlasIndex: 8,
    atlasName: "Regent Citadel",
    chapterTitle: "Regent Citadel",
    worldName: "Regent Citadel",
    regionTitle: "The High Royal Summit",
    seethawakaInspiration: "Inspired by the high summit landscapes of the Seethawaka mountain range",
    purpose: "Official Induction Pathway & Pinning",
    description: "The citadel perched upon the mountain summit where prospect explorers take the Regent Oath and receive the club pin.",
    expandedLore: "Visual inspiration: The crowning peaks of the Seethawaka highlands, symbolizing the pinnacle achievement of becoming a fully inducted member of RACSR.",
    visualTag: "Sky Peak Royal Citadel",
    status: "LOCKED",
    lessonsTotal: 2,
    lessonsCompleted: 0,
    xpReward: 500,
    badgeReward: "INDUCTED REGENT",
    fogDescription: "The highest mountain summit is guarded by an impenetrable cloud sea until the explorer proves their readiness.",
    goldenEmblemTitle: "Royal Crown of Regent",
    image: "/assets/pixel/ui/chapter_cards/card_08_regent_citadel.jpg",
    routeHref: "/profile",
    npc: {
      name: "High Regent",
      role: "Club President",
      quote: "“Welcome home, Regent. Wear your pin with honor and lead the future of service.”",
    },
    unlockRequirement: "Complete Chapter 8 (Impact Frontier)",
    coords: { x: 50, y: 12 },
  },
];

export const atlasLocations: RealmLocation[] = realmLocations
  .filter((loc) => loc.atlasIndex !== undefined)
  .sort((a, b) => (a.atlasIndex || 0) - (b.atlasIndex || 0));

export const mapSecrets: MapSecret[] = [
  {
    id: "secret-botanical",
    name: "Seethawaka Botanical Haven",
    type: "BOTANICAL_NOTE",
    title: "Seethawaka Botanical Haven",
    description: "Visual inspiration: The peaceful waterways and canopy of the Seethawaka Botanical Garden directly shaped the lush atmosphere of Rotary Roots.",
    coords: { x: 44, y: 72 },
    rewardXp: 5,
  },
  {
    id: "secret-ruins",
    name: "Rajasinghe Ancient Kingdom",
    type: "HERITAGE_LORE",
    title: "Rajasinghe Fortress Landmark",
    description: "Heritage inspiration: The 16th-century fortress ruins of the Seethawaka Kingdom inspired the stonework and maroon pride of Regent Keep.",
    coords: { x: 16, y: 48 },
    rewardXp: 5,
  },
  {
    id: "secret-scroll",
    name: "Ancient Charter Scroll",
    type: "SECRET_DISCOVERY",
    title: "Ancient Scroll of the Regents",
    description: "You uncovered a hidden parchment! 'Service is our compass, Seethawaka is our heartbeat.'",
    coords: { x: 40, y: 26 },
    rewardXp: 10,
  },
];
