export interface XpBounty {
  amount: number;
  reason: string;
}

export interface BadgeAward {
  id: string;
  title: string;
  description: string;
  icon?: string;
  category: "INITIATION" | "AVENUE" | "LEADERSHIP" | "GOVERNANCE" | "DISTRICT" | "LEGACY";
}

export interface ItemUnlock {
  id: string;
  name: string;
  type: "key" | "scroll" | "pin" | "compass" | "crest" | "tome";
  description: string;
  icon?: string;
}

export interface StoryReward {
  xp: number;
  badge?: BadgeAward;
  badgeId?: string;
  titleUnlocked?: string;
  itemUnlocked?: ItemUnlock;
  secretLoreUnlocked?: string[];
  unlockedWorldId?: string;
  celebrationDialogue?: {
    nova?: string;
    raya?: string;
    kai?: string;
  };
}
