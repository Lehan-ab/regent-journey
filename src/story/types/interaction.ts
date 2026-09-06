export type InteractionType =
  | "scenario-dilemma"
  | "protocol-order"
  | "avenue-match"
  | "resource-allocation"
  | "dialogue-gate";

export interface ScenarioChoiceOption {
  id: string;
  title: string;
  description: string;
  isRecommended: boolean;
  outcomeExplanation: string;
  companionFeedback?: {
    nova?: string;
    raya?: string;
    kai?: string;
  };
}

export interface ProtocolStep {
  id: string;
  label: string;
  correctRank: number;
  description?: string;
}

export interface MatchingPair {
  id: string;
  sourceItem: string;
  targetCategory: string;
  description: string;
}

export interface StoryInteraction {
  id: string;
  type: InteractionType;
  title: string;
  challengePrompt: string;
  contextLore?: string;
  scenarioOptions?: ScenarioChoiceOption[];
  protocolSteps?: ProtocolStep[];
  matchingPairs?: MatchingPair[];
  hint: string;
  successOutcome: string;
  bonusXp?: number;
}
