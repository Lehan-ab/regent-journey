import { StoryScene } from "../types/scene";

export const SCENE_GATEWAY_THRESHOLD: StoryScene = {
  id: "scene-gateway-threshold",
  sceneType: "portal",
  variant: "gate-unsealed",
  atmosphere: {
    title: "The Threshold of Seethawaka",
    subtitle: "Morning light breaks across ancient river stone arches",
    weather: "dawn",
    ambientSoundtrack: "theme-gateway",
    lightingTone: "warm-gold",
  },
  backdrop: {
    imagePath: "/assets/pixel/worlds/backgrounds/01_hidden_gateway.jpg",
    blurEffect: false,
    ambientParticles: "mist",
    overlayGradient: "from-amber-950/20 via-transparent to-[#0A0503]",
  },
  actors: [
    {
      id: "gatekeeper-aaron",
      role: "npc",
      name: "Gatekeeper Aaron",
      position: "left",
      defaultExpression: "speaking",
      isInteractive: true,
    },
    {
      id: "companion-slot",
      role: "companion",
      name: "Companion",
      position: "center",
      defaultExpression: "idle",
      isInteractive: true,
    },
    {
      id: "explorer-slot",
      role: "explorer",
      name: "Prospect",
      position: "right",
      defaultExpression: "neutral",
      isInteractive: false,
    },
  ],
};

export const SCENE_GATEWAY_PROMISE: StoryScene = {
  id: "scene-gateway-promise",
  sceneType: "portal",
  variant: "council-table",
  atmosphere: {
    title: "The Pillar of Commitment",
    subtitle: "Stone obelisks etched with Rotary's foundational ethics",
    weather: "clear",
    ambientSoundtrack: "theme-gateway",
    lightingTone: "royal-crimson",
  },
  backdrop: {
    imagePath: "/assets/pixel/worlds/backgrounds/01_hidden_gateway.jpg",
    blurEffect: false,
    ambientParticles: "starlight",
    overlayGradient: "from-red-950/25 via-transparent to-[#0A0503]",
  },
  actors: [
    {
      id: "gatekeeper-aaron",
      role: "npc",
      name: "Gatekeeper Aaron",
      position: "left",
      defaultExpression: "speaking",
      isInteractive: true,
    },
    {
      id: "companion-slot",
      role: "companion",
      name: "Companion",
      position: "center",
      defaultExpression: "thinking",
      isInteractive: true,
    },
    {
      id: "explorer-slot",
      role: "explorer",
      name: "Prospect",
      position: "right",
      defaultExpression: "neutral",
      isInteractive: false,
    },
  ],
};

export const SCENE_REGISTRY: Record<string, StoryScene> = {
  [SCENE_GATEWAY_THRESHOLD.id]: SCENE_GATEWAY_THRESHOLD,
  [SCENE_GATEWAY_PROMISE.id]: SCENE_GATEWAY_PROMISE,
};

export function getSceneById(id: string): StoryScene | undefined {
  return SCENE_REGISTRY[id];
}
