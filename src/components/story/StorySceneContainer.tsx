"use client";

import React from "react";
import { LessonSceneType, PairedAvenueInfo } from "@/types/story";
import PortalThresholdScene from "./scenes/PortalThresholdScene";
import BotanicalCanopyScene from "./scenes/BotanicalCanopyScene";
import RiverHarborScene from "./scenes/RiverHarborScene";
import GreatHallScene from "./scenes/GreatHallScene";
import AvenueCompassScene from "./scenes/AvenueCompassScene";
import ForgeScene from "./scenes/ForgeScene";
import CodewoodScene from "./scenes/CodewoodScene";
import ArchiveScene from "./scenes/ArchiveScene";
import FrontierScene from "./scenes/FrontierScene";
import CitadelScene from "./scenes/CitadelScene";

interface StorySceneContainerProps {
  sceneType: LessonSceneType;
  variant: string;
  sceneEvent?: string;
  atmosphereTitle?: string;
  pairedAvenues?: PairedAvenueInfo;
  backdropImage?: string;
  className?: string;
}

export default function StorySceneContainer({
  sceneType,
  variant,
  sceneEvent,
  atmosphereTitle,
  pairedAvenues,
  className = "",
}: StorySceneContainerProps) {
  const renderScenePrimitive = () => {
    switch (sceneType) {
      case "portal":
        return (
          <PortalThresholdScene
            variant={variant}
            sceneEvent={sceneEvent}
            atmosphereTitle={atmosphereTitle}
          />
        );
      case "canopy":
        return (
          <BotanicalCanopyScene
            variant={variant}
            sceneEvent={sceneEvent}
            atmosphereTitle={atmosphereTitle}
          />
        );
      case "harbor":
        return (
          <RiverHarborScene
            variant={variant}
            sceneEvent={sceneEvent}
            atmosphereTitle={atmosphereTitle}
          />
        );
      case "hearth":
        return (
          <GreatHallScene
            variant={variant}
            sceneEvent={sceneEvent}
            atmosphereTitle={atmosphereTitle}
          />
        );
      case "compass":
        return (
          <AvenueCompassScene
            variant={variant}
            sceneEvent={sceneEvent}
            atmosphereTitle={atmosphereTitle}
            pairedAvenues={pairedAvenues}
          />
        );
      case "forge":
        return (
          <ForgeScene
            variant={variant}
            sceneEvent={sceneEvent}
            atmosphereTitle={atmosphereTitle}
          />
        );
      case "codewood":
        return (
          <CodewoodScene
            variant={variant}
            sceneEvent={sceneEvent}
            atmosphereTitle={atmosphereTitle}
          />
        );
      case "archive":
        return (
          <ArchiveScene
            variant={variant}
            sceneEvent={sceneEvent}
            atmosphereTitle={atmosphereTitle}
          />
        );
      case "frontier":
        return (
          <FrontierScene
            variant={variant}
            sceneEvent={sceneEvent}
            atmosphereTitle={atmosphereTitle}
          />
        );
      case "citadel":
        return (
          <CitadelScene
            variant={variant}
            sceneEvent={sceneEvent}
            atmosphereTitle={atmosphereTitle}
          />
        );
      default:
        return (
          <PortalThresholdScene
            variant={variant}
            sceneEvent={sceneEvent}
            atmosphereTitle={atmosphereTitle}
          />
        );
    }
  };

  return (
    <div
      className={`relative w-full overflow-hidden border-2 border-[#3D2612] bg-[#0A0503] shadow-[0_8px_32px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Ornate Gold Filigree Corners */}
      <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-regent-gold pointer-events-none z-30" />
      <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-regent-gold pointer-events-none z-30" />
      <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-regent-gold pointer-events-none z-30" />
      <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-regent-gold pointer-events-none z-30" />

      {/* Render the Active Scene Primitive */}
      {renderScenePrimitive()}
    </div>
  );
}
