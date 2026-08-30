export interface RealmLocation {
  id: string;
  chapterNumber: number; // 0 for Prologue, 1-9 for Chapters
  isPrologue?: boolean;
  chapterLabel: string; // "PROLOGUE" or "CHAPTER 1", etc.
  chapterTitle: string; // Thematic journey title: "The Regent Odyssey", etc.
  worldName: string; // Physical map location: "Regent Keep", etc.
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
  realmTitle: string;
  tagline: string;
  visualAtmosphere: string;
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

export const sevenAvenueRealms: AvenueRealm[] = [
  {
    id: "community",
    name: "Community Service",
    realmTitle: "HEARTLAND",
    tagline: "Sustainable projects, village upliftment, and local health initiatives.",
    visualAtmosphere: "Lush botanical groves, flowering pathways, and community water springs.",
    color: "text-emerald-400",
    bgColor: "bg-emerald-950/40",
    borderColor: "border-emerald-800/60",
  },
  {
    id: "club",
    name: "Club Service",
    realmTitle: "THE HEARTH",
    tagline: "Brotherhood, member bonding, general assemblies, and club administration.",
    visualAtmosphere: "Warm lantern-lit guild hall, glowing central hearth, and round tables.",
    color: "text-blue-400",
    bgColor: "bg-blue-950/40",
    borderColor: "border-blue-800/60",
  },
  {
    id: "professional",
    name: "Professional Development",
    realmTitle: "THE FORGE",
    tagline: "Leadership mastery, career growth, public speaking, and skill workshops.",
    visualAtmosphere: "Master craftsman workshop, blueprints, and polished anvils.",
    color: "text-amber-400",
    bgColor: "bg-amber-950/40",
    borderColor: "border-amber-800/60",
  },
  {
    id: "international",
    name: "International Service",
    realmTitle: "FAR HARBOR",
    tagline: "Cross-border twin club partnerships, global peace, and cultural exchanges.",
    visualAtmosphere: "River port with merchant ships, world flags, and glowing lighthouses.",
    color: "text-cyan-400",
    bgColor: "bg-cyan-950/40",
    borderColor: "border-cyan-800/60",
  },
  {
    id: "pr",
    name: "Public Relations",
    realmTitle: "SIGNAL SPIRE",
    tagline: "Digital storytelling, content creation, social branding, and visual outreach.",
    visualAtmosphere: "Crystal broadcast tower atop misty ridges, banners, and quill desks.",
    color: "text-purple-400",
    bgColor: "bg-purple-950/40",
    borderColor: "border-purple-800/60",
  },
  {
    id: "sports",
    name: "Sports & Recreation",
    realmTitle: "GRAND ARENA",
    tagline: "Cricket tournaments, hiking treks across Seethawaka, e-sports, and fitness.",
    visualAtmosphere: "Open stadium with cheering spectator stands, torchlights, and pennants.",
    color: "text-red-400",
    bgColor: "bg-red-950/40",
    borderColor: "border-red-800/60",
  },
  {
    id: "finance",
    name: "Finance",
    realmTitle: "TREASURY QUARTER",
    tagline: "Fundraising galas, sponsorship acquisition, budget mastery, and trade bazaars.",
    visualAtmosphere: "Gilded merchant bazaar, gold vault, ledger tables, and trading stalls.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-950/40",
    borderColor: "border-yellow-800/60",
  },
];

export const realmLocations: RealmLocation[] = [
  {
    id: "loc-gateway",
    chapterNumber: 0,
    isPrologue: true,
    chapterLabel: "PROLOGUE",
    chapterTitle: "The Gateway",
    worldName: "The Gateway",
    regionTitle: "Valley Threshold",
    seethawakaInspiration: "Inspired by Seethawaka river entryway and stone heritage archways",
    purpose: "Beginning & Prospect Onboarding",
    description: "The stone portal welcoming explorers into the Realm of Regent. A cobblestone bridge flanked by lanterns and maroon flags leads into the journey.",
    expandedLore: "The visual architecture draws artistic inspiration from the ancient river gateways and stone entryways that historically welcomed travelers along the Seethawaka river corridor.",
    visualTag: "Ancient Stone Archway",
    status: "COMPLETED",
    lessonsTotal: 2,
    lessonsCompleted: 2,
    xpReward: 50,
    badgeReward: "INITIATE",
    image: "/images/realm_of_regent_hero.jpg",
    routeHref: "/journey",
    npc: {
      name: "Gatekeeper Aaron",
      role: "Portal Guardian",
      quote: "“Every grand expedition begins with a single step across the threshold of service.”",
    },
    coords: { x: 18, y: 90 },
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
    status: "CURRENT",
    lessonsTotal: 4,
    lessonsCompleted: 2,
    nextLesson: "Service Above Self",
    xpReward: 150,
    badgeReward: "ROOT SEEKER",
    image: "/images/rotary_roots.jpg",
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
    chapterTitle: "Rotaract Harbor",
    worldName: "Rotaract Harbor",
    regionTitle: "River Port Basin",
    seethawakaInspiration: "Inspired by the Kelani & Seethawaka river confluence",
    purpose: "Discover the Global Rotaract Movement",
    description: "A lively river port with wooden docks, riverboats, and banners connecting Seethawaka Regent with the global fellowship.",
    expandedLore: "Visual inspiration: Historic inland waterways of Seethawaka, reimagined as a bustling harbor where ideas and partnerships embark across the globe.",
    visualTag: "Lantern River Port & Docks",
    status: "LOCKED",
    lessonsTotal: 3,
    lessonsCompleted: 0,
    xpReward: 150,
    badgeReward: "VOYAGER",
    image: "/images/chapter3_realms.jpg",
    routeHref: "/journey",
    npc: {
      name: "Port Master Kael",
      role: "Harbor Navigator",
      quote: "“Our fleet sails on fellowship. Together with clubs worldwide, no horizon is too distant.”",
    },
    unlockRequirement: "Complete Chapter 1 (Rotary Roots)",
    coords: { x: 62, y: 80 },
  },
  {
    id: "loc-regent-keep",
    chapterNumber: 3,
    chapterLabel: "CHAPTER 3",
    chapterTitle: "The Regent Odyssey",
    worldName: "Regent Keep",
    regionTitle: "Historic Mountain Bastion",
    seethawakaInspiration: "Inspired by King Rajasinghe I fortress ruins and heritage stonework",
    purpose: "Discover the Rotaract Club of Seethawaka Regent",
    description: "A cliffside stone fortress surrounded by waterfalls, celebrating club traditions, charter history, and Regent pride.",
    expandedLore: "Visual inspiration: The legendary 16th-century fortress ruins of the Seethawaka Kingdom, honoring the local cultural heritage that inspires RACSR's courage and dedication.",
    visualTag: "Rajasinghe Fortress Ruins & Castle",
    status: "LOCKED",
    lessonsTotal: 3,
    lessonsCompleted: 0,
    xpReward: 200,
    badgeReward: "REGENT PIONEER",
    image: "/images/chapter2_odyssey.jpg",
    routeHref: "/journey",
    npc: {
      name: "The Keeper",
      role: "Guardian of Regent Lore",
      quote: "“Regent pride is built on action, fellowship, and unwavering commitment to our heritage.”",
    },
    unlockRequirement: "Complete Chapter 2 (Rotaract Harbor)",
    coords: { x: 24, y: 56 },
  },
  {
    id: "loc-seven-realms",
    chapterNumber: 4,
    chapterLabel: "CHAPTER 4",
    chapterTitle: "The Seven Realms of Service",
    worldName: "The Seven Realms",
    regionTitle: "Avenue Overworld Biomes",
    seethawakaInspiration: "Inspired by the dynamic service landscape of Seethawaka Regent",
    purpose: "Explore the 7 Avenues of Service",
    description: "An interconnected territory featuring the 7 avenues: Heartland, The Hearth, The Forge, Far Harbor, Signal Spire, Grand Arena, and Treasury Quarter.",
    expandedLore: "Visual inspiration: Diverse geographical landscapes across the Seethawaka valley, each thematic biome reflecting the unique energy of an avenue of service.",
    visualTag: "7 Themed Avenue Biomes",
    status: "LOCKED",
    lessonsTotal: 7,
    lessonsCompleted: 0,
    xpReward: 350,
    badgeReward: "AVENUE MASTER",
    image: "/images/chapter3_realms.jpg",
    routeHref: "/journey",
    npc: {
      name: "Avenue Guide",
      role: "Realm Navigator",
      quote: "“Every explorer has their element. From the Grand Arena to Treasury Quarter, where will your greatest passion ignite?”",
    },
    unlockRequirement: "Complete Chapter 3 (The Regent Odyssey)",
    coords: { x: 54, y: 58 },
  },
  {
    id: "loc-project-forge",
    chapterNumber: 5,
    chapterLabel: "CHAPTER 5",
    chapterTitle: "Project Forge",
    worldName: "Project Forge",
    regionTitle: "Watermill Workshop",
    seethawakaInspiration: "Inspired by traditional Seethawaka craft and industrial enterprise",
    purpose: "Learn Project Crafting & Execution",
    description: "An industrial workshop with waterwheels and planning boards where ideas are hammered into sustainable community projects.",
    expandedLore: "Visual inspiration: The industrious spirit of traditional craftsman workshops and modern enterprises found across the Seethawaka industrial corridor.",
    visualTag: "Waterwheel, Anvil & Blueprint Desks",
    status: "LOCKED",
    lessonsTotal: 3,
    lessonsCompleted: 0,
    xpReward: 250,
    badgeReward: "MASTER BUILDER",
    image: "/images/chapter4_forge.jpg",
    routeHref: "/journey",
    npc: {
      name: "The Builder",
      role: "Master Project Crafter",
      quote: "“In the forge of service, passion meets discipline to create lasting community change.”",
    },
    unlockRequirement: "Complete Chapter 4 (The Seven Realms)",
    coords: { x: 82, y: 52 },
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
    description: "A tranquil sanctuary with runic obelisks holding the secrets of parliamentary protocol, leadership standards, and ethics.",
    expandedLore: "Visual inspiration: The peaceful Puwarankanda forest reserves in Seethawaka, symbolizing quiet reflection, integrity, and ethical principles.",
    visualTag: "Glowing Rune Glade & Monoliths",
    status: "LOCKED",
    lessonsTotal: 3,
    lessonsCompleted: 0,
    xpReward: 200,
    badgeReward: "CODE BEARER",
    image: "/images/rotary_roots.jpg",
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
    chapterTitle: "Grand Archive",
    worldName: "Grand Archive",
    regionTitle: "Mountain-Carved Library",
    seethawakaInspiration: "Inspired by historical Seethawaka Kingdom manuscript halls",
    purpose: "ROTA 101 & Constitution Handbook",
    description: "An illuminated mountain library preserving bylaws, district citations, standing orders, and the ROTA 101 guide.",
    expandedLore: "Visual inspiration: Scholarly traditions and royal records of ancient Seethawaka, reimagined as a majestic grand archive of Rotaract knowledge.",
    visualTag: "Stained Glass Mountain Library",
    status: "LOCKED",
    lessonsTotal: 3,
    lessonsCompleted: 0,
    xpReward: 200,
    badgeReward: "SCHOLAR",
    image: "/images/chapter2_odyssey.jpg",
    routeHref: "/rota101",
    npc: {
      name: "Chief Librarian Vanya",
      role: "Archive Keeper",
      quote: "“Knowledge of constitution and protocol empowers you to lead with clarity and confidence.”",
    },
    unlockRequirement: "Complete Chapter 6 (The Regent Code)",
    coords: { x: 56, y: 34 },
  },
  {
    id: "loc-impact-frontier",
    chapterNumber: 8,
    chapterLabel: "CHAPTER 8",
    chapterTitle: "Impact Frontier",
    worldName: "Impact Frontier",
    regionTitle: "Expedition Grounds",
    seethawakaInspiration: "Inspired by living Seethawaka communities and tea estate trails",
    purpose: "Real Physical Meetings & Community Projects",
    description: "Active community expedition grounds where prospect learning transforms into real on-ground service and fellowship.",
    expandedLore: "Visual inspiration: Rural hamlets, green tea plantation hills, and community spaces throughout the Seethawaka district where actual club projects take place.",
    visualTag: "Quest Campfire & Frontier Outposts",
    status: "LOCKED",
    lessonsTotal: 3,
    lessonsCompleted: 0,
    xpReward: 350,
    badgeReward: "TRAILBLAZER",
    image: "/images/mission_community.jpg",
    routeHref: "/missions",
    npc: {
      name: "Expedition Scout Mira",
      role: "Frontier Leader",
      quote: "“The real journey happens out here on the ground, working hand-in-hand with our communities.”",
    },
    unlockRequirement: "Complete Chapter 7 (Grand Archive)",
    coords: { x: 82, y: 28 },
  },
  {
    id: "loc-membership-citadel",
    chapterNumber: 9,
    chapterLabel: "CHAPTER 9",
    chapterTitle: "Membership Citadel",
    worldName: "Membership Citadel",
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
    image: "/images/realm_of_regent_hero.jpg",
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
