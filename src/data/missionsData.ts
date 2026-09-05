export type MissionType = "General Meeting" | "Community Service" | "Club Service" | "Professional Development";
export type MissionStatus = "UPCOMING" | "AVAILABLE SOON" | "COMPLETED";

export interface CanonicalMission {
  id: string;
  title: string;
  tagline: string;
  type: MissionType | string;
  rewardXp: number;
  status: MissionStatus | string;
  date: string;
  badge: string;
  location: string;
  image: string;
  requiresVerification: boolean;
}

export const CANONICAL_MISSIONS: CanonicalMission[] = [
  {
    id: "mission-1",
    title: "GENERAL MEETING: MEET THE REGENTS",
    tagline: "Attend the official club assembly and meet the board of directors.",
    type: "General Meeting",
    rewardXp: 150,
    status: "UPCOMING",
    date: "1st Sunday • 5:00 PM",
    badge: "Official",
    location: "Seethawaka / Hybrid",
    image: "/images/mission_meeting.jpg",
    requiresVerification: true,
  },
  {
    id: "mission-2",
    title: "COMMUNITY SERVICE EXPEDITION",
    tagline: "Step into your first real project and create sustainable on-ground impact.",
    type: "Community Service",
    rewardXp: 250,
    status: "AVAILABLE SOON",
    date: "Next Weekend",
    badge: "Impact",
    location: "Seethawaka Community Center",
    image: "/images/mission_community.jpg",
    requiresVerification: true,
  },
  {
    id: "mission-3",
    title: "REGENT FELLOWSHIP GATHERING",
    tagline: "Forge lifelong bonds with fellow prospect explorers and members.",
    type: "Club Service",
    rewardXp: 100,
    status: "UPCOMING",
    date: "Monthly Meet",
    badge: "Fellowship",
    location: "Avissawella",
    image: "/images/mission_fellowship.jpg",
    requiresVerification: true,
  },
];

export const CANONICAL_MISSIONS_MAP: Record<string, CanonicalMission> = Object.fromEntries(
  CANONICAL_MISSIONS.map((m) => [m.id, m])
);
