"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Check,
  ArrowRight,
  HeartHandshake,
  Crown,
  Briefcase,
  Palette,
  Globe,
  Trophy,
  Coins,
  Users,
  CalendarDays,
  Cpu,
  Target,
} from "lucide-react";
import RetroButton from "@/components/ui/RetroButton";
import { INTEREST_OPTIONS, PRIMARY_GOAL_OPTIONS } from "@/data/companionsData";

interface Step3InterestsProps {
  initialInterests?: string[];
  initialGoal?: string;
  onConfirm: (interests: string[], primaryGoal: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  HeartHandshake,
  Crown,
  Briefcase,
  Palette,
  Globe,
  Trophy,
  Coins,
  Users,
  CalendarDays,
  Cpu,
};

export default function Step3Interests({
  initialInterests = [],
  initialGoal = "",
  onConfirm,
}: Step3InterestsProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialInterests);
  const [primaryGoal, setPrimaryGoal] = useState<string>(
    initialGoal || PRIMARY_GOAL_OPTIONS[0]
  );
  const [validationError, setValidationError] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) => {
      const exists = prev.includes(id);
      const updated = exists ? prev.filter((item) => item !== id) : [...prev, id];
      if (updated.length >= 2) {
        setValidationError(false);
      }
      return updated;
    });
  };

  const handleContinue = () => {
    if (selectedInterests.length < 2) {
      setValidationError(true);
      return;
    }
    setValidationError(false);
    onConfirm(selectedInterests, primaryGoal);
  };

  const isRequirementMet = selectedInterests.length >= 2;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
      {/* Title Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-regent-maroon text-regent-gold font-pixel text-xs border border-red-950 uppercase tracking-widest mb-2 shadow-md">
          <Sparkles className="w-3.5 h-3.5" /> PROLOGUE • STEP 3
        </div>
        <h1 className="font-pixel text-2xl sm:text-4xl font-bold text-white tracking-wide uppercase">
          WHAT BROUGHT YOU HERE?
        </h1>
        <p className="font-body text-xs sm:text-sm text-[#B8C0D2] mt-1.5 max-w-lg mx-auto">
          There’s more than one path through Rotaract. Choose the areas you are most curious to explore.
        </p>
      </div>

      {/* Selected Counter & Validation Info */}
      <div className="flex items-center justify-between pb-2 mb-4 border-b border-border-card font-pixel text-xs">
        <div className="flex items-center gap-2">
          <span className="text-white">SELECT AT LEAST 2 INTERESTS</span>
          {isRequirementMet ? (
            <span className="px-2 py-0.5 bg-green-950 text-regent-green border border-regent-green/60 text-[10px] flex items-center gap-1">
              <Check className="w-3 h-3" /> READY
            </span>
          ) : (
            <span className="px-2 py-0.5 bg-yellow-950 text-regent-gold border border-regent-gold/60 text-[10px]">
              CHOOSE {2 - selectedInterests.length} MORE
            </span>
          )}
        </div>

        <div className="px-2.5 py-1 bg-[#02091F] border border-border-card text-regent-gold font-bold">
          SELECTED: {selectedInterests.length}
        </div>
      </div>

      {validationError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-2.5 bg-red-950/80 border border-red-500 text-red-200 font-pixel text-xs text-center"
        >
          Please select at least 2 interests before proceeding to The Gateway.
        </motion.div>
      )}

      {/* 10 Interest Tiles (2 cols mobile, 2 cols tablet, 2 cols desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
        {INTEREST_OPTIONS.map((item) => {
          const isSelected = selectedInterests.includes(item.id);
          const Icon = iconMap[item.iconName] || Target;

          return (
            <motion.button
              key={item.id}
              type="button"
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleInterest(item.id)}
              className={`p-3.5 sm:p-4 border-2 text-left transition-all duration-150 relative flex items-start gap-3 select-none ${
                isSelected
                  ? "bg-gradient-to-r from-[#091D47] to-[#061433] border-regent-blue shadow-[0_0_12px_rgba(32,169,246,0.25)]"
                  : "bg-[#071331] border-border-card/70 hover:border-border-card hover:bg-[#0a1a42]"
              }`}
            >
              {/* Icon Container */}
              <div
                className={`p-2 border shrink-0 transition-colors ${
                  isSelected
                    ? "bg-regent-blue text-black border-white"
                    : "bg-[#02091F] text-regent-gold border-border-card"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Text Info */}
              <div className="flex-1 min-w-0 pr-6">
                <div className="flex items-center gap-2">
                  <h3 className="font-pixel text-xs sm:text-sm font-bold text-white tracking-wide truncate">
                    {item.title}
                  </h3>
                </div>
                <p className="font-body text-xs text-[#B8C0D2] mt-0.5 leading-snug">
                  {item.description}
                </p>
              </div>

              {/* Checkbox status badge in top-right */}
              <div
                className={`absolute top-3.5 right-3.5 w-5 h-5 border flex items-center justify-center transition-all ${
                  isSelected
                    ? "bg-regent-gold border-white text-black shadow-sm"
                    : "bg-[#02091F] border-border-card/80 text-transparent"
                }`}
              >
                <Check className="w-3.5 h-3.5" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Optional Single-Choice Question */}
      <div className="bg-[#071331] border-2 border-border-card p-4 sm:p-5 shadow-retro-card mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-regent-gold shrink-0" />
          <h2 className="font-pixel text-xs sm:text-sm font-bold text-white tracking-wide uppercase">
            WHAT WOULD YOU MOST LIKE TO GAIN FROM ROTARACT?
          </h2>
          <span className="text-[10px] font-pixel text-text-muted">(OPTIONAL)</span>
        </div>

        <p className="font-body text-xs text-text-secondary mb-3">
          This helps shape the missions and mentor recommendations you receive later.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PRIMARY_GOAL_OPTIONS.map((goal) => {
            const isChosen = primaryGoal === goal;
            return (
              <button
                key={goal}
                type="button"
                onClick={() => setPrimaryGoal(goal)}
                className={`p-2.5 border text-left font-pixel text-xs transition-all flex items-center justify-between ${
                  isChosen
                    ? "bg-[#0c1c45] border-regent-gold text-regent-gold font-bold shadow-sm"
                    : "bg-[#02091F] border-border-card/60 text-text-secondary hover:text-white hover:border-border-card"
                }`}
              >
                <span className="truncate">{goal}</span>
                {isChosen && <Check className="w-3.5 h-3.5 text-regent-gold shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Submit Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <span className="font-pixel text-xs text-text-muted text-center sm:text-left">
          {isRequirementMet
            ? "Your explorer profile & interests are ready for The Gateway!"
            : "Select at least 2 interests above to unlock The Gateway."}
        </span>

        <RetroButton
          variant={isRequirementMet ? "green" : "outline"}
          size="lg"
          onClick={handleContinue}
          icon={<ArrowRight className="w-5 h-5" />}
          iconPosition="right"
          className={!isRequirementMet ? "opacity-70 cursor-not-allowed" : "shadow-retro-green"}
        >
          CONTINUE THE JOURNEY →
        </RetroButton>
      </div>
    </div>
  );
}
