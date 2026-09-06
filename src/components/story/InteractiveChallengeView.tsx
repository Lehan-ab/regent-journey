"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Compass,
  Award,
  GripVertical,
} from "lucide-react";
import RetroButton from "@/components/ui/RetroButton";
import PixelCompanion from "@/components/companion/PixelCompanion";
import { usePlayer } from "@/context/PlayerContext";
import { COMPANIONS } from "@/data/companionsData";
import { StoryInteraction, ProtocolStep } from "@/story/types/interaction";
import { audioManager } from "@/lib/audioManager";
import { personalizeDialogue } from "@/lib/dialoguePersonalizer";
import { validateProtocolOrder, validateScenarioChoice } from "@/story/interactions/registry";

interface InteractiveChallengeViewProps {
  challenge: StoryInteraction;
  onChallengePassed: () => void;
  isAlreadyPassed?: boolean;
}

export default function InteractiveChallengeView({
  challenge,
  onChallengePassed,
  isAlreadyPassed = false,
}: InteractiveChallengeViewProps) {
  const { player } = usePlayer();
  const companionKey = (player.companion || "nova") as "nova" | "raya" | "kai";
  const companion = COMPANIONS[companionKey] || COMPANIONS.nova;
  const name = player.name || "Prospect";

  // Scenario state
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
  const [isScenarioChecked, setIsScenarioChecked] = useState(false);
  const [scenarioFeedback, setScenarioFeedback] = useState<string>("");
  const [isScenarioCorrect, setIsScenarioCorrect] = useState(false);

  // Protocol state
  const [protocolItems, setProtocolItems] = useState<ProtocolStep[]>([]);
  const [isProtocolChecked, setIsProtocolChecked] = useState(false);
  const [isProtocolCorrect, setIsProtocolCorrect] = useState(false);

  // Initialize or reset when challenge changes
  useEffect(() => {
    setSelectedScenarioId(null);
    setIsScenarioChecked(false);
    setScenarioFeedback("");
    setIsScenarioCorrect(false);

    if (challenge.protocolSteps) {
      // Scramble sequence for challenge
      const scrambled = [...challenge.protocolSteps].sort(() => Math.random() - 0.5);
      setProtocolItems(scrambled);
    }
    setIsProtocolChecked(false);
    setIsProtocolCorrect(false);
  }, [challenge.id, challenge.protocolSteps]);

  // Handle Scenario Choice Check
  const handleCheckScenario = () => {
    if (!selectedScenarioId) return;
    audioManager.playTap();
    const result = validateScenarioChoice(challenge, selectedScenarioId);
    setIsScenarioChecked(true);
    setIsScenarioCorrect(result.isCorrect);
    setScenarioFeedback(result.feedback);

    if (result.isCorrect) {
      audioManager.playSuccessChime();
      onChallengePassed();
    } else {
      audioManager.playErrorBuzz();
    }
  };

  // Handle Protocol Re-ordering
  const handleMoveProtocolItem = (index: number, direction: "up" | "down") => {
    audioManager.playTap();
    const newItems = [...protocolItems];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;

    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setProtocolItems(newItems);
    setIsProtocolChecked(false);
  };

  // Handle Protocol Submission
  const handleCheckProtocol = () => {
    audioManager.playTap();
    if (!challenge.protocolSteps) return;
    const isCorrect = validateProtocolOrder(
      challenge.protocolSteps,
      protocolItems.map((item) => item.id)
    );

    setIsProtocolChecked(true);
    setIsProtocolCorrect(isCorrect);

    if (isCorrect) {
      audioManager.playSuccessChime();
      onChallengePassed();
    } else {
      audioManager.playErrorBuzz();
    }
  };

  // Reset Protocol Order
  const handleResetProtocol = () => {
    audioManager.playTap();
    if (challenge.protocolSteps) {
      const scrambled = [...challenge.protocolSteps].sort(() => Math.random() - 0.5);
      setProtocolItems(scrambled);
    }
    setIsProtocolChecked(false);
  };

  return (
    <div
      id="interactive-challenge-section"
      className="rounded-none border-4 border-amber-600/70 bg-[#0C0603] p-5 sm:p-7 shadow-[0_0_35px_rgba(255,199,25,0.15)] relative mb-8"
    >
      {/* Corner Ornaments */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-regent-gold pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-regent-gold pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-regent-gold pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-regent-gold pointer-events-none" />

      {/* Header Banner */}
      <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b-2 border-amber-900/60 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 bg-[#170B05] border-2 border-regent-gold flex items-center justify-center shrink-0">
            <Compass className="w-5 h-5 text-regent-gold animate-spin-slow" />
          </div>
          <div>
            <div className="text-[10px] font-pixel text-yellow-300 uppercase tracking-widest block font-bold flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-regent-gold" />
              INTERACTIVE CHALLENGE TRIAL
            </div>
            <h3 className="font-pixel text-base sm:text-lg font-bold text-white leading-tight">
              {challenge.title}
            </h3>
          </div>
        </div>

        {challenge.bonusXp && (
          <div className="px-2.5 py-1 bg-[#170B05] border border-regent-gold text-[10px] font-pixel text-regent-gold font-bold flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-regent-gold" />
            <span>+{challenge.bonusXp} BONUS XP</span>
          </div>
        )}
      </div>

      {/* Challenge Prompt */}
      <div className="mb-5 p-3.5 bg-[#140803] border border-[#4A2610] text-xs sm:text-sm font-serif text-[#F4EDE5] leading-relaxed">
        <p className="font-bold text-yellow-300 font-pixel text-xs mb-1 uppercase">
          THE SITUATION:
        </p>
        <p>{personalizeDialogue(challenge.challengePrompt, { name })}</p>
        {challenge.contextLore && (
          <p className="text-[11px] text-[#A48871] italic mt-2 border-t border-[#3D2612] pt-1.5">
            ⚜ {challenge.contextLore}
          </p>
        )}
      </div>

      {/* 1. SCENARIO DILEMMA MODE */}
      {challenge.type === "scenario-dilemma" && challenge.scenarioOptions && (
        <div className="space-y-3 mb-5">
          {challenge.scenarioOptions.map((option) => {
            const isSelected = selectedScenarioId === option.id;
            let cardStyle = "border-[#3D2612] bg-[#140803]/90 hover:border-regent-gold";
            if (isScenarioChecked) {
              if (option.isRecommended) {
                cardStyle = "border-regent-green bg-green-950/80 shadow-[0_0_15px_rgba(34,197,94,0.3)]";
              } else if (isSelected && !option.isRecommended) {
                cardStyle = "border-red-600 bg-red-950/80";
              }
            } else if (isSelected) {
              cardStyle = "border-regent-gold bg-[#241005] shadow-[0_0_15px_rgba(255,199,25,0.2)]";
            }

            return (
              <div
                key={option.id}
                onClick={() => {
                  if (!isScenarioChecked || !isScenarioCorrect) {
                    audioManager.playTap();
                    setSelectedScenarioId(option.id);
                    setIsScenarioChecked(false);
                  }
                }}
                className={`p-4 border-2 transition-all cursor-pointer ${cardStyle}`}
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <span className="font-pixel text-xs sm:text-sm font-bold text-white">
                    {option.title}
                  </span>
                  {isScenarioChecked && option.isRecommended && (
                    <CheckCircle2 className="w-4 h-4 text-regent-green shrink-0 mt-0.5" />
                  )}
                </div>
                <p className="font-serif text-xs text-[#E5D7C7] leading-relaxed">
                  {personalizeDialogue(option.description, { name })}
                </p>

                {/* Companion Reaction when selected */}
                {isSelected && option.companionFeedback && (
                  <div className="mt-2.5 pt-2 border-t border-yellow-900/50 flex items-start gap-2.5 bg-black/40 p-2">
                    <div className="w-8 h-8 shrink-0 flex items-center justify-center">
                      <PixelCompanion
                        companionId={companionKey}
                        emotion={option.isRecommended ? "happy" : "thinking"}
                        size="sm"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="font-pixel text-[9px] text-regent-gold block uppercase">
                        {companion.name} ({companion.tagline})
                      </span>
                      <p className="font-serif text-xs text-[#F2E8DC] italic">
                        &ldquo;
                        {personalizeDialogue(
                          option.companionFeedback[companionKey] ||
                            option.companionFeedback.nova ||
                            "",
                          { name }
                        )}
                        &rdquo;
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 2. PROTOCOL ORDER MODE (TACTILE DRAG & ARROW REORDER) */}
      {challenge.type === "protocol-order" && (
        <div className="space-y-2 mb-5">
          <p className="font-pixel text-[10px] text-[#A48871] mb-2 uppercase">
            Drag to rearrange or use arrows to order the steps in their proper sequence:
          </p>
          <Reorder.Group
            axis="y"
            values={protocolItems}
            onReorder={(newItems) => {
              if (isProtocolCorrect) return;
              setProtocolItems(newItems);
              setIsProtocolChecked(false);
              audioManager.playTap();
            }}
            className="space-y-2"
          >
            {protocolItems.map((item, index) => (
              <Reorder.Item
                key={item.id}
                value={item}
                dragListener={!isProtocolCorrect}
                className={`p-3 border-2 flex items-center justify-between gap-2 select-none transition-colors ${
                  !isProtocolCorrect ? "cursor-grab active:cursor-grabbing hover:border-regent-gold/70" : ""
                } ${
                  isProtocolChecked
                    ? isProtocolCorrect
                      ? "border-regent-green bg-green-950/70"
                      : "border-red-700 bg-red-950/70"
                    : "border-[#3D2612] bg-[#140803]"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {!isProtocolCorrect && (
                    <GripVertical className="w-4 h-4 text-regent-gold/60 hover:text-regent-gold shrink-0 cursor-grab" />
                  )}
                  <span className="w-6 h-6 bg-[#0A0503] border border-regent-gold/60 text-regent-gold font-pixel text-xs flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <div>
                    <span className="font-pixel text-xs sm:text-sm text-white block">
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="font-serif text-[11px] text-[#A48871] block">
                        {item.description}
                      </span>
                    )}
                  </div>
                </div>

                {!isProtocolCorrect && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveProtocolItem(index, "up");
                      }}
                      disabled={index === 0}
                      className="p-1 bg-[#200F05] border border-regent-gold/40 text-regent-gold hover:text-white disabled:opacity-30"
                      title="Move up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMoveProtocolItem(index, "down");
                      }}
                      disabled={index === protocolItems.length - 1}
                      className="p-1 bg-[#200F05] border border-regent-gold/40 text-regent-gold hover:text-white disabled:opacity-30"
                      title="Move down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </div>
      )}

      {/* Feedback Banner */}
      <AnimatePresence>
        {(isScenarioChecked || isProtocolChecked) && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className={`p-3.5 border-2 mb-4 text-xs font-serif ${
              (challenge.type === "scenario-dilemma" && isScenarioCorrect) ||
              (challenge.type === "protocol-order" && isProtocolCorrect)
                ? "bg-green-950/80 border-regent-green text-green-100"
                : "bg-red-950/80 border-red-800 text-red-100"
            }`}
          >
            {(challenge.type === "scenario-dilemma" && isScenarioCorrect) ||
            (challenge.type === "protocol-order" && isProtocolCorrect) ? (
              <div>
                <p className="font-pixel text-xs font-bold text-regent-gold mb-1">
                  ✦ CHALLENGE SOLVED! PROCEED TO THE KNOWLEDGE TRIAL!
                </p>
                <p>
                  {challenge.type === "scenario-dilemma"
                    ? scenarioFeedback
                    : challenge.successOutcome}
                </p>
              </div>
            ) : (
              <div>
                <p className="font-pixel text-xs font-bold text-red-300 mb-1">
                  ✕ NOT QUITE YET!
                </p>
                <p>Hint: {challenge.hint}</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-amber-900/60">
        <div className="text-[10px] font-pixel text-[#A48871] flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-regent-gold" />
          <span>Complete challenge to unlock the Guardian&apos;s Knowledge Trial</span>
        </div>

        <div className="flex items-center gap-2">
          {challenge.type === "protocol-order" && !isProtocolCorrect && (
            <button
              onClick={handleResetProtocol}
              className="px-2.5 py-1.5 bg-[#170B05] border border-amber-900/60 text-xs font-pixel text-[#A48871] hover:text-white flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" /> RESET
            </button>
          )}

          {challenge.type === "scenario-dilemma" ? (
            !isScenarioChecked || !isScenarioCorrect ? (
              <RetroButton
                variant="yellow"
                size="sm"
                disabled={!selectedScenarioId}
                onClick={handleCheckScenario}
              >
                CONFIRM DECISION
              </RetroButton>
            ) : (
              <RetroButton
                variant="green"
                size="sm"
                onClick={() => {
                  const el = document.getElementById("knowledge-check-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                icon={<ArrowRight className="w-3.5 h-3.5" />}
                iconPosition="right"
              >
                ENTER KNOWLEDGE TRIAL →
              </RetroButton>
            )
          ) : !isProtocolChecked || !isProtocolCorrect ? (
            <RetroButton
              variant="yellow"
              size="sm"
              onClick={handleCheckProtocol}
            >
              SUBMIT SEQUENCE
            </RetroButton>
          ) : (
            <RetroButton
              variant="green"
              size="sm"
              onClick={() => {
                const el = document.getElementById("knowledge-check-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              icon={<ArrowRight className="w-3.5 h-3.5" />}
              iconPosition="right"
            >
              ENTER KNOWLEDGE TRIAL →
            </RetroButton>
          )}
        </div>
      </div>
    </div>
  );
}
