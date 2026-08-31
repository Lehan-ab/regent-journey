"use client";

import React from "react";
import { OnboardingStep } from "@/types/player";
import { Compass, Sparkles, RotateCcw, ArrowLeft } from "lucide-react";

interface OnboardingProgressBarProps {
  currentStep: OnboardingStep;
  onBack?: () => void;
  onReset?: () => void;
  showBack?: boolean;
}

const STEPS: { id: OnboardingStep; stepNumber: number; label: string }[] = [
  { id: "explorer", stepNumber: 1, label: "Explorer" },
  { id: "companion", stepNumber: 2, label: "Companion" },
  { id: "interests", stepNumber: 3, label: "Interests" },
  { id: "gateway", stepNumber: 4, label: "The Gateway" },
];

export default function OnboardingProgressBar({
  currentStep,
  onBack,
  onReset,
  showBack = false,
}: OnboardingProgressBarProps) {
  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);
  const activeStep = STEPS[currentStepIndex] || STEPS[0];

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-3 flex items-center justify-between gap-2 select-none">
      {/* Left: Optional Back Button or Brand Emblem */}
      <div className="flex items-center gap-2">
        {showBack && onBack ? (
          <button
            onClick={onBack}
            className="flex items-center gap-1 px-2.5 py-1 bg-[#050F2D] border border-border-card hover:border-regent-blue text-text-secondary hover:text-white font-pixel text-[11px] transition-colors shadow-sm"
            aria-label="Previous step"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">BACK</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-regent-maroon border border-red-950 text-regent-gold font-pixel text-[10px] font-bold">
            <Compass className="w-3 h-3 text-regent-gold animate-spin-slow" />
            <span>REGENT PROLOGUE</span>
          </div>
        )}
      </div>

      {/* Center: Compact Pixel Progress Indicator */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-1.5 font-pixel text-[10px] sm:text-xs">
          <span className="text-regent-gold font-bold">
            STEP {activeStep.stepNumber} OF 4
          </span>
          <span className="text-text-muted hidden sm:inline">•</span>
          <span className="text-white font-bold hidden sm:inline tracking-wider uppercase">
            {activeStep.label}
          </span>
        </div>

        {/* Step Nodes Dots Line */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {STEPS.map((step, idx) => {
            const isPassed = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <React.Fragment key={step.id}>
                {idx > 0 && (
                  <div
                    className={`w-3 sm:w-5 h-[2px] ${
                      isPassed
                        ? "bg-regent-gold"
                        : isCurrent
                        ? "bg-regent-blue"
                        : "bg-border-card/40"
                    }`}
                  />
                )}
                <div
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 flex items-center justify-center border ${
                    isCurrent
                      ? "bg-regent-gold border-white shadow-[0_0_8px_#FFC719] scale-110"
                      : isPassed
                      ? "bg-regent-blue border-regent-blue"
                      : "bg-[#050F2D] border-border-card"
                  }`}
                  title={step.label}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Right: Dev Reset Tool (discreet) */}
      <div className="flex items-center gap-1.5">
        {onReset && (
          <button
            onClick={onReset}
            className="text-[9px] font-pixel text-text-muted hover:text-red-400 p-1 flex items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
            title="Reset Prospect Journey (Dev Tool)"
          >
            <RotateCcw className="w-2.5 h-2.5" />
            <span className="hidden md:inline">DEV RESET</span>
          </button>
        )}
      </div>
    </div>
  );
}
