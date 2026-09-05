"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { usePlayer } from "@/context/PlayerContext";
import OnboardingProgressBar from "@/components/onboarding/OnboardingProgressBar";
import Step1Explorer from "@/components/onboarding/Step1Explorer";
import Step2Companion from "@/components/onboarding/Step2Companion";
import Step3Interests from "@/components/onboarding/Step3Interests";
import Step4Gateway from "@/components/onboarding/Step4Gateway";
import { AvatarConfig, CompanionId, OnboardingStep } from "@/types/player";

export default function OnboardingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    player,
    isHydrated,
    setName,
    setExplorerId,
    updateAvatar,
    setCompanion,
    setInterests,
    setPrimaryGoal,
    addXp,
    setOnboardingStep,
    completeOnboarding,
    resetJourney,
  } = usePlayer();

  // Helper to transition steps and update URL query param synchronously
  const goToStep = (step: OnboardingStep) => {
    setOnboardingStep(step);
    router.push(`/onboarding?step=${step}`);
  };

  // Synchronize step with query param if present
  useEffect(() => {
    if (!isHydrated) return;

    const stepParam = searchParams.get("step") as OnboardingStep | null;
    if (stepParam && ["explorer", "companion", "interests", "gateway"].includes(stepParam)) {
      if (player.onboardingStep !== stepParam) {
        setOnboardingStep(stepParam);
      }
    } else if (!stepParam && player.onboardingStep && player.onboardingStep !== "completed") {
      router.replace(`/onboarding?step=${player.onboardingStep}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, isHydrated]);

  // If already completed and user visits /onboarding without explicitly testing, redirect to /home
  useEffect(() => {
    if (isHydrated && player.onboardingComplete && !searchParams.get("test")) {
      router.replace("/home");
    }
  }, [isHydrated, player.onboardingComplete, router, searchParams]);

  if (!isHydrated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="text-center font-pixel text-xs text-regent-gold flex items-center gap-2">
          <span className="w-3 h-3 bg-regent-gold animate-ping" />
          <span>LOADING REGENT JOURNEY...</span>
        </div>
      </div>
    );
  }

  // Handle Step 1 Complete (Explorer)
  const handleExplorerConfirm = (name: string, avatar: AvatarConfig, explorerId: any) => {
    setName(name);
    setExplorerId(explorerId);
    updateAvatar(avatar);
    // Award +25 XP if first time
    if (player.xp < 25) {
      addXp(25, "Explorer Profile Created");
    }
    goToStep("companion");
  };

  // Handle Step 2 Complete (Companion)
  const handleCompanionConfirm = (companionId: CompanionId) => {
    setCompanion(companionId);
    // Award +25 XP if not already awarded
    if (player.xp < 50) {
      addXp(25, "Companion Alliance Forged");
    }
    goToStep("interests");
  };

  // Handle Step 3 Complete (Interests)
  const handleInterestsConfirm = (interests: string[], primaryGoal: string) => {
    setInterests(interests);
    setPrimaryGoal(primaryGoal);
    goToStep("gateway");
  };

  // Handle Step 4 Complete (Gateway -> Enter Realm)
  const handleEnterRealm = () => {
    completeOnboarding();
    router.push("/home");
  };

  // Back Navigation Handler
  const handleBack = () => {
    if (player.onboardingStep === "companion") {
      goToStep("explorer");
    } else if (player.onboardingStep === "interests") {
      goToStep("companion");
    } else if (player.onboardingStep === "gateway") {
      goToStep("interests");
    }
  };

  const showBackButton = player.onboardingStep !== "explorer";

  return (
    <div className="w-full min-h-screen bg-[#02091F] pb-16">
      {/* Top Minimal Progress Indicator */}
      <OnboardingProgressBar
        currentStep={player.onboardingStep}
        onBack={handleBack}
        onReset={() => {
          if (confirm("Reset onboarding progress and start fresh? (Dev Tool)")) {
            resetJourney();
          }
        }}
        showBack={showBackButton}
      />

      {/* Main Step Canvas with Animated Step Transitions */}
      <main className="w-full">
        <AnimatePresence mode="wait">
          {player.onboardingStep === "explorer" && (
            <motion.div
              key="step-explorer"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
            >
              <Step1Explorer
                initialName={player.name}
                initialExplorerId={player.explorerId}
                initialAvatar={player.avatar}
                onConfirm={handleExplorerConfirm}
              />
            </motion.div>
          )}

          {player.onboardingStep === "companion" && (
            <motion.div
              key="step-companion"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
            >
              <Step2Companion
                initialCompanion={player.companion}
                playerName={player.name}
                explorerId={player.explorerId}
                onConfirm={handleCompanionConfirm}
              />
            </motion.div>
          )}

          {player.onboardingStep === "interests" && (
            <motion.div
              key="step-interests"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
            >
              <Step3Interests
                initialInterests={player.interests}
                initialGoal={player.primaryGoal}
                onConfirm={handleInterestsConfirm}
              />
            </motion.div>
          )}

          {player.onboardingStep === "gateway" && (
            <motion.div
              key="step-gateway"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Step4Gateway
                name={player.name}
                explorerId={player.explorerId}
                avatar={player.avatar}
                companionId={player.companion}
                onEnterRealm={handleEnterRealm}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
