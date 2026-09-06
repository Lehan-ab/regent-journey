import { StoryInteraction, ProtocolStep, ScenarioChoiceOption } from "../types/interaction";

export const CHALLENGE_GATEWAY_DISTRICT_ORIENTATION: StoryInteraction = {
  id: "challenge-gateway-orientation",
  type: "scenario-dilemma",
  title: "The Threshold Decision",
  challengePrompt:
    "You have arrived at the district threshold. A community partner asks RACSR to lead a high-visibility initiative within two weeks, but your team has not yet completed the community need assessment. What is your honorable course of action?",
  contextLore:
    "In District 3220, genuine impact stems from sustainable planning and rigorous ethical alignment, not rushed publicity.",
  scenarioOptions: [
    {
      id: "opt-assess-first",
      title: "Conduct Rapid Assessment & Align Scope",
      description:
        "Propose a structured phased timeline: complete an expedited community need assessment first, then execute a sustainable project.",
      isRecommended: true,
      outcomeExplanation:
        "Exemplary leadership! Projects grounded in real needs create lasting sustainable change, embodying Rotary's core standard.",
      companionFeedback: {
        nova: "Wisdom prevails! Data and community voices must always anchor our service.",
        raya: "Smart move! Fast action is great, but only when we are aiming at the right target!",
        kai: "Structured execution prevents wasted resources and ensures club credibility.",
      },
    },
    {
      id: "opt-rush-publicity",
      title: "Launch Immediately for Maximum Visibility",
      description:
        "Agree to the immediate launch to secure quick media attention, figuring out the community details later.",
      isRecommended: false,
      outcomeExplanation:
        "Risky venture! Rushing without assessing real needs often wastes resources and fails to solve the root problem.",
      companionFeedback: {
        nova: "Without understanding the need, we risk solving the wrong problem.",
        raya: "Hold up! Even the boldest adventurer checks the map before sprinting into a cavern!",
        kai: "Poor planning introduces severe reputational and logistical risks for the club.",
      },
    },
    {
      id: "opt-decline-entirely",
      title: "Flatly Decline without Alternatives",
      description: "Decline the request outright because the deadline feels too tight.",
      isRecommended: false,
      outcomeExplanation:
        "A missed alliance! Rotaractors are People of Action who negotiate constructive solutions rather than turning partners away.",
      companionFeedback: {
        nova: "We should always explore collaborative solutions when community benefit is possible.",
        raya: "Don't walk away so fast! Let's offer a realistic plan that works for everyone!",
        kai: "Negotiating timeline and deliverables is the hallmark of professional club relations.",
      },
    },
  ],
  hint: "Think about Rotary's motto: Service Above Self requires genuine community need over superficial publicity.",
  successOutcome:
    "You demonstrated the mindset of an impactful Rotaractor by prioritizing genuine community need and collaborative planning.",
  bonusXp: 15,
};

export const CHALLENGE_GATEWAY_FOUR_WAY_TEST: StoryInteraction = {
  id: "challenge-gateway-four-way-test",
  type: "protocol-order",
  title: "The Pillars of Integrity",
  challengePrompt:
    "Arrange the four pillars of Rotary's Four-Way Test in their exact canonical sequence.",
  contextLore:
    "Crafted in 1932 by Herbert J. Taylor, the 24-word Four-Way Test is the central ethical compass of Rotary and Rotaract worldwide.",
  protocolSteps: [
    {
      id: "step-truth",
      label: "1. Is it the TRUTH?",
      correctRank: 1,
      description: "Transparency, honesty, and grounded reality in all dealings.",
    },
    {
      id: "step-fair",
      label: "2. Is it FAIR to all concerned?",
      correctRank: 2,
      description: "Justice, balance, and mutual respect without bias.",
    },
    {
      id: "step-goodwill",
      label: "3. Will it build GOODWILL and BETTER FRIENDSHIPS?",
      correctRank: 3,
      description: "Strengthening trust and camaraderie across borders and communities.",
    },
    {
      id: "step-beneficial",
      label: "4. Will it be BENEFICIAL to all concerned?",
      correctRank: 4,
      description: "Delivering lasting, positive mutual value for the common good.",
    },
  ],
  hint: "Truth comes first, followed by fairness to all parties, building goodwill, and mutual benefit.",
  successOutcome:
    "You have masterfully assembled the Four-Way Test. This ethical framework will guide your path through every realm of Seethawaka!",
  bonusXp: 20,
};

export const INTERACTION_REGISTRY: Record<string, StoryInteraction> = {
  [CHALLENGE_GATEWAY_DISTRICT_ORIENTATION.id]: CHALLENGE_GATEWAY_DISTRICT_ORIENTATION,
  [CHALLENGE_GATEWAY_FOUR_WAY_TEST.id]: CHALLENGE_GATEWAY_FOUR_WAY_TEST,
};

export function validateProtocolOrder(steps: ProtocolStep[], userOrder: string[]): boolean {
  if (steps.length !== userOrder.length) return false;
  const sorted = [...steps].sort((a, b) => a.correctRank - b.correctRank);
  return sorted.every((step, index) => step.id === userOrder[index]);
}

export function validateScenarioChoice(
  interaction: StoryInteraction,
  selectedOptionId: string
): { isCorrect: boolean; feedback: string } {
  const option = interaction.scenarioOptions?.find((o) => o.id === selectedOptionId);
  if (!option) {
    return { isCorrect: false, feedback: "Invalid option selected." };
  }
  return {
    isCorrect: option.isRecommended,
    feedback: option.outcomeExplanation,
  };
}
