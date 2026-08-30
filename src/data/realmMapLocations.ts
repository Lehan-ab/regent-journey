export interface RealmLocation {
  id: string;
  number: number;
  name: string;
  regionTitle: string;
  seethawakaInspiration: string;
  purpose: string;
  description: string;
  visualTag: string;
  status: "COMPLETED" | "CURRENT" | "LOCKED";
  lessonsTotal: number;
  lessonsCompleted: number;
  nextLesson?: string;
  xpReward: number;
  badgeReward?: string;
  image: string;
  routeHref: string;
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
  },
  {
    id: "club",
    name: "Club Service",
    realmTitle: "THE HEARTH",
    tagline: "Brotherhood, member bonding, general assemblies, and club administration.",
    visualAtmosphere: "Warm lantern-lit guild hall, glowing central hearth, and round tables.",
    color: "text-blue-400",
  },
  {
    id: "professional",
    name: "Professional Development",
    realmTitle: "THE FORGE",
    tagline: "Leadership mastery, career growth, public speaking, and skill workshops.",
    visualAtmosphere: "Master craftsman workshop, blueprints, and polished anvils.",
    color: "text-amber-400",
  },
  {
    id: "international",
    name: "International Service",
    realmTitle: "FAR HARBOR",
    tagline: "Cross-border twin club partnerships, global peace, and cultural exchanges.",
    visualAtmosphere: "River port with merchant ships, world flags, and glowing lighthouses.",
    color: "text-cyan-400",
  },
  {
    id: "pr",
    name: "Public Relations",
    realmTitle: "SIGNAL SPIRE",
    tagline: "Digital storytelling, content creation, social branding, and visual outreach.",
    visualAtmosphere: "Crystal broadcast tower atop misty ridges, banners, and quill desks.",
    color: "text-purple-400",
  },
  {
    id: "sports",
    name: "Sports & Recreation",
    realmTitle: "GRAND ARENA",
    tagline: "Cricket tournaments, hiking treks across Seethawaka, e-sports, and fitness.",
    visualAtmosphere: "Open stadium with cheering spectator stands, torchlights, and pennants.",
    color: "text-red-400",
  },
  {
    id: "finance",
    name: "Finance",
    realmTitle: "TREASURY QUARTER",
    tagline: "Fundraising galas, sponsorship acquisition, budget mastery, and trade bazaars.",
    visualAtmosphere: "Gilded merchant bazaar, gold vault, ledger tables, and trading stalls.",
    color: "text-yellow-400",
  },
];

export const realmLocations: RealmLocation[] = [
  {
    id: "loc-gateway",
    number: 1,
    name: "THE GATEWAY",
    regionTitle: "Seethawaka Valley Threshold",
    seethawakaInspiration: "Seethawaka River Entryway & Stone Archways",
    purpose: "Beginning & Prospect Onboarding",
    description: "The ancient stone portal marking the entrance to the Realm of Regent. A cobblestone bridge flanked by lanterns and maroon flags leads into the forest.",
    visualTag: "Ancient Stone Archway",
    status: "COMPLETED",
    lessonsTotal: 2,
    lessonsCompleted: 2,
    xpReward: 50,
    badgeReward: "INITIATE",
    image: "/images/realm_of_regent_hero.jpg",
    routeHref: "/journey",
    coords: { x: 18, y: 90 },
  },
  {
    id: "loc-rotary-roots",
    number: 2,
    name: "ROTARY ROOTS",
    regionTitle: "Sacred Botanical Canopy",
    seethawakaInspiration: "Seethawaka Botanical Garden (Ilangakoon)",
    purpose: "Discover Rotary International & Core Values",
    description: "A lush tropical paradise inspired by the Seethawaka Botanical Gardens. Ancient banyan tree with glowing roots, lotus ponds, and flower paths where 'Service Above Self' is mastered.",
    visualTag: "Giant Banyan & Botanical Shrines",
    status: "CURRENT",
    lessonsTotal: 5,
    lessonsCompleted: 3,
    nextLesson: "Service Above Self",
    xpReward: 150,
    badgeReward: "ROOT SEEKER",
    image: "/images/rotary_roots.jpg",
    routeHref: "/journey",
    coords: { x: 32, y: 76 },
  },
  {
    id: "loc-rotaract-harbor",
    number: 3,
    name: "ROTARACT HARBOR",
    regionTitle: "Seethawaka River Basin",
    seethawakaInspiration: "Kelani & Seethawaka River Confluence",
    purpose: "Discover the Global Rotaract Movement",
    description: "A lively river port with wooden docks, riverboats, glowing lanterns, and colorful district banners connecting Seethawaka Regent with the global fellowship.",
    visualTag: "Lantern River Port & Docks",
    status: "LOCKED",
    lessonsTotal: 4,
    lessonsCompleted: 0,
    xpReward: 150,
    badgeReward: "VOYAGER",
    image: "/images/chapter3_realms.jpg",
    routeHref: "/journey",
    unlockRequirement: "Complete Chapter 1 (Rotary Roots)",
    coords: { x: 62, y: 80 },
  },
  {
    id: "loc-regent-keep",
    number: 4,
    name: "REGENT KEEP",
    regionTitle: "Historic Royal Bastion",
    seethawakaInspiration: "Ruins of King Rajasinghe I's Castle Fortress",
    purpose: "Discover the Rotaract Club of Seethawaka Regent",
    description: "A cliffside stone fortress surrounded by waterfalls and jungle growth, honoring the royal heritage of King Rajasinghe and the founding story of RACSR.",
    visualTag: "Rajasinghe Fortress Ruins & Castle",
    status: "LOCKED",
    lessonsTotal: 3,
    lessonsCompleted: 0,
    xpReward: 200,
    badgeReward: "REGENT PIONEER",
    image: "/images/chapter2_odyssey.jpg",
    routeHref: "/journey",
    unlockRequirement: "Complete Chapter 2 (Rotaract Harbor)",
    coords: { x: 24, y: 56 },
  },
  {
    id: "loc-seven-realms",
    number: 5,
    name: "THE SEVEN REALMS",
    regionTitle: "Avenue Overworld Territories",
    seethawakaInspiration: "The Seven Dynamic Pillars of RACSR",
    purpose: "Explore the 7 Avenues of Service",
    description: "A vast interconnected territory with 7 distinct biomes: Heartland (Community), The Hearth (Club), The Forge (Prof Dev), Signal Spire (PR), Far Harbor (International), Grand Arena (Sports), and Treasury Quarter (Finance).",
    visualTag: "7 Themed Avenue Biomes",
    status: "LOCKED",
    lessonsTotal: 7,
    lessonsCompleted: 0,
    xpReward: 350,
    badgeReward: "AVENUE MASTER",
    image: "/images/chapter3_realms.jpg",
    routeHref: "/journey",
    unlockRequirement: "Complete Chapter 3 (Regent Keep)",
    coords: { x: 54, y: 58 },
  },
  {
    id: "loc-project-forge",
    number: 6,
    name: "PROJECT FORGE",
    regionTitle: "Craftsman Watermill Workshop",
    seethawakaInspiration: "Seethawaka Industrial & Traditional Craft Zones",
    purpose: "Learn Project Crafting & Execution",
    description: "A roaring industrial workshop with spinning waterwheels, glowing anvils, and planning boards where ideas are hammered into sustainable community projects.",
    visualTag: "Waterwheel, Anvil & Blueprint Desks",
    status: "LOCKED",
    lessonsTotal: 4,
    lessonsCompleted: 0,
    xpReward: 250,
    badgeReward: "MASTER BUILDER",
    image: "/images/chapter4_forge.jpg",
    routeHref: "/journey",
    unlockRequirement: "Complete Chapter 4 (The Seven Realms)",
    coords: { x: 82, y: 52 },
  },
  {
    id: "loc-codewood",
    number: 7,
    name: "CODEWOOD",
    regionTitle: "Ancient Monolithic Grove",
    seethawakaInspiration: "Puwarankanda & Heritage Forest Reserves",
    purpose: "Club Culture, Ethics & The Regent Code",
    description: "A tranquil sanctuary with glowing runic obelisks and forest crossroads, holding the secrets of parliamentary protocol and ethical leadership.",
    visualTag: "Glowing Rune Glade & Monoliths",
    status: "LOCKED",
    lessonsTotal: 3,
    lessonsCompleted: 0,
    xpReward: 200,
    badgeReward: "CODE BEARER",
    image: "/images/rotary_roots.jpg",
    routeHref: "/journey",
    unlockRequirement: "Complete Chapter 5 (Project Forge)",
    coords: { x: 28, y: 36 },
  },
  {
    id: "loc-grand-archive",
    number: 8,
    name: "GRAND ARCHIVE",
    regionTitle: "Mountain-Carved Library",
    seethawakaInspiration: "Historical Seethawaka Kingdom Royal Libraries",
    purpose: "ROTA 101 & Constitution Handbook",
    description: "An awe-inspiring mountain library with grand stone stairs and illuminated stained glass windows holding the district citations, bylaws, and ROTA 101.",
    visualTag: "Stained Glass Mountain Library",
    status: "LOCKED",
    lessonsTotal: 4,
    lessonsCompleted: 0,
    xpReward: 200,
    badgeReward: "SCHOLAR",
    image: "/images/chapter2_odyssey.jpg",
    routeHref: "/rota101",
    unlockRequirement: "Complete Chapter 6 (Codewood)",
    coords: { x: 56, y: 34 },
  },
  {
    id: "loc-impact-frontier",
    number: 9,
    name: "IMPACT FRONTIER",
    regionTitle: "Active Expedition Grounds",
    seethawakaInspiration: "Living Seethawaka Villages, Schools & Tea Estates",
    purpose: "Real Physical Meetings & Community Projects",
    description: "Active community grounds with tea estate trails, meeting outposts, and quest campfires where learning transforms into real physical impact.",
    visualTag: "Quest Campfire & Frontier Outposts",
    status: "LOCKED",
    lessonsTotal: 3,
    lessonsCompleted: 0,
    xpReward: 350,
    badgeReward: "TRAILBLAZER",
    image: "/images/mission_community.jpg",
    routeHref: "/missions",
    unlockRequirement: "Complete Chapter 7 (Grand Archive)",
    coords: { x: 82, y: 28 },
  },
  {
    id: "loc-membership-citadel",
    number: 10,
    name: "MEMBERSHIP CITADEL",
    regionTitle: "The High Royal Summit",
    seethawakaInspiration: "The Peak of Seethawaka Regal Heritage",
    purpose: "Official Induction Pathway & Installation",
    description: "The majestic citadel perched atop the mountain peaks in the mist, where prospect adventurers take the oath of service and receive the Regent Pin.",
    visualTag: "Sky Peak Royal Citadel",
    status: "LOCKED",
    lessonsTotal: 2,
    lessonsCompleted: 0,
    xpReward: 500,
    badgeReward: "INDUCTED REGENT",
    image: "/images/realm_of_regent_hero.jpg",
    routeHref: "/profile",
    unlockRequirement: "Complete Chapter 8 (Impact Frontier)",
    coords: { x: 50, y: 12 },
  },
];

export const mapSecrets: MapSecret[] = [
  {
    id: "secret-botanical",
    name: "Seethawaka Botanical Haven",
    type: "BOTANICAL_NOTE",
    title: "Seethawaka Botanical Garden Landmark",
    description: "The peaceful waterways, rare flowering canopy, and tropical terraces across Seethawaka directly inspired the lush flora of Rotary Roots.",
    coords: { x: 44, y: 72 },
    rewardXp: 5,
  },
  {
    id: "secret-ruins",
    name: "Rajasinghe Ancient Kingdom",
    type: "HERITAGE_LORE",
    title: "Rajasinghe Castle Ruins Landmark",
    description: "The 16th-century fortress ruins of King Rajasinghe I in Seethawaka shaped the towering stonework and royal maroon pride of Regent Keep.",
    coords: { x: 16, y: 48 },
    rewardXp: 5,
  },
  {
    id: "secret-scroll",
    name: "Ancient Charter Scroll",
    type: "SECRET_DISCOVERY",
    title: "Ancient Scroll of the Regents",
    description: "You uncovered a hidden parchment near Codewood! 'Service is our compass, Seethawaka is our heartbeat.'",
    coords: { x: 40, y: 26 },
    rewardXp: 10,
  },
];
